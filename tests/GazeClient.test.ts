import GazeClient from "../src/GazeClient"
import { GazeRequestorStub } from "./utils/GazeRequestorStub"

test("if topics can be parsed from string", done => {
    const gaze = new GazeClient("HUB_URL", "TOKEN_URL")
    const gazeRequestorStub = new GazeRequestorStub()
    gazeRequestorStub.sseStub.onOpenSetCallback = () => {
        gazeRequestorStub.sseStub.onopen()
    }
    gaze.gazeRequestor = gazeRequestorStub as any
    gaze.connect().then(() => {
        gaze.on("cool", payload => {
            expect(payload).toEqual({"name" : "kevin"})
            done()
        }).then(() => {
            gazeRequestorStub.sseStub.onmessage({
                data: JSON.stringify({
                    "topic" : "cool",
                    "payload":{"name" : "kevin"},
                })
            })
        })
    })
})

test("if topics can be parsed from array", done => {
    const gaze = new GazeClient("HUB_URL", "TOKEN_URL")
    const gazeRequestorStub = new GazeRequestorStub()
    gazeRequestorStub.sseStub.onOpenSetCallback = () => {
        gazeRequestorStub.sseStub.onopen()
    }
    gaze.gazeRequestor = gazeRequestorStub as any
    gaze.connect().then(() => {
        gaze.on(["cool"], payload => {
            expect(payload).toEqual({"name" : "kevin"})
            done()
        }).then(() => {
            gazeRequestorStub.sseStub.onmessage({
                data: JSON.stringify({
                    "topic" : "cool",
                    "payload":{"name" : "kevin"},
                })
            })
        })
    })
})

test("if topics can be parsed from string callback", done => {
    const gaze = new GazeClient("HUB_URL", "TOKEN_URL")
    const gazeRequestorStub = new GazeRequestorStub()
    gazeRequestorStub.sseStub.onOpenSetCallback = () => {
        gazeRequestorStub.sseStub.onopen()
    }
    gaze.gazeRequestor = gazeRequestorStub as any
    gaze.connect().then(() => {
        gaze.on(() => ["cool"], payload => {
            expect(payload).toEqual({"name" : "kevin"})
            done()
        }).then(() => {
            gazeRequestorStub.sseStub.onmessage({
                data: JSON.stringify({
                    "topic" : "cool",
                    "payload":{"name" : "kevin"},
                })
            })
        })
    })
})

test("if topics throws if object topics given", done => {
    const gaze = new GazeClient("HUB_URL", "TOKEN_URL")
    const gazeRequestorStub = new GazeRequestorStub()
    gazeRequestorStub.sseStub.onOpenSetCallback = () => {
        gazeRequestorStub.sseStub.onopen()
    }
    gaze.gazeRequestor = gazeRequestorStub as any
    gaze.connect().then(() => {
        expect(gaze.on({} as any, () => {})).rejects.toThrow("Topic callback must be a function")
        done()
    })
})

test("if no subscription change is made if topics are the same", done => {
    const gaze = new GazeClient("HUB_URL", "TOKEN_URL")
    const gazeRequestorStub = new GazeRequestorStub()
    gazeRequestorStub.sseStub.onOpenSetCallback = () => {
        gazeRequestorStub.sseStub.onopen()
    }
    gaze.gazeRequestor = gazeRequestorStub as any
    gaze.connect().then(async () => {
        let topics = ["A", "B", "C"]
        const sub = await gaze.on(() => topics, () => {})
        await sub.update()
        expect(gazeRequestorStub.subscriptionsRequests.length).toBe(1)
        done()
    })
})

test("if connect resolves when onopen is called", done => {
    const gaze = new GazeClient("HUB_URL", "TOKEN_URL")
    const gazeRequestorStub = new GazeRequestorStub()
    gazeRequestorStub.sseStub.onOpenSetCallback = () => {
        gazeRequestorStub.sseStub.onopen()
    }
    gaze.gazeRequestor = gazeRequestorStub as any
    gaze.connect().then(() => done())
})

test("if ping method is called on connect", done => {
    const gaze = new GazeClient("HUB_URL", "TOKEN_URL")
    const gazeRequestorStub = new GazeRequestorStub()
    gaze.gazeRequestor = gazeRequestorStub as any
    setTimeout(() => { gazeRequestorStub.sseStub.onopen() }, 550)
    gaze.connect().then(() => {
        expect(gazeRequestorStub.methodCalls.includes("ping")).toBe(true)
        done()
    })
})

test("if throws when not connected", () => {
    const gaze = new GazeClient("HUB_URL", "TOKEN_URL")
    const gazeRequestorStub = new GazeRequestorStub()
    gaze.gazeRequestor = gazeRequestorStub as any
    gazeRequestorStub.sseStub.onOpenSetCallback = () => {
        gazeRequestorStub.sseStub.onopen()
    }
    expect(gaze.on("cool", () => {})).rejects.toThrow("Gaze is not connected to a hub")
})

test("if topics can be parsed from string", done => {
    const gaze = new GazeClient("HUB_URL", "TOKEN_URL")
    const gazeRequestorStub = new GazeRequestorStub()
    gazeRequestorStub.sseStub.onOpenSetCallback = () => {
        gazeRequestorStub.sseStub.onopen()
    }
    gaze.gazeRequestor = gazeRequestorStub as any
    gaze.connect().then(() => {
        expect(gaze.on("cool", "notvalid" as any)).rejects.toThrow("Callback must be a function")
        expect(gaze.on("cool", {} as any)).rejects.toThrow("Callback must be a function")
        expect(gaze.on("cool", ["notvalid"] as any)).rejects.toThrow("Callback must be a function")
        done()
    })
})