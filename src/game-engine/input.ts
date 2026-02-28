import { ActionConstructor } from "./action.js";

// client-side script that handles listening to input from the user...

export interface InputMap {
    [key: string]: ActionConstructor | undefined;
};

export interface InputEvent {
    actionInvoked: ActionConstructor,
    inputType: "pressed" | "released",
    timestamp: number
};

export class InputManager {
    private activeActions = new Set<ActionConstructor>();

    constructor(
        private target: Element,
        private inputMap: InputMap = {}
    ){
        this.target.addEventListener("keydown", (event: KeyboardEvent) => {
            const k = event.key.toLowerCase();
            const action: ActionConstructor | undefined = this.inputMap[k];
            if (action){
                this.activeActions.add(action);
            }
        });
        this.target.addEventListener("keyup", (event: KeyboardEvent) => {
            const k = event.key.toLowerCase();
            const action: ActionConstructor | undefined = this.inputMap[k];
            if (action){
                this.activeActions.delete(action);
            }
        });
    }

    public getActiveActions(): Set<ActionConstructor> {
        return this.activeActions;
    }

    public bindKey(key: string, action: ActionConstructor): void {
        this.inputMap[key.toLowerCase()] = action;
    }

    public unbindKey(key: string): void {
        delete this.inputMap[key.toLowerCase()];
    }
}
