var GazeJs;(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};(()=>{t.d(e,{default:()=>u});var n=function(t,e,n,r){return new(n||(n=Promise))((function(i,o){function s(t){try{u(r.next(t))}catch(t){o(t)}}function c(t){try{u(r.throw(t))}catch(t){o(t)}}function u(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,c)}u((r=r.apply(t,e||[])).next())}))},r=function(t,e){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!((i=(i=s.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}},i=function(){function t(){this.queue=[],this.isBusy=!1}return t.prototype.add=function(t){return n(this,void 0,void 0,(function(){return r(this,(function(e){switch(e.label){case 0:return this.queue.push(t),[4,this.process()];case 1:return e.sent(),[2]}}))}))},t.prototype.process=function(){return n(this,void 0,void 0,(function(){return r(this,(function(t){switch(t.label){case 0:return this.isBusy||0==this.queue.length?[2]:(this.isBusy=!0,[4,this.queue[0]()]);case 1:return t.sent(),this.queue.shift(),this.isBusy=!1,[4,this.process()];case 2:return t.sent(),[2]}}))}))},t}(),o=function(t,e){this.callbackId=t,this.payloadCallback=e,this.topics=[],this.queue=new i},s=function(t,e,n,r){return new(n||(n=Promise))((function(i,o){function s(t){try{u(r.next(t))}catch(t){o(t)}}function c(t){try{u(r.throw(t))}catch(t){o(t)}}function u(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,c)}u((r=r.apply(t,e||[])).next())}))},c=function(t,e){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!((i=(i=s.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}};const u=function(){function t(t,e){this.hubUrl=t,this.tokenUrl=e,this.connected=!1,this.token=null,this.subscriptions=[],this.connectionResetCallback=null}return t.prototype.connect=function(){var t=this;return new Promise((function(e){return s(t,void 0,void 0,(function(){var t,n,r,i=this;return c(this,(function(o){switch(o.label){case 0:return[4,fetch(this.tokenUrl)];case 1:return t=o.sent(),n=this,[4,t.json()];case 2:return n.token=o.sent().token,r=new EventSource(this.hubUrl+"/sse?token="+this.token),setTimeout((function(){fetch(i.hubUrl+"/ping?token="+i.token)}),500),r.onmessage=function(t){var e,n=JSON.parse(t.data);null===(e=i.subscriptions.find((function(t){return t.callbackId==n.callbackId})))||void 0===e||e.payloadCallback(n.payload)},r.onopen=function(){return s(i,void 0,void 0,(function(){var t,n;return c(this,(function(r){switch(r.label){case 0:if(this.connected=!0,!(this.subscriptions.length>0))return[3,6];t=0,r.label=1;case 1:return t<this.subscriptions.length?(n=this.subscriptions[t],[4,this.subscribeRequest("POST",{callbackId:n.callbackId,topics:n.topics})]):[3,4];case 2:r.sent(),r.label=3;case 3:return t++,[3,1];case 4:return this.connectionResetCallback?[4,this.connectionResetCallback()]:[3,6];case 5:r.sent(),r.label=6;case 6:return e(this),[2]}}))}))},[2]}}))}))}))},t.prototype.onConnectionReset=function(t){this.connectionResetCallback=t},t.prototype.on=function(t,e){return s(this,void 0,void 0,(function(){var n,r=this;return c(this,(function(i){switch(i.label){case 0:if(!this.connected)throw new Error("Gaze is not connected to a hub");return n=new o(this.generateCallbackId(),e),this.subscriptions.push(n),[4,this.update(n,t)];case 1:return i.sent(),[2,{update:function(){return r.update(n,t)}}]}}))}))},t.prototype.update=function(t,e){return s(this,void 0,void 0,(function(){var n,r,i,o=this;return c(this,(function(u){switch(u.label){case 0:return[4,e()];case 1:return n=u.sent(),Array.isArray(n)?(n=(n=(n=Array.from(new Set(n))).filter((function(t){return!!t}))).map((function(t){return"string"!=typeof t&&(console.warn("Topic "+t+" was not a string"),t=t.toString()),t})),r=t.topics.filter((function(t){return!n.includes(t)})),i=n.filter((function(e){return!t.topics.includes(e)})),r.length+i.length==0?[2]:[4,t.queue.add((function(){return s(o,void 0,void 0,(function(){return c(this,(function(e){switch(e.label){case 0:return r.length>0?[4,this.subscribeRequest("DELETE",{topics:r})]:[3,2];case 1:e.sent(),e.label=2;case 2:return i.length>0?[4,this.subscribeRequest("POST",{callbackId:t.callbackId,topics:i})]:[3,4];case 3:e.sent(),e.label=4;case 4:return[2]}}))}))}))]):[2,console.error("Topic callback must return array")];case 2:return u.sent(),t.topics=n,[2]}}))}))},t.prototype.subscribeRequest=function(t,e){return s(this,void 0,void 0,(function(){return c(this,(function(n){switch(n.label){case 0:return[4,fetch(this.hubUrl+"/subscription",{method:t,headers:{Authorization:"Bearer "+this.token,"Content-Type":"application/json"},body:JSON.stringify(e)})];case 1:return n.sent(),[2]}}))}))},t.prototype.generateCallbackId=function(){var t=Math.random().toString(36).substring(7);return null==this.subscriptions.find((function(e){return e.callbackId==t}))?t:this.generateCallbackId()},t}()})(),GazeJs=e.default})();
//# sourceMappingURL=GazeJs.js.map