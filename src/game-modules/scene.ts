import { Scene } from "../game-engine/scene.js";
import { GameObject } from "../game-engine/game-object.js";
import { simulate } from "./simulate.js";
import { render } from "./render.js";
import
    components,
    { TransformComp, PlayerComp, PhysicsComp, PolylineComp }
from "./components.js";

export class AsteroidsScene extends Scene {    
    constructor(){
        super(simulate, render, 20, 60, components);
    }

    public override createPlayerObject(id: number): GameObject {
        const go = new GameObject([
            new TransformComp(100, 100),
            new PlayerComp(id),
            new PhysicsComp(0, 0),
            new PolylineComp("blue", "blue", 5, [
                { x: 0, y: -30 },
                { x: -25, y: 15 },
                { x: 25, y: 15 }
            ])
        ]);

        go.startSync(TransformComp);
        go.startSync(PhysicsComp);
        go.startSync(PlayerComp);

        return go;
    }

    updateSim(): void {
        super.updateSim();
    }
}
