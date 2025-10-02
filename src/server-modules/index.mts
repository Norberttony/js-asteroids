
import { resolve } from "node:path";

import express from "express";
import type { Request, Response } from "express";

import { createServer } from "http";
import { Server } from "socket.io";

import { Asteroids_Scene } from "../game-modules/scene.mjs";
import { Asteroids_Server_Network } from "../game-modules/server-network.mjs";
import type { IOServer, ServerSocket as Socket } from "../game-modules/socket-types.mjs";


const scene = new Asteroids_Scene();
const network = new Asteroids_Server_Network(scene);

setInterval(() => {
    scene.updateSim();
}, 100);

setInterval(() => {
    network.globalSync();
}, 1000);


const app = express();

// Set up routes
app.use("/game-engine", express.static(resolve(".", "dist", "game-engine")));
app.use("/game-modules", express.static(resolve(".", "dist", "game-modules")));
app.use("/scripts", express.static(resolve(".", "dist", "client-scripts")));
app.use(express.static(resolve(".", "src", "public")));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(resolve(".", "src", "public", "index.html"));
});

// Set up server (with socket.io)
const httpServer = createServer(app);

const io: IOServer = new Server(httpServer);

io.on("connection", (socket: Socket) => {
    network.addSocket(socket);

    socket.on("ping", (callback) => callback());
});

httpServer.listen(8000);
console.log("Listening to port 8000");
