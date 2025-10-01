
import { Socket } from "socket.io";
import { Scene } from "./scene.mjs";


export abstract class Server_Network_Manager {
    private sockets: Socket[] = [];

    constructor(
        private scene: Scene
    ){}

    addSocket(socket: Socket){
        this.sockets.push(socket);
    }

    globalSync(){
        // for now there are no player perspective snapshots, so serialize snapshot outside of loop
        const snapshot = this.scene.getSnapshot();
        for (const s of this.sockets){
            s.emit("snapshot", snapshot);
        }
    }
}
