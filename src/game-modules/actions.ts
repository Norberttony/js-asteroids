
import { Action, ActionFunction } from "../game-engine/action.js";
import { Scene } from "../game-engine/scene.js";
import { TransformComp } from "./components.js";


const moveUpMake: ActionFunction = (scene: Scene, action: MoveUpAction) => {
    const go = scene.getObject(action.getGameObjectId());
    const tran = go?.getComp(TransformComp);
    if (tran){
        tran.y++;
        action.success = true;
    }
}

const moveUpUnmake: ActionFunction = (scene: Scene, action: MoveUpAction) => {
    if (!action.success)
        return;
    action.success = false;

    const go = scene.getObject(action.getGameObjectId());
    const tran = go?.getComp(TransformComp);
    if (tran)
        tran.y--;
}

export class MoveUpAction extends Action {
    public success: boolean;

    constructor(
        goId: number
    ){
        super(goId, moveUpMake, moveUpUnmake);
    }
}
