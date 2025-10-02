
import { io } from "socket.io-client";
import { Scene } from "./scene.mjs";

import { BaseClientSocket } from "./socket-types.mjs";


export abstract class Client_Network_Manager<Socket extends BaseClientSocket> {
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
