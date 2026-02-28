import { BaseServerSocket } from "./socket-types.js";
import { Scene } from "./scene.js";
import { GameObject } from "./game-object.js";

export abstract class ServerNetworkManager<Socket extends BaseServerSocket> {
    private sockets: Socket[] = [];
    private socketIds: number = 0;

    constructor(
        protected scene: Scene
    ){}

    public addSocket(socket: Socket){
        this.sockets.push(socket);

        const id: number = this.socketIds++;
        const go: GameObject = this.scene.createPlayerObject(id);
        this.scene.addObject(go);
        socket.emit("playerId", id);

        const snapshot = this.scene.getSnapshot();
        socket.emit("snapshot", snapshot);
    }

    public globalSync(){
        // for now there are no player perspective snapshots, so serialize snapshot outside of loop
        const snapshot = this.scene.getSyncSnapshot();
        for (const s of this.sockets){
            s.emit("syncSnapshot", snapshot);
        }
    }
}
