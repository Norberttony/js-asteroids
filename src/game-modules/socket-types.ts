
import type { Server, Socket as SSocket } from "socket.io";
import type { Socket as CSocket } from "socket.io-client";
import type {
    BaseServerToClientEvents as STCEvents,
    BaseClientToServerEvents as CTSEvents,
    BaseInterServerEvents as ISEvents,
    BaseSocketData as SD
} from "../game-engine/socket-types.js";


// defines events that pertain to the game specifically
export interface ServerToClientEvents extends STCEvents {}
export interface ClientToServerEvents extends CTSEvents {}
export interface InterServerEvents extends ISEvents {}
export interface SocketData extends SD {}

// type aliases to avoid rewriting these long strings of text.
export interface ServerSocket extends SSocket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData> {}
export interface ClientSocket extends CSocket<ServerToClientEvents, ClientToServerEvents> {}
export interface IOServer extends Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData> {}
