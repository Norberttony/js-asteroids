
import { Scene } from "../game-engine/scene.js";
import { simulate } from "./simulate.js";
import { render } from "./render.js";

import components from "./components.js";


export class Asteroids_Scene extends Scene {    
    constructor(){
        super(simulate, render, 20, 60, components);
    }

    updateSim(): void {
        super.updateSim();
    }
}
