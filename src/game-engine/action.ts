export type ActionConstructor = new (goId: number) => Action;

export abstract class Action {
    constructor(
        private goId: number
    ){}

    public getGameObjectId(): number {
        return this.goId;
    }
}
