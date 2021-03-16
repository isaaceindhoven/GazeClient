(() => {
  // src/Queue.ts
  var Queue = class {
    constructor() {
      this.queue = [];
      this.isBusy = false;
    }
    add(callback) {
      this.queue.push(callback);
      this.process();
    }
    async process() {
      if (this.isBusy || this.queue.length == 0)
        return;
      this.isBusy = true;
      await this.queue[0]();
      this.queue.shift();
      this.isBusy = false;
      this.process();
    }
  };
  var Queue_default = Queue;

  // src/Subscription.ts
  var Subscription = class {
    constructor(callbackId, payloadCallback) {
      this.callbackId = callbackId;
      this.payloadCallback = payloadCallback;
      this.topics = [];
      this.queue = new Queue_default();
    }
  };
  var Subscription_default = Subscription;

  // src/Gaze.ts
  var Gaze = class {
    constructor(hubUrl, tokenUrl) {
      this.hubUrl = hubUrl;
      this.tokenUrl = tokenUrl;
      this.connected = false;
      this.SSE = null;
      this.token = null;
      this.subscriptions = [];
    }
    async connect() {
      return new Promise(async (resolve) => {
        let req = await fetch(this.tokenUrl);
        this.token = (await req.json()).token;
        this.SSE = new EventSource(`${this.hubUrl}/sse?token=${this.token}`);
        this.SSE.onmessage = (m) => {
          let data = JSON.parse(m.data);
          this.subscriptions.find((s) => s.callbackId == data.callbackId)?.payloadCallback(data.payload);
        };
        this.SSE.onopen = () => {
          this.connected = true;
          resolve(this);
        };
      });
    }
    async on(topicsCallback, payloadCallback) {
      if (!this.connected)
        throw new Error("Gaze is not connected to a hub");
      let subscription = new Subscription_default(this.generateCallbackId(), payloadCallback);
      this.subscriptions.push(subscription);
      this.update(subscription, topicsCallback);
      return {
        update: () => this.update(subscription, topicsCallback)
      };
    }
    async update(subscription, topicsCallback) {
      let newTopics = await topicsCallback();
      let topicsToRemove = subscription.topics.filter((t) => !newTopics.includes(t));
      let topicsToAdd = newTopics.filter((t) => !subscription.topics.includes(t));
      if (topicsToRemove.length + topicsToAdd.length == 0)
        return;
      subscription.queue.add(async () => {
        if (topicsToRemove.length > 0) {
          await this.subscribeRequest("DELETE", {topics: topicsToRemove});
        }
        if (topicsToAdd.length > 0) {
          await this.subscribeRequest("POST", {
            callbackId: subscription.callbackId,
            topics: topicsToAdd
          });
        }
      });
      subscription.topics = newTopics;
    }
    subscribeRequest(method, data) {
      return fetch(`${this.hubUrl}/subscription`, {
        method,
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    }
    generateCallbackId() {
      let UUID = Math.random().toString(36).substring(7);
      if (this.subscriptions.find((s) => s.callbackId == UUID) == null) {
        return UUID;
      }
      return this.generateCallbackId();
    }
  };
  var Gaze_default = Gaze;

  // src/main.ts
  (async () => {
    window.gaze = await new Gaze_default("http://localhost:3333", "http://localhost:8001/token.php").connect();
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
