
import { GameObject } from "../game-engine/game-object.js";
import { PhysicsComp, TransformComp } from "./components.js";


export function simulate(objects: GameObject[], elapsedSec: number){
    simulatePhysics(objects, elapsedSec);
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
