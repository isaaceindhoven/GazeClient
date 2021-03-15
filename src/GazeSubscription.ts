import Gaze from "./Gaze";

class GazeSub {
    constructor(
        private gaze: Gaze,
        private callbackId: string,
        private topicsCallback: () => string[]) {
        this.update();
    }

    async update() {
        await fetch(`${this.gaze.getHubUrl()}/subscription`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ callbackId, topics })
        })
    }

}

export default GazeSub;
