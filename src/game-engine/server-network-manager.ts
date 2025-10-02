
import { BaseServerSocket } from "./socket-types.js";
import { Scene } from "./scene.js";


export abstract class Server_Network_Manager<Socket extends BaseServerSocket> {
    private sockets: Socket[] = [];

    constructor(
        protected scene: Scene
    ){}

    addSocket(socket: Socket){
        this.sockets.push(socket);

        const snapshot = this.scene.getSnapshot();
        socket.emit("snapshot", snapshot);
    }

    globalSync(){
        // for now there are no player perspective snapshots, so serialize snapshot outside of loop
        const snapshot = this.scene.getSyncSnapshot();
        for (const s of this.sockets){
            s.emit("syncSnapshot", snapshot);
        }
    }
}
