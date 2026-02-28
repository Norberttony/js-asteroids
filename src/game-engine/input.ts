import { Action, ActionConstructor } from "./action.js";

// client-side script that handles listening to input from the user...

export interface InputMap {
    [key: string]: ActionConstructor | undefined;
};

export interface InputEvent {
    actionInvoked: Action,
    inputType: "pressed" | "held" | "released",
    timestamp: number
};

export class InputManager {
    constructor(
        private target: Element,
        private inputMap: InputMap = {}
    ){
        this.target.addEventListener("keydown", (event: KeyboardEvent) => {
            const k = event.key.toLowerCase();
            const action: ActionConstructor | undefined = this.inputMap[k];
            if (action)
                console.log(action);
        });
    }

    public bindKey(key: string, action: ActionConstructor): void {
        this.inputMap[key.toLowerCase()] = action;
    }

    public unbindKey(key: string): void {
        delete this.inputMap[key.toLowerCase()];
    }
}
