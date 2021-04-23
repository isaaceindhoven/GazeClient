define((()=>(()=>{"use strict";var t={d:(n,e)=>{for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},o:(t,n)=>Object.prototype.hasOwnProperty.call(t,n)},n={};t.d(n,{default:()=>d});var e=function(t,n,e,r){return new(e||(e=Promise))((function(i,o){function u(t){try{c(r.next(t))}catch(t){o(t)}}function s(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var n;t.done?i(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(u,s)}c((r=r.apply(t,n||[])).next())}))},r=function(t,n){var e,r,i,o,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(e)throw new TypeError("Generator is already executing.");for(;u;)try{if(e=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,r=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!((i=(i=u.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){u=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){u.label=o[1];break}if(6===o[0]&&u.label<i[1]){u.label=i[1],i=o;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(o);break}i[2]&&u.ops.pop(),u.trys.pop();continue}o=n.call(t,u)}catch(t){o=[6,t],r=0}finally{e=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}},i=function(){function t(){this.queue=[],this.isBusy=!1}return t.prototype.add=function(t){return e(this,void 0,void 0,(function(){return r(this,(function(n){switch(n.label){case 0:return this.queue.push(t),[4,this.process()];case 1:return n.sent(),[2]}}))}))},t.prototype.process=function(){return e(this,void 0,void 0,(function(){return r(this,(function(t){switch(t.label){case 0:return this.isBusy||0==this.queue.length?[2]:(this.isBusy=!0,[4,this.queue[0]()]);case 1:return t.sent(),this.queue.shift(),this.isBusy=!1,[4,this.process()];case 2:return t.sent(),[2]}}))}))},t}(),o=function(){function t(t){this.payloadCallback=t,this.topics=[],this.queue=new i}return t.prototype.topicsToRemove=function(t){return this.topics.filter((function(n){return!t.includes(n)}))},t.prototype.topicsToAdd=function(t){var n=this;return t.filter((function(t){return!n.topics.includes(t)}))},t}(),u=function(){function t(){this.subscriptions=[]}return t.prototype.getByTopic=function(t){return this.subscriptions.filter((function(n){return n.topics.includes(t)}))},t.prototype.create=function(t){var n=new o(t);return this.subscriptions.push(n),n},t.prototype.getAll=function(){return this.subscriptions},t}(),s=function(t,n,e,r){return new(e||(e=Promise))((function(i,o){function u(t){try{c(r.next(t))}catch(t){o(t)}}function s(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var n;t.done?i(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(u,s)}c((r=r.apply(t,n||[])).next())}))},c=function(t,n){var e,r,i,o,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(e)throw new TypeError("Generator is already executing.");for(;u;)try{if(e=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,r=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!((i=(i=u.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){u=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){u.label=o[1];break}if(6===o[0]&&u.label<i[1]){u.label=i[1],i=o;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(o);break}i[2]&&u.ops.pop(),u.trys.pop();continue}o=n.call(t,u)}catch(t){o=[6,t],r=0}finally{e=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}},a=function(){function t(t,n){this.hubUrl=t,this.token=n}return t.prototype.ping=function(){return s(this,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return[4,fetch(this.hubUrl+"/ping?token="+this.token)];case 1:return t.sent(),[2]}}))}))},t.prototype.subscribe=function(t){return s(this,void 0,void 0,(function(){return c(this,(function(n){switch(n.label){case 0:return[4,this.subscribeRequest("POST",t)];case 1:return n.sent(),[2]}}))}))},t.prototype.unsubscribe=function(t){return s(this,void 0,void 0,(function(){return c(this,(function(n){switch(n.label){case 0:return[4,this.subscribeRequest("DELETE",t)];case 1:return n.sent(),[2]}}))}))},t.prototype.subscribeRequest=function(t,n){return s(this,void 0,void 0,(function(){return c(this,(function(e){switch(e.label){case 0:return 0==n.length?[2]:[4,fetch(this.hubUrl+"/subscription",{method:t,headers:{Authorization:"Bearer "+this.token,"Content-Type":"application/json"},body:JSON.stringify({topics:n})})];case 1:return e.sent(),[2]}}))}))},t}(),l=function(){function t(t){this.callback=t}return t.parse=function(n){if(Array.isArray(n))return new t((function(){return n}));if("string"==typeof n)return new t((function(){return[n]}));if("function"!=typeof n)throw new Error("Topic callback must be a function");return new t(n)},t.prototype.evaluate=function(){return t=this,n=void 0,r=function(){var t;return function(t,n){var e,r,i,o,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(e)throw new TypeError("Generator is already executing.");for(;u;)try{if(e=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,r=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!((i=(i=u.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){u=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){u.label=o[1];break}if(6===o[0]&&u.label<i[1]){u.label=i[1],i=o;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(o);break}i[2]&&u.ops.pop(),u.trys.pop();continue}o=n.call(t,u)}catch(t){o=[6,t],r=0}finally{e=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}(this,(function(n){switch(n.label){case 0:return[4,this.callback()];case 1:if(t=n.sent(),!Array.isArray(t))throw new Error("Topic callback must return array");return[2,t=(t=(t=t.filter((function(t,n,e){return e.indexOf(t)==n}))).filter((function(t){return!!t}))).map((function(t){return"string"!=typeof t&&(console.warn("Topic "+t+" was not a string"),t=t.toString()),t}))]}}))},new((e=void 0)||(e=Promise))((function(i,o){function u(t){try{c(r.next(t))}catch(t){o(t)}}function s(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var n;t.done?i(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(u,s)}c((r=r.apply(t,n||[])).next())}));var t,n,e,r},t}(),f=function(){function t(){}return t.prototype.handle=function(t){var n=this;return new Promise((function(e){n.handler(t,(function(t){n.next?n.next.handle(t).then(e):e(t)}))}))},t}(),h=function(){function t(){this.first=null,this.last=null}return t.prototype.add=function(t){null===this.first?this.first=t:this.last.next=t,this.last=t},t}(),p=function(t,n,e,r){return new(e||(e=Promise))((function(i,o){function u(t){try{c(r.next(t))}catch(t){o(t)}}function s(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var n;t.done?i(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(u,s)}c((r=r.apply(t,n||[])).next())}))},b=function(t,n){var e,r,i,o,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(e)throw new TypeError("Generator is already executing.");for(;u;)try{if(e=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,r=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!((i=(i=u.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){u=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){u.label=o[1];break}if(6===o[0]&&u.label<i[1]){u.label=i[1],i=o;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(o);break}i[2]&&u.ops.pop(),u.trys.pop();continue}o=n.call(t,u)}catch(t){o=[6,t],r=0}finally{e=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}};const d=function(){function t(t,n,e,r){void 0===e&&(e=null),void 0===r&&(r=null),this.hubUrl=t,this.token=n,this.sseClient=e,this.gazeRequestor=r,this.connected=!1,this.subscriptions=new u,this.middlewareList=new h,this.onConnectionReset=null,null===this.gazeRequestor&&(this.gazeRequestor=new a(this.hubUrl,this.token)),null===this.sseClient&&(this.sseClient=new EventSource(this.hubUrl+"/sse?token="+this.token))}return t.prototype.connect=function(){var t=this;return new Promise((function(n){return p(t,void 0,void 0,(function(){var t=this;return b(this,(function(e){return setTimeout((function(){return t.gazeRequestor.ping()}),500),this.sseClient.onmessage=function(n){return p(t,void 0,void 0,(function(){var t,e,r;return b(this,(function(i){switch(i.label){case 0:return i.trys.push([0,3,,4]),t=JSON.parse(n.data),this.middlewareList.first?(e=t,[4,this.middlewareList.first.handle(t.payload)]):[3,2];case 1:e.payload=i.sent(),i.label=2;case 2:return this.subscriptions.getByTopic(t.topic).forEach((function(n){return n.payloadCallback(t.payload)})),[3,4];case 3:return r=i.sent(),console.error(r),[3,4];case 4:return[2]}}))}))},this.sseClient.onopen=function(){return p(t,void 0,void 0,(function(){return b(this,(function(t){switch(t.label){case 0:return this.connected=!0,[4,this.reconnect()];case 1:return t.sent(),n(this),[2]}}))}))},[2]}))}))}))},t.prototype.on=function(t,n){return p(this,void 0,void 0,(function(){var e,r,i=this;return b(this,(function(o){switch(o.label){case 0:if(!this.connected)throw new Error("Gaze is not connected to a hub");if("function"!=typeof n)throw new Error("Callback must be a function");return e=l.parse(t),r=this.subscriptions.create(n),[4,this.update(r,e)];case 1:return o.sent(),[2,{update:function(){return i.update(r,e)}}]}}))}))},t.prototype.update=function(t,n){return p(this,void 0,void 0,(function(){var e,r,i,o,u=this;return b(this,(function(s){switch(s.label){case 0:return s.trys.push([0,3,,4]),[4,n.evaluate()];case 1:return e=s.sent(),r=t.topicsToRemove(e),i=t.topicsToAdd(e),r.length+i.length==0?[2]:[4,t.queue.add((function(){return p(u,void 0,void 0,(function(){return b(this,(function(t){switch(t.label){case 0:return[4,this.gazeRequestor.unsubscribe(r)];case 1:return t.sent(),[4,this.gazeRequestor.subscribe(i)];case 2:return t.sent(),[2]}}))}))}))];case 2:return s.sent(),t.topics=e,[3,4];case 3:return o=s.sent(),[2,console.error(o)];case 4:return[2]}}))}))},t.prototype.addMiddleware=function(t){var n=new f;n.handler=t,this.middlewareList.add(n)},t.prototype.reconnect=function(){return p(this,void 0,void 0,(function(){var t,n,e;return b(this,(function(r){switch(r.label){case 0:if(0==this.subscriptions.getAll().length)return[2];t=0,n=this.subscriptions.getAll(),r.label=1;case 1:return t<n.length?(e=n[t],[4,this.gazeRequestor.subscribe(e.topics)]):[3,4];case 2:r.sent(),r.label=3;case 3:return t++,[3,1];case 4:return this.onConnectionReset?[4,this.onConnectionReset()]:[3,6];case 5:r.sent(),r.label=6;case 6:return[2]}}))}))},t}();return n.default})()));
//# sourceMappingURL=GazeClient.amd.js.map