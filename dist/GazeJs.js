"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GazeJs = void 0;
const Subscription_1 = require("./Subscription");
class GazeJs {
    constructor(hubUrl, tokenUrl) {
        this.hubUrl = hubUrl;
        this.tokenUrl = tokenUrl;
        this.connected = false;
        this.SSE = null;
        this.token = null;
        this.subscriptions = [];
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let req = yield fetch(this.tokenUrl);
                this.token = (yield req.json()).token;
                this.SSE = new EventSource(`${this.hubUrl}/sse?token=${this.token}`);
                this.SSE.onmessage = m => {
                    var _a;
                    let data = JSON.parse(m.data);
                    (_a = this.subscriptions.find(s => s.callbackId == data.callbackId)) === null || _a === void 0 ? void 0 : _a.payloadCallback(data.payload);
                };
                this.SSE.onopen = () => {
                    this.connected = true;
                    resolve(this);
                };
            }));
        });
    }
    on(topicsCallback, payloadCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connected)
                throw new Error("Gaze is not connected to a hub");
            let subscription = new Subscription_1.Subscription(this.generateCallbackId(), payloadCallback);
            this.subscriptions.push(subscription);
            this.update(subscription, topicsCallback);
            return {
                update: () => this.update(subscription, topicsCallback)
            };
        });
    }
    update(subscription, topicsCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            let newTopics = yield topicsCallback();
            newTopics = [...new Set(newTopics)];
            let topicsToRemove = subscription.topics.filter(t => !newTopics.includes(t));
            let topicsToAdd = newTopics.filter(t => !subscription.topics.includes(t));
            if (topicsToRemove.length + topicsToAdd.length == 0)
                return;
            subscription.queue.add(() => __awaiter(this, void 0, void 0, function* () {
                if (topicsToRemove.length > 0) {
                    yield this.subscribeRequest("DELETE", { topics: topicsToRemove });
                }
                if (topicsToAdd.length > 0) {
                    yield this.subscribeRequest("POST", {
                        callbackId: subscription.callbackId,
                        topics: topicsToAdd
                    });
                }
            }));
            subscription.topics = newTopics;
        });
    }
    subscribeRequest(method, data) {
        return fetch(`${this.hubUrl}/subscription`, {
            method,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
    generateCallbackId() {
        let UUID = Math.random().toString(36).substring(7);
        if (this.subscriptions.find(s => s.callbackId == UUID) == null) {
            return UUID;
        }
        return this.generateCallbackId();
    }
}
exports.GazeJs = GazeJs;
