import type { Scene } from "./scene.js";

export type ActionFunction = (scene: Scene, action: Action) => void;
export type ActionConstructor = new (goId: number) => Action;

export abstract class Action {
    constructor(
        private goId: number,
        public make: ActionFunction,
        public unmake: ActionFunction,
    ){}

    public getGameObjectId(): number {
        return this.goId;
    }
}
