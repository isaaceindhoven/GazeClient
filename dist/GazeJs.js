var GazeJs;(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};(()=>{t.d(e,{default:()=>u});var n=function(){function t(){this.queue=[],this.isBusy=!1}return t.prototype.add=function(t){this.queue.push(t),this.process()},t.prototype.process=function(){return t=this,e=void 0,r=function(){return function(t,e){var n,r,i,o,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,r=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!((i=(i=u.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){u=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){u.label=o[1];break}if(6===o[0]&&u.label<i[1]){u.label=i[1],i=o;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(o);break}i[2]&&u.ops.pop(),u.trys.pop();continue}o=e.call(t,u)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}(this,(function(t){switch(t.label){case 0:return this.isBusy||0==this.queue.length?[2]:(this.isBusy=!0,[4,this.queue[0]()]);case 1:return t.sent(),this.queue.shift(),this.isBusy=!1,this.process(),[2]}}))},new((n=void 0)||(n=Promise))((function(i,o){function u(t){try{c(r.next(t))}catch(t){o(t)}}function s(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(u,s)}c((r=r.apply(t,e||[])).next())}));var t,e,n,r},t}(),r=function(t,e){this.callbackId=t,this.payloadCallback=e,this.topics=[],this.queue=new n},i=function(t,e,n,r){return new(n||(n=Promise))((function(i,o){function u(t){try{c(r.next(t))}catch(t){o(t)}}function s(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(u,s)}c((r=r.apply(t,e||[])).next())}))},o=function(t,e){var n,r,i,o,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,r=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!((i=(i=u.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){u=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){u.label=o[1];break}if(6===o[0]&&u.label<i[1]){u.label=i[1],i=o;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(o);break}i[2]&&u.ops.pop(),u.trys.pop();continue}o=e.call(t,u)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}};const u=function(){function t(t,e){this.hubUrl=t,this.tokenUrl=e,this.connected=!1,this.SSE=null,this.token=null,this.subscriptions=[]}return t.prototype.connect=function(){return i(this,void 0,void 0,(function(){var t=this;return o(this,(function(e){return[2,new Promise((function(e){return i(t,void 0,void 0,(function(){var t,n,r=this;return o(this,(function(i){switch(i.label){case 0:return[4,fetch(this.tokenUrl)];case 1:return t=i.sent(),n=this,[4,t.json()];case 2:return n.token=i.sent().token,this.SSE=new EventSource(this.hubUrl+"/sse?token="+this.token),this.SSE.onmessage=function(t){var e,n=JSON.parse(t.data);null===(e=r.subscriptions.find((function(t){return t.callbackId==n.callbackId})))||void 0===e||e.payloadCallback(n.payload)},this.SSE.onopen=function(){r.connected=!0,e(r)},[2]}}))}))}))]}))}))},t.prototype.on=function(t,e){return i(this,void 0,void 0,(function(){var n,i=this;return o(this,(function(o){switch(o.label){case 0:if(!this.connected)throw new Error("Gaze is not connected to a hub");return n=new r(this.generateCallbackId(),e),this.subscriptions.push(n),[4,this.update(n,t)];case 1:return o.sent(),[2,{update:function(){return i.update(n,t)}}]}}))}))},t.prototype.update=function(t,e){return i(this,void 0,void 0,(function(){var n,r,u,s=this;return o(this,(function(c){switch(c.label){case 0:return[4,e()];case 1:return n=c.sent(),n=Array.from(new Set(n)),r=t.topics.filter((function(t){return!n.includes(t)})),u=n.filter((function(e){return!t.topics.includes(e)})),r.length+u.length==0||(t.queue.add((function(){return i(s,void 0,void 0,(function(){return o(this,(function(e){switch(e.label){case 0:return r.length>0?[4,this.subscribeRequest("DELETE",{topics:r})]:[3,2];case 1:e.sent(),e.label=2;case 2:return u.length>0?[4,this.subscribeRequest("POST",{callbackId:t.callbackId,topics:u})]:[3,4];case 3:e.sent(),e.label=4;case 4:return[2]}}))}))})),t.topics=n),[2]}}))}))},t.prototype.subscribeRequest=function(t,e){return fetch(this.hubUrl+"/subscription",{method:t,headers:{Authorization:"Bearer "+this.token,"Content-Type":"application/json"},body:JSON.stringify(e)})},t.prototype.generateCallbackId=function(){var t=Math.random().toString(36).substring(7);return null==this.subscriptions.find((function(e){return e.callbackId==t}))?t:this.generateCallbackId()},t}()})(),GazeJs=e.default})();
//# sourceMappingURL=GazeJs.js.map