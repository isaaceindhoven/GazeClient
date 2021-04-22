import { GazeRequestor } from "../../src/GazeRequestor";

class DummyGazeRequestor implements GazeRequestor {
    ping(): void | Promise<void> {
        
    }
    subscibe(topics: string[]): void | Promise<void> {
        
    }
    unsubscibe(topics: string[]): void | Promise<void> {
        
    }
    
}

export { DummyGazeRequestor }