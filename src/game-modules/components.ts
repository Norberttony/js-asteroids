
import { Component } from "../game-engine/component.js";

type Point = { x: number, y: number };


export class TransformComp extends Component {
    constructor(
        public x: number,
        public y: number
    ){
        super();
    }
}

export class PhysicsComp extends Component {
    public accX: number = 0;
    public accY: number = 0;

    constructor(
        public velX: number,
        public velY: number
    ){
        super();
    }
}

export class PolylineComp extends Component {
    constructor(
        public fillColor: string,
        public strokeColor: string,
        public strokeWidth: number,
        public points: Point[] = []
    ){
        super();
    }
}

export default [ TransformComp, PhysicsComp, PolylineComp ];
