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

    unauthenticate(): void | Promise<void> {
        this.calls.push({'name': 'unauthenticate', payload: []});
    }

    setClientId(clientId: string): void {
        return;
    }

    public getCallsByName(name: string): Call[] {
        return this.calls.filter(c => c.name == name)
    }
    
}

export { DummyGazeRequestor }
