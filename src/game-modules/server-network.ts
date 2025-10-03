
import { GameObject } from "../game-engine/game-object.js";
import { TransformComp, PhysicsComp, PolylineComp } from "./components.js";

import { Scene } from "../game-engine/scene.js";
import { ServerNetworkManager } from "../game-engine/server-network-manager.js";
import { ServerSocket as Socket } from "./socket-types.js";


export class AsteroidsServerNetwork extends ServerNetworkManager<Socket> {
    constructor(scene: Scene){
        super(scene);

        // scene initialization is performed here instead of the Scene constructor so that the
        // clients load the configuration from the server without having to delete their own
        // default configuration.

        const go = new GameObject([
            new TransformComp(0, 30),
            new PhysicsComp(4, 0),
            new PolylineComp("gray", "red", 5, [
                { x: -10, y: -10 },
                { x: 10, y: -10 },
                { x: 10, y: 10 },
                { x: -10, y: 10 }
            ])
        ]);

        go.startSync(TransformComp);
        go.startSync(PhysicsComp);

        this.scene.addObject(go);
    }
}
