/**
  *   Do not remove or alter the notices in this preamble.
  *   This software code regards ISAAC Standard Software.
  *   Copyright © 2021 ISAAC and/or its affiliates.
  *   www.isaac.nl All rights reserved. License grant and user rights and obligations
  *   according to applicable license agreement. Please contact sales@isaac.nl for
  *   questions regarding license and user rights.
  */

import GazeClient from '../../src/GazeClient'
import { DummyEventSource } from './../Dummies/DummyEventSource'
import { DummyGazeRequestor } from './../Dummies/DummyGazeRequestor';

async function createGaze(autoConnect: boolean = true){
    const dummyEventSource = new DummyEventSource();
    const dummyGazeRequestor = new DummyGazeRequestor();

    let gaze = new GazeClient('HUB_URL', 'TOKEN_URL', dummyEventSource, dummyGazeRequestor);

    if (autoConnect){
        setTimeout(() => { dummyEventSource.onopen() }, 0);
        await gaze.connect();
    }

    const emit = async (payload: unknown) => await dummyEventSource.onmessage({data: JSON.stringify(payload)});

    return { dummyGazeRequestor, emit, gaze };
}

export { createGaze }
