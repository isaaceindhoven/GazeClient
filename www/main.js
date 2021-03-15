(() => {
  // src/Gaze.ts
  var Gaze = class {
    constructor(hubUrl, tokenUrl) {
      this.hubUrl = hubUrl;
      this.tokenUrl = tokenUrl;
      this.connected = false;
      this.SSE = null;
      this.token = null;
      this.callbacks = [];
    }
    async connect() {
      return new Promise(async (resolve) => {
        let req = await fetch(this.tokenUrl);
        this.token = (await req.json()).token;
        this.SSE = new EventSource(`${this.hubUrl}/sse?token=${this.token}`);
        this.SSE.onmessage = (m) => {
          let data = JSON.parse(m.data);
          this.callbacks.find((c) => c.callbackId == data.callbackId)?.callback(data.payload);
        };
        this.SSE.onopen = () => {
          this.connected = true;
          resolve(this);
        };
      });
    }
    async on(topicsCallback, payloadCallback) {
      if (!this.connected) {
        throw new Error("Gaze is not connected to a hub");
      }
      let callbackId = this.callbacks.length.toString();
      let topics = await topicsCallback();
      let callback = {callbackId, payloadCallback, isBusy: false};
      this.callbacks.push(callback);
      await this.subscribeRequest(null, "POST", {callbackId, topics});
      let abortController = null;
      return {
        update: async () => {
          if (callback.isBusy)
            return;
          callback.isBusy = true;
          if (abortController != null) {
            abortController.abort();
          }
          abortController = new AbortController();
          let newTopics = await topicsCallback();
          let topicsToRemove = topics.filter((t) => !newTopics.includes(t));
          let topicsToAdd = newTopics.filter((t) => !topics.includes(t));
          await this.subscribeRequest(abortController, "DELETE", {topics: topicsToRemove});
          await this.subscribeRequest(abortController, "POST", {callbackId, topics: topicsToAdd});
          topics = newTopics;
          callback.isBusy = false;
        }
      };
    }
    subscribeRequest(abortController, method, data) {
      return fetch(`${this.hubUrl}/subscription`, {
        method,
        signal: abortController == null ? null : abortController.signal,
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    }
  };
  var Gaze_default = Gaze;

  // src/main.ts
  (async () => {
    const gaze = await new Gaze_default("http://localhost:3333", "http://localhost:8001/token.php").connect();
    let products = [1, 2, 3];
    let sub = await gaze.on(() => products.map((id) => `ProductCreated/${id}`), (payload) => {
      console.log(payload);
    });
    products = [2, 3, 4];
    sub.update();
    products = [10, 11, 12];
    sub.update();
    products = [22, 33, 33];
    sub.update();
  })();
})();
