
import { Scene } from "../game-engine/scene.mjs";
import { Server_Network_Manager } from "../game-engine/server-network-manager.mjs";

export class Asteroids_Server_Network extends Server_Network_Manager {
    constructor(scene: Scene){
        super(scene);
    }
}
