
import { Client_Network_Manager } from "../game-engine/client-network-manager.mjs";
import { Scene } from "../game-engine/scene.mjs";
import { ClientSocket as Socket } from "./socket-types.mjs";


export class Asteroids_Client_Network extends Client_Network_Manager<Socket> {
    constructor(scene: Scene){
        super(scene);
        this.pingLoop();
    }

    // temporary to test connection
    private async pingLoop(){
        console.log("PING:", await this.ping());
        setTimeout(() => this.pingLoop(), 1000);
    }
}
