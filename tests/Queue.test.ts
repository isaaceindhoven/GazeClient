import { Queue } from "./../src/Queue";

test("if queue works", async () => {
    let completed = false;
    const queue = new Queue();
    await queue.add(() => completed = true);
    expect(completed).toBe(true);
});