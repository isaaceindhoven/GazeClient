(() => {
  // src/Gaze.ts
  var Gaze = class {
    constructor(hubUrl, tokenUrl) {
      this.hubUrl = hubUrl;
      this.tokenUrl = tokenUrl;
      this.connected = false;
      this.SSE = null;
      this.token = null;
    }
    async connect() {
      let req = await fetch(this.tokenUrl);
      this.token = (await req.json()).token;
      this.SSE = new EventSource(`${this.hubUrl}/sse?token=${this.token}`);
      this.SSE.onopen = () => this.connected = true;
      return this;
    }
    on(eventName, selectors, callback) {
      if (this.connected == false) {
        throw new Error("Gaze is not connected to a hub");
      }
      console.log({eventName, selectors, callback});
    }
  };
  var Gaze_default = Gaze;

  // src/main.ts
  (async () => {
    let gaze = await new Gaze_default("http://localhost:8000/", "/token.php").connect();
    gaze.on("ProductCreated", [{
      field: "id",
      operator: "!=",
      value: "A"
    }], (product) => {
      console.log(product);
    });
  })();
})();
