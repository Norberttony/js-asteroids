
import { Game_Object } from "../game-engine/game-object.js";
import { Transform_Comp } from "./components.js";
import { Physics_Comp } from "./components.js";

import { Scene } from "../game-engine/scene.js";
import { Server_Network_Manager } from "../game-engine/server-network-manager.js";
import { ServerSocket as Socket } from "./socket-types.js";


export class Asteroids_Server_Network extends Server_Network_Manager<Socket> {
    constructor(scene: Scene){
        super(scene);

        // scene initialization is performed here instead of the Scene constructor so that the
        // clients load the configuration from the server without having to delete their own
        // default configuration.

        const go = new Game_Object([
            new Transform_Comp(0, 30),
            new Physics_Comp(4, 0)
        ]);

        go.startSync(Transform_Comp);
        go.startSync(Physics_Comp);

        this.scene.addObject(go);
    }
}
