
import { Game_Object } from "./game-object.mjs";


export abstract class Scene {
    private objects: Game_Object[] = [];

    // time accounting for simulation
    private simLastUpdate: number = Date.now();
    private simLag: number = 0;

    // time accounting for rendering
    private renLastUpdate: number = Date.now();
    private renLag: number = 0;

    constructor(
        private simulate: Function,
        private render: Function,
        public msPerUpdate: number,
        public framecap: number
    ){}

    addObject(obj: Game_Object): void {
        this.objects.push(obj);
    }

    // updates the simulation of the game objects (ie. physics, AI, non-rendering).
    updateSim(): void {
        const now = Date.now();
        const diff = now - this.simLastUpdate;
        this.simLag += diff;

        while (this.simLag >= this.msPerUpdate){
            this.simulate(this.objects, this.msPerUpdate / 1000);
            this.simLag -= this.msPerUpdate;
        }

        this.simLastUpdate = now;
    }

    // renders the scene given a rendering context, which is usually returned by a Canvas DOM
    // element or an OffscreenCanvas instance
    renderScene(ctx: RenderingContext): void {
        const now = Date.now();
        const diff = now - this.renLastUpdate;
        this.renLag += diff;

        if (this.renLag >= 1000 / this.framecap){
            this.render(ctx, this.objects);
            this.renLag = 0;
        }
    }

    // should return JSON of every currently synced component and game object id
    // in the future: should be given a player to get a perspective snapshot.
    getSnapshot(): string {
        return "";
    }
}
