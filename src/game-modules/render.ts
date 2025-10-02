
import { GameObject } from "../game-engine/game-object.js";
import { TransformComp } from "./components.js";


export function render(ctx: CanvasRenderingContext2D, objects: GameObject[]){
    renderClear(ctx);
    renderTransforms(ctx, objects);
}

function renderClear(ctx: CanvasRenderingContext2D){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function renderTransforms(ctx: CanvasRenderingContext2D, objects: GameObject[]){
    ctx.fillStyle = "red";
    for (const o of objects){
        const tran = o.getComp(TransformComp);
        if (tran !== undefined){
            ctx.beginPath();
            ctx.arc(tran.x, tran.y, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}
