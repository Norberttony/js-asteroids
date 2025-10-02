
import { Component } from "./component.js";
import { Game_Object } from "./game-object.js";
import { SerializedScene } from "./serializable.js";


// the name of the class retrieves the constructor of the class
export type CompDict = { [name: string]: new (...args: any[]) => Component };

export abstract class Scene {
    private objectById: { [id: number]: Game_Object } = {};
    private objects: Game_Object[] = [];
    private lastId: number = 0;

    // time accounting for simulation
    private simLastUpdate: number = Date.now();
    private simLag: number = 0;

    // time accounting for rendering
    private renLastUpdate: number = Date.now();
    private renLag: number = 0;

    // contains a dictionary mapping component class names to component constructors
    private comps: CompDict = {};

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

    addObject(obj: Game_Object): void {
        this.addObjectWithId(obj, this.lastId++);
    }

    private addObjectWithId(obj: Game_Object, id: number): void {
        obj.id = id;
        this.objects.push(obj);
        this.objectById[id] = obj;
    }

    private clearObjects(): void {
        this.objects = [];
    }

    // updates the simulation of the game objects (ie. physics, AI, non-rendering).
    updateSim(): void {
        const now = Date.now();
        const diff = now - this.simLastUpdate;
        this.simLag += diff;

        while (this.simLag >= this.msPerUpdate){
            this.simulate(this.objects, this.msPerUpdate / 1000);
            this.simLag -= this.msPerUpdate;
        }

        this.simLastUpdate = now;
    }

    // renders the scene given a rendering context, which is usually returned by a Canvas DOM
    // element or an OffscreenCanvas instance
    renderScene(ctx: RenderingContext): void {
        const now = Date.now();
        const diff = now - this.renLastUpdate;
        this.renLag += diff;

        if (this.renLag >= 1000 / this.framecap){
            this.render(ctx, this.objects);
            this.renLag = 0;
        }
    }

    // gets an entire snapshot of every game object
    getSnapshot(): string {
        const data: { [id: number]: string } = {};
        for (const go of this.objects){
            const json = go.serializeToJSON();
            data[go.id] = json;
        }
        return JSON.stringify(data);
    }

    // should return JSON of every currently synced component and game object id
    // in the future: should be given a player to get a perspective snapshot.
    getSyncSnapshot(): string {
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

    loadSnapshot(json: string, isSync: boolean): void {
        // if this is a full world snapshot (ie. not a sync snapshot) we should clear all objects.
        if (!isSync)
            this.clearObjects();

        const data = JSON.parse(json) as SerializedScene;
        for (const id in data){
            let go = this.objectById[id];
            // create a new game object if one with this id doesn't exist already
            if (!go){
                go = new Game_Object([]);
                this.addObjectWithId(go, parseInt(id));
            }
            go.deserializeFromJSON(data[id], this.comps);
        }
    }
}
