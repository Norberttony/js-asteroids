import { Action } from "../game-engine/action.js";

export class MoveUpAction extends Action {
    constructor(
        goId: number
    ){
        super(goId);
    }
}
