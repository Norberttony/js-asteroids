
import { Component } from "./component.mjs";
import { serializeToJSON } from "./serializable.mjs";


export class Game_Object {
    // id used for identifying the game object during syncing
    public id: number;

    private components: { [name: string] : Component } = {};
    private syncing: Set<Component> = new Set();

    constructor(
        comps: Component[]
    ){
        for (const c of comps)
            this.attachComp(c);
    }

    // attaches a component to this game object
    attachComp<C extends Component>(comp: C): void {
        const name = comp.constructor.name;
        if (this.components[name] === undefined)
            this.components[name] = comp;
    }

    // detaches an existing component from this game object given the component's name
    detachComp<C extends Component>(compClass: new (...args: any[]) => C): void {
        delete this.components[compClass.name];
    }

    // returns either the attached component with the given class, or undefined if such a component
    // does not exist.
    getComp<C extends Component>(compClass: new (...args: any[]) => C): C | undefined {
        return this.components[compClass.name] as C | undefined;
    }

    // if a component is being synced, then it is being added to the list of serialized components
    // (see serializeToJSON)
    startSync<C extends Component>(compClass: new (...args: any[]) => C): void {
        const comp = this.getComp(compClass);
        if (comp !== undefined)
            this.syncing.add(comp);
        else
            console.error(`Tried to sync nonexistent component ${compClass.constructor.name} on`, this);
    }

    // converts this game object into JSON and returns the object OR, in case no components are
    // being synced, returns an empty string.
    // the server should serialize all of the game objects, and send them to the clients for syncing.
    // filtered syncing as well (based on player vision)
    serializeToJSON(): string | undefined {
        // if we aren't syncing anything we return undefined.
        if (this.syncing.size == 0){
            return undefined;
        }

        const serialized: { [name: string]: string } = {};
        for (const comp of this.syncing){
            serialized[comp.constructor.name] = serializeToJSON<Component>(comp);
        }
        return serializeToJSON<object>({ id: this.id, comps: serialized });
    }
}
