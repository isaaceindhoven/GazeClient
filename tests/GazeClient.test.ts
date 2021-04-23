import { createGaze } from './Utils/GazeFactory';

let messages = [];

beforeEach(() => { messages = [] });

async function on(gaze, topics){
    await gaze.on(topics, payload => {
        messages.push({topics, payload})
    })
}

test('test if the right callback is called', async () => {
    const { emit, gaze } = await createGaze();

    await on(gaze, 'event1');
    await on(gaze, ['event2']);
    
    await emit({ topic : 'event1', payload : {name : 'kevin'} });

    expect(messages.length).toBe(1);
    expect(messages[0].topics).toBe('event1');
    expect(messages[0].payload).toMatchObject({name : 'kevin'});
})

test('if all callbacks are called with same topic', async () => {
    const { emit, gaze } = await createGaze();

    await on(gaze, 'event1');
    await on(gaze, 'event1');
    
    await emit({ topic : 'event1', payload : {name : 'kevin'} });

    expect(messages.length).toBe(2);
    expect(messages[0].topics).toBe('event1');
    expect(messages[0].payload).toMatchObject({name : 'kevin'});
    expect(messages[1].topics).toBe('event1');
    expect(messages[1].payload).toMatchObject({name : 'kevin'});
})

test('if topics can be a callback that returns an array', async () => {
    const { emit, gaze } = await createGaze();

    await on(gaze, () => ['event1']);
    
    await emit({ topic : 'event1', payload : {name : 'kevin'} });

    expect(messages.length).toBe(1);
    expect(messages[0].payload).toMatchObject({name : 'kevin'});
})

test('if callback must be a function', async () => {
    const { gaze } = await createGaze();
    expect(gaze.on('cool', 'notvalid' as any)).rejects.toThrow('Callback must be a function')
    expect(gaze.on('cool', {} as any)).rejects.toThrow('Callback must be a function')
    expect(gaze.on('cool', ['notvalid'] as any)).rejects.toThrow('Callback must be a function')
})

test('if topics throws if object topics given', async () => {
    const { gaze } = await createGaze();
    expect(gaze.on({} as any, () => {})).rejects.toThrow('Topic callback must be a function')
})

test('test if subscribe is only called once when no topics has changed', async () => {
    const { dummyGazeRequestor, gaze } = await createGaze();
    let sub1 = await gaze.on(() => ['A', 'B', 'C'], () => {});
    await sub1.update();
    let subCalls = dummyGazeRequestor.calls.filter(c => c.name == 'subscribe');
    expect(subCalls.length).toBe(1);
})

test('test if gaze must be connected before subscribing', async () => {
    const { gaze } = await createGaze(false);
    expect(gaze.on('Test', () => {})).rejects.toThrow('Gaze is not connected to a hub')
})

test('test if middleware can modify data', async () => {
    const { emit, gaze } = await createGaze();

    gaze.addMiddleware(async (payload: any, next) => {
        payload.name = 'bob';
        next(payload);
    });

    await on(gaze, 'event1');

    await emit({ topic : 'event1', payload : {name : 'kevin'} });

    expect(messages.length).toBe(1);
    expect(messages[0].topics).toBe('event1');
    expect(messages[0].payload).toMatchObject({name : 'bob'});
})

test('test if middleware can be used as a filter', async () => {
    const { emit, gaze } = await createGaze();
    await on(gaze, 'event1');
    gaze.addMiddleware((payload: any, next) => {
        if (payload.name == 'kevin') return false
        next(payload)
    })

    expect(emit({ topic : 'event1', payload : { name : 'kevin' } })).rejects.toThrow()
    await emit({ topic : 'event1', payload : { name : 'bob' } });

    expect(messages.length).toBe(1);
    expect(messages[0].topics).toBe('event1');
    expect(messages[0].payload).toMatchObject({name : 'bob'});
})
