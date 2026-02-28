
// generic data structure for putting messages into a queue and having another
// system retrieve them
export class MessageQueue<T> {
    private queue: T[] = [];

    constructor(){}

    public addToQueue(msg: T): void {
        this.queue.push(msg);
    }

    public readFromQueue(): T | undefined {
        return this.queue.shift();
    }

    public isQueueEmpty(): boolean {
        return this.queue.length == 0;
    }
}

// broadcasts messages to all readers, maintaining a separate queue for each.
export class MessageMultiQueue<T> {
    private listenerId: number = 0;
    private queueMap: { [listenerId: string]: MessageQueue<T> };

    constructor(){}

    public addListener(): number {
        const id: number = this.listenerId++;
        this.queueMap[id] = new MessageQueue<T>();
        return id;
    }

    public removeListener(id: number): void {
        delete this.queueMap[id];
    }

    public getQueue(id: number): MessageQueue<T> {
        return this.queueMap[id];
    }

    public addToQueue(msg: T): void {
        for (const q of Object.values(this.queueMap))
            q.addToQueue(msg);
    }
}
