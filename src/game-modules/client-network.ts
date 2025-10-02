
import { ClientNetworkManager } from "../game-engine/client-network-manager.js";
import { Scene } from "../game-engine/scene.js";
import { ClientSocket as Socket } from "./socket-types.js";


export class AsteroidsClientNetwork extends ClientNetworkManager<Socket> {
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
