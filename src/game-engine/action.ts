
import type { Scene } from "./scene.js";

export type ActionFunction = (scene: Scene, action: Action) => void;
export type ActionType = "pressed" | "held" | "released";
export type ActionConstructor = new (goId: number) => Action;

export abstract class Action {
    private type: ActionType;

    constructor(
        private goId: number,
        public make: ActionFunction,
        public unmake: ActionFunction,
    ){}

    public getType(): ActionType {
        return this.type;
    }

    public getGameObjectId(): number {
        return this.goId;
    }
}
