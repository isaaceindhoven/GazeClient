import GazeJs from "./../src/GazeJs";
import { GazeRequestorStub } from "./GazeRequestorStub";

test("if connect resolves when onopen is called", done => {
    const gaze = new GazeJs("HUB_URL", "TOKEN_URL")
    const gazeRequestorStub = new GazeRequestorStub();
    gazeRequestorStub.sseStub.onOpenSetCallback = () => {
        gazeRequestorStub.sseStub.onopen()
    }
    gaze.gazeRequestor = gazeRequestorStub as any
    gaze.connect().then(() => done())
});

test("if ping method is called on connect", done => {
    const gaze = new GazeJs("HUB_URL", "TOKEN_URL");
    const gazeRequestorStub = new GazeRequestorStub();
    gaze.gazeRequestor = gazeRequestorStub as any;
    setTimeout(() => { gazeRequestorStub.sseStub.onopen() }, 550);
    gaze.connect().then(() => {
        expect(gazeRequestorStub.methodCalls.includes("ping")).toBe(true);
        done();
    });
});

test("if throws when not connected", () => {
    const gaze = new GazeJs("HUB_URL", "TOKEN_URL");
    const gazeRequestorStub = new GazeRequestorStub();
    gaze.gazeRequestor = gazeRequestorStub as any;
    gazeRequestorStub.sseStub.onOpenSetCallback = () => {
        gazeRequestorStub.sseStub.onopen()
    }
    expect(gaze.on("cool", () => {})).rejects.toThrow("Gaze is not connected to a hub");
});

test("if topics are parsed correclty", done => {
    const gaze = new GazeJs("HUB_URL", "TOKEN_URL");
    const gazeRequestorStub = new GazeRequestorStub();
    gazeRequestorStub.sseStub.onOpenSetCallback = () => {
        gazeRequestorStub.sseStub.onopen()
    }
    gaze.gazeRequestor = gazeRequestorStub as any;
    gaze.connect().then(() => {
        gaze.on("cool", () => done()).then(() => {
            gazeRequestorStub.sseStub.onmessage({
                data: JSON.stringify({
                    "callbackId" : gazeRequestorStub.subscriptionsRequests[0].callbackId,
                    "payload":{"name" : "kevin"},
                })
            });
        });
    });
});

/**
 * Test if topics are parsed correclty
 * Test if topicsCallback is a function
 * Test if subscription is created and added to subscrions
 * Test if on returns object with a "update" function
 * Test if topics to remove is good
 * Test if topics to add is good
 * Test if noting happens when both of topicsToRemove+topicsToAdd are empty
 * Test if unsubscribe is called with the right topics
 * Test if subscribe is called with the right topics
 * Test if subscription topics are set to the new topics
 * Test if reconnect loops through all the subscriotions and fires a subscriotion function
 */