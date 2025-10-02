
import type { Socket as SSocket } from "socket.io";
import type { Socket as CSocket } from "socket.io-client";


export interface BaseServerToClientEvents {
    snapshot: (data: string) => void;
    syncSnapshot: (data: string) => void;
}

export interface BaseClientToServerEvents {
    ping: (callback: () => void) => void;
}

export interface BaseInterServerEvents {}
export interface BaseSocketData {}


// type aliases
export interface BaseServerSocket extends SSocket<BaseClientToServerEvents, BaseServerToClientEvents, BaseInterServerEvents, BaseSocketData> {}
export interface BaseClientSocket extends CSocket<BaseServerToClientEvents, BaseClientToServerEvents> {}
