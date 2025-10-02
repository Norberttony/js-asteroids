
import { io } from "socket.io-client";
import { Scene } from "./scene.js";

import { BaseClientSocket } from "./socket-types.js";


export abstract class ClientNetworkManager<Socket extends BaseClientSocket> {
    protected socket = io() as Socket;

    constructor(
        private scene: Scene
    ){
        this.socket.on("snapshot", (json: string) => {
            this.onSnapshot(json, false);
        });

        this.socket.on("syncSnapshot", (json: string) => {
            this.onSnapshot(json, true);
        });
    }

    get connected(): boolean {
        return this.socket.connected;
    }

    // emits "ping" to the server and returns the amount of time it took for two-way communication.
    public async ping(): Promise<number> {
        return new Promise<number>((res, rej) => {
            const start = performance.now();
            this.socket.emit("ping", () => {
                res(performance.now() - start);
            });
        });
    }

    protected onSnapshot(json: string, isSync: boolean){
        this.scene.loadSnapshot(json, isSync);
    }
}
