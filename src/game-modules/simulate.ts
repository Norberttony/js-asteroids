
import { Game_Object } from "../game-engine/game-object.js";
import { Physics_Comp, Transform_Comp } from "./components.js";


export function simulate(objects: Game_Object[], elapsedSec: number){
    simulatePhysics(objects, elapsedSec);
}

function simulatePhysics(objects: Game_Object[], elapsed: number){
    for (const o of objects){
        const tran = o.getComp(Transform_Comp);
        const phys = o.getComp(Physics_Comp);
        if (tran !== undefined && phys !== undefined){
            phys.velX += phys.accX * elapsed;
            phys.velY += phys.accY * elapsed;
            tran.x += phys.velX * elapsed;
            tran.y += phys.velY * elapsed;
        }
    }
}
