/**
  *   Do not remove or alter the notices in this preamble.
  *   This software code regards ISAAC Standard Software.
  *   Copyright © 2021 ISAAC and/or its affiliates.
  *   www.isaac.nl All rights reserved. License grant and user rights and obligations
  *   according to applicable license agreement. Please contact sales@isaac.nl for
  *   questions regarding license and user rights.
  */

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
