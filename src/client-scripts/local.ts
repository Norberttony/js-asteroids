import { AsteroidsScene } from "../game-modules/scene.js";
import { AsteroidsClientNetwork } from "../game-modules/client-network.js";
import { InputManager } from "../game-engine/input.js";
import { MoveUpAction } from "../game-modules/actions.js"

const gameElem = document.getElementsByClassName("game")[0] as HTMLCanvasElement;
const gameCtx = gameElem.getContext("2d") as CanvasRenderingContext2D;

// initialize input map and manager
const inpMan = new InputManager(document.body);
inpMan.bindKey("w", MoveUpAction);

// initialize scene and network management
const scene = new AsteroidsScene();
const cnm = new AsteroidsClientNetwork(scene);
console.log(cnm);

scene.setInputManager(inpMan);

requestAnimationFrame(mainLoop);

function mainLoop(){

    scene.updateSim();
    scene.renderScene(gameCtx);

    requestAnimationFrame(mainLoop);
}
