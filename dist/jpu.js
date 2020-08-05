parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"xBgY":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.JMP_NOT_EQ=exports.ADD_REG_REG=exports.MOV_REG_MEM=exports.MOV_MEM_REG=exports.MOV_REG_REG=exports.MOV_LIT_REG=void 0;var _=1;exports.MOV_LIT_REG=_;var r=2;exports.MOV_REG_REG=r;var e=3;exports.MOV_MEM_REG=e;var E=4;exports.MOV_REG_MEM=E;var M=16;exports.ADD_REG_REG=M;var t=32;exports.JMP_NOT_EQ=t;
},{}],"LRlT":[function(require,module,exports) {
"use strict";function e(e){var r=new ArrayBuffer(e);return new DataView(r)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"PUKe":[function(require,module,exports) {
"use strict";function e(e){return e.reduce(function(e,t,r){return e[t]=2*r,e},{})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"aHFB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=["ip","acc","r1","r2","r3","r4"];exports.default=e;
},{}],"ULJV":[function(require,module,exports) {
"use strict";var e=require("./constants/instructions"),t=s(require("./services/create-memory")),r=s(require("./utils/create-register-map")),i=s(require("./constants/registers"));function s(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function u(e,t,r){return t&&a(e.prototype,t),r&&a(e,r),e}var o=function(){function s(e){if(n(this,s),!(e instanceof DataView))throw Error("memory should be an instance of DataView, make use of JPU.createMemory(sizeInBytes)");this.memory=e,this.resetRegisters()}return u(s,[{key:"getRegister",value:function(e){if(this.registerMap.hasOwnProperty(e))return this.registers.getUint16(this.registerMap[e]);throw Error("register not found")}},{key:"getRegisterOffset",value:function(e){return e%i.default.length*2}},{key:"setRegister",value:function(e,t){if(this.registerMap.hasOwnProperty(e))return this.registers.setUint16(this.registerMap[e],t);throw Error("register not found")}},{key:"fetch",value:function(){var e=this.getRegister("ip"),t=this.memory.getUint8(e);return this.setRegister("ip",e+1),t}},{key:"fetch16",value:function(){var e=this.getRegister("ip"),t=this.memory.getUint16(e);return this.setRegister("ip",e+2),t}},{key:"viewRegisters",value:function(){var e=this;return i.default.map(function(t){return"".concat(t,"\t\t\t").concat(e.registers.getUint16(e.registerMap[t]))}).join("\n")}},{key:"viewMemoryAt",value:function(e){var t=this,r=Array.from({length:8},function(r,i){return t.memory.getUint8(e+i)}).map(function(e){return"0x".concat(e.toString(16).padStart(2,"0"))}).join(" ");return"0x".concat(e.toString(16).padStart(4,"0")," : ").concat(r)}},{key:"resetRegisters",value:function(){this.registers=(0,t.default)(2*i.default.length),this.registerMap=(0,r.default)(i.default)}},{key:"execute",value:function(t){switch(t){case e.MOV_LIT_REG:var r=this.fetch16(),i=this.getRegisterOffset(this.fetch());return void this.registers.setUint16(i,r);case e.MOV_REG_REG:var s=this.getRegisterOffset(this.fetch()),n=this.getRegisterOffset(this.fetch()),a=this.registers.getUint16(s);return void this.registers.setUint16(n,a);case e.MOV_MEM_REG:var u=this.fetch16(),o=this.getRegisterOffset(this.fetch()),h=this.memory.getUint16(u);return void this.registers.setUint16(o,h);case e.MOV_REG_MEM:var f=this.getRegisterOffset(this.fetch()),c=this.fetch16(),g=this.registers.getUint16(f);return void this.memory.setUint16(c,g);case e.ADD_REG_REG:var l=this.getRegisterOffset(this.fetch()),v=this.getRegisterOffset(this.fetch()),y=this.registers.getUint16(l),m=this.registers.getUint16(v);return void this.setRegister("acc",y+m)}}},{key:"step",value:function(){return this.execute(this.fetch()),this}}],[{key:"createMemory",value:function(e){return(0,t.default)(e)}}]),s}();module.exports=o;
},{"./constants/instructions":"xBgY","./services/create-memory":"LRlT","./utils/create-register-map":"PUKe","./constants/registers":"aHFB"}]},{},["ULJV"], "JPU")
//# sourceMappingURL=/jpu.js.map