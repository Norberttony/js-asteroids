
export class ListenerManager<T> {
    private listeners: ((arg: T) => any)[] = [];

    constructor(){}

    public addListener(callback: (arg: T) => any): void {
        this.listeners.push(callback);
    }

    public removeListener(callback: (arg: T) => any): void {
        const idx: number = this.listeners.indexOf(callback);
        if (idx > -1)
            this.listeners.splice(idx, 1);
    }

    public dispatch(arg: T): void {
        for (const l of this.listeners)
            l(arg);
    } 
}
