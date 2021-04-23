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
