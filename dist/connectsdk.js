!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.forge=t():e.forge=t()}(window,(function(){return function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=34)}([function(e,t){e.exports={options:{usePureJavaScript:!1}}},function(e,t,r){(function(t){var a=r(0),n=r(37),i=e.exports=a.util=a.util||{};function s(e){if(8!==e&&16!==e&&24!==e&&32!==e)throw new Error("Only 8, 16, 24, or 32 bits supported: "+e)}function o(e){if(this.data="",this.read=0,"string"==typeof e)this.data=e;else if(i.isArrayBuffer(e)||i.isArrayBufferView(e))if("undefined"!=typeof Buffer&&e instanceof Buffer)this.data=e.toString("binary");else{var t=new Uint8Array(e);try{this.data=String.fromCharCode.apply(null,t)}catch(e){for(var r=0;r<t.length;++r)this.putByte(t[r])}}else(e instanceof o||"object"==typeof e&&"string"==typeof e.data&&"number"==typeof e.read)&&(this.data=e.data,this.read=e.read);this._constructedStringLength=0}!function(){if("undefined"!=typeof process&&process.nextTick&&!process.browser)return i.nextTick=process.nextTick,void("function"==typeof setImmediate?i.setImmediate=setImmediate:i.setImmediate=i.nextTick);if("function"==typeof setImmediate)return i.setImmediate=function(){return setImmediate.apply(void 0,arguments)},void(i.nextTick=function(e){return setImmediate(e)});if(i.setImmediate=function(e){setTimeout(e,0)},"undefined"!=typeof window&&"function"==typeof window.postMessage){var e="forge.setImmediate",t=[];i.setImmediate=function(r){t.push(r),1===t.length&&window.postMessage(e,"*")},window.addEventListener("message",(function(r){if(r.source===window&&r.data===e){r.stopPropagation();var a=t.slice();t.length=0,a.forEach((function(e){e()}))}}),!0)}if("undefined"!=typeof MutationObserver){var r=Date.now(),a=!0,n=document.createElement("div");t=[];new MutationObserver((function(){var e=t.slice();t.length=0,e.forEach((function(e){e()}))})).observe(n,{attributes:!0});var s=i.setImmediate;i.setImmediate=function(e){Date.now()-r>15?(r=Date.now(),s(e)):(t.push(e),1===t.length&&n.setAttribute("a",a=!a))}}i.nextTick=i.setImmediate}(),i.isNodejs="undefined"!=typeof process&&process.versions&&process.versions.node,i.globalScope=i.isNodejs?t:"undefined"==typeof self?window:self,i.isArray=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},i.isArrayBuffer=function(e){return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer},i.isArrayBufferView=function(e){return e&&i.isArrayBuffer(e.buffer)&&void 0!==e.byteLength},i.ByteBuffer=o,i.ByteStringBuffer=o;i.ByteStringBuffer.prototype._optimizeConstructedString=function(e){this._constructedStringLength+=e,this._constructedStringLength>4096&&(this.data.substr(0,1),this._constructedStringLength=0)},i.ByteStringBuffer.prototype.length=function(){return this.data.length-this.read},i.ByteStringBuffer.prototype.isEmpty=function(){return this.length()<=0},i.ByteStringBuffer.prototype.putByte=function(e){return this.putBytes(String.fromCharCode(e))},i.ByteStringBuffer.prototype.fillWithByte=function(e,t){e=String.fromCharCode(e);for(var r=this.data;t>0;)1&t&&(r+=e),(t>>>=1)>0&&(e+=e);return this.data=r,this._optimizeConstructedString(t),this},i.ByteStringBuffer.prototype.putBytes=function(e){return this.data+=e,this._optimizeConstructedString(e.length),this},i.ByteStringBuffer.prototype.putString=function(e){return this.putBytes(i.encodeUtf8(e))},i.ByteStringBuffer.prototype.putInt16=function(e){return this.putBytes(String.fromCharCode(e>>8&255)+String.fromCharCode(255&e))},i.ByteStringBuffer.prototype.putInt24=function(e){return this.putBytes(String.fromCharCode(e>>16&255)+String.fromCharCode(e>>8&255)+String.fromCharCode(255&e))},i.ByteStringBuffer.prototype.putInt32=function(e){return this.putBytes(String.fromCharCode(e>>24&255)+String.fromCharCode(e>>16&255)+String.fromCharCode(e>>8&255)+String.fromCharCode(255&e))},i.ByteStringBuffer.prototype.putInt16Le=function(e){return this.putBytes(String.fromCharCode(255&e)+String.fromCharCode(e>>8&255))},i.ByteStringBuffer.prototype.putInt24Le=function(e){return this.putBytes(String.fromCharCode(255&e)+String.fromCharCode(e>>8&255)+String.fromCharCode(e>>16&255))},i.ByteStringBuffer.prototype.putInt32Le=function(e){return this.putBytes(String.fromCharCode(255&e)+String.fromCharCode(e>>8&255)+String.fromCharCode(e>>16&255)+String.fromCharCode(e>>24&255))},i.ByteStringBuffer.prototype.putInt=function(e,t){s(t);var r="";do{t-=8,r+=String.fromCharCode(e>>t&255)}while(t>0);return this.putBytes(r)},i.ByteStringBuffer.prototype.putSignedInt=function(e,t){return e<0&&(e+=2<<t-1),this.putInt(e,t)},i.ByteStringBuffer.prototype.putBuffer=function(e){return this.putBytes(e.getBytes())},i.ByteStringBuffer.prototype.getByte=function(){return this.data.charCodeAt(this.read++)},i.ByteStringBuffer.prototype.getInt16=function(){var e=this.data.charCodeAt(this.read)<<8^this.data.charCodeAt(this.read+1);return this.read+=2,e},i.ByteStringBuffer.prototype.getInt24=function(){var e=this.data.charCodeAt(this.read)<<16^this.data.charCodeAt(this.read+1)<<8^this.data.charCodeAt(this.read+2);return this.read+=3,e},i.ByteStringBuffer.prototype.getInt32=function(){var e=this.data.charCodeAt(this.read)<<24^this.data.charCodeAt(this.read+1)<<16^this.data.charCodeAt(this.read+2)<<8^this.data.charCodeAt(this.read+3);return this.read+=4,e},i.ByteStringBuffer.prototype.getInt16Le=function(){var e=this.data.charCodeAt(this.read)^this.data.charCodeAt(this.read+1)<<8;return this.read+=2,e},i.ByteStringBuffer.prototype.getInt24Le=function(){var e=this.data.charCodeAt(this.read)^this.data.charCodeAt(this.read+1)<<8^this.data.charCodeAt(this.read+2)<<16;return this.read+=3,e},i.ByteStringBuffer.prototype.getInt32Le=function(){var e=this.data.charCodeAt(this.read)^this.data.charCodeAt(this.read+1)<<8^this.data.charCodeAt(this.read+2)<<16^this.data.charCodeAt(this.read+3)<<24;return this.read+=4,e},i.ByteStringBuffer.prototype.getInt=function(e){s(e);var t=0;do{t=(t<<8)+this.data.charCodeAt(this.read++),e-=8}while(e>0);return t},i.ByteStringBuffer.prototype.getSignedInt=function(e){var t=this.getInt(e),r=2<<e-2;return t>=r&&(t-=r<<1),t},i.ByteStringBuffer.prototype.getBytes=function(e){var t;return e?(e=Math.min(this.length(),e),t=this.data.slice(this.read,this.read+e),this.read+=e):0===e?t="":(t=0===this.read?this.data:this.data.slice(this.read),this.clear()),t},i.ByteStringBuffer.prototype.bytes=function(e){return void 0===e?this.data.slice(this.read):this.data.slice(this.read,this.read+e)},i.ByteStringBuffer.prototype.at=function(e){return this.data.charCodeAt(this.read+e)},i.ByteStringBuffer.prototype.setAt=function(e,t){return this.data=this.data.substr(0,this.read+e)+String.fromCharCode(t)+this.data.substr(this.read+e+1),this},i.ByteStringBuffer.prototype.last=function(){return this.data.charCodeAt(this.data.length-1)},i.ByteStringBuffer.prototype.copy=function(){var e=i.createBuffer(this.data);return e.read=this.read,e},i.ByteStringBuffer.prototype.compact=function(){return this.read>0&&(this.data=this.data.slice(this.read),this.read=0),this},i.ByteStringBuffer.prototype.clear=function(){return this.data="",this.read=0,this},i.ByteStringBuffer.prototype.truncate=function(e){var t=Math.max(0,this.length()-e);return this.data=this.data.substr(this.read,t),this.read=0,this},i.ByteStringBuffer.prototype.toHex=function(){for(var e="",t=this.read;t<this.data.length;++t){var r=this.data.charCodeAt(t);r<16&&(e+="0"),e+=r.toString(16)}return e},i.ByteStringBuffer.prototype.toString=function(){return i.decodeUtf8(this.bytes())},i.DataBuffer=function(e,t){t=t||{},this.read=t.readOffset||0,this.growSize=t.growSize||1024;var r=i.isArrayBuffer(e),a=i.isArrayBufferView(e);if(r||a)return this.data=r?new DataView(e):new DataView(e.buffer,e.byteOffset,e.byteLength),void(this.write="writeOffset"in t?t.writeOffset:this.data.byteLength);this.data=new DataView(new ArrayBuffer(0)),this.write=0,null!=e&&this.putBytes(e),"writeOffset"in t&&(this.write=t.writeOffset)},i.DataBuffer.prototype.length=function(){return this.write-this.read},i.DataBuffer.prototype.isEmpty=function(){return this.length()<=0},i.DataBuffer.prototype.accommodate=function(e,t){if(this.length()>=e)return this;t=Math.max(t||this.growSize,e);var r=new Uint8Array(this.data.buffer,this.data.byteOffset,this.data.byteLength),a=new Uint8Array(this.length()+t);return a.set(r),this.data=new DataView(a.buffer),this},i.DataBuffer.prototype.putByte=function(e){return this.accommodate(1),this.data.setUint8(this.write++,e),this},i.DataBuffer.prototype.fillWithByte=function(e,t){this.accommodate(t);for(var r=0;r<t;++r)this.data.setUint8(e);return this},i.DataBuffer.prototype.putBytes=function(e,t){if(i.isArrayBufferView(e)){var r=(a=new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).byteLength-a.byteOffset;return this.accommodate(r),new Uint8Array(this.data.buffer,this.write).set(a),this.write+=r,this}if(i.isArrayBuffer(e)){var a=new Uint8Array(e);return this.accommodate(a.byteLength),new Uint8Array(this.data.buffer).set(a,this.write),this.write+=a.byteLength,this}if(e instanceof i.DataBuffer||"object"==typeof e&&"number"==typeof e.read&&"number"==typeof e.write&&i.isArrayBufferView(e.data)){a=new Uint8Array(e.data.byteLength,e.read,e.length());return this.accommodate(a.byteLength),new Uint8Array(e.data.byteLength,this.write).set(a),this.write+=a.byteLength,this}if(e instanceof i.ByteStringBuffer&&(e=e.data,t="binary"),t=t||"binary","string"==typeof e){var n;if("hex"===t)return this.accommodate(Math.ceil(e.length/2)),n=new Uint8Array(this.data.buffer,this.write),this.write+=i.binary.hex.decode(e,n,this.write),this;if("base64"===t)return this.accommodate(3*Math.ceil(e.length/4)),n=new Uint8Array(this.data.buffer,this.write),this.write+=i.binary.base64.decode(e,n,this.write),this;if("utf8"===t&&(e=i.encodeUtf8(e),t="binary"),"binary"===t||"raw"===t)return this.accommodate(e.length),n=new Uint8Array(this.data.buffer,this.write),this.write+=i.binary.raw.decode(n),this;if("utf16"===t)return this.accommodate(2*e.length),n=new Uint16Array(this.data.buffer,this.write),this.write+=i.text.utf16.encode(n),this;throw new Error("Invalid encoding: "+t)}throw Error("Invalid parameter: "+e)},i.DataBuffer.prototype.putBuffer=function(e){return this.putBytes(e),e.clear(),this},i.DataBuffer.prototype.putString=function(e){return this.putBytes(e,"utf16")},i.DataBuffer.prototype.putInt16=function(e){return this.accommodate(2),this.data.setInt16(this.write,e),this.write+=2,this},i.DataBuffer.prototype.putInt24=function(e){return this.accommodate(3),this.data.setInt16(this.write,e>>8&65535),this.data.setInt8(this.write,e>>16&255),this.write+=3,this},i.DataBuffer.prototype.putInt32=function(e){return this.accommodate(4),this.data.setInt32(this.write,e),this.write+=4,this},i.DataBuffer.prototype.putInt16Le=function(e){return this.accommodate(2),this.data.setInt16(this.write,e,!0),this.write+=2,this},i.DataBuffer.prototype.putInt24Le=function(e){return this.accommodate(3),this.data.setInt8(this.write,e>>16&255),this.data.setInt16(this.write,e>>8&65535,!0),this.write+=3,this},i.DataBuffer.prototype.putInt32Le=function(e){return this.accommodate(4),this.data.setInt32(this.write,e,!0),this.write+=4,this},i.DataBuffer.prototype.putInt=function(e,t){s(t),this.accommodate(t/8);do{t-=8,this.data.setInt8(this.write++,e>>t&255)}while(t>0);return this},i.DataBuffer.prototype.putSignedInt=function(e,t){return s(t),this.accommodate(t/8),e<0&&(e+=2<<t-1),this.putInt(e,t)},i.DataBuffer.prototype.getByte=function(){return this.data.getInt8(this.read++)},i.DataBuffer.prototype.getInt16=function(){var e=this.data.getInt16(this.read);return this.read+=2,e},i.DataBuffer.prototype.getInt24=function(){var e=this.data.getInt16(this.read)<<8^this.data.getInt8(this.read+2);return this.read+=3,e},i.DataBuffer.prototype.getInt32=function(){var e=this.data.getInt32(this.read);return this.read+=4,e},i.DataBuffer.prototype.getInt16Le=function(){var e=this.data.getInt16(this.read,!0);return this.read+=2,e},i.DataBuffer.prototype.getInt24Le=function(){var e=this.data.getInt8(this.read)^this.data.getInt16(this.read+1,!0)<<8;return this.read+=3,e},i.DataBuffer.prototype.getInt32Le=function(){var e=this.data.getInt32(this.read,!0);return this.read+=4,e},i.DataBuffer.prototype.getInt=function(e){s(e);var t=0;do{t=(t<<8)+this.data.getInt8(this.read++),e-=8}while(e>0);return t},i.DataBuffer.prototype.getSignedInt=function(e){var t=this.getInt(e),r=2<<e-2;return t>=r&&(t-=r<<1),t},i.DataBuffer.prototype.getBytes=function(e){var t;return e?(e=Math.min(this.length(),e),t=this.data.slice(this.read,this.read+e),this.read+=e):0===e?t="":(t=0===this.read?this.data:this.data.slice(this.read),this.clear()),t},i.DataBuffer.prototype.bytes=function(e){return void 0===e?this.data.slice(this.read):this.data.slice(this.read,this.read+e)},i.DataBuffer.prototype.at=function(e){return this.data.getUint8(this.read+e)},i.DataBuffer.prototype.setAt=function(e,t){return this.data.setUint8(e,t),this},i.DataBuffer.prototype.last=function(){return this.data.getUint8(this.write-1)},i.DataBuffer.prototype.copy=function(){return new i.DataBuffer(this)},i.DataBuffer.prototype.compact=function(){if(this.read>0){var e=new Uint8Array(this.data.buffer,this.read),t=new Uint8Array(e.byteLength);t.set(e),this.data=new DataView(t),this.write-=this.read,this.read=0}return this},i.DataBuffer.prototype.clear=function(){return this.data=new DataView(new ArrayBuffer(0)),this.read=this.write=0,this},i.DataBuffer.prototype.truncate=function(e){return this.write=Math.max(0,this.length()-e),this.read=Math.min(this.read,this.write),this},i.DataBuffer.prototype.toHex=function(){for(var e="",t=this.read;t<this.data.byteLength;++t){var r=this.data.getUint8(t);r<16&&(e+="0"),e+=r.toString(16)}return e},i.DataBuffer.prototype.toString=function(e){var t=new Uint8Array(this.data,this.read,this.length());if("binary"===(e=e||"utf8")||"raw"===e)return i.binary.raw.encode(t);if("hex"===e)return i.binary.hex.encode(t);if("base64"===e)return i.binary.base64.encode(t);if("utf8"===e)return i.text.utf8.decode(t);if("utf16"===e)return i.text.utf16.decode(t);throw new Error("Invalid encoding: "+e)},i.createBuffer=function(e,t){return t=t||"raw",void 0!==e&&"utf8"===t&&(e=i.encodeUtf8(e)),new i.ByteBuffer(e)},i.fillString=function(e,t){for(var r="";t>0;)1&t&&(r+=e),(t>>>=1)>0&&(e+=e);return r},i.xorBytes=function(e,t,r){for(var a="",n="",i="",s=0,o=0;r>0;--r,++s)n=e.charCodeAt(s)^t.charCodeAt(s),o>=10&&(a+=i,i="",o=0),i+=String.fromCharCode(n),++o;return a+=i},i.hexToBytes=function(e){var t="",r=0;for(!0&e.length&&(r=1,t+=String.fromCharCode(parseInt(e[0],16)));r<e.length;r+=2)t+=String.fromCharCode(parseInt(e.substr(r,2),16));return t},i.bytesToHex=function(e){return i.createBuffer(e).toHex()},i.int32ToBytes=function(e){return String.fromCharCode(e>>24&255)+String.fromCharCode(e>>16&255)+String.fromCharCode(e>>8&255)+String.fromCharCode(255&e)};var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",u=[62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,64,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51],l="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";i.encode64=function(e,t){for(var r,a,n,i="",s="",o=0;o<e.length;)r=e.charCodeAt(o++),a=e.charCodeAt(o++),n=e.charCodeAt(o++),i+=c.charAt(r>>2),i+=c.charAt((3&r)<<4|a>>4),isNaN(a)?i+="==":(i+=c.charAt((15&a)<<2|n>>6),i+=isNaN(n)?"=":c.charAt(63&n)),t&&i.length>t&&(s+=i.substr(0,t)+"\r\n",i=i.substr(t));return s+=i},i.decode64=function(e){e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");for(var t,r,a,n,i="",s=0;s<e.length;)t=u[e.charCodeAt(s++)-43],r=u[e.charCodeAt(s++)-43],a=u[e.charCodeAt(s++)-43],n=u[e.charCodeAt(s++)-43],i+=String.fromCharCode(t<<2|r>>4),64!==a&&(i+=String.fromCharCode((15&r)<<4|a>>2),64!==n&&(i+=String.fromCharCode((3&a)<<6|n)));return i},i.encodeUtf8=function(e){return unescape(encodeURIComponent(e))},i.decodeUtf8=function(e){return decodeURIComponent(escape(e))},i.binary={raw:{},hex:{},base64:{},base58:{},baseN:{encode:n.encode,decode:n.decode}},i.binary.raw.encode=function(e){return String.fromCharCode.apply(null,e)},i.binary.raw.decode=function(e,t,r){var a=t;a||(a=new Uint8Array(e.length));for(var n=r=r||0,i=0;i<e.length;++i)a[n++]=e.charCodeAt(i);return t?n-r:a},i.binary.hex.encode=i.bytesToHex,i.binary.hex.decode=function(e,t,r){var a=t;a||(a=new Uint8Array(Math.ceil(e.length/2)));var n=0,i=r=r||0;for(1&e.length&&(n=1,a[i++]=parseInt(e[0],16));n<e.length;n+=2)a[i++]=parseInt(e.substr(n,2),16);return t?i-r:a},i.binary.base64.encode=function(e,t){for(var r,a,n,i="",s="",o=0;o<e.byteLength;)r=e[o++],a=e[o++],n=e[o++],i+=c.charAt(r>>2),i+=c.charAt((3&r)<<4|a>>4),isNaN(a)?i+="==":(i+=c.charAt((15&a)<<2|n>>6),i+=isNaN(n)?"=":c.charAt(63&n)),t&&i.length>t&&(s+=i.substr(0,t)+"\r\n",i=i.substr(t));return s+=i},i.binary.base64.decode=function(e,t,r){var a,n,i,s,o=t;o||(o=new Uint8Array(3*Math.ceil(e.length/4))),e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");for(var c=0,l=r=r||0;c<e.length;)a=u[e.charCodeAt(c++)-43],n=u[e.charCodeAt(c++)-43],i=u[e.charCodeAt(c++)-43],s=u[e.charCodeAt(c++)-43],o[l++]=a<<2|n>>4,64!==i&&(o[l++]=(15&n)<<4|i>>2,64!==s&&(o[l++]=(3&i)<<6|s));return t?l-r:o.subarray(0,l)},i.binary.base58.encode=function(e,t){return i.binary.baseN.encode(e,l,t)},i.binary.base58.decode=function(e,t){return i.binary.baseN.decode(e,l,t)},i.text={utf8:{},utf16:{}},i.text.utf8.encode=function(e,t,r){e=i.encodeUtf8(e);var a=t;a||(a=new Uint8Array(e.length));for(var n=r=r||0,s=0;s<e.length;++s)a[n++]=e.charCodeAt(s);return t?n-r:a},i.text.utf8.decode=function(e){return i.decodeUtf8(String.fromCharCode.apply(null,e))},i.text.utf16.encode=function(e,t,r){var a=t;a||(a=new Uint8Array(2*e.length));for(var n=new Uint16Array(a.buffer),i=r=r||0,s=r,o=0;o<e.length;++o)n[s++]=e.charCodeAt(o),i+=2;return t?i-r:a},i.text.utf16.decode=function(e){return String.fromCharCode.apply(null,new Uint16Array(e.buffer))},i.deflate=function(e,t,r){if(t=i.decode64(e.deflate(i.encode64(t)).rval),r){var a=2;32&t.charCodeAt(1)&&(a=6),t=t.substring(a,t.length-4)}return t},i.inflate=function(e,t,r){var a=e.inflate(i.encode64(t)).rval;return null===a?null:i.decode64(a)};var p=function(e,t,r){if(!e)throw new Error("WebStorage not available.");var a;if(null===r?a=e.removeItem(t):(r=i.encode64(JSON.stringify(r)),a=e.setItem(t,r)),void 0!==a&&!0!==a.rval){var n=new Error(a.error.message);throw n.id=a.error.id,n.name=a.error.name,n}},f=function(e,t){if(!e)throw new Error("WebStorage not available.");var r=e.getItem(t);if(e.init)if(null===r.rval){if(r.error){var a=new Error(r.error.message);throw a.id=r.error.id,a.name=r.error.name,a}r=null}else r=r.rval;return null!==r&&(r=JSON.parse(i.decode64(r))),r},h=function(e,t,r,a){var n=f(e,t);null===n&&(n={}),n[r]=a,p(e,t,n)},d=function(e,t,r){var a=f(e,t);return null!==a&&(a=r in a?a[r]:null),a},y=function(e,t,r){var a=f(e,t);if(null!==a&&r in a){delete a[r];var n=!0;for(var i in a){n=!1;break}n&&(a=null),p(e,t,a)}},g=function(e,t){p(e,t,null)},m=function(e,t,r){var a,n=null;void 0===r&&(r=["web","flash"]);var i=!1,s=null;for(var o in r){a=r[o];try{if("flash"===a||"both"===a){if(null===t[0])throw new Error("Flash local storage not available.");n=e.apply(this,t),i="flash"===a}"web"!==a&&"both"!==a||(t[0]=localStorage,n=e.apply(this,t),i=!0)}catch(e){s=e}if(i)break}if(!i)throw s;return n};i.setItem=function(e,t,r,a,n){m(h,arguments,n)},i.getItem=function(e,t,r,a){return m(d,arguments,a)},i.removeItem=function(e,t,r,a){m(y,arguments,a)},i.clearItems=function(e,t,r){m(g,arguments,r)},i.parseUrl=function(e){var t=/^(https?):\/\/([^:&^\/]*):?(\d*)(.*)$/g;t.lastIndex=0;var r=t.exec(e),a=null===r?null:{full:e,scheme:r[1],host:r[2],port:r[3],path:r[4]};return a&&(a.fullHost=a.host,a.port?(80!==a.port&&"http"===a.scheme||443!==a.port&&"https"===a.scheme)&&(a.fullHost+=":"+a.port):"http"===a.scheme?a.port=80:"https"===a.scheme&&(a.port=443),a.full=a.scheme+"://"+a.fullHost),a};var v=null;i.getQueryVariables=function(e){var t,r=function(e){for(var t={},r=e.split("&"),a=0;a<r.length;a++){var n,i,s=r[a].indexOf("=");s>0?(n=r[a].substring(0,s),i=r[a].substring(s+1)):(n=r[a],i=null),n in t||(t[n]=[]),n in Object.prototype||null===i||t[n].push(unescape(i))}return t};return void 0===e?(null===v&&(v="undefined"!=typeof window&&window.location&&window.location.search?r(window.location.search.substring(1)):{}),t=v):t=r(e),t},i.parseFragment=function(e){var t=e,r="",a=e.indexOf("?");a>0&&(t=e.substring(0,a),r=e.substring(a+1));var n=t.split("/");return n.length>0&&""===n[0]&&n.shift(),{pathString:t,queryString:r,path:n,query:""===r?{}:i.getQueryVariables(r)}},i.makeRequest=function(e){var t=i.parseFragment(e),r={path:t.pathString,query:t.queryString,getPath:function(e){return void 0===e?t.path:t.path[e]},getQuery:function(e,r){var a;return void 0===e?a=t.query:(a=t.query[e])&&void 0!==r&&(a=a[r]),a},getQueryLast:function(e,t){var a=r.getQuery(e);return a?a[a.length-1]:t}};return r},i.makeLink=function(e,t,r){e=jQuery.isArray(e)?e.join("/"):e;var a=jQuery.param(t||{});return r=r||"",e+(a.length>0?"?"+a:"")+(r.length>0?"#"+r:"")},i.isEmpty=function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},i.format=function(e){for(var t,r,a=/%./g,n=0,i=[],s=0;t=a.exec(e);){(r=e.substring(s,a.lastIndex-2)).length>0&&i.push(r),s=a.lastIndex;var o=t[0][1];switch(o){case"s":case"o":n<arguments.length?i.push(arguments[1+n++]):i.push("<?>");break;case"%":i.push("%");break;default:i.push("<%"+o+"?>")}}return i.push(e.substring(s)),i.join("")},i.formatNumber=function(e,t,r,a){var n=e,i=isNaN(t=Math.abs(t))?2:t,s=void 0===r?",":r,o=void 0===a?".":a,c=n<0?"-":"",u=parseInt(n=Math.abs(+n||0).toFixed(i),10)+"",l=u.length>3?u.length%3:0;return c+(l?u.substr(0,l)+o:"")+u.substr(l).replace(/(\d{3})(?=\d)/g,"$1"+o)+(i?s+Math.abs(n-u).toFixed(i).slice(2):"")},i.formatSize=function(e){return e=e>=1073741824?i.formatNumber(e/1073741824,2,".","")+" GiB":e>=1048576?i.formatNumber(e/1048576,2,".","")+" MiB":e>=1024?i.formatNumber(e/1024,0)+" KiB":i.formatNumber(e,0)+" bytes"},i.bytesFromIP=function(e){return-1!==e.indexOf(".")?i.bytesFromIPv4(e):-1!==e.indexOf(":")?i.bytesFromIPv6(e):null},i.bytesFromIPv4=function(e){if(4!==(e=e.split(".")).length)return null;for(var t=i.createBuffer(),r=0;r<e.length;++r){var a=parseInt(e[r],10);if(isNaN(a))return null;t.putByte(a)}return t.getBytes()},i.bytesFromIPv6=function(e){for(var t=0,r=2*(8-(e=e.split(":").filter((function(e){return 0===e.length&&++t,!0}))).length+t),a=i.createBuffer(),n=0;n<8;++n)if(e[n]&&0!==e[n].length){var s=i.hexToBytes(e[n]);s.length<2&&a.putByte(0),a.putBytes(s)}else a.fillWithByte(0,r),r=0;return a.getBytes()},i.bytesToIP=function(e){return 4===e.length?i.bytesToIPv4(e):16===e.length?i.bytesToIPv6(e):null},i.bytesToIPv4=function(e){if(4!==e.length)return null;for(var t=[],r=0;r<e.length;++r)t.push(e.charCodeAt(r));return t.join(".")},i.bytesToIPv6=function(e){if(16!==e.length)return null;for(var t=[],r=[],a=0,n=0;n<e.length;n+=2){for(var s=i.bytesToHex(e[n]+e[n+1]);"0"===s[0]&&"0"!==s;)s=s.substr(1);if("0"===s){var o=r[r.length-1],c=t.length;o&&c===o.end+1?(o.end=c,o.end-o.start>r[a].end-r[a].start&&(a=r.length-1)):r.push({start:c,end:c})}t.push(s)}if(r.length>0){var u=r[a];u.end-u.start>0&&(t.splice(u.start,u.end-u.start+1,""),0===u.start&&t.unshift(""),7===u.end&&t.push(""))}return t.join(":")},i.estimateCores=function(e,t){if("function"==typeof e&&(t=e,e={}),e=e||{},"cores"in i&&!e.update)return t(null,i.cores);if("undefined"!=typeof navigator&&"hardwareConcurrency"in navigator&&navigator.hardwareConcurrency>0)return i.cores=navigator.hardwareConcurrency,t(null,i.cores);if("undefined"==typeof Worker)return i.cores=1,t(null,i.cores);if("undefined"==typeof Blob)return i.cores=2,t(null,i.cores);var r=URL.createObjectURL(new Blob(["(",function(){self.addEventListener("message",(function(e){for(var t=Date.now(),r=t+4;Date.now()<r;);self.postMessage({st:t,et:r})}))}.toString(),")()"],{type:"application/javascript"}));!function e(a,n,s){if(0===n){var o=Math.floor(a.reduce((function(e,t){return e+t}),0)/a.length);return i.cores=Math.max(1,o),URL.revokeObjectURL(r),t(null,i.cores)}!function(e,t){for(var a=[],n=[],i=0;i<e;++i){var s=new Worker(r);s.addEventListener("message",(function(r){if(n.push(r.data),n.length===e){for(var i=0;i<e;++i)a[i].terminate();t(null,n)}})),a.push(s)}for(i=0;i<e;++i)a[i].postMessage(i)}(s,(function(t,r){a.push(function(e,t){for(var r=[],a=0;a<e;++a)for(var n=t[a],i=r[a]=[],s=0;s<e;++s)if(a!==s){var o=t[s];(n.st>o.st&&n.st<o.et||o.st>n.st&&o.st<n.et)&&i.push(s)}return r.reduce((function(e,t){return Math.max(e,t.length)}),0)}(s,r)),e(a,n-1,s)}))}([],5,16)}}).call(this,r(36))},function(e,t,r){var a=r(0);r(5),r(23),r(24),r(1),a.random&&a.random.getBytes?e.exports=a.random:function(t){var r={},n=new Array(4),i=a.util.createBuffer();function s(){var e=a.prng.create(r);return e.getBytes=function(t,r){return e.generate(t,r)},e.getBytesSync=function(t){return e.generate(t)},e}r.formatKey=function(e){var t=a.util.createBuffer(e);return(e=new Array(4))[0]=t.getInt32(),e[1]=t.getInt32(),e[2]=t.getInt32(),e[3]=t.getInt32(),a.aes._expandKey(e,!1)},r.formatSeed=function(e){var t=a.util.createBuffer(e);return(e=new Array(4))[0]=t.getInt32(),e[1]=t.getInt32(),e[2]=t.getInt32(),e[3]=t.getInt32(),e},r.cipher=function(e,t){return a.aes._updateBlock(e,t,n,!1),i.putInt32(n[0]),i.putInt32(n[1]),i.putInt32(n[2]),i.putInt32(n[3]),i.getBytes()},r.increment=function(e){return++e[3],e},r.md=a.md.sha256;var o=s(),c=null,u=a.util.globalScope,l=u.crypto||u.msCrypto;if(l&&l.getRandomValues&&(c=function(e){return l.getRandomValues(e)}),a.options.usePureJavaScript||!a.util.isNodejs&&!c){if("undefined"==typeof window||window.document,o.collectInt(+new Date,32),"undefined"!=typeof navigator){var p="";for(var f in navigator)try{"string"==typeof navigator[f]&&(p+=navigator[f])}catch(e){}o.collect(p),p=null}t&&(t().mousemove((function(e){o.collectInt(e.clientX,16),o.collectInt(e.clientY,16)})),t().keypress((function(e){o.collectInt(e.charCode,8)})))}if(a.random)for(var f in o)a.random[f]=o[f];else a.random=o;a.random.createInstance=s,e.exports=a.random}("undefined"!=typeof jQuery?jQuery:null)},function(e,t,r){var a=r(0);r(1),r(6);var n=e.exports=a.asn1=a.asn1||{};function i(e,t,r){if(r>t){var a=new Error("Too few bytes to parse DER.");throw a.available=e.length(),a.remaining=t,a.requested=r,a}}n.Class={UNIVERSAL:0,APPLICATION:64,CONTEXT_SPECIFIC:128,PRIVATE:192},n.Type={NONE:0,BOOLEAN:1,INTEGER:2,BITSTRING:3,OCTETSTRING:4,NULL:5,OID:6,ODESC:7,EXTERNAL:8,REAL:9,ENUMERATED:10,EMBEDDED:11,UTF8:12,ROID:13,SEQUENCE:16,SET:17,PRINTABLESTRING:19,IA5STRING:22,UTCTIME:23,GENERALIZEDTIME:24,BMPSTRING:30},n.create=function(e,t,r,i,s){if(a.util.isArray(i)){for(var o=[],c=0;c<i.length;++c)void 0!==i[c]&&o.push(i[c]);i=o}var u={tagClass:e,type:t,constructed:r,composed:r||a.util.isArray(i),value:i};return s&&"bitStringContents"in s&&(u.bitStringContents=s.bitStringContents,u.original=n.copy(u)),u},n.copy=function(e,t){var r;if(a.util.isArray(e)){r=[];for(var i=0;i<e.length;++i)r.push(n.copy(e[i],t));return r}return"string"==typeof e?e:(r={tagClass:e.tagClass,type:e.type,constructed:e.constructed,composed:e.composed,value:n.copy(e.value,t)},t&&!t.excludeBitStringContents&&(r.bitStringContents=e.bitStringContents),r)},n.equals=function(e,t,r){if(a.util.isArray(e)){if(!a.util.isArray(t))return!1;if(e.length!==t.length)return!1;for(var i=0;i<e.length;++i)if(!n.equals(e[i],t[i]))return!1;return!0}if(typeof e!=typeof t)return!1;if("string"==typeof e)return e===t;var s=e.tagClass===t.tagClass&&e.type===t.type&&e.constructed===t.constructed&&e.composed===t.composed&&n.equals(e.value,t.value);return r&&r.includeBitStringContents&&(s=s&&e.bitStringContents===t.bitStringContents),s},n.getBerValueLength=function(e){var t=e.getByte();if(128!==t)return 128&t?e.getInt((127&t)<<3):t};n.fromDer=function(e,t){return void 0===t&&(t={strict:!0,decodeBitStrings:!0}),"boolean"==typeof t&&(t={strict:t,decodeBitStrings:!0}),"strict"in t||(t.strict=!0),"decodeBitStrings"in t||(t.decodeBitStrings=!0),"string"==typeof e&&(e=a.util.createBuffer(e)),function e(t,r,a,s){var o;i(t,r,2);var c=t.getByte();r--;var u=192&c,l=31&c;o=t.length();var p,f,h=function(e,t){var r=e.getByte();if(t--,128!==r){var a;if(128&r){var n=127&r;i(e,t,n),a=e.getInt(n<<3)}else a=r;if(a<0)throw new Error("Negative length: "+a);return a}}(t,r);if(r-=o-t.length(),void 0!==h&&h>r){if(s.strict){var d=new Error("Too few bytes to read ASN.1 value.");throw d.available=t.length(),d.remaining=r,d.requested=h,d}h=r}var y=32==(32&c);if(y)if(p=[],void 0===h)for(;;){if(i(t,r,2),t.bytes(2)===String.fromCharCode(0,0)){t.getBytes(2),r-=2;break}o=t.length(),p.push(e(t,r,a+1,s)),r-=o-t.length()}else for(;h>0;)o=t.length(),p.push(e(t,h,a+1,s)),r-=o-t.length(),h-=o-t.length();void 0===p&&u===n.Class.UNIVERSAL&&l===n.Type.BITSTRING&&(f=t.bytes(h));if(void 0===p&&s.decodeBitStrings&&u===n.Class.UNIVERSAL&&l===n.Type.BITSTRING&&h>1){var g=t.read,m=r,v=0;if(l===n.Type.BITSTRING&&(i(t,r,1),v=t.getByte(),r--),0===v)try{o=t.length();var C={verbose:s.verbose,strict:!0,decodeBitStrings:!0},E=e(t,r,a+1,C),S=o-t.length();r-=S,l==n.Type.BITSTRING&&S++;var T=E.tagClass;S!==h||T!==n.Class.UNIVERSAL&&T!==n.Class.CONTEXT_SPECIFIC||(p=[E])}catch(e){}void 0===p&&(t.read=g,r=m)}if(void 0===p){if(void 0===h){if(s.strict)throw new Error("Non-constructed ASN.1 object of indefinite length.");h=r}if(l===n.Type.BMPSTRING)for(p="";h>0;h-=2)i(t,r,2),p+=String.fromCharCode(t.getInt16()),r-=2;else p=t.getBytes(h)}var I=void 0===f?null:{bitStringContents:f};return n.create(u,l,y,p,I)}(e,e.length(),0,t)},n.toDer=function(e){var t=a.util.createBuffer(),r=e.tagClass|e.type,i=a.util.createBuffer(),s=!1;if("bitStringContents"in e&&(s=!0,e.original&&(s=n.equals(e,e.original))),s)i.putBytes(e.bitStringContents);else if(e.composed){e.constructed?r|=32:i.putByte(0);for(var o=0;o<e.value.length;++o)void 0!==e.value[o]&&i.putBuffer(n.toDer(e.value[o]))}else if(e.type===n.Type.BMPSTRING)for(o=0;o<e.value.length;++o)i.putInt16(e.value.charCodeAt(o));else e.type===n.Type.INTEGER&&e.value.length>1&&(0===e.value.charCodeAt(0)&&0==(128&e.value.charCodeAt(1))||255===e.value.charCodeAt(0)&&128==(128&e.value.charCodeAt(1)))?i.putBytes(e.value.substr(1)):i.putBytes(e.value);if(t.putByte(r),i.length()<=127)t.putByte(127&i.length());else{var c=i.length(),u="";do{u+=String.fromCharCode(255&c),c>>>=8}while(c>0);t.putByte(128|u.length);for(o=u.length-1;o>=0;--o)t.putByte(u.charCodeAt(o))}return t.putBuffer(i),t},n.oidToDer=function(e){var t,r,n,i,s=e.split("."),o=a.util.createBuffer();o.putByte(40*parseInt(s[0],10)+parseInt(s[1],10));for(var c=2;c<s.length;++c){t=!0,r=[],n=parseInt(s[c],10);do{i=127&n,n>>>=7,t||(i|=128),r.push(i),t=!1}while(n>0);for(var u=r.length-1;u>=0;--u)o.putByte(r[u])}return o},n.derToOid=function(e){var t;"string"==typeof e&&(e=a.util.createBuffer(e));var r=e.getByte();t=Math.floor(r/40)+"."+r%40;for(var n=0;e.length()>0;)n<<=7,128&(r=e.getByte())?n+=127&r:(t+="."+(n+r),n=0);return t},n.utcTimeToDate=function(e){var t=new Date,r=parseInt(e.substr(0,2),10);r=r>=50?1900+r:2e3+r;var a=parseInt(e.substr(2,2),10)-1,n=parseInt(e.substr(4,2),10),i=parseInt(e.substr(6,2),10),s=parseInt(e.substr(8,2),10),o=0;if(e.length>11){var c=e.charAt(10),u=10;"+"!==c&&"-"!==c&&(o=parseInt(e.substr(10,2),10),u+=2)}if(t.setUTCFullYear(r,a,n),t.setUTCHours(i,s,o,0),u&&("+"===(c=e.charAt(u))||"-"===c)){var l=60*parseInt(e.substr(u+1,2),10)+parseInt(e.substr(u+4,2),10);l*=6e4,"+"===c?t.setTime(+t-l):t.setTime(+t+l)}return t},n.generalizedTimeToDate=function(e){var t=new Date,r=parseInt(e.substr(0,4),10),a=parseInt(e.substr(4,2),10)-1,n=parseInt(e.substr(6,2),10),i=parseInt(e.substr(8,2),10),s=parseInt(e.substr(10,2),10),o=parseInt(e.substr(12,2),10),c=0,u=0,l=!1;"Z"===e.charAt(e.length-1)&&(l=!0);var p=e.length-5,f=e.charAt(p);"+"!==f&&"-"!==f||(u=60*parseInt(e.substr(p+1,2),10)+parseInt(e.substr(p+4,2),10),u*=6e4,"+"===f&&(u*=-1),l=!0);return"."===e.charAt(14)&&(c=1e3*parseFloat(e.substr(14),10)),l?(t.setUTCFullYear(r,a,n),t.setUTCHours(i,s,o,c),t.setTime(+t+u)):(t.setFullYear(r,a,n),t.setHours(i,s,o,c)),t},n.dateToUtcTime=function(e){if("string"==typeof e)return e;var t="",r=[];r.push((""+e.getUTCFullYear()).substr(2)),r.push(""+(e.getUTCMonth()+1)),r.push(""+e.getUTCDate()),r.push(""+e.getUTCHours()),r.push(""+e.getUTCMinutes()),r.push(""+e.getUTCSeconds());for(var a=0;a<r.length;++a)r[a].length<2&&(t+="0"),t+=r[a];return t+="Z"},n.dateToGeneralizedTime=function(e){if("string"==typeof e)return e;var t="",r=[];r.push(""+e.getUTCFullYear()),r.push(""+(e.getUTCMonth()+1)),r.push(""+e.getUTCDate()),r.push(""+e.getUTCHours()),r.push(""+e.getUTCMinutes()),r.push(""+e.getUTCSeconds());for(var a=0;a<r.length;++a)r[a].length<2&&(t+="0"),t+=r[a];return t+="Z"},n.integerToDer=function(e){var t=a.util.createBuffer();if(e>=-128&&e<128)return t.putSignedInt(e,8);if(e>=-32768&&e<32768)return t.putSignedInt(e,16);if(e>=-8388608&&e<8388608)return t.putSignedInt(e,24);if(e>=-2147483648&&e<2147483648)return t.putSignedInt(e,32);var r=new Error("Integer too large; max is 32-bits.");throw r.integer=e,r},n.derToInteger=function(e){"string"==typeof e&&(e=a.util.createBuffer(e));var t=8*e.length();if(t>32)throw new Error("Integer too large; max is 32-bits.");return e.getSignedInt(t)},n.validate=function(e,t,r,i){var s=!1;if(e.tagClass!==t.tagClass&&void 0!==t.tagClass||e.type!==t.type&&void 0!==t.type)i&&(e.tagClass!==t.tagClass&&i.push("["+t.name+'] Expected tag class "'+t.tagClass+'", got "'+e.tagClass+'"'),e.type!==t.type&&i.push("["+t.name+'] Expected type "'+t.type+'", got "'+e.type+'"'));else if(e.constructed===t.constructed||void 0===t.constructed){if(s=!0,t.value&&a.util.isArray(t.value))for(var o=0,c=0;s&&c<t.value.length;++c)s=t.value[c].optional||!1,e.value[o]&&((s=n.validate(e.value[o],t.value[c],r,i))?++o:t.value[c].optional&&(s=!0)),!s&&i&&i.push("["+t.name+'] Tag class "'+t.tagClass+'", type "'+t.type+'" expected value length "'+t.value.length+'", got "'+e.value.length+'"');if(s&&r)if(t.capture&&(r[t.capture]=e.value),t.captureAsn1&&(r[t.captureAsn1]=e),t.captureBitStringContents&&"bitStringContents"in e&&(r[t.captureBitStringContents]=e.bitStringContents),t.captureBitStringValue&&"bitStringContents"in e)if(e.bitStringContents.length<2)r[t.captureBitStringValue]="";else{if(0!==e.bitStringContents.charCodeAt(0))throw new Error("captureBitStringValue only supported for zero unused bits");r[t.captureBitStringValue]=e.bitStringContents.slice(1)}}else i&&i.push("["+t.name+'] Expected constructed "'+t.constructed+'", got "'+e.constructed+'"');return s};var s=/[^\\u0000-\\u00ff]/;n.prettyPrint=function(e,t,r){var i="";r=r||2,(t=t||0)>0&&(i+="\n");for(var o="",c=0;c<t*r;++c)o+=" ";switch(i+=o+"Tag: ",e.tagClass){case n.Class.UNIVERSAL:i+="Universal:";break;case n.Class.APPLICATION:i+="Application:";break;case n.Class.CONTEXT_SPECIFIC:i+="Context-Specific:";break;case n.Class.PRIVATE:i+="Private:"}if(e.tagClass===n.Class.UNIVERSAL)switch(i+=e.type,e.type){case n.Type.NONE:i+=" (None)";break;case n.Type.BOOLEAN:i+=" (Boolean)";break;case n.Type.INTEGER:i+=" (Integer)";break;case n.Type.BITSTRING:i+=" (Bit string)";break;case n.Type.OCTETSTRING:i+=" (Octet string)";break;case n.Type.NULL:i+=" (Null)";break;case n.Type.OID:i+=" (Object Identifier)";break;case n.Type.ODESC:i+=" (Object Descriptor)";break;case n.Type.EXTERNAL:i+=" (External or Instance of)";break;case n.Type.REAL:i+=" (Real)";break;case n.Type.ENUMERATED:i+=" (Enumerated)";break;case n.Type.EMBEDDED:i+=" (Embedded PDV)";break;case n.Type.UTF8:i+=" (UTF8)";break;case n.Type.ROID:i+=" (Relative Object Identifier)";break;case n.Type.SEQUENCE:i+=" (Sequence)";break;case n.Type.SET:i+=" (Set)";break;case n.Type.PRINTABLESTRING:i+=" (Printable String)";break;case n.Type.IA5String:i+=" (IA5String (ASCII))";break;case n.Type.UTCTIME:i+=" (UTC time)";break;case n.Type.GENERALIZEDTIME:i+=" (Generalized time)";break;case n.Type.BMPSTRING:i+=" (BMP String)"}else i+=e.type;if(i+="\n",i+=o+"Constructed: "+e.constructed+"\n",e.composed){var u=0,l="";for(c=0;c<e.value.length;++c)void 0!==e.value[c]&&(u+=1,l+=n.prettyPrint(e.value[c],t+1,r),c+1<e.value.length&&(l+=","));i+=o+"Sub values: "+u+l}else{if(i+=o+"Value: ",e.type===n.Type.OID){var p=n.derToOid(e.value);i+=p,a.pki&&a.pki.oids&&p in a.pki.oids&&(i+=" ("+a.pki.oids[p]+") ")}if(e.type===n.Type.INTEGER)try{i+=n.derToInteger(e.value)}catch(t){i+="0x"+a.util.bytesToHex(e.value)}else if(e.type===n.Type.BITSTRING){if(e.value.length>1?i+="0x"+a.util.bytesToHex(e.value.slice(1)):i+="(none)",e.value.length>0){var f=e.value.charCodeAt(0);1==f?i+=" (1 unused bit shown)":f>1&&(i+=" ("+f+" unused bits shown)")}}else e.type===n.Type.OCTETSTRING?(s.test(e.value)||(i+="("+e.value+") "),i+="0x"+a.util.bytesToHex(e.value)):e.type===n.Type.UTF8?i+=a.util.decodeUtf8(e.value):e.type===n.Type.PRINTABLESTRING||e.type===n.Type.IA5String?i+=e.value:s.test(e.value)?i+="0x"+a.util.bytesToHex(e.value):0===e.value.length?i+="[null]":i+=e.value}return i}},function(e,t,r){var a=r(0);e.exports=a.md=a.md||{},a.md.algorithms=a.md.algorithms||{}},function(e,t,r){var a=r(0);function n(e,t){a.cipher.registerAlgorithm(e,(function(){return new a.aes.Algorithm(e,t)}))}r(13),r(19),r(1),e.exports=a.aes=a.aes||{},a.aes.startEncrypting=function(e,t,r,a){var n=d({key:e,output:r,decrypt:!1,mode:a});return n.start(t),n},a.aes.createEncryptionCipher=function(e,t){return d({key:e,output:null,decrypt:!1,mode:t})},a.aes.startDecrypting=function(e,t,r,a){var n=d({key:e,output:r,decrypt:!0,mode:a});return n.start(t),n},a.aes.createDecryptionCipher=function(e,t){return d({key:e,output:null,decrypt:!0,mode:t})},a.aes.Algorithm=function(e,t){l||p();var r=this;r.name=e,r.mode=new t({blockSize:16,cipher:{encrypt:function(e,t){return h(r._w,e,t,!1)},decrypt:function(e,t){return h(r._w,e,t,!0)}}}),r._init=!1},a.aes.Algorithm.prototype.initialize=function(e){if(!this._init){var t,r=e.key;if("string"!=typeof r||16!==r.length&&24!==r.length&&32!==r.length){if(a.util.isArray(r)&&(16===r.length||24===r.length||32===r.length)){t=r,r=a.util.createBuffer();for(var n=0;n<t.length;++n)r.putByte(t[n])}}else r=a.util.createBuffer(r);if(!a.util.isArray(r)){t=r,r=[];var i=t.length();if(16===i||24===i||32===i){i>>>=2;for(n=0;n<i;++n)r.push(t.getInt32())}}if(!a.util.isArray(r)||4!==r.length&&6!==r.length&&8!==r.length)throw new Error("Invalid key parameter.");var s=this.mode.name,o=-1!==["CFB","OFB","CTR","GCM"].indexOf(s);this._w=f(r,e.decrypt&&!o),this._init=!0}},a.aes._expandKey=function(e,t){return l||p(),f(e,t)},a.aes._updateBlock=h,n("AES-ECB",a.cipher.modes.ecb),n("AES-CBC",a.cipher.modes.cbc),n("AES-CFB",a.cipher.modes.cfb),n("AES-OFB",a.cipher.modes.ofb),n("AES-CTR",a.cipher.modes.ctr),n("AES-GCM",a.cipher.modes.gcm);var i,s,o,c,u,l=!1;function p(){l=!0,o=[0,1,2,4,8,16,32,64,128,27,54];for(var e=new Array(256),t=0;t<128;++t)e[t]=t<<1,e[t+128]=t+128<<1^283;i=new Array(256),s=new Array(256),c=new Array(4),u=new Array(4);for(t=0;t<4;++t)c[t]=new Array(256),u[t]=new Array(256);var r,a,n,p,f,h,d,y=0,g=0;for(t=0;t<256;++t){p=(p=g^g<<1^g<<2^g<<3^g<<4)>>8^255&p^99,i[y]=p,s[p]=y,h=(f=e[p])<<24^p<<16^p<<8^p^f,d=((r=e[y])^(a=e[r])^(n=e[a]))<<24^(y^n)<<16^(y^a^n)<<8^y^r^n;for(var m=0;m<4;++m)c[m][y]=h,u[m][p]=d,h=h<<24|h>>>8,d=d<<24|d>>>8;0===y?y=g=1:(y=r^e[e[e[r^n]]],g^=e[e[g]])}}function f(e,t){for(var r,a=e.slice(0),n=1,s=a.length,c=4*(s+6+1),l=s;l<c;++l)r=a[l-1],l%s==0?(r=i[r>>>16&255]<<24^i[r>>>8&255]<<16^i[255&r]<<8^i[r>>>24]^o[n]<<24,n++):s>6&&l%s==4&&(r=i[r>>>24]<<24^i[r>>>16&255]<<16^i[r>>>8&255]<<8^i[255&r]),a[l]=a[l-s]^r;if(t){for(var p,f=u[0],h=u[1],d=u[2],y=u[3],g=a.slice(0),m=(l=0,(c=a.length)-4);l<c;l+=4,m-=4)if(0===l||l===c-4)g[l]=a[m],g[l+1]=a[m+3],g[l+2]=a[m+2],g[l+3]=a[m+1];else for(var v=0;v<4;++v)p=a[m+v],g[l+(3&-v)]=f[i[p>>>24]]^h[i[p>>>16&255]]^d[i[p>>>8&255]]^y[i[255&p]];a=g}return a}function h(e,t,r,a){var n,o,l,p,f,h,d,y,g,m,v,C,E=e.length/4-1;a?(n=u[0],o=u[1],l=u[2],p=u[3],f=s):(n=c[0],o=c[1],l=c[2],p=c[3],f=i),h=t[0]^e[0],d=t[a?3:1]^e[1],y=t[2]^e[2],g=t[a?1:3]^e[3];for(var S=3,T=1;T<E;++T)m=n[h>>>24]^o[d>>>16&255]^l[y>>>8&255]^p[255&g]^e[++S],v=n[d>>>24]^o[y>>>16&255]^l[g>>>8&255]^p[255&h]^e[++S],C=n[y>>>24]^o[g>>>16&255]^l[h>>>8&255]^p[255&d]^e[++S],g=n[g>>>24]^o[h>>>16&255]^l[d>>>8&255]^p[255&y]^e[++S],h=m,d=v,y=C;r[0]=f[h>>>24]<<24^f[d>>>16&255]<<16^f[y>>>8&255]<<8^f[255&g]^e[++S],r[a?3:1]=f[d>>>24]<<24^f[y>>>16&255]<<16^f[g>>>8&255]<<8^f[255&h]^e[++S],r[2]=f[y>>>24]<<24^f[g>>>16&255]<<16^f[h>>>8&255]<<8^f[255&d]^e[++S],r[a?1:3]=f[g>>>24]<<24^f[h>>>16&255]<<16^f[d>>>8&255]<<8^f[255&y]^e[++S]}function d(e){var t,r="AES-"+((e=e||{}).mode||"CBC").toUpperCase(),n=(t=e.decrypt?a.cipher.createDecipher(r,e.key):a.cipher.createCipher(r,e.key)).start;return t.start=function(e,r){var i=null;r instanceof a.util.ByteBuffer&&(i=r,r={}),(r=r||{}).output=i,r.iv=e,n.call(t,r)},t}},function(e,t,r){var a=r(0);a.pki=a.pki||{};var n=e.exports=a.pki.oids=a.oids=a.oids||{};function i(e,t){n[e]=t,n[t]=e}function s(e,t){n[e]=t}i("1.2.840.113549.1.1.1","rsaEncryption"),i("1.2.840.113549.1.1.4","md5WithRSAEncryption"),i("1.2.840.113549.1.1.5","sha1WithRSAEncryption"),i("1.2.840.113549.1.1.7","RSAES-OAEP"),i("1.2.840.113549.1.1.8","mgf1"),i("1.2.840.113549.1.1.9","pSpecified"),i("1.2.840.113549.1.1.10","RSASSA-PSS"),i("1.2.840.113549.1.1.11","sha256WithRSAEncryption"),i("1.2.840.113549.1.1.12","sha384WithRSAEncryption"),i("1.2.840.113549.1.1.13","sha512WithRSAEncryption"),i("1.3.101.112","EdDSA25519"),i("1.2.840.10040.4.3","dsa-with-sha1"),i("1.3.14.3.2.7","desCBC"),i("1.3.14.3.2.26","sha1"),i("2.16.840.1.101.3.4.2.1","sha256"),i("2.16.840.1.101.3.4.2.2","sha384"),i("2.16.840.1.101.3.4.2.3","sha512"),i("1.2.840.113549.2.5","md5"),i("1.2.840.113549.1.7.1","data"),i("1.2.840.113549.1.7.2","signedData"),i("1.2.840.113549.1.7.3","envelopedData"),i("1.2.840.113549.1.7.4","signedAndEnvelopedData"),i("1.2.840.113549.1.7.5","digestedData"),i("1.2.840.113549.1.7.6","encryptedData"),i("1.2.840.113549.1.9.1","emailAddress"),i("1.2.840.113549.1.9.2","unstructuredName"),i("1.2.840.113549.1.9.3","contentType"),i("1.2.840.113549.1.9.4","messageDigest"),i("1.2.840.113549.1.9.5","signingTime"),i("1.2.840.113549.1.9.6","counterSignature"),i("1.2.840.113549.1.9.7","challengePassword"),i("1.2.840.113549.1.9.8","unstructuredAddress"),i("1.2.840.113549.1.9.14","extensionRequest"),i("1.2.840.113549.1.9.20","friendlyName"),i("1.2.840.113549.1.9.21","localKeyId"),i("1.2.840.113549.1.9.22.1","x509Certificate"),i("1.2.840.113549.1.12.10.1.1","keyBag"),i("1.2.840.113549.1.12.10.1.2","pkcs8ShroudedKeyBag"),i("1.2.840.113549.1.12.10.1.3","certBag"),i("1.2.840.113549.1.12.10.1.4","crlBag"),i("1.2.840.113549.1.12.10.1.5","secretBag"),i("1.2.840.113549.1.12.10.1.6","safeContentsBag"),i("1.2.840.113549.1.5.13","pkcs5PBES2"),i("1.2.840.113549.1.5.12","pkcs5PBKDF2"),i("1.2.840.113549.1.12.1.1","pbeWithSHAAnd128BitRC4"),i("1.2.840.113549.1.12.1.2","pbeWithSHAAnd40BitRC4"),i("1.2.840.113549.1.12.1.3","pbeWithSHAAnd3-KeyTripleDES-CBC"),i("1.2.840.113549.1.12.1.4","pbeWithSHAAnd2-KeyTripleDES-CBC"),i("1.2.840.113549.1.12.1.5","pbeWithSHAAnd128BitRC2-CBC"),i("1.2.840.113549.1.12.1.6","pbewithSHAAnd40BitRC2-CBC"),i("1.2.840.113549.2.7","hmacWithSHA1"),i("1.2.840.113549.2.8","hmacWithSHA224"),i("1.2.840.113549.2.9","hmacWithSHA256"),i("1.2.840.113549.2.10","hmacWithSHA384"),i("1.2.840.113549.2.11","hmacWithSHA512"),i("1.2.840.113549.3.7","des-EDE3-CBC"),i("2.16.840.1.101.3.4.1.2","aes128-CBC"),i("2.16.840.1.101.3.4.1.22","aes192-CBC"),i("2.16.840.1.101.3.4.1.42","aes256-CBC"),i("2.5.4.3","commonName"),i("2.5.4.5","serialName"),i("2.5.4.6","countryName"),i("2.5.4.7","localityName"),i("2.5.4.8","stateOrProvinceName"),i("2.5.4.9","streetAddress"),i("2.5.4.10","organizationName"),i("2.5.4.11","organizationalUnitName"),i("2.5.4.13","description"),i("2.5.4.15","businessCategory"),i("2.5.4.17","postalCode"),i("1.3.6.1.4.1.311.60.2.1.2","jurisdictionOfIncorporationStateOrProvinceName"),i("1.3.6.1.4.1.311.60.2.1.3","jurisdictionOfIncorporationCountryName"),i("2.16.840.1.113730.1.1","nsCertType"),i("2.16.840.1.113730.1.13","nsComment"),s("2.5.29.1","authorityKeyIdentifier"),s("2.5.29.2","keyAttributes"),s("2.5.29.3","certificatePolicies"),s("2.5.29.4","keyUsageRestriction"),s("2.5.29.5","policyMapping"),s("2.5.29.6","subtreesConstraint"),s("2.5.29.7","subjectAltName"),s("2.5.29.8","issuerAltName"),s("2.5.29.9","subjectDirectoryAttributes"),s("2.5.29.10","basicConstraints"),s("2.5.29.11","nameConstraints"),s("2.5.29.12","policyConstraints"),s("2.5.29.13","basicConstraints"),i("2.5.29.14","subjectKeyIdentifier"),i("2.5.29.15","keyUsage"),s("2.5.29.16","privateKeyUsagePeriod"),i("2.5.29.17","subjectAltName"),i("2.5.29.18","issuerAltName"),i("2.5.29.19","basicConstraints"),s("2.5.29.20","cRLNumber"),s("2.5.29.21","cRLReason"),s("2.5.29.22","expirationDate"),s("2.5.29.23","instructionCode"),s("2.5.29.24","invalidityDate"),s("2.5.29.25","cRLDistributionPoints"),s("2.5.29.26","issuingDistributionPoint"),s("2.5.29.27","deltaCRLIndicator"),s("2.5.29.28","issuingDistributionPoint"),s("2.5.29.29","certificateIssuer"),s("2.5.29.30","nameConstraints"),i("2.5.29.31","cRLDistributionPoints"),i("2.5.29.32","certificatePolicies"),s("2.5.29.33","policyMappings"),s("2.5.29.34","policyConstraints"),i("2.5.29.35","authorityKeyIdentifier"),s("2.5.29.36","policyConstraints"),i("2.5.29.37","extKeyUsage"),s("2.5.29.46","freshestCRL"),s("2.5.29.54","inhibitAnyPolicy"),i("1.3.6.1.4.1.11129.2.4.2","timestampList"),i("1.3.6.1.5.5.7.1.1","authorityInfoAccess"),i("1.3.6.1.5.5.7.3.1","serverAuth"),i("1.3.6.1.5.5.7.3.2","clientAuth"),i("1.3.6.1.5.5.7.3.3","codeSigning"),i("1.3.6.1.5.5.7.3.4","emailProtection"),i("1.3.6.1.5.5.7.3.8","timeStamping")},function(e,t,r){var a=r(0);r(1);var n=e.exports=a.pem=a.pem||{};function i(e){for(var t=e.name+": ",r=[],a=function(e,t){return" "+t},n=0;n<e.values.length;++n)r.push(e.values[n].replace(/^(\S+\r\n)/,a));t+=r.join(",")+"\r\n";var i=0,s=-1;for(n=0;n<t.length;++n,++i)if(i>65&&-1!==s){var o=t[s];","===o?(++s,t=t.substr(0,s)+"\r\n "+t.substr(s)):t=t.substr(0,s)+"\r\n"+o+t.substr(s+1),i=n-s-1,s=-1,++n}else" "!==t[n]&&"\t"!==t[n]&&","!==t[n]||(s=n);return t}function s(e){return e.replace(/^\s+/,"")}n.encode=function(e,t){t=t||{};var r,n="-----BEGIN "+e.type+"-----\r\n";if(e.procType&&(n+=i(r={name:"Proc-Type",values:[String(e.procType.version),e.procType.type]})),e.contentDomain&&(n+=i(r={name:"Content-Domain",values:[e.contentDomain]})),e.dekInfo&&(r={name:"DEK-Info",values:[e.dekInfo.algorithm]},e.dekInfo.parameters&&r.values.push(e.dekInfo.parameters),n+=i(r)),e.headers)for(var s=0;s<e.headers.length;++s)n+=i(e.headers[s]);return e.procType&&(n+="\r\n"),n+=a.util.encode64(e.body,t.maxline||64)+"\r\n",n+="-----END "+e.type+"-----\r\n"},n.decode=function(e){for(var t,r=[],n=/\s*-----BEGIN ([A-Z0-9- ]+)-----\r?\n?([\x21-\x7e\s]+?(?:\r?\n\r?\n))?([:A-Za-z0-9+\/=\s]+?)-----END \1-----/g,i=/([\x21-\x7e]+):\s*([\x21-\x7e\s^:]+)/,o=/\r?\n/;t=n.exec(e);){var c={type:t[1],procType:null,contentDomain:null,dekInfo:null,headers:[],body:a.util.decode64(t[3])};if(r.push(c),t[2]){for(var u=t[2].split(o),l=0;t&&l<u.length;){for(var p=u[l].replace(/\s+$/,""),f=l+1;f<u.length;++f){var h=u[f];if(!/\s/.test(h[0]))break;p+=h,l=f}if(t=p.match(i)){for(var d={name:t[1],values:[]},y=t[2].split(","),g=0;g<y.length;++g)d.values.push(s(y[g]));if(c.procType)if(c.contentDomain||"Content-Domain"!==d.name)if(c.dekInfo||"DEK-Info"!==d.name)c.headers.push(d);else{if(0===d.values.length)throw new Error('Invalid PEM formatted message. The "DEK-Info" header must have at least one subfield.');c.dekInfo={algorithm:y[0],parameters:y[1]||null}}else c.contentDomain=y[0]||"";else{if("Proc-Type"!==d.name)throw new Error('Invalid PEM formatted message. The first encapsulated header must be "Proc-Type".');if(2!==d.values.length)throw new Error('Invalid PEM formatted message. The "Proc-Type" header must have two subfields.');c.procType={version:y[0],type:y[1]}}}++l}if("ENCRYPTED"===c.procType&&!c.dekInfo)throw new Error('Invalid PEM formatted message. The "DEK-Info" header must be present if "Proc-Type" is "ENCRYPTED".')}}if(0===r.length)throw new Error("Invalid PEM formatted message.");return r}},function(e,t,r){var a=r(0);r(4),r(1),(e.exports=a.hmac=a.hmac||{}).create=function(){var e=null,t=null,r=null,n=null,i={start:function(i,s){if(null!==i)if("string"==typeof i){if(!((i=i.toLowerCase())in a.md.algorithms))throw new Error('Unknown hash algorithm "'+i+'"');t=a.md.algorithms[i].create()}else t=i;if(null===s)s=e;else{if("string"==typeof s)s=a.util.createBuffer(s);else if(a.util.isArray(s)){var o=s;s=a.util.createBuffer();for(var c=0;c<o.length;++c)s.putByte(o[c])}var u=s.length();u>t.blockLength&&(t.start(),t.update(s.bytes()),s=t.digest()),r=a.util.createBuffer(),n=a.util.createBuffer(),u=s.length();for(c=0;c<u;++c){o=s.at(c);r.putByte(54^o),n.putByte(92^o)}if(u<t.blockLength)for(o=t.blockLength-u,c=0;c<o;++c)r.putByte(54),n.putByte(92);e=s,r=r.bytes(),n=n.bytes()}t.start(),t.update(r)},update:function(e){t.update(e)},getMac:function(){var e=t.digest().bytes();return t.start(),t.update(n),t.update(e),t.digest()}};return i.digest=i.getMac,i}},function(e,t,r){var a=r(0);r(4),r(1);var n=e.exports=a.sha1=a.sha1||{};a.md.sha1=a.md.algorithms.sha1=n,n.create=function(){s||(i=String.fromCharCode(128),i+=a.util.fillString(String.fromCharCode(0),64),s=!0);var e=null,t=a.util.createBuffer(),r=new Array(80),n={algorithm:"sha1",blockLength:64,digestLength:20,messageLength:0,fullMessageLength:null,messageLengthSize:8,start:function(){n.messageLength=0,n.fullMessageLength=n.messageLength64=[];for(var r=n.messageLengthSize/4,i=0;i<r;++i)n.fullMessageLength.push(0);return t=a.util.createBuffer(),e={h0:1732584193,h1:4023233417,h2:2562383102,h3:271733878,h4:3285377520},n}};return n.start(),n.update=function(i,s){"utf8"===s&&(i=a.util.encodeUtf8(i));var c=i.length;n.messageLength+=c,c=[c/4294967296>>>0,c>>>0];for(var u=n.fullMessageLength.length-1;u>=0;--u)n.fullMessageLength[u]+=c[1],c[1]=c[0]+(n.fullMessageLength[u]/4294967296>>>0),n.fullMessageLength[u]=n.fullMessageLength[u]>>>0,c[0]=c[1]/4294967296>>>0;return t.putBytes(i),o(e,r,t),(t.read>2048||0===t.length())&&t.compact(),n},n.digest=function(){var s=a.util.createBuffer();s.putBytes(t.bytes());var c,u=n.fullMessageLength[n.fullMessageLength.length-1]+n.messageLengthSize&n.blockLength-1;s.putBytes(i.substr(0,n.blockLength-u));for(var l=8*n.fullMessageLength[0],p=0;p<n.fullMessageLength.length-1;++p)l+=(c=8*n.fullMessageLength[p+1])/4294967296>>>0,s.putInt32(l>>>0),l=c>>>0;s.putInt32(l);var f={h0:e.h0,h1:e.h1,h2:e.h2,h3:e.h3,h4:e.h4};o(f,r,s);var h=a.util.createBuffer();return h.putInt32(f.h0),h.putInt32(f.h1),h.putInt32(f.h2),h.putInt32(f.h3),h.putInt32(f.h4),h},n};var i=null,s=!1;function o(e,t,r){for(var a,n,i,s,o,c,u,l=r.length();l>=64;){for(n=e.h0,i=e.h1,s=e.h2,o=e.h3,c=e.h4,u=0;u<16;++u)a=r.getInt32(),t[u]=a,a=(n<<5|n>>>27)+(o^i&(s^o))+c+1518500249+a,c=o,o=s,s=(i<<30|i>>>2)>>>0,i=n,n=a;for(;u<20;++u)a=(a=t[u-3]^t[u-8]^t[u-14]^t[u-16])<<1|a>>>31,t[u]=a,a=(n<<5|n>>>27)+(o^i&(s^o))+c+1518500249+a,c=o,o=s,s=(i<<30|i>>>2)>>>0,i=n,n=a;for(;u<32;++u)a=(a=t[u-3]^t[u-8]^t[u-14]^t[u-16])<<1|a>>>31,t[u]=a,a=(n<<5|n>>>27)+(i^s^o)+c+1859775393+a,c=o,o=s,s=(i<<30|i>>>2)>>>0,i=n,n=a;for(;u<40;++u)a=(a=t[u-6]^t[u-16]^t[u-28]^t[u-32])<<2|a>>>30,t[u]=a,a=(n<<5|n>>>27)+(i^s^o)+c+1859775393+a,c=o,o=s,s=(i<<30|i>>>2)>>>0,i=n,n=a;for(;u<60;++u)a=(a=t[u-6]^t[u-16]^t[u-28]^t[u-32])<<2|a>>>30,t[u]=a,a=(n<<5|n>>>27)+(i&s|o&(i^s))+c+2400959708+a,c=o,o=s,s=(i<<30|i>>>2)>>>0,i=n,n=a;for(;u<80;++u)a=(a=t[u-6]^t[u-16]^t[u-28]^t[u-32])<<2|a>>>30,t[u]=a,a=(n<<5|n>>>27)+(i^s^o)+c+3395469782+a,c=o,o=s,s=(i<<30|i>>>2)>>>0,i=n,n=a;e.h0=e.h0+n|0,e.h1=e.h1+i|0,e.h2=e.h2+s|0,e.h3=e.h3+o|0,e.h4=e.h4+c|0,l-=64}}},function(e,t,r){var a=r(0);function n(e,t){a.cipher.registerAlgorithm(e,(function(){return new a.des.Algorithm(e,t)}))}r(13),r(19),r(1),e.exports=a.des=a.des||{},a.des.startEncrypting=function(e,t,r,a){var n=d({key:e,output:r,decrypt:!1,mode:a||(null===t?"ECB":"CBC")});return n.start(t),n},a.des.createEncryptionCipher=function(e,t){return d({key:e,output:null,decrypt:!1,mode:t})},a.des.startDecrypting=function(e,t,r,a){var n=d({key:e,output:r,decrypt:!0,mode:a||(null===t?"ECB":"CBC")});return n.start(t),n},a.des.createDecryptionCipher=function(e,t){return d({key:e,output:null,decrypt:!0,mode:t})},a.des.Algorithm=function(e,t){var r=this;r.name=e,r.mode=new t({blockSize:8,cipher:{encrypt:function(e,t){return h(r._keys,e,t,!1)},decrypt:function(e,t){return h(r._keys,e,t,!0)}}}),r._init=!1},a.des.Algorithm.prototype.initialize=function(e){if(!this._init){var t=a.util.createBuffer(e.key);if(0===this.name.indexOf("3DES")&&24!==t.length())throw new Error("Invalid Triple-DES key size: "+8*t.length());this._keys=function(e){for(var t,r=[0,4,536870912,536870916,65536,65540,536936448,536936452,512,516,536871424,536871428,66048,66052,536936960,536936964],a=[0,1,1048576,1048577,67108864,67108865,68157440,68157441,256,257,1048832,1048833,67109120,67109121,68157696,68157697],n=[0,8,2048,2056,16777216,16777224,16779264,16779272,0,8,2048,2056,16777216,16777224,16779264,16779272],i=[0,2097152,134217728,136314880,8192,2105344,134225920,136323072,131072,2228224,134348800,136445952,139264,2236416,134356992,136454144],s=[0,262144,16,262160,0,262144,16,262160,4096,266240,4112,266256,4096,266240,4112,266256],o=[0,1024,32,1056,0,1024,32,1056,33554432,33555456,33554464,33555488,33554432,33555456,33554464,33555488],c=[0,268435456,524288,268959744,2,268435458,524290,268959746,0,268435456,524288,268959744,2,268435458,524290,268959746],u=[0,65536,2048,67584,536870912,536936448,536872960,536938496,131072,196608,133120,198656,537001984,537067520,537004032,537069568],l=[0,262144,0,262144,2,262146,2,262146,33554432,33816576,33554432,33816576,33554434,33816578,33554434,33816578],p=[0,268435456,8,268435464,0,268435456,8,268435464,1024,268436480,1032,268436488,1024,268436480,1032,268436488],f=[0,32,0,32,1048576,1048608,1048576,1048608,8192,8224,8192,8224,1056768,1056800,1056768,1056800],h=[0,16777216,512,16777728,2097152,18874368,2097664,18874880,67108864,83886080,67109376,83886592,69206016,85983232,69206528,85983744],d=[0,4096,134217728,134221824,524288,528384,134742016,134746112,16,4112,134217744,134221840,524304,528400,134742032,134746128],y=[0,4,256,260,0,4,256,260,1,5,257,261,1,5,257,261],g=e.length()>8?3:1,m=[],v=[0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0],C=0,E=0;E<g;E++){var S=e.getInt32(),T=e.getInt32();S^=(t=252645135&(S>>>4^T))<<4,S^=t=65535&((T^=t)>>>-16^S),S^=(t=858993459&(S>>>2^(T^=t<<-16)))<<2,S^=t=65535&((T^=t)>>>-16^S),S^=(t=1431655765&(S>>>1^(T^=t<<-16)))<<1,S^=t=16711935&((T^=t)>>>8^S),t=(S^=(t=1431655765&(S>>>1^(T^=t<<8)))<<1)<<8|(T^=t)>>>20&240,S=T<<24|T<<8&16711680|T>>>8&65280|T>>>24&240,T=t;for(var I=0;I<v.length;++I){v[I]?(S=S<<2|S>>>26,T=T<<2|T>>>26):(S=S<<1|S>>>27,T=T<<1|T>>>27);var b=r[(S&=-15)>>>28]|a[S>>>24&15]|n[S>>>20&15]|i[S>>>16&15]|s[S>>>12&15]|o[S>>>8&15]|c[S>>>4&15],A=u[(T&=-15)>>>28]|l[T>>>24&15]|p[T>>>20&15]|f[T>>>16&15]|h[T>>>12&15]|d[T>>>8&15]|y[T>>>4&15];t=65535&(A>>>16^b),m[C++]=b^t,m[C++]=A^t<<16}}return m}(t),this._init=!0}},n("DES-ECB",a.cipher.modes.ecb),n("DES-CBC",a.cipher.modes.cbc),n("DES-CFB",a.cipher.modes.cfb),n("DES-OFB",a.cipher.modes.ofb),n("DES-CTR",a.cipher.modes.ctr),n("3DES-ECB",a.cipher.modes.ecb),n("3DES-CBC",a.cipher.modes.cbc),n("3DES-CFB",a.cipher.modes.cfb),n("3DES-OFB",a.cipher.modes.ofb),n("3DES-CTR",a.cipher.modes.ctr);var i=[16843776,0,65536,16843780,16842756,66564,4,65536,1024,16843776,16843780,1024,16778244,16842756,16777216,4,1028,16778240,16778240,66560,66560,16842752,16842752,16778244,65540,16777220,16777220,65540,0,1028,66564,16777216,65536,16843780,4,16842752,16843776,16777216,16777216,1024,16842756,65536,66560,16777220,1024,4,16778244,66564,16843780,65540,16842752,16778244,16777220,1028,66564,16843776,1028,16778240,16778240,0,65540,66560,0,16842756],s=[-2146402272,-2147450880,32768,1081376,1048576,32,-2146435040,-2147450848,-2147483616,-2146402272,-2146402304,-2147483648,-2147450880,1048576,32,-2146435040,1081344,1048608,-2147450848,0,-2147483648,32768,1081376,-2146435072,1048608,-2147483616,0,1081344,32800,-2146402304,-2146435072,32800,0,1081376,-2146435040,1048576,-2147450848,-2146435072,-2146402304,32768,-2146435072,-2147450880,32,-2146402272,1081376,32,32768,-2147483648,32800,-2146402304,1048576,-2147483616,1048608,-2147450848,-2147483616,1048608,1081344,0,-2147450880,32800,-2147483648,-2146435040,-2146402272,1081344],o=[520,134349312,0,134348808,134218240,0,131592,134218240,131080,134217736,134217736,131072,134349320,131080,134348800,520,134217728,8,134349312,512,131584,134348800,134348808,131592,134218248,131584,131072,134218248,8,134349320,512,134217728,134349312,134217728,131080,520,131072,134349312,134218240,0,512,131080,134349320,134218240,134217736,512,0,134348808,134218248,131072,134217728,134349320,8,131592,131584,134217736,134348800,134218248,520,134348800,131592,8,134348808,131584],c=[8396801,8321,8321,128,8396928,8388737,8388609,8193,0,8396800,8396800,8396929,129,0,8388736,8388609,1,8192,8388608,8396801,128,8388608,8193,8320,8388737,1,8320,8388736,8192,8396928,8396929,129,8388736,8388609,8396800,8396929,129,0,0,8396800,8320,8388736,8388737,1,8396801,8321,8321,128,8396929,129,1,8192,8388609,8193,8396928,8388737,8193,8320,8388608,8396801,128,8388608,8192,8396928],u=[256,34078976,34078720,1107296512,524288,256,1073741824,34078720,1074266368,524288,33554688,1074266368,1107296512,1107820544,524544,1073741824,33554432,1074266112,1074266112,0,1073742080,1107820800,1107820800,33554688,1107820544,1073742080,0,1107296256,34078976,33554432,1107296256,524544,524288,1107296512,256,33554432,1073741824,34078720,1107296512,1074266368,33554688,1073741824,1107820544,34078976,1074266368,256,33554432,1107820544,1107820800,524544,1107296256,1107820800,34078720,0,1074266112,1107296256,524544,33554688,1073742080,524288,0,1074266112,34078976,1073742080],l=[536870928,541065216,16384,541081616,541065216,16,541081616,4194304,536887296,4210704,4194304,536870928,4194320,536887296,536870912,16400,0,4194320,536887312,16384,4210688,536887312,16,541065232,541065232,0,4210704,541081600,16400,4210688,541081600,536870912,536887296,16,541065232,4210688,541081616,4194304,16400,536870928,4194304,536887296,536870912,16400,536870928,541081616,4210688,541065216,4210704,541081600,0,541065232,16,16384,541065216,4210704,16384,4194320,536887312,0,541081600,536870912,4194320,536887312],p=[2097152,69206018,67110914,0,2048,67110914,2099202,69208064,69208066,2097152,0,67108866,2,67108864,69206018,2050,67110912,2099202,2097154,67110912,67108866,69206016,69208064,2097154,69206016,2048,2050,69208066,2099200,2,67108864,2099200,67108864,2099200,2097152,67110914,67110914,69206018,69206018,2,2097154,67108864,67110912,2097152,69208064,2050,2099202,69208064,2050,67108866,69208066,69206016,2099200,0,2,69208066,0,2099202,69206016,2048,67108866,67110912,2048,2097154],f=[268439616,4096,262144,268701760,268435456,268439616,64,268435456,262208,268697600,268701760,266240,268701696,266304,4096,64,268697600,268435520,268439552,4160,266240,262208,268697664,268701696,4160,0,0,268697664,268435520,268439552,266304,262144,266304,262144,268701696,4096,64,268697664,4096,266304,268439552,64,268435520,268697600,268697664,268435456,262144,268439616,0,268701760,262208,268435520,268697600,268439552,268439616,0,268701760,266240,266240,4160,4160,262208,268435456,268701696];function h(e,t,r,a){var n,h,d=32===e.length?3:9;n=3===d?a?[30,-2,-2]:[0,32,2]:a?[94,62,-2,32,64,2,30,-2,-2]:[0,32,2,62,30,-2,64,96,2];var y=t[0],g=t[1];y^=(h=252645135&(y>>>4^g))<<4,y^=(h=65535&(y>>>16^(g^=h)))<<16,y^=h=858993459&((g^=h)>>>2^y),y^=h=16711935&((g^=h<<2)>>>8^y),y=(y^=(h=1431655765&(y>>>1^(g^=h<<8)))<<1)<<1|y>>>31,g=(g^=h)<<1|g>>>31;for(var m=0;m<d;m+=3){for(var v=n[m+1],C=n[m+2],E=n[m];E!=v;E+=C){var S=g^e[E],T=(g>>>4|g<<28)^e[E+1];h=y,y=g,g=h^(s[S>>>24&63]|c[S>>>16&63]|l[S>>>8&63]|f[63&S]|i[T>>>24&63]|o[T>>>16&63]|u[T>>>8&63]|p[63&T])}h=y,y=g,g=h}g=g>>>1|g<<31,g^=h=1431655765&((y=y>>>1|y<<31)>>>1^g),g^=(h=16711935&(g>>>8^(y^=h<<1)))<<8,g^=(h=858993459&(g>>>2^(y^=h)))<<2,g^=h=65535&((y^=h)>>>16^g),g^=h=252645135&((y^=h<<16)>>>4^g),y^=h<<4,r[0]=y,r[1]=g}function d(e){var t,r="DES-"+((e=e||{}).mode||"CBC").toUpperCase(),n=(t=e.decrypt?a.cipher.createDecipher(r,e.key):a.cipher.createCipher(r,e.key)).start;return t.start=function(e,r){var i=null;r instanceof a.util.ByteBuffer&&(i=r,r={}),(r=r||{}).output=i,r.iv=e,n.call(t,r)},t}},function(e,t,r){var a=r(0);if(r(3),r(12),r(6),r(26),r(27),r(2),r(1),void 0===n)var n=a.jsbn.BigInteger;var i=a.util.isNodejs?r(16):null,s=a.asn1,o=a.util;a.pki=a.pki||{},e.exports=a.pki.rsa=a.rsa=a.rsa||{};var c=a.pki,u=[6,4,2,4,2,4,6,2],l={name:"PrivateKeyInfo",tagClass:s.Class.UNIVERSAL,type:s.Type.SEQUENCE,constructed:!0,value:[{name:"PrivateKeyInfo.version",tagClass:s.Class.UNIVERSAL,type:s.Type.INTEGER,constructed:!1,capture:"privateKeyVersion"},{name:"PrivateKeyInfo.privateKeyAlgorithm",tagClass:s.Class.UNIVERSAL,type:s.Type.SEQUENCE,constructed:!0,value:[{name:"AlgorithmIdentifier.algorithm",tagClass:s.Class.UNIVERSAL,type:s.Type.OID,constructed:!1,capture:"privateKeyOid"}]},{name:"PrivateKeyInfo",tagClass:s.Class.UNIVERSAL,type:s.Type.OCTETSTRING,constructed:!1,capture:"privateKey"}]},p={name:"RSAPrivateKey",tagClass:s.Class.UNIVERSAL,type:s.Type.SEQUENCE,constructed:!0,value:[{name:"RSAPrivateKey.version",tagClass:s.Class.UNIVERSAL,type:s.Type.INTEGER,constructed:!1,capture:"privateKeyVersion"},{name:"RSAPrivateKey.modulus",tagClass:s.Class.UNIVERSAL,type:s.Type.INTEGER,constructed:!1,capture:"privateKeyModulus"},{name:"RSAPrivateKey.publicExponent",tagClass:s.Class.UNIVERSAL,type:s.Type.INTEGER,constructed:!1,capture:"privateKeyPublicExponent"},{name:"RSAPrivateKey.privateExponent",tagClass:s.Class.UNIVERSAL,type:s.Type.INTEGER,constructed:!1,capture:"privateKeyPrivateExponent"},{name:"RSAPrivateKey.prime1",tagClass:s.Class.UNIVERSAL,type:s.Type.INTEGER,constructed:!1,capture:"privateKeyPrime1"},{name:"RSAPrivateKey.prime2",tagClass:s.Class.UNIVERSAL,type:s.Type.INTEGER,constructed:!1,capture:"privateKeyPrime2"},{name:"RSAPrivateKey.exponent1",tagClass:s.Class.UNIVERSAL,type:s.Type.INTEGER,constructed:!1,capture:"privateKeyExponent1"},{name:"RSAPrivateKey.exponent2",tagClass:s.Class.UNIVERSAL,type:s.Type.INTEGER,constructed:!1,capture:"privateKeyExponent2"},{name:"RSAPrivateKey.coefficient",tagClass:s.Class.UNIVERSAL,type:s.Type.INTEGER,constructed:!1,capture:"privateKeyCoefficient"}]},f={name:"RSAPublicKey",tagClass:s.Class.UNIVERSAL,type:s.Type.SEQUENCE,constructed:!0,value:[{name:"RSAPublicKey.modulus",tagClass:s.Class.UNIVERSAL,type:s.Type.INTEGER,constructed:!1,capture:"publicKeyModulus"},{name:"RSAPublicKey.exponent",tagClass:s.Class.UNIVERSAL,type:s.Type.INTEGER,constructed:!1,capture:"publicKeyExponent"}]},h=a.pki.rsa.publicKeyValidator={name:"SubjectPublicKeyInfo",tagClass:s.Class.UNIVERSAL,type:s.Type.SEQUENCE,constructed:!0,captureAsn1:"subjectPublicKeyInfo",value:[{name:"SubjectPublicKeyInfo.AlgorithmIdentifier",tagClass:s.Class.UNIVERSAL,type:s.Type.SEQUENCE,constructed:!0,value:[{name:"AlgorithmIdentifier.algorithm",tagClass:s.Class.UNIVERSAL,type:s.Type.OID,constructed:!1,capture:"publicKeyOid"}]},{name:"SubjectPublicKeyInfo.subjectPublicKey",tagClass:s.Class.UNIVERSAL,type:s.Type.BITSTRING,constructed:!1,value:[{name:"SubjectPublicKeyInfo.subjectPublicKey.RSAPublicKey",tagClass:s.Class.UNIVERSAL,type:s.Type.SEQUENCE,constructed:!0,optional:!0,captureAsn1:"rsaPublicKey"}]}]},d=function(e){var t;if(!(e.algorithm in c.oids)){var r=new Error("Unknown message digest algorithm.");throw r.algorithm=e.algorithm,r}t=c.oids[e.algorithm];var a=s.oidToDer(t).getBytes(),n=s.create(s.Class.UNIVERSAL,s.Type.SEQUENCE,!0,[]),i=s.create(s.Class.UNIVERSAL,s.Type.SEQUENCE,!0,[]);i.value.push(s.create(s.Class.UNIVERSAL,s.Type.OID,!1,a)),i.value.push(s.create(s.Class.UNIVERSAL,s.Type.NULL,!1,""));var o=s.create(s.Class.UNIVERSAL,s.Type.OCTETSTRING,!1,e.digest().getBytes());return n.value.push(i),n.value.push(o),s.toDer(n).getBytes()},y=function(e,t,r){if(r)return e.modPow(t.e,t.n);if(!t.p||!t.q)return e.modPow(t.d,t.n);var i;t.dP||(t.dP=t.d.mod(t.p.subtract(n.ONE))),t.dQ||(t.dQ=t.d.mod(t.q.subtract(n.ONE))),t.qInv||(t.qInv=t.q.modInverse(t.p));do{i=new n(a.util.bytesToHex(a.random.getBytes(t.n.bitLength()/8)),16)}while(i.compareTo(t.n)>=0||!i.gcd(t.n).equals(n.ONE));for(var s=(e=e.multiply(i.modPow(t.e,t.n)).mod(t.n)).mod(t.p).modPow(t.dP,t.p),o=e.mod(t.q).modPow(t.dQ,t.q);s.compareTo(o)<0;)s=s.add(t.p);var c=s.subtract(o).multiply(t.qInv).mod(t.p).multiply(t.q).add(o);return c=c.multiply(i.modInverse(t.n)).mod(t.n)};function g(e,t,r){var n=a.util.createBuffer(),i=Math.ceil(t.n.bitLength()/8);if(e.length>i-11){var s=new Error("Message is too long for PKCS#1 v1.5 padding.");throw s.length=e.length,s.max=i-11,s}n.putByte(0),n.putByte(r);var o,c=i-3-e.length;if(0===r||1===r){o=0===r?0:255;for(var u=0;u<c;++u)n.putByte(o)}else for(;c>0;){var l=0,p=a.random.getBytes(c);for(u=0;u<c;++u)0===(o=p.charCodeAt(u))?++l:n.putByte(o);c=l}return n.putByte(0),n.putBytes(e),n}function m(e,t,r,n){var i=Math.ceil(t.n.bitLength()/8),s=a.util.createBuffer(e),o=s.getByte(),c=s.getByte();if(0!==o||r&&0!==c&&1!==c||!r&&2!=c||r&&0===c&&void 0===n)throw new Error("Encryption block is invalid.");var u=0;if(0===c){u=i-3-n;for(var l=0;l<u;++l)if(0!==s.getByte())throw new Error("Encryption block is invalid.")}else if(1===c)for(u=0;s.length()>1;){if(255!==s.getByte()){--s.read;break}++u}else if(2===c)for(u=0;s.length()>1;){if(0===s.getByte()){--s.read;break}++u}if(0!==s.getByte()||u!==i-3-s.length())throw new Error("Encryption block is invalid.");return s.getBytes()}function v(e,t,r){"function"==typeof t&&(r=t,t={});var i={algorithm:{name:(t=t||{}).algorithm||"PRIMEINC",options:{workers:t.workers||2,workLoad:t.workLoad||100,workerScript:t.workerScript}}};function s(){o(e.pBits,(function(t,a){return t?r(t):(e.p=a,null!==e.q?u(t,e.q):void o(e.qBits,u))}))}function o(e,t){a.prime.generateProbablePrime(e,i,t)}function u(t,a){if(t)return r(t);if(e.q=a,e.p.compareTo(e.q)<0){var i=e.p;e.p=e.q,e.q=i}if(0!==e.p.subtract(n.ONE).gcd(e.e).compareTo(n.ONE))return e.p=null,void s();if(0!==e.q.subtract(n.ONE).gcd(e.e).compareTo(n.ONE))return e.q=null,void o(e.qBits,u);if(e.p1=e.p.subtract(n.ONE),e.q1=e.q.subtract(n.ONE),e.phi=e.p1.multiply(e.q1),0!==e.phi.gcd(e.e).compareTo(n.ONE))return e.p=e.q=null,void s();if(e.n=e.p.multiply(e.q),e.n.bitLength()!==e.bits)return e.q=null,void o(e.qBits,u);var l=e.e.modInverse(e.phi);e.keys={privateKey:c.rsa.setPrivateKey(e.n,e.e,l,e.p,e.q,l.mod(e.p1),l.mod(e.q1),e.q.modInverse(e.p)),publicKey:c.rsa.setPublicKey(e.n,e.e)},r(null,e.keys)}"prng"in t&&(i.prng=t.prng),s()}function C(e){var t=e.toString(16);t[0]>="8"&&(t="00"+t);var r=a.util.hexToBytes(t);return r.length>1&&(0===r.charCodeAt(0)&&0==(128&r.charCodeAt(1))||255===r.charCodeAt(0)&&128==(128&r.charCodeAt(1)))?r.substr(1):r}function E(e){return e<=100?27:e<=150?18:e<=200?15:e<=250?12:e<=300?9:e<=350?8:e<=400?7:e<=500?6:e<=600?5:e<=800?4:e<=1250?3:2}function S(e){return a.util.isNodejs&&"function"==typeof i[e]}function T(e){return void 0!==o.globalScope&&"object"==typeof o.globalScope.crypto&&"object"==typeof o.globalScope.crypto.subtle&&"function"==typeof o.globalScope.crypto.subtle[e]}function I(e){return void 0!==o.globalScope&&"object"==typeof o.globalScope.msCrypto&&"object"==typeof o.globalScope.msCrypto.subtle&&"function"==typeof o.globalScope.msCrypto.subtle[e]}function b(e){for(var t=a.util.hexToBytes(e.toString(16)),r=new Uint8Array(t.length),n=0;n<t.length;++n)r[n]=t.charCodeAt(n);return r}c.rsa.encrypt=function(e,t,r){var i,s=r,o=Math.ceil(t.n.bitLength()/8);!1!==r&&!0!==r?(s=2===r,i=g(e,t,r)):(i=a.util.createBuffer()).putBytes(e);for(var c=new n(i.toHex(),16),u=y(c,t,s).toString(16),l=a.util.createBuffer(),p=o-Math.ceil(u.length/2);p>0;)l.putByte(0),--p;return l.putBytes(a.util.hexToBytes(u)),l.getBytes()},c.rsa.decrypt=function(e,t,r,i){var s=Math.ceil(t.n.bitLength()/8);if(e.length!==s){var o=new Error("Encrypted message length is invalid.");throw o.length=e.length,o.expected=s,o}var c=new n(a.util.createBuffer(e).toHex(),16);if(c.compareTo(t.n)>=0)throw new Error("Encrypted message is invalid.");for(var u=y(c,t,r).toString(16),l=a.util.createBuffer(),p=s-Math.ceil(u.length/2);p>0;)l.putByte(0),--p;return l.putBytes(a.util.hexToBytes(u)),!1!==i?m(l.getBytes(),t,r):l.getBytes()},c.rsa.createKeyPairGenerationState=function(e,t,r){"string"==typeof e&&(e=parseInt(e,10)),e=e||2048;var i,s=(r=r||{}).prng||a.random,o={nextBytes:function(e){for(var t=s.getBytesSync(e.length),r=0;r<e.length;++r)e[r]=t.charCodeAt(r)}},c=r.algorithm||"PRIMEINC";if("PRIMEINC"!==c)throw new Error("Invalid key generation algorithm: "+c);return(i={algorithm:c,state:0,bits:e,rng:o,eInt:t||65537,e:new n(null),p:null,q:null,qBits:e>>1,pBits:e-(e>>1),pqState:0,num:null,keys:null}).e.fromInt(i.eInt),i},c.rsa.stepKeyPairGenerationState=function(e,t){"algorithm"in e||(e.algorithm="PRIMEINC");var r=new n(null);r.fromInt(30);for(var a,i=0,s=function(e,t){return e|t},o=+new Date,l=0;null===e.keys&&(t<=0||l<t);){if(0===e.state){var p=null===e.p?e.pBits:e.qBits,f=p-1;0===e.pqState?(e.num=new n(p,e.rng),e.num.testBit(f)||e.num.bitwiseTo(n.ONE.shiftLeft(f),s,e.num),e.num.dAddOffset(31-e.num.mod(r).byteValue(),0),i=0,++e.pqState):1===e.pqState?e.num.bitLength()>p?e.pqState=0:e.num.isProbablePrime(E(e.num.bitLength()))?++e.pqState:e.num.dAddOffset(u[i++%8],0):2===e.pqState?e.pqState=0===e.num.subtract(n.ONE).gcd(e.e).compareTo(n.ONE)?3:0:3===e.pqState&&(e.pqState=0,null===e.p?e.p=e.num:e.q=e.num,null!==e.p&&null!==e.q&&++e.state,e.num=null)}else if(1===e.state)e.p.compareTo(e.q)<0&&(e.num=e.p,e.p=e.q,e.q=e.num),++e.state;else if(2===e.state)e.p1=e.p.subtract(n.ONE),e.q1=e.q.subtract(n.ONE),e.phi=e.p1.multiply(e.q1),++e.state;else if(3===e.state)0===e.phi.gcd(e.e).compareTo(n.ONE)?++e.state:(e.p=null,e.q=null,e.state=0);else if(4===e.state)e.n=e.p.multiply(e.q),e.n.bitLength()===e.bits?++e.state:(e.q=null,e.state=0);else if(5===e.state){var h=e.e.modInverse(e.phi);e.keys={privateKey:c.rsa.setPrivateKey(e.n,e.e,h,e.p,e.q,h.mod(e.p1),h.mod(e.q1),e.q.modInverse(e.p)),publicKey:c.rsa.setPublicKey(e.n,e.e)}}l+=(a=+new Date)-o,o=a}return null!==e.keys},c.rsa.generateKeyPair=function(e,t,r,n){if(1===arguments.length?"object"==typeof e?(r=e,e=void 0):"function"==typeof e&&(n=e,e=void 0):2===arguments.length?"number"==typeof e?"function"==typeof t?(n=t,t=void 0):"number"!=typeof t&&(r=t,t=void 0):(r=e,n=t,e=void 0,t=void 0):3===arguments.length&&("number"==typeof t?"function"==typeof r&&(n=r,r=void 0):(n=r,r=t,t=void 0)),r=r||{},void 0===e&&(e=r.bits||2048),void 0===t&&(t=r.e||65537),!a.options.usePureJavaScript&&!r.prng&&e>=256&&e<=16384&&(65537===t||3===t))if(n){if(S("generateKeyPair"))return i.generateKeyPair("rsa",{modulusLength:e,publicExponent:t,publicKeyEncoding:{type:"spki",format:"pem"},privateKeyEncoding:{type:"pkcs8",format:"pem"}},(function(e,t,r){if(e)return n(e);n(null,{privateKey:c.privateKeyFromPem(r),publicKey:c.publicKeyFromPem(t)})}));if(T("generateKey")&&T("exportKey"))return o.globalScope.crypto.subtle.generateKey({name:"RSASSA-PKCS1-v1_5",modulusLength:e,publicExponent:b(t),hash:{name:"SHA-256"}},!0,["sign","verify"]).then((function(e){return o.globalScope.crypto.subtle.exportKey("pkcs8",e.privateKey)})).then(void 0,(function(e){n(e)})).then((function(e){if(e){var t=c.privateKeyFromAsn1(s.fromDer(a.util.createBuffer(e)));n(null,{privateKey:t,publicKey:c.setRsaPublicKey(t.n,t.e)})}}));if(I("generateKey")&&I("exportKey")){var u=o.globalScope.msCrypto.subtle.generateKey({name:"RSASSA-PKCS1-v1_5",modulusLength:e,publicExponent:b(t),hash:{name:"SHA-256"}},!0,["sign","verify"]);return u.oncomplete=function(e){var t=e.target.result,r=o.globalScope.msCrypto.subtle.exportKey("pkcs8",t.privateKey);r.oncomplete=function(e){var t=e.target.result,r=c.privateKeyFromAsn1(s.fromDer(a.util.createBuffer(t)));n(null,{privateKey:r,publicKey:c.setRsaPublicKey(r.n,r.e)})},r.onerror=function(e){n(e)}},void(u.onerror=function(e){n(e)})}}else if(S("generateKeyPairSync")){var l=i.generateKeyPairSync("rsa",{modulusLength:e,publicExponent:t,publicKeyEncoding:{type:"spki",format:"pem"},privateKeyEncoding:{type:"pkcs8",format:"pem"}});return{privateKey:c.privateKeyFromPem(l.privateKey),publicKey:c.publicKeyFromPem(l.publicKey)}}var p=c.rsa.createKeyPairGenerationState(e,t,r);if(!n)return c.rsa.stepKeyPairGenerationState(p,0),p.keys;v(p,r,n)},c.setRsaPublicKey=c.rsa.setPublicKey=function(e,t){var r={n:e,e:t,encrypt:function(e,t,n){if("string"==typeof t?t=t.toUpperCase():void 0===t&&(t="RSAES-PKCS1-V1_5"),"RSAES-PKCS1-V1_5"===t)t={encode:function(e,t,r){return g(e,t,2).getBytes()}};else if("RSA-OAEP"===t||"RSAES-OAEP"===t)t={encode:function(e,t){return a.pkcs1.encode_rsa_oaep(t,e,n)}};else if(-1!==["RAW","NONE","NULL",null].indexOf(t))t={encode:function(e){return e}};else if("string"==typeof t)throw new Error('Unsupported encryption scheme: "'+t+'".');var i=t.encode(e,r,!0);return c.rsa.encrypt(i,r,!0)},verify:function(e,t,a){"string"==typeof a?a=a.toUpperCase():void 0===a&&(a="RSASSA-PKCS1-V1_5"),"RSASSA-PKCS1-V1_5"===a?a={verify:function(e,t){return t=m(t,r,!0),e===s.fromDer(t).value[1].value}}:"NONE"!==a&&"NULL"!==a&&null!==a||(a={verify:function(e,t){return e===(t=m(t,r,!0))}});var n=c.rsa.decrypt(t,r,!0,!1);return a.verify(e,n,r.n.bitLength())}};return r},c.setRsaPrivateKey=c.rsa.setPrivateKey=function(e,t,r,n,i,s,o,u){var l={n:e,e:t,d:r,p:n,q:i,dP:s,dQ:o,qInv:u,decrypt:function(e,t,r){"string"==typeof t?t=t.toUpperCase():void 0===t&&(t="RSAES-PKCS1-V1_5");var n=c.rsa.decrypt(e,l,!1,!1);if("RSAES-PKCS1-V1_5"===t)t={decode:m};else if("RSA-OAEP"===t||"RSAES-OAEP"===t)t={decode:function(e,t){return a.pkcs1.decode_rsa_oaep(t,e,r)}};else{if(-1===["RAW","NONE","NULL",null].indexOf(t))throw new Error('Unsupported encryption scheme: "'+t+'".');t={decode:function(e){return e}}}return t.decode(n,l,!1)},sign:function(e,t){var r=!1;"string"==typeof t&&(t=t.toUpperCase()),void 0===t||"RSASSA-PKCS1-V1_5"===t?(t={encode:d},r=1):"NONE"!==t&&"NULL"!==t&&null!==t||(t={encode:function(){return e}},r=1);var a=t.encode(e,l.n.bitLength());return c.rsa.encrypt(a,l,r)}};return l},c.wrapRsaPrivateKey=function(e){return s.create(s.Class.UNIVERSAL,s.Type.SEQUENCE,!0,[s.create(s.Class.UNIVERSAL,s.Type.INTEGER,!1,s.integerToDer(0).getBytes()),s.create(s.Class.UNIVERSAL,s.Type.SEQUENCE,!0,[s.create(s.Class.UNIVERSAL,s.Type.OID,!1,s.oidToDer(c.oids.rsaEncryption).getBytes()),s.create(s.Class.UNIVERSAL,s.Type.NULL,!1,"")]),s.create(s.Class.UNIVERSAL,s.Type.OCTETSTRING,!1,s.toDer(e).getBytes())])},c.privateKeyFromAsn1=function(e){var t,r,i,o,u,f,h,d,y={},g=[];if(s.validate(e,l,y,g)&&(e=s.fromDer(a.util.createBuffer(y.privateKey))),y={},g=[],!s.validate(e,p,y,g)){var m=new Error("Cannot read private key. ASN.1 object does not contain an RSAPrivateKey.");throw m.errors=g,m}return t=a.util.createBuffer(y.privateKeyModulus).toHex(),r=a.util.createBuffer(y.privateKeyPublicExponent).toHex(),i=a.util.createBuffer(y.privateKeyPrivateExponent).toHex(),o=a.util.createBuffer(y.privateKeyPrime1).toHex(),u=a.util.createBuffer(y.privateKeyPrime2).toHex(),f=a.util.createBuffer(y.privateKeyExponent1).toHex(),h=a.util.createBuffer(y.privateKeyExponent2).toHex(),d=a.util.createBuffer(y.privateKeyCoefficient).toHex(),c.setRsaPrivateKey(new n(t,16),new n(r,16),new n(i,16),new n(o,16),new n(u,16),new n(f,16),new n(h,16),new n(d,16))},c.privateKeyToAsn1=c.privateKeyToRSAPrivateKey=function(e){return s.create(s.Class.UNIVERSAL,s.Type.SEQUENCE,!0,[s.create(s.Class.UNIVERSAL,s.Type.INTEGER,!1,s.integerToDer(0).getBytes()),s.create(s.Class.UNIVERSAL,s.Type.INTEGER,!1,C(e.n)),s.create(s.Class.UNIVERSAL,s.Type.INTEGER,!1,C(e.e)),s.create(s.Class.UNIVERSAL,s.Type.INTEGER,!1,C(e.d)),s.create(s.Class.UNIVERSAL,s.Type.INTEGER,!1,C(e.p)),s.create(s.Class.UNIVERSAL,s.Type.INTEGER,!1,C(e.q)),s.create(s.Class.UNIVERSAL,s.Type.INTEGER,!1,C(e.dP)),s.create(s.Class.UNIVERSAL,s.Type.INTEGER,!1,C(e.dQ)),s.create(s.Class.UNIVERSAL,s.Type.INTEGER,!1,C(e.qInv))])},c.publicKeyFromAsn1=function(e){var t={},r=[];if(s.validate(e,h,t,r)){var i,o=s.derToOid(t.publicKeyOid);if(o!==c.oids.rsaEncryption)throw(i=new Error("Cannot read public key. Unknown OID.")).oid=o,i;e=t.rsaPublicKey}if(r=[],!s.validate(e,f,t,r))throw(i=new Error("Cannot read public key. ASN.1 object does not contain an RSAPublicKey.")).errors=r,i;var u=a.util.createBuffer(t.publicKeyModulus).toHex(),l=a.util.createBuffer(t.publicKeyExponent).toHex();return c.setRsaPublicKey(new n(u,16),new n(l,16))},c.publicKeyToAsn1=c.publicKeyToSubjectPublicKeyInfo=function(e){return s.create(s.Class.UNIVERSAL,s.Type.SEQUENCE,!0,[s.create(s.Class.UNIVERSAL,s.Type.SEQUENCE,!0,[s.create(s.Class.UNIVERSAL,s.Type.OID,!1,s.oidToDer(c.oids.rsaEncryption).getBytes()),s.create(s.Class.UNIVERSAL,s.Type.NULL,!1,"")]),s.create(s.Class.UNIVERSAL,s.Type.BITSTRING,!1,[c.publicKeyToRSAPublicKey(e)])])},c.publicKeyToRSAPublicKey=function(e){return s.create(s.Class.UNIVERSAL,s.Type.SEQUENCE,!0,[s.create(s.Class.UNIVERSAL,s.Type.INTEGER,!1,C(e.n)),s.create(s.Class.UNIVERSAL,s.Type.INTEGER,!1,C(e.e))])}},function(e,t,r){var a,n=r(0);e.exports=n.jsbn=n.jsbn||{};function i(e,t,r){this.data=[],null!=e&&("number"==typeof e?this.fromNumber(e,t,r):null==t&&"string"!=typeof e?this.fromString(e,256):this.fromString(e,t))}function s(){return new i(null)}function o(e,t,r,a,n,i){for(var s=16383&t,o=t>>14;--i>=0;){var c=16383&this.data[e],u=this.data[e++]>>14,l=o*c+u*s;n=((c=s*c+((16383&l)<<14)+r.data[a]+n)>>28)+(l>>14)+o*u,r.data[a++]=268435455&c}return n}n.jsbn.BigInteger=i,"undefined"==typeof navigator?(i.prototype.am=o,a=28):"Microsoft Internet Explorer"==navigator.appName?(i.prototype.am=function(e,t,r,a,n,i){for(var s=32767&t,o=t>>15;--i>=0;){var c=32767&this.data[e],u=this.data[e++]>>15,l=o*c+u*s;n=((c=s*c+((32767&l)<<15)+r.data[a]+(1073741823&n))>>>30)+(l>>>15)+o*u+(n>>>30),r.data[a++]=1073741823&c}return n},a=30):"Netscape"!=navigator.appName?(i.prototype.am=function(e,t,r,a,n,i){for(;--i>=0;){var s=t*this.data[e++]+r.data[a]+n;n=Math.floor(s/67108864),r.data[a++]=67108863&s}return n},a=26):(i.prototype.am=o,a=28),i.prototype.DB=a,i.prototype.DM=(1<<a)-1,i.prototype.DV=1<<a;i.prototype.FV=Math.pow(2,52),i.prototype.F1=52-a,i.prototype.F2=2*a-52;var c,u,l=new Array;for(c="0".charCodeAt(0),u=0;u<=9;++u)l[c++]=u;for(c="a".charCodeAt(0),u=10;u<36;++u)l[c++]=u;for(c="A".charCodeAt(0),u=10;u<36;++u)l[c++]=u;function p(e){return"0123456789abcdefghijklmnopqrstuvwxyz".charAt(e)}function f(e,t){var r=l[e.charCodeAt(t)];return null==r?-1:r}function h(e){var t=s();return t.fromInt(e),t}function d(e){var t,r=1;return 0!=(t=e>>>16)&&(e=t,r+=16),0!=(t=e>>8)&&(e=t,r+=8),0!=(t=e>>4)&&(e=t,r+=4),0!=(t=e>>2)&&(e=t,r+=2),0!=(t=e>>1)&&(e=t,r+=1),r}function y(e){this.m=e}function g(e){this.m=e,this.mp=e.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<e.DB-15)-1,this.mt2=2*e.t}function m(e,t){return e&t}function v(e,t){return e|t}function C(e,t){return e^t}function E(e,t){return e&~t}function S(e){if(0==e)return-1;var t=0;return 0==(65535&e)&&(e>>=16,t+=16),0==(255&e)&&(e>>=8,t+=8),0==(15&e)&&(e>>=4,t+=4),0==(3&e)&&(e>>=2,t+=2),0==(1&e)&&++t,t}function T(e){for(var t=0;0!=e;)e&=e-1,++t;return t}function I(){}function b(e){return e}function A(e){this.r2=s(),this.q3=s(),i.ONE.dlShiftTo(2*e.t,this.r2),this.mu=this.r2.divide(e),this.m=e}y.prototype.convert=function(e){return e.s<0||e.compareTo(this.m)>=0?e.mod(this.m):e},y.prototype.revert=function(e){return e},y.prototype.reduce=function(e){e.divRemTo(this.m,null,e)},y.prototype.mulTo=function(e,t,r){e.multiplyTo(t,r),this.reduce(r)},y.prototype.sqrTo=function(e,t){e.squareTo(t),this.reduce(t)},g.prototype.convert=function(e){var t=s();return e.abs().dlShiftTo(this.m.t,t),t.divRemTo(this.m,null,t),e.s<0&&t.compareTo(i.ZERO)>0&&this.m.subTo(t,t),t},g.prototype.revert=function(e){var t=s();return e.copyTo(t),this.reduce(t),t},g.prototype.reduce=function(e){for(;e.t<=this.mt2;)e.data[e.t++]=0;for(var t=0;t<this.m.t;++t){var r=32767&e.data[t],a=r*this.mpl+((r*this.mph+(e.data[t]>>15)*this.mpl&this.um)<<15)&e.DM;for(r=t+this.m.t,e.data[r]+=this.m.am(0,a,e,t,0,this.m.t);e.data[r]>=e.DV;)e.data[r]-=e.DV,e.data[++r]++}e.clamp(),e.drShiftTo(this.m.t,e),e.compareTo(this.m)>=0&&e.subTo(this.m,e)},g.prototype.mulTo=function(e,t,r){e.multiplyTo(t,r),this.reduce(r)},g.prototype.sqrTo=function(e,t){e.squareTo(t),this.reduce(t)},i.prototype.copyTo=function(e){for(var t=this.t-1;t>=0;--t)e.data[t]=this.data[t];e.t=this.t,e.s=this.s},i.prototype.fromInt=function(e){this.t=1,this.s=e<0?-1:0,e>0?this.data[0]=e:e<-1?this.data[0]=e+this.DV:this.t=0},i.prototype.fromString=function(e,t){var r;if(16==t)r=4;else if(8==t)r=3;else if(256==t)r=8;else if(2==t)r=1;else if(32==t)r=5;else{if(4!=t)return void this.fromRadix(e,t);r=2}this.t=0,this.s=0;for(var a=e.length,n=!1,s=0;--a>=0;){var o=8==r?255&e[a]:f(e,a);o<0?"-"==e.charAt(a)&&(n=!0):(n=!1,0==s?this.data[this.t++]=o:s+r>this.DB?(this.data[this.t-1]|=(o&(1<<this.DB-s)-1)<<s,this.data[this.t++]=o>>this.DB-s):this.data[this.t-1]|=o<<s,(s+=r)>=this.DB&&(s-=this.DB))}8==r&&0!=(128&e[0])&&(this.s=-1,s>0&&(this.data[this.t-1]|=(1<<this.DB-s)-1<<s)),this.clamp(),n&&i.ZERO.subTo(this,this)},i.prototype.clamp=function(){for(var e=this.s&this.DM;this.t>0&&this.data[this.t-1]==e;)--this.t},i.prototype.dlShiftTo=function(e,t){var r;for(r=this.t-1;r>=0;--r)t.data[r+e]=this.data[r];for(r=e-1;r>=0;--r)t.data[r]=0;t.t=this.t+e,t.s=this.s},i.prototype.drShiftTo=function(e,t){for(var r=e;r<this.t;++r)t.data[r-e]=this.data[r];t.t=Math.max(this.t-e,0),t.s=this.s},i.prototype.lShiftTo=function(e,t){var r,a=e%this.DB,n=this.DB-a,i=(1<<n)-1,s=Math.floor(e/this.DB),o=this.s<<a&this.DM;for(r=this.t-1;r>=0;--r)t.data[r+s+1]=this.data[r]>>n|o,o=(this.data[r]&i)<<a;for(r=s-1;r>=0;--r)t.data[r]=0;t.data[s]=o,t.t=this.t+s+1,t.s=this.s,t.clamp()},i.prototype.rShiftTo=function(e,t){t.s=this.s;var r=Math.floor(e/this.DB);if(r>=this.t)t.t=0;else{var a=e%this.DB,n=this.DB-a,i=(1<<a)-1;t.data[0]=this.data[r]>>a;for(var s=r+1;s<this.t;++s)t.data[s-r-1]|=(this.data[s]&i)<<n,t.data[s-r]=this.data[s]>>a;a>0&&(t.data[this.t-r-1]|=(this.s&i)<<n),t.t=this.t-r,t.clamp()}},i.prototype.subTo=function(e,t){for(var r=0,a=0,n=Math.min(e.t,this.t);r<n;)a+=this.data[r]-e.data[r],t.data[r++]=a&this.DM,a>>=this.DB;if(e.t<this.t){for(a-=e.s;r<this.t;)a+=this.data[r],t.data[r++]=a&this.DM,a>>=this.DB;a+=this.s}else{for(a+=this.s;r<e.t;)a-=e.data[r],t.data[r++]=a&this.DM,a>>=this.DB;a-=e.s}t.s=a<0?-1:0,a<-1?t.data[r++]=this.DV+a:a>0&&(t.data[r++]=a),t.t=r,t.clamp()},i.prototype.multiplyTo=function(e,t){var r=this.abs(),a=e.abs(),n=r.t;for(t.t=n+a.t;--n>=0;)t.data[n]=0;for(n=0;n<a.t;++n)t.data[n+r.t]=r.am(0,a.data[n],t,n,0,r.t);t.s=0,t.clamp(),this.s!=e.s&&i.ZERO.subTo(t,t)},i.prototype.squareTo=function(e){for(var t=this.abs(),r=e.t=2*t.t;--r>=0;)e.data[r]=0;for(r=0;r<t.t-1;++r){var a=t.am(r,t.data[r],e,2*r,0,1);(e.data[r+t.t]+=t.am(r+1,2*t.data[r],e,2*r+1,a,t.t-r-1))>=t.DV&&(e.data[r+t.t]-=t.DV,e.data[r+t.t+1]=1)}e.t>0&&(e.data[e.t-1]+=t.am(r,t.data[r],e,2*r,0,1)),e.s=0,e.clamp()},i.prototype.divRemTo=function(e,t,r){var a=e.abs();if(!(a.t<=0)){var n=this.abs();if(n.t<a.t)return null!=t&&t.fromInt(0),void(null!=r&&this.copyTo(r));null==r&&(r=s());var o=s(),c=this.s,u=e.s,l=this.DB-d(a.data[a.t-1]);l>0?(a.lShiftTo(l,o),n.lShiftTo(l,r)):(a.copyTo(o),n.copyTo(r));var p=o.t,f=o.data[p-1];if(0!=f){var h=f*(1<<this.F1)+(p>1?o.data[p-2]>>this.F2:0),y=this.FV/h,g=(1<<this.F1)/h,m=1<<this.F2,v=r.t,C=v-p,E=null==t?s():t;for(o.dlShiftTo(C,E),r.compareTo(E)>=0&&(r.data[r.t++]=1,r.subTo(E,r)),i.ONE.dlShiftTo(p,E),E.subTo(o,o);o.t<p;)o.data[o.t++]=0;for(;--C>=0;){var S=r.data[--v]==f?this.DM:Math.floor(r.data[v]*y+(r.data[v-1]+m)*g);if((r.data[v]+=o.am(0,S,r,C,0,p))<S)for(o.dlShiftTo(C,E),r.subTo(E,r);r.data[v]<--S;)r.subTo(E,r)}null!=t&&(r.drShiftTo(p,t),c!=u&&i.ZERO.subTo(t,t)),r.t=p,r.clamp(),l>0&&r.rShiftTo(l,r),c<0&&i.ZERO.subTo(r,r)}}},i.prototype.invDigit=function(){if(this.t<1)return 0;var e=this.data[0];if(0==(1&e))return 0;var t=3&e;return(t=(t=(t=(t=t*(2-(15&e)*t)&15)*(2-(255&e)*t)&255)*(2-((65535&e)*t&65535))&65535)*(2-e*t%this.DV)%this.DV)>0?this.DV-t:-t},i.prototype.isEven=function(){return 0==(this.t>0?1&this.data[0]:this.s)},i.prototype.exp=function(e,t){if(e>4294967295||e<1)return i.ONE;var r=s(),a=s(),n=t.convert(this),o=d(e)-1;for(n.copyTo(r);--o>=0;)if(t.sqrTo(r,a),(e&1<<o)>0)t.mulTo(a,n,r);else{var c=r;r=a,a=c}return t.revert(r)},i.prototype.toString=function(e){if(this.s<0)return"-"+this.negate().toString(e);var t;if(16==e)t=4;else if(8==e)t=3;else if(2==e)t=1;else if(32==e)t=5;else{if(4!=e)return this.toRadix(e);t=2}var r,a=(1<<t)-1,n=!1,i="",s=this.t,o=this.DB-s*this.DB%t;if(s-- >0)for(o<this.DB&&(r=this.data[s]>>o)>0&&(n=!0,i=p(r));s>=0;)o<t?(r=(this.data[s]&(1<<o)-1)<<t-o,r|=this.data[--s]>>(o+=this.DB-t)):(r=this.data[s]>>(o-=t)&a,o<=0&&(o+=this.DB,--s)),r>0&&(n=!0),n&&(i+=p(r));return n?i:"0"},i.prototype.negate=function(){var e=s();return i.ZERO.subTo(this,e),e},i.prototype.abs=function(){return this.s<0?this.negate():this},i.prototype.compareTo=function(e){var t=this.s-e.s;if(0!=t)return t;var r=this.t;if(0!=(t=r-e.t))return this.s<0?-t:t;for(;--r>=0;)if(0!=(t=this.data[r]-e.data[r]))return t;return 0},i.prototype.bitLength=function(){return this.t<=0?0:this.DB*(this.t-1)+d(this.data[this.t-1]^this.s&this.DM)},i.prototype.mod=function(e){var t=s();return this.abs().divRemTo(e,null,t),this.s<0&&t.compareTo(i.ZERO)>0&&e.subTo(t,t),t},i.prototype.modPowInt=function(e,t){var r;return r=e<256||t.isEven()?new y(t):new g(t),this.exp(e,r)},i.ZERO=h(0),i.ONE=h(1),I.prototype.convert=b,I.prototype.revert=b,I.prototype.mulTo=function(e,t,r){e.multiplyTo(t,r)},I.prototype.sqrTo=function(e,t){e.squareTo(t)},A.prototype.convert=function(e){if(e.s<0||e.t>2*this.m.t)return e.mod(this.m);if(e.compareTo(this.m)<0)return e;var t=s();return e.copyTo(t),this.reduce(t),t},A.prototype.revert=function(e){return e},A.prototype.reduce=function(e){for(e.drShiftTo(this.m.t-1,this.r2),e.t>this.m.t+1&&(e.t=this.m.t+1,e.clamp()),this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3),this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);e.compareTo(this.r2)<0;)e.dAddOffset(1,this.m.t+1);for(e.subTo(this.r2,e);e.compareTo(this.m)>=0;)e.subTo(this.m,e)},A.prototype.mulTo=function(e,t,r){e.multiplyTo(t,r),this.reduce(r)},A.prototype.sqrTo=function(e,t){e.squareTo(t),this.reduce(t)};var B=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509],N=(1<<26)/B[B.length-1];i.prototype.chunkSize=function(e){return Math.floor(Math.LN2*this.DB/Math.log(e))},i.prototype.toRadix=function(e){if(null==e&&(e=10),0==this.signum()||e<2||e>36)return"0";var t=this.chunkSize(e),r=Math.pow(e,t),a=h(r),n=s(),i=s(),o="";for(this.divRemTo(a,n,i);n.signum()>0;)o=(r+i.intValue()).toString(e).substr(1)+o,n.divRemTo(a,n,i);return i.intValue().toString(e)+o},i.prototype.fromRadix=function(e,t){this.fromInt(0),null==t&&(t=10);for(var r=this.chunkSize(t),a=Math.pow(t,r),n=!1,s=0,o=0,c=0;c<e.length;++c){var u=f(e,c);u<0?"-"==e.charAt(c)&&0==this.signum()&&(n=!0):(o=t*o+u,++s>=r&&(this.dMultiply(a),this.dAddOffset(o,0),s=0,o=0))}s>0&&(this.dMultiply(Math.pow(t,s)),this.dAddOffset(o,0)),n&&i.ZERO.subTo(this,this)},i.prototype.fromNumber=function(e,t,r){if("number"==typeof t)if(e<2)this.fromInt(1);else for(this.fromNumber(e,r),this.testBit(e-1)||this.bitwiseTo(i.ONE.shiftLeft(e-1),v,this),this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(t);)this.dAddOffset(2,0),this.bitLength()>e&&this.subTo(i.ONE.shiftLeft(e-1),this);else{var a=new Array,n=7&e;a.length=1+(e>>3),t.nextBytes(a),n>0?a[0]&=(1<<n)-1:a[0]=0,this.fromString(a,256)}},i.prototype.bitwiseTo=function(e,t,r){var a,n,i=Math.min(e.t,this.t);for(a=0;a<i;++a)r.data[a]=t(this.data[a],e.data[a]);if(e.t<this.t){for(n=e.s&this.DM,a=i;a<this.t;++a)r.data[a]=t(this.data[a],n);r.t=this.t}else{for(n=this.s&this.DM,a=i;a<e.t;++a)r.data[a]=t(n,e.data[a]);r.t=e.t}r.s=t(this.s,e.s),r.clamp()},i.prototype.changeBit=function(e,t){var r=i.ONE.shiftLeft(e);return this.bitwiseTo(r,t,r),r},i.prototype.addTo=function(e,t){for(var r=0,a=0,n=Math.min(e.t,this.t);r<n;)a+=this.data[r]+e.data[r],t.data[r++]=a&this.DM,a>>=this.DB;if(e.t<this.t){for(a+=e.s;r<this.t;)a+=this.data[r],t.data[r++]=a&this.DM,a>>=this.DB;a+=this.s}else{for(a+=this.s;r<e.t;)a+=e.data[r],t.data[r++]=a&this.DM,a>>=this.DB;a+=e.s}t.s=a<0?-1:0,a>0?t.data[r++]=a:a<-1&&(t.data[r++]=this.DV+a),t.t=r,t.clamp()},i.prototype.dMultiply=function(e){this.data[this.t]=this.am(0,e-1,this,0,0,this.t),++this.t,this.clamp()},i.prototype.dAddOffset=function(e,t){if(0!=e){for(;this.t<=t;)this.data[this.t++]=0;for(this.data[t]+=e;this.data[t]>=this.DV;)this.data[t]-=this.DV,++t>=this.t&&(this.data[this.t++]=0),++this.data[t]}},i.prototype.multiplyLowerTo=function(e,t,r){var a,n=Math.min(this.t+e.t,t);for(r.s=0,r.t=n;n>0;)r.data[--n]=0;for(a=r.t-this.t;n<a;++n)r.data[n+this.t]=this.am(0,e.data[n],r,n,0,this.t);for(a=Math.min(e.t,t);n<a;++n)this.am(0,e.data[n],r,n,0,t-n);r.clamp()},i.prototype.multiplyUpperTo=function(e,t,r){--t;var a=r.t=this.t+e.t-t;for(r.s=0;--a>=0;)r.data[a]=0;for(a=Math.max(t-this.t,0);a<e.t;++a)r.data[this.t+a-t]=this.am(t-a,e.data[a],r,0,0,this.t+a-t);r.clamp(),r.drShiftTo(1,r)},i.prototype.modInt=function(e){if(e<=0)return 0;var t=this.DV%e,r=this.s<0?e-1:0;if(this.t>0)if(0==t)r=this.data[0]%e;else for(var a=this.t-1;a>=0;--a)r=(t*r+this.data[a])%e;return r},i.prototype.millerRabin=function(e){var t=this.subtract(i.ONE),r=t.getLowestSetBit();if(r<=0)return!1;for(var a,n=t.shiftRight(r),s={nextBytes:function(e){for(var t=0;t<e.length;++t)e[t]=Math.floor(256*Math.random())}},o=0;o<e;++o){do{a=new i(this.bitLength(),s)}while(a.compareTo(i.ONE)<=0||a.compareTo(t)>=0);var c=a.modPow(n,this);if(0!=c.compareTo(i.ONE)&&0!=c.compareTo(t)){for(var u=1;u++<r&&0!=c.compareTo(t);)if(0==(c=c.modPowInt(2,this)).compareTo(i.ONE))return!1;if(0!=c.compareTo(t))return!1}}return!0},i.prototype.clone=function(){var e=s();return this.copyTo(e),e},i.prototype.intValue=function(){if(this.s<0){if(1==this.t)return this.data[0]-this.DV;if(0==this.t)return-1}else{if(1==this.t)return this.data[0];if(0==this.t)return 0}return(this.data[1]&(1<<32-this.DB)-1)<<this.DB|this.data[0]},i.prototype.byteValue=function(){return 0==this.t?this.s:this.data[0]<<24>>24},i.prototype.shortValue=function(){return 0==this.t?this.s:this.data[0]<<16>>16},i.prototype.signum=function(){return this.s<0?-1:this.t<=0||1==this.t&&this.data[0]<=0?0:1},i.prototype.toByteArray=function(){var e=this.t,t=new Array;t[0]=this.s;var r,a=this.DB-e*this.DB%8,n=0;if(e-- >0)for(a<this.DB&&(r=this.data[e]>>a)!=(this.s&this.DM)>>a&&(t[n++]=r|this.s<<this.DB-a);e>=0;)a<8?(r=(this.data[e]&(1<<a)-1)<<8-a,r|=this.data[--e]>>(a+=this.DB-8)):(r=this.data[e]>>(a-=8)&255,a<=0&&(a+=this.DB,--e)),0!=(128&r)&&(r|=-256),0==n&&(128&this.s)!=(128&r)&&++n,(n>0||r!=this.s)&&(t[n++]=r);return t},i.prototype.equals=function(e){return 0==this.compareTo(e)},i.prototype.min=function(e){return this.compareTo(e)<0?this:e},i.prototype.max=function(e){return this.compareTo(e)>0?this:e},i.prototype.and=function(e){var t=s();return this.bitwiseTo(e,m,t),t},i.prototype.or=function(e){var t=s();return this.bitwiseTo(e,v,t),t},i.prototype.xor=function(e){var t=s();return this.bitwiseTo(e,C,t),t},i.prototype.andNot=function(e){var t=s();return this.bitwiseTo(e,E,t),t},i.prototype.not=function(){for(var e=s(),t=0;t<this.t;++t)e.data[t]=this.DM&~this.data[t];return e.t=this.t,e.s=~this.s,e},i.prototype.shiftLeft=function(e){var t=s();return e<0?this.rShiftTo(-e,t):this.lShiftTo(e,t),t},i.prototype.shiftRight=function(e){var t=s();return e<0?this.lShiftTo(-e,t):this.rShiftTo(e,t),t},i.prototype.getLowestSetBit=function(){for(var e=0;e<this.t;++e)if(0!=this.data[e])return e*this.DB+S(this.data[e]);return this.s<0?this.t*this.DB:-1},i.prototype.bitCount=function(){for(var e=0,t=this.s&this.DM,r=0;r<this.t;++r)e+=T(this.data[r]^t);return e},i.prototype.testBit=function(e){var t=Math.floor(e/this.DB);return t>=this.t?0!=this.s:0!=(this.data[t]&1<<e%this.DB)},i.prototype.setBit=function(e){return this.changeBit(e,v)},i.prototype.clearBit=function(e){return this.changeBit(e,E)},i.prototype.flipBit=function(e){return this.changeBit(e,C)},i.prototype.add=function(e){var t=s();return this.addTo(e,t),t},i.prototype.subtract=function(e){var t=s();return this.subTo(e,t),t},i.prototype.multiply=function(e){var t=s();return this.multiplyTo(e,t),t},i.prototype.divide=function(e){var t=s();return this.divRemTo(e,t,null),t},i.prototype.remainder=function(e){var t=s();return this.divRemTo(e,null,t),t},i.prototype.divideAndRemainder=function(e){var t=s(),r=s();return this.divRemTo(e,t,r),new Array(t,r)},i.prototype.modPow=function(e,t){var r,a,n=e.bitLength(),i=h(1);if(n<=0)return i;r=n<18?1:n<48?3:n<144?4:n<768?5:6,a=n<8?new y(t):t.isEven()?new A(t):new g(t);var o=new Array,c=3,u=r-1,l=(1<<r)-1;if(o[1]=a.convert(this),r>1){var p=s();for(a.sqrTo(o[1],p);c<=l;)o[c]=s(),a.mulTo(p,o[c-2],o[c]),c+=2}var f,m,v=e.t-1,C=!0,E=s();for(n=d(e.data[v])-1;v>=0;){for(n>=u?f=e.data[v]>>n-u&l:(f=(e.data[v]&(1<<n+1)-1)<<u-n,v>0&&(f|=e.data[v-1]>>this.DB+n-u)),c=r;0==(1&f);)f>>=1,--c;if((n-=c)<0&&(n+=this.DB,--v),C)o[f].copyTo(i),C=!1;else{for(;c>1;)a.sqrTo(i,E),a.sqrTo(E,i),c-=2;c>0?a.sqrTo(i,E):(m=i,i=E,E=m),a.mulTo(E,o[f],i)}for(;v>=0&&0==(e.data[v]&1<<n);)a.sqrTo(i,E),m=i,i=E,E=m,--n<0&&(n=this.DB-1,--v)}return a.revert(i)},i.prototype.modInverse=function(e){var t=e.isEven();if(this.isEven()&&t||0==e.signum())return i.ZERO;for(var r=e.clone(),a=this.clone(),n=h(1),s=h(0),o=h(0),c=h(1);0!=r.signum();){for(;r.isEven();)r.rShiftTo(1,r),t?(n.isEven()&&s.isEven()||(n.addTo(this,n),s.subTo(e,s)),n.rShiftTo(1,n)):s.isEven()||s.subTo(e,s),s.rShiftTo(1,s);for(;a.isEven();)a.rShiftTo(1,a),t?(o.isEven()&&c.isEven()||(o.addTo(this,o),c.subTo(e,c)),o.rShiftTo(1,o)):c.isEven()||c.subTo(e,c),c.rShiftTo(1,c);r.compareTo(a)>=0?(r.subTo(a,r),t&&n.subTo(o,n),s.subTo(c,s)):(a.subTo(r,a),t&&o.subTo(n,o),c.subTo(s,c))}return 0!=a.compareTo(i.ONE)?i.ZERO:c.compareTo(e)>=0?c.subtract(e):c.signum()<0?(c.addTo(e,c),c.signum()<0?c.add(e):c):c},i.prototype.pow=function(e){return this.exp(e,new I)},i.prototype.gcd=function(e){var t=this.s<0?this.negate():this.clone(),r=e.s<0?e.negate():e.clone();if(t.compareTo(r)<0){var a=t;t=r,r=a}var n=t.getLowestSetBit(),i=r.getLowestSetBit();if(i<0)return t;for(n<i&&(i=n),i>0&&(t.rShiftTo(i,t),r.rShiftTo(i,r));t.signum()>0;)(n=t.getLowestSetBit())>0&&t.rShiftTo(n,t),(n=r.getLowestSetBit())>0&&r.rShiftTo(n,r),t.compareTo(r)>=0?(t.subTo(r,t),t.rShiftTo(1,t)):(r.subTo(t,r),r.rShiftTo(1,r));return i>0&&r.lShiftTo(i,r),r},i.prototype.isProbablePrime=function(e){var t,r=this.abs();if(1==r.t&&r.data[0]<=B[B.length-1]){for(t=0;t<B.length;++t)if(r.data[0]==B[t])return!0;return!1}if(r.isEven())return!1;for(t=1;t<B.length;){for(var a=B[t],n=t+1;n<B.length&&a<N;)a*=B[n++];for(a=r.modInt(a);t<n;)if(a%B[t++]==0)return!1}return r.millerRabin(e)}},function(e,t,r){var a=r(0);r(1),e.exports=a.cipher=a.cipher||{},a.cipher.algorithms=a.cipher.algorithms||{},a.cipher.createCipher=function(e,t){var r=e;if("string"==typeof r&&(r=a.cipher.getAlgorithm(r))&&(r=r()),!r)throw new Error("Unsupported algorithm: "+e);return new a.cipher.BlockCipher({algorithm:r,key:t,decrypt:!1})},a.cipher.createDecipher=function(e,t){var r=e;if("string"==typeof r&&(r=a.cipher.getAlgorithm(r))&&(r=r()),!r)throw new Error("Unsupported algorithm: "+e);return new a.cipher.BlockCipher({algorithm:r,key:t,decrypt:!0})},a.cipher.registerAlgorithm=function(e,t){e=e.toUpperCase(),a.cipher.algorithms[e]=t},a.cipher.getAlgorithm=function(e){return(e=e.toUpperCase())in a.cipher.algorithms?a.cipher.algorithms[e]:null};var n=a.cipher.BlockCipher=function(e){this.algorithm=e.algorithm,this.mode=this.algorithm.mode,this.blockSize=this.mode.blockSize,this._finish=!1,this._input=null,this.output=null,this._op=e.decrypt?this.mode.decrypt:this.mode.encrypt,this._decrypt=e.decrypt,this.algorithm.initialize(e)};n.prototype.start=function(e){e=e||{};var t={};for(var r in e)t[r]=e[r];t.decrypt=this._decrypt,this._finish=!1,this._input=a.util.createBuffer(),this.output=e.output||a.util.createBuffer(),this.mode.start(t)},n.prototype.update=function(e){for(e&&this._input.putBuffer(e);!this._op.call(this.mode,this._input,this.output,this._finish)&&!this._finish;);this._input.compact()},n.prototype.finish=function(e){!e||"ECB"!==this.mode.name&&"CBC"!==this.mode.name||(this.mode.pad=function(t){return e(this.blockSize,t,!1)},this.mode.unpad=function(t){return e(this.blockSize,t,!0)});var t={};return t.decrypt=this._decrypt,t.overflow=this._input.length()%this.blockSize,!(!this._decrypt&&this.mode.pad&&!this.mode.pad(this._input,t))&&(this._finish=!0,this.update(),!(this._decrypt&&this.mode.unpad&&!this.mode.unpad(this.output,t))&&!(this.mode.afterFinish&&!this.mode.afterFinish(this.output,t)))}},function(e,t,r){var a=r(0);r(4),r(1);var n=e.exports=a.md5=a.md5||{};a.md.md5=a.md.algorithms.md5=n,n.create=function(){u||function(){i=String.fromCharCode(128),i+=a.util.fillString(String.fromCharCode(0),64),s=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,6,11,0,5,10,15,4,9,14,3,8,13,2,7,12,5,8,11,14,1,4,7,10,13,0,3,6,9,12,15,2,0,7,14,5,12,3,10,1,8,15,6,13,4,11,2,9],o=[7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21],c=new Array(64);for(var e=0;e<64;++e)c[e]=Math.floor(4294967296*Math.abs(Math.sin(e+1)));u=!0}();var e=null,t=a.util.createBuffer(),r=new Array(16),n={algorithm:"md5",blockLength:64,digestLength:16,messageLength:0,fullMessageLength:null,messageLengthSize:8,start:function(){n.messageLength=0,n.fullMessageLength=n.messageLength64=[];for(var r=n.messageLengthSize/4,i=0;i<r;++i)n.fullMessageLength.push(0);return t=a.util.createBuffer(),e={h0:1732584193,h1:4023233417,h2:2562383102,h3:271733878},n}};return n.start(),n.update=function(i,s){"utf8"===s&&(i=a.util.encodeUtf8(i));var o=i.length;n.messageLength+=o,o=[o/4294967296>>>0,o>>>0];for(var c=n.fullMessageLength.length-1;c>=0;--c)n.fullMessageLength[c]+=o[1],o[1]=o[0]+(n.fullMessageLength[c]/4294967296>>>0),n.fullMessageLength[c]=n.fullMessageLength[c]>>>0,o[0]=o[1]/4294967296>>>0;return t.putBytes(i),l(e,r,t),(t.read>2048||0===t.length())&&t.compact(),n},n.digest=function(){var s=a.util.createBuffer();s.putBytes(t.bytes());var o=n.fullMessageLength[n.fullMessageLength.length-1]+n.messageLengthSize&n.blockLength-1;s.putBytes(i.substr(0,n.blockLength-o));for(var c,u=0,p=n.fullMessageLength.length-1;p>=0;--p)u=(c=8*n.fullMessageLength[p]+u)/4294967296>>>0,s.putInt32Le(c>>>0);var f={h0:e.h0,h1:e.h1,h2:e.h2,h3:e.h3};l(f,r,s);var h=a.util.createBuffer();return h.putInt32Le(f.h0),h.putInt32Le(f.h1),h.putInt32Le(f.h2),h.putInt32Le(f.h3),h},n};var i=null,s=null,o=null,c=null,u=!1;function l(e,t,r){for(var a,n,i,u,l,p,f,h=r.length();h>=64;){for(n=e.h0,i=e.h1,u=e.h2,l=e.h3,f=0;f<16;++f)t[f]=r.getInt32Le(),a=n+(l^i&(u^l))+c[f]+t[f],n=l,l=u,u=i,i+=a<<(p=o[f])|a>>>32-p;for(;f<32;++f)a=n+(u^l&(i^u))+c[f]+t[s[f]],n=l,l=u,u=i,i+=a<<(p=o[f])|a>>>32-p;for(;f<48;++f)a=n+(i^u^l)+c[f]+t[s[f]],n=l,l=u,u=i,i+=a<<(p=o[f])|a>>>32-p;for(;f<64;++f)a=n+(u^(i|~l))+c[f]+t[s[f]],n=l,l=u,u=i,i+=a<<(p=o[f])|a>>>32-p;e.h0=e.h0+n|0,e.h1=e.h1+i|0,e.h2=e.h2+u|0,e.h3=e.h3+l|0,h-=64}}},function(e,t,r){var a=r(0);r(8),r(4),r(1);var n,i=a.pkcs5=a.pkcs5||{};a.util.isNodejs&&!a.options.usePureJavaScript&&(n=r(16)),e.exports=a.pbkdf2=i.pbkdf2=function(e,t,r,i,s,o){if("function"==typeof s&&(o=s,s=null),a.util.isNodejs&&!a.options.usePureJavaScript&&n.pbkdf2&&(null===s||"object"!=typeof s)&&(n.pbkdf2Sync.length>4||!s||"sha1"===s))return"string"!=typeof s&&(s="sha1"),e=Buffer.from(e,"binary"),t=Buffer.from(t,"binary"),o?4===n.pbkdf2Sync.length?n.pbkdf2(e,t,r,i,(function(e,t){if(e)return o(e);o(null,t.toString("binary"))})):n.pbkdf2(e,t,r,i,s,(function(e,t){if(e)return o(e);o(null,t.toString("binary"))})):4===n.pbkdf2Sync.length?n.pbkdf2Sync(e,t,r,i).toString("binary"):n.pbkdf2Sync(e,t,r,i,s).toString("binary");if(null==s&&(s="sha1"),"string"==typeof s){if(!(s in a.md.algorithms))throw new Error("Unknown hash algorithm: "+s);s=a.md[s].create()}var c=s.digestLength;if(i>4294967295*c){var u=new Error("Derived key is too long.");if(o)return o(u);throw u}var l=Math.ceil(i/c),p=i-(l-1)*c,f=a.hmac.create();f.start(s,e);var h,d,y,g="";if(!o){for(var m=1;m<=l;++m){f.start(null,null),f.update(t),f.update(a.util.int32ToBytes(m)),h=y=f.digest().getBytes();for(var v=2;v<=r;++v)f.start(null,null),f.update(y),d=f.digest().getBytes(),h=a.util.xorBytes(h,d,c),y=d;g+=m<l?h:h.substr(0,p)}return g}m=1;function C(){if(m>l)return o(null,g);f.start(null,null),f.update(t),f.update(a.util.int32ToBytes(m)),h=y=f.digest().getBytes(),v=2,E()}function E(){if(v<=r)return f.start(null,null),f.update(y),d=f.digest().getBytes(),h=a.util.xorBytes(h,d,c),y=d,++v,a.util.setImmediate(E);g+=m<l?h:h.substr(0,p),++m,C()}C()}},function(e,t){},function(e,t,r){var a=r(0);r(5),r(3),r(10),r(4),r(39),r(6),r(7),r(18),r(11),r(1);var n=a.asn1,i=e.exports=a.pki=a.pki||{},s=i.oids,o={};o.CN=s.commonName,o.commonName="CN",o.C=s.countryName,o.countryName="C",o.L=s.localityName,o.localityName="L",o.ST=s.stateOrProvinceName,o.stateOrProvinceName="ST",o.O=s.organizationName,o.organizationName="O",o.OU=s.organizationalUnitName,o.organizationalUnitName="OU",o.E=s.emailAddress,o.emailAddress="E";var c=a.pki.rsa.publicKeyValidator,u={name:"Certificate",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"Certificate.TBSCertificate",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,captureAsn1:"tbsCertificate",value:[{name:"Certificate.TBSCertificate.version",tagClass:n.Class.CONTEXT_SPECIFIC,type:0,constructed:!0,optional:!0,value:[{name:"Certificate.TBSCertificate.version.integer",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"certVersion"}]},{name:"Certificate.TBSCertificate.serialNumber",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"certSerialNumber"},{name:"Certificate.TBSCertificate.signature",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"Certificate.TBSCertificate.signature.algorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"certinfoSignatureOid"},{name:"Certificate.TBSCertificate.signature.parameters",tagClass:n.Class.UNIVERSAL,optional:!0,captureAsn1:"certinfoSignatureParams"}]},{name:"Certificate.TBSCertificate.issuer",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,captureAsn1:"certIssuer"},{name:"Certificate.TBSCertificate.validity",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"Certificate.TBSCertificate.validity.notBefore (utc)",tagClass:n.Class.UNIVERSAL,type:n.Type.UTCTIME,constructed:!1,optional:!0,capture:"certValidity1UTCTime"},{name:"Certificate.TBSCertificate.validity.notBefore (generalized)",tagClass:n.Class.UNIVERSAL,type:n.Type.GENERALIZEDTIME,constructed:!1,optional:!0,capture:"certValidity2GeneralizedTime"},{name:"Certificate.TBSCertificate.validity.notAfter (utc)",tagClass:n.Class.UNIVERSAL,type:n.Type.UTCTIME,constructed:!1,optional:!0,capture:"certValidity3UTCTime"},{name:"Certificate.TBSCertificate.validity.notAfter (generalized)",tagClass:n.Class.UNIVERSAL,type:n.Type.GENERALIZEDTIME,constructed:!1,optional:!0,capture:"certValidity4GeneralizedTime"}]},{name:"Certificate.TBSCertificate.subject",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,captureAsn1:"certSubject"},c,{name:"Certificate.TBSCertificate.issuerUniqueID",tagClass:n.Class.CONTEXT_SPECIFIC,type:1,constructed:!0,optional:!0,value:[{name:"Certificate.TBSCertificate.issuerUniqueID.id",tagClass:n.Class.UNIVERSAL,type:n.Type.BITSTRING,constructed:!1,captureBitStringValue:"certIssuerUniqueId"}]},{name:"Certificate.TBSCertificate.subjectUniqueID",tagClass:n.Class.CONTEXT_SPECIFIC,type:2,constructed:!0,optional:!0,value:[{name:"Certificate.TBSCertificate.subjectUniqueID.id",tagClass:n.Class.UNIVERSAL,type:n.Type.BITSTRING,constructed:!1,captureBitStringValue:"certSubjectUniqueId"}]},{name:"Certificate.TBSCertificate.extensions",tagClass:n.Class.CONTEXT_SPECIFIC,type:3,constructed:!0,captureAsn1:"certExtensions",optional:!0}]},{name:"Certificate.signatureAlgorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"Certificate.signatureAlgorithm.algorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"certSignatureOid"},{name:"Certificate.TBSCertificate.signature.parameters",tagClass:n.Class.UNIVERSAL,optional:!0,captureAsn1:"certSignatureParams"}]},{name:"Certificate.signatureValue",tagClass:n.Class.UNIVERSAL,type:n.Type.BITSTRING,constructed:!1,captureBitStringValue:"certSignature"}]},l={name:"rsapss",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"rsapss.hashAlgorithm",tagClass:n.Class.CONTEXT_SPECIFIC,type:0,constructed:!0,value:[{name:"rsapss.hashAlgorithm.AlgorithmIdentifier",tagClass:n.Class.UNIVERSAL,type:n.Class.SEQUENCE,constructed:!0,optional:!0,value:[{name:"rsapss.hashAlgorithm.AlgorithmIdentifier.algorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"hashOid"}]}]},{name:"rsapss.maskGenAlgorithm",tagClass:n.Class.CONTEXT_SPECIFIC,type:1,constructed:!0,value:[{name:"rsapss.maskGenAlgorithm.AlgorithmIdentifier",tagClass:n.Class.UNIVERSAL,type:n.Class.SEQUENCE,constructed:!0,optional:!0,value:[{name:"rsapss.maskGenAlgorithm.AlgorithmIdentifier.algorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"maskGenOid"},{name:"rsapss.maskGenAlgorithm.AlgorithmIdentifier.params",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"rsapss.maskGenAlgorithm.AlgorithmIdentifier.params.algorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"maskGenHashOid"}]}]}]},{name:"rsapss.saltLength",tagClass:n.Class.CONTEXT_SPECIFIC,type:2,optional:!0,value:[{name:"rsapss.saltLength.saltLength",tagClass:n.Class.UNIVERSAL,type:n.Class.INTEGER,constructed:!1,capture:"saltLength"}]},{name:"rsapss.trailerField",tagClass:n.Class.CONTEXT_SPECIFIC,type:3,optional:!0,value:[{name:"rsapss.trailer.trailer",tagClass:n.Class.UNIVERSAL,type:n.Class.INTEGER,constructed:!1,capture:"trailer"}]}]},p={name:"CertificationRequestInfo",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,captureAsn1:"certificationRequestInfo",value:[{name:"CertificationRequestInfo.integer",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"certificationRequestInfoVersion"},{name:"CertificationRequestInfo.subject",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,captureAsn1:"certificationRequestInfoSubject"},c,{name:"CertificationRequestInfo.attributes",tagClass:n.Class.CONTEXT_SPECIFIC,type:0,constructed:!0,optional:!0,capture:"certificationRequestInfoAttributes",value:[{name:"CertificationRequestInfo.attributes",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"CertificationRequestInfo.attributes.type",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1},{name:"CertificationRequestInfo.attributes.value",tagClass:n.Class.UNIVERSAL,type:n.Type.SET,constructed:!0}]}]}]},f={name:"CertificationRequest",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,captureAsn1:"csr",value:[p,{name:"CertificationRequest.signatureAlgorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"CertificationRequest.signatureAlgorithm.algorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"csrSignatureOid"},{name:"CertificationRequest.signatureAlgorithm.parameters",tagClass:n.Class.UNIVERSAL,optional:!0,captureAsn1:"csrSignatureParams"}]},{name:"CertificationRequest.signature",tagClass:n.Class.UNIVERSAL,type:n.Type.BITSTRING,constructed:!1,captureBitStringValue:"csrSignature"}]};function h(e,t){"string"==typeof t&&(t={shortName:t});for(var r,a=null,n=0;null===a&&n<e.attributes.length;++n)r=e.attributes[n],(t.type&&t.type===r.type||t.name&&t.name===r.name||t.shortName&&t.shortName===r.shortName)&&(a=r);return a}i.RDNAttributesAsArray=function(e,t){for(var r,a,i,c=[],u=0;u<e.value.length;++u){r=e.value[u];for(var l=0;l<r.value.length;++l)i={},a=r.value[l],i.type=n.derToOid(a.value[0].value),i.value=a.value[1].value,i.valueTagClass=a.value[1].type,i.type in s&&(i.name=s[i.type],i.name in o&&(i.shortName=o[i.name])),t&&(t.update(i.type),t.update(i.value)),c.push(i)}return c},i.CRIAttributesAsArray=function(e){for(var t=[],r=0;r<e.length;++r)for(var a=e[r],c=n.derToOid(a.value[0].value),u=a.value[1].value,l=0;l<u.length;++l){var p={};if(p.type=c,p.value=u[l].value,p.valueTagClass=u[l].type,p.type in s&&(p.name=s[p.type],p.name in o&&(p.shortName=o[p.name])),p.type===s.extensionRequest){p.extensions=[];for(var f=0;f<p.value.length;++f)p.extensions.push(i.certificateExtensionFromAsn1(p.value[f]))}t.push(p)}return t};var d=function(e,t,r){var a={};if(e!==s["RSASSA-PSS"])return a;r&&(a={hash:{algorithmOid:s.sha1},mgf:{algorithmOid:s.mgf1,hash:{algorithmOid:s.sha1}},saltLength:20});var i={},o=[];if(!n.validate(t,l,i,o)){var c=new Error("Cannot read RSASSA-PSS parameter block.");throw c.errors=o,c}return void 0!==i.hashOid&&(a.hash=a.hash||{},a.hash.algorithmOid=n.derToOid(i.hashOid)),void 0!==i.maskGenOid&&(a.mgf=a.mgf||{},a.mgf.algorithmOid=n.derToOid(i.maskGenOid),a.mgf.hash=a.mgf.hash||{},a.mgf.hash.algorithmOid=n.derToOid(i.maskGenHashOid)),void 0!==i.saltLength&&(a.saltLength=i.saltLength.charCodeAt(0)),a};function y(e){for(var t,r,i=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[]),s=e.attributes,o=0;o<s.length;++o){var c=(t=s[o]).value,u=n.Type.PRINTABLESTRING;"valueTagClass"in t&&(u=t.valueTagClass)===n.Type.UTF8&&(c=a.util.encodeUtf8(c)),r=n.create(n.Class.UNIVERSAL,n.Type.SET,!0,[n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(t.type).getBytes()),n.create(n.Class.UNIVERSAL,u,!1,c)])]),i.value.push(r)}return i}function g(e){for(var t,r=0;r<e.length;++r){if(void 0===(t=e[r]).name&&(t.type&&t.type in i.oids?t.name=i.oids[t.type]:t.shortName&&t.shortName in o&&(t.name=i.oids[o[t.shortName]])),void 0===t.type){if(!t.name||!(t.name in i.oids))throw(c=new Error("Attribute type not specified.")).attribute=t,c;t.type=i.oids[t.name]}if(void 0===t.shortName&&t.name&&t.name in o&&(t.shortName=o[t.name]),t.type===s.extensionRequest&&(t.valueConstructed=!0,t.valueTagClass=n.Type.SEQUENCE,!t.value&&t.extensions)){t.value=[];for(var a=0;a<t.extensions.length;++a)t.value.push(i.certificateExtensionToAsn1(m(t.extensions[a])))}var c;if(void 0===t.value)throw(c=new Error("Attribute value not specified.")).attribute=t,c}}function m(e,t){if(t=t||{},void 0===e.name&&e.id&&e.id in i.oids&&(e.name=i.oids[e.id]),void 0===e.id){if(!e.name||!(e.name in i.oids))throw(S=new Error("Extension ID not specified.")).extension=e,S;e.id=i.oids[e.name]}if(void 0!==e.value)return e;if("keyUsage"===e.name){var r=0,o=0,c=0;e.digitalSignature&&(o|=128,r=7),e.nonRepudiation&&(o|=64,r=6),e.keyEncipherment&&(o|=32,r=5),e.dataEncipherment&&(o|=16,r=4),e.keyAgreement&&(o|=8,r=3),e.keyCertSign&&(o|=4,r=2),e.cRLSign&&(o|=2,r=1),e.encipherOnly&&(o|=1,r=0),e.decipherOnly&&(c|=128,r=7);var u=String.fromCharCode(r);0!==c?u+=String.fromCharCode(o)+String.fromCharCode(c):0!==o&&(u+=String.fromCharCode(o)),e.value=n.create(n.Class.UNIVERSAL,n.Type.BITSTRING,!1,u)}else if("basicConstraints"===e.name)e.value=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[]),e.cA&&e.value.value.push(n.create(n.Class.UNIVERSAL,n.Type.BOOLEAN,!1,String.fromCharCode(255))),"pathLenConstraint"in e&&e.value.value.push(n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,n.integerToDer(e.pathLenConstraint).getBytes()));else if("extKeyUsage"===e.name){e.value=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[]);var l=e.value.value;for(var p in e)!0===e[p]&&(p in s?l.push(n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(s[p]).getBytes())):-1!==p.indexOf(".")&&l.push(n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(p).getBytes())))}else if("nsCertType"===e.name){r=0,o=0;e.client&&(o|=128,r=7),e.server&&(o|=64,r=6),e.email&&(o|=32,r=5),e.objsign&&(o|=16,r=4),e.reserved&&(o|=8,r=3),e.sslCA&&(o|=4,r=2),e.emailCA&&(o|=2,r=1),e.objCA&&(o|=1,r=0);u=String.fromCharCode(r);0!==o&&(u+=String.fromCharCode(o)),e.value=n.create(n.Class.UNIVERSAL,n.Type.BITSTRING,!1,u)}else if("subjectAltName"===e.name||"issuerAltName"===e.name){e.value=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[]);for(var f=0;f<e.altNames.length;++f){u=(v=e.altNames[f]).value;if(7===v.type&&v.ip){if(null===(u=a.util.bytesFromIP(v.ip)))throw(S=new Error('Extension "ip" value is not a valid IPv4 or IPv6 address.')).extension=e,S}else 8===v.type&&(u=v.oid?n.oidToDer(n.oidToDer(v.oid)):n.oidToDer(u));e.value.value.push(n.create(n.Class.CONTEXT_SPECIFIC,v.type,!1,u))}}else if("nsComment"===e.name&&t.cert){if(!/^[\x00-\x7F]*$/.test(e.comment)||e.comment.length<1||e.comment.length>128)throw new Error('Invalid "nsComment" content.');e.value=n.create(n.Class.UNIVERSAL,n.Type.IA5STRING,!1,e.comment)}else if("subjectKeyIdentifier"===e.name&&t.cert){var h=t.cert.generateSubjectKeyIdentifier();e.subjectKeyIdentifier=h.toHex(),e.value=n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,h.getBytes())}else if("authorityKeyIdentifier"===e.name&&t.cert){e.value=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[]);l=e.value.value;if(e.keyIdentifier){var d=!0===e.keyIdentifier?t.cert.generateSubjectKeyIdentifier().getBytes():e.keyIdentifier;l.push(n.create(n.Class.CONTEXT_SPECIFIC,0,!1,d))}if(e.authorityCertIssuer){var g=[n.create(n.Class.CONTEXT_SPECIFIC,4,!0,[y(!0===e.authorityCertIssuer?t.cert.issuer:e.authorityCertIssuer)])];l.push(n.create(n.Class.CONTEXT_SPECIFIC,1,!0,g))}if(e.serialNumber){var m=a.util.hexToBytes(!0===e.serialNumber?t.cert.serialNumber:e.serialNumber);l.push(n.create(n.Class.CONTEXT_SPECIFIC,2,!1,m))}}else if("cRLDistributionPoints"===e.name){e.value=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[]);l=e.value.value;var v,C=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[]),E=n.create(n.Class.CONTEXT_SPECIFIC,0,!0,[]);for(f=0;f<e.altNames.length;++f){u=(v=e.altNames[f]).value;if(7===v.type&&v.ip){if(null===(u=a.util.bytesFromIP(v.ip)))throw(S=new Error('Extension "ip" value is not a valid IPv4 or IPv6 address.')).extension=e,S}else 8===v.type&&(u=v.oid?n.oidToDer(n.oidToDer(v.oid)):n.oidToDer(u));E.value.push(n.create(n.Class.CONTEXT_SPECIFIC,v.type,!1,u))}C.value.push(n.create(n.Class.CONTEXT_SPECIFIC,0,!0,[E])),l.push(C)}var S;if(void 0===e.value)throw(S=new Error("Extension value not specified.")).extension=e,S;return e}function v(e,t){switch(e){case s["RSASSA-PSS"]:var r=[];return void 0!==t.hash.algorithmOid&&r.push(n.create(n.Class.CONTEXT_SPECIFIC,0,!0,[n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(t.hash.algorithmOid).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.NULL,!1,"")])])),void 0!==t.mgf.algorithmOid&&r.push(n.create(n.Class.CONTEXT_SPECIFIC,1,!0,[n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(t.mgf.algorithmOid).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(t.mgf.hash.algorithmOid).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.NULL,!1,"")])])])),void 0!==t.saltLength&&r.push(n.create(n.Class.CONTEXT_SPECIFIC,2,!0,[n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,n.integerToDer(t.saltLength).getBytes())])),n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,r);default:return n.create(n.Class.UNIVERSAL,n.Type.NULL,!1,"")}}function C(e){var t=n.create(n.Class.CONTEXT_SPECIFIC,0,!0,[]);if(0===e.attributes.length)return t;for(var r=e.attributes,i=0;i<r.length;++i){var s=r[i],o=s.value,c=n.Type.UTF8;"valueTagClass"in s&&(c=s.valueTagClass),c===n.Type.UTF8&&(o=a.util.encodeUtf8(o));var u=!1;"valueConstructed"in s&&(u=s.valueConstructed);var l=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(s.type).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.SET,!0,[n.create(n.Class.UNIVERSAL,c,u,o)])]);t.value.push(l)}return t}i.certificateFromPem=function(e,t,r){var s=a.pem.decode(e)[0];if("CERTIFICATE"!==s.type&&"X509 CERTIFICATE"!==s.type&&"TRUSTED CERTIFICATE"!==s.type){var o=new Error('Could not convert certificate from PEM; PEM header type is not "CERTIFICATE", "X509 CERTIFICATE", or "TRUSTED CERTIFICATE".');throw o.headerType=s.type,o}if(s.procType&&"ENCRYPTED"===s.procType.type)throw new Error("Could not convert certificate from PEM; PEM is encrypted.");var c=n.fromDer(s.body,r);return i.certificateFromAsn1(c,t)},i.certificateToPem=function(e,t){var r={type:"CERTIFICATE",body:n.toDer(i.certificateToAsn1(e)).getBytes()};return a.pem.encode(r,{maxline:t})},i.publicKeyFromPem=function(e){var t=a.pem.decode(e)[0];if("PUBLIC KEY"!==t.type&&"RSA PUBLIC KEY"!==t.type){var r=new Error('Could not convert public key from PEM; PEM header type is not "PUBLIC KEY" or "RSA PUBLIC KEY".');throw r.headerType=t.type,r}if(t.procType&&"ENCRYPTED"===t.procType.type)throw new Error("Could not convert public key from PEM; PEM is encrypted.");var s=n.fromDer(t.body);return i.publicKeyFromAsn1(s)},i.publicKeyToPem=function(e,t){var r={type:"PUBLIC KEY",body:n.toDer(i.publicKeyToAsn1(e)).getBytes()};return a.pem.encode(r,{maxline:t})},i.publicKeyToRSAPublicKeyPem=function(e,t){var r={type:"RSA PUBLIC KEY",body:n.toDer(i.publicKeyToRSAPublicKey(e)).getBytes()};return a.pem.encode(r,{maxline:t})},i.getPublicKeyFingerprint=function(e,t){var r,s=(t=t||{}).md||a.md.sha1.create();switch(t.type||"RSAPublicKey"){case"RSAPublicKey":r=n.toDer(i.publicKeyToRSAPublicKey(e)).getBytes();break;case"SubjectPublicKeyInfo":r=n.toDer(i.publicKeyToAsn1(e)).getBytes();break;default:throw new Error('Unknown fingerprint type "'+t.type+'".')}s.start(),s.update(r);var o=s.digest();if("hex"===t.encoding){var c=o.toHex();return t.delimiter?c.match(/.{2}/g).join(t.delimiter):c}if("binary"===t.encoding)return o.getBytes();if(t.encoding)throw new Error('Unknown encoding "'+t.encoding+'".');return o},i.certificationRequestFromPem=function(e,t,r){var s=a.pem.decode(e)[0];if("CERTIFICATE REQUEST"!==s.type){var o=new Error('Could not convert certification request from PEM; PEM header type is not "CERTIFICATE REQUEST".');throw o.headerType=s.type,o}if(s.procType&&"ENCRYPTED"===s.procType.type)throw new Error("Could not convert certification request from PEM; PEM is encrypted.");var c=n.fromDer(s.body,r);return i.certificationRequestFromAsn1(c,t)},i.certificationRequestToPem=function(e,t){var r={type:"CERTIFICATE REQUEST",body:n.toDer(i.certificationRequestToAsn1(e)).getBytes()};return a.pem.encode(r,{maxline:t})},i.createCertificate=function(){var e={version:2,serialNumber:"00",signatureOid:null,signature:null,siginfo:{}};return e.siginfo.algorithmOid=null,e.validity={},e.validity.notBefore=new Date,e.validity.notAfter=new Date,e.issuer={},e.issuer.getField=function(t){return h(e.issuer,t)},e.issuer.addField=function(t){g([t]),e.issuer.attributes.push(t)},e.issuer.attributes=[],e.issuer.hash=null,e.subject={},e.subject.getField=function(t){return h(e.subject,t)},e.subject.addField=function(t){g([t]),e.subject.attributes.push(t)},e.subject.attributes=[],e.subject.hash=null,e.extensions=[],e.publicKey=null,e.md=null,e.setSubject=function(t,r){g(t),e.subject.attributes=t,delete e.subject.uniqueId,r&&(e.subject.uniqueId=r),e.subject.hash=null},e.setIssuer=function(t,r){g(t),e.issuer.attributes=t,delete e.issuer.uniqueId,r&&(e.issuer.uniqueId=r),e.issuer.hash=null},e.setExtensions=function(t){for(var r=0;r<t.length;++r)m(t[r],{cert:e});e.extensions=t},e.getExtension=function(t){"string"==typeof t&&(t={name:t});for(var r,a=null,n=0;null===a&&n<e.extensions.length;++n)r=e.extensions[n],(t.id&&r.id===t.id||t.name&&r.name===t.name)&&(a=r);return a},e.sign=function(t,r){e.md=r||a.md.sha1.create();var o=s[e.md.algorithm+"WithRSAEncryption"];if(!o){var c=new Error("Could not compute certificate digest. Unknown message digest algorithm OID.");throw c.algorithm=e.md.algorithm,c}e.signatureOid=e.siginfo.algorithmOid=o,e.tbsCertificate=i.getTBSCertificate(e);var u=n.toDer(e.tbsCertificate);e.md.update(u.getBytes()),e.signature=t.sign(e.md)},e.verify=function(t){var r=!1;if(!e.issued(t)){var o=t.issuer,c=e.subject;throw(y=new Error("The parent certificate did not issue the given child certificate; the child certificate's issuer does not match the parent's subject.")).expectedIssuer=o.attributes,y.actualIssuer=c.attributes,y}var u=t.md;if(null===u){if(t.signatureOid in s)switch(s[t.signatureOid]){case"sha1WithRSAEncryption":u=a.md.sha1.create();break;case"md5WithRSAEncryption":u=a.md.md5.create();break;case"sha256WithRSAEncryption":u=a.md.sha256.create();break;case"sha384WithRSAEncryption":u=a.md.sha384.create();break;case"sha512WithRSAEncryption":u=a.md.sha512.create();break;case"RSASSA-PSS":u=a.md.sha256.create()}if(null===u)throw(y=new Error("Could not compute certificate digest. Unknown signature OID.")).signatureOid=t.signatureOid,y;var l=t.tbsCertificate||i.getTBSCertificate(t),p=n.toDer(l);u.update(p.getBytes())}if(null!==u){var f;switch(t.signatureOid){case s.sha1WithRSAEncryption:f=void 0;break;case s["RSASSA-PSS"]:var h,d,y;if(void 0===(h=s[t.signatureParameters.mgf.hash.algorithmOid])||void 0===a.md[h])throw(y=new Error("Unsupported MGF hash function.")).oid=t.signatureParameters.mgf.hash.algorithmOid,y.name=h,y;if(void 0===(d=s[t.signatureParameters.mgf.algorithmOid])||void 0===a.mgf[d])throw(y=new Error("Unsupported MGF function.")).oid=t.signatureParameters.mgf.algorithmOid,y.name=d,y;if(d=a.mgf[d].create(a.md[h].create()),void 0===(h=s[t.signatureParameters.hash.algorithmOid])||void 0===a.md[h])throw{message:"Unsupported RSASSA-PSS hash function.",oid:t.signatureParameters.hash.algorithmOid,name:h};f=a.pss.create(a.md[h].create(),d,t.signatureParameters.saltLength)}r=e.publicKey.verify(u.digest().getBytes(),t.signature,f)}return r},e.isIssuer=function(t){var r=!1,a=e.issuer,n=t.subject;if(a.hash&&n.hash)r=a.hash===n.hash;else if(a.attributes.length===n.attributes.length){var i,s;r=!0;for(var o=0;r&&o<a.attributes.length;++o)i=a.attributes[o],s=n.attributes[o],i.type===s.type&&i.value===s.value||(r=!1)}return r},e.issued=function(t){return t.isIssuer(e)},e.generateSubjectKeyIdentifier=function(){return i.getPublicKeyFingerprint(e.publicKey,{type:"RSAPublicKey"})},e.verifySubjectKeyIdentifier=function(){for(var t=s.subjectKeyIdentifier,r=0;r<e.extensions.length;++r){var n=e.extensions[r];if(n.id===t){var i=e.generateSubjectKeyIdentifier().getBytes();return a.util.hexToBytes(n.subjectKeyIdentifier)===i}}return!1},e},i.certificateFromAsn1=function(e,t){var r={},o=[];if(!n.validate(e,u,r,o))throw(f=new Error("Cannot read X.509 certificate. ASN.1 object is not an X509v3 Certificate.")).errors=o,f;if(n.derToOid(r.publicKeyOid)!==i.oids.rsaEncryption)throw new Error("Cannot read public key. OID is not RSA.");var c=i.createCertificate();c.version=r.certVersion?r.certVersion.charCodeAt(0):0;var l=a.util.createBuffer(r.certSerialNumber);c.serialNumber=l.toHex(),c.signatureOid=a.asn1.derToOid(r.certSignatureOid),c.signatureParameters=d(c.signatureOid,r.certSignatureParams,!0),c.siginfo.algorithmOid=a.asn1.derToOid(r.certinfoSignatureOid),c.siginfo.parameters=d(c.siginfo.algorithmOid,r.certinfoSignatureParams,!1),c.signature=r.certSignature;var p=[];if(void 0!==r.certValidity1UTCTime&&p.push(n.utcTimeToDate(r.certValidity1UTCTime)),void 0!==r.certValidity2GeneralizedTime&&p.push(n.generalizedTimeToDate(r.certValidity2GeneralizedTime)),void 0!==r.certValidity3UTCTime&&p.push(n.utcTimeToDate(r.certValidity3UTCTime)),void 0!==r.certValidity4GeneralizedTime&&p.push(n.generalizedTimeToDate(r.certValidity4GeneralizedTime)),p.length>2)throw new Error("Cannot read notBefore/notAfter validity times; more than two times were provided in the certificate.");if(p.length<2)throw new Error("Cannot read notBefore/notAfter validity times; they were not provided as either UTCTime or GeneralizedTime.");if(c.validity.notBefore=p[0],c.validity.notAfter=p[1],c.tbsCertificate=r.tbsCertificate,t){var f;if(c.md=null,c.signatureOid in s)switch(s[c.signatureOid]){case"sha1WithRSAEncryption":c.md=a.md.sha1.create();break;case"md5WithRSAEncryption":c.md=a.md.md5.create();break;case"sha256WithRSAEncryption":c.md=a.md.sha256.create();break;case"sha384WithRSAEncryption":c.md=a.md.sha384.create();break;case"sha512WithRSAEncryption":c.md=a.md.sha512.create();break;case"RSASSA-PSS":c.md=a.md.sha256.create()}if(null===c.md)throw(f=new Error("Could not compute certificate digest. Unknown signature OID.")).signatureOid=c.signatureOid,f;var y=n.toDer(c.tbsCertificate);c.md.update(y.getBytes())}var m=a.md.sha1.create();c.issuer.getField=function(e){return h(c.issuer,e)},c.issuer.addField=function(e){g([e]),c.issuer.attributes.push(e)},c.issuer.attributes=i.RDNAttributesAsArray(r.certIssuer,m),r.certIssuerUniqueId&&(c.issuer.uniqueId=r.certIssuerUniqueId),c.issuer.hash=m.digest().toHex();var v=a.md.sha1.create();return c.subject.getField=function(e){return h(c.subject,e)},c.subject.addField=function(e){g([e]),c.subject.attributes.push(e)},c.subject.attributes=i.RDNAttributesAsArray(r.certSubject,v),r.certSubjectUniqueId&&(c.subject.uniqueId=r.certSubjectUniqueId),c.subject.hash=v.digest().toHex(),r.certExtensions?c.extensions=i.certificateExtensionsFromAsn1(r.certExtensions):c.extensions=[],c.publicKey=i.publicKeyFromAsn1(r.subjectPublicKeyInfo),c},i.certificateExtensionsFromAsn1=function(e){for(var t=[],r=0;r<e.value.length;++r)for(var a=e.value[r],n=0;n<a.value.length;++n)t.push(i.certificateExtensionFromAsn1(a.value[n]));return t},i.certificateExtensionFromAsn1=function(e){var t={};if(t.id=n.derToOid(e.value[0].value),t.critical=!1,e.value[1].type===n.Type.BOOLEAN?(t.critical=0!==e.value[1].value.charCodeAt(0),t.value=e.value[2].value):t.value=e.value[1].value,t.id in s)if(t.name=s[t.id],"keyUsage"===t.name){var r=0,i=0;(c=n.fromDer(t.value)).value.length>1&&(r=c.value.charCodeAt(1),i=c.value.length>2?c.value.charCodeAt(2):0),t.digitalSignature=128==(128&r),t.nonRepudiation=64==(64&r),t.keyEncipherment=32==(32&r),t.dataEncipherment=16==(16&r),t.keyAgreement=8==(8&r),t.keyCertSign=4==(4&r),t.cRLSign=2==(2&r),t.encipherOnly=1==(1&r),t.decipherOnly=128==(128&i)}else if("basicConstraints"===t.name){(c=n.fromDer(t.value)).value.length>0&&c.value[0].type===n.Type.BOOLEAN?t.cA=0!==c.value[0].value.charCodeAt(0):t.cA=!1;var o=null;c.value.length>0&&c.value[0].type===n.Type.INTEGER?o=c.value[0].value:c.value.length>1&&(o=c.value[1].value),null!==o&&(t.pathLenConstraint=n.derToInteger(o))}else if("extKeyUsage"===t.name)for(var c=n.fromDer(t.value),u=0;u<c.value.length;++u){var l=n.derToOid(c.value[u].value);l in s?t[s[l]]=!0:t[l]=!0}else if("nsCertType"===t.name){r=0;(c=n.fromDer(t.value)).value.length>1&&(r=c.value.charCodeAt(1)),t.client=128==(128&r),t.server=64==(64&r),t.email=32==(32&r),t.objsign=16==(16&r),t.reserved=8==(8&r),t.sslCA=4==(4&r),t.emailCA=2==(2&r),t.objCA=1==(1&r)}else if("subjectAltName"===t.name||"issuerAltName"===t.name){var p;t.altNames=[];c=n.fromDer(t.value);for(var f=0;f<c.value.length;++f){var h={type:(p=c.value[f]).type,value:p.value};switch(t.altNames.push(h),p.type){case 1:case 2:case 6:break;case 7:h.ip=a.util.bytesToIP(p.value);break;case 8:h.oid=n.derToOid(p.value)}}}else if("subjectKeyIdentifier"===t.name){c=n.fromDer(t.value);t.subjectKeyIdentifier=a.util.bytesToHex(c.value)}return t},i.certificationRequestFromAsn1=function(e,t){var r={},o=[];if(!n.validate(e,f,r,o))throw(u=new Error("Cannot read PKCS#10 certificate request. ASN.1 object is not a PKCS#10 CertificationRequest.")).errors=o,u;if(n.derToOid(r.publicKeyOid)!==i.oids.rsaEncryption)throw new Error("Cannot read public key. OID is not RSA.");var c=i.createCertificationRequest();if(c.version=r.csrVersion?r.csrVersion.charCodeAt(0):0,c.signatureOid=a.asn1.derToOid(r.csrSignatureOid),c.signatureParameters=d(c.signatureOid,r.csrSignatureParams,!0),c.siginfo.algorithmOid=a.asn1.derToOid(r.csrSignatureOid),c.siginfo.parameters=d(c.siginfo.algorithmOid,r.csrSignatureParams,!1),c.signature=r.csrSignature,c.certificationRequestInfo=r.certificationRequestInfo,t){var u;if(c.md=null,c.signatureOid in s)switch(s[c.signatureOid]){case"sha1WithRSAEncryption":c.md=a.md.sha1.create();break;case"md5WithRSAEncryption":c.md=a.md.md5.create();break;case"sha256WithRSAEncryption":c.md=a.md.sha256.create();break;case"sha384WithRSAEncryption":c.md=a.md.sha384.create();break;case"sha512WithRSAEncryption":c.md=a.md.sha512.create();break;case"RSASSA-PSS":c.md=a.md.sha256.create()}if(null===c.md)throw(u=new Error("Could not compute certification request digest. Unknown signature OID.")).signatureOid=c.signatureOid,u;var l=n.toDer(c.certificationRequestInfo);c.md.update(l.getBytes())}var p=a.md.sha1.create();return c.subject.getField=function(e){return h(c.subject,e)},c.subject.addField=function(e){g([e]),c.subject.attributes.push(e)},c.subject.attributes=i.RDNAttributesAsArray(r.certificationRequestInfoSubject,p),c.subject.hash=p.digest().toHex(),c.publicKey=i.publicKeyFromAsn1(r.subjectPublicKeyInfo),c.getAttribute=function(e){return h(c,e)},c.addAttribute=function(e){g([e]),c.attributes.push(e)},c.attributes=i.CRIAttributesAsArray(r.certificationRequestInfoAttributes||[]),c},i.createCertificationRequest=function(){var e={version:0,signatureOid:null,signature:null,siginfo:{}};return e.siginfo.algorithmOid=null,e.subject={},e.subject.getField=function(t){return h(e.subject,t)},e.subject.addField=function(t){g([t]),e.subject.attributes.push(t)},e.subject.attributes=[],e.subject.hash=null,e.publicKey=null,e.attributes=[],e.getAttribute=function(t){return h(e,t)},e.addAttribute=function(t){g([t]),e.attributes.push(t)},e.md=null,e.setSubject=function(t){g(t),e.subject.attributes=t,e.subject.hash=null},e.setAttributes=function(t){g(t),e.attributes=t},e.sign=function(t,r){e.md=r||a.md.sha1.create();var o=s[e.md.algorithm+"WithRSAEncryption"];if(!o){var c=new Error("Could not compute certification request digest. Unknown message digest algorithm OID.");throw c.algorithm=e.md.algorithm,c}e.signatureOid=e.siginfo.algorithmOid=o,e.certificationRequestInfo=i.getCertificationRequestInfo(e);var u=n.toDer(e.certificationRequestInfo);e.md.update(u.getBytes()),e.signature=t.sign(e.md)},e.verify=function(){var t=!1,r=e.md;if(null===r){if(e.signatureOid in s)switch(s[e.signatureOid]){case"sha1WithRSAEncryption":r=a.md.sha1.create();break;case"md5WithRSAEncryption":r=a.md.md5.create();break;case"sha256WithRSAEncryption":r=a.md.sha256.create();break;case"sha384WithRSAEncryption":r=a.md.sha384.create();break;case"sha512WithRSAEncryption":r=a.md.sha512.create();break;case"RSASSA-PSS":r=a.md.sha256.create()}if(null===r)throw(f=new Error("Could not compute certification request digest. Unknown signature OID.")).signatureOid=e.signatureOid,f;var o=e.certificationRequestInfo||i.getCertificationRequestInfo(e),c=n.toDer(o);r.update(c.getBytes())}if(null!==r){var u;switch(e.signatureOid){case s.sha1WithRSAEncryption:break;case s["RSASSA-PSS"]:var l,p,f;if(void 0===(l=s[e.signatureParameters.mgf.hash.algorithmOid])||void 0===a.md[l])throw(f=new Error("Unsupported MGF hash function.")).oid=e.signatureParameters.mgf.hash.algorithmOid,f.name=l,f;if(void 0===(p=s[e.signatureParameters.mgf.algorithmOid])||void 0===a.mgf[p])throw(f=new Error("Unsupported MGF function.")).oid=e.signatureParameters.mgf.algorithmOid,f.name=p,f;if(p=a.mgf[p].create(a.md[l].create()),void 0===(l=s[e.signatureParameters.hash.algorithmOid])||void 0===a.md[l])throw(f=new Error("Unsupported RSASSA-PSS hash function.")).oid=e.signatureParameters.hash.algorithmOid,f.name=l,f;u=a.pss.create(a.md[l].create(),p,e.signatureParameters.saltLength)}t=e.publicKey.verify(r.digest().getBytes(),e.signature,u)}return t},e};var E=new Date("1950-01-01T00:00:00Z"),S=new Date("2050-01-01T00:00:00Z");function T(e){return e>=E&&e<S?n.create(n.Class.UNIVERSAL,n.Type.UTCTIME,!1,n.dateToUtcTime(e)):n.create(n.Class.UNIVERSAL,n.Type.GENERALIZEDTIME,!1,n.dateToGeneralizedTime(e))}i.getTBSCertificate=function(e){var t=T(e.validity.notBefore),r=T(e.validity.notAfter),s=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.CONTEXT_SPECIFIC,0,!0,[n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,n.integerToDer(e.version).getBytes())]),n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,a.util.hexToBytes(e.serialNumber)),n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(e.siginfo.algorithmOid).getBytes()),v(e.siginfo.algorithmOid,e.siginfo.parameters)]),y(e.issuer),n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[t,r]),y(e.subject),i.publicKeyToAsn1(e.publicKey)]);return e.issuer.uniqueId&&s.value.push(n.create(n.Class.CONTEXT_SPECIFIC,1,!0,[n.create(n.Class.UNIVERSAL,n.Type.BITSTRING,!1,String.fromCharCode(0)+e.issuer.uniqueId)])),e.subject.uniqueId&&s.value.push(n.create(n.Class.CONTEXT_SPECIFIC,2,!0,[n.create(n.Class.UNIVERSAL,n.Type.BITSTRING,!1,String.fromCharCode(0)+e.subject.uniqueId)])),e.extensions.length>0&&s.value.push(i.certificateExtensionsToAsn1(e.extensions)),s},i.getCertificationRequestInfo=function(e){return n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,n.integerToDer(e.version).getBytes()),y(e.subject),i.publicKeyToAsn1(e.publicKey),C(e)])},i.distinguishedNameToAsn1=function(e){return y(e)},i.certificateToAsn1=function(e){var t=e.tbsCertificate||i.getTBSCertificate(e);return n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[t,n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(e.signatureOid).getBytes()),v(e.signatureOid,e.signatureParameters)]),n.create(n.Class.UNIVERSAL,n.Type.BITSTRING,!1,String.fromCharCode(0)+e.signature)])},i.certificateExtensionsToAsn1=function(e){var t=n.create(n.Class.CONTEXT_SPECIFIC,3,!0,[]),r=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[]);t.value.push(r);for(var a=0;a<e.length;++a)r.value.push(i.certificateExtensionToAsn1(e[a]));return t},i.certificateExtensionToAsn1=function(e){var t=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[]);t.value.push(n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(e.id).getBytes())),e.critical&&t.value.push(n.create(n.Class.UNIVERSAL,n.Type.BOOLEAN,!1,String.fromCharCode(255)));var r=e.value;return"string"!=typeof e.value&&(r=n.toDer(r).getBytes()),t.value.push(n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,r)),t},i.certificationRequestToAsn1=function(e){var t=e.certificationRequestInfo||i.getCertificationRequestInfo(e);return n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[t,n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(e.signatureOid).getBytes()),v(e.signatureOid,e.signatureParameters)]),n.create(n.Class.UNIVERSAL,n.Type.BITSTRING,!1,String.fromCharCode(0)+e.signature)])},i.createCaStore=function(e){var t={certs:{}};function r(e){return s(e),t.certs[e.hash]||null}function s(e){if(!e.hash){var t=a.md.sha1.create();e.attributes=i.RDNAttributesAsArray(y(e),t),e.hash=t.digest().toHex()}}if(t.getIssuer=function(e){return r(e.issuer)},t.addCertificate=function(e){if("string"==typeof e&&(e=a.pki.certificateFromPem(e)),s(e.subject),!t.hasCertificate(e))if(e.subject.hash in t.certs){var r=t.certs[e.subject.hash];a.util.isArray(r)||(r=[r]),r.push(e),t.certs[e.subject.hash]=r}else t.certs[e.subject.hash]=e},t.hasCertificate=function(e){"string"==typeof e&&(e=a.pki.certificateFromPem(e));var t=r(e.subject);if(!t)return!1;a.util.isArray(t)||(t=[t]);for(var s=n.toDer(i.certificateToAsn1(e)).getBytes(),o=0;o<t.length;++o){if(s===n.toDer(i.certificateToAsn1(t[o])).getBytes())return!0}return!1},t.listAllCertificates=function(){var e=[];for(var r in t.certs)if(t.certs.hasOwnProperty(r)){var n=t.certs[r];if(a.util.isArray(n))for(var i=0;i<n.length;++i)e.push(n[i]);else e.push(n)}return e},t.removeCertificate=function(e){var o;if("string"==typeof e&&(e=a.pki.certificateFromPem(e)),s(e.subject),!t.hasCertificate(e))return null;var c=r(e.subject);if(!a.util.isArray(c))return o=t.certs[e.subject.hash],delete t.certs[e.subject.hash],o;for(var u=n.toDer(i.certificateToAsn1(e)).getBytes(),l=0;l<c.length;++l){u===n.toDer(i.certificateToAsn1(c[l])).getBytes()&&(o=c[l],c.splice(l,1))}return 0===c.length&&delete t.certs[e.subject.hash],o},e)for(var o=0;o<e.length;++o){var c=e[o];t.addCertificate(c)}return t},i.certificateError={bad_certificate:"forge.pki.BadCertificate",unsupported_certificate:"forge.pki.UnsupportedCertificate",certificate_revoked:"forge.pki.CertificateRevoked",certificate_expired:"forge.pki.CertificateExpired",certificate_unknown:"forge.pki.CertificateUnknown",unknown_ca:"forge.pki.UnknownCertificateAuthority"},i.verifyCertificateChain=function(e,t,r){"function"==typeof r&&(r={verify:r}),r=r||{};var n=(t=t.slice(0)).slice(0),s=r.validityCheckDate;void 0===s&&(s=new Date);var o=!0,c=null,u=0;do{var l=t.shift(),p=null,f=!1;if(s&&(s<l.validity.notBefore||s>l.validity.notAfter)&&(c={message:"Certificate is not valid yet or has expired.",error:i.certificateError.certificate_expired,notBefore:l.validity.notBefore,notAfter:l.validity.notAfter,now:s}),null===c){if(null===(p=t[0]||e.getIssuer(l))&&l.isIssuer(l)&&(f=!0,p=l),p){var h=p;a.util.isArray(h)||(h=[h]);for(var d=!1;!d&&h.length>0;){p=h.shift();try{d=p.verify(l)}catch(e){}}d||(c={message:"Certificate signature is invalid.",error:i.certificateError.bad_certificate})}null!==c||p&&!f||e.hasCertificate(l)||(c={message:"Certificate is not trusted.",error:i.certificateError.unknown_ca})}if(null===c&&p&&!l.isIssuer(p)&&(c={message:"Certificate issuer is invalid.",error:i.certificateError.bad_certificate}),null===c)for(var y={keyUsage:!0,basicConstraints:!0},g=0;null===c&&g<l.extensions.length;++g){var m=l.extensions[g];m.critical&&!(m.name in y)&&(c={message:"Certificate has an unsupported critical extension.",error:i.certificateError.unsupported_certificate})}if(null===c&&(!o||0===t.length&&(!p||f))){var v=l.getExtension("basicConstraints"),C=l.getExtension("keyUsage");if(null!==C&&(C.keyCertSign&&null!==v||(c={message:"Certificate keyUsage or basicConstraints conflict or indicate that the certificate is not a CA. If the certificate is the only one in the chain or isn't the first then the certificate must be a valid CA.",error:i.certificateError.bad_certificate})),null!==c||null===v||v.cA||(c={message:"Certificate basicConstraints indicates the certificate is not a CA.",error:i.certificateError.bad_certificate}),null===c&&null!==C&&"pathLenConstraint"in v)u-1>v.pathLenConstraint&&(c={message:"Certificate basicConstraints pathLenConstraint violated.",error:i.certificateError.bad_certificate})}var E=null===c||c.error,S=r.verify?r.verify(E,u,n):E;if(!0!==S)throw!0===E&&(c={message:"The application rejected the certificate.",error:i.certificateError.bad_certificate}),(S||0===S)&&("object"!=typeof S||a.util.isArray(S)?"string"==typeof S&&(c.error=S):(S.message&&(c.message=S.message),S.error&&(c.error=S.error))),c;c=null,o=!1,++u}while(t.length>0);return!0}},function(e,t,r){var a=r(0);r(2),r(1),(e.exports=a.pss=a.pss||{}).create=function(e){3===arguments.length&&(e={md:arguments[0],mgf:arguments[1],saltLength:arguments[2]});var t,r=e.md,n=e.mgf,i=r.digestLength,s=e.salt||null;if("string"==typeof s&&(s=a.util.createBuffer(s)),"saltLength"in e)t=e.saltLength;else{if(null===s)throw new Error("Salt length not specified or specific salt not given.");t=s.length()}if(null!==s&&s.length()!==t)throw new Error("Given salt length does not match length of given salt.");var o=e.prng||a.random,c={encode:function(e,c){var u,l,p=c-1,f=Math.ceil(p/8),h=e.digest().getBytes();if(f<i+t+2)throw new Error("Message is too long to encrypt.");l=null===s?o.getBytesSync(t):s.bytes();var d=new a.util.ByteBuffer;d.fillWithByte(0,8),d.putBytes(h),d.putBytes(l),r.start(),r.update(d.getBytes());var y=r.digest().getBytes(),g=new a.util.ByteBuffer;g.fillWithByte(0,f-t-i-2),g.putByte(1),g.putBytes(l);var m=g.getBytes(),v=f-i-1,C=n.generate(y,v),E="";for(u=0;u<v;u++)E+=String.fromCharCode(m.charCodeAt(u)^C.charCodeAt(u));var S=65280>>8*f-p&255;return(E=String.fromCharCode(E.charCodeAt(0)&~S)+E.substr(1))+y+String.fromCharCode(188)},verify:function(e,s,o){var c,u=o-1,l=Math.ceil(u/8);if(s=s.substr(-l),l<i+t+2)throw new Error("Inconsistent parameters to PSS signature verification.");if(188!==s.charCodeAt(l-1))throw new Error("Encoded message does not end in 0xBC.");var p=l-i-1,f=s.substr(0,p),h=s.substr(p,i),d=65280>>8*l-u&255;if(0!=(f.charCodeAt(0)&d))throw new Error("Bits beyond keysize not zero as expected.");var y=n.generate(h,p),g="";for(c=0;c<p;c++)g+=String.fromCharCode(f.charCodeAt(c)^y.charCodeAt(c));g=String.fromCharCode(g.charCodeAt(0)&~d)+g.substr(1);var m=l-i-t-2;for(c=0;c<m;c++)if(0!==g.charCodeAt(c))throw new Error("Leftmost octets not zero as expected");if(1!==g.charCodeAt(m))throw new Error("Inconsistent PSS signature, 0x01 marker not found");var v=g.substr(-t),C=new a.util.ByteBuffer;return C.fillWithByte(0,8),C.putBytes(e),C.putBytes(v),r.start(),r.update(C.getBytes()),h===r.digest().getBytes()}};return c}},function(e,t,r){var a=r(0);r(1),a.cipher=a.cipher||{};var n=e.exports=a.cipher.modes=a.cipher.modes||{};function i(e,t){if("string"==typeof e&&(e=a.util.createBuffer(e)),a.util.isArray(e)&&e.length>4){var r=e;e=a.util.createBuffer();for(var n=0;n<r.length;++n)e.putByte(r[n])}if(e.length()<t)throw new Error("Invalid IV length; got "+e.length()+" bytes and expected "+t+" bytes.");if(!a.util.isArray(e)){var i=[],s=t/4;for(n=0;n<s;++n)i.push(e.getInt32());e=i}return e}function s(e){e[e.length-1]=e[e.length-1]+1&4294967295}function o(e){return[e/4294967296|0,4294967295&e]}n.ecb=function(e){e=e||{},this.name="ECB",this.cipher=e.cipher,this.blockSize=e.blockSize||16,this._ints=this.blockSize/4,this._inBlock=new Array(this._ints),this._outBlock=new Array(this._ints)},n.ecb.prototype.start=function(e){},n.ecb.prototype.encrypt=function(e,t,r){if(e.length()<this.blockSize&&!(r&&e.length()>0))return!0;for(var a=0;a<this._ints;++a)this._inBlock[a]=e.getInt32();this.cipher.encrypt(this._inBlock,this._outBlock);for(a=0;a<this._ints;++a)t.putInt32(this._outBlock[a])},n.ecb.prototype.decrypt=function(e,t,r){if(e.length()<this.blockSize&&!(r&&e.length()>0))return!0;for(var a=0;a<this._ints;++a)this._inBlock[a]=e.getInt32();this.cipher.decrypt(this._inBlock,this._outBlock);for(a=0;a<this._ints;++a)t.putInt32(this._outBlock[a])},n.ecb.prototype.pad=function(e,t){var r=e.length()===this.blockSize?this.blockSize:this.blockSize-e.length();return e.fillWithByte(r,r),!0},n.ecb.prototype.unpad=function(e,t){if(t.overflow>0)return!1;var r=e.length(),a=e.at(r-1);return!(a>this.blockSize<<2)&&(e.truncate(a),!0)},n.cbc=function(e){e=e||{},this.name="CBC",this.cipher=e.cipher,this.blockSize=e.blockSize||16,this._ints=this.blockSize/4,this._inBlock=new Array(this._ints),this._outBlock=new Array(this._ints)},n.cbc.prototype.start=function(e){if(null===e.iv){if(!this._prev)throw new Error("Invalid IV parameter.");this._iv=this._prev.slice(0)}else{if(!("iv"in e))throw new Error("Invalid IV parameter.");this._iv=i(e.iv,this.blockSize),this._prev=this._iv.slice(0)}},n.cbc.prototype.encrypt=function(e,t,r){if(e.length()<this.blockSize&&!(r&&e.length()>0))return!0;for(var a=0;a<this._ints;++a)this._inBlock[a]=this._prev[a]^e.getInt32();this.cipher.encrypt(this._inBlock,this._outBlock);for(a=0;a<this._ints;++a)t.putInt32(this._outBlock[a]);this._prev=this._outBlock},n.cbc.prototype.decrypt=function(e,t,r){if(e.length()<this.blockSize&&!(r&&e.length()>0))return!0;for(var a=0;a<this._ints;++a)this._inBlock[a]=e.getInt32();this.cipher.decrypt(this._inBlock,this._outBlock);for(a=0;a<this._ints;++a)t.putInt32(this._prev[a]^this._outBlock[a]);this._prev=this._inBlock.slice(0)},n.cbc.prototype.pad=function(e,t){var r=e.length()===this.blockSize?this.blockSize:this.blockSize-e.length();return e.fillWithByte(r,r),!0},n.cbc.prototype.unpad=function(e,t){if(t.overflow>0)return!1;var r=e.length(),a=e.at(r-1);return!(a>this.blockSize<<2)&&(e.truncate(a),!0)},n.cfb=function(e){e=e||{},this.name="CFB",this.cipher=e.cipher,this.blockSize=e.blockSize||16,this._ints=this.blockSize/4,this._inBlock=null,this._outBlock=new Array(this._ints),this._partialBlock=new Array(this._ints),this._partialOutput=a.util.createBuffer(),this._partialBytes=0},n.cfb.prototype.start=function(e){if(!("iv"in e))throw new Error("Invalid IV parameter.");this._iv=i(e.iv,this.blockSize),this._inBlock=this._iv.slice(0),this._partialBytes=0},n.cfb.prototype.encrypt=function(e,t,r){var a=e.length();if(0===a)return!0;if(this.cipher.encrypt(this._inBlock,this._outBlock),0===this._partialBytes&&a>=this.blockSize)for(var n=0;n<this._ints;++n)this._inBlock[n]=e.getInt32()^this._outBlock[n],t.putInt32(this._inBlock[n]);else{var i=(this.blockSize-a)%this.blockSize;i>0&&(i=this.blockSize-i),this._partialOutput.clear();for(n=0;n<this._ints;++n)this._partialBlock[n]=e.getInt32()^this._outBlock[n],this._partialOutput.putInt32(this._partialBlock[n]);if(i>0)e.read-=this.blockSize;else for(n=0;n<this._ints;++n)this._inBlock[n]=this._partialBlock[n];if(this._partialBytes>0&&this._partialOutput.getBytes(this._partialBytes),i>0&&!r)return t.putBytes(this._partialOutput.getBytes(i-this._partialBytes)),this._partialBytes=i,!0;t.putBytes(this._partialOutput.getBytes(a-this._partialBytes)),this._partialBytes=0}},n.cfb.prototype.decrypt=function(e,t,r){var a=e.length();if(0===a)return!0;if(this.cipher.encrypt(this._inBlock,this._outBlock),0===this._partialBytes&&a>=this.blockSize)for(var n=0;n<this._ints;++n)this._inBlock[n]=e.getInt32(),t.putInt32(this._inBlock[n]^this._outBlock[n]);else{var i=(this.blockSize-a)%this.blockSize;i>0&&(i=this.blockSize-i),this._partialOutput.clear();for(n=0;n<this._ints;++n)this._partialBlock[n]=e.getInt32(),this._partialOutput.putInt32(this._partialBlock[n]^this._outBlock[n]);if(i>0)e.read-=this.blockSize;else for(n=0;n<this._ints;++n)this._inBlock[n]=this._partialBlock[n];if(this._partialBytes>0&&this._partialOutput.getBytes(this._partialBytes),i>0&&!r)return t.putBytes(this._partialOutput.getBytes(i-this._partialBytes)),this._partialBytes=i,!0;t.putBytes(this._partialOutput.getBytes(a-this._partialBytes)),this._partialBytes=0}},n.ofb=function(e){e=e||{},this.name="OFB",this.cipher=e.cipher,this.blockSize=e.blockSize||16,this._ints=this.blockSize/4,this._inBlock=null,this._outBlock=new Array(this._ints),this._partialOutput=a.util.createBuffer(),this._partialBytes=0},n.ofb.prototype.start=function(e){if(!("iv"in e))throw new Error("Invalid IV parameter.");this._iv=i(e.iv,this.blockSize),this._inBlock=this._iv.slice(0),this._partialBytes=0},n.ofb.prototype.encrypt=function(e,t,r){var a=e.length();if(0===e.length())return!0;if(this.cipher.encrypt(this._inBlock,this._outBlock),0===this._partialBytes&&a>=this.blockSize)for(var n=0;n<this._ints;++n)t.putInt32(e.getInt32()^this._outBlock[n]),this._inBlock[n]=this._outBlock[n];else{var i=(this.blockSize-a)%this.blockSize;i>0&&(i=this.blockSize-i),this._partialOutput.clear();for(n=0;n<this._ints;++n)this._partialOutput.putInt32(e.getInt32()^this._outBlock[n]);if(i>0)e.read-=this.blockSize;else for(n=0;n<this._ints;++n)this._inBlock[n]=this._outBlock[n];if(this._partialBytes>0&&this._partialOutput.getBytes(this._partialBytes),i>0&&!r)return t.putBytes(this._partialOutput.getBytes(i-this._partialBytes)),this._partialBytes=i,!0;t.putBytes(this._partialOutput.getBytes(a-this._partialBytes)),this._partialBytes=0}},n.ofb.prototype.decrypt=n.ofb.prototype.encrypt,n.ctr=function(e){e=e||{},this.name="CTR",this.cipher=e.cipher,this.blockSize=e.blockSize||16,this._ints=this.blockSize/4,this._inBlock=null,this._outBlock=new Array(this._ints),this._partialOutput=a.util.createBuffer(),this._partialBytes=0},n.ctr.prototype.start=function(e){if(!("iv"in e))throw new Error("Invalid IV parameter.");this._iv=i(e.iv,this.blockSize),this._inBlock=this._iv.slice(0),this._partialBytes=0},n.ctr.prototype.encrypt=function(e,t,r){var a=e.length();if(0===a)return!0;if(this.cipher.encrypt(this._inBlock,this._outBlock),0===this._partialBytes&&a>=this.blockSize)for(var n=0;n<this._ints;++n)t.putInt32(e.getInt32()^this._outBlock[n]);else{var i=(this.blockSize-a)%this.blockSize;i>0&&(i=this.blockSize-i),this._partialOutput.clear();for(n=0;n<this._ints;++n)this._partialOutput.putInt32(e.getInt32()^this._outBlock[n]);if(i>0&&(e.read-=this.blockSize),this._partialBytes>0&&this._partialOutput.getBytes(this._partialBytes),i>0&&!r)return t.putBytes(this._partialOutput.getBytes(i-this._partialBytes)),this._partialBytes=i,!0;t.putBytes(this._partialOutput.getBytes(a-this._partialBytes)),this._partialBytes=0}s(this._inBlock)},n.ctr.prototype.decrypt=n.ctr.prototype.encrypt,n.gcm=function(e){e=e||{},this.name="GCM",this.cipher=e.cipher,this.blockSize=e.blockSize||16,this._ints=this.blockSize/4,this._inBlock=new Array(this._ints),this._outBlock=new Array(this._ints),this._partialOutput=a.util.createBuffer(),this._partialBytes=0,this._R=3774873600},n.gcm.prototype.start=function(e){if(!("iv"in e))throw new Error("Invalid IV parameter.");var t,r=a.util.createBuffer(e.iv);if(this._cipherLength=0,t="additionalData"in e?a.util.createBuffer(e.additionalData):a.util.createBuffer(),this._tagLength="tagLength"in e?e.tagLength:128,this._tag=null,e.decrypt&&(this._tag=a.util.createBuffer(e.tag).getBytes(),this._tag.length!==this._tagLength/8))throw new Error("Authentication tag does not match tag length.");this._hashBlock=new Array(this._ints),this.tag=null,this._hashSubkey=new Array(this._ints),this.cipher.encrypt([0,0,0,0],this._hashSubkey),this.componentBits=4,this._m=this.generateHashTable(this._hashSubkey,this.componentBits);var n=r.length();if(12===n)this._j0=[r.getInt32(),r.getInt32(),r.getInt32(),1];else{for(this._j0=[0,0,0,0];r.length()>0;)this._j0=this.ghash(this._hashSubkey,this._j0,[r.getInt32(),r.getInt32(),r.getInt32(),r.getInt32()]);this._j0=this.ghash(this._hashSubkey,this._j0,[0,0].concat(o(8*n)))}this._inBlock=this._j0.slice(0),s(this._inBlock),this._partialBytes=0,t=a.util.createBuffer(t),this._aDataLength=o(8*t.length());var i=t.length()%this.blockSize;for(i&&t.fillWithByte(0,this.blockSize-i),this._s=[0,0,0,0];t.length()>0;)this._s=this.ghash(this._hashSubkey,this._s,[t.getInt32(),t.getInt32(),t.getInt32(),t.getInt32()])},n.gcm.prototype.encrypt=function(e,t,r){var a=e.length();if(0===a)return!0;if(this.cipher.encrypt(this._inBlock,this._outBlock),0===this._partialBytes&&a>=this.blockSize){for(var n=0;n<this._ints;++n)t.putInt32(this._outBlock[n]^=e.getInt32());this._cipherLength+=this.blockSize}else{var i=(this.blockSize-a)%this.blockSize;i>0&&(i=this.blockSize-i),this._partialOutput.clear();for(n=0;n<this._ints;++n)this._partialOutput.putInt32(e.getInt32()^this._outBlock[n]);if(i<=0||r){if(r){var o=a%this.blockSize;this._cipherLength+=o,this._partialOutput.truncate(this.blockSize-o)}else this._cipherLength+=this.blockSize;for(n=0;n<this._ints;++n)this._outBlock[n]=this._partialOutput.getInt32();this._partialOutput.read-=this.blockSize}if(this._partialBytes>0&&this._partialOutput.getBytes(this._partialBytes),i>0&&!r)return e.read-=this.blockSize,t.putBytes(this._partialOutput.getBytes(i-this._partialBytes)),this._partialBytes=i,!0;t.putBytes(this._partialOutput.getBytes(a-this._partialBytes)),this._partialBytes=0}this._s=this.ghash(this._hashSubkey,this._s,this._outBlock),s(this._inBlock)},n.gcm.prototype.decrypt=function(e,t,r){var a=e.length();if(a<this.blockSize&&!(r&&a>0))return!0;this.cipher.encrypt(this._inBlock,this._outBlock),s(this._inBlock),this._hashBlock[0]=e.getInt32(),this._hashBlock[1]=e.getInt32(),this._hashBlock[2]=e.getInt32(),this._hashBlock[3]=e.getInt32(),this._s=this.ghash(this._hashSubkey,this._s,this._hashBlock);for(var n=0;n<this._ints;++n)t.putInt32(this._outBlock[n]^this._hashBlock[n]);a<this.blockSize?this._cipherLength+=a%this.blockSize:this._cipherLength+=this.blockSize},n.gcm.prototype.afterFinish=function(e,t){var r=!0;t.decrypt&&t.overflow&&e.truncate(this.blockSize-t.overflow),this.tag=a.util.createBuffer();var n=this._aDataLength.concat(o(8*this._cipherLength));this._s=this.ghash(this._hashSubkey,this._s,n);var i=[];this.cipher.encrypt(this._j0,i);for(var s=0;s<this._ints;++s)this.tag.putInt32(this._s[s]^i[s]);return this.tag.truncate(this.tag.length()%(this._tagLength/8)),t.decrypt&&this.tag.bytes()!==this._tag&&(r=!1),r},n.gcm.prototype.multiply=function(e,t){for(var r=[0,0,0,0],a=t.slice(0),n=0;n<128;++n){e[n/32|0]&1<<31-n%32&&(r[0]^=a[0],r[1]^=a[1],r[2]^=a[2],r[3]^=a[3]),this.pow(a,a)}return r},n.gcm.prototype.pow=function(e,t){for(var r=1&e[3],a=3;a>0;--a)t[a]=e[a]>>>1|(1&e[a-1])<<31;t[0]=e[0]>>>1,r&&(t[0]^=this._R)},n.gcm.prototype.tableMultiply=function(e){for(var t=[0,0,0,0],r=0;r<32;++r){var a=e[r/8|0]>>>4*(7-r%8)&15,n=this._m[r][a];t[0]^=n[0],t[1]^=n[1],t[2]^=n[2],t[3]^=n[3]}return t},n.gcm.prototype.ghash=function(e,t,r){return t[0]^=r[0],t[1]^=r[1],t[2]^=r[2],t[3]^=r[3],this.tableMultiply(t)},n.gcm.prototype.generateHashTable=function(e,t){for(var r=8/t,a=4*r,n=16*r,i=new Array(n),s=0;s<n;++s){var o=[0,0,0,0],c=(a-1-s%a)*t;o[s/a|0]=1<<t-1<<c,i[s]=this.generateSubHashTable(this.multiply(o,e),t)}return i},n.gcm.prototype.generateSubHashTable=function(e,t){var r=1<<t,a=r>>>1,n=new Array(r);n[a]=e.slice(0);for(var i=a>>>1;i>0;)this.pow(n[2*i],n[i]=[]),i>>=1;for(i=2;i<a;){for(var s=1;s<i;++s){var o=n[i],c=n[s];n[i+s]=[o[0]^c[0],o[1]^c[1],o[2]^c[2],o[3]^c[3]]}i*=2}for(n[0]=[0,0,0,0],i=a+1;i<r;++i){var u=n[i^a];n[i]=[e[0]^u[0],e[1]^u[1],e[2]^u[2],e[3]^u[3]]}return n}},function(e,t,r){var a=r(0);r(3),r(8),r(14),r(7),r(21),r(2),r(9),r(1);var n=function(e,t,r,n){var i=a.util.createBuffer(),s=e.length>>1,o=s+(1&e.length),c=e.substr(0,o),u=e.substr(s,o),l=a.util.createBuffer(),p=a.hmac.create();r=t+r;var f=Math.ceil(n/16),h=Math.ceil(n/20);p.start("MD5",c);var d=a.util.createBuffer();l.putBytes(r);for(var y=0;y<f;++y)p.start(null,null),p.update(l.getBytes()),l.putBuffer(p.digest()),p.start(null,null),p.update(l.bytes()+r),d.putBuffer(p.digest());p.start("SHA1",u);var g=a.util.createBuffer();l.clear(),l.putBytes(r);for(y=0;y<h;++y)p.start(null,null),p.update(l.getBytes()),l.putBuffer(p.digest()),p.start(null,null),p.update(l.bytes()+r),g.putBuffer(p.digest());return i.putBytes(a.util.xorBytes(d.getBytes(),g.getBytes(),n)),i},i=function(e,t,r){var n=!1;try{var i=e.deflate(t.fragment.getBytes());t.fragment=a.util.createBuffer(i),t.length=i.length,n=!0}catch(e){}return n},s=function(e,t,r){var n=!1;try{var i=e.inflate(t.fragment.getBytes());t.fragment=a.util.createBuffer(i),t.length=i.length,n=!0}catch(e){}return n},o=function(e,t){var r=0;switch(t){case 1:r=e.getByte();break;case 2:r=e.getInt16();break;case 3:r=e.getInt24();break;case 4:r=e.getInt32()}return a.util.createBuffer(e.getBytes(r))},c=function(e,t,r){e.putInt(r.length(),t<<3),e.putBuffer(r)},u={Versions:{TLS_1_0:{major:3,minor:1},TLS_1_1:{major:3,minor:2},TLS_1_2:{major:3,minor:3}}};u.SupportedVersions=[u.Versions.TLS_1_1,u.Versions.TLS_1_0],u.Version=u.SupportedVersions[0],u.MaxFragment=15360,u.ConnectionEnd={server:0,client:1},u.PRFAlgorithm={tls_prf_sha256:0},u.BulkCipherAlgorithm={none:null,rc4:0,des3:1,aes:2},u.CipherType={stream:0,block:1,aead:2},u.MACAlgorithm={none:null,hmac_md5:0,hmac_sha1:1,hmac_sha256:2,hmac_sha384:3,hmac_sha512:4},u.CompressionMethod={none:0,deflate:1},u.ContentType={change_cipher_spec:20,alert:21,handshake:22,application_data:23,heartbeat:24},u.HandshakeType={hello_request:0,client_hello:1,server_hello:2,certificate:11,server_key_exchange:12,certificate_request:13,server_hello_done:14,certificate_verify:15,client_key_exchange:16,finished:20},u.Alert={},u.Alert.Level={warning:1,fatal:2},u.Alert.Description={close_notify:0,unexpected_message:10,bad_record_mac:20,decryption_failed:21,record_overflow:22,decompression_failure:30,handshake_failure:40,bad_certificate:42,unsupported_certificate:43,certificate_revoked:44,certificate_expired:45,certificate_unknown:46,illegal_parameter:47,unknown_ca:48,access_denied:49,decode_error:50,decrypt_error:51,export_restriction:60,protocol_version:70,insufficient_security:71,internal_error:80,user_canceled:90,no_renegotiation:100},u.HeartbeatMessageType={heartbeat_request:1,heartbeat_response:2},u.CipherSuites={},u.getCipherSuite=function(e){var t=null;for(var r in u.CipherSuites){var a=u.CipherSuites[r];if(a.id[0]===e.charCodeAt(0)&&a.id[1]===e.charCodeAt(1)){t=a;break}}return t},u.handleUnexpected=function(e,t){!e.open&&e.entity===u.ConnectionEnd.client||e.error(e,{message:"Unexpected message. Received TLS record out of order.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.unexpected_message}})},u.handleHelloRequest=function(e,t,r){!e.handshaking&&e.handshakes>0&&(u.queue(e,u.createAlert(e,{level:u.Alert.Level.warning,description:u.Alert.Description.no_renegotiation})),u.flush(e)),e.process()},u.parseHelloMessage=function(e,t,r){var n=null,i=e.entity===u.ConnectionEnd.client;if(r<38)e.error(e,{message:i?"Invalid ServerHello message. Message too short.":"Invalid ClientHello message. Message too short.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.illegal_parameter}});else{var s=t.fragment,c=s.length();if(n={version:{major:s.getByte(),minor:s.getByte()},random:a.util.createBuffer(s.getBytes(32)),session_id:o(s,1),extensions:[]},i?(n.cipher_suite=s.getBytes(2),n.compression_method=s.getByte()):(n.cipher_suites=o(s,2),n.compression_methods=o(s,1)),(c=r-(c-s.length()))>0){for(var l=o(s,2);l.length()>0;)n.extensions.push({type:[l.getByte(),l.getByte()],data:o(l,2)});if(!i)for(var p=0;p<n.extensions.length;++p){var f=n.extensions[p];if(0===f.type[0]&&0===f.type[1])for(var h=o(f.data,2);h.length()>0;){if(0!==h.getByte())break;e.session.extensions.server_name.serverNameList.push(o(h,2).getBytes())}}}if(e.session.version&&(n.version.major!==e.session.version.major||n.version.minor!==e.session.version.minor))return e.error(e,{message:"TLS version change is disallowed during renegotiation.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.protocol_version}});if(i)e.session.cipherSuite=u.getCipherSuite(n.cipher_suite);else for(var d=a.util.createBuffer(n.cipher_suites.bytes());d.length()>0&&(e.session.cipherSuite=u.getCipherSuite(d.getBytes(2)),null===e.session.cipherSuite););if(null===e.session.cipherSuite)return e.error(e,{message:"No cipher suites in common.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.handshake_failure},cipherSuite:a.util.bytesToHex(n.cipher_suite)});e.session.compressionMethod=i?n.compression_method:u.CompressionMethod.none}return n},u.createSecurityParameters=function(e,t){var r=e.entity===u.ConnectionEnd.client,a=t.random.bytes(),n=r?e.session.sp.client_random:a,i=r?a:u.createRandom().getBytes();e.session.sp={entity:e.entity,prf_algorithm:u.PRFAlgorithm.tls_prf_sha256,bulk_cipher_algorithm:null,cipher_type:null,enc_key_length:null,block_length:null,fixed_iv_length:null,record_iv_length:null,mac_algorithm:null,mac_length:null,mac_key_length:null,compression_algorithm:e.session.compressionMethod,pre_master_secret:null,master_secret:null,client_random:n,server_random:i}},u.handleServerHello=function(e,t,r){var a=u.parseHelloMessage(e,t,r);if(!e.fail){if(!(a.version.minor<=e.version.minor))return e.error(e,{message:"Incompatible TLS version.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.protocol_version}});e.version.minor=a.version.minor,e.session.version=e.version;var n=a.session_id.bytes();n.length>0&&n===e.session.id?(e.expect=d,e.session.resuming=!0,e.session.sp.server_random=a.random.bytes()):(e.expect=l,e.session.resuming=!1,u.createSecurityParameters(e,a)),e.session.id=n,e.process()}},u.handleClientHello=function(e,t,r){var n=u.parseHelloMessage(e,t,r);if(!e.fail){var i=n.session_id.bytes(),s=null;if(e.sessionCache&&(null===(s=e.sessionCache.getSession(i))?i="":(s.version.major!==n.version.major||s.version.minor>n.version.minor)&&(s=null,i="")),0===i.length&&(i=a.random.getBytes(32)),e.session.id=i,e.session.clientHelloVersion=n.version,e.session.sp={},s)e.version=e.session.version=s.version,e.session.sp=s.sp;else{for(var o,c=1;c<u.SupportedVersions.length&&!((o=u.SupportedVersions[c]).minor<=n.version.minor);++c);e.version={major:o.major,minor:o.minor},e.session.version=e.version}null!==s?(e.expect=S,e.session.resuming=!0,e.session.sp.client_random=n.random.bytes()):(e.expect=!1!==e.verifyClient?v:C,e.session.resuming=!1,u.createSecurityParameters(e,n)),e.open=!0,u.queue(e,u.createRecord(e,{type:u.ContentType.handshake,data:u.createServerHello(e)})),e.session.resuming?(u.queue(e,u.createRecord(e,{type:u.ContentType.change_cipher_spec,data:u.createChangeCipherSpec()})),e.state.pending=u.createConnectionState(e),e.state.current.write=e.state.pending.write,u.queue(e,u.createRecord(e,{type:u.ContentType.handshake,data:u.createFinished(e)}))):(u.queue(e,u.createRecord(e,{type:u.ContentType.handshake,data:u.createCertificate(e)})),e.fail||(u.queue(e,u.createRecord(e,{type:u.ContentType.handshake,data:u.createServerKeyExchange(e)})),!1!==e.verifyClient&&u.queue(e,u.createRecord(e,{type:u.ContentType.handshake,data:u.createCertificateRequest(e)})),u.queue(e,u.createRecord(e,{type:u.ContentType.handshake,data:u.createServerHelloDone(e)})))),u.flush(e),e.process()}},u.handleCertificate=function(e,t,r){if(r<3)return e.error(e,{message:"Invalid Certificate message. Message too short.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.illegal_parameter}});var n,i,s=t.fragment,c={certificate_list:o(s,3)},l=[];try{for(;c.certificate_list.length()>0;)n=o(c.certificate_list,3),i=a.asn1.fromDer(n),n=a.pki.certificateFromAsn1(i,!0),l.push(n)}catch(t){return e.error(e,{message:"Could not parse certificate list.",cause:t,send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.bad_certificate}})}var f=e.entity===u.ConnectionEnd.client;!f&&!0!==e.verifyClient||0!==l.length?0===l.length?e.expect=f?p:C:(f?e.session.serverCertificate=l[0]:e.session.clientCertificate=l[0],u.verifyCertificateChain(e,l)&&(e.expect=f?p:C)):e.error(e,{message:f?"No server certificate provided.":"No client certificate provided.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.illegal_parameter}}),e.process()},u.handleServerKeyExchange=function(e,t,r){if(r>0)return e.error(e,{message:"Invalid key parameters. Only RSA is supported.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.unsupported_certificate}});e.expect=f,e.process()},u.handleClientKeyExchange=function(e,t,r){if(r<48)return e.error(e,{message:"Invalid key parameters. Only RSA is supported.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.unsupported_certificate}});var n=t.fragment,i={enc_pre_master_secret:o(n,2).getBytes()},s=null;if(e.getPrivateKey)try{s=e.getPrivateKey(e,e.session.serverCertificate),s=a.pki.privateKeyFromPem(s)}catch(t){e.error(e,{message:"Could not get private key.",cause:t,send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.internal_error}})}if(null===s)return e.error(e,{message:"No private key set.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.internal_error}});try{var c=e.session.sp;c.pre_master_secret=s.decrypt(i.enc_pre_master_secret);var l=e.session.clientHelloVersion;if(l.major!==c.pre_master_secret.charCodeAt(0)||l.minor!==c.pre_master_secret.charCodeAt(1))throw new Error("TLS version rollback attack detected.")}catch(e){c.pre_master_secret=a.random.getBytes(48)}e.expect=S,null!==e.session.clientCertificate&&(e.expect=E),e.process()},u.handleCertificateRequest=function(e,t,r){if(r<3)return e.error(e,{message:"Invalid CertificateRequest. Message too short.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.illegal_parameter}});var a=t.fragment,n={certificate_types:o(a,1),certificate_authorities:o(a,2)};e.session.certificateRequest=n,e.expect=h,e.process()},u.handleCertificateVerify=function(e,t,r){if(r<2)return e.error(e,{message:"Invalid CertificateVerify. Message too short.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.illegal_parameter}});var n=t.fragment;n.read-=4;var i=n.bytes();n.read+=4;var s={signature:o(n,2).getBytes()},c=a.util.createBuffer();c.putBuffer(e.session.md5.digest()),c.putBuffer(e.session.sha1.digest()),c=c.getBytes();try{if(!e.session.clientCertificate.publicKey.verify(c,s.signature,"NONE"))throw new Error("CertificateVerify signature does not match.");e.session.md5.update(i),e.session.sha1.update(i)}catch(t){return e.error(e,{message:"Bad signature in CertificateVerify.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.handshake_failure}})}e.expect=S,e.process()},u.handleServerHelloDone=function(e,t,r){if(r>0)return e.error(e,{message:"Invalid ServerHelloDone message. Invalid length.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.record_overflow}});if(null===e.serverCertificate){var n={message:"No server certificate provided. Not enough security.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.insufficient_security}},i=e.verify(e,n.alert.description,0,[]);if(!0!==i)return(i||0===i)&&("object"!=typeof i||a.util.isArray(i)?"number"==typeof i&&(n.alert.description=i):(i.message&&(n.message=i.message),i.alert&&(n.alert.description=i.alert))),e.error(e,n)}null!==e.session.certificateRequest&&(t=u.createRecord(e,{type:u.ContentType.handshake,data:u.createCertificate(e)}),u.queue(e,t)),t=u.createRecord(e,{type:u.ContentType.handshake,data:u.createClientKeyExchange(e)}),u.queue(e,t),e.expect=m;var s=function(e,t){null!==e.session.certificateRequest&&null!==e.session.clientCertificate&&u.queue(e,u.createRecord(e,{type:u.ContentType.handshake,data:u.createCertificateVerify(e,t)})),u.queue(e,u.createRecord(e,{type:u.ContentType.change_cipher_spec,data:u.createChangeCipherSpec()})),e.state.pending=u.createConnectionState(e),e.state.current.write=e.state.pending.write,u.queue(e,u.createRecord(e,{type:u.ContentType.handshake,data:u.createFinished(e)})),e.expect=d,u.flush(e),e.process()};if(null===e.session.certificateRequest||null===e.session.clientCertificate)return s(e,null);u.getClientSignature(e,s)},u.handleChangeCipherSpec=function(e,t){if(1!==t.fragment.getByte())return e.error(e,{message:"Invalid ChangeCipherSpec message received.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.illegal_parameter}});var r=e.entity===u.ConnectionEnd.client;(e.session.resuming&&r||!e.session.resuming&&!r)&&(e.state.pending=u.createConnectionState(e)),e.state.current.read=e.state.pending.read,(!e.session.resuming&&r||e.session.resuming&&!r)&&(e.state.pending=null),e.expect=r?y:T,e.process()},u.handleFinished=function(e,t,r){var i=t.fragment;i.read-=4;var s=i.bytes();i.read+=4;var o=t.fragment.getBytes();(i=a.util.createBuffer()).putBuffer(e.session.md5.digest()),i.putBuffer(e.session.sha1.digest());var c=e.entity===u.ConnectionEnd.client,l=c?"server finished":"client finished",p=e.session.sp;if((i=n(p.master_secret,l,i.getBytes(),12)).getBytes()!==o)return e.error(e,{message:"Invalid verify_data in Finished message.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.decrypt_error}});e.session.md5.update(s),e.session.sha1.update(s),(e.session.resuming&&c||!e.session.resuming&&!c)&&(u.queue(e,u.createRecord(e,{type:u.ContentType.change_cipher_spec,data:u.createChangeCipherSpec()})),e.state.current.write=e.state.pending.write,e.state.pending=null,u.queue(e,u.createRecord(e,{type:u.ContentType.handshake,data:u.createFinished(e)}))),e.expect=c?g:I,e.handshaking=!1,++e.handshakes,e.peerCertificate=c?e.session.serverCertificate:e.session.clientCertificate,u.flush(e),e.isConnected=!0,e.connected(e),e.process()},u.handleAlert=function(e,t){var r,a=t.fragment,n={level:a.getByte(),description:a.getByte()};switch(n.description){case u.Alert.Description.close_notify:r="Connection closed.";break;case u.Alert.Description.unexpected_message:r="Unexpected message.";break;case u.Alert.Description.bad_record_mac:r="Bad record MAC.";break;case u.Alert.Description.decryption_failed:r="Decryption failed.";break;case u.Alert.Description.record_overflow:r="Record overflow.";break;case u.Alert.Description.decompression_failure:r="Decompression failed.";break;case u.Alert.Description.handshake_failure:r="Handshake failure.";break;case u.Alert.Description.bad_certificate:r="Bad certificate.";break;case u.Alert.Description.unsupported_certificate:r="Unsupported certificate.";break;case u.Alert.Description.certificate_revoked:r="Certificate revoked.";break;case u.Alert.Description.certificate_expired:r="Certificate expired.";break;case u.Alert.Description.certificate_unknown:r="Certificate unknown.";break;case u.Alert.Description.illegal_parameter:r="Illegal parameter.";break;case u.Alert.Description.unknown_ca:r="Unknown certificate authority.";break;case u.Alert.Description.access_denied:r="Access denied.";break;case u.Alert.Description.decode_error:r="Decode error.";break;case u.Alert.Description.decrypt_error:r="Decrypt error.";break;case u.Alert.Description.export_restriction:r="Export restriction.";break;case u.Alert.Description.protocol_version:r="Unsupported protocol version.";break;case u.Alert.Description.insufficient_security:r="Insufficient security.";break;case u.Alert.Description.internal_error:r="Internal error.";break;case u.Alert.Description.user_canceled:r="User canceled.";break;case u.Alert.Description.no_renegotiation:r="Renegotiation not supported.";break;default:r="Unknown error."}if(n.description===u.Alert.Description.close_notify)return e.close();e.error(e,{message:r,send:!1,origin:e.entity===u.ConnectionEnd.client?"server":"client",alert:n}),e.process()},u.handleHandshake=function(e,t){var r=t.fragment,n=r.getByte(),i=r.getInt24();if(i>r.length())return e.fragmented=t,t.fragment=a.util.createBuffer(),r.read-=4,e.process();e.fragmented=null,r.read-=4;var s=r.bytes(i+4);r.read+=4,n in K[e.entity][e.expect]?(e.entity!==u.ConnectionEnd.server||e.open||e.fail||(e.handshaking=!0,e.session={version:null,extensions:{server_name:{serverNameList:[]}},cipherSuite:null,compressionMethod:null,serverCertificate:null,clientCertificate:null,md5:a.md.md5.create(),sha1:a.md.sha1.create()}),n!==u.HandshakeType.hello_request&&n!==u.HandshakeType.certificate_verify&&n!==u.HandshakeType.finished&&(e.session.md5.update(s),e.session.sha1.update(s)),K[e.entity][e.expect][n](e,t,i)):u.handleUnexpected(e,t)},u.handleApplicationData=function(e,t){e.data.putBuffer(t.fragment),e.dataReady(e),e.process()},u.handleHeartbeat=function(e,t){var r=t.fragment,n=r.getByte(),i=r.getInt16(),s=r.getBytes(i);if(n===u.HeartbeatMessageType.heartbeat_request){if(e.handshaking||i>s.length)return e.process();u.queue(e,u.createRecord(e,{type:u.ContentType.heartbeat,data:u.createHeartbeat(u.HeartbeatMessageType.heartbeat_response,s)})),u.flush(e)}else if(n===u.HeartbeatMessageType.heartbeat_response){if(s!==e.expectedHeartbeatPayload)return e.process();e.heartbeatReceived&&e.heartbeatReceived(e,a.util.createBuffer(s))}e.process()};var l=1,p=2,f=3,h=4,d=5,y=6,g=7,m=8,v=1,C=2,E=3,S=4,T=5,I=6,b=u.handleUnexpected,A=u.handleChangeCipherSpec,B=u.handleAlert,N=u.handleHandshake,k=u.handleApplicationData,w=u.handleHeartbeat,R=[];R[u.ConnectionEnd.client]=[[b,B,N,b,w],[b,B,N,b,w],[b,B,N,b,w],[b,B,N,b,w],[b,B,N,b,w],[A,B,b,b,w],[b,B,N,b,w],[b,B,N,k,w],[b,B,N,b,w]],R[u.ConnectionEnd.server]=[[b,B,N,b,w],[b,B,N,b,w],[b,B,N,b,w],[b,B,N,b,w],[A,B,b,b,w],[b,B,N,b,w],[b,B,N,k,w],[b,B,N,b,w]];var _=u.handleHelloRequest,L=u.handleServerHello,U=u.handleCertificate,D=u.handleServerKeyExchange,P=u.handleCertificateRequest,V=u.handleServerHelloDone,O=u.handleFinished,K=[];K[u.ConnectionEnd.client]=[[b,b,L,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b],[_,b,b,b,b,b,b,b,b,b,b,U,D,P,V,b,b,b,b,b,b],[_,b,b,b,b,b,b,b,b,b,b,b,D,P,V,b,b,b,b,b,b],[_,b,b,b,b,b,b,b,b,b,b,b,b,P,V,b,b,b,b,b,b],[_,b,b,b,b,b,b,b,b,b,b,b,b,b,V,b,b,b,b,b,b],[_,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b],[_,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,O],[_,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b],[_,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b]];var x=u.handleClientHello,M=u.handleClientKeyExchange,F=u.handleCertificateVerify;K[u.ConnectionEnd.server]=[[b,x,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b],[b,b,b,b,b,b,b,b,b,b,b,U,b,b,b,b,b,b,b,b,b],[b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,M,b,b,b,b],[b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,F,b,b,b,b,b],[b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b],[b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,O],[b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b],[b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b]],u.generateKeys=function(e,t){var r=n,a=t.client_random+t.server_random;e.session.resuming||(t.master_secret=r(t.pre_master_secret,"master secret",a,48).bytes(),t.pre_master_secret=null),a=t.server_random+t.client_random;var i=2*t.mac_key_length+2*t.enc_key_length,s=e.version.major===u.Versions.TLS_1_0.major&&e.version.minor===u.Versions.TLS_1_0.minor;s&&(i+=2*t.fixed_iv_length);var o=r(t.master_secret,"key expansion",a,i),c={client_write_MAC_key:o.getBytes(t.mac_key_length),server_write_MAC_key:o.getBytes(t.mac_key_length),client_write_key:o.getBytes(t.enc_key_length),server_write_key:o.getBytes(t.enc_key_length)};return s&&(c.client_write_IV=o.getBytes(t.fixed_iv_length),c.server_write_IV=o.getBytes(t.fixed_iv_length)),c},u.createConnectionState=function(e){var t=e.entity===u.ConnectionEnd.client,r=function(){var e={sequenceNumber:[0,0],macKey:null,macLength:0,macFunction:null,cipherState:null,cipherFunction:function(e){return!0},compressionState:null,compressFunction:function(e){return!0},updateSequenceNumber:function(){4294967295===e.sequenceNumber[1]?(e.sequenceNumber[1]=0,++e.sequenceNumber[0]):++e.sequenceNumber[1]}};return e},a={read:r(),write:r()};if(a.read.update=function(e,t){return a.read.cipherFunction(t,a.read)?a.read.compressFunction(e,t,a.read)||e.error(e,{message:"Could not decompress record.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.decompression_failure}}):e.error(e,{message:"Could not decrypt record or bad MAC.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.bad_record_mac}}),!e.fail},a.write.update=function(e,t){return a.write.compressFunction(e,t,a.write)?a.write.cipherFunction(t,a.write)||e.error(e,{message:"Could not encrypt record.",send:!1,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.internal_error}}):e.error(e,{message:"Could not compress record.",send:!1,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.internal_error}}),!e.fail},e.session){var n=e.session.sp;switch(e.session.cipherSuite.initSecurityParameters(n),n.keys=u.generateKeys(e,n),a.read.macKey=t?n.keys.server_write_MAC_key:n.keys.client_write_MAC_key,a.write.macKey=t?n.keys.client_write_MAC_key:n.keys.server_write_MAC_key,e.session.cipherSuite.initConnectionState(a,e,n),n.compression_algorithm){case u.CompressionMethod.none:break;case u.CompressionMethod.deflate:a.read.compressFunction=s,a.write.compressFunction=i;break;default:throw new Error("Unsupported compression algorithm.")}}return a},u.createRandom=function(){var e=new Date,t=+e+6e4*e.getTimezoneOffset(),r=a.util.createBuffer();return r.putInt32(t),r.putBytes(a.random.getBytes(28)),r},u.createRecord=function(e,t){return t.data?{type:t.type,version:{major:e.version.major,minor:e.version.minor},length:t.data.length(),fragment:t.data}:null},u.createAlert=function(e,t){var r=a.util.createBuffer();return r.putByte(t.level),r.putByte(t.description),u.createRecord(e,{type:u.ContentType.alert,data:r})},u.createClientHello=function(e){e.session.clientHelloVersion={major:e.version.major,minor:e.version.minor};for(var t=a.util.createBuffer(),r=0;r<e.cipherSuites.length;++r){var n=e.cipherSuites[r];t.putByte(n.id[0]),t.putByte(n.id[1])}var i=t.length(),s=a.util.createBuffer();s.putByte(u.CompressionMethod.none);var o=s.length(),l=a.util.createBuffer();if(e.virtualHost){var p=a.util.createBuffer();p.putByte(0),p.putByte(0);var f=a.util.createBuffer();f.putByte(0),c(f,2,a.util.createBuffer(e.virtualHost));var h=a.util.createBuffer();c(h,2,f),c(p,2,h),l.putBuffer(p)}var d=l.length();d>0&&(d+=2);var y=e.session.id,g=y.length+1+2+4+28+2+i+1+o+d,m=a.util.createBuffer();return m.putByte(u.HandshakeType.client_hello),m.putInt24(g),m.putByte(e.version.major),m.putByte(e.version.minor),m.putBytes(e.session.sp.client_random),c(m,1,a.util.createBuffer(y)),c(m,2,t),c(m,1,s),d>0&&c(m,2,l),m},u.createServerHello=function(e){var t=e.session.id,r=t.length+1+2+4+28+2+1,n=a.util.createBuffer();return n.putByte(u.HandshakeType.server_hello),n.putInt24(r),n.putByte(e.version.major),n.putByte(e.version.minor),n.putBytes(e.session.sp.server_random),c(n,1,a.util.createBuffer(t)),n.putByte(e.session.cipherSuite.id[0]),n.putByte(e.session.cipherSuite.id[1]),n.putByte(e.session.compressionMethod),n},u.createCertificate=function(e){var t,r=e.entity===u.ConnectionEnd.client,n=null;e.getCertificate&&(t=r?e.session.certificateRequest:e.session.extensions.server_name.serverNameList,n=e.getCertificate(e,t));var i=a.util.createBuffer();if(null!==n)try{a.util.isArray(n)||(n=[n]);for(var s=null,o=0;o<n.length;++o){var l=a.pem.decode(n[o])[0];if("CERTIFICATE"!==l.type&&"X509 CERTIFICATE"!==l.type&&"TRUSTED CERTIFICATE"!==l.type){var p=new Error('Could not convert certificate from PEM; PEM header type is not "CERTIFICATE", "X509 CERTIFICATE", or "TRUSTED CERTIFICATE".');throw p.headerType=l.type,p}if(l.procType&&"ENCRYPTED"===l.procType.type)throw new Error("Could not convert certificate from PEM; PEM is encrypted.");var f=a.util.createBuffer(l.body);null===s&&(s=a.asn1.fromDer(f.bytes(),!1));var h=a.util.createBuffer();c(h,3,f),i.putBuffer(h)}n=a.pki.certificateFromAsn1(s),r?e.session.clientCertificate=n:e.session.serverCertificate=n}catch(t){return e.error(e,{message:"Could not send certificate list.",cause:t,send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.bad_certificate}})}var d=3+i.length(),y=a.util.createBuffer();return y.putByte(u.HandshakeType.certificate),y.putInt24(d),c(y,3,i),y},u.createClientKeyExchange=function(e){var t=a.util.createBuffer();t.putByte(e.session.clientHelloVersion.major),t.putByte(e.session.clientHelloVersion.minor),t.putBytes(a.random.getBytes(46));var r=e.session.sp;r.pre_master_secret=t.getBytes();var n=(t=e.session.serverCertificate.publicKey.encrypt(r.pre_master_secret)).length+2,i=a.util.createBuffer();return i.putByte(u.HandshakeType.client_key_exchange),i.putInt24(n),i.putInt16(t.length),i.putBytes(t),i},u.createServerKeyExchange=function(e){var t=a.util.createBuffer();return t},u.getClientSignature=function(e,t){var r=a.util.createBuffer();r.putBuffer(e.session.md5.digest()),r.putBuffer(e.session.sha1.digest()),r=r.getBytes(),e.getSignature=e.getSignature||function(e,t,r){var n=null;if(e.getPrivateKey)try{n=e.getPrivateKey(e,e.session.clientCertificate),n=a.pki.privateKeyFromPem(n)}catch(t){e.error(e,{message:"Could not get private key.",cause:t,send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.internal_error}})}null===n?e.error(e,{message:"No private key set.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.internal_error}}):t=n.sign(t,null),r(e,t)},e.getSignature(e,r,t)},u.createCertificateVerify=function(e,t){var r=t.length+2,n=a.util.createBuffer();return n.putByte(u.HandshakeType.certificate_verify),n.putInt24(r),n.putInt16(t.length),n.putBytes(t),n},u.createCertificateRequest=function(e){var t=a.util.createBuffer();t.putByte(1);var r=a.util.createBuffer();for(var n in e.caStore.certs){var i=e.caStore.certs[n],s=a.pki.distinguishedNameToAsn1(i.subject),o=a.asn1.toDer(s);r.putInt16(o.length()),r.putBuffer(o)}var l=1+t.length()+2+r.length(),p=a.util.createBuffer();return p.putByte(u.HandshakeType.certificate_request),p.putInt24(l),c(p,1,t),c(p,2,r),p},u.createServerHelloDone=function(e){var t=a.util.createBuffer();return t.putByte(u.HandshakeType.server_hello_done),t.putInt24(0),t},u.createChangeCipherSpec=function(){var e=a.util.createBuffer();return e.putByte(1),e},u.createFinished=function(e){var t=a.util.createBuffer();t.putBuffer(e.session.md5.digest()),t.putBuffer(e.session.sha1.digest());var r=e.entity===u.ConnectionEnd.client,i=e.session.sp,s=r?"client finished":"server finished";t=n(i.master_secret,s,t.getBytes(),12);var o=a.util.createBuffer();return o.putByte(u.HandshakeType.finished),o.putInt24(t.length()),o.putBuffer(t),o},u.createHeartbeat=function(e,t,r){void 0===r&&(r=t.length);var n=a.util.createBuffer();n.putByte(e),n.putInt16(r),n.putBytes(t);var i=n.length(),s=Math.max(16,i-r-3);return n.putBytes(a.random.getBytes(s)),n},u.queue=function(e,t){if(t&&(0!==t.fragment.length()||t.type!==u.ContentType.handshake&&t.type!==u.ContentType.alert&&t.type!==u.ContentType.change_cipher_spec)){if(t.type===u.ContentType.handshake){var r=t.fragment.bytes();e.session.md5.update(r),e.session.sha1.update(r),r=null}var n;if(t.fragment.length()<=u.MaxFragment)n=[t];else{n=[];for(var i=t.fragment.bytes();i.length>u.MaxFragment;)n.push(u.createRecord(e,{type:t.type,data:a.util.createBuffer(i.slice(0,u.MaxFragment))})),i=i.slice(u.MaxFragment);i.length>0&&n.push(u.createRecord(e,{type:t.type,data:a.util.createBuffer(i)}))}for(var s=0;s<n.length&&!e.fail;++s){var o=n[s];e.state.current.write.update(e,o)&&e.records.push(o)}}},u.flush=function(e){for(var t=0;t<e.records.length;++t){var r=e.records[t];e.tlsData.putByte(r.type),e.tlsData.putByte(r.version.major),e.tlsData.putByte(r.version.minor),e.tlsData.putInt16(r.fragment.length()),e.tlsData.putBuffer(e.records[t].fragment)}return e.records=[],e.tlsDataReady(e)};var j=function(e){switch(e){case!0:return!0;case a.pki.certificateError.bad_certificate:return u.Alert.Description.bad_certificate;case a.pki.certificateError.unsupported_certificate:return u.Alert.Description.unsupported_certificate;case a.pki.certificateError.certificate_revoked:return u.Alert.Description.certificate_revoked;case a.pki.certificateError.certificate_expired:return u.Alert.Description.certificate_expired;case a.pki.certificateError.certificate_unknown:return u.Alert.Description.certificate_unknown;case a.pki.certificateError.unknown_ca:return u.Alert.Description.unknown_ca;default:return u.Alert.Description.bad_certificate}};for(var q in u.verifyCertificateChain=function(e,t){try{var r={};for(var n in e.verifyOptions)r[n]=e.verifyOptions[n];r.verify=function(t,r,n){j(t);var i=e.verify(e,t,r,n);if(!0!==i){if("object"==typeof i&&!a.util.isArray(i)){var s=new Error("The application rejected the certificate.");throw s.send=!0,s.alert={level:u.Alert.Level.fatal,description:u.Alert.Description.bad_certificate},i.message&&(s.message=i.message),i.alert&&(s.alert.description=i.alert),s}i!==t&&(i=function(e){switch(e){case!0:return!0;case u.Alert.Description.bad_certificate:return a.pki.certificateError.bad_certificate;case u.Alert.Description.unsupported_certificate:return a.pki.certificateError.unsupported_certificate;case u.Alert.Description.certificate_revoked:return a.pki.certificateError.certificate_revoked;case u.Alert.Description.certificate_expired:return a.pki.certificateError.certificate_expired;case u.Alert.Description.certificate_unknown:return a.pki.certificateError.certificate_unknown;case u.Alert.Description.unknown_ca:return a.pki.certificateError.unknown_ca;default:return a.pki.certificateError.bad_certificate}}(i))}return i},a.pki.verifyCertificateChain(e.caStore,t,r)}catch(t){var i=t;("object"!=typeof i||a.util.isArray(i))&&(i={send:!0,alert:{level:u.Alert.Level.fatal,description:j(t)}}),"send"in i||(i.send=!0),"alert"in i||(i.alert={level:u.Alert.Level.fatal,description:j(i.error)}),e.error(e,i)}return!e.fail},u.createSessionCache=function(e,t){var r=null;if(e&&e.getSession&&e.setSession&&e.order)r=e;else{for(var n in(r={}).cache=e||{},r.capacity=Math.max(t||100,1),r.order=[],e)r.order.length<=t?r.order.push(n):delete e[n];r.getSession=function(e){var t=null,n=null;if(e?n=a.util.bytesToHex(e):r.order.length>0&&(n=r.order[0]),null!==n&&n in r.cache)for(var i in t=r.cache[n],delete r.cache[n],r.order)if(r.order[i]===n){r.order.splice(i,1);break}return t},r.setSession=function(e,t){if(r.order.length===r.capacity){var n=r.order.shift();delete r.cache[n]}n=a.util.bytesToHex(e);r.order.push(n),r.cache[n]=t}}return r},u.createConnection=function(e){var t=null;t=e.caStore?a.util.isArray(e.caStore)?a.pki.createCaStore(e.caStore):e.caStore:a.pki.createCaStore();var r=e.cipherSuites||null;if(null===r)for(var n in r=[],u.CipherSuites)r.push(u.CipherSuites[n]);var i=e.server?u.ConnectionEnd.server:u.ConnectionEnd.client,s=e.sessionCache?u.createSessionCache(e.sessionCache):null,o={version:{major:u.Version.major,minor:u.Version.minor},entity:i,sessionId:e.sessionId,caStore:t,sessionCache:s,cipherSuites:r,connected:e.connected,virtualHost:e.virtualHost||null,verifyClient:e.verifyClient||!1,verify:e.verify||function(e,t,r,a){return t},verifyOptions:e.verifyOptions||{},getCertificate:e.getCertificate||null,getPrivateKey:e.getPrivateKey||null,getSignature:e.getSignature||null,input:a.util.createBuffer(),tlsData:a.util.createBuffer(),data:a.util.createBuffer(),tlsDataReady:e.tlsDataReady,dataReady:e.dataReady,heartbeatReceived:e.heartbeatReceived,closed:e.closed,error:function(t,r){r.origin=r.origin||(t.entity===u.ConnectionEnd.client?"client":"server"),r.send&&(u.queue(t,u.createAlert(t,r.alert)),u.flush(t));var a=!1!==r.fatal;a&&(t.fail=!0),e.error(t,r),a&&t.close(!1)},deflate:e.deflate||null,inflate:e.inflate||null,reset:function(e){o.version={major:u.Version.major,minor:u.Version.minor},o.record=null,o.session=null,o.peerCertificate=null,o.state={pending:null,current:null},o.expect=(o.entity,u.ConnectionEnd.client,0),o.fragmented=null,o.records=[],o.open=!1,o.handshakes=0,o.handshaking=!1,o.isConnected=!1,o.fail=!(e||void 0===e),o.input.clear(),o.tlsData.clear(),o.data.clear(),o.state.current=u.createConnectionState(o)}};o.reset();return o.handshake=function(e){if(o.entity!==u.ConnectionEnd.client)o.error(o,{message:"Cannot initiate handshake as a server.",fatal:!1});else if(o.handshaking)o.error(o,{message:"Handshake already in progress.",fatal:!1});else{o.fail&&!o.open&&0===o.handshakes&&(o.fail=!1),o.handshaking=!0;var t=null;(e=e||"").length>0&&(o.sessionCache&&(t=o.sessionCache.getSession(e)),null===t&&(e="")),0===e.length&&o.sessionCache&&null!==(t=o.sessionCache.getSession())&&(e=t.id),o.session={id:e,version:null,cipherSuite:null,compressionMethod:null,serverCertificate:null,certificateRequest:null,clientCertificate:null,sp:{},md5:a.md.md5.create(),sha1:a.md.sha1.create()},t&&(o.version=t.version,o.session.sp=t.sp),o.session.sp.client_random=u.createRandom().getBytes(),o.open=!0,u.queue(o,u.createRecord(o,{type:u.ContentType.handshake,data:u.createClientHello(o)})),u.flush(o)}},o.process=function(e){var t=0;return e&&o.input.putBytes(e),o.fail||(null!==o.record&&o.record.ready&&o.record.fragment.isEmpty()&&(o.record=null),null===o.record&&(t=function(e){var t=0,r=e.input,n=r.length();if(n<5)t=5-n;else{e.record={type:r.getByte(),version:{major:r.getByte(),minor:r.getByte()},length:r.getInt16(),fragment:a.util.createBuffer(),ready:!1};var i=e.record.version.major===e.version.major;i&&e.session&&e.session.version&&(i=e.record.version.minor===e.version.minor),i||e.error(e,{message:"Incompatible TLS version.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.protocol_version}})}return t}(o)),o.fail||null===o.record||o.record.ready||(t=function(e){var t=0,r=e.input,a=r.length();a<e.record.length?t=e.record.length-a:(e.record.fragment.putBytes(r.getBytes(e.record.length)),r.compact(),e.state.current.read.update(e,e.record)&&(null!==e.fragmented&&(e.fragmented.type===e.record.type?(e.fragmented.fragment.putBuffer(e.record.fragment),e.record=e.fragmented):e.error(e,{message:"Invalid fragmented record.",send:!0,alert:{level:u.Alert.Level.fatal,description:u.Alert.Description.unexpected_message}})),e.record.ready=!0));return t}(o)),!o.fail&&null!==o.record&&o.record.ready&&function(e,t){var r=t.type-u.ContentType.change_cipher_spec,a=R[e.entity][e.expect];r in a?a[r](e,t):u.handleUnexpected(e,t)}(o,o.record)),t},o.prepare=function(e){return u.queue(o,u.createRecord(o,{type:u.ContentType.application_data,data:a.util.createBuffer(e)})),u.flush(o)},o.prepareHeartbeatRequest=function(e,t){return e instanceof a.util.ByteBuffer&&(e=e.bytes()),void 0===t&&(t=e.length),o.expectedHeartbeatPayload=e,u.queue(o,u.createRecord(o,{type:u.ContentType.heartbeat,data:u.createHeartbeat(u.HeartbeatMessageType.heartbeat_request,e,t)})),u.flush(o)},o.close=function(e){if(!o.fail&&o.sessionCache&&o.session){var t={id:o.session.id,version:o.session.version,sp:o.session.sp};t.sp.keys=null,o.sessionCache.setSession(t.id,t)}o.open&&(o.open=!1,o.input.clear(),(o.isConnected||o.handshaking)&&(o.isConnected=o.handshaking=!1,u.queue(o,u.createAlert(o,{level:u.Alert.Level.warning,description:u.Alert.Description.close_notify})),u.flush(o)),o.closed(o)),o.reset(e)},o},e.exports=a.tls=a.tls||{},u)"function"!=typeof u[q]&&(a.tls[q]=u[q]);a.tls.prf_tls1=n,a.tls.hmac_sha1=function(e,t,r){var n=a.hmac.create();n.start("SHA1",e);var i=a.util.createBuffer();return i.putInt32(t[0]),i.putInt32(t[1]),i.putByte(r.type),i.putByte(r.version.major),i.putByte(r.version.minor),i.putInt16(r.length),i.putBytes(r.fragment.bytes()),n.update(i.getBytes()),n.digest().getBytes()},a.tls.createSessionCache=u.createSessionCache,a.tls.createConnection=u.createConnection},function(e,t,r){var a=r(0);r(3),r(6),r(22),r(7),r(15),r(28),r(18),r(11),r(1),r(17);var n=a.asn1,i=e.exports=a.pki=a.pki||{};i.pemToDer=function(e){var t=a.pem.decode(e)[0];if(t.procType&&"ENCRYPTED"===t.procType.type)throw new Error("Could not convert PEM to DER; PEM is encrypted.");return a.util.createBuffer(t.body)},i.privateKeyFromPem=function(e){var t=a.pem.decode(e)[0];if("PRIVATE KEY"!==t.type&&"RSA PRIVATE KEY"!==t.type){var r=new Error('Could not convert private key from PEM; PEM header type is not "PRIVATE KEY" or "RSA PRIVATE KEY".');throw r.headerType=t.type,r}if(t.procType&&"ENCRYPTED"===t.procType.type)throw new Error("Could not convert private key from PEM; PEM is encrypted.");var s=n.fromDer(t.body);return i.privateKeyFromAsn1(s)},i.privateKeyToPem=function(e,t){var r={type:"RSA PRIVATE KEY",body:n.toDer(i.privateKeyToAsn1(e)).getBytes()};return a.pem.encode(r,{maxline:t})},i.privateKeyInfoToPem=function(e,t){var r={type:"PRIVATE KEY",body:n.toDer(e).getBytes()};return a.pem.encode(r,{maxline:t})}},function(e,t,r){var a=r(0);if(r(5),r(3),r(10),r(4),r(6),r(15),r(7),r(2),r(25),r(11),r(1),void 0===n)var n=a.jsbn.BigInteger;var i=a.asn1,s=a.pki=a.pki||{};e.exports=s.pbe=a.pbe=a.pbe||{};var o=s.oids,c={name:"EncryptedPrivateKeyInfo",tagClass:i.Class.UNIVERSAL,type:i.Type.SEQUENCE,constructed:!0,value:[{name:"EncryptedPrivateKeyInfo.encryptionAlgorithm",tagClass:i.Class.UNIVERSAL,type:i.Type.SEQUENCE,constructed:!0,value:[{name:"AlgorithmIdentifier.algorithm",tagClass:i.Class.UNIVERSAL,type:i.Type.OID,constructed:!1,capture:"encryptionOid"},{name:"AlgorithmIdentifier.parameters",tagClass:i.Class.UNIVERSAL,type:i.Type.SEQUENCE,constructed:!0,captureAsn1:"encryptionParams"}]},{name:"EncryptedPrivateKeyInfo.encryptedData",tagClass:i.Class.UNIVERSAL,type:i.Type.OCTETSTRING,constructed:!1,capture:"encryptedData"}]},u={name:"PBES2Algorithms",tagClass:i.Class.UNIVERSAL,type:i.Type.SEQUENCE,constructed:!0,value:[{name:"PBES2Algorithms.keyDerivationFunc",tagClass:i.Class.UNIVERSAL,type:i.Type.SEQUENCE,constructed:!0,value:[{name:"PBES2Algorithms.keyDerivationFunc.oid",tagClass:i.Class.UNIVERSAL,type:i.Type.OID,constructed:!1,capture:"kdfOid"},{name:"PBES2Algorithms.params",tagClass:i.Class.UNIVERSAL,type:i.Type.SEQUENCE,constructed:!0,value:[{name:"PBES2Algorithms.params.salt",tagClass:i.Class.UNIVERSAL,type:i.Type.OCTETSTRING,constructed:!1,capture:"kdfSalt"},{name:"PBES2Algorithms.params.iterationCount",tagClass:i.Class.UNIVERSAL,type:i.Type.INTEGER,constructed:!1,capture:"kdfIterationCount"},{name:"PBES2Algorithms.params.keyLength",tagClass:i.Class.UNIVERSAL,type:i.Type.INTEGER,constructed:!1,optional:!0,capture:"keyLength"},{name:"PBES2Algorithms.params.prf",tagClass:i.Class.UNIVERSAL,type:i.Type.SEQUENCE,constructed:!0,optional:!0,value:[{name:"PBES2Algorithms.params.prf.algorithm",tagClass:i.Class.UNIVERSAL,type:i.Type.OID,constructed:!1,capture:"prfOid"}]}]}]},{name:"PBES2Algorithms.encryptionScheme",tagClass:i.Class.UNIVERSAL,type:i.Type.SEQUENCE,constructed:!0,value:[{name:"PBES2Algorithms.encryptionScheme.oid",tagClass:i.Class.UNIVERSAL,type:i.Type.OID,constructed:!1,capture:"encOid"},{name:"PBES2Algorithms.encryptionScheme.iv",tagClass:i.Class.UNIVERSAL,type:i.Type.OCTETSTRING,constructed:!1,capture:"encIv"}]}]},l={name:"pkcs-12PbeParams",tagClass:i.Class.UNIVERSAL,type:i.Type.SEQUENCE,constructed:!0,value:[{name:"pkcs-12PbeParams.salt",tagClass:i.Class.UNIVERSAL,type:i.Type.OCTETSTRING,constructed:!1,capture:"salt"},{name:"pkcs-12PbeParams.iterations",tagClass:i.Class.UNIVERSAL,type:i.Type.INTEGER,constructed:!1,capture:"iterations"}]};function p(e,t){return e.start().update(t).digest().getBytes()}function f(e){var t;if(e){if(!(t=s.oids[i.derToOid(e)])){var r=new Error("Unsupported PRF OID.");throw r.oid=e,r.supported=["hmacWithSHA1","hmacWithSHA224","hmacWithSHA256","hmacWithSHA384","hmacWithSHA512"],r}}else t="hmacWithSHA1";return h(t)}function h(e){var t=a.md;switch(e){case"hmacWithSHA224":t=a.md.sha512;case"hmacWithSHA1":case"hmacWithSHA256":case"hmacWithSHA384":case"hmacWithSHA512":e=e.substr(8).toLowerCase();break;default:var r=new Error("Unsupported PRF algorithm.");throw r.algorithm=e,r.supported=["hmacWithSHA1","hmacWithSHA224","hmacWithSHA256","hmacWithSHA384","hmacWithSHA512"],r}if(!t||!(e in t))throw new Error("Unknown hash algorithm: "+e);return t[e].create()}s.encryptPrivateKeyInfo=function(e,t,r){(r=r||{}).saltSize=r.saltSize||8,r.count=r.count||2048,r.algorithm=r.algorithm||"aes128",r.prfAlgorithm=r.prfAlgorithm||"sha1";var n,c,u,l=a.random.getBytesSync(r.saltSize),p=r.count,f=i.integerToDer(p);if(0===r.algorithm.indexOf("aes")||"des"===r.algorithm){var d,y,g;switch(r.algorithm){case"aes128":n=16,d=16,y=o["aes128-CBC"],g=a.aes.createEncryptionCipher;break;case"aes192":n=24,d=16,y=o["aes192-CBC"],g=a.aes.createEncryptionCipher;break;case"aes256":n=32,d=16,y=o["aes256-CBC"],g=a.aes.createEncryptionCipher;break;case"des":n=8,d=8,y=o.desCBC,g=a.des.createEncryptionCipher;break;default:throw(T=new Error("Cannot encrypt private key. Unknown encryption algorithm.")).algorithm=r.algorithm,T}var m="hmacWith"+r.prfAlgorithm.toUpperCase(),v=h(m),C=a.pkcs5.pbkdf2(t,l,p,n,v),E=a.random.getBytesSync(d);(I=g(C)).start(E),I.update(i.toDer(e)),I.finish(),u=I.output.getBytes();var S=function(e,t,r,n){var o=i.create(i.Class.UNIVERSAL,i.Type.SEQUENCE,!0,[i.create(i.Class.UNIVERSAL,i.Type.OCTETSTRING,!1,e),i.create(i.Class.UNIVERSAL,i.Type.INTEGER,!1,t.getBytes())]);"hmacWithSHA1"!==n&&o.value.push(i.create(i.Class.UNIVERSAL,i.Type.INTEGER,!1,a.util.hexToBytes(r.toString(16))),i.create(i.Class.UNIVERSAL,i.Type.SEQUENCE,!0,[i.create(i.Class.UNIVERSAL,i.Type.OID,!1,i.oidToDer(s.oids[n]).getBytes()),i.create(i.Class.UNIVERSAL,i.Type.NULL,!1,"")]));return o}(l,f,n,m);c=i.create(i.Class.UNIVERSAL,i.Type.SEQUENCE,!0,[i.create(i.Class.UNIVERSAL,i.Type.OID,!1,i.oidToDer(o.pkcs5PBES2).getBytes()),i.create(i.Class.UNIVERSAL,i.Type.SEQUENCE,!0,[i.create(i.Class.UNIVERSAL,i.Type.SEQUENCE,!0,[i.create(i.Class.UNIVERSAL,i.Type.OID,!1,i.oidToDer(o.pkcs5PBKDF2).getBytes()),S]),i.create(i.Class.UNIVERSAL,i.Type.SEQUENCE,!0,[i.create(i.Class.UNIVERSAL,i.Type.OID,!1,i.oidToDer(y).getBytes()),i.create(i.Class.UNIVERSAL,i.Type.OCTETSTRING,!1,E)])])])}else{var T;if("3des"!==r.algorithm)throw(T=new Error("Cannot encrypt private key. Unknown encryption algorithm.")).algorithm=r.algorithm,T;n=24;var I,b=new a.util.ByteBuffer(l);C=s.pbe.generatePkcs12Key(t,b,1,p,n),E=s.pbe.generatePkcs12Key(t,b,2,p,n);(I=a.des.createEncryptionCipher(C)).start(E),I.update(i.toDer(e)),I.finish(),u=I.output.getBytes(),c=i.create(i.Class.UNIVERSAL,i.Type.SEQUENCE,!0,[i.create(i.Class.UNIVERSAL,i.Type.OID,!1,i.oidToDer(o["pbeWithSHAAnd3-KeyTripleDES-CBC"]).getBytes()),i.create(i.Class.UNIVERSAL,i.Type.SEQUENCE,!0,[i.create(i.Class.UNIVERSAL,i.Type.OCTETSTRING,!1,l),i.create(i.Class.UNIVERSAL,i.Type.INTEGER,!1,f.getBytes())])])}return i.create(i.Class.UNIVERSAL,i.Type.SEQUENCE,!0,[c,i.create(i.Class.UNIVERSAL,i.Type.OCTETSTRING,!1,u)])},s.decryptPrivateKeyInfo=function(e,t){var r=null,n={},o=[];if(!i.validate(e,c,n,o)){var u=new Error("Cannot read encrypted private key. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");throw u.errors=o,u}var l=i.derToOid(n.encryptionOid),p=s.pbe.getCipher(l,n.encryptionParams,t),f=a.util.createBuffer(n.encryptedData);return p.update(f),p.finish()&&(r=i.fromDer(p.output)),r},s.encryptedPrivateKeyToPem=function(e,t){var r={type:"ENCRYPTED PRIVATE KEY",body:i.toDer(e).getBytes()};return a.pem.encode(r,{maxline:t})},s.encryptedPrivateKeyFromPem=function(e){var t=a.pem.decode(e)[0];if("ENCRYPTED PRIVATE KEY"!==t.type){var r=new Error('Could not convert encrypted private key from PEM; PEM header type is "ENCRYPTED PRIVATE KEY".');throw r.headerType=t.type,r}if(t.procType&&"ENCRYPTED"===t.procType.type)throw new Error("Could not convert encrypted private key from PEM; PEM is encrypted.");return i.fromDer(t.body)},s.encryptRsaPrivateKey=function(e,t,r){if(!(r=r||{}).legacy){var n=s.wrapRsaPrivateKey(s.privateKeyToAsn1(e));return n=s.encryptPrivateKeyInfo(n,t,r),s.encryptedPrivateKeyToPem(n)}var o,c,u,l;switch(r.algorithm){case"aes128":o="AES-128-CBC",u=16,c=a.random.getBytesSync(16),l=a.aes.createEncryptionCipher;break;case"aes192":o="AES-192-CBC",u=24,c=a.random.getBytesSync(16),l=a.aes.createEncryptionCipher;break;case"aes256":o="AES-256-CBC",u=32,c=a.random.getBytesSync(16),l=a.aes.createEncryptionCipher;break;case"3des":o="DES-EDE3-CBC",u=24,c=a.random.getBytesSync(8),l=a.des.createEncryptionCipher;break;case"des":o="DES-CBC",u=8,c=a.random.getBytesSync(8),l=a.des.createEncryptionCipher;break;default:var p=new Error('Could not encrypt RSA private key; unsupported encryption algorithm "'+r.algorithm+'".');throw p.algorithm=r.algorithm,p}var f=l(a.pbe.opensslDeriveBytes(t,c.substr(0,8),u));f.start(c),f.update(i.toDer(s.privateKeyToAsn1(e))),f.finish();var h={type:"RSA PRIVATE KEY",procType:{version:"4",type:"ENCRYPTED"},dekInfo:{algorithm:o,parameters:a.util.bytesToHex(c).toUpperCase()},body:f.output.getBytes()};return a.pem.encode(h)},s.decryptRsaPrivateKey=function(e,t){var r=null,n=a.pem.decode(e)[0];if("ENCRYPTED PRIVATE KEY"!==n.type&&"PRIVATE KEY"!==n.type&&"RSA PRIVATE KEY"!==n.type)throw(u=new Error('Could not convert private key from PEM; PEM header type is not "ENCRYPTED PRIVATE KEY", "PRIVATE KEY", or "RSA PRIVATE KEY".')).headerType=u,u;if(n.procType&&"ENCRYPTED"===n.procType.type){var o,c;switch(n.dekInfo.algorithm){case"DES-CBC":o=8,c=a.des.createDecryptionCipher;break;case"DES-EDE3-CBC":o=24,c=a.des.createDecryptionCipher;break;case"AES-128-CBC":o=16,c=a.aes.createDecryptionCipher;break;case"AES-192-CBC":o=24,c=a.aes.createDecryptionCipher;break;case"AES-256-CBC":o=32,c=a.aes.createDecryptionCipher;break;case"RC2-40-CBC":o=5,c=function(e){return a.rc2.createDecryptionCipher(e,40)};break;case"RC2-64-CBC":o=8,c=function(e){return a.rc2.createDecryptionCipher(e,64)};break;case"RC2-128-CBC":o=16,c=function(e){return a.rc2.createDecryptionCipher(e,128)};break;default:var u;throw(u=new Error('Could not decrypt private key; unsupported encryption algorithm "'+n.dekInfo.algorithm+'".')).algorithm=n.dekInfo.algorithm,u}var l=a.util.hexToBytes(n.dekInfo.parameters),p=c(a.pbe.opensslDeriveBytes(t,l.substr(0,8),o));if(p.start(l),p.update(a.util.createBuffer(n.body)),!p.finish())return r;r=p.output.getBytes()}else r=n.body;return null!==(r="ENCRYPTED PRIVATE KEY"===n.type?s.decryptPrivateKeyInfo(i.fromDer(r),t):i.fromDer(r))&&(r=s.privateKeyFromAsn1(r)),r},s.pbe.generatePkcs12Key=function(e,t,r,n,i,s){var o,c;if(null==s){if(!("sha1"in a.md))throw new Error('"sha1" hash algorithm unavailable.');s=a.md.sha1.create()}var u=s.digestLength,l=s.blockLength,p=new a.util.ByteBuffer,f=new a.util.ByteBuffer;if(null!=e){for(c=0;c<e.length;c++)f.putInt16(e.charCodeAt(c));f.putInt16(0)}var h=f.length(),d=t.length(),y=new a.util.ByteBuffer;y.fillWithByte(r,l);var g=l*Math.ceil(d/l),m=new a.util.ByteBuffer;for(c=0;c<g;c++)m.putByte(t.at(c%d));var v=l*Math.ceil(h/l),C=new a.util.ByteBuffer;for(c=0;c<v;c++)C.putByte(f.at(c%h));var E=m;E.putBuffer(C);for(var S=Math.ceil(i/u),T=1;T<=S;T++){var I=new a.util.ByteBuffer;I.putBytes(y.bytes()),I.putBytes(E.bytes());for(var b=0;b<n;b++)s.start(),s.update(I.getBytes()),I=s.digest();var A=new a.util.ByteBuffer;for(c=0;c<l;c++)A.putByte(I.at(c%u));var B=Math.ceil(d/l)+Math.ceil(h/l),N=new a.util.ByteBuffer;for(o=0;o<B;o++){var k=new a.util.ByteBuffer(E.getBytes(l)),w=511;for(c=A.length()-1;c>=0;c--)w>>=8,w+=A.at(c)+k.at(c),k.setAt(c,255&w);N.putBuffer(k)}E=N,p.putBuffer(I)}return p.truncate(p.length()-i),p},s.pbe.getCipher=function(e,t,r){switch(e){case s.oids.pkcs5PBES2:return s.pbe.getCipherForPBES2(e,t,r);case s.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:case s.oids["pbewithSHAAnd40BitRC2-CBC"]:return s.pbe.getCipherForPKCS12PBE(e,t,r);default:var a=new Error("Cannot read encrypted PBE data block. Unsupported OID.");throw a.oid=e,a.supportedOids=["pkcs5PBES2","pbeWithSHAAnd3-KeyTripleDES-CBC","pbewithSHAAnd40BitRC2-CBC"],a}},s.pbe.getCipherForPBES2=function(e,t,r){var n,o={},c=[];if(!i.validate(t,u,o,c))throw(n=new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.")).errors=c,n;if((e=i.derToOid(o.kdfOid))!==s.oids.pkcs5PBKDF2)throw(n=new Error("Cannot read encrypted private key. Unsupported key derivation function OID.")).oid=e,n.supportedOids=["pkcs5PBKDF2"],n;if((e=i.derToOid(o.encOid))!==s.oids["aes128-CBC"]&&e!==s.oids["aes192-CBC"]&&e!==s.oids["aes256-CBC"]&&e!==s.oids["des-EDE3-CBC"]&&e!==s.oids.desCBC)throw(n=new Error("Cannot read encrypted private key. Unsupported encryption scheme OID.")).oid=e,n.supportedOids=["aes128-CBC","aes192-CBC","aes256-CBC","des-EDE3-CBC","desCBC"],n;var l,p,h=o.kdfSalt,d=a.util.createBuffer(o.kdfIterationCount);switch(d=d.getInt(d.length()<<3),s.oids[e]){case"aes128-CBC":l=16,p=a.aes.createDecryptionCipher;break;case"aes192-CBC":l=24,p=a.aes.createDecryptionCipher;break;case"aes256-CBC":l=32,p=a.aes.createDecryptionCipher;break;case"des-EDE3-CBC":l=24,p=a.des.createDecryptionCipher;break;case"desCBC":l=8,p=a.des.createDecryptionCipher}var y=f(o.prfOid),g=a.pkcs5.pbkdf2(r,h,d,l,y),m=o.encIv,v=p(g);return v.start(m),v},s.pbe.getCipherForPKCS12PBE=function(e,t,r){var n={},o=[];if(!i.validate(t,l,n,o))throw(y=new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.")).errors=o,y;var c,u,p,h=a.util.createBuffer(n.salt),d=a.util.createBuffer(n.iterations);switch(d=d.getInt(d.length()<<3),e){case s.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:c=24,u=8,p=a.des.startDecrypting;break;case s.oids["pbewithSHAAnd40BitRC2-CBC"]:c=5,u=8,p=function(e,t){var r=a.rc2.createDecryptionCipher(e,40);return r.start(t,null),r};break;default:var y;throw(y=new Error("Cannot read PKCS #12 PBE data block. Unsupported OID.")).oid=e,y}var g=f(n.prfOid),m=s.pbe.generatePkcs12Key(r,h,1,d,c,g);return g.start(),p(m,s.pbe.generatePkcs12Key(r,h,2,d,u,g))},s.pbe.opensslDeriveBytes=function(e,t,r,n){if(null==n){if(!("md5"in a.md))throw new Error('"md5" hash algorithm unavailable.');n=a.md.md5.create()}null===t&&(t="");for(var i=[p(n,e+t)],s=16,o=1;s<r;++o,s+=16)i.push(p(n,i[o-1]+e+t));return i.join("").substr(0,r)}},function(e,t,r){var a=r(0);r(4),r(1);var n=e.exports=a.sha256=a.sha256||{};a.md.sha256=a.md.algorithms.sha256=n,n.create=function(){s||(i=String.fromCharCode(128),i+=a.util.fillString(String.fromCharCode(0),64),o=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],s=!0);var e=null,t=a.util.createBuffer(),r=new Array(64),n={algorithm:"sha256",blockLength:64,digestLength:32,messageLength:0,fullMessageLength:null,messageLengthSize:8,start:function(){n.messageLength=0,n.fullMessageLength=n.messageLength64=[];for(var r=n.messageLengthSize/4,i=0;i<r;++i)n.fullMessageLength.push(0);return t=a.util.createBuffer(),e={h0:1779033703,h1:3144134277,h2:1013904242,h3:2773480762,h4:1359893119,h5:2600822924,h6:528734635,h7:1541459225},n}};return n.start(),n.update=function(i,s){"utf8"===s&&(i=a.util.encodeUtf8(i));var o=i.length;n.messageLength+=o,o=[o/4294967296>>>0,o>>>0];for(var u=n.fullMessageLength.length-1;u>=0;--u)n.fullMessageLength[u]+=o[1],o[1]=o[0]+(n.fullMessageLength[u]/4294967296>>>0),n.fullMessageLength[u]=n.fullMessageLength[u]>>>0,o[0]=o[1]/4294967296>>>0;return t.putBytes(i),c(e,r,t),(t.read>2048||0===t.length())&&t.compact(),n},n.digest=function(){var s=a.util.createBuffer();s.putBytes(t.bytes());var o,u=n.fullMessageLength[n.fullMessageLength.length-1]+n.messageLengthSize&n.blockLength-1;s.putBytes(i.substr(0,n.blockLength-u));for(var l=8*n.fullMessageLength[0],p=0;p<n.fullMessageLength.length-1;++p)l+=(o=8*n.fullMessageLength[p+1])/4294967296>>>0,s.putInt32(l>>>0),l=o>>>0;s.putInt32(l);var f={h0:e.h0,h1:e.h1,h2:e.h2,h3:e.h3,h4:e.h4,h5:e.h5,h6:e.h6,h7:e.h7};c(f,r,s);var h=a.util.createBuffer();return h.putInt32(f.h0),h.putInt32(f.h1),h.putInt32(f.h2),h.putInt32(f.h3),h.putInt32(f.h4),h.putInt32(f.h5),h.putInt32(f.h6),h.putInt32(f.h7),h},n};var i=null,s=!1,o=null;function c(e,t,r){for(var a,n,i,s,c,u,l,p,f,h,d,y,g,m=r.length();m>=64;){for(c=0;c<16;++c)t[c]=r.getInt32();for(;c<64;++c)a=((a=t[c-2])>>>17|a<<15)^(a>>>19|a<<13)^a>>>10,n=((n=t[c-15])>>>7|n<<25)^(n>>>18|n<<14)^n>>>3,t[c]=a+t[c-7]+n+t[c-16]|0;for(u=e.h0,l=e.h1,p=e.h2,f=e.h3,h=e.h4,d=e.h5,y=e.h6,g=e.h7,c=0;c<64;++c)i=(u>>>2|u<<30)^(u>>>13|u<<19)^(u>>>22|u<<10),s=u&l|p&(u^l),a=g+((h>>>6|h<<26)^(h>>>11|h<<21)^(h>>>25|h<<7))+(y^h&(d^y))+o[c]+t[c],g=y,y=d,d=h,h=f+a>>>0,f=p,p=l,l=u,u=a+(n=i+s)>>>0;e.h0=e.h0+u|0,e.h1=e.h1+l|0,e.h2=e.h2+p|0,e.h3=e.h3+f|0,e.h4=e.h4+h|0,e.h5=e.h5+d|0,e.h6=e.h6+y|0,e.h7=e.h7+g|0,m-=64}}},function(e,t,r){var a=r(0);r(1);var n=null;!a.util.isNodejs||a.options.usePureJavaScript||process.versions["node-webkit"]||(n=r(16)),(e.exports=a.prng=a.prng||{}).create=function(e){for(var t={plugin:e,key:null,seed:null,time:null,reseeds:0,generated:0,keyBytes:""},r=e.md,i=new Array(32),s=0;s<32;++s)i[s]=r.create();function o(){if(t.pools[0].messageLength>=32)return c();var e=32-t.pools[0].messageLength<<5;t.collect(t.seedFileSync(e)),c()}function c(){t.reseeds=4294967295===t.reseeds?0:t.reseeds+1;var e=t.plugin.md.create();e.update(t.keyBytes);for(var r=1,a=0;a<32;++a)t.reseeds%r==0&&(e.update(t.pools[a].digest().getBytes()),t.pools[a].start()),r<<=1;t.keyBytes=e.digest().getBytes(),e.start(),e.update(t.keyBytes);var n=e.digest().getBytes();t.key=t.plugin.formatKey(t.keyBytes),t.seed=t.plugin.formatSeed(n),t.generated=0}function u(e){var t=null,r=a.util.globalScope,n=r.crypto||r.msCrypto;n&&n.getRandomValues&&(t=function(e){return n.getRandomValues(e)});var i=a.util.createBuffer();if(t)for(;i.length()<e;){var s=Math.max(1,Math.min(e-i.length(),65536)/4),o=new Uint32Array(Math.floor(s));try{t(o);for(var c=0;c<o.length;++c)i.putInt32(o[c])}catch(e){if(!("undefined"!=typeof QuotaExceededError&&e instanceof QuotaExceededError))throw e}}if(i.length()<e)for(var u,l,p,f=Math.floor(65536*Math.random());i.length()<e;){l=16807*(65535&f),l+=(32767&(u=16807*(f>>16)))<<16,f=4294967295&(l=(2147483647&(l+=u>>15))+(l>>31));for(c=0;c<3;++c)p=f>>>(c<<3),p^=Math.floor(256*Math.random()),i.putByte(String.fromCharCode(255&p))}return i.getBytes(e)}return t.pools=i,t.pool=0,t.generate=function(e,r){if(!r)return t.generateSync(e);var n=t.plugin.cipher,i=t.plugin.increment,s=t.plugin.formatKey,o=t.plugin.formatSeed,u=a.util.createBuffer();t.key=null,function l(p){if(p)return r(p);if(u.length()>=e)return r(null,u.getBytes(e));t.generated>1048575&&(t.key=null);if(null===t.key)return a.util.nextTick((function(){!function(e){if(t.pools[0].messageLength>=32)return c(),e();var r=32-t.pools[0].messageLength<<5;t.seedFile(r,(function(r,a){if(r)return e(r);t.collect(a),c(),e()}))}(l)}));var f=n(t.key,t.seed);t.generated+=f.length,u.putBytes(f),t.key=s(n(t.key,i(t.seed))),t.seed=o(n(t.key,t.seed)),a.util.setImmediate(l)}()},t.generateSync=function(e){var r=t.plugin.cipher,n=t.plugin.increment,i=t.plugin.formatKey,s=t.plugin.formatSeed;t.key=null;for(var c=a.util.createBuffer();c.length()<e;){t.generated>1048575&&(t.key=null),null===t.key&&o();var u=r(t.key,t.seed);t.generated+=u.length,c.putBytes(u),t.key=i(r(t.key,n(t.seed))),t.seed=s(r(t.key,t.seed))}return c.getBytes(e)},n?(t.seedFile=function(e,t){n.randomBytes(e,(function(e,r){if(e)return t(e);t(null,r.toString())}))},t.seedFileSync=function(e){return n.randomBytes(e).toString()}):(t.seedFile=function(e,t){try{t(null,u(e))}catch(e){t(e)}},t.seedFileSync=u),t.collect=function(e){for(var r=e.length,a=0;a<r;++a)t.pools[t.pool].update(e.substr(a,1)),t.pool=31===t.pool?0:t.pool+1},t.collectInt=function(e,r){for(var a="",n=0;n<r;n+=8)a+=String.fromCharCode(e>>n&255);t.collect(a)},t.registerWorker=function(e){if(e===self)t.seedFile=function(e,t){self.addEventListener("message",(function e(r){var a=r.data;a.forge&&a.forge.prng&&(self.removeEventListener("message",e),t(a.forge.prng.err,a.forge.prng.bytes))})),self.postMessage({forge:{prng:{needed:e}}})};else{e.addEventListener("message",(function(r){var a=r.data;a.forge&&a.forge.prng&&t.seedFile(a.forge.prng.needed,(function(t,r){e.postMessage({forge:{prng:{err:t,bytes:r}}})}))}))}},t}},function(e,t,r){var a=r(0);r(1);var n=[217,120,249,196,25,221,181,237,40,233,253,121,74,160,216,157,198,126,55,131,43,118,83,142,98,76,100,136,68,139,251,162,23,154,89,245,135,179,79,19,97,69,109,141,9,129,125,50,189,143,64,235,134,183,123,11,240,149,33,34,92,107,78,130,84,214,101,147,206,96,178,28,115,86,192,20,167,140,241,220,18,117,202,31,59,190,228,209,66,61,212,48,163,60,182,38,111,191,14,218,70,105,7,87,39,242,29,155,188,148,67,3,248,17,199,246,144,239,62,231,6,195,213,47,200,102,30,215,8,232,234,222,128,82,238,247,132,170,114,172,53,77,106,42,150,26,210,113,90,21,73,116,75,159,208,94,4,24,164,236,194,224,65,110,15,81,203,204,36,145,175,80,161,244,112,57,153,124,58,133,35,184,180,122,252,2,54,91,37,85,151,49,45,93,250,152,227,138,146,174,5,223,41,16,103,108,186,201,211,0,230,207,225,158,168,44,99,22,1,63,88,226,137,169,13,56,52,27,171,51,255,176,187,72,12,95,185,177,205,46,197,243,219,71,229,165,156,119,10,166,32,104,254,127,193,173],i=[1,2,3,5],s=function(e,t){return e<<t&65535|(65535&e)>>16-t},o=function(e,t){return(65535&e)>>t|e<<16-t&65535};e.exports=a.rc2=a.rc2||{},a.rc2.expandKey=function(e,t){"string"==typeof e&&(e=a.util.createBuffer(e)),t=t||128;var r,i=e,s=e.length(),o=t,c=Math.ceil(o/8),u=255>>(7&o);for(r=s;r<128;r++)i.putByte(n[i.at(r-1)+i.at(r-s)&255]);for(i.setAt(128-c,n[i.at(128-c)&u]),r=127-c;r>=0;r--)i.setAt(r,n[i.at(r+1)^i.at(r+c)]);return i};var c=function(e,t,r){var n,c,u,l,p=!1,f=null,h=null,d=null,y=[];for(e=a.rc2.expandKey(e,t),u=0;u<64;u++)y.push(e.getInt16Le());r?(n=function(e){for(u=0;u<4;u++)e[u]+=y[l]+(e[(u+3)%4]&e[(u+2)%4])+(~e[(u+3)%4]&e[(u+1)%4]),e[u]=s(e[u],i[u]),l++},c=function(e){for(u=0;u<4;u++)e[u]+=y[63&e[(u+3)%4]]}):(n=function(e){for(u=3;u>=0;u--)e[u]=o(e[u],i[u]),e[u]-=y[l]+(e[(u+3)%4]&e[(u+2)%4])+(~e[(u+3)%4]&e[(u+1)%4]),l--},c=function(e){for(u=3;u>=0;u--)e[u]-=y[63&e[(u+3)%4]]});var g=function(e){var t=[];for(u=0;u<4;u++){var a=f.getInt16Le();null!==d&&(r?a^=d.getInt16Le():d.putInt16Le(a)),t.push(65535&a)}l=r?0:63;for(var n=0;n<e.length;n++)for(var i=0;i<e[n][0];i++)e[n][1](t);for(u=0;u<4;u++)null!==d&&(r?d.putInt16Le(t[u]):t[u]^=d.getInt16Le()),h.putInt16Le(t[u])},m=null;return m={start:function(e,t){e&&"string"==typeof e&&(e=a.util.createBuffer(e)),p=!1,f=a.util.createBuffer(),h=t||new a.util.createBuffer,d=e,m.output=h},update:function(e){for(p||f.putBuffer(e);f.length()>=8;)g([[5,n],[1,c],[6,n],[1,c],[5,n]])},finish:function(e){var t=!0;if(r)if(e)t=e(8,f,!r);else{var a=8===f.length()?8:8-f.length();f.fillWithByte(a,a)}if(t&&(p=!0,m.update()),!r&&(t=0===f.length()))if(e)t=e(8,h,!r);else{var n=h.length(),i=h.at(n-1);i>n?t=!1:h.truncate(i)}return t}}};a.rc2.startEncrypting=function(e,t,r){var n=a.rc2.createEncryptionCipher(e,128);return n.start(t,r),n},a.rc2.createEncryptionCipher=function(e,t){return c(e,t,!0)},a.rc2.startDecrypting=function(e,t,r){var n=a.rc2.createDecryptionCipher(e,128);return n.start(t,r),n},a.rc2.createDecryptionCipher=function(e,t){return c(e,t,!1)}},function(e,t,r){var a=r(0);r(1),r(2),r(9);var n=e.exports=a.pkcs1=a.pkcs1||{};function i(e,t,r){r||(r=a.md.sha1.create());for(var n="",i=Math.ceil(t/r.digestLength),s=0;s<i;++s){var o=String.fromCharCode(s>>24&255,s>>16&255,s>>8&255,255&s);r.start(),r.update(e+o),n+=r.digest().getBytes()}return n.substring(0,t)}n.encode_rsa_oaep=function(e,t,r){var n,s,o,c;"string"==typeof r?(n=r,s=arguments[3]||void 0,o=arguments[4]||void 0):r&&(n=r.label||void 0,s=r.seed||void 0,o=r.md||void 0,r.mgf1&&r.mgf1.md&&(c=r.mgf1.md)),o?o.start():o=a.md.sha1.create(),c||(c=o);var u=Math.ceil(e.n.bitLength()/8),l=u-2*o.digestLength-2;if(t.length>l)throw(g=new Error("RSAES-OAEP input message length is too long.")).length=t.length,g.maxLength=l,g;n||(n=""),o.update(n,"raw");for(var p=o.digest(),f="",h=l-t.length,d=0;d<h;d++)f+="\0";var y=p.getBytes()+f+""+t;if(s){if(s.length!==o.digestLength){var g;throw(g=new Error("Invalid RSAES-OAEP seed. The seed length must match the digest length.")).seedLength=s.length,g.digestLength=o.digestLength,g}}else s=a.random.getBytes(o.digestLength);var m=i(s,u-o.digestLength-1,c),v=a.util.xorBytes(y,m,y.length),C=i(v,o.digestLength,c),E=a.util.xorBytes(s,C,s.length);return"\0"+E+v},n.decode_rsa_oaep=function(e,t,r){var n,s,o;"string"==typeof r?(n=r,s=arguments[3]||void 0):r&&(n=r.label||void 0,s=r.md||void 0,r.mgf1&&r.mgf1.md&&(o=r.mgf1.md));var c=Math.ceil(e.n.bitLength()/8);if(t.length!==c)throw(v=new Error("RSAES-OAEP encoded message length is invalid.")).length=t.length,v.expectedLength=c,v;if(void 0===s?s=a.md.sha1.create():s.start(),o||(o=s),c<2*s.digestLength+2)throw new Error("RSAES-OAEP key is too short for the hash function.");n||(n=""),s.update(n,"raw");for(var u=s.digest().getBytes(),l=t.charAt(0),p=t.substring(1,s.digestLength+1),f=t.substring(1+s.digestLength),h=i(f,s.digestLength,o),d=a.util.xorBytes(p,h,p.length),y=i(d,c-s.digestLength-1,o),g=a.util.xorBytes(f,y,f.length),m=g.substring(0,s.digestLength),v="\0"!==l,C=0;C<s.digestLength;++C)v|=u.charAt(C)!==m.charAt(C);for(var E=1,S=s.digestLength,T=s.digestLength;T<g.length;T++){var I=g.charCodeAt(T),b=1&I^1,A=E?65534:0;v|=I&A,S+=E&=b}if(v||1!==g.charCodeAt(S))throw new Error("Invalid RSAES-OAEP padding.");return g.substring(S+1)}},function(e,t,r){var a=r(0);r(1),r(12),r(2),function(){if(a.prime)e.exports=a.prime;else{var t=e.exports=a.prime=a.prime||{},r=a.jsbn.BigInteger,n=[6,4,2,4,2,4,6,2],i=new r(null);i.fromInt(30);var s=function(e,t){return e|t};t.generateProbablePrime=function(e,t,n){"function"==typeof t&&(n=t,t={});var i=(t=t||{}).algorithm||"PRIMEINC";"string"==typeof i&&(i={name:i}),i.options=i.options||{};var s=t.prng||a.random,u={nextBytes:function(e){for(var t=s.getBytesSync(e.length),r=0;r<e.length;++r)e[r]=t.charCodeAt(r)}};if("PRIMEINC"===i.name)return function(e,t,n,i){if("workers"in n)return function(e,t,n,i){if("undefined"==typeof Worker)return o(e,t,n,i);var s=c(e,t),u=n.workers,l=n.workLoad||100,p=30*l/8,f=n.workerScript||"forge/prime.worker.js";if(-1===u)return a.util.estimateCores((function(e,t){e&&(t=2),u=t-1,h()}));function h(){u=Math.max(1,u);for(var a=[],n=0;n<u;++n)a[n]=new Worker(f);for(n=0;n<u;++n)a[n].addEventListener("message",h);var o=!1;function h(n){if(!o){0;var u=n.data;if(u.found){for(var f=0;f<a.length;++f)a[f].terminate();return o=!0,i(null,new r(u.prime,16))}s.bitLength()>e&&(s=c(e,t));var h=s.toString(16);n.target.postMessage({hex:h,workLoad:l}),s.dAddOffset(p,0)}}}h()}(e,t,n,i);return o(e,t,n,i)}(e,u,i.options,n);throw new Error("Invalid prime generation algorithm: "+i.name)}}function o(e,t,r,i){var s=c(e,t),o=function(e){return e<=100?27:e<=150?18:e<=200?15:e<=250?12:e<=300?9:e<=350?8:e<=400?7:e<=500?6:e<=600?5:e<=800?4:e<=1250?3:2}(s.bitLength());"millerRabinTests"in r&&(o=r.millerRabinTests);var u=10;"maxBlockTime"in r&&(u=r.maxBlockTime),function e(t,r,i,s,o,u,l){var p=+new Date;do{if(t.bitLength()>r&&(t=c(r,i)),t.isProbablePrime(o))return l(null,t);t.dAddOffset(n[s++%8],0)}while(u<0||+new Date-p<u);a.util.setImmediate((function(){e(t,r,i,s,o,u,l)}))}(s,e,t,0,o,u,i)}function c(e,t){var a=new r(e,t),n=e-1;return a.testBit(n)||a.bitwiseTo(r.ONE.shiftLeft(n),s,a),a.dAddOffset(31-a.mod(i).byteValue(),0),a}}()},function(e,t,r){var a=r(0);r(3),r(8),r(6),r(29),r(22),r(2),r(11),r(9),r(1),r(17);var n=a.asn1,i=a.pki,s=e.exports=a.pkcs12=a.pkcs12||{},o={name:"ContentInfo",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"ContentInfo.contentType",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"contentType"},{name:"ContentInfo.content",tagClass:n.Class.CONTEXT_SPECIFIC,constructed:!0,captureAsn1:"content"}]},c={name:"PFX",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"PFX.version",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"version"},o,{name:"PFX.macData",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,optional:!0,captureAsn1:"mac",value:[{name:"PFX.macData.mac",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"PFX.macData.mac.digestAlgorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"PFX.macData.mac.digestAlgorithm.algorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"macAlgorithm"},{name:"PFX.macData.mac.digestAlgorithm.parameters",tagClass:n.Class.UNIVERSAL,captureAsn1:"macAlgorithmParameters"}]},{name:"PFX.macData.mac.digest",tagClass:n.Class.UNIVERSAL,type:n.Type.OCTETSTRING,constructed:!1,capture:"macDigest"}]},{name:"PFX.macData.macSalt",tagClass:n.Class.UNIVERSAL,type:n.Type.OCTETSTRING,constructed:!1,capture:"macSalt"},{name:"PFX.macData.iterations",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,optional:!0,capture:"macIterations"}]}]},u={name:"SafeBag",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"SafeBag.bagId",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"bagId"},{name:"SafeBag.bagValue",tagClass:n.Class.CONTEXT_SPECIFIC,constructed:!0,captureAsn1:"bagValue"},{name:"SafeBag.bagAttributes",tagClass:n.Class.UNIVERSAL,type:n.Type.SET,constructed:!0,optional:!0,capture:"bagAttributes"}]},l={name:"Attribute",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"Attribute.attrId",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"oid"},{name:"Attribute.attrValues",tagClass:n.Class.UNIVERSAL,type:n.Type.SET,constructed:!0,capture:"values"}]},p={name:"CertBag",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"CertBag.certId",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"certId"},{name:"CertBag.certValue",tagClass:n.Class.CONTEXT_SPECIFIC,constructed:!0,value:[{name:"CertBag.certValue[0]",tagClass:n.Class.UNIVERSAL,type:n.Class.OCTETSTRING,constructed:!1,capture:"cert"}]}]};function f(e,t,r,a){for(var n=[],i=0;i<e.length;i++)for(var s=0;s<e[i].safeBags.length;s++){var o=e[i].safeBags[s];void 0!==a&&o.type!==a||(null!==t?void 0!==o.attributes[t]&&o.attributes[t].indexOf(r)>=0&&n.push(o):n.push(o))}return n}function h(e){if(e.composed||e.constructed){for(var t=a.util.createBuffer(),r=0;r<e.value.length;++r)t.putBytes(e.value[r].value);e.composed=e.constructed=!1,e.value=t.getBytes()}return e}function d(e,t){var r={},s=[];if(!n.validate(e,a.pkcs7.asn1.encryptedDataValidator,r,s))throw(o=new Error("Cannot read EncryptedContentInfo.")).errors=s,o;var o,c=n.derToOid(r.contentType);if(c!==i.oids.data)throw(o=new Error("PKCS#12 EncryptedContentInfo ContentType is not Data.")).oid=c,o;c=n.derToOid(r.encAlgorithm);var u=i.pbe.getCipher(c,r.encParameter,t),l=h(r.encryptedContentAsn1),p=a.util.createBuffer(l.value);if(u.update(p),!u.finish())throw new Error("Failed to decrypt PKCS#12 SafeContents.");return u.output.getBytes()}function y(e,t,r){if(!t&&0===e.length)return[];if((e=n.fromDer(e,t)).tagClass!==n.Class.UNIVERSAL||e.type!==n.Type.SEQUENCE||!0!==e.constructed)throw new Error("PKCS#12 SafeContents expected to be a SEQUENCE OF SafeBag.");for(var a=[],s=0;s<e.value.length;s++){var o=e.value[s],c={},l=[];if(!n.validate(o,u,c,l))throw(m=new Error("Cannot read SafeBag.")).errors=l,m;var f,h,d={type:n.derToOid(c.bagId),attributes:g(c.bagAttributes)};a.push(d);var y=c.bagValue.value[0];switch(d.type){case i.oids.pkcs8ShroudedKeyBag:if(null===(y=i.decryptPrivateKeyInfo(y,r)))throw new Error("Unable to decrypt PKCS#8 ShroudedKeyBag, wrong password?");case i.oids.keyBag:try{d.key=i.privateKeyFromAsn1(y)}catch(e){d.key=null,d.asn1=y}continue;case i.oids.certBag:f=p,h=function(){if(n.derToOid(c.certId)!==i.oids.x509Certificate){var e=new Error("Unsupported certificate type, only X.509 supported.");throw e.oid=n.derToOid(c.certId),e}var r=n.fromDer(c.cert,t);try{d.cert=i.certificateFromAsn1(r,!0)}catch(e){d.cert=null,d.asn1=r}};break;default:var m;throw(m=new Error("Unsupported PKCS#12 SafeBag type.")).oid=d.type,m}if(void 0!==f&&!n.validate(y,f,c,l))throw(m=new Error("Cannot read PKCS#12 "+f.name)).errors=l,m;h()}return a}function g(e){var t={};if(void 0!==e)for(var r=0;r<e.length;++r){var a={},s=[];if(!n.validate(e[r],l,a,s)){var o=new Error("Cannot read PKCS#12 BagAttribute.");throw o.errors=s,o}var c=n.derToOid(a.oid);if(void 0!==i.oids[c]){t[i.oids[c]]=[];for(var u=0;u<a.values.length;++u)t[i.oids[c]].push(a.values[u].value)}}return t}s.pkcs12FromAsn1=function(e,t,r){"string"==typeof t?(r=t,t=!0):void 0===t&&(t=!0);var u={};if(!n.validate(e,c,u,[]))throw(l=new Error("Cannot read PKCS#12 PFX. ASN.1 object is not an PKCS#12 PFX.")).errors=l,l;var l,p={version:u.version.charCodeAt(0),safeContents:[],getBags:function(e){var t,r={};return"localKeyId"in e?t=e.localKeyId:"localKeyIdHex"in e&&(t=a.util.hexToBytes(e.localKeyIdHex)),void 0===t&&!("friendlyName"in e)&&"bagType"in e&&(r[e.bagType]=f(p.safeContents,null,null,e.bagType)),void 0!==t&&(r.localKeyId=f(p.safeContents,"localKeyId",t,e.bagType)),"friendlyName"in e&&(r.friendlyName=f(p.safeContents,"friendlyName",e.friendlyName,e.bagType)),r},getBagsByFriendlyName:function(e,t){return f(p.safeContents,"friendlyName",e,t)},getBagsByLocalKeyId:function(e,t){return f(p.safeContents,"localKeyId",e,t)}};if(3!==u.version.charCodeAt(0))throw(l=new Error("PKCS#12 PFX of version other than 3 not supported.")).version=u.version.charCodeAt(0),l;if(n.derToOid(u.contentType)!==i.oids.data)throw(l=new Error("Only PKCS#12 PFX in password integrity mode supported.")).oid=n.derToOid(u.contentType),l;var g=u.content.value[0];if(g.tagClass!==n.Class.UNIVERSAL||g.type!==n.Type.OCTETSTRING)throw new Error("PKCS#12 authSafe content data is not an OCTET STRING.");if(g=h(g),u.mac){var m=null,v=0,C=n.derToOid(u.macAlgorithm);switch(C){case i.oids.sha1:m=a.md.sha1.create(),v=20;break;case i.oids.sha256:m=a.md.sha256.create(),v=32;break;case i.oids.sha384:m=a.md.sha384.create(),v=48;break;case i.oids.sha512:m=a.md.sha512.create(),v=64;break;case i.oids.md5:m=a.md.md5.create(),v=16}if(null===m)throw new Error("PKCS#12 uses unsupported MAC algorithm: "+C);var E=new a.util.ByteBuffer(u.macSalt),S="macIterations"in u?parseInt(a.util.bytesToHex(u.macIterations),16):1,T=s.generateKey(r,E,3,S,v,m),I=a.hmac.create();if(I.start(m,T),I.update(g.value),I.getMac().getBytes()!==u.macDigest)throw new Error("PKCS#12 MAC could not be verified. Invalid password?")}return function(e,t,r,a){if((t=n.fromDer(t,r)).tagClass!==n.Class.UNIVERSAL||t.type!==n.Type.SEQUENCE||!0!==t.constructed)throw new Error("PKCS#12 AuthenticatedSafe expected to be a SEQUENCE OF ContentInfo");for(var s=0;s<t.value.length;s++){var c=t.value[s],u={},l=[];if(!n.validate(c,o,u,l))throw(m=new Error("Cannot read ContentInfo.")).errors=l,m;var p={encrypted:!1},f=null,g=u.content.value[0];switch(n.derToOid(u.contentType)){case i.oids.data:if(g.tagClass!==n.Class.UNIVERSAL||g.type!==n.Type.OCTETSTRING)throw new Error("PKCS#12 SafeContents Data is not an OCTET STRING.");f=h(g).value;break;case i.oids.encryptedData:f=d(g,a),p.encrypted=!0;break;default:var m;throw(m=new Error("Unsupported PKCS#12 contentType.")).contentType=n.derToOid(u.contentType),m}p.safeBags=y(f,r,a),e.safeContents.push(p)}}(p,g.value,t,r),p},s.toPkcs12Asn1=function(e,t,r,o){(o=o||{}).saltSize=o.saltSize||8,o.count=o.count||2048,o.algorithm=o.algorithm||o.encAlgorithm||"aes128","useMac"in o||(o.useMac=!0),"localKeyId"in o||(o.localKeyId=null),"generateLocalKeyId"in o||(o.generateLocalKeyId=!0);var c,u=o.localKeyId;if(null!==u)u=a.util.hexToBytes(u);else if(o.generateLocalKeyId)if(t){var l=a.util.isArray(t)?t[0]:t;"string"==typeof l&&(l=i.certificateFromPem(l)),(N=a.md.sha1.create()).update(n.toDer(i.certificateToAsn1(l)).getBytes()),u=N.digest().getBytes()}else u=a.random.getBytes(20);var p=[];null!==u&&p.push(n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(i.oids.localKeyId).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.SET,!0,[n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,u)])])),"friendlyName"in o&&p.push(n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(i.oids.friendlyName).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.SET,!0,[n.create(n.Class.UNIVERSAL,n.Type.BMPSTRING,!1,o.friendlyName)])])),p.length>0&&(c=n.create(n.Class.UNIVERSAL,n.Type.SET,!0,p));var f=[],h=[];null!==t&&(h=a.util.isArray(t)?t:[t]);for(var d=[],y=0;y<h.length;++y){"string"==typeof(t=h[y])&&(t=i.certificateFromPem(t));var g=0===y?c:void 0,m=i.certificateToAsn1(t),v=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(i.oids.certBag).getBytes()),n.create(n.Class.CONTEXT_SPECIFIC,0,!0,[n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(i.oids.x509Certificate).getBytes()),n.create(n.Class.CONTEXT_SPECIFIC,0,!0,[n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,n.toDer(m).getBytes())])])]),g]);d.push(v)}if(d.length>0){var C=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,d),E=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(i.oids.data).getBytes()),n.create(n.Class.CONTEXT_SPECIFIC,0,!0,[n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,n.toDer(C).getBytes())])]);f.push(E)}var S=null;if(null!==e){var T=i.wrapRsaPrivateKey(i.privateKeyToAsn1(e));S=null===r?n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(i.oids.keyBag).getBytes()),n.create(n.Class.CONTEXT_SPECIFIC,0,!0,[T]),c]):n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(i.oids.pkcs8ShroudedKeyBag).getBytes()),n.create(n.Class.CONTEXT_SPECIFIC,0,!0,[i.encryptPrivateKeyInfo(T,r,o)]),c]);var I=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[S]),b=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(i.oids.data).getBytes()),n.create(n.Class.CONTEXT_SPECIFIC,0,!0,[n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,n.toDer(I).getBytes())])]);f.push(b)}var A,B=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,f);if(o.useMac){var N=a.md.sha1.create(),k=new a.util.ByteBuffer(a.random.getBytes(o.saltSize)),w=o.count,R=(e=s.generateKey(r,k,3,w,20),a.hmac.create());R.start(N,e),R.update(n.toDer(B).getBytes());var _=R.getMac();A=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(i.oids.sha1).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.NULL,!1,"")]),n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,_.getBytes())]),n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,k.getBytes()),n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,n.integerToDer(w).getBytes())])}return n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,n.integerToDer(3).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(i.oids.data).getBytes()),n.create(n.Class.CONTEXT_SPECIFIC,0,!0,[n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,n.toDer(B).getBytes())])]),A])},s.generateKey=a.pbe.generatePkcs12Key},function(e,t,r){var a=r(0);r(3),r(1);var n=a.asn1,i=e.exports=a.pkcs7asn1=a.pkcs7asn1||{};a.pkcs7=a.pkcs7||{},a.pkcs7.asn1=i;var s={name:"ContentInfo",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"ContentInfo.ContentType",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"contentType"},{name:"ContentInfo.content",tagClass:n.Class.CONTEXT_SPECIFIC,type:0,constructed:!0,optional:!0,captureAsn1:"content"}]};i.contentInfoValidator=s;var o={name:"EncryptedContentInfo",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"EncryptedContentInfo.contentType",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"contentType"},{name:"EncryptedContentInfo.contentEncryptionAlgorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"EncryptedContentInfo.contentEncryptionAlgorithm.algorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"encAlgorithm"},{name:"EncryptedContentInfo.contentEncryptionAlgorithm.parameter",tagClass:n.Class.UNIVERSAL,captureAsn1:"encParameter"}]},{name:"EncryptedContentInfo.encryptedContent",tagClass:n.Class.CONTEXT_SPECIFIC,type:0,capture:"encryptedContent",captureAsn1:"encryptedContentAsn1"}]};i.envelopedDataValidator={name:"EnvelopedData",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"EnvelopedData.Version",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"version"},{name:"EnvelopedData.RecipientInfos",tagClass:n.Class.UNIVERSAL,type:n.Type.SET,constructed:!0,captureAsn1:"recipientInfos"}].concat(o)},i.encryptedDataValidator={name:"EncryptedData",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"EncryptedData.Version",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"version"}].concat(o)};var c={name:"SignerInfo",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"SignerInfo.version",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1},{name:"SignerInfo.issuerAndSerialNumber",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"SignerInfo.issuerAndSerialNumber.issuer",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,captureAsn1:"issuer"},{name:"SignerInfo.issuerAndSerialNumber.serialNumber",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"serial"}]},{name:"SignerInfo.digestAlgorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"SignerInfo.digestAlgorithm.algorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"digestAlgorithm"},{name:"SignerInfo.digestAlgorithm.parameter",tagClass:n.Class.UNIVERSAL,constructed:!1,captureAsn1:"digestParameter",optional:!0}]},{name:"SignerInfo.authenticatedAttributes",tagClass:n.Class.CONTEXT_SPECIFIC,type:0,constructed:!0,optional:!0,capture:"authenticatedAttributes"},{name:"SignerInfo.digestEncryptionAlgorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,capture:"signatureAlgorithm"},{name:"SignerInfo.encryptedDigest",tagClass:n.Class.UNIVERSAL,type:n.Type.OCTETSTRING,constructed:!1,capture:"signature"},{name:"SignerInfo.unauthenticatedAttributes",tagClass:n.Class.CONTEXT_SPECIFIC,type:1,constructed:!0,optional:!0,capture:"unauthenticatedAttributes"}]};i.signedDataValidator={name:"SignedData",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"SignedData.Version",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"version"},{name:"SignedData.DigestAlgorithms",tagClass:n.Class.UNIVERSAL,type:n.Type.SET,constructed:!0,captureAsn1:"digestAlgorithms"},s,{name:"SignedData.Certificates",tagClass:n.Class.CONTEXT_SPECIFIC,type:0,optional:!0,captureAsn1:"certificates"},{name:"SignedData.CertificateRevocationLists",tagClass:n.Class.CONTEXT_SPECIFIC,type:1,optional:!0,captureAsn1:"crls"},{name:"SignedData.SignerInfos",tagClass:n.Class.UNIVERSAL,type:n.Type.SET,capture:"signerInfos",optional:!0,value:[c]}]},i.recipientInfoValidator={name:"RecipientInfo",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"RecipientInfo.version",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"version"},{name:"RecipientInfo.issuerAndSerial",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"RecipientInfo.issuerAndSerial.issuer",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,captureAsn1:"issuer"},{name:"RecipientInfo.issuerAndSerial.serialNumber",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"serial"}]},{name:"RecipientInfo.keyEncryptionAlgorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"RecipientInfo.keyEncryptionAlgorithm.algorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"encAlgorithm"},{name:"RecipientInfo.keyEncryptionAlgorithm.parameter",tagClass:n.Class.UNIVERSAL,constructed:!1,captureAsn1:"encParameter"}]},{name:"RecipientInfo.encryptedKey",tagClass:n.Class.UNIVERSAL,type:n.Type.OCTETSTRING,constructed:!1,capture:"encKey"}]}},function(e,t,r){var a=r(0);r(1),a.mgf=a.mgf||{},(e.exports=a.mgf.mgf1=a.mgf1=a.mgf1||{}).create=function(e){return{generate:function(t,r){for(var n=new a.util.ByteBuffer,i=Math.ceil(r/e.digestLength),s=0;s<i;s++){var o=new a.util.ByteBuffer;o.putInt32(s),e.start(),e.update(t+o.getBytes()),n.putBuffer(e.digest())}return n.truncate(n.length()-r),n.getBytes()}}}},function(e,t,r){var a=r(0);e.exports=a.debug=a.debug||{},a.debug.storage={},a.debug.get=function(e,t){var r;return void 0===e?r=a.debug.storage:e in a.debug.storage&&(r=void 0===t?a.debug.storage[e]:a.debug.storage[e][t]),r},a.debug.set=function(e,t,r){e in a.debug.storage||(a.debug.storage[e]={}),a.debug.storage[e][t]=r},a.debug.clear=function(e,t){void 0===e?a.debug.storage={}:e in a.debug.storage&&(void 0===t?delete a.debug.storage[e]:delete a.debug.storage[e][t])}},function(e,t,r){var a=r(0);r(4),r(1);var n=e.exports=a.sha512=a.sha512||{};a.md.sha512=a.md.algorithms.sha512=n;var i=a.sha384=a.sha512.sha384=a.sha512.sha384||{};i.create=function(){return n.create("SHA-384")},a.md.sha384=a.md.algorithms.sha384=i,a.sha512.sha256=a.sha512.sha256||{create:function(){return n.create("SHA-512/256")}},a.md["sha512/256"]=a.md.algorithms["sha512/256"]=a.sha512.sha256,a.sha512.sha224=a.sha512.sha224||{create:function(){return n.create("SHA-512/224")}},a.md["sha512/224"]=a.md.algorithms["sha512/224"]=a.sha512.sha224,n.create=function(e){if(o||(s=String.fromCharCode(128),s+=a.util.fillString(String.fromCharCode(0),128),c=[[1116352408,3609767458],[1899447441,602891725],[3049323471,3964484399],[3921009573,2173295548],[961987163,4081628472],[1508970993,3053834265],[2453635748,2937671579],[2870763221,3664609560],[3624381080,2734883394],[310598401,1164996542],[607225278,1323610764],[1426881987,3590304994],[1925078388,4068182383],[2162078206,991336113],[2614888103,633803317],[3248222580,3479774868],[3835390401,2666613458],[4022224774,944711139],[264347078,2341262773],[604807628,2007800933],[770255983,1495990901],[1249150122,1856431235],[1555081692,3175218132],[1996064986,2198950837],[2554220882,3999719339],[2821834349,766784016],[2952996808,2566594879],[3210313671,3203337956],[3336571891,1034457026],[3584528711,2466948901],[113926993,3758326383],[338241895,168717936],[666307205,1188179964],[773529912,1546045734],[1294757372,1522805485],[1396182291,2643833823],[1695183700,2343527390],[1986661051,1014477480],[2177026350,1206759142],[2456956037,344077627],[2730485921,1290863460],[2820302411,3158454273],[3259730800,3505952657],[3345764771,106217008],[3516065817,3606008344],[3600352804,1432725776],[4094571909,1467031594],[275423344,851169720],[430227734,3100823752],[506948616,1363258195],[659060556,3750685593],[883997877,3785050280],[958139571,3318307427],[1322822218,3812723403],[1537002063,2003034995],[1747873779,3602036899],[1955562222,1575990012],[2024104815,1125592928],[2227730452,2716904306],[2361852424,442776044],[2428436474,593698344],[2756734187,3733110249],[3204031479,2999351573],[3329325298,3815920427],[3391569614,3928383900],[3515267271,566280711],[3940187606,3454069534],[4118630271,4000239992],[116418474,1914138554],[174292421,2731055270],[289380356,3203993006],[460393269,320620315],[685471733,587496836],[852142971,1086792851],[1017036298,365543100],[1126000580,2618297676],[1288033470,3409855158],[1501505948,4234509866],[1607167915,987167468],[1816402316,1246189591]],(u={})["SHA-512"]=[[1779033703,4089235720],[3144134277,2227873595],[1013904242,4271175723],[2773480762,1595750129],[1359893119,2917565137],[2600822924,725511199],[528734635,4215389547],[1541459225,327033209]],u["SHA-384"]=[[3418070365,3238371032],[1654270250,914150663],[2438529370,812702999],[355462360,4144912697],[1731405415,4290775857],[2394180231,1750603025],[3675008525,1694076839],[1203062813,3204075428]],u["SHA-512/256"]=[[573645204,4230739756],[2673172387,3360449730],[596883563,1867755857],[2520282905,1497426621],[2519219938,2827943907],[3193839141,1401305490],[721525244,746961066],[246885852,2177182882]],u["SHA-512/224"]=[[2352822216,424955298],[1944164710,2312950998],[502970286,855612546],[1738396948,1479516111],[258812777,2077511080],[2011393907,79989058],[1067287976,1780299464],[286451373,2446758561]],o=!0),void 0===e&&(e="SHA-512"),!(e in u))throw new Error("Invalid SHA-512 algorithm: "+e);for(var t=u[e],r=null,n=a.util.createBuffer(),i=new Array(80),p=0;p<80;++p)i[p]=new Array(2);var f=64;switch(e){case"SHA-384":f=48;break;case"SHA-512/256":f=32;break;case"SHA-512/224":f=28}var h={algorithm:e.replace("-","").toLowerCase(),blockLength:128,digestLength:f,messageLength:0,fullMessageLength:null,messageLengthSize:16,start:function(){h.messageLength=0,h.fullMessageLength=h.messageLength128=[];for(var e=h.messageLengthSize/4,i=0;i<e;++i)h.fullMessageLength.push(0);n=a.util.createBuffer(),r=new Array(t.length);for(i=0;i<t.length;++i)r[i]=t[i].slice(0);return h}};return h.start(),h.update=function(e,t){"utf8"===t&&(e=a.util.encodeUtf8(e));var s=e.length;h.messageLength+=s,s=[s/4294967296>>>0,s>>>0];for(var o=h.fullMessageLength.length-1;o>=0;--o)h.fullMessageLength[o]+=s[1],s[1]=s[0]+(h.fullMessageLength[o]/4294967296>>>0),h.fullMessageLength[o]=h.fullMessageLength[o]>>>0,s[0]=s[1]/4294967296>>>0;return n.putBytes(e),l(r,i,n),(n.read>2048||0===n.length())&&n.compact(),h},h.digest=function(){var t=a.util.createBuffer();t.putBytes(n.bytes());var o,c=h.fullMessageLength[h.fullMessageLength.length-1]+h.messageLengthSize&h.blockLength-1;t.putBytes(s.substr(0,h.blockLength-c));for(var u=8*h.fullMessageLength[0],p=0;p<h.fullMessageLength.length-1;++p)u+=(o=8*h.fullMessageLength[p+1])/4294967296>>>0,t.putInt32(u>>>0),u=o>>>0;t.putInt32(u);var f=new Array(r.length);for(p=0;p<r.length;++p)f[p]=r[p].slice(0);l(f,i,t);var d,y=a.util.createBuffer();d="SHA-512"===e?f.length:"SHA-384"===e?f.length-2:f.length-4;for(p=0;p<d;++p)y.putInt32(f[p][0]),p===d-1&&"SHA-512/224"===e||y.putInt32(f[p][1]);return y},h};var s=null,o=!1,c=null,u=null;function l(e,t,r){for(var a,n,i,s,o,u,l,p,f,h,d,y,g,m,v,C,E,S,T,I,b,A,B,N,k,w,R,_,L,U,D,P,V,O=r.length();O>=128;){for(R=0;R<16;++R)t[R][0]=r.getInt32()>>>0,t[R][1]=r.getInt32()>>>0;for(;R<80;++R)a=(((_=(U=t[R-2])[0])>>>19|(L=U[1])<<13)^(L>>>29|_<<3)^_>>>6)>>>0,n=((_<<13|L>>>19)^(L<<3|_>>>29)^(_<<26|L>>>6))>>>0,i=(((_=(P=t[R-15])[0])>>>1|(L=P[1])<<31)^(_>>>8|L<<24)^_>>>7)>>>0,s=((_<<31|L>>>1)^(_<<24|L>>>8)^(_<<25|L>>>7))>>>0,D=t[R-7],V=t[R-16],L=n+D[1]+s+V[1],t[R][0]=a+D[0]+i+V[0]+(L/4294967296>>>0)>>>0,t[R][1]=L>>>0;for(d=e[0][0],y=e[0][1],g=e[1][0],m=e[1][1],v=e[2][0],C=e[2][1],E=e[3][0],S=e[3][1],T=e[4][0],I=e[4][1],b=e[5][0],A=e[5][1],B=e[6][0],N=e[6][1],k=e[7][0],w=e[7][1],R=0;R<80;++R)l=((T>>>14|I<<18)^(T>>>18|I<<14)^(I>>>9|T<<23))>>>0,p=(B^T&(b^B))>>>0,o=((d>>>28|y<<4)^(y>>>2|d<<30)^(y>>>7|d<<25))>>>0,u=((d<<4|y>>>28)^(y<<30|d>>>2)^(y<<25|d>>>7))>>>0,f=(d&g|v&(d^g))>>>0,h=(y&m|C&(y^m))>>>0,L=w+(((T<<18|I>>>14)^(T<<14|I>>>18)^(I<<23|T>>>9))>>>0)+((N^I&(A^N))>>>0)+c[R][1]+t[R][1],a=k+l+p+c[R][0]+t[R][0]+(L/4294967296>>>0)>>>0,n=L>>>0,i=o+f+((L=u+h)/4294967296>>>0)>>>0,s=L>>>0,k=B,w=N,B=b,N=A,b=T,A=I,T=E+a+((L=S+n)/4294967296>>>0)>>>0,I=L>>>0,E=v,S=C,v=g,C=m,g=d,m=y,d=a+i+((L=n+s)/4294967296>>>0)>>>0,y=L>>>0;L=e[0][1]+y,e[0][0]=e[0][0]+d+(L/4294967296>>>0)>>>0,e[0][1]=L>>>0,L=e[1][1]+m,e[1][0]=e[1][0]+g+(L/4294967296>>>0)>>>0,e[1][1]=L>>>0,L=e[2][1]+C,e[2][0]=e[2][0]+v+(L/4294967296>>>0)>>>0,e[2][1]=L>>>0,L=e[3][1]+S,e[3][0]=e[3][0]+E+(L/4294967296>>>0)>>>0,e[3][1]=L>>>0,L=e[4][1]+I,e[4][0]=e[4][0]+T+(L/4294967296>>>0)>>>0,e[4][1]=L>>>0,L=e[5][1]+A,e[5][0]=e[5][0]+b+(L/4294967296>>>0)>>>0,e[5][1]=L>>>0,L=e[6][1]+N,e[6][0]=e[6][0]+B+(L/4294967296>>>0)>>>0,e[6][1]=L>>>0,L=e[7][1]+w,e[7][0]=e[7][0]+k+(L/4294967296>>>0)>>>0,e[7][1]=L>>>0,O-=128}}},function(e,t,r){var a=r(0);r(1),e.exports=a.log=a.log||{},a.log.levels=["none","error","warning","info","debug","verbose","max"];var n={},i=[],s=null;a.log.LEVEL_LOCKED=2,a.log.NO_LEVEL_CHECK=4,a.log.INTERPOLATE=8;for(var o=0;o<a.log.levels.length;++o){var c=a.log.levels[o];n[c]={index:o,name:c.toUpperCase()}}a.log.logMessage=function(e){for(var t=n[e.level].index,r=0;r<i.length;++r){var s=i[r];if(s.flags&a.log.NO_LEVEL_CHECK)s.f(e);else t<=n[s.level].index&&s.f(s,e)}},a.log.prepareStandard=function(e){"standard"in e||(e.standard=n[e.level].name+" ["+e.category+"] "+e.message)},a.log.prepareFull=function(e){if(!("full"in e)){var t=[e.message];t=t.concat([]||!1),e.full=a.util.format.apply(this,t)}},a.log.prepareStandardFull=function(e){"standardFull"in e||(a.log.prepareStandard(e),e.standardFull=e.standard)};var u=["error","warning","info","debug","verbose"];for(o=0;o<u.length;++o)!function(e){a.log[e]=function(t,r){var n=Array.prototype.slice.call(arguments).slice(2),i={timestamp:new Date,level:e,category:t,message:r,arguments:n};a.log.logMessage(i)}}(u[o]);if(a.log.makeLogger=function(e){var t={flags:0,f:e};return a.log.setLevel(t,"none"),t},a.log.setLevel=function(e,t){var r=!1;if(e&&!(e.flags&a.log.LEVEL_LOCKED))for(var n=0;n<a.log.levels.length;++n){if(t==a.log.levels[n]){e.level=t,r=!0;break}}return r},a.log.lock=function(e,t){void 0===t||t?e.flags|=a.log.LEVEL_LOCKED:e.flags&=~a.log.LEVEL_LOCKED},a.log.addLogger=function(e){i.push(e)},"undefined"!=typeof console&&"log"in console){var l;if(console.error&&console.warn&&console.info&&console.debug){var p={error:console.error,warning:console.warn,info:console.info,debug:console.debug,verbose:console.debug},f=function(e,t){a.log.prepareStandard(t);var r=p[t.level],n=[t.standard];n=n.concat(t.arguments.slice()),r.apply(console,n)};l=a.log.makeLogger(f)}else{f=function(e,t){a.log.prepareStandardFull(t),console.log(t.standardFull)};l=a.log.makeLogger(f)}a.log.setLevel(l,"debug"),a.log.addLogger(l),s=l}else console={log:function(){}};if(null!==s){var h=a.util.getQueryVariables();if("console.level"in h&&a.log.setLevel(s,h["console.level"].slice(-1)[0]),"console.lock"in h)"true"==h["console.lock"].slice(-1)[0]&&a.log.lock(s)}a.log.consoleLogger=s},function(e,t,r){e.exports=r(35)},function(e,t,r){e.exports=r(0),r(5),r(38),r(3),r(13),r(31),r(10),r(40),r(8),r(42),r(33),r(43),r(30),r(15),r(7),r(26),r(28),r(44),r(21),r(27),r(24),r(18),r(2),r(25),r(45),r(46),r(20),r(1)},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t){var r={};e.exports=r;var a={};r.encode=function(e,t,r){if("string"!=typeof t)throw new TypeError('"alphabet" must be a string.');if(void 0!==r&&"number"!=typeof r)throw new TypeError('"maxline" must be a number.');var a="";if(e instanceof Uint8Array){var n=0,i=t.length,s=t.charAt(0),o=[0];for(n=0;n<e.length;++n){for(var c=0,u=e[n];c<o.length;++c)u+=o[c]<<8,o[c]=u%i,u=u/i|0;for(;u>0;)o.push(u%i),u=u/i|0}for(n=0;0===e[n]&&n<e.length-1;++n)a+=s;for(n=o.length-1;n>=0;--n)a+=t[o[n]]}else a=function(e,t){var r=0,a=t.length,n=t.charAt(0),i=[0];for(r=0;r<e.length();++r){for(var s=0,o=e.at(r);s<i.length;++s)o+=i[s]<<8,i[s]=o%a,o=o/a|0;for(;o>0;)i.push(o%a),o=o/a|0}var c="";for(r=0;0===e.at(r)&&r<e.length()-1;++r)c+=n;for(r=i.length-1;r>=0;--r)c+=t[i[r]];return c}(e,t);if(r){var l=new RegExp(".{1,"+r+"}","g");a=a.match(l).join("\r\n")}return a},r.decode=function(e,t){if("string"!=typeof e)throw new TypeError('"input" must be a string.');if("string"!=typeof t)throw new TypeError('"alphabet" must be a string.');var r=a[t];if(!r){r=a[t]=[];for(var n=0;n<t.length;++n)r[t.charCodeAt(n)]=n}e=e.replace(/\s/g,"");var i=t.length,s=t.charAt(0),o=[0];for(n=0;n<e.length;n++){var c=r[e.charCodeAt(n)];if(void 0===c)return;for(var u=0,l=c;u<o.length;++u)l+=o[u]*i,o[u]=255&l,l>>=8;for(;l>0;)o.push(255&l),l>>=8}for(var p=0;e[p]===s&&p<e.length-1;++p)o.push(0);return"undefined"!=typeof Buffer?Buffer.from(o.reverse()):new Uint8Array(o.reverse())}},function(e,t,r){var a=r(0);r(5),r(20);var n=e.exports=a.tls;function i(e,t,r){var i=t.entity===a.tls.ConnectionEnd.client;e.read.cipherState={init:!1,cipher:a.cipher.createDecipher("AES-CBC",i?r.keys.server_write_key:r.keys.client_write_key),iv:i?r.keys.server_write_IV:r.keys.client_write_IV},e.write.cipherState={init:!1,cipher:a.cipher.createCipher("AES-CBC",i?r.keys.client_write_key:r.keys.server_write_key),iv:i?r.keys.client_write_IV:r.keys.server_write_IV},e.read.cipherFunction=u,e.write.cipherFunction=s,e.read.macLength=e.write.macLength=r.mac_length,e.read.macFunction=e.write.macFunction=n.hmac_sha1}function s(e,t){var r,i=!1,s=t.macFunction(t.macKey,t.sequenceNumber,e);e.fragment.putBytes(s),t.updateSequenceNumber(),r=e.version.minor===n.Versions.TLS_1_0.minor?t.cipherState.init?null:t.cipherState.iv:a.random.getBytesSync(16),t.cipherState.init=!0;var c=t.cipherState.cipher;return c.start({iv:r}),e.version.minor>=n.Versions.TLS_1_1.minor&&c.output.putBytes(r),c.update(e.fragment),c.finish(o)&&(e.fragment=c.output,e.length=e.fragment.length(),i=!0),i}function o(e,t,r){if(!r){var a=e-t.length()%e;t.fillWithByte(a-1,a)}return!0}function c(e,t,r){var a=!0;if(r){for(var n=t.length(),i=t.last(),s=n-1-i;s<n-1;++s)a=a&&t.at(s)==i;a&&t.truncate(i+1)}return a}function u(e,t){var r,i=!1;r=e.version.minor===n.Versions.TLS_1_0.minor?t.cipherState.init?null:t.cipherState.iv:e.fragment.getBytes(16),t.cipherState.init=!0;var s=t.cipherState.cipher;s.start({iv:r}),s.update(e.fragment),i=s.finish(c);var o=t.macLength,u=a.random.getBytesSync(o),l=s.output.length();l>=o?(e.fragment=s.output.getBytes(l-o),u=s.output.getBytes(o)):e.fragment=s.output.getBytes(),e.fragment=a.util.createBuffer(e.fragment),e.length=e.fragment.length();var p=t.macFunction(t.macKey,t.sequenceNumber,e);return t.updateSequenceNumber(),i=function(e,t,r){var n=a.hmac.create();return n.start("SHA1",e),n.update(t),t=n.digest().getBytes(),n.start(null,null),n.update(r),r=n.digest().getBytes(),t===r}(t.macKey,u,p)&&i}n.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA={id:[0,47],name:"TLS_RSA_WITH_AES_128_CBC_SHA",initSecurityParameters:function(e){e.bulk_cipher_algorithm=n.BulkCipherAlgorithm.aes,e.cipher_type=n.CipherType.block,e.enc_key_length=16,e.block_length=16,e.fixed_iv_length=16,e.record_iv_length=16,e.mac_algorithm=n.MACAlgorithm.hmac_sha1,e.mac_length=20,e.mac_key_length=20},initConnectionState:i},n.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA={id:[0,53],name:"TLS_RSA_WITH_AES_256_CBC_SHA",initSecurityParameters:function(e){e.bulk_cipher_algorithm=n.BulkCipherAlgorithm.aes,e.cipher_type=n.CipherType.block,e.enc_key_length=32,e.block_length=16,e.fixed_iv_length=16,e.record_iv_length=16,e.mac_algorithm=n.MACAlgorithm.hmac_sha1,e.mac_length=20,e.mac_key_length=20},initConnectionState:i}},function(e,t,r){var a=r(0);r(30),e.exports=a.mgf=a.mgf||{},a.mgf.mgf1=a.mgf1},function(e,t,r){var a=r(0);r(12),r(2),r(32),r(1);var n=r(41),i=n.publicKeyValidator,s=n.privateKeyValidator;if(void 0===o)var o=a.jsbn.BigInteger;var c=a.util.ByteBuffer,u="undefined"==typeof Buffer?Uint8Array:Buffer;a.pki=a.pki||{},e.exports=a.pki.ed25519=a.ed25519=a.ed25519||{};var l=a.ed25519;function p(e){var t=e.message;if(t instanceof Uint8Array||t instanceof u)return t;var r=e.encoding;if(void 0===t){if(!e.md)throw new TypeError('"options.message" or "options.md" not specified.');t=e.md.digest().getBytes(),r="binary"}if("string"==typeof t&&!r)throw new TypeError('"options.encoding" must be "binary" or "utf8".');if("string"==typeof t){if("undefined"!=typeof Buffer)return Buffer.from(t,r);t=new c(t,r)}else if(!(t instanceof c))throw new TypeError('"options.message" must be a node.js Buffer, a Uint8Array, a forge ByteBuffer, or a string with "options.encoding" specifying its encoding.');for(var a=new u(t.length()),n=0;n<a.length;++n)a[n]=t.at(n);return a}l.constants={},l.constants.PUBLIC_KEY_BYTE_LENGTH=32,l.constants.PRIVATE_KEY_BYTE_LENGTH=64,l.constants.SEED_BYTE_LENGTH=32,l.constants.SIGN_BYTE_LENGTH=64,l.constants.HASH_BYTE_LENGTH=64,l.generateKeyPair=function(e){var t=(e=e||{}).seed;if(void 0===t)t=a.random.getBytesSync(l.constants.SEED_BYTE_LENGTH);else if("string"==typeof t){if(t.length!==l.constants.SEED_BYTE_LENGTH)throw new TypeError('"seed" must be '+l.constants.SEED_BYTE_LENGTH+" bytes in length.")}else if(!(t instanceof Uint8Array))throw new TypeError('"seed" must be a node.js Buffer, Uint8Array, or a binary string.');t=p({message:t,encoding:"binary"});for(var r=new u(l.constants.PUBLIC_KEY_BYTE_LENGTH),n=new u(l.constants.PRIVATE_KEY_BYTE_LENGTH),i=0;i<32;++i)n[i]=t[i];return function(e,t){var r,a=[P(),P(),P(),P()],n=E(t,32);for(n[0]&=248,n[31]&=127,n[31]|=64,_(a,n),A(e,a),r=0;r<32;++r)t[r+32]=e[r]}(r,n),{publicKey:r,privateKey:n}},l.privateKeyFromAsn1=function(e){var t={},r=[];if(!a.asn1.validate(e,s,t,r)){var n=new Error("Invalid Key.");throw n.errors=r,n}var i=a.asn1.derToOid(t.privateKeyOid),o=a.oids.EdDSA25519;if(i!==o)throw new Error('Invalid OID "'+i+'"; OID must be "'+o+'".');var c=t.privateKey;return{privateKeyBytes:p({message:a.asn1.fromDer(c).value,encoding:"binary"})}},l.publicKeyFromAsn1=function(e){var t={},r=[];if(!a.asn1.validate(e,i,t,r)){var n=new Error("Invalid Key.");throw n.errors=r,n}var s=a.asn1.derToOid(t.publicKeyOid),o=a.oids.EdDSA25519;if(s!==o)throw new Error('Invalid OID "'+s+'"; OID must be "'+o+'".');var c=t.ed25519PublicKey;if(c.length!==l.constants.PUBLIC_KEY_BYTE_LENGTH)throw new Error("Key length is invalid.");return p({message:c,encoding:"binary"})},l.publicKeyFromPrivateKey=function(e){var t=p({message:(e=e||{}).privateKey,encoding:"binary"});if(t.length!==l.constants.PRIVATE_KEY_BYTE_LENGTH)throw new TypeError('"options.privateKey" must have a byte length of '+l.constants.PRIVATE_KEY_BYTE_LENGTH);for(var r=new u(l.constants.PUBLIC_KEY_BYTE_LENGTH),a=0;a<r.length;++a)r[a]=t[32+a];return r},l.sign=function(e){var t=p(e=e||{}),r=p({message:e.privateKey,encoding:"binary"});if(r.length===l.constants.SEED_BYTE_LENGTH)r=l.generateKeyPair({seed:r}).privateKey;else if(r.length!==l.constants.PRIVATE_KEY_BYTE_LENGTH)throw new TypeError('"options.privateKey" must have a byte length of '+l.constants.SEED_BYTE_LENGTH+" or "+l.constants.PRIVATE_KEY_BYTE_LENGTH);var a=new u(l.constants.SIGN_BYTE_LENGTH+t.length);!function(e,t,r,a){var n,i,s=new Float64Array(64),o=[P(),P(),P(),P()],c=E(a,32);c[0]&=248,c[31]&=127,c[31]|=64;var u=r+64;for(n=0;n<r;++n)e[64+n]=t[n];for(n=0;n<32;++n)e[32+n]=c[32+n];var l=E(e.subarray(32),r+32);for(T(l),_(o,l),A(e,o),n=32;n<64;++n)e[n]=a[n];var p=E(e,r+64);for(T(p),n=32;n<64;++n)s[n]=0;for(n=0;n<32;++n)s[n]=l[n];for(n=0;n<32;++n)for(i=0;i<32;i++)s[n+i]+=p[n]*c[i];S(e.subarray(32),s)}(a,t,t.length,r);for(var n=new u(l.constants.SIGN_BYTE_LENGTH),i=0;i<n.length;++i)n[i]=a[i];return n},l.verify=function(e){var t=p(e=e||{});if(void 0===e.signature)throw new TypeError('"options.signature" must be a node.js Buffer, a Uint8Array, a forge ByteBuffer, or a binary string.');var r=p({message:e.signature,encoding:"binary"});if(r.length!==l.constants.SIGN_BYTE_LENGTH)throw new TypeError('"options.signature" must have a byte length of '+l.constants.SIGN_BYTE_LENGTH);var a=p({message:e.publicKey,encoding:"binary"});if(a.length!==l.constants.PUBLIC_KEY_BYTE_LENGTH)throw new TypeError('"options.publicKey" must have a byte length of '+l.constants.PUBLIC_KEY_BYTE_LENGTH);var n,i=new u(l.constants.SIGN_BYTE_LENGTH+t.length),s=new u(l.constants.SIGN_BYTE_LENGTH+t.length);for(n=0;n<l.constants.SIGN_BYTE_LENGTH;++n)i[n]=r[n];for(n=0;n<t.length;++n)i[n+l.constants.SIGN_BYTE_LENGTH]=t[n];return function(e,t,r,a){var n,i=new u(32),s=[P(),P(),P(),P()],o=[P(),P(),P(),P()];if(-1,r<64)return-1;if(function(e,t){var r=P(),a=P(),n=P(),i=P(),s=P(),o=P(),c=P();L(e[2],h),function(e,t){var r;for(r=0;r<16;++r)e[r]=t[2*r]+(t[2*r+1]<<8);e[15]&=32767}(e[1],t),K(n,e[1]),x(i,n,d),O(n,n,e[2]),V(i,e[2],i),K(s,i),K(o,s),x(c,o,s),x(r,c,n),x(r,r,i),function(e,t){var r,a=P();for(r=0;r<16;++r)a[r]=t[r];for(r=250;r>=0;--r)K(a,a),1!==r&&x(a,a,t);for(r=0;r<16;++r)e[r]=a[r]}(r,r),x(r,r,n),x(r,r,i),x(r,r,i),x(e[0],r,i),K(a,e[0]),x(a,a,i),N(a,n)&&x(e[0],e[0],C);if(K(a,e[0]),x(a,a,i),N(a,n))return-1;w(e[0])===t[31]>>7&&O(e[0],f,e[0]);return x(e[3],e[0],e[1]),0}(o,a))return-1;for(n=0;n<r;++n)e[n]=t[n];for(n=0;n<32;++n)e[n+32]=a[n];var c=E(e,r);if(T(c),R(s,o,c),_(o,t.subarray(32)),I(s,o),A(i,s),r-=64,k(t,0,i,0)){for(n=0;n<r;++n)e[n]=0;return-1}for(n=0;n<r;++n)e[n]=t[n+64];return r}(s,i,i.length,a)>=0};var f=P(),h=P([1]),d=P([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),y=P([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),g=P([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),m=P([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),v=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]),C=P([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function E(e,t){var r=a.md.sha512.create(),n=new c(e);r.update(n.getBytes(t),"binary");var i=r.digest().getBytes();if("undefined"!=typeof Buffer)return Buffer.from(i,"binary");for(var s=new u(l.constants.HASH_BYTE_LENGTH),o=0;o<64;++o)s[o]=i.charCodeAt(o);return s}function S(e,t){var r,a,n,i;for(a=63;a>=32;--a){for(r=0,n=a-32,i=a-12;n<i;++n)t[n]+=r-16*t[a]*v[n-(a-32)],r=t[n]+128>>8,t[n]-=256*r;t[n]+=r,t[a]=0}for(r=0,n=0;n<32;++n)t[n]+=r-(t[31]>>4)*v[n],r=t[n]>>8,t[n]&=255;for(n=0;n<32;++n)t[n]-=r*v[n];for(a=0;a<32;++a)t[a+1]+=t[a]>>8,e[a]=255&t[a]}function T(e){for(var t=new Float64Array(64),r=0;r<64;++r)t[r]=e[r],e[r]=0;S(e,t)}function I(e,t){var r=P(),a=P(),n=P(),i=P(),s=P(),o=P(),c=P(),u=P(),l=P();O(r,e[1],e[0]),O(l,t[1],t[0]),x(r,r,l),V(a,e[0],e[1]),V(l,t[0],t[1]),x(a,a,l),x(n,e[3],t[3]),x(n,n,y),x(i,e[2],t[2]),V(i,i,i),O(s,a,r),O(o,i,n),V(c,i,n),V(u,a,r),x(e[0],s,o),x(e[1],u,c),x(e[2],c,o),x(e[3],s,u)}function b(e,t,r){for(var a=0;a<4;++a)D(e[a],t[a],r)}function A(e,t){var r=P(),a=P(),n=P();!function(e,t){var r,a=P();for(r=0;r<16;++r)a[r]=t[r];for(r=253;r>=0;--r)K(a,a),2!==r&&4!==r&&x(a,a,t);for(r=0;r<16;++r)e[r]=a[r]}(n,t[2]),x(r,t[0],n),x(a,t[1],n),B(e,a),e[31]^=w(r)<<7}function B(e,t){var r,a,n,i=P(),s=P();for(r=0;r<16;++r)s[r]=t[r];for(U(s),U(s),U(s),a=0;a<2;++a){for(i[0]=s[0]-65517,r=1;r<15;++r)i[r]=s[r]-65535-(i[r-1]>>16&1),i[r-1]&=65535;i[15]=s[15]-32767-(i[14]>>16&1),n=i[15]>>16&1,i[14]&=65535,D(s,i,1-n)}for(r=0;r<16;r++)e[2*r]=255&s[r],e[2*r+1]=s[r]>>8}function N(e,t){var r=new u(32),a=new u(32);return B(r,e),B(a,t),k(r,0,a,0)}function k(e,t,r,a){return function(e,t,r,a,n){var i,s=0;for(i=0;i<n;++i)s|=e[t+i]^r[a+i];return(1&s-1>>>8)-1}(e,t,r,a,32)}function w(e){var t=new u(32);return B(t,e),1&t[0]}function R(e,t,r){var a,n;for(L(e[0],f),L(e[1],h),L(e[2],h),L(e[3],f),n=255;n>=0;--n)b(e,t,a=r[n/8|0]>>(7&n)&1),I(t,e),I(e,e),b(e,t,a)}function _(e,t){var r=[P(),P(),P(),P()];L(r[0],g),L(r[1],m),L(r[2],h),x(r[3],g,m),R(e,r,t)}function L(e,t){var r;for(r=0;r<16;r++)e[r]=0|t[r]}function U(e){var t,r,a=1;for(t=0;t<16;++t)r=e[t]+a+65535,a=Math.floor(r/65536),e[t]=r-65536*a;e[0]+=a-1+37*(a-1)}function D(e,t,r){for(var a,n=~(r-1),i=0;i<16;++i)a=n&(e[i]^t[i]),e[i]^=a,t[i]^=a}function P(e){var t,r=new Float64Array(16);if(e)for(t=0;t<e.length;++t)r[t]=e[t];return r}function V(e,t,r){for(var a=0;a<16;++a)e[a]=t[a]+r[a]}function O(e,t,r){for(var a=0;a<16;++a)e[a]=t[a]-r[a]}function K(e,t){x(e,t,t)}function x(e,t,r){var a,n,i=0,s=0,o=0,c=0,u=0,l=0,p=0,f=0,h=0,d=0,y=0,g=0,m=0,v=0,C=0,E=0,S=0,T=0,I=0,b=0,A=0,B=0,N=0,k=0,w=0,R=0,_=0,L=0,U=0,D=0,P=0,V=r[0],O=r[1],K=r[2],x=r[3],M=r[4],F=r[5],j=r[6],q=r[7],G=r[8],H=r[9],Q=r[10],z=r[11],Y=r[12],W=r[13],X=r[14],Z=r[15];i+=(a=t[0])*V,s+=a*O,o+=a*K,c+=a*x,u+=a*M,l+=a*F,p+=a*j,f+=a*q,h+=a*G,d+=a*H,y+=a*Q,g+=a*z,m+=a*Y,v+=a*W,C+=a*X,E+=a*Z,s+=(a=t[1])*V,o+=a*O,c+=a*K,u+=a*x,l+=a*M,p+=a*F,f+=a*j,h+=a*q,d+=a*G,y+=a*H,g+=a*Q,m+=a*z,v+=a*Y,C+=a*W,E+=a*X,S+=a*Z,o+=(a=t[2])*V,c+=a*O,u+=a*K,l+=a*x,p+=a*M,f+=a*F,h+=a*j,d+=a*q,y+=a*G,g+=a*H,m+=a*Q,v+=a*z,C+=a*Y,E+=a*W,S+=a*X,T+=a*Z,c+=(a=t[3])*V,u+=a*O,l+=a*K,p+=a*x,f+=a*M,h+=a*F,d+=a*j,y+=a*q,g+=a*G,m+=a*H,v+=a*Q,C+=a*z,E+=a*Y,S+=a*W,T+=a*X,I+=a*Z,u+=(a=t[4])*V,l+=a*O,p+=a*K,f+=a*x,h+=a*M,d+=a*F,y+=a*j,g+=a*q,m+=a*G,v+=a*H,C+=a*Q,E+=a*z,S+=a*Y,T+=a*W,I+=a*X,b+=a*Z,l+=(a=t[5])*V,p+=a*O,f+=a*K,h+=a*x,d+=a*M,y+=a*F,g+=a*j,m+=a*q,v+=a*G,C+=a*H,E+=a*Q,S+=a*z,T+=a*Y,I+=a*W,b+=a*X,A+=a*Z,p+=(a=t[6])*V,f+=a*O,h+=a*K,d+=a*x,y+=a*M,g+=a*F,m+=a*j,v+=a*q,C+=a*G,E+=a*H,S+=a*Q,T+=a*z,I+=a*Y,b+=a*W,A+=a*X,B+=a*Z,f+=(a=t[7])*V,h+=a*O,d+=a*K,y+=a*x,g+=a*M,m+=a*F,v+=a*j,C+=a*q,E+=a*G,S+=a*H,T+=a*Q,I+=a*z,b+=a*Y,A+=a*W,B+=a*X,N+=a*Z,h+=(a=t[8])*V,d+=a*O,y+=a*K,g+=a*x,m+=a*M,v+=a*F,C+=a*j,E+=a*q,S+=a*G,T+=a*H,I+=a*Q,b+=a*z,A+=a*Y,B+=a*W,N+=a*X,k+=a*Z,d+=(a=t[9])*V,y+=a*O,g+=a*K,m+=a*x,v+=a*M,C+=a*F,E+=a*j,S+=a*q,T+=a*G,I+=a*H,b+=a*Q,A+=a*z,B+=a*Y,N+=a*W,k+=a*X,w+=a*Z,y+=(a=t[10])*V,g+=a*O,m+=a*K,v+=a*x,C+=a*M,E+=a*F,S+=a*j,T+=a*q,I+=a*G,b+=a*H,A+=a*Q,B+=a*z,N+=a*Y,k+=a*W,w+=a*X,R+=a*Z,g+=(a=t[11])*V,m+=a*O,v+=a*K,C+=a*x,E+=a*M,S+=a*F,T+=a*j,I+=a*q,b+=a*G,A+=a*H,B+=a*Q,N+=a*z,k+=a*Y,w+=a*W,R+=a*X,_+=a*Z,m+=(a=t[12])*V,v+=a*O,C+=a*K,E+=a*x,S+=a*M,T+=a*F,I+=a*j,b+=a*q,A+=a*G,B+=a*H,N+=a*Q,k+=a*z,w+=a*Y,R+=a*W,_+=a*X,L+=a*Z,v+=(a=t[13])*V,C+=a*O,E+=a*K,S+=a*x,T+=a*M,I+=a*F,b+=a*j,A+=a*q,B+=a*G,N+=a*H,k+=a*Q,w+=a*z,R+=a*Y,_+=a*W,L+=a*X,U+=a*Z,C+=(a=t[14])*V,E+=a*O,S+=a*K,T+=a*x,I+=a*M,b+=a*F,A+=a*j,B+=a*q,N+=a*G,k+=a*H,w+=a*Q,R+=a*z,_+=a*Y,L+=a*W,U+=a*X,D+=a*Z,E+=(a=t[15])*V,s+=38*(T+=a*K),o+=38*(I+=a*x),c+=38*(b+=a*M),u+=38*(A+=a*F),l+=38*(B+=a*j),p+=38*(N+=a*q),f+=38*(k+=a*G),h+=38*(w+=a*H),d+=38*(R+=a*Q),y+=38*(_+=a*z),g+=38*(L+=a*Y),m+=38*(U+=a*W),v+=38*(D+=a*X),C+=38*(P+=a*Z),i=(a=(i+=38*(S+=a*O))+(n=1)+65535)-65536*(n=Math.floor(a/65536)),s=(a=s+n+65535)-65536*(n=Math.floor(a/65536)),o=(a=o+n+65535)-65536*(n=Math.floor(a/65536)),c=(a=c+n+65535)-65536*(n=Math.floor(a/65536)),u=(a=u+n+65535)-65536*(n=Math.floor(a/65536)),l=(a=l+n+65535)-65536*(n=Math.floor(a/65536)),p=(a=p+n+65535)-65536*(n=Math.floor(a/65536)),f=(a=f+n+65535)-65536*(n=Math.floor(a/65536)),h=(a=h+n+65535)-65536*(n=Math.floor(a/65536)),d=(a=d+n+65535)-65536*(n=Math.floor(a/65536)),y=(a=y+n+65535)-65536*(n=Math.floor(a/65536)),g=(a=g+n+65535)-65536*(n=Math.floor(a/65536)),m=(a=m+n+65535)-65536*(n=Math.floor(a/65536)),v=(a=v+n+65535)-65536*(n=Math.floor(a/65536)),C=(a=C+n+65535)-65536*(n=Math.floor(a/65536)),E=(a=E+n+65535)-65536*(n=Math.floor(a/65536)),i=(a=(i+=n-1+37*(n-1))+(n=1)+65535)-65536*(n=Math.floor(a/65536)),s=(a=s+n+65535)-65536*(n=Math.floor(a/65536)),o=(a=o+n+65535)-65536*(n=Math.floor(a/65536)),c=(a=c+n+65535)-65536*(n=Math.floor(a/65536)),u=(a=u+n+65535)-65536*(n=Math.floor(a/65536)),l=(a=l+n+65535)-65536*(n=Math.floor(a/65536)),p=(a=p+n+65535)-65536*(n=Math.floor(a/65536)),f=(a=f+n+65535)-65536*(n=Math.floor(a/65536)),h=(a=h+n+65535)-65536*(n=Math.floor(a/65536)),d=(a=d+n+65535)-65536*(n=Math.floor(a/65536)),y=(a=y+n+65535)-65536*(n=Math.floor(a/65536)),g=(a=g+n+65535)-65536*(n=Math.floor(a/65536)),m=(a=m+n+65535)-65536*(n=Math.floor(a/65536)),v=(a=v+n+65535)-65536*(n=Math.floor(a/65536)),C=(a=C+n+65535)-65536*(n=Math.floor(a/65536)),E=(a=E+n+65535)-65536*(n=Math.floor(a/65536)),i+=n-1+37*(n-1),e[0]=i,e[1]=s,e[2]=o,e[3]=c,e[4]=u,e[5]=l,e[6]=p,e[7]=f,e[8]=h,e[9]=d,e[10]=y,e[11]=g,e[12]=m,e[13]=v,e[14]=C,e[15]=E}},function(e,t,r){var a=r(0);r(3);var n=a.asn1;t.privateKeyValidator={name:"PrivateKeyInfo",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"PrivateKeyInfo.version",tagClass:n.Class.UNIVERSAL,type:n.Type.INTEGER,constructed:!1,capture:"privateKeyVersion"},{name:"PrivateKeyInfo.privateKeyAlgorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"AlgorithmIdentifier.algorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"privateKeyOid"}]},{name:"PrivateKeyInfo",tagClass:n.Class.UNIVERSAL,type:n.Type.OCTETSTRING,constructed:!1,capture:"privateKey"}]},t.publicKeyValidator={name:"SubjectPublicKeyInfo",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,captureAsn1:"subjectPublicKeyInfo",value:[{name:"SubjectPublicKeyInfo.AlgorithmIdentifier",tagClass:n.Class.UNIVERSAL,type:n.Type.SEQUENCE,constructed:!0,value:[{name:"AlgorithmIdentifier.algorithm",tagClass:n.Class.UNIVERSAL,type:n.Type.OID,constructed:!1,capture:"publicKeyOid"}]},{tagClass:n.Class.UNIVERSAL,type:n.Type.BITSTRING,constructed:!1,composed:!0,captureBitStringValue:"ed25519PublicKey"}]}},function(e,t,r){var a=r(0);r(1),r(2),r(12),e.exports=a.kem=a.kem||{};var n=a.jsbn.BigInteger;function i(e,t,r,n){e.generate=function(e,i){for(var s=new a.util.ByteBuffer,o=Math.ceil(i/n)+r,c=new a.util.ByteBuffer,u=r;u<o;++u){c.putInt32(u),t.start(),t.update(e+c.getBytes());var l=t.digest();s.putBytes(l.getBytes(n))}return s.truncate(s.length()-i),s.getBytes()}}a.kem.rsa={},a.kem.rsa.create=function(e,t){var r=(t=t||{}).prng||a.random,i={encrypt:function(t,i){var s,o=Math.ceil(t.n.bitLength()/8);do{s=new n(a.util.bytesToHex(r.getBytesSync(o)),16).mod(t.n)}while(s.compareTo(n.ONE)<=0);var c=o-(s=a.util.hexToBytes(s.toString(16))).length;return c>0&&(s=a.util.fillString(String.fromCharCode(0),c)+s),{encapsulation:t.encrypt(s,"NONE"),key:e.generate(s,i)}},decrypt:function(t,r,a){var n=t.decrypt(r,"NONE");return e.generate(n,a)}};return i},a.kem.kdf1=function(e,t){i(this,e,0,t||e.digestLength)},a.kem.kdf2=function(e,t){i(this,e,1,t||e.digestLength)}},function(e,t,r){e.exports=r(4),r(14),r(9),r(23),r(32)},function(e,t,r){var a=r(0);r(5),r(3),r(10),r(6),r(7),r(29),r(2),r(1),r(17);var n=a.asn1,i=e.exports=a.pkcs7=a.pkcs7||{};function s(e){var t={},r=[];if(!n.validate(e,i.asn1.recipientInfoValidator,t,r)){var s=new Error("Cannot read PKCS#7 RecipientInfo. ASN.1 object is not an PKCS#7 RecipientInfo.");throw s.errors=r,s}return{version:t.version.charCodeAt(0),issuer:a.pki.RDNAttributesAsArray(t.issuer),serialNumber:a.util.createBuffer(t.serial).toHex(),encryptedContent:{algorithm:n.derToOid(t.encAlgorithm),parameter:t.encParameter.value,content:t.encKey}}}function o(e){for(var t,r=[],i=0;i<e.length;++i)r.push((t=e[i],n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,n.integerToDer(t.version).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[a.pki.distinguishedNameToAsn1({attributes:t.issuer}),n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,a.util.hexToBytes(t.serialNumber))]),n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(t.encryptedContent.algorithm).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.NULL,!1,"")]),n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,t.encryptedContent.content)])));return r}function c(e){var t=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,n.integerToDer(e.version).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[a.pki.distinguishedNameToAsn1({attributes:e.issuer}),n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,a.util.hexToBytes(e.serialNumber))]),n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(e.digestAlgorithm).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.NULL,!1,"")])]);if(e.authenticatedAttributesAsn1&&t.value.push(e.authenticatedAttributesAsn1),t.value.push(n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(e.signatureAlgorithm).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.NULL,!1,"")])),t.value.push(n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,e.signature)),e.unauthenticatedAttributes.length>0){for(var r=n.create(n.Class.CONTEXT_SPECIFIC,1,!0,[]),i=0;i<e.unauthenticatedAttributes.length;++i){var s=e.unauthenticatedAttributes[i];r.values.push(u(s))}t.value.push(r)}return t}function u(e){var t;if(e.type===a.pki.oids.contentType)t=n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(e.value).getBytes());else if(e.type===a.pki.oids.messageDigest)t=n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,e.value.bytes());else if(e.type===a.pki.oids.signingTime){var r=new Date("1950-01-01T00:00:00Z"),i=new Date("2050-01-01T00:00:00Z"),s=e.value;if("string"==typeof s){var o=Date.parse(s);s=isNaN(o)?13===s.length?n.utcTimeToDate(s):n.generalizedTimeToDate(s):new Date(o)}t=s>=r&&s<i?n.create(n.Class.UNIVERSAL,n.Type.UTCTIME,!1,n.dateToUtcTime(s)):n.create(n.Class.UNIVERSAL,n.Type.GENERALIZEDTIME,!1,n.dateToGeneralizedTime(s))}return n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(e.type).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.SET,!0,[t])])}function l(e,t,r){var i={};if(!n.validate(t,r,i,[])){var s=new Error("Cannot read PKCS#7 message. ASN.1 object is not a supported PKCS#7 message.");throw s.errors=s,s}if(n.derToOid(i.contentType)!==a.pki.oids.data)throw new Error("Unsupported PKCS#7 message. Only wrapped ContentType Data supported.");if(i.encryptedContent){var o="";if(a.util.isArray(i.encryptedContent))for(var c=0;c<i.encryptedContent.length;++c){if(i.encryptedContent[c].type!==n.Type.OCTETSTRING)throw new Error("Malformed PKCS#7 message, expecting encrypted content constructed of only OCTET STRING objects.");o+=i.encryptedContent[c].value}else o=i.encryptedContent;e.encryptedContent={algorithm:n.derToOid(i.encAlgorithm),parameter:a.util.createBuffer(i.encParameter.value),content:a.util.createBuffer(o)}}if(i.content){o="";if(a.util.isArray(i.content))for(c=0;c<i.content.length;++c){if(i.content[c].type!==n.Type.OCTETSTRING)throw new Error("Malformed PKCS#7 message, expecting content constructed of only OCTET STRING objects.");o+=i.content[c].value}else o=i.content;e.content=a.util.createBuffer(o)}return e.version=i.version.charCodeAt(0),e.rawCapture=i,i}function p(e){if(void 0===e.encryptedContent.key)throw new Error("Symmetric key not available.");if(void 0===e.content){var t;switch(e.encryptedContent.algorithm){case a.pki.oids["aes128-CBC"]:case a.pki.oids["aes192-CBC"]:case a.pki.oids["aes256-CBC"]:t=a.aes.createDecryptionCipher(e.encryptedContent.key);break;case a.pki.oids.desCBC:case a.pki.oids["des-EDE3-CBC"]:t=a.des.createDecryptionCipher(e.encryptedContent.key);break;default:throw new Error("Unsupported symmetric cipher, OID "+e.encryptedContent.algorithm)}if(t.start(e.encryptedContent.parameter),t.update(e.encryptedContent.content),!t.finish())throw new Error("Symmetric decryption failed.");e.content=t.output}}i.messageFromPem=function(e){var t=a.pem.decode(e)[0];if("PKCS7"!==t.type){var r=new Error('Could not convert PKCS#7 message from PEM; PEM header type is not "PKCS#7".');throw r.headerType=t.type,r}if(t.procType&&"ENCRYPTED"===t.procType.type)throw new Error("Could not convert PKCS#7 message from PEM; PEM is encrypted.");var s=n.fromDer(t.body);return i.messageFromAsn1(s)},i.messageToPem=function(e,t){var r={type:"PKCS7",body:n.toDer(e.toAsn1()).getBytes()};return a.pem.encode(r,{maxline:t})},i.messageFromAsn1=function(e){var t={},r=[];if(!n.validate(e,i.asn1.contentInfoValidator,t,r)){var s=new Error("Cannot read PKCS#7 message. ASN.1 object is not an PKCS#7 ContentInfo.");throw s.errors=r,s}var o,c=n.derToOid(t.contentType);switch(c){case a.pki.oids.envelopedData:o=i.createEnvelopedData();break;case a.pki.oids.encryptedData:o=i.createEncryptedData();break;case a.pki.oids.signedData:o=i.createSignedData();break;default:throw new Error("Cannot read PKCS#7 message. ContentType with OID "+c+" is not (yet) supported.")}return o.fromAsn1(t.content.value[0]),o},i.createSignedData=function(){var e=null;return e={type:a.pki.oids.signedData,version:1,certificates:[],crls:[],signers:[],digestAlgorithmIdentifiers:[],contentInfo:null,signerInfos:[],fromAsn1:function(t){if(l(e,t,i.asn1.signedDataValidator),e.certificates=[],e.crls=[],e.digestAlgorithmIdentifiers=[],e.contentInfo=null,e.signerInfos=[],e.rawCapture.certificates)for(var r=e.rawCapture.certificates.value,n=0;n<r.length;++n)e.certificates.push(a.pki.certificateFromAsn1(r[n]))},toAsn1:function(){e.contentInfo||e.sign();for(var t=[],r=0;r<e.certificates.length;++r)t.push(a.pki.certificateToAsn1(e.certificates[r]));var i=[],s=n.create(n.Class.CONTEXT_SPECIFIC,0,!0,[n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,n.integerToDer(e.version).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.SET,!0,e.digestAlgorithmIdentifiers),e.contentInfo])]);return t.length>0&&s.value[0].value.push(n.create(n.Class.CONTEXT_SPECIFIC,0,!0,t)),i.length>0&&s.value[0].value.push(n.create(n.Class.CONTEXT_SPECIFIC,1,!0,i)),s.value[0].value.push(n.create(n.Class.UNIVERSAL,n.Type.SET,!0,e.signerInfos)),n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(e.type).getBytes()),s])},addSigner:function(t){var r=t.issuer,n=t.serialNumber;if(t.certificate){var i=t.certificate;"string"==typeof i&&(i=a.pki.certificateFromPem(i)),r=i.issuer.attributes,n=i.serialNumber}var s=t.key;if(!s)throw new Error("Could not add PKCS#7 signer; no private key specified.");"string"==typeof s&&(s=a.pki.privateKeyFromPem(s));var o=t.digestAlgorithm||a.pki.oids.sha1;switch(o){case a.pki.oids.sha1:case a.pki.oids.sha256:case a.pki.oids.sha384:case a.pki.oids.sha512:case a.pki.oids.md5:break;default:throw new Error("Could not add PKCS#7 signer; unknown message digest algorithm: "+o)}var c=t.authenticatedAttributes||[];if(c.length>0){for(var u=!1,l=!1,p=0;p<c.length;++p){var f=c[p];if(u||f.type!==a.pki.oids.contentType){if(l||f.type!==a.pki.oids.messageDigest);else if(l=!0,u)break}else if(u=!0,l)break}if(!u||!l)throw new Error("Invalid signer.authenticatedAttributes. If signer.authenticatedAttributes is specified, then it must contain at least two attributes, PKCS #9 content-type and PKCS #9 message-digest.")}e.signers.push({key:s,version:1,issuer:r,serialNumber:n,digestAlgorithm:o,signatureAlgorithm:a.pki.oids.rsaEncryption,signature:null,authenticatedAttributes:c,unauthenticatedAttributes:[]})},sign:function(t){var r;(t=t||{},"object"!=typeof e.content||null===e.contentInfo)&&(e.contentInfo=n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(a.pki.oids.data).getBytes())]),"content"in e&&(e.content instanceof a.util.ByteBuffer?r=e.content.bytes():"string"==typeof e.content&&(r=a.util.encodeUtf8(e.content)),t.detached?e.detachedContent=n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,r):e.contentInfo.value.push(n.create(n.Class.CONTEXT_SPECIFIC,0,!0,[n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,r)]))));0!==e.signers.length&&function(t){var r;r=e.detachedContent?e.detachedContent:(r=e.contentInfo.value[1]).value[0];if(!r)throw new Error("Could not sign PKCS#7 message; there is no content to sign.");var i=n.derToOid(e.contentInfo.value[0].value),s=n.toDer(r);for(var o in s.getByte(),n.getBerValueLength(s),s=s.getBytes(),t)t[o].start().update(s);for(var l=new Date,p=0;p<e.signers.length;++p){var f=e.signers[p];if(0===f.authenticatedAttributes.length){if(i!==a.pki.oids.data)throw new Error("Invalid signer; authenticatedAttributes must be present when the ContentInfo content type is not PKCS#7 Data.")}else{f.authenticatedAttributesAsn1=n.create(n.Class.CONTEXT_SPECIFIC,0,!0,[]);for(var h=n.create(n.Class.UNIVERSAL,n.Type.SET,!0,[]),d=0;d<f.authenticatedAttributes.length;++d){var y=f.authenticatedAttributes[d];y.type===a.pki.oids.messageDigest?y.value=t[f.digestAlgorithm].digest():y.type===a.pki.oids.signingTime&&(y.value||(y.value=l)),h.value.push(u(y)),f.authenticatedAttributesAsn1.value.push(u(y))}s=n.toDer(h).getBytes(),f.md.start().update(s)}f.signature=f.key.sign(f.md,"RSASSA-PKCS1-V1_5")}e.signerInfos=function(e){for(var t=[],r=0;r<e.length;++r)t.push(c(e[r]));return t}(e.signers)}(function(){for(var t={},r=0;r<e.signers.length;++r){var i=e.signers[r];(s=i.digestAlgorithm)in t||(t[s]=a.md[a.pki.oids[s]].create()),0===i.authenticatedAttributes.length?i.md=t[s]:i.md=a.md[a.pki.oids[s]].create()}for(var s in e.digestAlgorithmIdentifiers=[],t)e.digestAlgorithmIdentifiers.push(n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(s).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.NULL,!1,"")]));return t}())},verify:function(){throw new Error("PKCS#7 signature verification not yet implemented.")},addCertificate:function(t){"string"==typeof t&&(t=a.pki.certificateFromPem(t)),e.certificates.push(t)},addCertificateRevokationList:function(e){throw new Error("PKCS#7 CRL support not yet implemented.")}}},i.createEncryptedData=function(){var e=null;return e={type:a.pki.oids.encryptedData,version:0,encryptedContent:{algorithm:a.pki.oids["aes256-CBC"]},fromAsn1:function(t){l(e,t,i.asn1.encryptedDataValidator)},decrypt:function(t){void 0!==t&&(e.encryptedContent.key=t),p(e)}}},i.createEnvelopedData=function(){var e=null;return e={type:a.pki.oids.envelopedData,version:0,recipients:[],encryptedContent:{algorithm:a.pki.oids["aes256-CBC"]},fromAsn1:function(t){var r=l(e,t,i.asn1.envelopedDataValidator);e.recipients=function(e){for(var t=[],r=0;r<e.length;++r)t.push(s(e[r]));return t}(r.recipientInfos.value)},toAsn1:function(){return n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(e.type).getBytes()),n.create(n.Class.CONTEXT_SPECIFIC,0,!0,[n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.INTEGER,!1,n.integerToDer(e.version).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.SET,!0,o(e.recipients)),n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,(t=e.encryptedContent,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(a.pki.oids.data).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.SEQUENCE,!0,[n.create(n.Class.UNIVERSAL,n.Type.OID,!1,n.oidToDer(t.algorithm).getBytes()),n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,t.parameter.getBytes())]),n.create(n.Class.CONTEXT_SPECIFIC,0,!0,[n.create(n.Class.UNIVERSAL,n.Type.OCTETSTRING,!1,t.content.getBytes())])]))])])]);var t},findRecipient:function(t){for(var r=t.issuer.attributes,a=0;a<e.recipients.length;++a){var n=e.recipients[a],i=n.issuer;if(n.serialNumber===t.serialNumber&&i.length===r.length){for(var s=!0,o=0;o<r.length;++o)if(i[o].type!==r[o].type||i[o].value!==r[o].value){s=!1;break}if(s)return n}}return null},decrypt:function(t,r){if(void 0===e.encryptedContent.key&&void 0!==t&&void 0!==r)switch(t.encryptedContent.algorithm){case a.pki.oids.rsaEncryption:case a.pki.oids.desCBC:var n=r.decrypt(t.encryptedContent.content);e.encryptedContent.key=a.util.createBuffer(n);break;default:throw new Error("Unsupported asymmetric cipher, OID "+t.encryptedContent.algorithm)}p(e)},addRecipient:function(t){e.recipients.push({version:0,issuer:t.issuer.attributes,serialNumber:t.serialNumber,encryptedContent:{algorithm:a.pki.oids.rsaEncryption,key:t.publicKey}})},encrypt:function(t,r){if(void 0===e.encryptedContent.content){var n,i,s;switch(r=r||e.encryptedContent.algorithm,t=t||e.encryptedContent.key,r){case a.pki.oids["aes128-CBC"]:n=16,i=16,s=a.aes.createEncryptionCipher;break;case a.pki.oids["aes192-CBC"]:n=24,i=16,s=a.aes.createEncryptionCipher;break;case a.pki.oids["aes256-CBC"]:n=32,i=16,s=a.aes.createEncryptionCipher;break;case a.pki.oids["des-EDE3-CBC"]:n=24,i=8,s=a.des.createEncryptionCipher;break;default:throw new Error("Unsupported symmetric cipher, OID "+r)}if(void 0===t)t=a.util.createBuffer(a.random.getBytes(n));else if(t.length()!=n)throw new Error("Symmetric key has wrong length; got "+t.length()+" bytes, expected "+n+".");e.encryptedContent.algorithm=r,e.encryptedContent.key=t,e.encryptedContent.parameter=a.util.createBuffer(a.random.getBytes(i));var o=s(t);if(o.start(e.encryptedContent.parameter.copy()),o.update(e.content),!o.finish())throw new Error("Symmetric encryption failed.");e.encryptedContent.content=o.output}for(var c=0;c<e.recipients.length;++c){var u=e.recipients[c];if(void 0===u.encryptedContent.content)switch(u.encryptedContent.algorithm){case a.pki.oids.rsaEncryption:u.encryptedContent.content=u.encryptedContent.key.encrypt(e.encryptedContent.key.data);break;default:throw new Error("Unsupported asymmetric cipher, OID "+u.encryptedContent.algorithm)}}}}}},function(e,t,r){var a=r(0);r(5),r(8),r(14),r(9),r(1);var n=e.exports=a.ssh=a.ssh||{};function i(e,t){var r=t.toString(16);r[0]>="8"&&(r="00"+r);var n=a.util.hexToBytes(r);e.putInt32(n.length),e.putBytes(n)}function s(e,t){e.putInt32(t.length),e.putString(t)}function o(){for(var e=a.md.sha1.create(),t=arguments.length,r=0;r<t;++r)e.update(arguments[r]);return e.digest()}n.privateKeyToPutty=function(e,t,r){var n=""===(t=t||"")?"none":"aes256-cbc",c="PuTTY-User-Key-File-2: ssh-rsa\r\n";c+="Encryption: "+n+"\r\n",c+="Comment: "+(r=r||"")+"\r\n";var u=a.util.createBuffer();s(u,"ssh-rsa"),i(u,e.e),i(u,e.n);var l=a.util.encode64(u.bytes(),64),p=Math.floor(l.length/66)+1;c+="Public-Lines: "+p+"\r\n",c+=l;var f,h=a.util.createBuffer();if(i(h,e.d),i(h,e.p),i(h,e.q),i(h,e.qInv),t){var d=h.length()+16-1;d-=d%16;var y=o(h.bytes());y.truncate(y.length()-d+h.length()),h.putBuffer(y);var g=a.util.createBuffer();g.putBuffer(o("\0\0\0\0",t)),g.putBuffer(o("\0\0\0",t));var m=a.aes.createEncryptionCipher(g.truncate(8),"CBC");m.start(a.util.createBuffer().fillWithByte(0,16)),m.update(h.copy()),m.finish();var v=m.output;v.truncate(16),f=a.util.encode64(v.bytes(),64)}else f=a.util.encode64(h.bytes(),64);c+="\r\nPrivate-Lines: "+(p=Math.floor(f.length/66)+1)+"\r\n",c+=f;var C=o("putty-private-key-file-mac-key",t),E=a.util.createBuffer();s(E,"ssh-rsa"),s(E,n),s(E,r),E.putInt32(u.length()),E.putBuffer(u),E.putInt32(h.length()),E.putBuffer(h);var S=a.hmac.create();return S.start("sha1",C),S.update(E.bytes()),c+="\r\nPrivate-MAC: "+S.digest().toHex()+"\r\n"},n.publicKeyToOpenSSH=function(e,t){t=t||"";var r=a.util.createBuffer();return s(r,"ssh-rsa"),i(r,e.e),i(r,e.n),"ssh-rsa "+a.util.encode64(r.bytes())+" "+t},n.privateKeyToOpenSSH=function(e,t){return t?a.pki.encryptRsaPrivateKey(e,t,{legacy:!0,algorithm:"aes128"}):a.pki.privateKeyToPem(e)},n.getPublicKeyFingerprint=function(e,t){var r=(t=t||{}).md||a.md.md5.create(),n=a.util.createBuffer();s(n,"ssh-rsa"),i(n,e.e),i(n,e.n),r.start(),r.update(n.getBytes());var o=r.digest();if("hex"===t.encoding){var c=o.toHex();return t.delimiter?c.match(/.{2}/g).join(t.delimiter):c}if("binary"===t.encoding)return o.getBytes();if(t.encoding)throw new Error('Unknown encoding "'+t.encoding+'".');return o}},function(e,t,r){var a=r(0);r(31),r(33),r(1);var n="forge.task",i={},s=0;a.debug.set(n,"tasks",i);var o={};a.debug.set(n,"queues",o);var c="ready",u="running",l="blocked",p="sleeping",f="done",h="error",d="stop",y="start",g={ready:{}};g[c][d]=c,g[c][y]=u,g[c].cancel=f,g[c].fail=h,g[u]={},g[u][d]=c,g[u][y]=u,g[u].block=l,g[u].unblock=u,g[u].sleep=p,g[u].wakeup=u,g[u].cancel=f,g[u].fail=h,g[l]={},g[l][d]=l,g[l][y]=l,g[l].block=l,g[l].unblock=l,g[l].sleep=l,g[l].wakeup=l,g[l].cancel=f,g[l].fail=h,g[p]={},g[p][d]=p,g[p][y]=p,g[p].block=p,g[p].unblock=p,g[p].sleep=p,g[p].wakeup=p,g[p].cancel=f,g[p].fail=h,g[f]={},g[f][d]=f,g[f][y]=f,g[f].block=f,g[f].unblock=f,g[f].sleep=f,g[f].wakeup=f,g[f].cancel=f,g[f].fail=h,g[h]={},g[h][d]=h,g[h][y]=h,g[h].block=h,g[h].unblock=h,g[h].sleep=h,g[h].wakeup=h,g[h].cancel=h,g[h].fail=h;var m=function(e){this.id=-1,this.name=e.name||"?",this.parent=e.parent||null,this.run=e.run,this.subtasks=[],this.error=!1,this.state=c,this.blocks=0,this.timeoutId=null,this.swapTime=null,this.userData=null,this.id=s++,i[this.id]=this};m.prototype.debug=function(e){e=e||"",a.log.debug(n,e,"[%s][%s] task:",this.id,this.name,this,"subtasks:",this.subtasks.length,"queue:",o)},m.prototype.next=function(e,t){"function"==typeof e&&(t=e,e=this.name);var r=new m({run:t,name:e,parent:this});return r.state=u,r.type=this.type,r.successCallback=this.successCallback||null,r.failureCallback=this.failureCallback||null,this.subtasks.push(r),this},m.prototype.parallel=function(e,t){return a.util.isArray(e)&&(t=e,e=this.name),this.next(e,(function(r){var n=r;n.block(t.length);for(var i=function(e,r){a.task.start({type:e,run:function(e){t[r](e)},success:function(e){n.unblock()},failure:function(e){n.unblock()}})},s=0;s<t.length;s++){i(e+"__parallel-"+r.id+"-"+s,s)}}))},m.prototype.stop=function(){this.state=g[this.state][d]},m.prototype.start=function(){this.error=!1,this.state=g[this.state][y],this.state===u&&(this.start=new Date,this.run(this),v(this,0))},m.prototype.block=function(e){e=void 0===e?1:e,this.blocks+=e,this.blocks>0&&(this.state=g[this.state].block)},m.prototype.unblock=function(e){return e=void 0===e?1:e,this.blocks-=e,0===this.blocks&&this.state!==f&&(this.state=u,v(this,0)),this.blocks},m.prototype.sleep=function(e){e=void 0===e?0:e,this.state=g[this.state].sleep;var t=this;this.timeoutId=setTimeout((function(){t.timeoutId=null,t.state=u,v(t,0)}),e)},m.prototype.wait=function(e){e.wait(this)},m.prototype.wakeup=function(){this.state===p&&(cancelTimeout(this.timeoutId),this.timeoutId=null,this.state=u,v(this,0))},m.prototype.cancel=function(){this.state=g[this.state].cancel,this.permitsNeeded=0,null!==this.timeoutId&&(cancelTimeout(this.timeoutId),this.timeoutId=null),this.subtasks=[]},m.prototype.fail=function(e){if(this.error=!0,C(this,!0),e)e.error=this.error,e.swapTime=this.swapTime,e.userData=this.userData,v(e,0);else{if(null!==this.parent){for(var t=this.parent;null!==t.parent;)t.error=this.error,t.swapTime=this.swapTime,t.userData=this.userData,t=t.parent;C(t,!0)}this.failureCallback&&this.failureCallback(this)}};var v=function(e,t){var r=t>30||+new Date-e.swapTime>20,a=function(t){if(t++,e.state===u)if(r&&(e.swapTime=+new Date),e.subtasks.length>0){var a=e.subtasks.shift();a.error=e.error,a.swapTime=e.swapTime,a.userData=e.userData,a.run(a),a.error||v(a,t)}else C(e),e.error||null!==e.parent&&(e.parent.error=e.error,e.parent.swapTime=e.swapTime,e.parent.userData=e.userData,v(e.parent,t))};r?setTimeout(a,0):a(t)},C=function(e,t){e.state=f,delete i[e.id],null===e.parent&&(e.type in o?0===o[e.type].length?a.log.error(n,"[%s][%s] task queue empty [%s]",e.id,e.name,e.type):o[e.type][0]!==e?a.log.error(n,"[%s][%s] task not first in queue [%s]",e.id,e.name,e.type):(o[e.type].shift(),0===o[e.type].length?delete o[e.type]:o[e.type][0].start()):a.log.error(n,"[%s][%s] task queue missing [%s]",e.id,e.name,e.type),t||(e.error&&e.failureCallback?e.failureCallback(e):!e.error&&e.successCallback&&e.successCallback(e)))};e.exports=a.task=a.task||{},a.task.start=function(e){var t=new m({run:e.run,name:e.name||"?"});t.type=e.type,t.successCallback=e.success||null,t.failureCallback=e.failure||null,t.type in o?o[e.type].push(t):(o[t.type]=[t],function(e){e.error=!1,e.state=g[e.state][y],setTimeout((function(){e.state===u&&(e.swapTime=+new Date,e.run(e),v(e,0))}),0)}(t))},a.task.cancel=function(e){e in o&&(o[e]=[o[e][0]])},a.task.createCondition=function(){var e={tasks:{},wait:function(t){t.id in e.tasks||(t.block(),e.tasks[t.id]=t)},notify:function(){var t=e.tasks;for(var r in e.tasks={},t)t[r].unblock()}};return e}}])}));
//# sourceMappingURL=forge.min.js.map
(function (global) {
    var connectsdk = {}, modules = {};

    /* SDK internal function */
    connectsdk.define = function (module, dependencies, fn) {
        if (dependencies && dependencies.length) {
            for (var i = 0; i < dependencies.length; i++) {
                dependencies[i] = modules[dependencies[i]];
            }
        }
        modules[module] = fn.apply(this, dependencies || []);
    };

    // Export `connectsdk` based on environment.
    global.connectsdk = connectsdk;

    if (typeof exports !== 'undefined') {
        exports.connectsdk = connectsdk;
    }

    connectsdk.define('connectsdk.core', [], function () {
        return connectsdk;
    });

    // use require.js if available otherwise we use our own
    if (typeof define === 'undefined') {
        global.define = connectsdk.define;
    }
} (typeof window === 'undefined' ? this : window));

// (re)define core
define("connectsdk.core", [], function () {
    var global = typeof window === 'undefined' ? this : window;
    var connectsdk = {};
    global.connectsdk = connectsdk;
    if (typeof exports !== 'undefined') {
        exports.connectsdk = connectsdk;
    }
    return connectsdk;
});

define('connectsdk.promise', ['connectsdk.core'], function(turing) {
	function PromiseModule(global) {
		/**
		 * The Promise class.
		 */
		function Promise(singleton) {
			var self = this;
			this.pending = [];

			/**
			 * Resolves a promise.
			 *
			 * @param {Object} A value
			 */
			this.resolve = function(result) {
				self.complete('resolve', result);
			},

			/**
			 * Rejects a promise.
			 *
			 * @param {Object} A value
			 */
			this.reject = function(result) {
				self.complete('reject', result);
			};

			if (singleton) {
				this.isSingleton = true;
			}
		}

		Promise.prototype = {
			/**
			 * Adds a success and failure handler for completion of this Promise object.
			 *
			 * @param {Function} success The success handler
			 * @param {Function} success The failure handler
			 * @returns {Promise} `this`
			 */
			then : function(success, failure) {
				this.pending.push({
					resolve : success,
					reject : failure
				});
				return this;
			},

			/**
			 * Runs through each pending 'thenable' based on type (resolve, reject).
			 *
			 * @param {String} type The thenable type
			 * @param {Object} result A value
			 */
			complete : function(type, result) {
				while (this.pending[0]) {
					this.pending.shift()[type](result);
				}
			}
		};

		global.Promise = Promise;
	}
	PromiseModule(connectsdk);

	return connectsdk.Promise;
});

define('connectsdk.net', ['connectsdk.core'], function(connectsdk) {
  var net = {};

  /**
    * Ajax request options:
    *
    *   - `method`: {String} HTTP method - GET, POST, etc.
    *   - `success`: {Function} A callback to run when a request is successful
    *   - `error`: {Function} A callback to run when the request fails
    *   - `asynchronous`: {Boolean} Defaults to asynchronous
    *   - `postBody`: {String} The HTTP POST body
    *   - `contentType`: {String} The content type of the request, default is `application/x-www-form-urlencoded`
    *
    */

  /**
    * Removes leading and trailing whitespace.
    * @param {String}
    * @return {String}
    */
  var trim = ''.trim
    ? function(s) { return s.trim(); }
    : function(s) { return s.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };

  function xhr() {
    if (typeof XMLHttpRequest !== 'undefined' && (window.location.protocol !== 'file:' || !window.ActiveXObject)) {
      return new XMLHttpRequest();
    } else {
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.6.0');
      } catch(e) { }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.3.0');
      } catch(e) { }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP');
      } catch(e) { }
    }
    return false;
  }

  function successfulRequest(request) {
    return (request.status >= 200 && request.status < 300) ||
        request.status == 304 ||
        (request.status == 0 && request.responseText);
  }

  /**
    * Serialize JavaScript for HTTP requests.
    *
    * @param {Object} object An Array or Object
    * @returns {String} A string suitable for a GET or POST request
    */
  net.serialize = function(object) {
    if (!object) return;

    if (typeof object === 'string') {
      return object;
    }

    var results = [];
    for (var key in object) {
      results.push(encodeURIComponent(key) + '=' + encodeURIComponent(object[key]));
    }
    return results.join('&');
  };

  /**
    * JSON.parse support can be inferred using `connectsdk.detect('JSON.parse')`.
    */
  //connectsdk.addDetectionTest('JSON.parse', function() {
  //  return window.JSON && window.JSON.parse;
  //});

  /**
    * Parses JSON represented as a string.
    *
    * @param {String} string The original string
    * @returns {Object} A JavaScript object
    */
  net.parseJSON = function(string) {
    if (typeof string !== 'string' || !string) return null;
    string = trim(string);
    /*
    return connectsdk.detect('JSON.parse') ?
      window.JSON.parse(string) :
      (new Function('return ' + string))();
    */
    return window.JSON.parse(string);
  };

  /**
    * Parses XML represented as a string.
    *
    * @param {String} string The original string
    * @returns {Object} A JavaScript object
    */
  if (window.DOMParser) {
    net.parseXML = function(text) {
      return new DOMParser().parseFromString(text, 'text/xml');
    };
  } else {
    net.parseXML = function(text) {
      var xml = new ActiveXObject('Microsoft.XMLDOM');
      xml.async = 'false';
      xml.loadXML(text);
      return xml;
    };
  }

  /**
    * Creates an Ajax request.  Returns an object that can be used
    * to chain calls.  For example:
    *
    *      $t.post('/post-test')
    *        .data({ key: 'value' })
    *        .end(function(res) {
    *          assert.equal('value', res.responseText);
    *        });
    *
    *      $t.get('/get-test')
    *        .set('Accept', 'text/html')
    *        .end(function(res) {
    *          assert.equal('Sample text', res.responseText);
    *        });
    *
    * The available chained methods are:
    *
    * `set` -- set a HTTP header
    * `data` -- the postBody
    * `end` -- send the request over the network, and calls your callback with a `res` object
    * `send` -- sends the request and calls `data`: `.send({ data: value }, function(res) { });`
    *
    * @param {String} The URL to call
    * @param {Object} Optional settings
    * @returns {Object} A chainable object for further configuration
    */
  function ajax(url, options) {
    var request = xhr(),
        promise,
        then,
        response = {},
        chain;
    if (connectsdk.Promise) {
      promise = new connectsdk.Promise();
    }

    function respondToReadyState(readyState) {
      if (request.readyState == 4) {
        var contentType = request.mimeType || request.getResponseHeader('content-type') || '';

        response.status = request.status;
        response.responseText = request.responseText;
        if (/json/.test(contentType)) {
          response.responseJSON = net.parseJSON(request.responseText);
        } else if (/xml/.test(contentType)) {
          response.responseXML = net.parseXML(request.responseText);
      	}

        response.success = successfulRequest(request);

        if (options.callback) {
          return options.callback(response, request);
        }

        if (response.success) {
          if (options.success) options.success(response, request);
          if (promise) promise.resolve(response, request);
        } else {
          if (options.error) options.error(response, request);
          if (promise) promise.reject(response, request);
        }
      }
    }

    // Set the HTTP headers
    function setHeaders() {
      var defaults = {
        'Accept': 'text/javascript, application/json, text/html, application/xml, text/xml, */*',
        'Content-Type': 'application/json'
      };

      /**
       * Merge headers with defaults.
       */
      for (var name in defaults) {
        if (!options.headers.hasOwnProperty(name))
          options.headers[name] = defaults[name];
      }
      for (var name in options.headers) {
        request.setRequestHeader(name, options.headers[name]);
      }

    }

    if (typeof options === 'undefined') options = {};

    options.method = options.method ? options.method.toLowerCase() : 'get';
    options.asynchronous = options.asynchronous || true;
    options.postBody = options.postBody || '';
    request.onreadystatechange = respondToReadyState;
    request.open(options.method, url, options.asynchronous);

    options.headers = options.headers || {};
    if (options.contentType) {
      options.headers['Content-Type'] = options.contentType;
    }

    if (typeof options.postBody !== 'string') {
      // Serialize JavaScript
      options.postBody = net.serialize(options.postBody);
    }

    // setHeaders();

    function send() {
      try {
      	setHeaders();
        request.send(options.postBody);
      } catch (e) {
        if (options.error) {
          options.error();
        }
      }
    }

    chain = {
      set: function(key, value) {
        options.headers[key] = value;
        return chain;
      },

      send: function(data, callback) {
        options.postBody = net.serialize(data);
        options.callback = callback;
        send();
        return chain;
      },

      end: function(callback) {
        options.callback = callback;
        send();
        return chain;
      },

      data: function(data) {
        options.postBody = net.serialize(data);
        return chain;
      },

      then: function() {
        chain.end();
        if (promise) promise.then.apply(promise, arguments);
        return chain;
      }
    };

    return chain;
  }

  function JSONPCallback(url, success, failure) {
    var self = this;
    this.url = url;
    this.methodName = '__connectsdk_jsonp_' + parseInt(new Date().getTime());
    this.success = success;
    this.failure = failure;

    function runCallback(json) {
      self.success(json);
      self.teardown();
    }

    window[this.methodName] = runCallback;
  }

  JSONPCallback.prototype.run = function() {
    this.scriptTag = document.createElement('script');
    this.scriptTag.id = this.methodName;
    this.scriptTag.src = this.url.replace('{callback}', this.methodName);
    var that = this;
    this.scriptTag.onerror = function() {
    	that.failure();
    };
    document.body.appendChild(this.scriptTag);
  };

  JSONPCallback.prototype.teardown = function() {
    window[this.methodName] = null;
    try {
    	delete window[this.methodName];
    } catch (e) {}
    if (this.scriptTag) {
      document.body.removeChild(this.scriptTag);
    }
  };

  /**
   * An Ajax GET request.
   *
   *      $t.get('/get-test')
   *        .set('Accept', 'text/html')
   *        .end(function(res) {
   *          assert.equal('Sample text', res.responseText);
   *        });
   *
   * @param {String} url The URL to request
   * @param {Object} options The Ajax request options
   * @returns {Object} A chainable object for further configuration
   */
  net.get = function(url, options) {
    if (typeof options === 'undefined') options = {};
    options.method = 'get';
    return ajax(url, options);
  };

  /**
   * An Ajax POST request.
   *
   *      $t.post('/post-test')
   *        .data({ key: 'value' })
   *        .end(function(res) {
   *          assert.equal('value', res.responseText);
   *        });
   *
   * @param {String} url The URL to request
   * @param {Object} options The Ajax request options (`postBody` may come in handy here)
   * @returns {Object} An object for further chaining with promises
   */
  net.post = function(url, options) {
    if (typeof options === 'undefined') options = {};
    options.method = 'post';
    return ajax(url, options);
  };

  /**
   * A jsonp request.  Example:
   *
   *     var url = 'http://feeds.delicious.com/v1/json/';
   *     url += 'alex_young/javascript?callback={callback}';
   *
   *     connectsdk.net.jsonp(url, {
   *       success: function(json) {
   *         console.log(json);
   *       }
   *     });
   *
   * @param {String} url The URL to request
   */
  net.jsonp = function(url, options) {
    if (typeof options === 'undefined') options = {};
    var callback = new JSONPCallback(url, options.success, options.failure);
    callback.run();
  };

  /**
    * The Ajax methods are mapped to the `connectsdk` object:
    *
    *      connectsdk.get();
    *      connectsdk.post();
    *      connectsdk.json();
    *
    */
  connectsdk.get = net.get;
  connectsdk.post = net.post;
  connectsdk.jsonp = net.jsonp;

  net.ajax = ajax;
  connectsdk.net = net;
  return net;
});

define("connectsdk.Util", ["connectsdk.core"], function (connectsdk) {

	// Create a singleton from Util so the same util function can be used in different modules
	var Util = (function () {
		var instance;

		function createInstance() {
			// private variables to use in the public methods
			var applePayPaymentProductId = 302;
			var googlePayPaymentProductId = 320;
			var bancontactPaymentProductId = 3012;

			return {
				applePayPaymentProductId: applePayPaymentProductId,
				googlePayPaymentProductId: googlePayPaymentProductId,
				bancontactPaymentProductId: bancontactPaymentProductId,
				getMetadata: function () {
					return {
						screenSize: window.innerWidth + "x" + window.innerHeight,
						platformIdentifier: window.navigator.userAgent,
						sdkIdentifier: ((document.GC && document.GC.rppEnabledPage) ? 'rpp-' : '') + 'JavaScriptClientSDK/v3.19.0',
						sdkCreator: 'Ingenico'
					};
				},
				collectDeviceInformation: function () {
					return {
						"timezoneOffsetUtcMinutes": new Date().getTimezoneOffset(),
						"locale": navigator.language,
						"browserData": {
							"javaScriptEnabled": true,
							"javaEnabled": navigator.javaEnabled(),
							"colorDepth": screen.colorDepth,
							"screenHeight": screen.height,
							"screenWidth": screen.width,
							"innerHeight": window.innerHeight,
							"innerWidth": window.innerWidth
						}
					};
				},
				base64Encode: function (data) {
					if (typeof data === "object") {
						try {
							data = JSON.stringify(data);
						} catch (e) {
							throw "data must be either a String or a JSON object";
						}
					}

					var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
					var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = '', tmp_arr = [];

					if (!data) {
						return data;
					}

					do {// pack three octets into four hexets
						o1 = data.charCodeAt(i++);
						o2 = data.charCodeAt(i++);
						o3 = data.charCodeAt(i++);

						bits = o1 << 16 | o2 << 8 | o3;

						h1 = bits >> 18 & 0x3f;
						h2 = bits >> 12 & 0x3f;
						h3 = bits >> 6 & 0x3f;
						h4 = bits & 0x3f;

						// use hexets to index into b64, and append result to encoded string
						tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
					} while (i < data.length);

					enc = tmp_arr.join('');

					var r = data.length % 3;

					return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
				},
				filterOutProductsThatAreNotSupportedInThisBrowser: function (json) {
					for (var i = json.paymentProducts.length - 1, il = 0; i >= il; i--) {
						var product = json.paymentProducts[i];
						if (product && this.paymentProductsThatAreNotSupportedInThisBrowser.indexOf(product.id) > -1) {
							json.paymentProducts.splice(i, 1);
						}
					}
				},
				paymentProductsThatAreNotSupportedInThisBrowser: []
			}
		}

		return {
			getInstance: function () {
				if (!instance) {
					instance = createInstance();
				}
				return instance;
			}
		};
	})();

	connectsdk.Util = Util;
	return Util;
});

define("connectsdk.GooglePay", ["connectsdk.core", "connectsdk.promise", "connectsdk.Util"], function (connectsdk, Promise, Util) {

    var _util = Util.getInstance();
    var _C2SCommunicator = null;
    var _paymentProductSpecificInputs = null;
    var _context = null;
    var _gateway = null;
    var _networks = null;
    var paymentsClient = null;

    // Only base is needed to trigger isReadyToPay
    var _getBaseCardPaymentMethod = function () {
        return {
            type: 'CARD',
            parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: _networks
            }
        }
    };

    var _getTokenizationSpecification = function () {
        return {
            type: 'PAYMENT_GATEWAY',
            parameters: {
                'gateway': _gateway,
                'gatewayMerchantId': _paymentProductSpecificInputs.googlePay.gatewayMerchantId
            }
        }
    };

    // To prefetch payment data we need base + tokenizationSpecification
    var _getCardPaymentMethod = function () {
        return Object.assign(
            {},
            _getBaseCardPaymentMethod(),
            {
                tokenizationSpecification: _getTokenizationSpecification()
            }
        );
    };

    var _getTransactionInfo = function () {
        return {
            "totalPriceStatus": "NOT_CURRENTLY_KNOWN",
            "currencyCode": _context.currency
        };
    };

    var _getMerchantInfo = function () {
        return {
            "merchantName": _paymentProductSpecificInputs.googlePay.merchantName
        };
    };

    var _getGooglePaymentDataRequest = function () {
        return {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [_getBaseCardPaymentMethod()]
        };
    };

    var _getGooglePaymentDataRequestForPrefetch = function () {
        // transactionInfo must be set but does not affect cache
        return {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [_getCardPaymentMethod()],
            transactionInfo: _getTransactionInfo(),
            merchantInfo: _getMerchantInfo()
        };
    };

    function _getGooglePaymentsClient() {
        if (paymentsClient === null) {
            var googlePayEnvironment = 'TEST';
            if (_context.environment === 'PROD') {
                googlePayEnvironment = 'PROD';
            }
            if (window.google) {
                paymentsClient = new google.payments.api.PaymentsClient({environment: googlePayEnvironment});
            } else {
                console.error("The Google Pay API script was not loaded https://developers.google.com/pay/api/web/guides/tutorial#js-load");
            }
        }
        return paymentsClient;
    }

    /**
     * Prefetch payment data to improve performance
     *
     * @see {@link https://developers.google.com/pay/api/web/reference/client#prefetchPaymentData|prefetchPaymentData()}
     */
    function prefetchGooglePaymentData() {
        var paymentDataRequest = _getGooglePaymentDataRequestForPrefetch();

        var paymentsClient = _getGooglePaymentsClient();

        // Prefetching is only effective when all information is provided
        if (_paymentProductSpecificInputs.googlePay.gatewayMerchantId &&
            _paymentProductSpecificInputs.googlePay.merchantName) {
            paymentsClient.prefetchPaymentData(paymentDataRequest);
        } else {
            console.warn("Prefetching payment data was not triggered because of missing information. " +
                "gatewayMerchantId: " + _paymentProductSpecificInputs.googlePay.gatewayMerchantId +
                ", merchantName: " + _paymentProductSpecificInputs.googlePay.merchantName)
        }
    }

    var GooglePay = function (C2SCommunicator) {
        _C2SCommunicator = C2SCommunicator;
        this.isGooglePayAvailable = function (context, paymentProductSpecificInputs, googlePayData) {
            _context = context;
            _paymentProductSpecificInputs = paymentProductSpecificInputs;
            if (googlePayData && googlePayData.networks) {
                _gateway = googlePayData.gateway;
                _networks = googlePayData.networks;
            } else {
                _gateway = "ingenicoglobalcollect";
                _networks = googlePayData;
            }
            var promise = new Promise();
            // This setTimeout is essential to make the following (not fully asynchronous) code work in a promise way in all scenarios. (not needed in happy flow)
            // The SDK has it's only PolyFill for the promise which is not feature complete.
            setTimeout(function () {
                if (_networks && _networks.length > 0) {
                    var paymentsClient = _getGooglePaymentsClient();
                    if (!paymentsClient) {
                        _util.paymentProductsThatAreNotSupportedInThisBrowser.push(_util.googlePayPaymentProductId);
                        promise.reject("The Google Pay API script was not loaded https://developers.google.com/pay/api/web/guides/tutorial#js-load");
                    } else {
                        paymentsClient.isReadyToPay(_getGooglePaymentDataRequest())
                            .then(function (response) {
                                promise.resolve(response);

                                prefetchGooglePaymentData();
                            })
                            .catch(function () {
                                _util.paymentProductsThatAreNotSupportedInThisBrowser.push(_util.googlePayPaymentProductId);
                                promise.reject('failed to run isReadyToPay() with Google Pay API');
                            });
                    }
                } else {
                    _util.paymentProductsThatAreNotSupportedInThisBrowser.push(_util.googlePayPaymentProductId);
                    promise.reject('There are no product networks available');
                }
            }, 0);
            return promise;
        };

        this.isMerchantIdProvided = function (paymentProductSpecificInputs) {
            if (paymentProductSpecificInputs.googlePay.merchantId) {
                return paymentProductSpecificInputs.googlePay.merchantId;
            } else {
                _util.paymentProductsThatAreNotSupportedInThisBrowser.push(_util.googlePayPaymentProductId);
                return false;
            }
        }
    };
    connectsdk.GooglePay = GooglePay;
    return GooglePay;
});

define("connectsdk.ApplePay", ["connectsdk.core", "connectsdk.promise", "connectsdk.Util"], function (connectsdk, Promise, Util) {

    var _util = Util.getInstance();

    var ApplePay = function () {
        this.isApplePayAvailable = function () {
            var applePayIsAvailable = window.ApplePaySession && window.ApplePaySession.canMakePayments();
            if (!applePayIsAvailable) {
                _util.paymentProductsThatAreNotSupportedInThisBrowser.push(_util.applePayPaymentProductId);
            }
            return applePayIsAvailable;
        };
        this.initPayment = function (context, C2SCommunicator) {
            var promise = new Promise();
            var _context = context;
            var _C2SCommunicator = C2SCommunicator;

            var _countryCode;
            if (_context.acquirerCountry) {
                _countryCode = _context.acquirerCountry;
            } else {
                _countryCode = _context.countryCode;
            }

            var payment = {
                currencyCode: _context.currency,
                countryCode: _countryCode,
                total: {
                    label: _context.displayName,
                    amount: _context.totalAmount / 100,
                },
                supportedNetworks: _context.networks,
                merchantCapabilities: ['supports3DS'],
            };

            var applePaySession = new ApplePaySession(1, payment);
            applePaySession.begin();

            applePaySession.onvalidatemerchant = function (event) {
                _context.validationURL = event.validationURL;
                _context.domainName = window.location.hostname;
                _C2SCommunicator.createPaymentProductSession('302', _context).then(function (merchantSession) {
                    try {
                        applePaySession.completeMerchantValidation(JSON.parse(merchantSession.paymentProductSession302SpecificOutput.sessionObject));
                    } catch {
                        promise.reject({ message: 'Error completing merchant validation' });
                        applePaySession.abort();
                    }
                }, function () {
                    promise.reject({ message: 'Error completing merchant validation' });
                    applePaySession.abort();
                })
            };

            applePaySession.onpaymentauthorized = function (event) {
                if (!event.payment.token) {
                    status = ApplePaySession.STATUS_FAILURE;
                    promise.reject({ message: 'Error payment authorization' });
                    applePaySession.completePayment(status);
                } else {
                    status = ApplePaySession.STATUS_SUCCESS;
                    promise.resolve({ message: 'Payment authorized', data: event.payment.token });
                    applePaySession.completePayment(status);
                }
            };
            return promise;
        };
    }

    connectsdk.ApplePay = ApplePay;
    return ApplePay;
});
define("connectsdk.PublicKeyResponse", ["connectsdk.core"], function(connectsdk) {

	var PublicKeyResponse = function(json) {
		this.json = json;
		this.keyId = json.keyId;
		this.publicKey = json.publicKey;
	};

	connectsdk.PublicKeyResponse = PublicKeyResponse;
	return PublicKeyResponse;
});
define("connectsdk.C2SCommunicatorConfiguration", ["connectsdk.core"], function (connectsdk) {

    var C2SCommunicatorConfiguration = function (sessionDetails, apiVersion) {
        this.endpoints = {
            PROD: {
                EU: {
                    API: "https://ams1.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay1.secured-by-ingenico.com"
                },
                US: {
                    API: "https://us.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay2.secured-by-ingenico.com"
                },
                AMS: {
                    API: "https://ams2.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay3.secured-by-ingenico.com"
                },
                PAR: {
                    API: "https://par.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay4.secured-by-ingenico.com"
                }
            },
            PREPROD: {
                EU: {
                    API: "https://ams1.preprod.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay1.preprod.secured-by-ingenico.com"
                },
                US: {
                    API: "https://us.preprod.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay2.preprod.secured-by-ingenico.com"
                },
                AMS: {
                    API: "https://ams2.preprod.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay3.preprod.secured-by-ingenico.com"
                },
                PAR: {
                    API: "https://par-preprod.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay4.preprod.secured-by-ingenico.com"
                }
            },
            SANDBOX: {
                EU: {
                    API: "https://ams1.sandbox.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay1.sandbox.secured-by-ingenico.com"
                },
                US: {
                    API: "https://us.sandbox.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay2.sandbox.secured-by-ingenico.com"
                },
                AMS: {
                    API: "https://ams2.sandbox.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay3.sandbox.secured-by-ingenico.com"
                },
                PAR: {
                    API: "https://par.sandbox.api-ingenico.com/client/v1",
                    ASSETS: "https://assets.pay4.sandbox.secured-by-ingenico.com"
                }
            }

            // Non public settings. Only needed in GC development environment. Do not use
            // these, they will not work outside GC.
            ,
            INTEGRATION: {
                EU: {
                    API: "https://int-test-api.gcsip.nl:4443/client/v1",
                    ASSETS: "https://assets.int-test-rpp.gcsip.nl:4443"
                },
                US: {
                    API: "https://int-test-api.gcsip.nl:4443/client/v1",
                    ASSETS: "https://assets.int-test-rpp.gcsip.nl:4443"
                },
                AMS: {
                    API: "https://int-test-api.gcsip.nl:4443/client/v1",
                    ASSETS: "https://assets.int-test-rpp.gcsip.nl:4443"
                },
                PAR: {
                    API: "https://int-test-api.gcsip.nl:4443/client/v1",
                    ASSETS: "https://assets.int-test-rpp.gcsip.nl:4443"
                }
            },
            DEV_NAMI: {
                EU: {
                    API: "https://nami-test-api.gcsip.nl:4443/client/v1",
                    ASSETS: "https://assets.nami-test-rpp.gcsip.nl:4443"
                },
                US: {
                    API: "https://nami-test-api.gcsip.nl:4443/client/v1",
                    ASSETS: "https://assets.nami-test-rpp.gcsip.nl:4443"
                },
                AMS: {
                    API: "https://nami-test-api.gcsip.nl:4443/client/v1",
                    ASSETS: "https://assets.nami-test-rpp.gcsip.nl:4443"
                },
                PAR: {
                    API: "https://nami-test-api.gcsip.nl:4443/client/v1",
                    ASSETS: "https://assets.nami-test-rpp.gcsip.nl:4443"
                }
            },
            DEV_ISC: {
                EU: {
                    API: "//api.gc-dev.isaac.local/client/v1",
                    ASSETS: "//rpp.gc-dev.isaac.local"
                },
                US: {
                    API: "//api.gc-ci-dev.isaac.local/client/v1",
                    ASSETS: "//rpp.gc-ci-dev.isaac.local"
                },
                AMS: {
                    API: "//api.gc-dev.isaac.local/client/v1",
                    ASSETS: "//rpp.gc-dev.isaac.local"
                },
                PAR: {
                    API: "//api.gc-dev.isaac.local/client/v1",
                    ASSETS: "//rpp.gc-dev.isaac.local"
                }
            }
        };

        // clientSessionID, assetBaseUrl and apiBaseUrl are deprecated but still may be used. Here we check for presense of new variables, if they dont exist... Use the old variables.
        if (!sessionDetails.clientSessionId) {
            sessionDetails.clientSessionId = sessionDetails.clientSessionID;
        } else if (sessionDetails.clientSessionID) {
            throw new Error("You cannot use both the clientSessionId and the clientSessionID at the same time, please use the clientSessionId only.");
        }
        if (!sessionDetails.assetUrl) {
            sessionDetails.assetUrl = sessionDetails.assetsBaseUrl
        } else if (sessionDetails.assetsBaseUrl) {
            throw new Error("You cannot use both the assetUrl and the assetsBaseUrl at the same time, please use the assetUrl only.");
        }
        if (!sessionDetails.clientApiUrl) {
            sessionDetails.clientApiUrl = sessionDetails.apiBaseUrl
        } else if (sessionDetails.apiBaseUrl) {
            throw new Error("You cannot use both the clientApiUrl and the apiBaseUrl at the same time, please use the clientApiUrl only.");
        }

        this.clientSessionId = sessionDetails.clientSessionId;
        this.customerId = sessionDetails.customerId;

        // can be removed in a newer version of the SDK from this line
        if (sessionDetails.region && !sessionDetails.clientApiUrl) {
            // use regions; old stuff
            console.warn("Using regions is deprecated, switch to clientApiUrl");
            this.clientApiUrl = this.endpoints[sessionDetails.environment][sessionDetails.region].API;
            this.assetUrl = this.endpoints[sessionDetails.environment][sessionDetails.region].ASSETS;
        } else {
            // till this line; normal behaviour is below
            // ignore the region here
            this.clientApiUrl = sessionDetails.clientApiUrl;
            this.assetUrl = sessionDetails.assetUrl;
            if (!this.clientApiUrl) {
                throw new Error("This version of the connectSDK requires an clientApiUrl, which you did not provide.");
            }
            if (!this.assetUrl) {
                throw new Error("This version of the connectSDK requires an assetUrl, which you did not provide.");
            }

            // now that the clientApiUrl is set check when if the api version is set in the URL, its the correct version break if not.
            if (this.clientApiUrl.indexOf("//") === -1) {
                throw new Error("A valid URL is required for the clientApiUrl, you provided '" + this.clientApiUrl + "'");
            }
            var tester = this.clientApiUrl.split("/"); // [0] = (http(s): || "") , [1] = "", [2] = "host:port", [3+] = path
            if (tester[0] !== "" && tester[0].indexOf("http") !== 0) {
                throw new Error("A valid URL is required for the clientApiUrl, you provided '" + this.clientApiUrl + "'");
            }
            // if you cannot provide an URL that starts with (http(s)::)// and want an error: please provide a PR :)

            var path = tester.splice(3).join("/"); // the path (if no path; path = "").
            if (!path) { //If path == ""
                this.clientApiUrl += "/" + apiVersion;
            } else if (path === 'client') { //If path == client
                this.clientApiUrl += "/" + apiVersion.split('/')[1];
            } else if (path.indexOf(apiVersion) !== 0 || path.length !== apiVersion.length) {
                throw new Error("This version of the connectSDK is only compatible with " + apiVersion + ", you supplied: '" + path + "'");
            }
        }
    };
    connectsdk.C2SCommunicatorConfiguration = C2SCommunicatorConfiguration;
    return C2SCommunicatorConfiguration;
});
define("connectsdk.IinDetailsResponse", ["connectsdk.core", "connectsdk.promise"], function(connectsdk, Promise) {

	var IinDetailsResponse = function () {
		this.status = '';
		this.countryCode = '';
		this.paymentProductId = '';
		this.isAllowedInContext = '';
		this.coBrands = [];
	};
	connectsdk.IinDetailsResponse = IinDetailsResponse;
	return IinDetailsResponse;
});
define("connectsdk.C2SCommunicator", ["connectsdk.core", "connectsdk.promise", "connectsdk.net", "connectsdk.Util", "connectsdk.PublicKeyResponse", "connectsdk.IinDetailsResponse", "connectsdk.GooglePay", "connectsdk.ApplePay"], function (connectsdk, Promise, Net, Util, PublicKeyResponse, IinDetailsResponse, GooglePay, ApplePay) {
	var C2SCommunicator = function (c2SCommunicatorConfiguration, paymentProduct) {
		var _c2SCommunicatorConfiguration = c2SCommunicatorConfiguration;
		var _util = Util.getInstance();
		var _cache = {};
		var _providedPaymentProduct = paymentProduct;
		var that = this;
		var _GooglePay = new GooglePay(that);
		var _ApplePay = new ApplePay(that);

		var _mapType = {
			"expirydate": "tel",
			"string": "text",
			"numericstring": "tel",
			"integer": "number",
			"expirationDate": "tel"
		};

		var formatUrl = function (url) {
			return (url && endsWith(url, '/')) ? url : url + '/';
		};

		var formatImageUrl = function (url, imageUrl) {
			url = formatUrl(url);
			// _cleanJSON can be called multiple times with the same data (which is cached between calls).
			// Don't prepend the url after the first time.
			if (startsWith(imageUrl, url)) {
				return imageUrl;
			}
			return url + imageUrl;
		};

		var startsWith = function (string, prefix) {
			return string.indexOf(prefix) === 0;
		};

		var endsWith = function (string, suffix) {
			return string.indexOf(suffix, string.length - suffix.length) !== -1;
		};

		var _cleanJSON = function (json, url) {
			for (var i = 0, il = json.fields.length; i < il; i++) {
				var field = json.fields[i];
				field.type = (field.displayHints && field.displayHints.obfuscate) ? "password" : _mapType[field.type];

				// helper code for templating tools like Handlebars
				for (validatorKey in field.dataRestrictions.validators) {
					field.validators = field.validators || [];
					field.validators.push(validatorKey);
				}
				if (field.displayHints && field.displayHints.formElement && field.displayHints.formElement.type === 'list') {
					field.displayHints.formElement.list = true;
				}

				// full image paths
				if (field.displayHints && field.displayHints.tooltip && field.displayHints.tooltip.image) {
					field.displayHints.tooltip.image = formatImageUrl(url, field.displayHints.tooltip.image);
				}
			}
			// The server orders in a different way, so we apply the sortorder
			json.fields.sort(function (a, b) {
				if (a.displayHints.displayOrder < b.displayHints.displayOrder) {
					return -1;
				}
				return 1;
			});
			// set full image path
			json.displayHints.logo = formatImageUrl(url, json.displayHints.logo);
			return json;
		};

		var _extendLogoUrl = function (json, url, postfix) {
			for (var i = 0, il = json["paymentProduct" + postfix].length; i < il; i++) {
				var product = json["paymentProduct" + postfix][i];
				product.displayHints.logo = formatImageUrl(url, product.displayHints.logo);
			}
			json["paymentProduct" + postfix].sort(function (a, b) {
				if (a.displayHints.displayOrder < b.displayHints.displayOrder) {
					return -1;
				}
				return 1;
			});
			return json;
		};

		var _isPaymentProductInList = function (list, paymentProductId) {
			for (var i = list.length - 1, il = 0; i >= il; i--) {
				var product = list[i];
				if (product && (product.id === paymentProductId)) {
					return true;
				}
			}
			return false;
		};

		var _getGooglePayData = function (list, paymentProductId) {
			for (var i = list.length - 1, il = 0; i >= il; i--) {
				var product = list[i];
				if (product && (product.id === paymentProductId)) {
					return product.paymentProduct320SpecificData;
				}
			}
			return false;
		};

		var metadata = _util.getMetadata();

		var resolveGetBasicPaymentProducts = function(json, promise, cacheKey) {
			_util.filterOutProductsThatAreNotSupportedInThisBrowser(json);
			_cache[cacheKey] = json;
			if (json.paymentProducts.length === 0) {
				promise.reject('No payment products available');
			} else {
				promise.resolve(json);
			}
		}

		this.getBasicPaymentProducts = function (context, paymentProductSpecificInputs) {
			var cacheKeyLocale = context.locale ? context.locale + "_" : '';
			paymentProductSpecificInputs = paymentProductSpecificInputs || {};
			var promise = new Promise()
				, cacheBust = new Date().getTime()
				, cacheKey = "getPaymentProducts-" + context.totalAmount + "_" + context.countryCode + "_"
					+ cacheKeyLocale + context.isRecurring + "_" + context.currency + "_" + JSON.stringify(paymentProductSpecificInputs);

			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				var urlParameterLocale = context.locale ? "&locale=" + context.locale : '';
				Net.get(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId
					+ "/products" + "?countryCode=" + context.countryCode + "&isRecurring=" + context.isRecurring
					+ "&amount=" + context.totalAmount + "&currencyCode=" + context.currency
					+ "&hide=fields" + urlParameterLocale + "&cacheBust=" + cacheBust)
					.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {

						if (res.success) {
							var json = _extendLogoUrl(res.responseJSON, _c2SCommunicatorConfiguration.assetUrl, "s");
							if (_isPaymentProductInList(json.paymentProducts, _util.applePayPaymentProductId)) {
								_ApplePay.isApplePayAvailable()
							}
							if (_isPaymentProductInList(json.paymentProducts, _util.googlePayPaymentProductId)
								&& _GooglePay.isMerchantIdProvided(paymentProductSpecificInputs)) {
								var googlePayData = _getGooglePayData(json.paymentProducts, _util.googlePayPaymentProductId);
								_GooglePay.isGooglePayAvailable(context, paymentProductSpecificInputs, googlePayData).then(function () {
									resolveGetBasicPaymentProducts(json, promise, cacheKey);
								}, function () {
									resolveGetBasicPaymentProducts(json, promise, cacheKey);
								});
							} else {
								resolveGetBasicPaymentProducts(json, promise, cacheKey);
							}
						} else {
							promise.reject('failed to retrieve Basic Payment Products', res);
						}
					});
			}
			return promise;
		};

		this.getBasicPaymentProductGroups = function (context) {
			var cacheKeyLocale = context.locale ? context.locale + "_" : '';
			var promise = new Promise()
				, cacheBust = new Date().getTime()
				, cacheKey = "getPaymentProductGroups-" + context.totalAmount + "_" + context.countryCode + "_"
					+ cacheKeyLocale + context.isRecurring + "_" + context.currency;

			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				var urlParameterLocale = context.locale ? "&locale=" + context.locale : '';
				Net.get(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId
					+ "/productgroups" + "?countryCode=" + context.countryCode + "&isRecurring=" + context.isRecurring
					+ "&amount=" + context.totalAmount + "&currencyCode=" + context.currency
					+ "&hide=fields" + urlParameterLocale + "&cacheBust=" + cacheBust)
					.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							var json = _extendLogoUrl(res.responseJSON, _c2SCommunicatorConfiguration.assetUrl, "Groups");
							_cache[cacheKey] = json;
							promise.resolve(json);
						} else {
							promise.reject(res.responseJSON);
						}
					});
			}
			return promise;
		};

		this.getPaymentProduct = function (paymentProductId, context, paymentProductSpecificInputs) {
			paymentProductSpecificInputs = paymentProductSpecificInputs || {};
			var cacheKeyLocale = context.locale ? context.locale + "_" : '';
			var promise = new Promise()
				, cacheBust = new Date().getTime()
				, cacheKey = "getPaymentProduct-" + paymentProductId + "_" + context.totalAmount + "_"
					+ context.countryCode + "_" + cacheKeyLocale + context.isRecurring + "_"
					+ context.currency + "_" + JSON.stringify(paymentProductSpecificInputs);
			if (_util.paymentProductsThatAreNotSupportedInThisBrowser.indexOf(paymentProductId) > -1) {
				setTimeout(function () {
					promise.reject({
						"errorId": "48b78d2d-1b35-4f8b-92cb-57cc2638e901",
						"errors": [{
							"code": "1007",
							"propertyName": "productId",
							"message": "UNKNOWN_PRODUCT_ID",
							"httpStatusCode": 404
						}]
					});
				}, 0);
			} else {
				if (_providedPaymentProduct && _providedPaymentProduct.id === paymentProductId) {
					if (!_cache[cacheKey]) {
						_cache[cacheKey] = _cleanJSON(_providedPaymentProduct, _c2SCommunicatorConfiguration.assetUrl);
					}
					setTimeout(function () {
						promise.resolve(_cache[cacheKey]);
					}, 0);
				} else if (_cache[cacheKey]) {
					setTimeout(function () {
						promise.resolve(_cache[cacheKey]);
					}, 0);
				} else {
					var urlParameterlocale = context.locale ? "&locale=" + context.locale : '';
					var getPaymentProductUrl = formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId
						+ "/products/" + paymentProductId + "?countryCode=" + context.countryCode
						+ "&isRecurring=" + context.isRecurring + "&amount=" + context.totalAmount
						+ "&currencyCode=" + context.currency + urlParameterlocale;

					if ((paymentProductId === _util.bancontactPaymentProductId) &&
						paymentProductSpecificInputs &&
						paymentProductSpecificInputs.bancontact &&
						paymentProductSpecificInputs.bancontact.forceBasicFlow) {
						// Add query parameter to products call to force basic flow for bancontact
						getPaymentProductUrl += "&forceBasicFlow=" + paymentProductSpecificInputs.bancontact.forceBasicFlow
					}

					getPaymentProductUrl += "&cacheBust=" + cacheBust;

					Net.get(getPaymentProductUrl)
						.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
						.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
						.end(function (res) {
							if (res.success) {
								var cleanedJSON = _cleanJSON(res.responseJSON, c2SCommunicatorConfiguration.assetUrl);
								_cache[cacheKey] = cleanedJSON;
								if (paymentProductId === _util.applePayPaymentProductId && !_ApplePay.isApplePayAvailable()) {
									// ApplePay is available in the payment context but the client does not support it.
									promise.reject(cleanedJSON);
								} else if (paymentProductId === _util.googlePayPaymentProductId
									&& _GooglePay.isMerchantIdProvided(paymentProductSpecificInputs)) {
									var networks = cleanedJSON.paymentProduct320SpecificData.networks;
									_GooglePay.isGooglePayAvailable(context, paymentProductSpecificInputs, networks).then(function (isGooglePayAvailable) {
										if (isGooglePayAvailable) {
											promise.resolve(cleanedJSON);
										} else {
											//_isGooglePayAvailable returned false so google pay is not available, so reject getPaymentProduct
											promise.reject(cleanedJSON);
										}
									}, function () {
										//_isGooglePayAvailable rejected so not available
										promise.reject(cleanedJSON);
									});
								} else {
									promise.resolve(cleanedJSON);
								}
							} else {
								promise.reject('failed to retrieve Payment Product', res);
							}
						});
				}
			}
			return promise;
		};

		this.getPaymentProductGroup = function (paymentProductGroupId, context) {
			var cacheKeyLocale = context.locale ? context.locale + "_" : '';
			var promise = new Promise()
				, cacheBust = new Date().getTime()
				, cacheKey = "getPaymentProductGroup-" + paymentProductGroupId + "_" + context.totalAmount + "_"
					+ context.countryCode + "_" + cacheKeyLocale + context.isRecurring + "_"
					+ context.currency;
			if (_providedPaymentProduct && _providedPaymentProduct.id === paymentProductGroupId) {
				if (_cache[cacheKey]) {
					setTimeout(function () {
						promise.resolve(_cache[cacheKey]);
					}, 0);
				} else {
					_cache[cacheKey] = _cleanJSON(_providedPaymentProduct, _c2SCommunicatorConfiguration.assetUrl);
					setTimeout(function () {
						promise.resolve(_cache[cacheKey]);
					}, 0);
				}
			} else if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				var urlParameterlocale = context.locale ? "&locale=" + context.locale : '';
				Net.get(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId
					+ "/productgroups/" + paymentProductGroupId + "?countryCode=" + context.countryCode
					+ "&isRecurring=" + context.isRecurring + "&amount=" + context.totalAmount
					+ "&currencyCode=" + context.currency + urlParameterlocale + "&cacheBust=" + cacheBust)
					.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							var cleanedJSON = _cleanJSON(res.responseJSON, c2SCommunicatorConfiguration.assetUrl);
							_cache[cacheKey] = cleanedJSON;
							promise.resolve(cleanedJSON);
						} else {
							promise.reject(res.responseJSON);
						}
					});
			}
			return promise;
		};

		this.getPaymentProductIdByCreditCardNumber = function (partialCreditCardNumber, context) {
			var promise = new Promise()
				, iinDetailsResponse = new IinDetailsResponse()
				, cacheKey = "getPaymentProductIdByCreditCardNumber-" + partialCreditCardNumber;

			var that = this;
			this.context = context;
			if (_cache[cacheKey]) {// cache is based on digit 1-6
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				var isEnoughDigits = function (partialCreditCardNumber) {
					return partialCreditCardNumber.length >= 6;
				};
				if (isEnoughDigits(partialCreditCardNumber)) {
					Net.post(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId + "/services/getIINdetails")
						.data(JSON.stringify(this.convertContextToIinDetailsContext(partialCreditCardNumber, this.context)))
						.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
						.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
						.end(function (res) {
							if (res.success) {
								iinDetailsResponse.json = res.responseJSON;
								iinDetailsResponse.countryCode = res.responseJSON.countryCode;
								iinDetailsResponse.paymentProductId = res.responseJSON.paymentProductId;
								iinDetailsResponse.isAllowedInContext = res.responseJSON.isAllowedInContext;
								iinDetailsResponse.coBrands = res.responseJSON.coBrands;
								// check if this card is supported
								// if isAllowedInContext is available in the response set status and resolve
								if (res.responseJSON.hasOwnProperty('isAllowedInContext')) {
									iinDetailsResponse.status = "SUPPORTED";
									if (iinDetailsResponse.isAllowedInContext === false) {
										iinDetailsResponse.status = "EXISTING_BUT_NOT_ALLOWED";
									}
									_cache[cacheKey] = iinDetailsResponse;
									promise.resolve(iinDetailsResponse);
								} else {
									//if isAllowedInContext is not available get the payment product again to determine status and resolve
									that.getPaymentProduct(iinDetailsResponse.paymentProductId, that.context).then(function (paymentProduct) {
										if (paymentProduct) {
											iinDetailsResponse.status = "SUPPORTED";
										} else {
											iinDetailsResponse.status = "UNSUPPORTED";
										}
										_cache[cacheKey] = iinDetailsResponse;
										promise.resolve(iinDetailsResponse);
									}, function () {
										iinDetailsResponse.status = "UNKNOWN";
										promise.reject(iinDetailsResponse);
									});
								}
							} else {
								iinDetailsResponse.status = "UNKNOWN";
								iinDetailsResponse.json = res.responseJSON;
								promise.reject(iinDetailsResponse);
							}
						});
				} else {
					iinDetailsResponse.status = "NOT_ENOUGH_DIGITS";
					setTimeout(function () {
						promise.resolve(iinDetailsResponse);
					}, 0);
				}
			}
			return promise;
		};

		this.convertContextToIinDetailsContext = function (partialCreditCardNumber, context) {
			var payload = {
				"bin": partialCreditCardNumber,
				"paymentContext": {
					"countryCode": context.countryCode,
					"isRecurring": context.isRecurring,
					"amountOfMoney": {
						"amount": context.totalAmount,
						"currencyCode": context.currency
					}
				}
			};

			// Account on file id is needed only in case when the merchant
			// uses multiple payment platforms at the same time.
			if (typeof context.accountOnFileId !== 'undefined') {
				payload.accountOnFileId = context.accountOnFileId;
			}

			return payload;
		};

		this.getPublicKey = function () {
			var promise = new Promise()
				, cacheKey = "publicKey";

			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId + "/crypto/publickey")
					.set("X-GCS-ClientMetaInfo", _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							var publicKeyResponse = new PublicKeyResponse(res.responseJSON);
							_cache[cacheKey] = publicKeyResponse;
							promise.resolve(publicKeyResponse);
						} else {
							promise.reject("unable to get public key");
						}
					});
			}
			return promise;
		};

		this.getPaymentProductNetworks = function (paymentProductId, context) {
			var promise = new Promise()
				, cacheKey = "paymentProductNetworks-" + paymentProductId + "_" + context.countryCode + "_" + context.currency + "_"
					+ context.totalAmount + "_" + context.isRecurring;

			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId
					+ "/products/" + paymentProductId + "/networks" + "?countryCode=" + context.countryCode + "&currencyCode=" + context.currency
					+ "&amount=" + context.totalAmount + "&isRecurring=" + context.isRecurring)
					.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							_cache[cacheKey] = res.responseJSON;
							promise.resolve(res.responseJSON);
						} else {
							promise.reject(res.responseJSON);
						}
					});
			}
			return promise;
		};

		this.getPaymentProductDirectory = function (paymentProductId, currencyCode, countryCode) {
			var promise = new Promise()
				, cacheKey = "getPaymentProductDirectory-" + paymentProductId + "_" + currencyCode + "_" + countryCode;

			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId + "/products/" + paymentProductId + "/directory?countryCode=" + countryCode + "&currencyCode=" + currencyCode)
					.set("X-GCS-ClientMetaInfo", _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							_cache[cacheKey] = res.responseJSON;
							promise.resolve(res.responseJSON);
						} else {
							promise.reject("unable to retrieve payment product directory");
						}
					});
			}
			return promise;
		};

		this.convertAmount = function (amount, source, target) {
			var promise = new Promise()
				, cacheKey = "convertAmount-" + amount + "_" + source + "_" + target;

			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId + "/services/convert/amount?source=" + source + "&target=" + target + "&amount=" + amount)
					.set("X-GCS-ClientMetaInfo", _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							_cache[cacheKey] = res.responseJSON;
							promise.resolve(res.responseJSON);
						} else {
							promise.reject("unable to convert amount");
						}
					});
			}
			return promise;
		};

		this.getThirdPartyPaymentStatus = function (paymentId) {
			var promise = new Promise();

			Net.get(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId + "/payments/" + paymentId + "/thirdpartystatus")
				.set("X-GCS-ClientMetaInfo", _util.base64Encode(metadata))
				.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
				.end(function (res) {
					if (res.success) {
						promise.resolve(res.responseJSON);
					} else {
						promise.reject("unable to retrieve third party status");
					}
				});
			return promise;
		};

		this.getCustomerDetails = function (paymentProductId, context) {
			var promise = new Promise();
			var cacheKey = "getCustomerDetails_" + context.countryCode;
			cacheKey = constructCacheKeyFromKeyValues(cacheKey, context.values);
			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.post(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId + "/products/" + paymentProductId + "/customerDetails")
					.data(JSON.stringify(context))
					.set("X-GCS-ClientMetaInfo", _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							_cache[cacheKey] = res.responseJSON;
							promise.resolve(res.responseJSON);
						} else {
							promise.reject(res.responseJSON);
						}
					});
			}
			return promise;
		};

		this.createPaymentProductSession = function (paymentProductId, context) {
			var promise = new Promise();
			var cacheKey = "createPaymentProductSession_" + context.validationURL + "_" + context.domainName + "_" + context.displayName;
			var requestParameters = {
				"paymentProductSession302SpecificInput": {
					"validationUrl": context.validationURL,
					"domainName": context.domainName,
					"displayName": context.displayName
				}
			};
			if (_cache[cacheKey]) {
				setTimeout(function () {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.post(formatUrl(_c2SCommunicatorConfiguration.clientApiUrl) + _c2SCommunicatorConfiguration.customerId + "/products/" + paymentProductId + "/sessions")
					.data(JSON.stringify(requestParameters))
					.set("X-GCS-ClientMetaInfo", _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function (res) {
						if (res.success) {
							_cache[cacheKey] = res.responseJSON;
							promise.resolve(res.responseJSON);
						} else {
							promise.reject(res.responseJSON);
						}
					});
			}
			return promise;
		};

		this.initApplePayPayment = function (context, paymentProductSpecificInputs, networks) {
			var promise = new Promise();
			var _context = context;
			_context.displayName = paymentProductSpecificInputs.merchantName;
			if (paymentProductSpecificInputs.acquirerCountry) {
				_context.acquirerCountry = paymentProductSpecificInputs.acquirerCountry;
			}
			_context.networks = networks;

			_ApplePay.initPayment(_context, this).then(function (res) {
				promise.resolve(res);
			}, function (res) {
				promise.reject(res);
			});
			return promise;
		}


		var constructCacheKeyFromKeyValues = function (prefix, values) {
			var cacheKey = prefix;
			for (var key in values) {
				if (values.hasOwnProperty(key)) {
					cacheKey += "_" + values[key].key + "_" + values[key].value;
				}
			}
			return cacheKey;
		};

		/* Transforms the JSON representation of a payment product (group) so it matches the result of getPaymentProduct and getPaymentProductGroup. */
		this.transformPaymentProductJSON = function (json) {
			return _cleanJSON(json, _c2SCommunicatorConfiguration.assetUrl)
		};
	};

	connectsdk.C2SCommunicator = C2SCommunicator;
	return C2SCommunicator;
});

define("connectsdk.LabelTemplateElement", ["connectsdk.core"], function(connectsdk) {

	var LabelTemplateElement = function (json) {
		this.json = json;
		this.attributeKey = json.attributeKey;
		this.mask = json.mask;
		this.wildcardMask = json.mask ? json.mask.replace(/9/g, "*") : "";
	};

	connectsdk.LabelTemplateElement = LabelTemplateElement;
	return LabelTemplateElement;
});
define("connectsdk.Attribute", ["connectsdk.core"], function(connectsdk) {

	var Attribute = function (json) {
		this.json = json;
		this.key = json.key;
		this.value = json.value;
		this.status = json.status;
		this.mustWriteReason = json.mustWriteReason;
	};

	connectsdk.Attribute = Attribute;
	return Attribute;
});
define("connectsdk.AccountOnFileDisplayHints", ["connectsdk.core", "connectsdk.LabelTemplateElement"], function(connectsdk, LabelTemplateElement) {

	var _parseJSON = function (_json, _labelTemplate, _labelTemplateElementByAttributeKey) {
		if (_json.labelTemplate) {
			for (var i = 0, l = _json.labelTemplate.length; i < l; i++) {
				var labelTemplateElement = new LabelTemplateElement(_json.labelTemplate[i]);
				_labelTemplate.push(labelTemplateElement);
				_labelTemplateElementByAttributeKey[labelTemplateElement.attributeKey] = labelTemplateElement;
			}
		}
	};

	var AccountOnFileDisplayHints = function (json) {
		this.json = json;
		this.labelTemplate = [];
		this.labelTemplateElementByAttributeKey = {};

		_parseJSON(json, this.labelTemplate, this.labelTemplateElementByAttributeKey);
	};

	connectsdk.AccountOnFileDisplayHints = AccountOnFileDisplayHints;
	return AccountOnFileDisplayHints;
});
define("connectsdk.AccountOnFile", ["connectsdk.core" ,"connectsdk.AccountOnFileDisplayHints", "connectsdk.Attribute"], function(connectsdk, AccountOnFileDisplayHints, Attribute) {

	var _parseJSON = function (_json, _attributes, _attributeByKey) {
		if (_json.attributes) {
			for (var i = 0, l = _json.attributes.length; i < l; i++) {
				var attribute = new Attribute(_json.attributes[i]);
				_attributes.push(attribute);
				_attributeByKey[attribute.key] = attribute;
			}
		}
	};

	var AccountOnFile = function (json) {
		var that = this;
		this.json = json;
		this.attributes = [];
		this.attributeByKey = {};
		this.displayHints = new AccountOnFileDisplayHints(json.displayHints);
		this.id = json.id;
		this.paymentProductId = json.paymentProductId;

		this.getMaskedValueByAttributeKey = function(attributeKey) {
			var value = this.attributeByKey[attributeKey].value;
			var wildcardMask;
			try {
				wildcardMask = this.displayHints.labelTemplateElementByAttributeKey[attributeKey].wildcardMask;
			} catch (e) {}
			if (value !== undefined && wildcardMask !== undefined) {
				var maskingUtil = new connectsdk.MaskingUtil();
				return maskingUtil.applyMask(wildcardMask, value);
			}
			return undefined;
		};

		_parseJSON(json, this.attributes, this.attributeByKey);
	};

	connectsdk.AccountOnFile = AccountOnFile;
	return AccountOnFile;
});
define("connectsdk.PaymentProduct302SpecificData", ["connectsdk.core"], function(connectsdk) {

	var PaymentProduct302SpecificData = function (json) {
		this.json = json;
		this.networks = json.networks;
	};

	connectsdk.PaymentProduct302SpecificData = PaymentProduct302SpecificData;
	return PaymentProduct302SpecificData;
});
define("connectsdk.PaymentProduct320SpecificData", ["connectsdk.core"], function(connectsdk) {

	var PaymentProduct320SpecificData = function (json) {
		this.json = json;
		this.gateway = json.gateway;
		this.networks = json.networks;
	};

	connectsdk.PaymentProduct320SpecificData = PaymentProduct320SpecificData;
	return PaymentProduct320SpecificData;
});
define("connectsdk.PaymentProduct863SpecificData", ["connectsdk.core"], function(connectsdk) {

	var PaymentProduct863SpecificData = function (json) {
		this.json = json;
		this.integrationTypes = json.integrationTypes;
	};

	connectsdk.PaymentProduct863SpecificData = PaymentProduct863SpecificData;
	return PaymentProduct863SpecificData;
});
define("connectsdk.PaymentProductDisplayHints", ["connectsdk.core"], function(connectsdk) {

	var PaymentProductDisplayHints = function (json) {
		this.json = json;
		this.displayOrder = json.displayOrder;
		this.label = json.label;
		this.logo = json.logo;
	};

	connectsdk.PaymentProductDisplayHints = PaymentProductDisplayHints;
	return PaymentProductDisplayHints;
});
define("connectsdk.BasicPaymentProduct", ["connectsdk.core", "connectsdk.AccountOnFile", "connectsdk.PaymentProductDisplayHints", "connectsdk.PaymentProduct302SpecificData", "connectsdk.PaymentProduct320SpecificData", "connectsdk.PaymentProduct863SpecificData"], function(connectsdk, AccountOnFile, PaymentProductDisplayHints, PaymentProduct302SpecificData, PaymentProduct320SpecificData, PaymentProduct863SpecificData) {

	var _parseJSON = function (_json, _paymentProduct, _accountsOnFile, _accountOnFileById) {
		if (_json.accountsOnFile) {
			for (var i = 0, il = _json.accountsOnFile.length; i < il; i++) {
				var accountOnFile = new AccountOnFile(_json.accountsOnFile[i]);
				_accountsOnFile.push(accountOnFile);
				_accountOnFileById[accountOnFile.id] = accountOnFile;
			}
		}
		if (_json.paymentProduct302SpecificData) {
			_paymentProduct.paymentProduct302SpecificData = new PaymentProduct302SpecificData(_json.paymentProduct302SpecificData);
		}
		if (_json.paymentProduct320SpecificData) {
			_paymentProduct.paymentProduct320SpecificData = new PaymentProduct320SpecificData(_json.paymentProduct320SpecificData);
		}
		if (_json.paymentProduct863SpecificData) {
			_paymentProduct.paymentProduct863SpecificData = new PaymentProduct863SpecificData(_json.paymentProduct863SpecificData);
		}
	};

	var BasicPaymentProduct = function (json) {
		this.json = json;
		this.json.type = "product";
		this.accountsOnFile = [];
		this.accountOnFileById = {};
		this.allowsRecurring = json.allowsRecurring;
		this.allowsTokenization = json.allowsTokenization;
		this.autoTokenized = json.autoTokenized;
		this.allowsInstallments = json.allowsInstallments;
		this.acquirerCountry = json.acquirerCountry;
		this.displayHints = new PaymentProductDisplayHints(json.displayHints);
		this.id = json.id;
		this.maxAmount = json.maxAmount;
		this.minAmount = json.minAmount;
		this.paymentMethod = json.paymentMethod;
		this.mobileIntegrationLevel = json.mobileIntegrationLevel;
		this.usesRedirectionTo3rdParty = json.usesRedirectionTo3rdParty;
		this.paymentProductGroup = json.paymentProductGroup;

		_parseJSON(json, this, this.accountsOnFile, this.accountOnFileById);
	};

	connectsdk.BasicPaymentProduct = BasicPaymentProduct;
	return BasicPaymentProduct;
});
define("connectsdk.BasicPaymentProductGroup", ["connectsdk.core", "connectsdk.AccountOnFile", "connectsdk.PaymentProductDisplayHints"], function(connectsdk, AccountOnFile, PaymentProductDisplayHints) {

	var _parseJSON = function (_json, _accountsOnFile, _accountOnFileById) {
		if (_json.accountsOnFile) {
			for (var i = 0, il = _json.accountsOnFile.length; i < il; i++) {
				var accountOnFile = new AccountOnFile(_json.accountsOnFile[i]);
				_accountsOnFile.push(accountOnFile);
				_accountOnFileById[accountOnFile.id] = accountOnFile;
			}
		}
	};

	var BasicPaymentProductGroup = function (json) {
		this.json = json;
		this.json.type = "group";
		this.id = json.id;
		this.acquirerCountry = json.acquirerCountry;
		this.displayHints = new PaymentProductDisplayHints(json.displayHints);
		this.accountsOnFile = [];
		this.accountOnFileById = {};
		_parseJSON(json, this.accountsOnFile, this.accountOnFileById);
	};

	connectsdk.BasicPaymentProductGroup = BasicPaymentProductGroup;
	return BasicPaymentProductGroup;
});
define("connectsdk.MaskedString", ["connectsdk.core"], function(connectsdk) {

	var MaskedString = function(formattedValue, cursorIndex) {

		this.formattedValue = formattedValue;
		this.cursorIndex = cursorIndex;
	};

	connectsdk.MaskedString = MaskedString;
	return MaskedString;
});
define("connectsdk.MaskingUtil", ["connectsdk.core", "connectsdk.MaskedString"], function(connectsdk, MaskedString) {

	var _fillBuffer = function(index, offset, buffer, tempMask, valuec) {
		if (index+offset < valuec.length && index < tempMask.length) {
			if ((tempMask[index] === "9" && Number(valuec[index+offset]) > -1 && valuec[index+offset] !== " ") || tempMask[index] === "*") {
				buffer.push(valuec[index+offset]);
			} else {
				if (valuec[index+offset] === tempMask[index]) {
					buffer.push(valuec[index+offset]);
				} else if (tempMask[index] !== "9" && tempMask[index] !== "*") {
					buffer.push(tempMask[index]);
					offset--;
				} else {
					// offset++;
					valuec.splice(index+offset, 1);
					index--;
				}
			}
			_fillBuffer(index+1, offset, buffer, tempMask, valuec);
		}
	};

	var MaskingUtil = function () {
		this.applyMask = function (mask, newValue, oldValue) {
			var buffer = [],
					valuec = newValue.split("");
			if (mask) {
				var maskc = mask.split(""),
						tempMask = [];
				for (var i = 0, il = maskc.length; i < il; i++) {
					// the char '{' and '}' should ALWAYS be ignored
					var c = maskc[i];
					if (c === "{" || c === "}") {
						// ignore
					} else {
						tempMask.push(c);
					}
				}
				// tempmask now contains the replaceable chars and the non-replaceable masks at the correct index
				_fillBuffer(0, 0, buffer, tempMask, valuec);
			} else {
				// send back as is
				for (var i = 0, il = valuec.length; i < il; i++) {
					var c = valuec[i];
					buffer.push(c);
				}
			}
			newValue = buffer.join("");
			var cursor = 1;
			// calculate the cursor index
			if (oldValue) {
				var tester = oldValue.split("");
				for (var i = 0, il = buffer.length; i < il; i++) {
					if (buffer[i] !== tester[i]) {
						cursor = i+1;
						break;
					}
				}
			}
			if (newValue.substring(0, newValue.length -1) === oldValue) {
				cursor = newValue.length + 1;
			}
			return new MaskedString(newValue, cursor);
		};

		this.getMaxLengthBasedOnMask = function (mask) {
			if (mask) {
				var maskc = mask.split(""),
						newLength = -1;
				for (var i = 0, il = maskc.length; i < il; i++) {
					newLength++;
					var c = maskc[i];
					if (c === "{" || c === "}") {
						newLength--;
					}
				}
				return newLength;
			}
		};

		this.removeMask = function (mask, value) {
			// remove the mask from the masked input
			var buffer = [],
					valuec = (value) ? value.split("") : [];
			if (mask) {
				var maskc = mask.split(""),
						valueIndex = -1,
						inMask = false;
				for (var i = 0, il = maskc.length; i < il; i++) {
					valueIndex++;
					// the char '{' and '}' should ALWAYS be ignored
					var c = maskc[i];
					if (c === "{" || c === "}") {
						valueIndex--;
						if (c === "{") {
							inMask = true;
						} else if (c === "}") {
							inMask = false;
						}
					} else {
						if (inMask && valuec[valueIndex]) {
							buffer.push(valuec[valueIndex]);
						}
					}
				}
			} else {
				// send back as is
				for (var i = 0, il = valuec.length; i < il; i++) {
					var c = valuec[i];
					buffer.push(c);
				}
			}
			return buffer.join("").trim();
		};
	};

	connectsdk.MaskingUtil = MaskingUtil;
	return MaskingUtil;
});

define("connectsdk.ValidationRuleLuhn", ["connectsdk.core"], function(connectsdk) {

	var ValidationRuleLuhn = function (json) {
		this.json = json;
        this.type = json.type,
        this.errorMessageId = json.type;
		this.validate = function (value) {
			var luhnArr = [[0,2,4,6,8,1,3,5,7,9],[0,1,2,3,4,5,6,7,8,9]]
				,sum = 0;

	   		value.replace(/\D+/g,"").replace(/[\d]/g, function(c, p, o) {
		        sum += luhnArr[ (o.length-p)&1 ][ parseInt(c,10) ];
		    });
		    return (sum%10 === 0) && (sum > 0);
		};
	};

	connectsdk.ValidationRuleLuhn = ValidationRuleLuhn;
	return ValidationRuleLuhn;
});

define("connectsdk.ValidationRuleExpirationDate", ["connectsdk.core"], function (connectsdk) {

	var _validateDateFormat = function (value) {
		// value is mmYY or mmYYYY
		var pattern = /\d{4}|\d{6}$/g;
		return pattern.test(value);
	};

	var ValidationRuleExpirationDate = function (json) {
		this.json = json;
		this.type = json.type;
		this.errorMessageId = json.type;

		this.validate = function (value) {

			value = value.replace(/[^\d]/g, '');
			if (!_validateDateFormat(value)) {
				return false;
			}

			var split;
			if (value.length === 4) {
				split = [value.substring(0, 2), "20" + value.substring(2, 4)];
			} else if (value.length === 6) {
				split = [value.substring(0, 2), value.substring(2, 6)];
			} else {
				return false;
			}

			// The month is zero-based, so subtract one.
			var expirationMonth = split[0] - 1;
			var expirationYear = split[1];
			var expirationDate = new Date(expirationYear, expirationMonth, 1);

			// Compare the input with the parsed date, to check if the date rolled over.
			if (expirationDate.getMonth() !== Number(expirationMonth) || expirationDate.getFullYear() !== Number(expirationYear)) {
				return false;
			}

			// For comparison, set the current year & month and the maximum allowed expiration date.
			var nowWithDay = new Date();
			var now = new Date(nowWithDay.getFullYear(), nowWithDay.getMonth(), 1);
			var maxExpirationDate = new Date(nowWithDay.getFullYear() + 25, 11, 1);

			// The card is still valid if it expires this month.
			return expirationDate >= now && expirationDate <= maxExpirationDate;
		};
	};

	connectsdk.ValidationRuleExpirationDate = ValidationRuleExpirationDate;
	return ValidationRuleExpirationDate;
});

define("connectsdk.ValidationRuleFixedList", ["connectsdk.core"], function(connectsdk) {

	var ValidationRuleFixedList = function (json) {
		this.json = json;
        this.type = json.type,
        this.errorMessageId = json.type;
		this.allowedValues = json.attributes.allowedValues;

		this.validate = function (value) {
			for (var i = 0, il = this.allowedValues.length; i < il; i++) {
				if (this.allowedValues[i] === value) {
					return true;
				}
			}
			return false;
		};
	};

	connectsdk.ValidationRuleFixedList = ValidationRuleFixedList;
	return ValidationRuleFixedList;
});

define("connectsdk.ValidationRuleLength", ["connectsdk.core"], function(connectsdk) {

	var ValidationRuleLength = function (json) {
		this.json = json;
        this.type = json.type,
        this.errorMessageId = json.type;
        this.maxLength = json.attributes.maxLength;
		this.minLength = json.attributes.minLength;

		this.validate = function (value) {
			return this.minLength <= value.length && value.length <= this.maxLength;
		};
	};

	connectsdk.ValidationRuleLength = ValidationRuleLength;
	return ValidationRuleLength;
});

define("connectsdk.ValidationRuleRange", ["connectsdk.core"], function(connectsdk) {

	var ValidationRuleRange = function(json) {
		this.json = json;
        this.type = json.type,
        this.errorMessageId = json.type;
        this.maxValue = json.attributes.maxValue;
		this.minValue = json.attributes.minValue;

		this.validate = function(value) {
			if (isNaN(value)) {
				return false;
			}
			value = Number(value);
			return this.minValue <= value && value <= this.maxValue;
		};
	};

	connectsdk.ValidationRuleRange = ValidationRuleRange;
	return ValidationRuleRange;
});

define("connectsdk.ValidationRuleRegularExpression", ["connectsdk.core"], function(connectsdk) {

	var ValidationRuleRegularExpression = function(json) {
		this.json = json;
        this.type = json.type,
        this.errorMessageId = json.type;
		this.regularExpression = json.attributes.regularExpression;

		this.validate = function(value) {
			var regexp = new RegExp(this.regularExpression);
			return regexp.test(value);
		};
	};

	connectsdk.ValidationRuleRegularExpression = ValidationRuleRegularExpression;
	return ValidationRuleRegularExpression;
});

define("connectsdk.ValidationRuleResidentIdNumber", ["connectsdk.core"], function(connectsdk) {

	var ValidationRuleResidentIdNumber = function (json) {
		this.json = json;
        this.type = json.type,
        this.errorMessageId = json.type;

        // https://en.wikipedia.org/wiki/Resident_Identity_Card
		var weights = [];
		// storing weights in the reverse order so that we can begin
		// from the 0th position of ID while calculating checksum
		for(var i=18; i > 0; i--) {
			weights.push(Math.pow(2, i-1) % 11);
		}

		this.validate = function (value) {
			if(value.length < 15) {
				return false;
			}

			if(value.length == 15) {
				return !isNaN(value);
			}

			if(value.length < 18 || value.length > 18) {
				return false;
			}

            var sum = 0;
            for(var i = 0; i < value.length-1; i++) {
            	sum += value.charAt(i) * weights[i];
            }

            var checkSum = (12 - (sum % 11)) % 11;
            var csChar = value.charAt(17);

            if(checkSum < 10) {
               return (checkSum == csChar); // check only values
            }

		    return (csChar === 'X'); // check the type as well
		};
	};

	connectsdk.ValidationRuleResidentIdNumber = ValidationRuleResidentIdNumber;
	return ValidationRuleResidentIdNumber;
});
define("connectsdk.ValidationRuleEmailAddress", ["connectsdk.core"], function(connectsdk) {

	var ValidationRuleEmailAddress = function(json) {
		this.json = json;
		this.type = json.type,
		this.errorMessageId = json.type;

		this.validate = function(value) {
			var regexp = new RegExp(/^[^@\.]+(\.[^@\.]+)*@([^@\.]+\.)*[^@\.]+\.[^@\.][^@\.]+$/i);
			return regexp.test(value);
		};
	};

	connectsdk.ValidationRuleEmailAddress = ValidationRuleEmailAddress;
	return ValidationRuleEmailAddress;
});
define("connectsdk.ValidationRuleTermsAndConditions", ["connectsdk.core"], function(connectsdk) {

	var ValidationRuleTermsAndConditions = function(json) {
		this.json = json;
		this.type = json.type,
		this.errorMessageId = json.type;

		this.validate = function(value) {
			return true === value || "true" === value;
		};
	};

	connectsdk.ValidationRuleTermsAndConditions = ValidationRuleTermsAndConditions;
	return ValidationRuleTermsAndConditions;
});
define("connectsdk.ValidationRuleBoletoBancarioRequiredness", ["connectsdk.core"], function(connectsdk) {

	var ValidationRuleBoletoBancarioRequiredness = function (json) {
		this.json = json;
        this.type = json.type,
        this.errorMessageId = json.type;
        this.fiscalNumberLength = json.attributes.fiscalNumberLength;

		this.validate = function (value, fiscalNumberValue) {
			if (typeof fiscalNumberValue === 'undefined') {
				fiscalNumberValue = '';
			}

			return (fiscalNumberValue.length === this.fiscalNumberLength && value.length > 0) || fiscalNumberValue.length !== this.fiscalNumberLength;
		};
	};

	connectsdk.ValidationRuleBoletoBancarioRequiredness = ValidationRuleBoletoBancarioRequiredness;
	return ValidationRuleBoletoBancarioRequiredness;
});

define('connectsdk.ValidationRuleIban', ['connectsdk.core'], function (connectsdk) {

  /**
   * Sanitize value by remove all unwanted chars of a Iban format
   *
   * @param {String} value
   * @returns {string}
   * @private
   */
  var _sanitizeValue = function (value) {
    return value.replace(/[^\d\w]+/g, '').toUpperCase();
  };

  /**
   * Get state if given value is a valid Iban format
   *
   * @param {String} value
   * @returns {boolean}
   * @private
   */
  var _isValidFormat = function (value) {
    return typeof value === 'string' && /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/.test(_sanitizeValue(value));
  };

  /**
   * Convert a value to a string needed for validation calculations
   *
   * @param {String} value
   * @returns {string}
   * @private
   */
  var _toComputedString = function (value) {
    return _sanitizeValue(value)

    // place the first 4 chars to the end
      .replace(/(^.{4})(.*)/, '$2$1')

      // replace letters by corresponding numbers A=10 / Z=35
      .replace(/[A-Z]/g, function (d) {
        return d.charCodeAt(0) - 55;
      });
  }

  /**
   * Validate Iban by given json
   *
   * @param {Object} json
   * @constructor
   */
  var ValidationRuleIban = function (json) {
    this.json           = json;
    this.type           = json.type;
    this.errorMessageId = json.type;

    /**
     * Validate Iban nrule
     *
     * @see https://github.com/arhs/iban.js/blob/master/iban.js
     *
     * @param   {string} value
     * @returns {boolean}
     */
    this.validate = function (value) {

      // bail if format is invalid
      if (!_isValidFormat(value)) {
        return false;
      }

      // Check if reminder module 97 equals 1
      // only then it should pass the validation
      var remainder = _toComputedString(value),
          block;

      while (remainder.length > 2) {
        block     = remainder.slice(0, 9);
        remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
      }

      return (parseInt(remainder, 10) % 97) === 1;
    };
  };

  connectsdk.ValidationRuleIban = ValidationRuleIban;
  return ValidationRuleIban;
});
define("connectsdk.ValidationRuleFactory", ["connectsdk.core", "connectsdk.ValidationRuleEmailAddress", "connectsdk.ValidationRuleTermsAndConditions", "connectsdk.ValidationRuleExpirationDate", "connectsdk.ValidationRuleFixedList", "connectsdk.ValidationRuleLength", "connectsdk.ValidationRuleLuhn", "connectsdk.ValidationRuleRange", "connectsdk.ValidationRuleRegularExpression", "connectsdk.ValidationRuleBoletoBancarioRequiredness", "connectsdk.ValidationRuleIban", "connectsdk.ValidationRuleResidentIdNumber"], function (connectsdk, ValidationRuleEmailAddress, ValidationRuleTermsAndConditions, ValidationRuleExpirationDate, ValidationRuleFixedList, ValidationRuleLength, ValidationRuleLuhn, ValidationRuleRange, ValidationRuleRegularExpression, ValidationRuleBoletoBancarioRequiredness, ValidationRuleIban, ValidationRuleResidentIdNumber) {

    var validationRules = {
        EmailAddress : ValidationRuleEmailAddress,
        TermsAndConditions: ValidationRuleTermsAndConditions,
        ExpirationDate : ValidationRuleExpirationDate,
        FixedList : ValidationRuleFixedList,
        Length : ValidationRuleLength,
        Luhn: ValidationRuleLuhn,
        Range: ValidationRuleRange,
        RegularExpression: ValidationRuleRegularExpression,
        BoletoBancarioRequiredness: ValidationRuleBoletoBancarioRequiredness,
        Iban: ValidationRuleIban,
        ResidentIdNumber: ValidationRuleResidentIdNumber
    }

    var ValidationRuleFactory = function () {
        this.makeValidator = function (json) {
            try {
                var rule = json.type.charAt(0).toUpperCase() + json.type.slice(1);
                return new validationRules[rule](json);
            } catch (e) {
                console.warn('no validator for ', rule);
            }
            return null;
        };
    };

    connectsdk.ValidationRuleFactory = ValidationRuleFactory;
    return ValidationRuleFactory;
});

define("connectsdk.DataRestrictions", ["connectsdk.core", "connectsdk.ValidationRuleExpirationDate", "connectsdk.ValidationRuleFixedList", "connectsdk.ValidationRuleLength", "connectsdk.ValidationRuleLuhn", "connectsdk.ValidationRuleRange", "connectsdk.ValidationRuleRegularExpression", "connectsdk.ValidationRuleEmailAddress", "connectsdk.ValidationRuleTermsAndConditions", "connectsdk.ValidationRuleIban", "connectsdk.ValidationRuleResidentIdNumber", "connectsdk.ValidationRuleFactory"], function(connectsdk, ValidationRuleExpirationDate, ValidationRuleFixedList, ValidationRuleLength, ValidationRuleLuhn, ValidationRuleRange, ValidationRuleRegularExpression, ValidationRuleEmailAddress, ValidationRuleTermsAndConditions, ValidationRuleIban, ValidationRuleResidentIdNumber, ValidationRuleFactory) {

	var DataRestrictions = function (json, mask) {

		var _parseJSON = function (_json, _validationRules, _validationRuleByType) {
		    var validationRuleFactory = new ValidationRuleFactory();
			if (_json.validators) {
				for (var key in _json.validators) {
					var validationRule = validationRuleFactory.makeValidator({type: key, attributes: _json.validators[key]});
					if (validationRule) {
						_validationRules.push(validationRule);
						_validationRuleByType[validationRule.type] = validationRule;
					}
				}
			}
		};

		this.json = json;
		this.isRequired = json.isRequired;
		this.validationRules = [];
		this.validationRuleByType = {};

		_parseJSON(json, this.validationRules, this.validationRuleByType);
	};

	connectsdk.DataRestrictions = DataRestrictions;
	return DataRestrictions;
});
define("connectsdk.ValueMappingElement", ["connectsdk.core"], function(connectsdk) {

	var ValueMappingElement = function (json) {
		this.json = json;
		this.displayName = json.displayName;
		this.value = json.value;
	};

	connectsdk.ValueMappingElement = ValueMappingElement;
	return ValueMappingElement;
});
define("connectsdk.FormElement", ["connectsdk.core", "connectsdk.ValueMappingElement"], function(connectsdk, ValueMappingElement) {

	var FormElement = function (json) {

		var _parseJSON = function (_json, _valueMapping) {
			if (_json.valueMapping) {
				for (var i = 0, l = _json.valueMapping.length; i < l; i++) {
					_valueMapping.push(new ValueMappingElement(_json.valueMapping[i]));
				}
			}
		};

		this.json = json;
		this.type = json.type;
		this.valueMapping = [];

		_parseJSON(json, this.valueMapping);
	};

	connectsdk.FormElement = FormElement;
	return FormElement;
});

define("connectsdk.Tooltip", ["connectsdk.core"], function(connectsdk) {

	var Tooltip = function (json) {
		this.json = json;
		this.image = json.image;
		this.label = json.label;
	};

	connectsdk.Tooltip = Tooltip;
	return Tooltip;
});
define("connectsdk.PaymentProductFieldDisplayHints", ["connectsdk.core", "connectsdk.Tooltip", "connectsdk.FormElement"], function(connectsdk, Tooltip, FormElement) {

	var PaymentProductFieldDisplayHints = function (json) {
		this.json = json;
 		this.displayOrder = json.displayOrder;
		if (json.formElement) {
			this.formElement = new FormElement(json.formElement);
		}
		this.label = json.label;
		this.mask = json.mask;
		this.obfuscate = json.obfuscate;
		this.placeholderLabel = json.placeholderLabel;
		this.preferredInputType = json.preferredInputType;
		this.tooltip = json.tooltip? new Tooltip(json.tooltip): undefined;
		this.alwaysShow = json.alwaysShow;
		this.wildcardMask = json.mask ? json.mask.replace(/9/g, "*") : "";
	};

	connectsdk.PaymentProductFieldDisplayHints = PaymentProductFieldDisplayHints;
	return PaymentProductFieldDisplayHints;
});
define("connectsdk.PaymentProductField", ["connectsdk.core", "connectsdk.PaymentProductFieldDisplayHints", "connectsdk.DataRestrictions", "connectsdk.MaskingUtil"], function(connectsdk, PaymentProductFieldDisplayHints, DataRestrictions, MaskingUtil) {
	var PaymentProductField = function (json) {
		this.json = json;
		this.displayHints = json.displayHints ? new PaymentProductFieldDisplayHints(json.displayHints) : '';
		this.dataRestrictions = new DataRestrictions(json.dataRestrictions, this.displayHints ? this.displayHints.mask : '');
		this.id = json.id;
		this.type = json.type;
		var _errorCodes = [];

		this.getErrorCodes = function (value) {
			if (value) {
				_errorCodes = [];
				this.isValid(value);
			}
			return _errorCodes;
		};
		this.isValid = function (value) {
			// isValid checks all datarestrictions
			var validators = this.dataRestrictions.validationRules;
			var hasError = false;

			// Apply masking value first
			var maskedValue = this.applyMask(value);
			value = this.removeMask(maskedValue.formattedValue);
			for (var i = 0, il = validators.length; i < il; i++) {
				var validator = validators[i];
				if (!validator.validate(value)) {
					hasError = true;
					_errorCodes.push(validator.errorMessageId);
				}
			}
			return !hasError;
		};
		this.applyMask = function (newValue, oldValue) {
			var maskingUtil = new MaskingUtil();
			return maskingUtil.applyMask(this.displayHints.mask, newValue, oldValue);
		};
		this.applyWildcardMask = function (newValue, oldValue) {
			var maskingUtil = new MaskingUtil();
			return maskingUtil.applyMask(this.displayHints.wildcardMask, newValue, oldValue);
		};
		this.removeMask = function (value) {
			var maskingUtil = new MaskingUtil();
			return maskingUtil.removeMask(this.displayHints.mask, value);
		};
	};

	connectsdk.PaymentProductField = PaymentProductField;
	return PaymentProductField;
});
define("connectsdk.PaymentProduct", ["connectsdk.core", "connectsdk.BasicPaymentProduct", "connectsdk.PaymentProductField"], function(connectsdk, BasicPaymentProduct, PaymentProductField) {

	var _parseJSON = function (_json, _paymentProductFields, _paymentProductFieldById) {
		if (_json.fields) {
			for (var i = 0, il = _json.fields.length; i < il; i++) {
				var paymentProductField = new PaymentProductField(_json.fields[i]);
				_paymentProductFields.push(paymentProductField);
				_paymentProductFieldById[paymentProductField.id] = paymentProductField;
			}
		}
	};

	var PaymentProduct = function (json) {
		var basicPaymentProduct = new BasicPaymentProduct(json);
		basicPaymentProduct.paymentProductFields = [];
		basicPaymentProduct.paymentProductFieldById = {};

		_parseJSON(basicPaymentProduct.json, basicPaymentProduct.paymentProductFields, basicPaymentProduct.paymentProductFieldById);

		return basicPaymentProduct;
	};

	connectsdk.PaymentProduct = PaymentProduct;
	return PaymentProduct;
});

define("connectsdk.PaymentProductGroup", ["connectsdk.core", "connectsdk.BasicPaymentProduct", "connectsdk.PaymentProductField"], function(connectsdk, BasicPaymentProduct, PaymentProductField) {

	var _parseJSON = function (_json, _paymentProductFields, _paymentProductFieldById) {
		if (_json.fields) {
			for (var i = 0, il = _json.fields.length; i < il; i++) {
				var paymentProductField = new PaymentProductField(_json.fields[i]);
				_paymentProductFields.push(paymentProductField);
				_paymentProductFieldById[paymentProductField.id] = paymentProductField;
			}
		}
	};

	var PaymentProductGroup = function (json) {
		var basicPaymentProduct = new BasicPaymentProduct(json);
		basicPaymentProduct.json = json;
		basicPaymentProduct.json.type = "group";
		basicPaymentProduct.paymentProductFields = [];
		basicPaymentProduct.paymentProductFieldById = {};

		_parseJSON(basicPaymentProduct.json, basicPaymentProduct.paymentProductFields, basicPaymentProduct.paymentProductFieldById);

		return basicPaymentProduct;
	};

	connectsdk.PaymentProductGroup = PaymentProductGroup;
	return PaymentProductGroup;
});
define("connectsdk.BasicPaymentProducts", ["connectsdk.core", "connectsdk.BasicPaymentProduct"], function(connectsdk, BasicPaymentProduct) {

	var _parseJson = function (_json, _paymentProducts, _accountsOnFile, _paymentProductById, _accountOnFileById, _paymentProductByAccountOnFileId) {
		if (_json.paymentProducts) {
			for (var i = 0, il = _json.paymentProducts.length; i < il; i++) {
				var paymentProduct = new BasicPaymentProduct(_json.paymentProducts[i]);
				_paymentProducts.push(paymentProduct);
				_paymentProductById[paymentProduct.id] = paymentProduct;

				if (paymentProduct.accountsOnFile) {
					var aofs = paymentProduct.accountsOnFile;
					for (var j = 0, jl = aofs.length; j < jl; j++) {
						var aof = aofs[j];
						_accountsOnFile.push(aof);
						_accountOnFileById[aof.id] = aof;
						_paymentProductByAccountOnFileId[aof.id] = paymentProduct;
					}
				}
			}
		}
	};

	var BasicPaymentProducts = function (json) {
		this.basicPaymentProducts = [];
		this.basicPaymentProductById = {};
		this.basicPaymentProductByAccountOnFileId = {};
		this.accountsOnFile = [];
		this.accountOnFileById = {};
		this.json = json;

		_parseJson(json, this.basicPaymentProducts, this.accountsOnFile, this.basicPaymentProductById, this.accountOnFileById, this.basicPaymentProductByAccountOnFileId);
	};

	connectsdk.BasicPaymentProducts = BasicPaymentProducts;
	return BasicPaymentProducts;
});
define("connectsdk.BasicPaymentProductGroups", ["connectsdk.core", "connectsdk.BasicPaymentProductGroup"], function(connectsdk, BasicPaymentProductGroup) {

	var _parseJson = function (_json, _paymentProductGroups, _accountsOnFile, _paymentProductGroupById, _accountOnFileById) {
		if (_json.paymentProductGroups) {
			for (var i = 0, il = _json.paymentProductGroups.length; i < il; i++) {
				var paymentProductGroup = new BasicPaymentProductGroup(_json.paymentProductGroups[i]);
				_paymentProductGroups.push(paymentProductGroup);
				_paymentProductGroupById[paymentProductGroup.id] = paymentProductGroup;

				if (paymentProductGroup.accountsOnFile) {
					var aofs = paymentProductGroup.accountsOnFile;
					for (var j = 0, jl = aofs.length; j < jl; j++) {
						var aof = aofs[j];
						_accountsOnFile.push(aof);
						_accountOnFileById[aof.id] = aof;
					}
				}
			}
		}
	};

	var BasicPaymentProductGroups = function (json) {
		this.basicPaymentProductGroups = [];
		this.basicPaymentProductGroupById = {};
		this.accountsOnFile = [];
		this.accountOnFileById = {};
		this.json = json;

		_parseJson(json, this.basicPaymentProductGroups, this.accountsOnFile, this.basicPaymentProductGroupById, this.accountOnFileById);
	};

	connectsdk.BasicPaymentProductGroups = BasicPaymentProductGroups;
	return BasicPaymentProductGroups;
});
define("connectsdk.BasicPaymentItems", ["connectsdk.core"], function(connectsdk) {
	"use strict";

		var _parseJson = function (_products, _groups, _basicPaymentItems) {
		var doRemove = [];
		if (_groups) {
			for (var i = 0, il = _groups.basicPaymentProductGroups.length; i < il; i++) {
				var groupId = _groups.basicPaymentProductGroups[i].id,
						groupReplaced = false;
				for (var j = 0, jl = _products.basicPaymentProducts.length; j < jl; j++) {
					var productMethod = _products.basicPaymentProducts[j].paymentProductGroup;
					if (productMethod === groupId && groupReplaced === false) {
						// replace instance by group
						_products.basicPaymentProducts.splice(j, 1, _groups.basicPaymentProductGroups[i]);
						groupReplaced = true;
					} else if (productMethod === groupId && groupReplaced === true) {
						// mark for removal
						doRemove.push(j);
					}
				}
			}
			for (var i = doRemove.length -1, il = 0; i >= il; i--) {
				_products.basicPaymentProducts.splice(doRemove[i], 1);
			}
		}
		_basicPaymentItems.basicPaymentItems = JSON.parse(JSON.stringify(_products.basicPaymentProducts));
		for (var i = 0, il = _basicPaymentItems.basicPaymentItems.length; i < il; i++) {
			var basicPaymentItem = _basicPaymentItems.basicPaymentItems[i];
			_basicPaymentItems.basicPaymentItemById[basicPaymentItem.id] = basicPaymentItem;
			if (basicPaymentItem.accountsOnFile) {
				var aofs = basicPaymentItem.accountsOnFile;
				for (var j = 0, jl = aofs.length; j < jl; j++) {
					var aof = aofs[j];
					_basicPaymentItems.accountsOnFile.push(aof);
					_basicPaymentItems.accountOnFileById[aof.id] = aof;
				}
			}
		};
	};

	var BasicPaymentItems = function (products, groups) {
		this.basicPaymentItems = [];
		this.basicPaymentItemById = {};
		this.accountsOnFile = [];
		this.accountOnFileById = {};
		_parseJson(products, groups, this);
	};
	connectsdk.BasicPaymentItems = BasicPaymentItems;
	return BasicPaymentItems;
});
define("connectsdk.PaymentRequest", ["connectsdk.core"], function(connectsdk) {
  var PaymentRequest = function(clientSessionID) {
    var _clientSessionID = clientSessionID;
    var _fieldValues = {};
    var _paymentProduct = null;
    var _accountOnFile = null;
    var _tokenize = false;

    this.isValid = function() {
      var errors = this.getErrorMessageIds();
      // besides checking the fields for errors check if all mandatory fields are present as well
      var paymentProduct = this.getPaymentProduct();
      if (!paymentProduct) {
        return false;
      }
      var allRequiredFieldsPresent = true;
      for (var i = 0; i < paymentProduct.paymentProductFields.length; i++) {
        var field = paymentProduct.paymentProductFields[i];
        if (field.dataRestrictions.isRequired) {
          // is this field present in the request?
          var storedValue = this.getValue(field.id);
          if (!storedValue && !this.getAccountOnFile()) {
              // if we have an acoount on file the account on file could have the field, so we can ignore it
            allRequiredFieldsPresent = false;
          }
        }
      }
      return errors.length === 0 && allRequiredFieldsPresent;
    };
    this.setValue = function(paymentProductFieldId, value) {
      _fieldValues[paymentProductFieldId] = value;
    };
    this.setTokenize = function(tokenize) {
      _tokenize = tokenize;
    };
    this.getTokenize = function() {
      return _tokenize;
    };
    this.getErrorMessageIds = function() {
      var errors = [];
      for (key in _fieldValues) {
        var paymentProductField = _paymentProduct.paymentProductFieldById[key];
        if (paymentProductField) {
          errors = errors.concat(paymentProductField.getErrorCodes(_fieldValues[key]));
        }
      }
      return errors;
    };
    this.getValue = function(paymentProductFieldId) {
      return _fieldValues[paymentProductFieldId];
    };
    this.getValues = function() {
      return _fieldValues;
    };
    this.getMaskedValue = function(paymentProductFieldId) {
      var paymentProductField = _paymentProduct.paymentProductFieldById[paymentProductFieldId];
      var maskedString = paymentProductField.applyMask(this.getValue(paymentProductFieldId));
      return maskedString.formattedValue();
    };
    this.getMaskedValues = function() {
      var fields = _fieldValues;
      var result = [];
      for (var paymentProductFieldId in fields) {
        var paymentProductField = _paymentProduct.paymentProductFieldById[paymentProductFieldId];
        var maskedString = paymentProductField.applyMask(this.getValue(paymentProductFieldId));
        result[paymentProductFieldId] = maskedString.formattedValue;
      }
      return result;
    };
    this.getUnmaskedValues = function() {
      var fields = _fieldValues;
      var result = [];
      for (var paymentProductFieldId in fields) {
        var paymentProductField = _paymentProduct.paymentProductFieldById[paymentProductFieldId];
        if (paymentProductField) {
          var maskedString = paymentProductField.applyMask(this.getValue(paymentProductFieldId));
          var formattedValue = maskedString.formattedValue;
          result[paymentProductFieldId] = paymentProductField.removeMask(formattedValue);
        }
      }
      return result;
    };
    this.setPaymentProduct = function(paymentProduct) {
      if (paymentProduct.type === "group") {
        return;
      }
      _paymentProduct = paymentProduct;
    };
    this.getPaymentProduct = function() {
      return _paymentProduct;
    };
    this.setAccountOnFile = function(accountOnFile) {
      for (var i = 0, il = accountOnFile.attributes.length; i < il; i++) {
        var attribute = accountOnFile.attributes[i];
        delete _fieldValues[attribute.key];
      }
      _accountOnFile = accountOnFile;
    };
    this.getAccountOnFile = function() {
      return _accountOnFile;
    };
    this.getClientSessionID = function() {
		    return clientSessionID;
    };
  };
  connectsdk.PaymentRequest = PaymentRequest;
  return PaymentRequest;
});
define("connectsdk.C2SPaymentProductContext", ["connectsdk.core"], function(connectsdk) {

    var C2SPaymentProductContext = function (payload) {
        this.totalAmount = typeof payload.totalAmount !== 'undefined' ? payload.totalAmount : '';
        this.countryCode = payload.countryCode;
        this.isRecurring = typeof payload.isRecurring !== 'undefined' ? payload.isRecurring : '';
        this.currency = payload.currency;

        if (typeof payload.locale !== 'undefined') {
            this.locale = payload.locale;
        }

        if (typeof payload.accountOnFileId !== 'undefined') {
            this.accountOnFileId = parseInt(payload.accountOnFileId);
        }
    };

  connectsdk.C2SPaymentProductContext = C2SPaymentProductContext;
  return C2SPaymentProductContext;
});

define("connectsdk.JOSEEncryptor", ["connectsdk.core"], function(connectsdk) {

	var pki = forge.pki;
	var asn1 = forge.asn1;
	var CEKKEYLENGTH = 512;
	var IVLENGTH = 128;

	var base64UrlEncode = function(str) {
		str = forge.util.encode64(str);
		str = str.split('=')[0];
		str = str.replace(/\+/g, '-');
		str = str.replace(/\//g, '_');
		return str;
	};

	var createProtectedHeader = function(kid) {
		var JOSEHeader = {
			"alg" : "RSA-OAEP",
			"enc" : "A256CBC-HS512",
			"kid" : kid
		};
		return JSON.stringify(JOSEHeader);
	};

	var decodePemPublicKey = function(publickeyB64Encoded) {
		// step 1: base64decode
		var publickeyB64Decoded = forge.util.decode64(publickeyB64Encoded);
		// create a bytebuffer with these bytes
		var buffer2 = forge.util.createBuffer(publickeyB64Decoded, 'raw');
		// convert DER to ASN1 object
		var publickeyObject2 = forge.asn1.fromDer(buffer2);
		// convert to publicKey object
		var publicKey2 = pki.publicKeyFromAsn1(publickeyObject2);
		return publicKey2;
	};

	var encryptContentEncryptionKey = function(CEK, publicKey) {
		// encrypt CEK with OAEP+SHA-1+MGF1Padding
		var encryptedCEK = publicKey.encrypt(CEK, 'RSA-OAEP');
		return encryptedCEK;
	};

	var encryptPayload = function(payload, encKey, initializationVector) {
		var cipher = forge.cipher.createCipher('AES-CBC', encKey);
		cipher.start({
			iv : initializationVector
		});
		cipher.update(forge.util.createBuffer(payload));
		cipher.finish();
		return cipher.output.bytes();
	};

	var calculateAdditionalAuthenticatedDataLength = function(encodededProtectedHeader) {
		var buffer = forge.util.createBuffer(encodededProtectedHeader);
		var lengthInBits = buffer.length() * 8;

		var buffer2 = forge.util.createBuffer();
		// convert int to 64bit big endian
		buffer2.putInt32(0);
		buffer2.putInt32(lengthInBits);
		return buffer2.bytes();
	};

	var calculateHMAC = function(macKey, encodededProtectedHeader, initializationVector, cipherText, al) {
		var buffer = forge.util.createBuffer();
		buffer.putBytes(encodededProtectedHeader);
		buffer.putBytes(initializationVector);
		buffer.putBytes(cipherText);
		buffer.putBytes(al);

		var hmacInput = buffer.bytes();

		var hmac = forge.hmac.create();
		hmac.start(forge.sha512.create(), macKey);
		hmac.update(hmacInput);
		return hmac.digest().bytes();
	};

	var JOSEEncryptor = function() {

		this.encrypt = function(plainTextValues, publicKeyResponse) {
			// Create protected header and encode it with Base64 encoding
			var payload = JSON.stringify(plainTextValues);
			var protectedHeader = createProtectedHeader(publicKeyResponse.keyId);
			var encodededProtectedHeader = base64UrlEncode(protectedHeader);

			// Create ContentEncryptionKey, is a random byte[]
			var CEK = forge.random.getBytesSync(CEKKEYLENGTH / 8);
			var publicKey = decodePemPublicKey(publicKeyResponse.publicKey);

			// Encrypt the contentEncryptionKey with the GC gateway publickey and encode it with Base64 encoding
			var encryptedContentEncryptionKey = encryptContentEncryptionKey(CEK, publicKey);
			var encodedEncryptedContentEncryptionKey = base64UrlEncode(encryptedContentEncryptionKey);

			// Split the contentEncryptionKey in ENC_KEY and MAC_KEY for using hmac
			var macKey = CEK.substring(0, CEKKEYLENGTH / 2 / 8);
			var encKey = CEK.substring(CEKKEYLENGTH / 2 / 8);

			// Create Initialization Vector
			var initializationVector = forge.random.getBytesSync(IVLENGTH / 8);
			var encodededinitializationVector = base64UrlEncode(initializationVector);

			// Encrypt content with ContentEncryptionKey and Initialization Vector
			var cipherText = encryptPayload(payload, encKey, initializationVector);
			var encodedCipherText = base64UrlEncode(cipherText);

			// Create Additional Authenticated Data  and Additional Authenticated Data Length
			var al = calculateAdditionalAuthenticatedDataLength(encodededProtectedHeader);

			// Calculates HMAC
			var calculatedHmac = calculateHMAC(macKey, encodededProtectedHeader, initializationVector, cipherText, al);

			// Truncate HMAC Value to Create Authentication Tag
			var authenticationTag = calculatedHmac.substring(0, calculatedHmac.length / 2);
			var encodedAuthenticationTag = base64UrlEncode(authenticationTag);

			return encodededProtectedHeader + "." + encodedEncryptedContentEncryptionKey + "." + encodededinitializationVector + "." + encodedCipherText + "." + encodedAuthenticationTag;
		};
	};

	connectsdk.JOSEEncryptor = JOSEEncryptor;
	return JOSEEncryptor;
});
define("connectsdk.Encryptor", ["connectsdk.core", "connectsdk.promise", "connectsdk.JOSEEncryptor", "connectsdk.Util"], function(connectsdk, Promise, JOSEEncryptor, Util) {

	var _util = Util.getInstance();

	var Encryptor = function(publicKeyResponsePromise) {
		this.encrypt = function(paymentRequest) {
			var promise = new Promise();
			var encryptedString = '';
			publicKeyResponsePromise.then(function (publicKeyResponse) {
				if (paymentRequest.isValid()) {

					var blob = {
					   clientSessionId: paymentRequest.getClientSessionID()
					   ,nonce: forge.util.bytesToHex(forge.random.getBytesSync(16))
					   ,paymentProductId: paymentRequest.getPaymentProduct().id
                       ,tokenize: paymentRequest.getTokenize()
                    };

					if (paymentRequest.getAccountOnFile()) {
                        blob["accountOnFileId"] = paymentRequest.getAccountOnFile().id;
                    }

                    var paymentValues = [], values = paymentRequest.getUnmaskedValues();
                    var ownValues = Object.getOwnPropertyNames(values);
					for (var i = 0; i < ownValues.length; i++) {
						var propertyName = ownValues[i];
						if (propertyName !== "length") {
							paymentValues.push({
								key: propertyName,
								value: values[propertyName]
							})
						}
					}
                    blob["paymentValues"] = paymentValues;

					blob["collectedDeviceInformation"] = _util.collectDeviceInformation();

					// use blob to encrypt
					var joseEncryptor = new JOSEEncryptor();
					encryptedString = joseEncryptor.encrypt(blob, publicKeyResponse);
					promise.resolve(encryptedString);
				} else {
					promise.reject(paymentRequest.getErrorMessageIds());
				}
			}, function (error) {
				promise.reject(error);
			});
			return promise;
		};
	};

	connectsdk.Encryptor = Encryptor;
	return Encryptor;
});

define("connectsdk.Session", ["connectsdk.core", "connectsdk.C2SCommunicator", "connectsdk.C2SCommunicatorConfiguration", "connectsdk.IinDetailsResponse", "connectsdk.promise", "connectsdk.C2SPaymentProductContext", "connectsdk.BasicPaymentProducts", "connectsdk.BasicPaymentProductGroups", "connectsdk.PaymentProduct", "connectsdk.PaymentProductGroup", "connectsdk.BasicPaymentItems", "connectsdk.PaymentRequest", "connectsdk.Encryptor"], function (connectsdk, C2SCommunicator, C2SCommunicatorConfiguration, IinDetailsResponse, Promise, C2SPaymentProductContext, BasicPaymentProducts, BasicPaymentProductGroups, PaymentProduct, PaymentProductGroup, BasicPaymentItems, PaymentRequest, Encryptor) {
	var APIVERSION = "client/v1";
	var session = function (sessionDetails, paymentProduct) {

		var _c2SCommunicatorConfiguration = new C2SCommunicatorConfiguration(sessionDetails, APIVERSION),
			_c2sCommunicator = new C2SCommunicator(_c2SCommunicatorConfiguration, paymentProduct),
			_session = this,
			_paymentProductId, _paymentProduct, _paymentRequestPayload, _paymentRequest, _paymentProductGroupId, _paymentProductGroup;
		this.clientApiUrl = _c2SCommunicatorConfiguration.clientApiUrl;
		this.assetUrl = _c2SCommunicatorConfiguration.assetUrl;

		this.getBasicPaymentProducts = function (paymentRequestPayload, paymentProductSpecificInputs) {
			var promise = new Promise();
			var c2SPaymentProductContext = new C2SPaymentProductContext(paymentRequestPayload);
			_c2sCommunicator.getBasicPaymentProducts(c2SPaymentProductContext, paymentProductSpecificInputs).then(function (json) {
				_paymentRequestPayload = paymentRequestPayload;
				var paymentProducts = new BasicPaymentProducts(json);
				promise.resolve(paymentProducts);
			}, function (reason) {
				promise.reject(reason);
			});
			return promise;
		};

		this.getBasicPaymentProductGroups = function (paymentRequestPayload) {
			var promise = new Promise();
			var c2SPaymentProductContext = new C2SPaymentProductContext(paymentRequestPayload);
			_c2sCommunicator.getBasicPaymentProductGroups(c2SPaymentProductContext).then(function (json) {
				_paymentRequestPayload = paymentRequestPayload;
				var paymentProductGroups = new BasicPaymentProductGroups(json);
				promise.resolve(paymentProductGroups);
			}, function (reason) {
				promise.reject(reason);
			});
			return promise;
		};

		this.getBasicPaymentItems = function (paymentRequestPayload, useGroups, paymentProductSpecificInputs) {
			var promise = new Promise();
			// get products & groups
			if (useGroups) {
				_session.getBasicPaymentProducts(paymentRequestPayload, paymentProductSpecificInputs).then(function (products) {
					_session.getBasicPaymentProductGroups(paymentRequestPayload).then(function (groups) {
						var basicPaymentItems = new BasicPaymentItems(products, groups);
						promise.resolve(basicPaymentItems);
					}, function (reason) {
						promise.reject(reason);
					});
				}, function (reason) {
					promise.reject(reason);
				});
			} else {
				_session.getBasicPaymentProducts(paymentRequestPayload, paymentProductSpecificInputs).then(function (products) {
					var basicPaymentItems = new BasicPaymentItems(products, null);
					promise.resolve(basicPaymentItems);
				}, function (reason) {
					promise.reject(reason);
				});
			}
			return promise;
		};

		this.getPaymentProduct = function (paymentProductId, paymentRequestPayload, paymentProductSpecificInputs) {
			var promise = new Promise();
			_paymentProductId = paymentProductId;
			var c2SPaymentProductContext = new C2SPaymentProductContext(_paymentRequestPayload || paymentRequestPayload);
			_c2sCommunicator.getPaymentProduct(paymentProductId, c2SPaymentProductContext, paymentProductSpecificInputs).then(function (response) {
				_paymentProduct = new PaymentProduct(response);
				promise.resolve(_paymentProduct);
			}, function (reason) {
				_paymentProduct = null;
				promise.reject(reason);
			});
			return promise;
		};

		this.getPaymentProductGroup = function (paymentProductGroupId, paymentRequestPayload) {
			var promise = new Promise();
			_paymentProductGroupId = paymentProductGroupId;
			var c2SPaymentProductContext = new C2SPaymentProductContext(_paymentRequestPayload || paymentRequestPayload);
			_c2sCommunicator.getPaymentProductGroup(paymentProductGroupId, c2SPaymentProductContext).then(function (response) {
				_paymentProductGroup = new PaymentProductGroup(response);
				promise.resolve(_paymentProductGroup);
			}, function (reason) {
				_paymentProductGroup = null;
				promise.reject(reason);
			});
			return promise;
		};

		this.getIinDetails = function (partialCreditCardNumber, paymentRequestPayload) {
			partialCreditCardNumber = partialCreditCardNumber.replace(/ /g, '');
			if (partialCreditCardNumber.length >= 8) {
				partialCreditCardNumber = partialCreditCardNumber.substring(0, 8);
			} else {
				partialCreditCardNumber = partialCreditCardNumber.substring(0, 6);
			}

			var c2SPaymentProductContext = new C2SPaymentProductContext(_paymentRequestPayload || paymentRequestPayload);
			return _c2sCommunicator.getPaymentProductIdByCreditCardNumber(partialCreditCardNumber, c2SPaymentProductContext);
		};

		this.getPublicKey = function () {
			return _c2sCommunicator.getPublicKey();
		};

		this.getPaymentProductNetworks = function (paymentProductId, paymentRequestPayload) {
			var promise = new Promise();
			var c2SPaymentProductContext = new C2SPaymentProductContext(paymentRequestPayload);
			_c2sCommunicator.getPaymentProductNetworks(paymentProductId, c2SPaymentProductContext).then(function (response) {
				_paymentRequestPayload = paymentRequestPayload;
				promise.resolve(response);
			}, function (reason) {
				promise.reject(reason);
			});
			return promise;
		};

		this.getPaymentProductDirectory = function (paymentProductId, currencyCode, countryCode) {
			return _c2sCommunicator.getPaymentProductDirectory(paymentProductId, currencyCode, countryCode);
		};

		this.convertAmount = function (amount, source, target) {
			return _c2sCommunicator.convertAmount(amount, source, target);
		};

		this.getPaymentRequest = function () {
			if (!_paymentRequest) {
				_paymentRequest = new PaymentRequest(_c2SCommunicatorConfiguration.clientSessionId);
			}
			return _paymentRequest;
		};

		this.getEncryptor = function () {
			var publicKeyResponsePromise = _c2sCommunicator.getPublicKey();
			return new Encryptor(publicKeyResponsePromise);
		};

		this.getThirdPartyPaymentStatus = function (paymentId) {
			var promise = new Promise();
			_c2sCommunicator.getThirdPartyPaymentStatus(paymentId).then(function (response) {
				promise.resolve(response);
			}, function (reason) {
				promise.reject(reason);
			});
			return promise;
		};

		this.getCustomerDetails = function (paymentProductId, paymentRequestPayload) {
			return _c2sCommunicator.getCustomerDetails(paymentProductId, paymentRequestPayload);
		};

		this.createPaymentProductSession = function (paymentProductId, paymentRequestPayload) {
			return _c2sCommunicator.createPaymentProductSession(paymentProductId, paymentRequestPayload);
		};

		this.createApplePayPayment = function (context, paymentProductSpecificInputs, networks) {
			var promise = new Promise();
			_c2sCommunicator.initApplePayPayment(context, paymentProductSpecificInputs, networks).then(function (res) {
				promise.resolve(res)
			}, function (reason) {
				promise.reject(reason);
			});
			return promise;
		}

		/* In case a full JSON representation of a payment product is already available in context,
			 this method can be used instead of getPaymentProduct for the same (but synchronous) result. */
		this.transformPaymentProductJSON = function (json) {
			return new PaymentProduct(_c2sCommunicator.transformPaymentProductJSON(json))
		};

		/* In case a full JSON representation of a payment product group is already available in context,
			 this method can be used instead of getPaymentProductGroup for the same (but synchronous) result. */
		this.transformPaymentProductGroupJSON = function (json) {
			return new PaymentProductGroup(_c2sCommunicator.transformPaymentProductJSON(json))
		};
	};
	connectsdk.Session = session;
	return session;
});
