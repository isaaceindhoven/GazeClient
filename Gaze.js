class Gaze {
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
  async on(topics, callback) {
    if (this.connected == false) {
      throw new Error("Gaze is not connected to a hub");
    }
    let callbackId = this.callbacks.length.toString();
    this.callbacks.push({callbackId, callback});
    await fetch(`${this.hubUrl}/subscription`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({callbackId, topics})
    });
  }
}
export default Gaze;
