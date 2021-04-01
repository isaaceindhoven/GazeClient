import GazeJs from "./../src/GazeJs";

(global.EventSource as any) = {};
(global.fetch as any) = () => {};

test("if connection works", async () => {
    const gaze = new GazeJs("HUB_URL", "TOKEN_URL");
    await gaze.connect();
});