import GazeClient from '../src/GazeClient'
import { DummyEventSource } from './utils/DummyEventSource'
import { DummyGazeRequestor } from './utils/DummyGazeRequestor';

async function init(){
    const dummyEventSource = new DummyEventSource();
    const dummyGazeRequestor = new DummyGazeRequestor();

    setTimeout(() => { dummyEventSource.onopen() }, 0);

    const gaze = await new GazeClient('HUB_URL', 'TOKEN_URL', dummyEventSource, dummyGazeRequestor).connect();

    const emit = (payload: unknown) => dummyEventSource.onmessage({data: JSON.stringify(payload)});

    return { emit, gaze };
}

let messages = [];

beforeEach(() => {
    messages = [];
});

async function on(gaze, topics){
    await gaze.on(topics, payload => {
        messages.push({topics, payload})
    })
}

test('test if the right callback is called', async () => {
    const { emit, gaze } = await init();

    await on(gaze, 'event1');
    await on(gaze, ['event2']);
    
    emit({ topic : 'event1', payload : {name : 'kevin'} });

    expect(messages.length).toBe(1);
    expect(messages[0].topics).toBe('event1');
    expect(messages[0].payload).toMatchObject({name : 'kevin'});
})

test('if all callbacks are called with same topic', async () => {
    const { emit, gaze } = await init();

    await on(gaze, 'event1');
    await on(gaze, 'event1');
    
    emit({ topic : 'event1', payload : {name : 'kevin'} });

    expect(messages.length).toBe(2);
    expect(messages[0].topics).toBe('event1');
    expect(messages[0].payload).toMatchObject({name : 'kevin'});
    expect(messages[1].topics).toBe('event1');
    expect(messages[1].payload).toMatchObject({name : 'kevin'});
})

test('if topics can be a callback that returns an array', async () => {
    const { emit, gaze } = await init();

    await on(gaze, () => ['event1']);
    
    emit({ topic : 'event1', payload : {name : 'kevin'} });

    expect(messages.length).toBe(1);
    expect(messages[0].payload).toMatchObject({name : 'kevin'});
})

test('if callback must be a function', async () => {
    const { gaze } = await init();
    expect(gaze.on('cool', 'notvalid' as any)).rejects.toThrow('Callback must be a function')
    expect(gaze.on('cool', {} as any)).rejects.toThrow('Callback must be a function')
    expect(gaze.on('cool', ['notvalid'] as any)).rejects.toThrow('Callback must be a function')
})

test('if topics throws if object topics given', async () => {
    const { gaze } = await init();
    expect(gaze.on({} as any, () => {})).rejects.toThrow('Topic callback must be a function')
})


// test('if no subscription change is made if topics are the same', done => {
//     const gaze = new GazeClient('HUB_URL', 'TOKEN_URL')
//     const gazeRequestorStub = new GazeRequestorStub()
//     gazeRequestorStub.sseStub.onOpenSetCallback = () => {
//         gazeRequestorStub.sseStub.onopen()
//     }
//     gaze.gazeRequestor = gazeRequestorStub as any
//     gaze.connect().then(async () => {
//         let topics = ['A', 'B', 'C']
//         const sub = await gaze.on(() => topics, () => {})
//         await sub.update()
//         expect(gazeRequestorStub.subscriptionsRequests.length).toBe(1)
//         done()
//     })
// })

// test('if throws when not connected', () => {
//     const gaze = new GazeClient('HUB_URL', 'TOKEN_URL')
//     const gazeRequestorStub = new GazeRequestorStub()
//     gaze.gazeRequestor = gazeRequestorStub as any
//     gazeRequestorStub.sseStub.onOpenSetCallback = () => {
//         gazeRequestorStub.sseStub.onopen()
//     }
//     expect(gaze.on('cool', () => {})).rejects.toThrow('Gaze is not connected to a hub')
// })