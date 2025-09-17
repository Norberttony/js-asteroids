
import { Component } from "../game-engine/component.mjs";


export class Transform_Comp extends Component {
    constructor(
        public x: number,
        public y: number
    ){
        super();
    }
}

export class Physics_Comp extends Component {
    public accX: number = 0;
    public accY: number = 0;

    constructor(
        public velX: number,
        public velY: number
    ){
        super();
    }
}
