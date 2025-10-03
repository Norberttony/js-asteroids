
import { GameObject } from "../game-engine/game-object.js";
import { PolylineComp, TransformComp } from "./components.js";


export function render(ctx: CanvasRenderingContext2D, objects: GameObject[]){
    renderClear(ctx);
    renderPolylines(ctx, objects);
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

function renderPolylines(ctx: CanvasRenderingContext2D, objects: GameObject[]){
    for (const o of objects){
        const poly = o.getComp(PolylineComp);
        const tran = o.getComp(TransformComp);
        if (poly && tran && poly.points.length > 0){
            ctx.fillStyle = poly.fillColor;
            ctx.strokeStyle = poly.strokeColor;
            ctx.lineWidth = poly.strokeWidth;

            // transform
            ctx.translate(tran.x, tran.y);
            ctx.rotate(tran.rad);

            // draw polygon
            const first = poly.points[0];
            ctx.beginPath();
            ctx.moveTo(first.x, first.y);
            for (const { x, y } of poly.points)
                ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            // undo transform
            ctx.rotate(-tran.rad);
            ctx.translate(-tran.x, -tran.y);
        }
    }
}
