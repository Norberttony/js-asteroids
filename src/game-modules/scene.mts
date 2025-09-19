
import { Scene } from "../game-engine/scene.mjs";
import { simulate } from "./simulate.mjs";
import { render } from "./render.mjs";

import { Game_Object } from "../game-engine/game-object.mjs";
import { Transform_Comp, Physics_Comp } from "./components.mjs";


export class Asteroids_Scene extends Scene {
    private go: Game_Object;
    
    constructor(){
        super(simulate, render, 20, 60);

        this.go = new Game_Object([
            new Transform_Comp(0, 0),
            new Physics_Comp(1, 0)
        ]);

        this.addObject(this.go);
    }

    updateSim(): void {
        super.updateSim();

        const tran = this.go.getComp(Transform_Comp);
        if (tran !== undefined)
            console.log(tran.x, tran.y);
    }
}
