import { GazeRequestor } from '../../src/Requestors/GazeRequestor';

type Call = {
    name: string,
    payload: string[]
}

class DummyGazeRequestor implements GazeRequestor {

    public calls: Call[] = [];

    subscribe(topics: string[]): void | Promise<void> {
        this.calls.push({'name' : 'subscribe', payload: topics});
    }

    unsubscribe(topics: string[]): void | Promise<void> {
        this.calls.push({'name' : 'unsubscribe', payload: topics});
    }

    authenticate(token: string): void | Promise<void> {
        this.calls.push({'name' : 'authenticate', payload: [token]});
    }

    setClientId(clientId: string): void {
        return;
    }
    
}

export { DummyGazeRequestor }
