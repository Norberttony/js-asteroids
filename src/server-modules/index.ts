
import { join } from "node:path";

import express from "express";
import type { Request, Response } from "express";

import { createServer } from "http";
import { Server } from "socket.io";

import { AsteroidsScene } from "../game-modules/scene.js";
import { AsteroidsServerNetwork } from "../game-modules/server-network.js";
import type { IOServer, ServerSocket as Socket } from "../game-modules/socket-types.js";


const scene = new AsteroidsScene();
const network = new AsteroidsServerNetwork(scene);

setInterval(() => {
    scene.updateSim();
}, 100);

setInterval(() => {
    network.globalSync();
}, 1000);


const app = express();

// Set up JS routes
app.use("/game-engine", express.static(join("dist", "game-engine")));
app.use("/game-modules", express.static(join("dist", "game-modules")));
app.use("/scripts", express.static(join("dist", "client-scripts")));

// Set up TS routes (for source maps)
app.use("/src/game-engine", express.static(join("src", "game-engine")));
app.use("/src/game-modules", express.static(join("src", "game-modules")));
app.use("/src/client-scripts", express.static(join("src", "client-scripts")));

// public folder containing styles and pages
app.use(express.static(join("src", "public")));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(join("src", "public", "index.html"));
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
