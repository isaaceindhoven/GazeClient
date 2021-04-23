import { GazeRequestor } from '../../src/GazeRequestor';

type SubCall = {
    name: string,
    topics: string[]
}

class DummyGazeRequestor implements GazeRequestor {

    public calls: SubCall[] = [];

    ping(): void | Promise<void> {
        
    }

    subscribe(topics: string[]): void | Promise<void> {
        this.calls.push({'name' : 'subscribe', topics});
    }

    unsubscribe(topics: string[]): void | Promise<void> {
        this.calls.push({'name' : 'unsubscribe', topics});
    }
    
}

export { DummyGazeRequestor }
