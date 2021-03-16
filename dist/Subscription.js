"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const Queue_1 = require("./Queue");
class Subscription {
    constructor(callbackId, payloadCallback) {
        this.callbackId = callbackId;
        this.payloadCallback = payloadCallback;
        this.topics = [];
        this.queue = new Queue_1.Queue();
    }
}
exports.Subscription = Subscription;
