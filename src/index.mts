
import { resolve } from "node:path";

import express from "express";
import type { Request, Response } from "express";

import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { Asteroids_Scene } from "./game-modules/scene.mjs";


const scene = new Asteroids_Scene();

setInterval(() => {
    scene.updateSim();
}, 100);


const app = express();

// Set up routes
app.use(express.static(resolve(".", "src", "public")));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(resolve(".", "src", "public", "index.html"));
});

// Set up server (with socket.io)
const httpServer = createServer(app);

const io = new Server(httpServer);

io.on("connection", (socket: Socket) => {
    console.log(socket);
});

httpServer.listen(8000);
console.log("Listening to port 8000");
