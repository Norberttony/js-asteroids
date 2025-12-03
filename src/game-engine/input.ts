
import { ClientNetworkManager } from "./client-network-manager.js";
import { BaseClientSocket } from "./socket-types.js";
import { Action } from "./action.js";

// client-side script that handles listening to input from the user...

export class Input {
    constructor(
        private target: Element,
        private cnm: ClientNetworkManager<BaseClientSocket>
    ){}


}
