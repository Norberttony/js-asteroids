import { ActionConstructor } from "./action.js";
import { MessageMultiQueue } from "./message-queue.js";

// client-side script that handles listening to input from the user...

export type InputType = "pressed" | "released";

export interface InputMap {
    [key: string]: ActionConstructor | undefined;
};

export interface ActionEvent {
    actionInvoked: ActionConstructor,
    inputType: InputType,
    timestamp: number
};

export class InputManager {
    public inputBuffer = new MessageMultiQueue<ActionEvent>();
    private activeActions = new Set<ActionConstructor>();

    constructor(
        private target: Element,
        private inputMap: InputMap = {}
    ){
        this.target.addEventListener("keydown", (event: KeyboardEvent) => {
            const k = event.key.toLowerCase();
            const action: ActionConstructor | undefined = this.inputMap[k];
            if (action && !this.activeActions.has(action)){
                this.activeActions.add(action);
                this.inputBuffer.addToQueue({
                    actionInvoked: action,
                    inputType: "pressed",
                    timestamp: new Date().getTime()
                });
            }
        });
        this.target.addEventListener("keyup", (event: KeyboardEvent) => {
            const k = event.key.toLowerCase();
            const action: ActionConstructor | undefined = this.inputMap[k];
            if (action){
                this.activeActions.delete(action);
                this.inputBuffer.addToQueue({
                    actionInvoked: action,
                    inputType: "released",
                    timestamp: new Date().getTime()
                });
            }
        });
    }

    private handleKeyboardEvent(event: KeyboardEvent, type: InputType): void {
        const k = event.key.toLowerCase();
        const action: ActionConstructor | undefined = this.inputMap[k];
        if (action){
            // event.
        }
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
