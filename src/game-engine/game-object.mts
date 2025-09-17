
import { Component } from "./component.mjs";


export class Game_Object {
    private components: { [name: string] : Component | undefined } = {};

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
    detachComp<C>(compClass: new (...args: any[]) => C): void {
        delete this.components[compClass.name];
    }

    // returns either the attached component with the given class, or undefined if such a component
    // does not exist.
    getComp<C>(compClass: new (...args: any[]) => C): C | undefined {
        return this.components[compClass.name] as C | undefined;
    }
}
