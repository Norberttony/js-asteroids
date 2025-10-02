
import { Component } from "../game-engine/component.js";


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

export class Fake extends Component {
    constructor(){
        super();
    }
}

export default [ Transform_Comp, Physics_Comp ];
