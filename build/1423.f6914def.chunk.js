(self["webpackChunkal_azhar_back"] = self["webpackChunkal_azhar_back"] || []).push([[1423],{

/***/ 3813:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/*!
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */
!function(t,e){ true?module.exports=e(__webpack_require__(67294)):0}(self,(t=>(()=>{var e={703:(t,e,r)=>{"use strict";var o=r(414);function n(){}function s(){}s.resetWarningCache=n,t.exports=function(){function t(t,e,r,n,s,i){if(i!==o){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function e(){return t}t.isRequired=t;var r={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:s,resetWarningCache:n};return r.PropTypes=r,r}},697:(t,e,r)=>{t.exports=r(703)()},414:t=>{"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},787:e=>{"use strict";e.exports=t}},r={};function o(t){var n=r[t];if(void 0!==n)return n.exports;var s=r[t]={exports:{}};return e[t](s,s.exports,o),s.exports}o.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},o.d=(t,e)=>{for(var r in e)o.o(e,r)&&!o.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};return(()=>{"use strict";o.r(n),o.d(n,{CKEditor:()=>eo,CKEditorContext:()=>Zr,useMultiRootEditor:()=>no});var t=o(787),e=o.n(t),r=o(697),s=o.n(r);const i=new Array(256).fill("").map(((t,e)=>("0"+e.toString(16)).slice(-2)));class a{constructor(t){if(this.crashes=[],this.state="initializing",this._now=Date.now,this.crashes=[],this._crashNumberLimit="number"==typeof t.crashNumberLimit?t.crashNumberLimit:3,this._minimumNonErrorTimePeriod="number"==typeof t.minimumNonErrorTimePeriod?t.minimumNonErrorTimePeriod:5e3,this._boundErrorHandler=t=>{const e="error"in t?t.error:t.reason;e instanceof Error&&this._handleError(e,t)},this._listeners={},!this._restart)throw new Error("The Watchdog class was split into the abstract `Watchdog` class and the `EditorWatchdog` class. Please, use `EditorWatchdog` if you have used the `Watchdog` class previously.")}destroy(){this._stopErrorHandling(),this._listeners={}}on(t,e){this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(e)}off(t,e){this._listeners[t]=this._listeners[t].filter((t=>t!==e))}_fire(t,...e){const r=this._listeners[t]||[];for(const t of r)t.apply(this,[null,...e])}_startErrorHandling(){window.addEventListener("error",this._boundErrorHandler),window.addEventListener("unhandledrejection",this._boundErrorHandler)}_stopErrorHandling(){window.removeEventListener("error",this._boundErrorHandler),window.removeEventListener("unhandledrejection",this._boundErrorHandler)}_handleError(t,e){if(this._shouldReactToError(t)){this.crashes.push({message:t.message,stack:t.stack,filename:e instanceof ErrorEvent?e.filename:void 0,lineno:e instanceof ErrorEvent?e.lineno:void 0,colno:e instanceof ErrorEvent?e.colno:void 0,date:this._now()});const r=this._shouldRestart();this.state="crashed",this._fire("stateChange"),this._fire("error",{error:t,causesRestart:r}),r?this._restart():(this.state="crashedPermanently",this._fire("stateChange"))}}_shouldReactToError(t){return t.is&&t.is("CKEditorError")&&void 0!==t.context&&null!==t.context&&"ready"===this.state&&this._isErrorComingFromThisItem(t)}_shouldRestart(){if(this.crashes.length<=this._crashNumberLimit)return!0;return(this.crashes[this.crashes.length-1].date-this.crashes[this.crashes.length-1-this._crashNumberLimit].date)/this._crashNumberLimit>this._minimumNonErrorTimePeriod}}function c(t,e=new Set){const r=[t],o=new Set;let n=0;for(;r.length>n;){const t=r[n++];if(!o.has(t)&&u(t)&&!e.has(t))if(o.add(t),Symbol.iterator in t)try{for(const e of t)r.push(e)}catch(t){}else for(const e in t)"defaultValue"!==e&&r.push(t[e])}return o}function u(t){const e=Object.prototype.toString.call(t),r=typeof t;return!("number"===r||"boolean"===r||"string"===r||"symbol"===r||"function"===r||"[object Date]"===e||"[object RegExp]"===e||"[object Module]"===e||null==t||t._watchdogExcluded||t instanceof EventTarget||t instanceof Event)}function d(t,e,r=new Set){if(t===e&&("object"==typeof(o=t)&&null!==o))return!0;var o;const n=c(t,r),s=c(e,r);for(const t of n)if(s.has(t))return!0;return!1}const h=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)};const l="object"==typeof __webpack_require__.g&&__webpack_require__.g&&__webpack_require__.g.Object===Object&&__webpack_require__.g;var f="object"==typeof self&&self&&self.Object===Object&&self;const p=l||f||Function("return this")();const g=function(){return p.Date.now()};var _=/\s/;const y=function(t){for(var e=t.length;e--&&_.test(t.charAt(e)););return e};var b=/^\s+/;const m=function(t){return t?t.slice(0,y(t)+1).replace(b,""):t};const v=p.Symbol;var w=Object.prototype,j=w.hasOwnProperty,E=w.toString,x=v?v.toStringTag:void 0;const O=function(t){var e=j.call(t,x),r=t[x];try{t[x]=void 0;var o=!0}catch(t){}var n=E.call(t);return o&&(e?t[x]=r:delete t[x]),n};var C=Object.prototype.toString;const R=function(t){return C.call(t)};var A=v?v.toStringTag:void 0;const S=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":A&&A in Object(t)?O(t):R(t)};const P=function(t){return null!=t&&"object"==typeof t};const T=function(t){return"symbol"==typeof t||P(t)&&"[object Symbol]"==S(t)};var D=/^[-+]0x[0-9a-f]+$/i,N=/^0b[01]+$/i,W=/^0o[0-7]+$/i,k=parseInt;const I=function(t){if("number"==typeof t)return t;if(T(t))return NaN;if(h(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=h(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=m(t);var r=N.test(t);return r||W.test(t)?k(t.slice(2),r?2:8):D.test(t)?NaN:+t};var z=Math.max,U=Math.min;const M=function(t,e,r){var o,n,s,i,a,c,u=0,d=!1,l=!1,f=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function p(e){var r=o,s=n;return o=n=void 0,u=e,i=t.apply(s,r)}function _(t){var r=t-c;return void 0===c||r>=e||r<0||l&&t-u>=s}function y(){var t=g();if(_(t))return b(t);a=setTimeout(y,function(t){var r=e-(t-c);return l?U(r,s-(t-u)):r}(t))}function b(t){return a=void 0,f&&o?p(t):(o=n=void 0,i)}function m(){var t=g(),r=_(t);if(o=arguments,n=this,c=t,r){if(void 0===a)return function(t){return u=t,a=setTimeout(y,e),d?p(t):i}(c);if(l)return clearTimeout(a),a=setTimeout(y,e),p(c)}return void 0===a&&(a=setTimeout(y,e)),i}return e=I(e)||0,h(r)&&(d=!!r.leading,s=(l="maxWait"in r)?z(I(r.maxWait)||0,e):s,f="trailing"in r?!!r.trailing:f),m.cancel=function(){void 0!==a&&clearTimeout(a),u=0,o=c=n=a=void 0},m.flush=function(){return void 0===a?i:b(g())},m};const F=function(t,e,r){var o=!0,n=!0;if("function"!=typeof t)throw new TypeError("Expected a function");return h(r)&&(o="leading"in r?!!r.leading:o,n="trailing"in r?!!r.trailing:n),M(t,e,{leading:o,maxWait:e,trailing:n})};const L=function(t,e){return function(r){return t(e(r))}};const q=L(Object.getPrototypeOf,Object);var J=Function.prototype,B=Object.prototype,$=J.toString,H=B.hasOwnProperty,K=$.call(Object);const V=function(t){if(!P(t)||"[object Object]"!=S(t))return!1;var e=q(t);if(null===e)return!0;var r=H.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&$.call(r)==K};const Q=function(t){return P(t)&&1===t.nodeType&&!V(t)};const G=function(){this.__data__=[],this.size=0};const Y=function(t,e){return t===e||t!=t&&e!=e};const X=function(t,e){for(var r=t.length;r--;)if(Y(t[r][0],e))return r;return-1};var Z=Array.prototype.splice;const tt=function(t){var e=this.__data__,r=X(e,t);return!(r<0)&&(r==e.length-1?e.pop():Z.call(e,r,1),--this.size,!0)};const et=function(t){var e=this.__data__,r=X(e,t);return r<0?void 0:e[r][1]};const rt=function(t){return X(this.__data__,t)>-1};const ot=function(t,e){var r=this.__data__,o=X(r,t);return o<0?(++this.size,r.push([t,e])):r[o][1]=e,this};function nt(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var o=t[e];this.set(o[0],o[1])}}nt.prototype.clear=G,nt.prototype.delete=tt,nt.prototype.get=et,nt.prototype.has=rt,nt.prototype.set=ot;const st=nt;const it=function(){this.__data__=new st,this.size=0};const at=function(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r};const ct=function(t){return this.__data__.get(t)};const ut=function(t){return this.__data__.has(t)};const dt=function(t){if(!h(t))return!1;var e=S(t);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e};const ht=p["__core-js_shared__"];var lt=function(){var t=/[^.]+$/.exec(ht&&ht.keys&&ht.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();const ft=function(t){return!!lt&&lt in t};var pt=Function.prototype.toString;const gt=function(t){if(null!=t){try{return pt.call(t)}catch(t){}try{return t+""}catch(t){}}return""};var _t=/^\[object .+?Constructor\]$/,yt=Function.prototype,bt=Object.prototype,mt=yt.toString,vt=bt.hasOwnProperty,wt=RegExp("^"+mt.call(vt).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");const jt=function(t){return!(!h(t)||ft(t))&&(dt(t)?wt:_t).test(gt(t))};const Et=function(t,e){return null==t?void 0:t[e]};const xt=function(t,e){var r=Et(t,e);return jt(r)?r:void 0};const Ot=xt(p,"Map");const Ct=xt(Object,"create");const Rt=function(){this.__data__=Ct?Ct(null):{},this.size=0};const At=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e};var St=Object.prototype.hasOwnProperty;const Pt=function(t){var e=this.__data__;if(Ct){var r=e[t];return"__lodash_hash_undefined__"===r?void 0:r}return St.call(e,t)?e[t]:void 0};var Tt=Object.prototype.hasOwnProperty;const Dt=function(t){var e=this.__data__;return Ct?void 0!==e[t]:Tt.call(e,t)};const Nt=function(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=Ct&&void 0===e?"__lodash_hash_undefined__":e,this};function Wt(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var o=t[e];this.set(o[0],o[1])}}Wt.prototype.clear=Rt,Wt.prototype.delete=At,Wt.prototype.get=Pt,Wt.prototype.has=Dt,Wt.prototype.set=Nt;const kt=Wt;const It=function(){this.size=0,this.__data__={hash:new kt,map:new(Ot||st),string:new kt}};const zt=function(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t};const Ut=function(t,e){var r=t.__data__;return zt(e)?r["string"==typeof e?"string":"hash"]:r.map};const Mt=function(t){var e=Ut(this,t).delete(t);return this.size-=e?1:0,e};const Ft=function(t){return Ut(this,t).get(t)};const Lt=function(t){return Ut(this,t).has(t)};const qt=function(t,e){var r=Ut(this,t),o=r.size;return r.set(t,e),this.size+=r.size==o?0:1,this};function Jt(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var o=t[e];this.set(o[0],o[1])}}Jt.prototype.clear=It,Jt.prototype.delete=Mt,Jt.prototype.get=Ft,Jt.prototype.has=Lt,Jt.prototype.set=qt;const Bt=Jt;const $t=function(t,e){var r=this.__data__;if(r instanceof st){var o=r.__data__;if(!Ot||o.length<199)return o.push([t,e]),this.size=++r.size,this;r=this.__data__=new Bt(o)}return r.set(t,e),this.size=r.size,this};function Ht(t){var e=this.__data__=new st(t);this.size=e.size}Ht.prototype.clear=it,Ht.prototype.delete=at,Ht.prototype.get=ct,Ht.prototype.has=ut,Ht.prototype.set=$t;const Kt=Ht;const Vt=function(t,e){for(var r=-1,o=null==t?0:t.length;++r<o&&!1!==e(t[r],r,t););return t};const Qt=function(){try{var t=xt(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();const Gt=function(t,e,r){"__proto__"==e&&Qt?Qt(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r};var Yt=Object.prototype.hasOwnProperty;const Xt=function(t,e,r){var o=t[e];Yt.call(t,e)&&Y(o,r)&&(void 0!==r||e in t)||Gt(t,e,r)};const Zt=function(t,e,r,o){var n=!r;r||(r={});for(var s=-1,i=e.length;++s<i;){var a=e[s],c=o?o(r[a],t[a],a,r,t):void 0;void 0===c&&(c=t[a]),n?Gt(r,a,c):Xt(r,a,c)}return r};const te=function(t,e){for(var r=-1,o=Array(t);++r<t;)o[r]=e(r);return o};const ee=function(t){return P(t)&&"[object Arguments]"==S(t)};var re=Object.prototype,oe=re.hasOwnProperty,ne=re.propertyIsEnumerable;const se=ee(function(){return arguments}())?ee:function(t){return P(t)&&oe.call(t,"callee")&&!ne.call(t,"callee")};const ie=Array.isArray;const ae=function(){return!1};var ce= true&&exports&&!exports.nodeType&&exports,ue=ce&&"object"=="object"&&module&&!module.nodeType&&module,de=ue&&ue.exports===ce?p.Buffer:void 0;const he=(de?de.isBuffer:void 0)||ae;var le=/^(?:0|[1-9]\d*)$/;const fe=function(t,e){var r=typeof t;return!!(e=null==e?9007199254740991:e)&&("number"==r||"symbol"!=r&&le.test(t))&&t>-1&&t%1==0&&t<e};const pe=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991};var ge={};ge["[object Float32Array]"]=ge["[object Float64Array]"]=ge["[object Int8Array]"]=ge["[object Int16Array]"]=ge["[object Int32Array]"]=ge["[object Uint8Array]"]=ge["[object Uint8ClampedArray]"]=ge["[object Uint16Array]"]=ge["[object Uint32Array]"]=!0,ge["[object Arguments]"]=ge["[object Array]"]=ge["[object ArrayBuffer]"]=ge["[object Boolean]"]=ge["[object DataView]"]=ge["[object Date]"]=ge["[object Error]"]=ge["[object Function]"]=ge["[object Map]"]=ge["[object Number]"]=ge["[object Object]"]=ge["[object RegExp]"]=ge["[object Set]"]=ge["[object String]"]=ge["[object WeakMap]"]=!1;const _e=function(t){return P(t)&&pe(t.length)&&!!ge[S(t)]};const ye=function(t){return function(e){return t(e)}};var be= true&&exports&&!exports.nodeType&&exports,me=be&&"object"=="object"&&module&&!module.nodeType&&module,ve=me&&me.exports===be&&l.process;const we=function(){try{var t=me&&me.require&&me.require("util").types;return t||ve&&ve.binding&&ve.binding("util")}catch(t){}}();var je=we&&we.isTypedArray;const Ee=je?ye(je):_e;var xe=Object.prototype.hasOwnProperty;const Oe=function(t,e){var r=ie(t),o=!r&&se(t),n=!r&&!o&&he(t),s=!r&&!o&&!n&&Ee(t),i=r||o||n||s,a=i?te(t.length,String):[],c=a.length;for(var u in t)!e&&!xe.call(t,u)||i&&("length"==u||n&&("offset"==u||"parent"==u)||s&&("buffer"==u||"byteLength"==u||"byteOffset"==u)||fe(u,c))||a.push(u);return a};var Ce=Object.prototype;const Re=function(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||Ce)};const Ae=L(Object.keys,Object);var Se=Object.prototype.hasOwnProperty;const Pe=function(t){if(!Re(t))return Ae(t);var e=[];for(var r in Object(t))Se.call(t,r)&&"constructor"!=r&&e.push(r);return e};const Te=function(t){return null!=t&&pe(t.length)&&!dt(t)};const De=function(t){return Te(t)?Oe(t):Pe(t)};const Ne=function(t,e){return t&&Zt(e,De(e),t)};const We=function(t){var e=[];if(null!=t)for(var r in Object(t))e.push(r);return e};var ke=Object.prototype.hasOwnProperty;const Ie=function(t){if(!h(t))return We(t);var e=Re(t),r=[];for(var o in t)("constructor"!=o||!e&&ke.call(t,o))&&r.push(o);return r};const ze=function(t){return Te(t)?Oe(t,!0):Ie(t)};const Ue=function(t,e){return t&&Zt(e,ze(e),t)};var Me= true&&exports&&!exports.nodeType&&exports,Fe=Me&&"object"=="object"&&module&&!module.nodeType&&module,Le=Fe&&Fe.exports===Me?p.Buffer:void 0,qe=Le?Le.allocUnsafe:void 0;const Je=function(t,e){if(e)return t.slice();var r=t.length,o=qe?qe(r):new t.constructor(r);return t.copy(o),o};const Be=function(t,e){var r=-1,o=t.length;for(e||(e=Array(o));++r<o;)e[r]=t[r];return e};const $e=function(t,e){for(var r=-1,o=null==t?0:t.length,n=0,s=[];++r<o;){var i=t[r];e(i,r,t)&&(s[n++]=i)}return s};const He=function(){return[]};var Ke=Object.prototype.propertyIsEnumerable,Ve=Object.getOwnPropertySymbols;const Qe=Ve?function(t){return null==t?[]:(t=Object(t),$e(Ve(t),(function(e){return Ke.call(t,e)})))}:He;const Ge=function(t,e){return Zt(t,Qe(t),e)};const Ye=function(t,e){for(var r=-1,o=e.length,n=t.length;++r<o;)t[n+r]=e[r];return t};const Xe=Object.getOwnPropertySymbols?function(t){for(var e=[];t;)Ye(e,Qe(t)),t=q(t);return e}:He;const Ze=function(t,e){return Zt(t,Xe(t),e)};const tr=function(t,e,r){var o=e(t);return ie(t)?o:Ye(o,r(t))};const er=function(t){return tr(t,De,Qe)};const rr=function(t){return tr(t,ze,Xe)};const or=xt(p,"DataView");const nr=xt(p,"Promise");const sr=xt(p,"Set");const ir=xt(p,"WeakMap");var ar="[object Map]",cr="[object Promise]",ur="[object Set]",dr="[object WeakMap]",hr="[object DataView]",lr=gt(or),fr=gt(Ot),pr=gt(nr),gr=gt(sr),_r=gt(ir),yr=S;(or&&yr(new or(new ArrayBuffer(1)))!=hr||Ot&&yr(new Ot)!=ar||nr&&yr(nr.resolve())!=cr||sr&&yr(new sr)!=ur||ir&&yr(new ir)!=dr)&&(yr=function(t){var e=S(t),r="[object Object]"==e?t.constructor:void 0,o=r?gt(r):"";if(o)switch(o){case lr:return hr;case fr:return ar;case pr:return cr;case gr:return ur;case _r:return dr}return e});const br=yr;var mr=Object.prototype.hasOwnProperty;const vr=function(t){var e=t.length,r=new t.constructor(e);return e&&"string"==typeof t[0]&&mr.call(t,"index")&&(r.index=t.index,r.input=t.input),r};const wr=p.Uint8Array;const jr=function(t){var e=new t.constructor(t.byteLength);return new wr(e).set(new wr(t)),e};const Er=function(t,e){var r=e?jr(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)};var xr=/\w*$/;const Or=function(t){var e=new t.constructor(t.source,xr.exec(t));return e.lastIndex=t.lastIndex,e};var Cr=v?v.prototype:void 0,Rr=Cr?Cr.valueOf:void 0;const Ar=function(t){return Rr?Object(Rr.call(t)):{}};const Sr=function(t,e){var r=e?jr(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)};const Pr=function(t,e,r){var o=t.constructor;switch(e){case"[object ArrayBuffer]":return jr(t);case"[object Boolean]":case"[object Date]":return new o(+t);case"[object DataView]":return Er(t,r);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return Sr(t,r);case"[object Map]":case"[object Set]":return new o;case"[object Number]":case"[object String]":return new o(t);case"[object RegExp]":return Or(t);case"[object Symbol]":return Ar(t)}};var Tr=Object.create;const Dr=function(){function t(){}return function(e){if(!h(e))return{};if(Tr)return Tr(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}();const Nr=function(t){return"function"!=typeof t.constructor||Re(t)?{}:Dr(q(t))};const Wr=function(t){return P(t)&&"[object Map]"==br(t)};var kr=we&&we.isMap;const Ir=kr?ye(kr):Wr;const zr=function(t){return P(t)&&"[object Set]"==br(t)};var Ur=we&&we.isSet;const Mr=Ur?ye(Ur):zr;var Fr="[object Arguments]",Lr="[object Function]",qr="[object Object]",Jr={};Jr[Fr]=Jr["[object Array]"]=Jr["[object ArrayBuffer]"]=Jr["[object DataView]"]=Jr["[object Boolean]"]=Jr["[object Date]"]=Jr["[object Float32Array]"]=Jr["[object Float64Array]"]=Jr["[object Int8Array]"]=Jr["[object Int16Array]"]=Jr["[object Int32Array]"]=Jr["[object Map]"]=Jr["[object Number]"]=Jr[qr]=Jr["[object RegExp]"]=Jr["[object Set]"]=Jr["[object String]"]=Jr["[object Symbol]"]=Jr["[object Uint8Array]"]=Jr["[object Uint8ClampedArray]"]=Jr["[object Uint16Array]"]=Jr["[object Uint32Array]"]=!0,Jr["[object Error]"]=Jr[Lr]=Jr["[object WeakMap]"]=!1;const Br=function t(e,r,o,n,s,i){var a,c=1&r,u=2&r,d=4&r;if(o&&(a=s?o(e,n,s,i):o(e)),void 0!==a)return a;if(!h(e))return e;var l=ie(e);if(l){if(a=vr(e),!c)return Be(e,a)}else{var f=br(e),p=f==Lr||"[object GeneratorFunction]"==f;if(he(e))return Je(e,c);if(f==qr||f==Fr||p&&!s){if(a=u||p?{}:Nr(e),!c)return u?Ze(e,Ue(a,e)):Ge(e,Ne(a,e))}else{if(!Jr[f])return s?e:{};a=Pr(e,f,c)}}i||(i=new Kt);var g=i.get(e);if(g)return g;i.set(e,a),Mr(e)?e.forEach((function(n){a.add(t(n,r,o,n,e,i))})):Ir(e)&&e.forEach((function(n,s){a.set(s,t(n,r,o,s,e,i))}));var _=l?void 0:(d?u?rr:er:u?ze:De)(e);return Vt(_||e,(function(n,s){_&&(n=e[s=n]),Xt(a,s,t(n,r,o,s,e,i))})),a};const $r=function(t,e){return Br(t,5,e="function"==typeof e?e:void 0)};class Hr extends a{constructor(t,e={}){super(e),this._editor=null,this._initUsingData=!0,this._editables={},this._throttledSave=F(this._save.bind(this),"number"==typeof e.saveInterval?e.saveInterval:5e3),t&&(this._creator=(e,r)=>t.create(e,r)),this._destructor=t=>t.destroy()}get editor(){return this._editor}get _item(){return this._editor}setCreator(t){this._creator=t}setDestructor(t){this._destructor=t}_restart(){return Promise.resolve().then((()=>(this.state="initializing",this._fire("stateChange"),this._destroy()))).catch((t=>{console.error("An error happened during the editor destroying.",t)})).then((()=>{const t={},e=[],r=this._config.rootsAttributes||{},o={};for(const[n,s]of Object.entries(this._data.roots))s.isLoaded?(t[n]="",o[n]=r[n]||{}):e.push(n);const n={...this._config,extraPlugins:this._config.extraPlugins||[],lazyRoots:e,rootsAttributes:o,_watchdogInitialData:this._data};return delete n.initialData,n.extraPlugins.push(Kr),this._initUsingData?this.create(t,n,n.context):Q(this._elementOrData)?this.create(this._elementOrData,n,n.context):this.create(this._editables,n,n.context)})).then((()=>{this._fire("restart")}))}create(t=this._elementOrData,e=this._config,r){return Promise.resolve().then((()=>(super._startErrorHandling(),this._elementOrData=t,this._initUsingData="string"==typeof t||Object.keys(t).length>0&&"string"==typeof Object.values(t)[0],this._config=this._cloneEditorConfiguration(e)||{},this._config.context=r,this._creator(t,this._config)))).then((t=>{this._editor=t,t.model.document.on("change:data",this._throttledSave),this._lastDocumentVersion=t.model.document.version,this._data=this._getData(),this._initUsingData||(this._editables=this._getEditables()),this.state="ready",this._fire("stateChange")}))}destroy(){return Promise.resolve().then((()=>(this.state="destroyed",this._fire("stateChange"),super.destroy(),this._destroy())))}_destroy(){return Promise.resolve().then((()=>{this._stopErrorHandling(),this._throttledSave.cancel();const t=this._editor;return this._editor=null,t.model.document.off("change:data",this._throttledSave),this._destructor(t)}))}_save(){const t=this._editor.model.document.version;try{this._data=this._getData(),this._initUsingData||(this._editables=this._getEditables()),this._lastDocumentVersion=t}catch(t){console.error(t,"An error happened during restoring editor data. Editor will be restored from the previously saved data.")}}_setExcludedProperties(t){this._excludedProps=t}_getData(){const t=this._editor,e=t.model.document.roots.filter((t=>t.isAttached()&&"$graveyard"!=t.rootName)),{plugins:r}=t,o=r.has("CommentsRepository")&&r.get("CommentsRepository"),n=r.has("TrackChanges")&&r.get("TrackChanges"),s={roots:{},markers:{},commentThreads:JSON.stringify([]),suggestions:JSON.stringify([])};e.forEach((t=>{s.roots[t.rootName]={content:JSON.stringify(Array.from(t.getChildren())),attributes:JSON.stringify(Array.from(t.getAttributes())),isLoaded:t._isLoaded}}));for(const e of t.model.markers)e._affectsData&&(s.markers[e.name]={rangeJSON:e.getRange().toJSON(),usingOperation:e._managedUsingOperations,affectsData:e._affectsData});return o&&(s.commentThreads=JSON.stringify(o.getCommentThreads({toJSON:!0,skipNotAttached:!0}))),n&&(s.suggestions=JSON.stringify(n.getSuggestions({toJSON:!0,skipNotAttached:!0}))),s}_getEditables(){const t={};for(const e of this.editor.model.document.getRootNames()){const r=this.editor.ui.getEditableElement(e);r&&(t[e]=r)}return t}_isErrorComingFromThisItem(t){return d(this._editor,t.context,this._excludedProps)}_cloneEditorConfiguration(t){return $r(t,((t,e)=>Q(t)||"context"===e?t:void 0))}}class Kr{constructor(t){this.editor=t,this._data=t.config.get("_watchdogInitialData")}init(){this.editor.data.on("init",(t=>{t.stop(),this.editor.model.enqueueChange({isUndoable:!1},(t=>{this._restoreCollaborationData(),this._restoreEditorData(t)})),this.editor.data.fire("ready")}),{priority:999})}_createNode(t,e){if("name"in e){const r=t.createElement(e.name,e.attributes);if(e.children)for(const o of e.children)r._appendChild(this._createNode(t,o));return r}return t.createText(e.data,e.attributes)}_restoreEditorData(t){const e=this.editor;Object.entries(this._data.roots).forEach((([r,{content:o,attributes:n}])=>{const s=JSON.parse(o),i=JSON.parse(n),a=e.model.document.getRoot(r);for(const[e,r]of i)t.setAttribute(e,r,a);for(const e of s){const r=this._createNode(t,e);t.insert(r,a,"end")}})),Object.entries(this._data.markers).forEach((([r,o])=>{const{document:n}=e.model,{rangeJSON:{start:s,end:i},...a}=o,c=n.getRoot(s.root),u=t.createPositionFromPath(c,s.path,s.stickiness),d=t.createPositionFromPath(c,i.path,i.stickiness),h=t.createRange(u,d);t.addMarker(r,{range:h,...a})}))}_restoreCollaborationData(){const t=JSON.parse(this._data.commentThreads),e=JSON.parse(this._data.suggestions);t.forEach((t=>{const e=this.editor.config.get("collaboration.channelId"),r=this.editor.plugins.get("CommentsRepository");if(r.hasCommentThread(t.threadId)){r.getCommentThread(t.threadId).remove()}r.addCommentThread({channelId:e,...t})})),e.forEach((t=>{const e=this.editor.plugins.get("TrackChangesEditing");if(e.hasSuggestion(t.id)){e.getSuggestion(t.id).attributes=t.attributes}else e.addSuggestionData(t)}))}}const Vr=Symbol("MainQueueId");class Qr extends a{constructor(t,e={}){super(e),this._watchdogs=new Map,this._context=null,this._contextProps=new Set,this._actionQueues=new Gr,this._watchdogConfig=e,this._creator=e=>t.create(e),this._destructor=t=>t.destroy(),this._actionQueues.onEmpty((()=>{"initializing"===this.state&&(this.state="ready",this._fire("stateChange"))}))}setCreator(t){this._creator=t}setDestructor(t){this._destructor=t}get context(){return this._context}create(t={}){return this._actionQueues.enqueue(Vr,(()=>(this._contextConfig=t,this._create())))}getItem(t){return this._getWatchdog(t)._item}getItemState(t){return this._getWatchdog(t).state}add(t){const e=Yr(t);return Promise.all(e.map((t=>this._actionQueues.enqueue(t.id,(()=>{if("destroyed"===this.state)throw new Error("Cannot add items to destroyed watchdog.");if(!this._context)throw new Error("Context was not created yet. You should call the `ContextWatchdog#create()` method first.");let e;if(this._watchdogs.has(t.id))throw new Error(`Item with the given id is already added: '${t.id}'.`);if("editor"===t.type)return e=new Hr(null,this._watchdogConfig),e.setCreator(t.creator),e._setExcludedProperties(this._contextProps),t.destructor&&e.setDestructor(t.destructor),this._watchdogs.set(t.id,e),e.on("error",((r,{error:o,causesRestart:n})=>{this._fire("itemError",{itemId:t.id,error:o}),n&&this._actionQueues.enqueue(t.id,(()=>new Promise((r=>{const o=()=>{e.off("restart",o),this._fire("itemRestart",{itemId:t.id}),r()};e.on("restart",o)}))))})),e.create(t.sourceElementOrData,t.config,this._context);throw new Error(`Not supported item type: '${t.type}'.`)})))))}remove(t){const e=Yr(t);return Promise.all(e.map((t=>this._actionQueues.enqueue(t,(()=>{const e=this._getWatchdog(t);return this._watchdogs.delete(t),e.destroy()})))))}destroy(){return this._actionQueues.enqueue(Vr,(()=>(this.state="destroyed",this._fire("stateChange"),super.destroy(),this._destroy())))}_restart(){return this._actionQueues.enqueue(Vr,(()=>(this.state="initializing",this._fire("stateChange"),this._destroy().catch((t=>{console.error("An error happened during destroying the context or items.",t)})).then((()=>this._create())).then((()=>this._fire("restart"))))))}_create(){return Promise.resolve().then((()=>(this._startErrorHandling(),this._creator(this._contextConfig)))).then((t=>(this._context=t,this._contextProps=c(this._context),Promise.all(Array.from(this._watchdogs.values()).map((t=>(t._setExcludedProperties(this._contextProps),t.create(void 0,void 0,this._context))))))))}_destroy(){return Promise.resolve().then((()=>{this._stopErrorHandling();const t=this._context;return this._context=null,this._contextProps=new Set,Promise.all(Array.from(this._watchdogs.values()).map((t=>t.destroy()))).then((()=>this._destructor(t)))}))}_getWatchdog(t){const e=this._watchdogs.get(t);if(!e)throw new Error(`Item with the given id was not registered: ${t}.`);return e}_isErrorComingFromThisItem(t){for(const e of this._watchdogs.values())if(e._isErrorComingFromThisItem(t))return!1;return d(this._context,t.context)}}class Gr{constructor(){this._onEmptyCallbacks=[],this._queues=new Map,this._activeActions=0}onEmpty(t){this._onEmptyCallbacks.push(t)}enqueue(t,e){const r=t===Vr;this._activeActions++,this._queues.get(t)||this._queues.set(t,Promise.resolve());const o=(r?Promise.all(this._queues.values()):Promise.all([this._queues.get(Vr),this._queues.get(t)])).then(e),n=o.catch((()=>{}));return this._queues.set(t,n),o.finally((()=>{this._activeActions--,this._queues.get(t)===n&&0===this._activeActions&&this._onEmptyCallbacks.forEach((t=>t()))}))}}function Yr(t){return Array.isArray(t)?t:[t]}const Xr=e().createContext("contextWatchdog");class Zr extends e().Component{constructor(t,e){super(t,e),this.contextWatchdog=null,this.props.isLayoutReady&&this._initializeContextWatchdog(this.props.config)}shouldComponentUpdate(t){return this._shouldComponentUpdate(t)}async _shouldComponentUpdate(t){return t.id!==this.props.id&&(this.contextWatchdog&&await this.contextWatchdog.destroy(),await this._initializeContextWatchdog(t.config)),t.isLayoutReady&&!this.contextWatchdog?(await this._initializeContextWatchdog(t.config),!0):this.props.children!==t.children}render(){return e().createElement(Xr.Provider,{value:this.contextWatchdog},this.props.children)}componentWillUnmount(){this._destroyContext()}async _initializeContextWatchdog(t){this.contextWatchdog=new Qr(this.props.context,this.props.watchdogConfig),this.contextWatchdog.on("error",((t,e)=>{this.props.onError(e.error,{phase:"runtime",willContextRestart:e.causesRestart})})),this.contextWatchdog.on("stateChange",(()=>{"ready"===this.contextWatchdog.state&&this.props.onReady&&this.props.onReady(this.contextWatchdog.context)})),await this.contextWatchdog.create(t).catch((t=>{this.props.onError(t,{phase:"initialization",willContextRestart:!1})}))}async _destroyContext(){this.contextWatchdog&&(await this.contextWatchdog.destroy(),this.contextWatchdog=null)}}Zr.defaultProps={isLayoutReady:!0,onError:(t,e)=>console.error(t,e)},Zr.propTypes={id:s().string,isLayoutReady:s().bool,context:s().func,watchdogConfig:s().object,config:s().object,onReady:s().func,onError:s().func};const to="Lock from React integration (@ckeditor/ckeditor5-react)";class eo extends e().Component{constructor(t){super(t),this.editorDestructionInProgress=null,this.domContainer=e().createRef(),this.watchdog=null;const{CKEDITOR_VERSION:r}=window;if(r){const[t]=r.split(".").map(Number);t<37&&console.warn("The <CKEditor> component requires using CKEditor 5 in version 37 or higher.")}else console.warn('Cannot find the "CKEDITOR_VERSION" in the "window" scope.')}get editor(){return this.props.disableWatchdog?this.instance:this.watchdog?this.watchdog.editor:null}shouldComponentUpdate(t){return!!this.editor&&(t.id!==this.props.id||(t.disableWatchdog!==this.props.disableWatchdog||(this._shouldUpdateEditor(t)&&this.editor.data.set(t.data),"disabled"in t&&(t.disabled?this.editor.enableReadOnlyMode(to):this.editor.disableReadOnlyMode(to)),!1)))}async componentDidMount(){await this._initializeEditor()}async componentDidUpdate(){await this._destroyEditor(),await this._initializeEditor()}async componentWillUnmount(){await this._destroyEditor()}render(){return e().createElement("div",{ref:this.domContainer})}async _initializeEditor(){await this.editorDestructionInProgress,this.props.disableWatchdog?this.instance=await this._createEditor(this.domContainer.current,this._getConfig()):this.watchdog||(this.context instanceof Qr?this.watchdog=new ro(this.context):this.watchdog=new eo._EditorWatchdog(this.props.editor,this.props.watchdogConfig),this.watchdog.setCreator(((t,e)=>this._createEditor(t,e))),this.watchdog.on("error",((t,{error:e,causesRestart:r})=>{(this.props.onError||console.error)(e,{phase:"runtime",willEditorRestart:r})})),await this.watchdog.create(this.domContainer.current,this._getConfig()).catch((t=>{(this.props.onError||console.error)(t,{phase:"initialization",willEditorRestart:!1})})))}_createEditor(t,e){return this.props.editor.create(t,e).then((t=>{"disabled"in this.props&&this.props.disabled&&t.enableReadOnlyMode(to);const e=t.model.document,r=t.editing.view.document;return e.on("change:data",(e=>{this.props.onChange&&this.props.onChange(e,t)})),r.on("focus",(e=>{this.props.onFocus&&this.props.onFocus(e,t)})),r.on("blur",(e=>{this.props.onBlur&&this.props.onBlur(e,t)})),setTimeout((()=>{this.props.onReady&&this.props.onReady(t)})),t}))}async _destroyEditor(){this.editorDestructionInProgress=new Promise((t=>{setTimeout((async()=>this.watchdog?(await this.watchdog.destroy(),this.watchdog=null,t()):this.instance?(await this.instance.destroy(),this.instance=null,t()):void t()))}))}_shouldUpdateEditor(t){return this.props.data!==t.data&&this.editor.data.get()!==t.data}_getConfig(){const t=this.props.config||{};return this.props.data&&t.initialData&&console.warn("Editor data should be provided either using `config.initialData` or `content` property. The config value takes precedence over `content` property and will be used when both are specified."),{...t,initialData:t.initialData||this.props.data||""}}}eo.contextType=Xr,eo.propTypes={editor:s().func.isRequired,data:s().string,config:s().object,disableWatchdog:s().bool,watchdogConfig:s().object,onChange:s().func,onReady:s().func,onFocus:s().func,onBlur:s().func,onError:s().func,disabled:s().bool,id:s().any},eo._EditorWatchdog=Hr;class ro{constructor(t){this._contextWatchdog=t,this._id=function(){const t=4294967296*Math.random()>>>0,e=4294967296*Math.random()>>>0,r=4294967296*Math.random()>>>0,o=4294967296*Math.random()>>>0;return"e"+i[t>>0&255]+i[t>>8&255]+i[t>>16&255]+i[t>>24&255]+i[e>>0&255]+i[e>>8&255]+i[e>>16&255]+i[e>>24&255]+i[r>>0&255]+i[r>>8&255]+i[r>>16&255]+i[r>>24&255]+i[o>>0&255]+i[o>>8&255]+i[o>>16&255]+i[o>>24&255]}()}setCreator(t){this._creator=t}create(t,e){return this._contextWatchdog.add({sourceElementOrData:t,config:e,creator:this._creator,id:this._id,type:"editor"})}on(t,e){this._contextWatchdog.on("itemError",((t,{itemId:r,error:o})=>{r===this._id&&e(null,{error:o,causesRestart:void 0})}))}destroy(){return"ready"===this._contextWatchdog.state?this._contextWatchdog.remove(this._id):Promise.resolve()}get editor(){return this._contextWatchdog.getItem(this._id)}}const oo="Lock from React integration (@ckeditor/ckeditor5-react)",no=r=>{let o=null;const n=(0,t.useRef)(null),s=(0,t.useContext)(Xr),[i,a]=(0,t.useState)(null),[c,u]=(0,t.useState)(r.data),[d,h]=(0,t.useState)(r.rootsAttributes||{}),[l,f]=(0,t.useState)([]),p=(0,t.useRef)(!0),g=(0,t.useRef)(null),_=e().createElement("div",{ref:g});(0,t.useEffect)((()=>((async()=>{await n.current,!1!==r.isLayoutReady&&w()})(),()=>{v().then((()=>{n.current=null}))})),[r.isLayoutReady]),(0,t.useEffect)((()=>{i&&(r.disabled?i.enableReadOnlyMode(oo):i.disableReadOnlyMode(oo))}),[r.disabled]),(0,t.useEffect)((()=>{const t=g.current;if(i&&!n.current){const e=i.getFullData();u({...e}),h({...i.getRootsAttributes()}),f([...Object.keys(e).map((t=>b(i,t)))]),t&&t.appendChild(i.ui.view.toolbar.element)}return()=>{t&&t.firstChild&&t.removeChild(t.firstChild)}}),[i&&i.id]);const y=()=>{const t=r.config||{};return r.data&&t.initialData&&console.warn("Editor data should be provided either using `config.initialData` or `data` property. The config value takes precedence over `data` property and will be used when both are specified."),{...t,rootsAttributes:d}},b=(t,r)=>e().createElement("div",{id:r,key:r,ref:e=>{if(e){const o=t.ui.view.createEditable(r,e);t.ui.addEditable(o),t.editing.view.forceRender()}}}),m=(t,e)=>r.editor.create(t,e).then((t=>{r.disabled&&r.disabled&&t.enableReadOnlyMode(oo);const e=t.model.document,o=t.editing.view.document;return e.on("change:data",(e=>((t,e)=>{const o=t.model.document,n={},s={};o.differ.getChanges().forEach((e=>{let r;if(r="insert"==e.type||"remove"==e.type?e.position.root:e.range.root,!r.isAttached())return;const{rootName:o}=r;n[o]=t.getData({rootName:o})})),o.differ.getChangedRoots().forEach((e=>{if(e.state)return void(void 0!==n[e.name]&&delete n[e.name]);const r=e.name;s[r]=t.getRootAttributes(r)})),Object.keys(n).length&&u((t=>({...t,...n}))),Object.keys(s).length&&h((t=>({...t,...s}))),r.onChange&&r.onChange(e,t)})(t,e))),t.on("addRoot",((e,r)=>((t,e,r)=>{const o=r.rootName,n=b(t,o);u((e=>({...e,[o]:t.getData({rootName:o})}))),h((e=>({...e,[o]:t.getRootAttributes(o)}))),f((t=>[...t,n]))})(t,0,r))),t.on("detachRoot",((e,r)=>((t,e,r)=>{const o=r.rootName;f((t=>t.filter((t=>t.props.id!==o)))),u((t=>{const{[o]:e,...r}=t;return{...r}})),h((t=>{const{[o]:e,...r}=t;return{...r}})),t.detachEditable(r)})(t,0,r))),o.on("focus",(e=>{r.onFocus&&r.onFocus(e,t)})),o.on("blur",(e=>{r.onBlur&&r.onBlur(e,t)})),a(t),r.onReady&&r.onReady(t),t})),v=async()=>{a(null),u({}),h({}),f([]),n.current=new Promise((t=>{setTimeout((async()=>o?(await o.destroy(),o=null,t()):i?(await i.destroy(),t()):void t()))}))},w=async()=>{r.disableWatchdog?await m(r.data,y()):o||(o=s instanceof Qr?new ro(s):new Hr(r.editor,r.watchdogConfig),o.setCreator(((t,e)=>m(t,e))),o.on("error",((t,{error:e,causesRestart:o})=>{(r.onError||console.error)(e,{phase:"runtime",willEditorRestart:o})})),await o.create(c,y()).catch((t=>{(r.onError||console.error)(t,{phase:"initialization",willEditorRestart:!1})})))};(0,t.useEffect)((()=>{if(i&&p.current){p.current=!1;const t=Object.keys(c),e=Object.keys(d);if(!t.every((t=>e.includes(t))))throw new Error("`data` and `attributes` objects must have the same keys (roots).");const r=i.getFullData(),o=i.getRootsAttributes(),{addedKeys:n,removedKeys:s}=j(r,c||{}),a=t.some((t=>void 0!==r[t]&&JSON.stringify(r[t])!==JSON.stringify(c[t]))),u=e.filter((t=>JSON.stringify(o[t])!==JSON.stringify(d[t])));i.model.change((t=>{E(n),x(s),a&&O(),u.length&&C(t,u)}))}}),[c,d]);const j=(t,e)=>{const r=Object.keys(t),o=Object.keys(e);return{addedKeys:o.filter((t=>!r.includes(t))),removedKeys:r.filter((t=>!o.includes(t)))}},E=t=>{t.forEach((t=>{i.addRoot(t,{data:c[t]||"",attributes:(null==d?void 0:d[t])||{},isUndoable:!0})}))},x=t=>{t.forEach((t=>{i.detachRoot(t,!0)}))},O=()=>{i.data.set(c,{suppressErrorInCollaboration:!0})},C=(t,e)=>{e.forEach((e=>{Object.keys(d[e]).forEach((t=>{i.registerRootAttribute(t)})),t.clearAttributes(i.model.document.getRoot(e)),t.setAttributes(d[e],i.model.document.getRoot(e))}))},R=(0,t.useCallback)((t=>{p.current=!0,u(t)}),[u]),A=(0,t.useCallback)((t=>{p.current=!0,h(t)}),[h]);return{editor:i,editableElements:l,toolbarElement:_,data:c,setData:R,attributes:d,setAttributes:A}}})(),n})()));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 51423:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Input)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(45697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(88972);
// EXTERNAL MODULE: ./node_modules/@ckeditor/ckeditor5-react/dist/index.js
var dist = __webpack_require__(3813);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Loader/Loader.mjs + 1 modules
var Loader = __webpack_require__(74863);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.mjs
var Box = __webpack_require__(16607);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/dist/index.mjs + 15 modules
var helper_plugin_dist = __webpack_require__(2317);
// EXTERNAL MODULE: ./node_modules/lodash/cloneDeep.js
var cloneDeep = __webpack_require__(50361);
var cloneDeep_default = /*#__PURE__*/__webpack_require__.n(cloneDeep);
// EXTERNAL MODULE: ./node_modules/@_sh/strapi-plugin-ckeditor/admin/src/components/Input/CKEditor/configs/index.js + 37 modules
var CKEditor_configs = __webpack_require__(19214);
// EXTERNAL MODULE: ./node_modules/@_sh/strapi-plugin-ckeditor/admin/src/utils/pluginId.js
var pluginId = __webpack_require__(95046);
var pluginId_default = /*#__PURE__*/__webpack_require__.n(pluginId);
;// CONCATENATED MODULE: ./node_modules/@_sh/strapi-plugin-ckeditor/admin/src/components/Input/CKEditor/configuration.js




const importLang = async (config, language) => {
  if (!language)
    return;
  const { plugins: configPlugins = [] } = config;
  const configPluginNames = [...configPlugins.map((p) => p.pluginName)];
  const plugins = [
    { name: "DocumentList", module: "ckeditor5-list" },
    { name: "TextPartLanguage", module: "ckeditor5-language" },
    { name: "Alignment", module: "ckeditor5-alignment" },
    { name: "Autosave", module: "ckeditor5-autosave" },
    { name: "BlockQuote", module: "ckeditor5-block-quote" },
    { name: "CodeBlock", module: "ckeditor5-code-block" },
    { name: "Heading", module: "ckeditor5-heading" },
    { name: "HtmlEmbed", module: "ckeditor5-html-embed" },
    { name: "GeneralHtmlSupport", module: "ckeditor5-html-support" },
    { name: "HorizontalLine", module: "ckeditor5-horizontal-line" },
    { name: "MediaEmbed", module: "ckeditor5-media-embed" },
    { name: "Image", module: "ckeditor5-image" },
    { name: "Indent", module: "ckeditor5-indent" },
    { name: "Link", module: "ckeditor5-link" },
    { name: "RemoveFormat", module: "ckeditor5-remove-format" },
    { name: "Table", module: "ckeditor5-table" },
    { name: "WordCount", module: "ckeditor5-word-count" },
    { name: "FindAndReplace", module: "ckeditor5-find-and-replace" },
    { name: "SpecialCharacters", module: "ckeditor5-special-characters" },
    { name: "PageBreak", module: "ckeditor5-page-break" },
    { name: "SourceEditing", module: "ckeditor5-source-editing" },
    { name: "Highlight", module: "ckeditor5-highlight" },
    { name: "Style", module: "ckeditor5-style" },
    { name: "ShowBlocks", module: "ckeditor5-show-blocks" }
  ];
  const basicStylesPlugin = [
    "Bold",
    "Code",
    "Italic",
    "Strikethrough",
    "Subscript",
    "Superscript",
    "Underline"
  ];
  const fontPlugin = ["FontBackgroundColor", "FontColor", "FontFamily", "FontSize"];
  const listPlugin = ["List", "DocumentList"];
  await Promise.all(
    plugins.filter(({ name }) => configPluginNames.includes(name)).map(
      async ({ module }) => await __webpack_require__(74060)(`./${module}/build/translations/${language}.js`).catch(() => null)
    )
  );
  if (configPluginNames.some((p) => basicStylesPlugin.includes(p)))
    await __webpack_require__(98996)(`./${language}.js`).catch(() => null);
  if (configPluginNames.some((p) => listPlugin.includes(p)))
    await __webpack_require__(44042)(`./${language}.js`).catch(() => null);
  if (configPluginNames.some((p) => fontPlugin.includes(p)))
    await __webpack_require__(67186)(`./${language}.js`).catch(() => null);
};
const setLanguage = async (config) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const languageContent = params["plugins[i18n][locale]"];
  const preferedLanguage = helper_plugin_dist/* auth */.I8.getUserInfo().preferedLanguage;
  const { ui = preferedLanguage || "en", content, textPartLanguage, ignorei18n } = config.language || {};
  if (languageContent) {
    const locale = languageContent.split("-")[0];
    config.language = {
      ui: typeof config.language === "string" ? config.language : ui,
      content: ignorei18n ? content : locale,
      textPartLanguage
    };
    await importLang(config, config.language.ui);
    await importLang(config, config.language.content);
  } else if (typeof config.language === "object") {
    await importLang(config, config.language.ui);
    await importLang(config, config.language.content);
  } else if (typeof config.language === "string") {
    await importLang(config, config.language);
  } else {
    config.language = preferedLanguage;
    await importLang(config, preferedLanguage);
  }
};
const getCurrentConfig = (presetName) => {
  const { configs: userConfigs, configsOverwrite: overwrite } = globalThis.CKEditorConfig || {};
  let configs;
  if (overwrite) {
    configs = userConfigs;
  } else {
    configs = CKEditor_configs/* default */.Z;
    if (userConfigs) {
      Object.keys(userConfigs).map((cfgName) => {
        if (CKEditor_configs/* default */.Z.hasOwnProperty(cfgName)) {
          configs[cfgName].fields = { ...CKEditor_configs/* default */.Z[cfgName].field, ...userConfigs[cfgName].field };
          configs[cfgName].styles = userConfigs[cfgName].styles || CKEditor_configs/* default */.Z[cfgName].styles;
          configs[cfgName].editorConfig = { ...CKEditor_configs/* default */.Z[cfgName].editorConfig, ...userConfigs[cfgName].editorConfig };
        } else {
          configs[cfgName] = userConfigs[cfgName];
        }
      });
    }
  }
  const clonedConfig = cloneDeep_default()(configs[presetName]);
  return clonedConfig;
};
const setPlugins = (config, { responsiveDimensions }, toggleMediaLib) => {
  const configPluginNames = config.editorConfig?.plugins ? [...config.editorConfig.plugins.map((p) => p.pluginName)] : [];
  if (configPluginNames.includes("StrapiMediaLib")) {
    config.editorConfig.strapiMediaLib = { toggle: toggleMediaLib };
  }
  if (configPluginNames.includes("StrapiUploadAdapter")) {
    config.editorConfig.strapiUploadAdapter = {
      uploadUrl: `${strapi.backendURL}/upload`,
      headers: { Authorization: "Bearer " + helper_plugin_dist/* auth */.I8.getToken() },
      backendUrl: strapi.backendURL,
      responsive: responsiveDimensions
    };
  }
  if (configPluginNames.includes("WordCount")) {
    config.editorConfig.WordCountPlugin = true;
  }
};
const requestConfig = (key) => (0,helper_plugin_dist/* request */.WY)(`/${(pluginId_default())}/config/${key}`, { method: "GET" });
const getConfiguration = async (presetName, toggleMediaLib) => {
  const currentConfig = getCurrentConfig(presetName);
  const uploadPluginConfig = await requestConfig("upload");
  setPlugins(currentConfig, uploadPluginConfig, toggleMediaLib);
  await setLanguage(currentConfig.editorConfig);
  return { currentConfig, uploadPluginConfig };
};

;// CONCATENATED MODULE: ./node_modules/@_sh/strapi-plugin-ckeditor/admin/src/components/Input/CKEditor/theme/common.js

const common = (0,styled_components_browser_esm.css)`
  .ck {
    --ck-color-image-caption-background: hsl(0, 0%, 97%);
    --ck-color-image-caption-text: hsl(0, 0%, 20%);
    --ck-color-mention-background: hsla(341, 100%, 30%, 0.1);
    --ck-color-mention-text: hsl(341, 100%, 30%);
    --ck-color-table-caption-background: hsl(0, 0%, 97%);
    --ck-color-table-caption-text: hsl(0, 0%, 20%);
    --ck-highlight-marker-blue: hsl(201, 97%, 72%);
    --ck-highlight-marker-green: hsl(120, 93%, 68%);
    --ck-highlight-marker-pink: hsl(345, 96%, 73%);
    --ck-highlight-marker-yellow: hsl(60, 97%, 73%);
    --ck-highlight-pen-green: hsl(112, 100%, 27%);
    --ck-highlight-pen-red: hsl(0, 85%, 49%);
    --ck-image-style-spacing: 1.5em;
    --ck-inline-image-style-spacing: calc(var(--ck-image-style-spacing) / 2);
    --ck-todo-list-checkmark-size: 16px;
  }

  
  .ck.ck-sticky-panel .ck-sticky-panel__content_sticky {
    top: 64px !important;
  }
  .ck.ck-reset.ck-dropdown__panel.ck-dropdown__panel_sw.ck-dropdown__panel-visible {
    border-radius: 4px;
  }

  .ck-editor__main {
    
    --ck-font-face: "Source Sans Pro", system-ui, Roboto, "Helvetica Neue", "Helvetica", Arial, sans-serif;
    
    color: var(--ck-color-editor-base-text);
    font-family: var(--ck-font-face);

    * {
      font: revert;
      margin: revert;
    }


    h1 {
      font-size: 2.3em;
    }

    h2 {
      font-size: 1.84em;
    }

    h3 {
      font-size: 1.48em;
    }

    h4 {
      font-size: 1.22em;
    }

    h5 {
      font-size: 1.06em;
    }

    h6 {
      font-size: 1em;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.2em;
      padding-top: .8em;
      margin-bottom: .4em
    }

    blockquote,
    ol,
    p,
    ul {
      font-size: 1em;
      line-height: 1.6em;
      padding-top: .2em;
      margin-bottom: var(--ck-spacing-large)
    }

    figcaption {
      background-color: var(--ck-color-image-caption-background);
      caption-side: bottom;
      color: var(--ck-color-image-caption-text);
      display: table-caption;
      font-size: 0.75em;
      outline-offset: -1px;
      padding: 0.6em;
      word-break: break-word;
    }

    a {
      text-decoration: none;
      color: #1b3af2;
    }

    a:hover {
      text-decoration: underline;
    }

    .table {
      margin: 0;
    }

    ul.todo-list {
      list-style: none;
      margin: revert;
      color: revert;
      font-family: revert;
      margin-left: 2rem;
    }

    ul,
    ol {
      list-style: initial;
      margin-left: 2rem;
    }

    ol {
      list-style: decimal;
    }

    sub {
      vertical-align: sub;
    }

    sup {
      vertical-align: super;
    }

    .ck.ck-content.ck-editor__editable {
      line-height: initial;
      min-height: 12.5rem;
      border-bottom-left-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
      transition-property: border-color, box-shadow, max-height;
      transition-timing-function: ease-in-out;
      transition-duration: 0.5s;
      &.ck-focused:not(.ck-editor__nested-editable) {
        border: 1px solid var(--ck-color-base-border);
        /* border: var(--ck-focus-ring); */
        box-shadow: none;
        transition-property: border-color, box-shadow, max-height;
        transition-timing-function: ease-in-out;
        transition-duration: 0.5s;
      }
    }

    .ck-focused,
    .ck-blurred {
      overflow-y: auto;
      overflow-x: hidden;
      transition: max-height 0.5s ease-in-out;
      ::-webkit-scrollbar {
        width: 7px;
      }
      ::-webkit-scrollbar-track {
        background: var(--ck-scroll-track-background);
        border: none;
      }
      ::-webkit-scrollbar-thumb {
        transition: background 2s;
        background: var(--ck-scroll-thumb-background);
        border: 1px solid var(--ck-scroll-thumb-border-color);
      }
      ::-webkit-scrollbar-thumb:hover {
        transition: background 2s;
        background: var(--ck-scroll-thumb-hover-background);
      }
      ::-webkit-scrollbar-thumb:active {
        background: var(--ck-scroll-thumb-active-background);
      }
    }
  }

  .ck .ck-source-editing-area textarea{
    color: var(--ck-color-text);
    background-color: var(--ck-color-base-background);
    border: 1px solid var(--ck-color-base-border) !important;
    box-shadow: none !important;
  }

  .ck .ck-block-toolbar-button {
    min-width: 0 !important;
    min-height: 0 !important;
    width: 20px !important;
    height: 25px !important;
    margin-left: -2px !important ;
    
    & svg {
      color: var(--ck-color-text) !important;
      position: absolute;
      width: 20px;
      height: 20px;
    }
  }

  .ck-word-count {
    margin-top: 0.3rem;
    display: flex;
    justify-content: end;
    gap: 0.3rem;
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: lowercase;
    /* color: #b3b3c4; */
  }

  .ck[dir=rtl]{
    .ck-block-toolbar-button {
      margin-left: 2px !important ;
    }
    & + div{
      justify-content: flex-start;
      & > .ck-word-count {
          & > div:first-child{
            order: 2;
          }
          & > div:last-child{
            order: 1;
          }
      }
    }
  }
`;

;// CONCATENATED MODULE: ./node_modules/@_sh/strapi-plugin-ckeditor/admin/src/components/Input/CKEditor/theme/light.js

const light = (0,styled_components_browser_esm.css)`
  :root {
    --ck-color-focus-outer-shadow: rgba(77, 115, 255, 0.2) !important;
    --ck-color-focus-disabled-shadow: #e4e3ff !important;
    --ck-focus-ring: 1px solid rgb(73, 69, 255) !important;
    --ck-color-button-default-hover-background: #F0F0FF !important;

    .ck .ck-color-picker-save {
      & > svg {
        stroke: #7b79ff !important;
      }
    }
  }

  .ck {
    --ck-scroll-track-background: rgb(242, 242, 242);
    --ck-scroll-thumb-background: rgb(236, 236, 236);
    --ck-scroll-thumb-border-color: #cdcdf8;
    --ck-scroll-thumb-hover-background: #f0f0ff;
    --ck-scroll-thumb-active-background: #d9d8ff;

    --ck-color-editor-base-text: #001234;
    /* Overrides the border radius setting in the theme. */
    --ck-border-radius: 4px;

    /* Helper variables to avoid duplication in the colors. */
    --ck-color-base-border: #dcdce4;
    --ck-color-base-background: #ffffff;
    --ck-custom-background: #ffffff;
    --ck-custom-foreground: #dedede;
    --ck-custom-border: #dcdce4;
    --ck-custom-white: hsl(0, 0%, 100%);

    --ck-color-base-focus: #bbbaf1;
    --ck-color-base-active: #f0f0ff;
    --ck-color-base-active-focus: #e2e2fd;
    /* -- Overrides generic colors. ------------------------------------------------------------- */

    --ck-color-base-foreground: var(--ck-custom-background);

    --ck-color-focus-border: rgb(73, 69, 255);

    --ck-color-text: #32324d;
    --ck-color-shadow-drop: hsla(250, 31%, 80%, 0.1);
    --ck-color-shadow-inner: hsla(250, 31%, 80%, 0.1);

    /* -- Overrides the default .ck-button class colors. ---------------------------------------- */

    --ck-color-button-default-background: var(--ck-custom-background);
    --ck-color-button-default-hover-background: #f0f0ff;
    --ck-color-button-default-active-background: #f6f6f9;
    --ck-color-button-default-active-shadow: #dedefb;
    --ck-color-button-default-disabled-background: var(--ck-custom-background);

    --ck-color-button-on-color: rgb(73, 69, 255);
    --ck-color-button-on-background: #f0f0ff;
    --ck-color-button-on-hover-background: #e6e9fc;
    --ck-color-button-on-active-background: #f6f6f9;
    --ck-color-button-on-active-shadow: #cdcdf8;
    --ck-color-button-on-disabled-background: var(--ck-custom-foreground);

    --ck-color-button-action-background: hsl(168, 76%, 42%);
    --ck-color-button-action-hover-background: hsl(168, 76%, 38%);
    --ck-color-button-action-active-background: hsl(168, 76%, 36%);
    --ck-color-button-action-active-shadow: hsl(168, 75%, 34%);
    --ck-color-button-action-disabled-background: hsl(168, 76%, 42%);
    --ck-color-button-action-text: var(--ck-custom-white);

    --ck-color-button-save: hsl(120, 100%, 46%);
    --ck-color-button-cancel: hsl(15, 100%, 56%);

    /* -- Overrides the default .ck-dropdown class colors. -------------------------------------- */

    --ck-color-dropdown-panel-background: var(--ck-custom-background);
    --ck-color-dropdown-panel-border: var(--ck-custom-foreground);

    /* -- Overrides the default .ck-splitbutton class colors. ----------------------------------- */

    --ck-color-split-button-hover-background: var(--ck-color-button-default-hover-background);
    --ck-color-split-button-hover-border: var(--ck-custom-foreground);

    /* -- Overrides the default .ck-input class colors. ----------------------------------------- */

    --ck-color-input-background: var(--ck-custom-background);
    --ck-color-input-border: hsl(257, 3%, 43%);
    --ck-color-input-text: hsl(0, 0%, 98%);
    --ck-color-input-disabled-background: hsl(0, 0%, 97%);
    --ck-color-input-disabled-border: rgb(214, 214, 214);
    --ck-color-input-disabled-text: hsl(0, 0%, 78%);

    /* -- Overrides the default .ck-labeled-field-view class colors. ---------------------------- */

    --ck-color-labeled-field-label-background: var(--ck-custom-background);

    /* -- Overrides the default .ck-list class colors. ------------------------------------------ */

    --ck-color-list-background: var(--ck-custom-background);
    --ck-color-list-button-hover-background: #f4f4fb;
    --ck-color-list-button-on-background: var(--ck-color-base-active);
    --ck-color-list-button-on-background-focus: var(--ck-color-base-active-focus);
    --ck-color-list-button-on-text: #271fe2;

    /* -- Overrides the default .ck-balloon-panel class colors. --------------------------------- */

    --ck-color-panel-background: var(--ck-custom-background);
    --ck-color-panel-border: var(--ck-custom-border);

    /* -- Overrides the default .ck-toolbar class colors. --------------------------------------- */

    --ck-color-toolbar-background: var(--ck-custom-background);
    --ck-color-toolbar-border: var(--ck-custom-border);

    /* -- Overrides the default .ck-tooltip class colors. --------------------------------------- */

    --ck-color-tooltip-background: #3a3955;
    --ck-color-tooltip-text: hsl(0, 0%, 93%);

    /* -- Overrides the default colors used by the ckeditor5-image package. --------------------- */

    --ck-color-image-caption-background: hsl(0, 0%, 97%);
    --ck-color-image-caption-text: hsl(0, 0%, 20%);

    /* -- Overrides the default colors used by the ckeditor5-widget package. -------------------- */

    --ck-color-widget-blurred-border: #cfcffa;
    --ck-color-widget-hover-border: #c9c9e4;
    --ck-color-widget-editable-focus-background: var(--ck-custom-white);

    /* -- Overrides the default colors used by the ckeditor5-link package. ---------------------- */

    --ck-color-link-default: hsl(209, 89%, 33%);
  }
`;

;// CONCATENATED MODULE: ./node_modules/@_sh/strapi-plugin-ckeditor/admin/src/components/Input/CKEditor/theme/dark.js

const dark = (0,styled_components_browser_esm.css)`
  :root {
    --ck-color-focus-outer-shadow: rgba(77, 115, 255, 0.2) !important;
    --ck-color-focus-disabled-shadow: rgba(106, 114, 143, 0.4) !important;
    --ck-focus-ring: 1px solid #4945ff !important;
    --ck-color-button-default-hover-background: #262630 !important;

    .ck .ck-color-picker > svg {
      color: #ffffff !important;
    }
    .ck .ck-color-picker-save {
      & > svg {
        stroke: #ffffff !important;
      }
      & > svg > #primary,
      #primary-2 {
        stroke: #7b79ff !important;
      }
    }
  }

  .ck {
    --ck-scroll-track-background: #3d3d57;
    --ck-scroll-thumb-background: #181826;
    --ck-scroll-thumb-border-color: rgb(70, 70, 70);
    --ck-scroll-thumb-hover-background: #202033;
    --ck-scroll-thumb-active-background: #2b2b45;

    --ck-color-editor-base-text: rgb(236, 236, 236);
    /* Overrides the border radius setting in the theme. */
    --ck-border-radius: 4px;

    /* Helper variables to avoid duplication in the colors. */
    --ck-color-base-border: #4a4a6a;
    --ck-color-base-background: #212134;
    --ck-custom-background: #181826;
    --ck-custom-foreground: #26263b;
    --ck-custom-border: #4a4a6a;
    --ck-custom-white: hsl(0, 0%, 100%);

    --ck-color-focus-outer-shadow: #212134;

    --ck-color-base-focus: #bbbaf1;
    --ck-color-base-active: #2e2e5c;
    --ck-color-base-active-focus: #28284d;
    /* -- Overrides generic colors. ------------------------------------------------------------- */

    --ck-color-base-foreground: var(--ck-custom-background);
    --ck-color-focus-border: #6765bd;
    --ck-color-text: hsl(0, 0%, 93%);
    --ck-color-shadow-drop: hsla(0, 0%, 0%, 0.2);
    --ck-color-shadow-inner: hsla(0, 0%, 0%, 0.1);

    /* -- Overrides the default .ck-button class colors. ---------------------------------------- */

    --ck-color-button-default-background: rgb(33, 33, 52);

    --ck-color-button-default-hover-background: #262630;
    --ck-color-button-default-active-background: #3c3c47;
    --ck-color-button-default-active-shadow: #3c3c47;
    --ck-color-button-default-disabled-background: var(--ck-custom-background);

    --ck-color-button-on-color: #7b79ff;
    --ck-color-button-on-background: #2b2b36;
    --ck-color-button-on-hover-background: #30303b;
    --ck-color-button-on-active-background: #3c3c47;
    --ck-color-button-on-active-shadow: #3c3c47;
    --ck-color-button-on-disabled-background: var(--ck-custom-foreground);

    --ck-color-button-action-background: hsl(168, 76%, 42%);
    --ck-color-button-action-hover-background: hsl(168, 76%, 38%);
    --ck-color-button-action-active-background: hsl(168, 76%, 36%);
    --ck-color-button-action-active-shadow: hsl(168, 75%, 34%);
    --ck-color-button-action-disabled-background: hsl(168, 76%, 42%);
    --ck-color-button-action-text: var(--ck-custom-white);

    --ck-color-button-save: hsl(120, 100%, 46%);
    --ck-color-button-cancel: hsl(15, 100%, 56%);

    /* -- Overrides the default .ck-dropdown class colors. -------------------------------------- */

    --ck-color-dropdown-panel-background: var(--ck-custom-background);
    --ck-color-dropdown-panel-border: var(--ck-custom-foreground);

    /* -- Overrides the default .ck-splitbutton class colors. ----------------------------------- */

    --ck-color-split-button-hover-background: var(--ck-color-button-default-hover-background);
    --ck-color-split-button-hover-border: var(--ck-custom-foreground);

    /* -- Overrides the default .ck-input class colors. ----------------------------------------- */

    --ck-color-input-background: var(--ck-custom-background);
    --ck-color-input-border: hsl(257, 3%, 43%);
    --ck-color-input-text: hsl(0, 0%, 98%);
    --ck-color-input-disabled-background: hsl(255, 4%, 21%);
    --ck-color-input-disabled-border: hsl(250, 3%, 38%);
    --ck-color-input-disabled-text: hsl(0, 0%, 78%);

    /* -- Overrides the default .ck-labeled-field-view class colors. ---------------------------- */

    --ck-color-labeled-field-label-background: var(--ck-custom-background);

    /* -- Overrides the default .ck-list class colors. ------------------------------------------ */

    --ck-color-list-background: var(--ck-custom-background);
    --ck-color-list-button-hover-background: #121221;
    --ck-color-list-button-on-background: var(--ck-color-base-active);
    --ck-color-list-button-on-background-focus: var(--ck-color-base-active-focus);
    --ck-color-list-button-on-text: #ffffff;

    /* -- Overrides the default .ck-balloon-panel class colors. --------------------------------- */

    --ck-color-panel-background: var(--ck-custom-background);
    --ck-color-panel-border: var(--ck-custom-border);

    /* -- Overrides the default .ck-toolbar class colors. --------------------------------------- */

    --ck-color-toolbar-background: var(--ck-custom-background);
    --ck-color-toolbar-border: var(--ck-custom-border);

    /* -- Overrides the default .ck-tooltip class colors. --------------------------------------- */

    --ck-color-tooltip-background: #3a3955;
    --ck-color-tooltip-text: hsl(0, 0%, 93%);

    /* -- Overrides the default colors used by the ckeditor5-image package. --------------------- */

    --ck-color-image-caption-background: hsl(0, 0%, 97%);
    --ck-color-image-caption-text: hsl(0, 0%, 20%);

    /* -- Overrides the default colors used by the ckeditor5-widget package. -------------------- */

    --ck-color-widget-blurred-border: #7c7c96;
    --ck-color-widget-hover-border: #666687;
    --ck-color-widget-editable-focus-background: var(--ck-custom-white);

    /* -- Overrides the default colors used by the ckeditor5-link package. ---------------------- */

    --ck-color-link-default: hsl(216, 100%, 75%);
  }

`;

;// CONCATENATED MODULE: ./node_modules/@_sh/strapi-plugin-ckeditor/admin/src/components/Input/CKEditor/theme/additional.js

const additional = (0,styled_components_browser_esm.css)`

/* --- expanding --- */

.ck.ck-editor__main .ck-blurred {
    max-height: 200px;
  }
.ck.ck-editor__main .ck-focused {
  	max-height: 700px;
  }

/* --- color-grid --- */

.ck.ck-color-ui-dropdown {
	--ck-color-grid-tile-size: 22px !important;
}
.ck.ck-color-grid__tile{
	width:auto;
}
.ck.ck-color-ui-dropdown .ck-color-grid {
	grid-gap: 2px;
}
.ck.ck-color-ui-dropdown .ck-color-grid .ck-button {
	border-radius: 2px;
}
.ck.ck-color-ui-dropdown .ck.ck-color-grid .ck-color-grid__tile:hover:not(.ck-disabled),
.ck.ck-color-ui-dropdown .ck.ck-color-grid .ck-color-grid__tile:focus:not(.ck-disabled) {
	z-index: 1;
	transform: scale(1.1);
	border-radius: 2px;
}

/* ---- Style feature config ------------------------------------------------------ */

:root {
	--ck-georgia-serif-font-stack: Georgia,Times,Times New Roman,serif;
}

.ck-content h1.document-title {
	font-family: var(--ck-georgia-serif-font-stack);
	font-size: 50px;
	font-weight: bold;
	border: 0;
}

.ck-content h2.document-subtitle {
	font-family: var(--ck-georgia-serif-font-stack);
	font-size: 20px;
	font-weight: bold;
	color: #d1d1d1;
	letter-spacing: 10px;
}

.ck-content p.callout {
	--border-color: #e91e1e;
	padding: 1.2em 2em;
	border: 1px solid var(--border-color);
	border-left: 10px solid var(--border-color);
	background: #fff9fb;
	border-radius: 5px;
	margin: 1.5em 2em;
	box-shadow: 5px 5px 0 #ffe6ef;
}

.ck-content blockquote.side-quote {
	font-family: var(--ck-georgia-serif-font-stack);
	font-style: normal;
	float: right;
	width: 35%;
	position: relative;
	border: 0;
	overflow: visible;
	z-index: 1;
	margin-left: 1em;
}

.ck-content blockquote.side-quote::before {
	content: "“";
	position: absolute;
	top: -37px;
	left: -10px;
	display: block;
	font-size: 200px;
	color: #e7e7e7;
	z-index: -1;
	line-height: 1;
}

.ck-content blockquote.side-quote p {
	font-size: 2em;
	line-height: 1;
}

.ck-content blockquote.side-quote p:last-child:not(:first-child) {
	font-size: 1.3em;
	text-align: right;
	color: #555;
}

.ck-content span.needs-clarification {
	outline: 1px dashed #c8a24b;
	background: #ffe19c;
	border-radius: 2px;
	position: relative;
}

.ck-content span.needs-clarification::after {
	content: "?";
	display: inline-block;
	color: #fff;
	background: #3b3b3b;
	font-size: 12px;
	vertical-align: super;
	width: 12px;
	height: 12px;
	line-height: 12px;
	border-radius: 10px;
	text-align: center;
	position: absolute;
	right: -6px;
	top: -6px;
	font-weight: bold;
	letter-spacing: initial;
}

.ck-content span.wide-spacing {
	letter-spacing: 0.3em;
}

.ck-content span.small-caps {
	font-variant: small-caps;
}

.ck-content span.spoiler {
	background: #000;
	color: #000;
}

.ck-content span.spoiler:hover {
	background: #000;
	color: #fff;
}

.ck-content pre.stylish-code {
	border-color: transparent;
	margin-left: 2em;
	margin-right: 2em;
	border-radius: 10px;
}

.ck-content pre.stylish-code::before {
	content: "";
	display: block;
	height: 13px;
	background: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NCAxMyI+CiAgPGNpcmNsZSBjeD0iNi41IiBjeT0iNi41IiByPSI2LjUiIGZpbGw9IiNGMzZCNUMiLz4KICA8Y2lyY2xlIGN4PSIyNi41IiBjeT0iNi41IiByPSI2LjUiIGZpbGw9IiNGOUJFNEQiLz4KICA8Y2lyY2xlIGN4PSI0Ny41IiBjeT0iNi41IiByPSI2LjUiIGZpbGw9IiM1NkM0NTMiLz4KPC9zdmc+Cg==);
	margin-bottom: 8px;
	background-repeat: no-repeat;
}

.ck-content pre.stylish-code-dark,
.ck-content pre.stylish-code-bright {
	padding: 1em;
}

.ck-content pre.stylish-code-dark {
	background: #272822;
	box-shadow: 5px 5px 0 #0000001f;
	color: white;
}

.ck-content pre.stylish-code-dark code {
	color: white;
}

.ck-content pre.stylish-code-bright {
	background: #dddfe0;
	color: #000;
	box-shadow: 5px 5px 0 #b3b3b3;
}

.ck-content pre.stylish-code-bright code {
	color: #222;
}

`;

;// CONCATENATED MODULE: ./node_modules/@_sh/strapi-plugin-ckeditor/admin/src/components/Input/CKEditor/theme/index.js




const baseTheme = {
  common: common,
  light: light,
  dark: dark,
  additional: additional
};
/* harmony default export */ const CKEditor_theme = (baseTheme);

;// CONCATENATED MODULE: ./node_modules/@_sh/strapi-plugin-ckeditor/admin/src/components/Input/CKEditor/styling.js


const getGlobalStyling = () => {
  const variant = localStorage.getItem("STRAPI_THEME") || "light";
  const { theme: userTheme, themeOverwrite: overwrite } = globalThis.CKEditorConfig || {};
  const theme = overwrite ? userTheme : { ...CKEditor_theme, ...userTheme };
  return (0,styled_components_browser_esm.createGlobalStyle)`
       ${theme.common}
       ${theme[variant]}
       ${theme.additional}
   `;
};

;// CONCATENATED MODULE: ./node_modules/@_sh/strapi-plugin-ckeditor/admin/src/components/Input/MediaLib/index.js



const MediaLib = ({ isOpen, onChange, onToggle, editor, uploadConfig: { responsiveDimensions } }) => {
  const { components } = (0,helper_plugin_dist/* useLibrary */.yX)();
  const MediaLibraryDialog = components["media-library"];
  const handleChangeAssets = (assets) => {
    let newValue = "";
    assets.map(({ name, url, alt, formats, mime, width, height }) => {
      if (mime.includes("image")) {
        if (formats && responsiveDimensions) {
          let set = "";
          let keys = Object.keys(formats).sort((a, b) => formats[a].width - formats[b].width);
          keys.map((k) => set += (0,helper_plugin_dist/* prefixFileUrlWithBackendUrl */.CR)(formats[k].url) + ` ${formats[k].width}w,`);
          newValue += `<img src="${url}" alt="${alt}" width="${width}" height="${height}" srcset="${set}" />`;
        } else {
          newValue += `<img src="${url}" alt="${alt}" width="${width}" height="${height}" />`;
        }
      } else if (mime.includes("application/pdf")) {
        newValue = `<a href="${(0,helper_plugin_dist/* prefixFileUrlWithBackendUrl */.CR)(url)}" download="${name}">${name || "Download PDF"}</a>`;
      } else if (mime.includes("video")) {
        newValue = `
            <video class="video" controls width="500px">
                <source src="${(0,helper_plugin_dist/* prefixFileUrlWithBackendUrl */.CR)(url)}" type="${mime}" />
            <video/>`;
      }
    });
    const viewFragment = editor.data.processor.toView(newValue);
    const modelFragment = editor.data.toModel(viewFragment);
    editor.model.insertContent(modelFragment);
    onToggle();
  };
  const handleSelectAssets = (files) => {
    const formattedFiles = files.map((f) => ({
      name: f.name,
      alt: f.alternativeText || f.name,
      url: (0,helper_plugin_dist/* prefixFileUrlWithBackendUrl */.CR)(f.url),
      mime: f.mime,
      formats: f.formats
    }));
    handleChangeAssets(formattedFiles);
  };
  if (!isOpen) {
    return null;
  }
  return /* @__PURE__ */ react.createElement(MediaLibraryDialog, { onClose: onToggle, onSelectAssets: handleSelectAssets });
};
MediaLib.defaultProps = {
  isOpen: false,
  onChange: () => {
  },
  onToggle: () => {
  }
};
MediaLib.propTypes = {
  isOpen: (prop_types_default()).bool,
  onChange: (prop_types_default()).func,
  onToggle: (prop_types_default()).func
};
/* harmony default export */ const Input_MediaLib = (MediaLib);

// EXTERNAL MODULE: ./node_modules/ckeditor5/build/ckeditor5-dll.js
var ckeditor5_dll = __webpack_require__(61089);
;// CONCATENATED MODULE: ./node_modules/@ckeditor/ckeditor5-editor-classic/build/editor-classic.js
/*!
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */(()=>{var t={655:(t,e,o)=>{"use strict";o.d(e,{Z:()=>n});var i=o(609),r=o.n(i)()((function(t){return t[1]}));r.push([t.id,".ck.ck-editor{position:relative}.ck.ck-editor .ck-editor__top .ck-sticky-panel .ck-toolbar{z-index:var(--ck-z-panel)}.ck.ck-editor__top .ck-sticky-panel .ck-toolbar{border-radius:0}.ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,.ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners{border-radius:var(--ck-border-radius);border-bottom-left-radius:0;border-bottom-right-radius:0}.ck.ck-editor__top .ck-sticky-panel .ck-toolbar{border-bottom-width:0}.ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content_sticky .ck-toolbar{border-bottom-width:1px;border-radius:0}.ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content_sticky .ck-toolbar,.ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content_sticky .ck-toolbar.ck-rounded-corners{border-radius:var(--ck-border-radius);border-radius:0}.ck.ck-editor__main>.ck-editor__editable{background:var(--ck-color-base-background);border-radius:0}.ck-rounded-corners .ck.ck-editor__main>.ck-editor__editable,.ck.ck-editor__main>.ck-editor__editable.ck-rounded-corners{border-radius:var(--ck-border-radius);border-top-left-radius:0;border-top-right-radius:0}.ck.ck-editor__main>.ck-editor__editable:not(.ck-focused){border-color:var(--ck-color-base-border)}",""]);const n=r},609:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var o=t(e);return e[2]?"@media ".concat(e[2]," {").concat(o,"}"):o})).join("")},e.i=function(t,o,i){"string"==typeof t&&(t=[[null,t,""]]);var r={};if(i)for(var n=0;n<this.length;n++){var c=this[n][0];null!=c&&(r[c]=!0)}for(var a=0;a<t.length;a++){var s=[].concat(t[a]);i&&r[s[0]]||(o&&(s[2]?s[2]="".concat(o," and ").concat(s[2]):s[2]=o),e.push(s))}},e}},62:(t,e,o)=>{"use strict";var i,r=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},n=function(){var t={};return function(e){if(void 0===t[e]){var o=document.querySelector(e);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(t){o=null}t[e]=o}return t[e]}}(),c=[];function a(t){for(var e=-1,o=0;o<c.length;o++)if(c[o].identifier===t){e=o;break}return e}function s(t,e){for(var o={},i=[],r=0;r<t.length;r++){var n=t[r],s=e.base?n[0]+e.base:n[0],l=o[s]||0,d="".concat(s," ").concat(l);o[s]=l+1;var u=a(d),h={css:n[1],media:n[2],sourceMap:n[3]};-1!==u?(c[u].references++,c[u].updater(h)):c.push({identifier:d,updater:k(h,e),references:1}),i.push(d)}return i}function l(t){var e=document.createElement("style"),i=t.attributes||{};if(void 0===i.nonce){var r=o.nc;r&&(i.nonce=r)}if(Object.keys(i).forEach((function(t){e.setAttribute(t,i[t])})),"function"==typeof t.insert)t.insert(e);else{var c=n(t.insert||"head");if(!c)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");c.appendChild(e)}return e}var d,u=(d=[],function(t,e){return d[t]=e,d.filter(Boolean).join("\n")});function h(t,e,o,i){var r=o?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(t.styleSheet)t.styleSheet.cssText=u(e,r);else{var n=document.createTextNode(r),c=t.childNodes;c[e]&&t.removeChild(c[e]),c.length?t.insertBefore(n,c[e]):t.appendChild(n)}}function f(t,e,o){var i=o.css,r=o.media,n=o.sourceMap;if(r?t.setAttribute("media",r):t.removeAttribute("media"),n&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(n))))," */")),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}var p=null,b=0;function k(t,e){var o,i,r;if(e.singleton){var n=b++;o=p||(p=l(e)),i=h.bind(null,o,n,!1),r=h.bind(null,o,n,!0)}else o=l(e),i=f.bind(null,o,e),r=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(o)};return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else r()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=r());var o=s(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var i=0;i<o.length;i++){var r=a(o[i]);c[r].references--}for(var n=s(t,e),l=0;l<o.length;l++){var d=a(o[l]);0===c[d].references&&(c[d].updater(),c.splice(d,1))}o=n}}}},704:(t,e,o)=>{t.exports=o(79)("./src/core.js")},492:(t,e,o)=>{t.exports=o(79)("./src/engine.js")},273:(t,e,o)=>{t.exports=o(79)("./src/ui.js")},209:(t,e,o)=>{t.exports=o(79)("./src/utils.js")},434:(t,e,o)=>{t.exports=o(79)("./src/watchdog.js")},79:t=>{"use strict";t.exports=CKEditor5.dll}},e={};function o(i){var r=e[i];if(void 0!==r)return r.exports;var n=e[i]={id:i,exports:{}};return t[i](n,n.exports,o),n.exports}o.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},o.d=(t,e)=>{for(var i in e)o.o(e,i)&&!o.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.nc=void 0;var i={};(()=>{"use strict";o.r(i),o.d(i,{ClassicEditor:()=>N});var t=o(273),e=o(492),r=o(209);class n extends t.EditorUI{constructor(e,o){super(e),this.view=o,this._toolbarConfig=(0,t.normalizeToolbarConfig)(e.config.get("toolbar")),this._elementReplacer=new r.ElementReplacer,this.listenTo(e.editing.view,"scrollToTheSelection",this._handleScrollToTheSelectionWithStickyPanel.bind(this))}get element(){return this.view.element}init(t){const e=this.editor,o=this.view,i=e.editing.view,r=o.editable,n=i.document.getRoot();r.name=n.rootName,o.render();const c=r.element;this.setEditableElement(r.name,c),o.editable.bind("isFocused").to(this.focusTracker),i.attachDomRoot(c),t&&this._elementReplacer.replace(t,this.element),this._initPlaceholder(),this._initToolbar(),this._initDialogPluginIntegration(),this.fire("ready")}destroy(){super.destroy();const t=this.view,e=this.editor.editing.view;this._elementReplacer.restore(),e.detachDomRoot(t.editable.name),t.destroy()}_initToolbar(){const t=this.view;t.stickyPanel.bind("isActive").to(this.focusTracker,"isFocused"),t.stickyPanel.limiterElement=t.element,t.stickyPanel.bind("viewportTopOffset").to(this,"viewportOffset",(({top:t})=>t||0)),t.toolbar.fillFromConfig(this._toolbarConfig,this.componentFactory),this.addToolbar(t.toolbar)}_initPlaceholder(){const t=this.editor,o=t.editing.view,i=o.document.getRoot(),r=t.sourceElement;let n;const c=t.config.get("placeholder");c&&(n="string"==typeof c?c:c[this.view.editable.name]),!n&&r&&"textarea"===r.tagName.toLowerCase()&&(n=r.getAttribute("placeholder")),n&&(i.placeholder=n),(0,e.enablePlaceholder)({view:o,element:i,isDirectHost:!1,keepOnFocus:!0})}_handleScrollToTheSelectionWithStickyPanel(t,e,o){const i=this.view.stickyPanel;if(i.isSticky){const t=new r.Rect(i.element).height;e.viewportOffset.top+=t}else{const t=()=>{this.editor.editing.view.scrollToTheSelection(o)};this.listenTo(i,"change:isSticky",t),setTimeout((()=>{this.stopListening(i,"change:isSticky",t)}),20)}}_initDialogPluginIntegration(){if(!this.editor.plugins.has("Dialog"))return;const e=this.view.stickyPanel,o=this.editor.plugins.get("Dialog");o.on("show",(()=>{const i=o.view;i.on("moveTo",((o,n)=>{if(!e.isSticky||i.wasMoved)return;const c=new r.Rect(e.contentPanelElement);n[1]<c.bottom+t.DialogView.defaultOffset&&(n[1]=c.bottom+t.DialogView.defaultOffset)}),{priority:"high"})}),{priority:"low"})}}var c=o(62),a=o.n(c),s=o(655),l={injectType:"singletonStyleTag",attributes:{"data-cke":!0},insert:"head",singleton:!0};a()(s.Z,l);s.Z.locals;class d extends t.BoxedEditorUIView{constructor(e,o,i={}){super(e),this.stickyPanel=new t.StickyPanelView(e),this.toolbar=new t.ToolbarView(e,{shouldGroupWhenFull:i.shouldToolbarGroupWhenFull}),this.editable=new t.InlineEditableUIView(e,o)}render(){super.render(),this.stickyPanel.content.add(this.toolbar),this.top.add(this.stickyPanel),this.main.add(this.editable)}}var u=o(704),h=o(434);const f=function(t){return null!=t&&"object"==typeof t};const p="object"==typeof global&&global&&global.Object===Object&&global;var b="object"==typeof self&&self&&self.Object===Object&&self;const k=(p||b||Function("return this")()).Symbol;var v=Object.prototype,g=v.hasOwnProperty,m=v.toString,y=k?k.toStringTag:void 0;const w=function(t){var e=g.call(t,y),o=t[y];try{t[y]=void 0;var i=!0}catch(t){}var r=m.call(t);return i&&(e?t[y]=o:delete t[y]),r};var _=Object.prototype.toString;const T=function(t){return _.call(t)};var j=k?k.toStringTag:void 0;const S=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":j&&j in Object(t)?w(t):T(t)};const x=function(t,e){return function(o){return t(e(o))}}(Object.getPrototypeOf,Object);var O=Function.prototype,E=Object.prototype,P=O.toString,C=E.hasOwnProperty,D=P.call(Object);const F=function(t){if(!f(t)||"[object Object]"!=S(t))return!1;var e=x(t);if(null===e)return!0;var o=C.call(e,"constructor")&&e.constructor;return"function"==typeof o&&o instanceof o&&P.call(o)==D};const M=function(t){return f(t)&&1===t.nodeType&&!F(t)};class R extends((0,u.DataApiMixin)((0,u.ElementApiMixin)(u.Editor))){constructor(t,e={}){if(!W(t)&&void 0!==e.initialData)throw new r.CKEditorError("editor-create-initial-data",null);super(e),void 0===this.config.get("initialData")&&this.config.set("initialData",function(t){return W(t)?(0,r.getDataFromElement)(t):t}(t)),W(t)&&(this.sourceElement=t),this.model.document.createRoot();const o=!this.config.get("toolbar.shouldNotGroupWhenFull"),i=new d(this.locale,this.editing.view,{shouldToolbarGroupWhenFull:o});this.ui=new n(this,i),(0,u.attachToForm)(this)}destroy(){return this.sourceElement&&this.updateSourceElement(),this.ui.destroy(),super.destroy()}static create(t,e={}){return new Promise((o=>{const i=new this(t,e);o(i.initPlugins().then((()=>i.ui.init(W(t)?t:null))).then((()=>i.data.init(i.config.get("initialData")))).then((()=>i.fire("ready"))).then((()=>i)))}))}}R.Context=u.Context,R.EditorWatchdog=h.EditorWatchdog,R.ContextWatchdog=h.ContextWatchdog;const N=R;function W(t){return M(t)}})(),(window.CKEditor5=window.CKEditor5||{}).editorClassic=i})();
;// CONCATENATED MODULE: ./node_modules/@_sh/strapi-plugin-ckeditor/admin/src/components/Input/CKEditor/index.js










const GlobalStyling = getGlobalStyling();
const Wrapper = (0,styled_components_browser_esm["default"])("div")`${({ editorStyles }) => editorStyles}`;
const Editor = ({ onChange, name, value, disabled, preset, maxLength }) => {
  const [editorInstance, setEditorInstance] = (0,react.useState)(false);
  const [mediaLibVisible, setMediaLibVisible] = (0,react.useState)(false);
  const [uploadPluginConfig, setUploadPluginConfig] = (0,react.useState)(null);
  const [config, setConfig] = (0,react.useState)(null);
  const [lengthMax, setLengthMax] = (0,react.useState)(false);
  const wordCounter = (0,react.useRef)(null);
  const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev);
  const handleCounter = (number) => number > maxLength ? setLengthMax(true) : setLengthMax(false);
  (0,react.useEffect)(() => {
    (async () => {
      const { currentConfig, uploadPluginConfig: uploadPluginConfig2 } = await getConfiguration(preset, handleToggleMediaLib);
      setConfig(currentConfig);
      setUploadPluginConfig(uploadPluginConfig2);
    })();
  }, []);
  return /* @__PURE__ */ react.createElement(react.Fragment, null, config && /* @__PURE__ */ react.createElement(GlobalStyling, null), /* @__PURE__ */ react.createElement(Wrapper, { editorStyles: config?.styles }, !config && /* @__PURE__ */ react.createElement(LoaderBox, { hasRadius: true, background: "neutral100" }, /* @__PURE__ */ react.createElement(Loader/* Loader */.a, null, "Loading...")), config && /* @__PURE__ */ react.createElement(
    dist.CKEditor,
    {
      editor: window.CKEditor5.editorClassic.ClassicEditor,
      config: config?.editorConfig,
      disabled,
      data: value,
      onReady: (editor) => {
        if (config.editorConfig.WordCountPlugin) {
          const wordCountPlugin = editor.plugins.get("WordCount");
          wordCountPlugin.on("update", (evt, stats) => handleCounter(stats.characters));
          const wordCountWrapper = wordCounter.current;
          wordCountWrapper?.appendChild(wordCountPlugin.wordCountContainer);
        }
        if (editor.plugins.has("ImageUploadEditing")) {
          editor.plugins.get("ImageUploadEditing").on("uploadComplete", (evt, { data, imageElement }) => editor.model.change((writer) => writer.setAttribute("alt", data.alt, imageElement)));
        }
        setEditorInstance(editor);
      },
      onChange: (event, editor) => {
        const data = editor.getData();
        onChange({ target: { name, value: data } });
      }
    }
  ), config && config.editorConfig.WordCountPlugin && /* @__PURE__ */ react.createElement(
    CounterLoaderBox,
    {
      color: lengthMax ? "danger500" : "neutral400",
      ref: wordCounter
    },
    !editorInstance && /* @__PURE__ */ react.createElement(Loader/* Loader */.a, { small: true }, "Loading...")
  ), uploadPluginConfig && /* @__PURE__ */ react.createElement(Input_MediaLib, { isOpen: mediaLibVisible, onToggle: handleToggleMediaLib, editor: editorInstance, uploadConfig: uploadPluginConfig })));
};
Editor.defaultProps = {
  value: "",
  disabled: false
};
Editor.propTypes = {
  onChange: (prop_types_default()).func.isRequired,
  name: (prop_types_default()).string.isRequired,
  value: (prop_types_default()).string,
  disabled: (prop_types_default()).bool
};
const CounterLoaderBox = (0,styled_components_browser_esm["default"])((0,Box/* Box */.x))`
  display:flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  `;
const LoaderBox = (0,styled_components_browser_esm["default"])((0,Box/* Box */.x))`
  display:flex;
  height: 200px;
  width: 100%;
  justify-content: center;
  align-items: center;
  `;
/* harmony default export */ const CKEditor = (Editor);

// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(86896);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Field/Field.mjs
var Field = __webpack_require__(78048);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Field/FieldLabel.mjs
var FieldLabel = __webpack_require__(17734);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Field/FieldHint.mjs
var FieldHint = __webpack_require__(90820);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Field/FieldError.mjs
var FieldError = __webpack_require__(61456);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Stack/Stack.mjs
var Stack = __webpack_require__(20232);
;// CONCATENATED MODULE: ./node_modules/@_sh/strapi-plugin-ckeditor/admin/src/components/Input/index.js






const Wysiwyg = ({ name, attribute, onChange, value, intlLabel, labelAction, disabled, error, description, required }) => {
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const { preset, maxLengthCharacters, ...options } = attribute.options;
  return /* @__PURE__ */ react.createElement(Field/* Field */.g, { name, id: name, error, hint: description && formatMessage(description) }, /* @__PURE__ */ react.createElement(Stack/* Stack */.K, { spacing: 1 }, /* @__PURE__ */ react.createElement(FieldLabel/* FieldLabel */.Q, { action: labelAction, required }, formatMessage(intlLabel)), /* @__PURE__ */ react.createElement(CKEditor, { disabled, name, onChange, value, preset, maxLength: maxLengthCharacters }), /* @__PURE__ */ react.createElement(FieldHint/* FieldHint */.J, null), /* @__PURE__ */ react.createElement(FieldError/* FieldError */.c, null)));
};
Wysiwyg.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: ""
};
Wysiwyg.propTypes = {
  intlLabel: (prop_types_default()).object.isRequired,
  onChange: (prop_types_default()).func.isRequired,
  attribute: (prop_types_default()).object.isRequired,
  name: (prop_types_default()).string.isRequired,
  description: (prop_types_default()).object,
  disabled: (prop_types_default()).bool,
  error: (prop_types_default()).string,
  labelAction: (prop_types_default()).object,
  required: (prop_types_default()).bool,
  value: (prop_types_default()).string
};
/* harmony default export */ const Input = (Wysiwyg);


/***/ })

}]);