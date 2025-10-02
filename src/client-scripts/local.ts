
import { AsteroidsScene } from "../game-modules/scene.js";
import { AsteroidsClientNetwork } from "../game-modules/client-network.js";


const gameElem = document.getElementsByClassName("game")[0] as HTMLCanvasElement;
const gameCtx = gameElem.getContext("2d") as CanvasRenderingContext2D;

const scene = new AsteroidsScene();
const cnm = new AsteroidsClientNetwork(scene);
console.log(cnm);

requestAnimationFrame(mainLoop);

function mainLoop(){

    scene.updateSim();
    scene.renderScene(gameCtx);

    requestAnimationFrame(mainLoop);
}
