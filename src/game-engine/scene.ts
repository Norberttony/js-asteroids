import { Component } from "./component.js";
import { GameObject } from "./game-object.js";
import { SerializedScene } from "./serializable.js";
import { MessageMultiQueue } from "./message-queue.js";
import { ActionEvent, InputManager } from "./input.js";

// the name of the class retrieves the constructor of the class
export type CompDict = { [name: string]: new (...args: any[]) => Component };

export abstract class Scene {
    private objectById: { [id: number]: GameObject } = {};
    private objects: GameObject[] = [];
    private lastId: number = 0;

    // time accounting for simulation
    private simLastUpdate: number = Date.now();
    private simLag: number = 0;

    // time accounting for rendering
    private renLastUpdate: number = Date.now();
    private renLag: number = 0;

    // contains a dictionary mapping component class names to component constructors
    private comps: CompDict = {};

    // scene consumes actions
    private actionQueue: MessageMultiQueue<ActionEvent> | undefined;
    private actionQueueId: number = -1;

    constructor(
        private simulate: Function,
        private render: Function,
        public msPerUpdate: number,
        public framecap: number,
        private compList: (new (...args: any[]) => Component)[]
    ){
        for (const constr of this.compList)
            this.comps[constr.name] = constr;
    }

    public setInputManager(inpMan: InputManager): void {
        if (this.actionQueue)
            this.actionQueue.removeListener(this.actionQueueId);
        this.actionQueueId = inpMan.inputBuffer.addListener();
        this.actionQueue = inpMan.inputBuffer;
    }

    public addObject(obj: GameObject): void {
        this.addObjectWithId(obj, this.lastId++);
    }

    public getObject(id: number): GameObject | undefined {
        const obj = this.objectById[id];
        if (obj)
            return obj;
    }

    private addObjectWithId(obj: GameObject, id: number): void {
        obj.id = id;
        this.objects.push(obj);
        this.objectById[id] = obj;
    }

    private clearObjects(): void {
        this.objects = [];
        this.objectById = {};
        this.lastId = 0;
    }

    private removeObjectById(idx: number): void {
        this.objects.splice(idx, 1);
        delete this.objectById[idx];
    }

    // goes through the list and removes destroyed objects
    private removeDestroyedObjects(): void {
        for (let i = 0; i < this.objects.length; i++){
            if (this.objects[i].getIsDestroyed())
                this.removeObjectById(i--);
        }
    }

    // updates the simulation of the game objects (ie. physics, AI, non-rendering).
    public updateSim(): void {
        const now = Date.now();
        const diff = now - this.simLastUpdate;
        this.simLag += diff;

        while (this.simLag >= this.msPerUpdate){
            this.simulate(this.objects, this.msPerUpdate / 1000);
            this.removeDestroyedObjects();
            this.simLag -= this.msPerUpdate;
        }

        this.simLastUpdate = now;
    }

    // renders the scene given a rendering context, which is usually returned by a Canvas DOM
    // element or an OffscreenCanvas instance
    public renderScene(ctx: RenderingContext): void {
        const now = Date.now();
        const diff = now - this.renLastUpdate;
        this.renLag += diff;

        if (this.renLag >= 1000 / this.framecap){
            this.render(ctx, this.objects);
            this.renLag = 0;
        }
    }

    // gets an entire snapshot of every game object
    public getSnapshot(): string {
        const data: { [id: number]: string } = {};
        for (const go of this.objects){
            const json = go.serializeToJSON();
            data[go.id] = json;
        }
        return JSON.stringify(data);
    }

    // should return JSON of every currently synced component and game object id
    // in the future: should be given a player to get a perspective snapshot.
    public getSyncSnapshot(): string {
        const data: { [id: number]: string } = {};
        for (const go of this.objects){
            if (go.canSerialize()){
                const json = go.serializeSyncToJSON();
                if (json !== undefined)
                    data[go.id] = json;
            }
        }
        return JSON.stringify(data);
    }

    public loadSnapshot(json: string, isSync: boolean): void {
        // if this is a full world snapshot (ie. not a sync snapshot) we should clear all objects.
        if (!isSync)
            this.clearObjects();

        const synced = new Set<string>();
        const data = JSON.parse(json) as SerializedScene;
        for (const id in data){
            let go = this.objectById[id];
            // create a new game object if one with this id doesn't exist already
            if (!go){
                go = new GameObject([]);
                this.addObjectWithId(go, parseInt(id));
            }
            synced.add(id);
            go.deserializeFromJSON(data[id], this.comps);
        }

        // any objects that have not been synced in this exchange are assumed to be destroyed.
        for (const go of this.objects){
            if (go.canSerialize() && !synced.has(go.id.toString()))
                go.destroy();
        }
    }
}
