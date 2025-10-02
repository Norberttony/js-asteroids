
import { JSONValue } from "./serializable.js";

export abstract class Component {
    // force components to be serializable out of the box
    [val: string | number | symbol]: JSONValue;

    constructor(){}
}
