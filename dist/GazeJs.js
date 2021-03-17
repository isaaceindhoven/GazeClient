var GazeJs;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Queue.ts":
/*!**********************!*\
  !*** ./src/Queue.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Queue": () => (/* binding */ Queue)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Queue {
    constructor() {
        this.queue = [];
        this.isBusy = false;
    }
    add(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this.queue.push(callback);
            yield this.process();
        });
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isBusy || this.queue.length == 0)
                return;
            this.isBusy = true;
            yield this.queue[0]();
            this.queue.shift();
            this.isBusy = false;
            yield this.process();
        });
    }
}



/***/ }),

/***/ "./src/Subscription.ts":
/*!*****************************!*\
  !*** ./src/Subscription.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Subscription": () => (/* binding */ Subscription)
/* harmony export */ });
/* harmony import */ var _Queue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Queue */ "./src/Queue.ts");

class Subscription {
    constructor(callbackId, payloadCallback) {
        this.callbackId = callbackId;
        this.payloadCallback = payloadCallback;
        this.topics = [];
        this.queue = new _Queue__WEBPACK_IMPORTED_MODULE_0__.Queue();
    }
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/GazeJs.ts ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscription */ "./src/Subscription.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

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
            let subscription = new _Subscription__WEBPACK_IMPORTED_MODULE_0__.Subscription(this.generateCallbackId(), payloadCallback);
            this.subscriptions.push(subscription);
            yield this.update(subscription, topicsCallback);
            return {
                update: () => this.update(subscription, topicsCallback)
            };
        });
    }
    update(subscription, topicsCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            let newTopics = yield topicsCallback();
            newTopics = Array.from(new Set(newTopics));
            let topicsToRemove = subscription.topics.filter(t => !newTopics.includes(t));
            let topicsToAdd = newTopics.filter(t => !subscription.topics.includes(t));
            if (topicsToRemove.length + topicsToAdd.length == 0)
                return;
            yield subscription.queue.add(() => __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(`${this.hubUrl}/subscription`, {
                method,
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GazeJs);

})();

GazeJs = __webpack_exports__.default;
/******/ })()
;
//# sourceMappingURL=GazeJs.js.map