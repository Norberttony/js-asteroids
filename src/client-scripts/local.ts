
import { Asteroids_Scene } from "../game-modules/scene.mjs";
import { Asteroids_Client_Network } from "../game-modules/client-network.mjs";


const gameElem = document.getElementsByClassName("game")[0] as HTMLCanvasElement;
const gameCtx = gameElem.getContext("2d") as CanvasRenderingContext2D;

const scene = new Asteroids_Scene();
const cnm = new Asteroids_Client_Network(scene);
console.log(cnm);

requestAnimationFrame(mainLoop);

function mainLoop(){

    scene.updateSim();
    scene.renderScene(gameCtx);

    requestAnimationFrame(mainLoop);
}
