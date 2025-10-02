
import { Component } from "../game-engine/component.js";


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

export default [ TransformComp, PhysicsComp ];
