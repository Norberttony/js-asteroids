
import { Scene } from "../game-engine/scene.mjs";
import { simulate } from "./simulate.mjs";
import { render } from "./render.mjs";

import components from "./components.mjs";


export class Asteroids_Scene extends Scene {    
    constructor(){
        super(simulate, render, 20, 60, components);
    }

    updateSim(): void {
        super.updateSim();
    }
}
