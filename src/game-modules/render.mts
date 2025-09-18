
import { Game_Object } from "../game-engine/game-object.mjs";
import { Transform_Comp } from "./components.mjs";


export function render(ctx: CanvasRenderingContext2D, objects: Game_Object[]){
    renderClear(ctx);
    renderTransforms(ctx, objects);
}

function renderClear(ctx: CanvasRenderingContext2D){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function renderTransforms(ctx: CanvasRenderingContext2D, objects: Game_Object[]){
    ctx.fillStyle = "red";
    for (const o of objects){
        const tran = o.getComp(Transform_Comp);
        if (tran !== undefined){
            ctx.beginPath();
            ctx.arc(tran.x, tran.y, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}
