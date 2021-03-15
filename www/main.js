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
    on(topics, callback) {
      if (this.connected == false) {
        throw new Error("Gaze is not connected to a hub");
      }
      let callbackId = this.callbacks.length.toString();
      this.callbacks.push({callbackId, callback});
      fetch(`${this.hubUrl}/subscription`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({callbackId, topics})
      });
    }
  };
  var Gaze_default = Gaze;

  // src/main.ts
  var getInputVal = (selector) => document.querySelector(selector).value;
  var genUuid = () => Math.random().toString(36).substring(7);
  window.main = function() {
    return {
      connected: false,
      gaze: null,
      listeners: {},
      async init() {
        this.gaze = await new Gaze_default("http://localhost:8000", "http://localhost:8001/token.php").connect();
        this.connected = true;
      },
      async subscribe() {
        let topics = getInputVal("#topics");
        topics = JSON.parse(topics);
        let uuid = genUuid();
        this.listeners[uuid] = {
          meta: {topics},
          recieved: []
        };
        this.gaze.on(topics, (payload) => {
          this.listeners[uuid].recieved.push(payload);
        });
      },
      async emit() {
        let topic = getInputVal("#emit-topic");
        let payload = JSON.parse(document.querySelector("#emit-payload").innerHTML);
        let roles = JSON.parse(getInputVal("#emit-roles"));
        await fetch("http://localhost:8001/emit.php", {
          method: "POST",
          body: JSON.stringify({topic, payload, roles})
        });
      }
    };
  };
})();
