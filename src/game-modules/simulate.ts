import { GameObject } from "../game-engine/game-object.js";
import { InputManager } from "../game-engine/input.js";
import { MoveUpAction } from "./actions.js";
import { PhysicsComp, PlayerComp, TransformComp } from "./components.js";

export function simulate(objects: GameObject[], elapsedSec: number, inp: InputManager | undefined){
    if (inp)
        simulateInput(objects, elapsedSec, inp);
    simulatePhysics(objects, elapsedSec);
}

function simulateInput(objects: GameObject[], elapsed: number, inp: InputManager){
    for (const o of objects){
        const plyr = o.getComp(PlayerComp);
        const phys = o.getComp(PhysicsComp);
        if (plyr && plyr.id == inp.playerId && phys){
            if (inp.isActionActive(MoveUpAction))
                phys.accY = -100;
        }
    }
}

function simulatePhysics(objects: GameObject[], elapsed: number){
    for (const o of objects){
        const tran = o.getComp(TransformComp);
        const phys = o.getComp(PhysicsComp);
        if (tran !== undefined && phys !== undefined){
            tran.rad += phys.angVel * elapsed;
            phys.velX += phys.accX * elapsed;
            phys.velY += phys.accY * elapsed;
            tran.x += phys.velX * elapsed;
            tran.y += phys.velY * elapsed;
        }
    }
}
