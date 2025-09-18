
import { Asteroids_Scene } from "../game-modules/scene.mjs";

const gameElem = document.getElementsByClassName("game")[0] as HTMLCanvasElement;
const gameCtx = gameElem.getContext("2d") as CanvasRenderingContext2D;

const scene = new Asteroids_Scene();

function mainLoop(){

    scene.updateSim();
    scene.renderScene(gameCtx);

    requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
