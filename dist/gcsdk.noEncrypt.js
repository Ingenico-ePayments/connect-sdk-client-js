(function(root,factory){if(typeof define==="function"&&define.amd){define(factory)}else if(typeof exports==="object"){module.exports=factory()}else{root.returnExports=factory()}})(this,function(){function Empty(){}if(!Function.prototype.bind){Function.prototype.bind=function bind(that){var target=this;if(typeof target!="function"){throw new TypeError("Function.prototype.bind called on incompatible "+target)}var args=_Array_slice_.call(arguments,1);var binder=function(){if(this instanceof bound){var result=target.apply(this,args.concat(_Array_slice_.call(arguments)));if(Object(result)===result){return result}return this}else{return target.apply(that,args.concat(_Array_slice_.call(arguments)))}};var boundLength=Math.max(0,target.length-args.length);var boundArgs=[];for(var i=0;i<boundLength;i++){boundArgs.push("$"+i)}var bound=Function("binder","return function("+boundArgs.join(",")+"){return binder.apply(this,arguments)}")(binder);if(target.prototype){Empty.prototype=target.prototype;bound.prototype=new Empty;Empty.prototype=null}return bound}}var call=Function.prototype.call;var prototypeOfArray=Array.prototype;var prototypeOfObject=Object.prototype;var _Array_slice_=prototypeOfArray.slice;var _toString=call.bind(prototypeOfObject.toString);var owns=call.bind(prototypeOfObject.hasOwnProperty);var defineGetter;var defineSetter;var lookupGetter;var lookupSetter;var supportsAccessors;if(supportsAccessors=owns(prototypeOfObject,"__defineGetter__")){defineGetter=call.bind(prototypeOfObject.__defineGetter__);defineSetter=call.bind(prototypeOfObject.__defineSetter__);lookupGetter=call.bind(prototypeOfObject.__lookupGetter__);lookupSetter=call.bind(prototypeOfObject.__lookupSetter__)}if([1,2].splice(0).length!=2){var array_splice=Array.prototype.splice;var array_push=Array.prototype.push;var array_unshift=Array.prototype.unshift;if(function(){function makeArray(l){var a=[];while(l--){a.unshift(l)}return a}var array=[],lengthBefore;array.splice.bind(array,0,0).apply(null,makeArray(20));array.splice.bind(array,0,0).apply(null,makeArray(26));lengthBefore=array.length;array.splice(5,0,"XXX");if(lengthBefore+1==array.length){return true}}()){Array.prototype.splice=function(start,deleteCount){if(!arguments.length){return[]}else{return array_splice.apply(this,[start===void 0?0:start,deleteCount===void 0?this.length-start:deleteCount].concat(_Array_slice_.call(arguments,2)))}}}else{Array.prototype.splice=function(start,deleteCount){var result,args=_Array_slice_.call(arguments,2),addElementsCount=args.length;if(!arguments.length){return[]}if(start===void 0){start=0}if(deleteCount===void 0){deleteCount=this.length-start}if(addElementsCount>0){if(deleteCount<=0){if(start==this.length){array_push.apply(this,args);return[]}if(start==0){array_unshift.apply(this,args);return[]}}result=_Array_slice_.call(this,start,start+deleteCount);args.push.apply(args,_Array_slice_.call(this,start+deleteCount,this.length));args.unshift.apply(args,_Array_slice_.call(this,0,start));args.unshift(0,this.length);array_splice.apply(this,args);return result}return array_splice.call(this,start,deleteCount)}}}if([].unshift(0)!=1){var array_unshift=Array.prototype.unshift;Array.prototype.unshift=function(){array_unshift.apply(this,arguments);return this.length}}if(!Array.isArray){Array.isArray=function isArray(obj){return _toString(obj)=="[object Array]"}}var boxedString=Object("a");var splitString=boxedString[0]!="a"||!(0 in boxedString);var properlyBoxesContext=function properlyBoxed(method){var properlyBoxes=true;if(method){method.call("foo",function(item,index,context){if(typeof context!=="object"){properlyBoxes=false}})}return!!method&&properlyBoxes};if(!Array.prototype.forEach||!properlyBoxesContext(Array.prototype.forEach)){Array.prototype.forEach=function forEach(fun){var object=toObject(this),self=splitString&&_toString(this)=="[object String]"?this.split(""):object,thisp=arguments[1],i=-1,length=self.length>>>0;if(_toString(fun)!="[object Function]"){throw new TypeError}while(++i<length){if(i in self){fun.call(thisp,self[i],i,object)}}}}if(!Array.prototype.map||!properlyBoxesContext(Array.prototype.map)){Array.prototype.map=function map(fun){var object=toObject(this),self=splitString&&_toString(this)=="[object String]"?this.split(""):object,length=self.length>>>0,result=Array(length),thisp=arguments[1];if(_toString(fun)!="[object Function]"){throw new TypeError(fun+" is not a function")}for(var i=0;i<length;i++){if(i in self)result[i]=fun.call(thisp,self[i],i,object)}return result}}if(!Array.prototype.filter||!properlyBoxesContext(Array.prototype.filter)){Array.prototype.filter=function filter(fun){var object=toObject(this),self=splitString&&_toString(this)=="[object String]"?this.split(""):object,length=self.length>>>0,result=[],value,thisp=arguments[1];if(_toString(fun)!="[object Function]"){throw new TypeError(fun+" is not a function")}for(var i=0;i<length;i++){if(i in self){value=self[i];if(fun.call(thisp,value,i,object)){result.push(value)}}}return result}}if(!Array.prototype.every||!properlyBoxesContext(Array.prototype.every)){Array.prototype.every=function every(fun){var object=toObject(this),self=splitString&&_toString(this)=="[object String]"?this.split(""):object,length=self.length>>>0,thisp=arguments[1];if(_toString(fun)!="[object Function]"){throw new TypeError(fun+" is not a function")}for(var i=0;i<length;i++){if(i in self&&!fun.call(thisp,self[i],i,object)){return false}}return true}}if(!Array.prototype.some||!properlyBoxesContext(Array.prototype.some)){Array.prototype.some=function some(fun){var object=toObject(this),self=splitString&&_toString(this)=="[object String]"?this.split(""):object,length=self.length>>>0,thisp=arguments[1];if(_toString(fun)!="[object Function]"){throw new TypeError(fun+" is not a function")}for(var i=0;i<length;i++){if(i in self&&fun.call(thisp,self[i],i,object)){return true}}return false}}if(!Array.prototype.reduce){Array.prototype.reduce=function reduce(fun){var object=toObject(this),self=splitString&&_toString(this)=="[object String]"?this.split(""):object,length=self.length>>>0;if(_toString(fun)!="[object Function]"){throw new TypeError(fun+" is not a function")}if(!length&&arguments.length==1){throw new TypeError("reduce of empty array with no initial value")}var i=0;var result;if(arguments.length>=2){result=arguments[1]}else{do{if(i in self){result=self[i++];break}if(++i>=length){throw new TypeError("reduce of empty array with no initial value")}}while(true)}for(;i<length;i++){if(i in self){result=fun.call(void 0,result,self[i],i,object)}}return result}}if(!Array.prototype.reduceRight){Array.prototype.reduceRight=function reduceRight(fun){var object=toObject(this),self=splitString&&_toString(this)=="[object String]"?this.split(""):object,length=self.length>>>0;if(_toString(fun)!="[object Function]"){throw new TypeError(fun+" is not a function")}if(!length&&arguments.length==1){throw new TypeError("reduceRight of empty array with no initial value")}var result,i=length-1;if(arguments.length>=2){result=arguments[1]}else{do{if(i in self){result=self[i--];break}if(--i<0){throw new TypeError("reduceRight of empty array with no initial value")}}while(true)}if(i<0){return result}do{if(i in this){result=fun.call(void 0,result,self[i],i,object)}}while(i--);return result}}if(!Array.prototype.indexOf||[0,1].indexOf(1,2)!=-1){Array.prototype.indexOf=function indexOf(sought){var self=splitString&&_toString(this)=="[object String]"?this.split(""):toObject(this),length=self.length>>>0;if(!length){return-1}var i=0;if(arguments.length>1){i=toInteger(arguments[1])}i=i>=0?i:Math.max(0,length+i);for(;i<length;i++){if(i in self&&self[i]===sought){return i}}return-1}}if(!Array.prototype.lastIndexOf||[0,1].lastIndexOf(0,-3)!=-1){Array.prototype.lastIndexOf=function lastIndexOf(sought){var self=splitString&&_toString(this)=="[object String]"?this.split(""):toObject(this),length=self.length>>>0;if(!length){return-1}var i=length-1;if(arguments.length>1){i=Math.min(i,toInteger(arguments[1]))}i=i>=0?i:length-Math.abs(i);for(;i>=0;i--){if(i in self&&sought===self[i]){return i}}return-1}}if(!Object.keys){var hasDontEnumBug=true,hasProtoEnumBug=function(){}.propertyIsEnumerable("prototype"),dontEnums=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],dontEnumsLength=dontEnums.length;for(var key in{toString:null}){hasDontEnumBug=false}Object.keys=function keys(object){var isFunction=_toString(object)==="[object Function]",isObject=object!==null&&typeof object==="object";if(!isObject&&!isFunction){throw new TypeError("Object.keys called on a non-object")}var keys=[],skipProto=hasProtoEnumBug&&isFunction;for(var name in object){if(!(skipProto&&name==="prototype")&&owns(object,name)){keys.push(name)}}if(hasDontEnumBug){var ctor=object.constructor,skipConstructor=ctor&&ctor.prototype===object;for(var i=0;i<dontEnumsLength;i++){var dontEnum=dontEnums[i];if(!(skipConstructor&&dontEnum==="constructor")&&owns(object,dontEnum)){keys.push(dontEnum)}}}return keys}}var negativeDate=-621987552e5,negativeYearString="-000001";if(!Date.prototype.toISOString||new Date(negativeDate).toISOString().indexOf(negativeYearString)===-1){Date.prototype.toISOString=function toISOString(){var result,length,value,year,month;if(!isFinite(this)){throw new RangeError("Date.prototype.toISOString called on non-finite value.")}year=this.getUTCFullYear();month=this.getUTCMonth();year+=Math.floor(month/12);month=(month%12+12)%12;result=[month+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()];year=(year<0?"-":year>9999?"+":"")+("00000"+Math.abs(year)).slice(0<=year&&year<=9999?-4:-6);length=result.length;while(length--){value=result[length];if(value<10){result[length]="0"+value}}return year+"-"+result.slice(0,2).join("-")+"T"+result.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"}}var dateToJSONIsSupported=false;try{dateToJSONIsSupported=Date.prototype.toJSON&&new Date(NaN).toJSON()===null&&new Date(negativeDate).toJSON().indexOf(negativeYearString)!==-1&&Date.prototype.toJSON.call({toISOString:function(){return true}})}catch(e){}if(!dateToJSONIsSupported){Date.prototype.toJSON=function toJSON(key){var o=Object(this),tv=toPrimitive(o),toISO;if(typeof tv==="number"&&!isFinite(tv)){return null}toISO=o.toISOString;if(typeof toISO!="function"){throw new TypeError("toISOString property is not callable")}return toISO.call(o)}}if(!Date.parse||"Date.parse is buggy"){Date=function(NativeDate){function Date(Y,M,D,h,m,s,ms){var length=arguments.length;if(this instanceof NativeDate){var date=length==1&&String(Y)===Y?new NativeDate(Date.parse(Y)):length>=7?new NativeDate(Y,M,D,h,m,s,ms):length>=6?new NativeDate(Y,M,D,h,m,s):length>=5?new NativeDate(Y,M,D,h,m):length>=4?new NativeDate(Y,M,D,h):length>=3?new NativeDate(Y,M,D):length>=2?new NativeDate(Y,M):length>=1?new NativeDate(Y):new NativeDate;date.constructor=Date;return date}return NativeDate.apply(this,arguments)}var isoDateExpression=new RegExp("^"+"(\\d{4}|[+-]\\d{6})"+"(?:-(\\d{2})"+"(?:-(\\d{2})"+"(?:"+"T(\\d{2})"+":(\\d{2})"+"(?:"+":(\\d{2})"+"(?:(\\.\\d{1,}))?"+")?"+"("+"Z|"+"(?:"+"([-+])"+"(\\d{2})"+":(\\d{2})"+")"+")?)?)?)?"+"$");var months=[0,31,59,90,120,151,181,212,243,273,304,334,365];function dayFromMonth(year,month){var t=month>1?1:0;return months[month]+Math.floor((year-1969+t)/4)-Math.floor((year-1901+t)/100)+Math.floor((year-1601+t)/400)+365*(year-1970)}function toUTC(t){return Number(new NativeDate(1970,0,1,0,0,0,t))}for(var key in NativeDate){Date[key]=NativeDate[key]}Date.now=NativeDate.now;Date.UTC=NativeDate.UTC;Date.prototype=NativeDate.prototype;Date.prototype.constructor=Date;Date.parse=function parse(string){var match=isoDateExpression.exec(string);if(match){var year=Number(match[1]),month=Number(match[2]||1)-1,day=Number(match[3]||1)-1,hour=Number(match[4]||0),minute=Number(match[5]||0),second=Number(match[6]||0),millisecond=Math.floor(Number(match[7]||0)*1e3),isLocalTime=Boolean(match[4]&&!match[8]),signOffset=match[9]==="-"?1:-1,hourOffset=Number(match[10]||0),minuteOffset=Number(match[11]||0),result;if(hour<(minute>0||second>0||millisecond>0?24:25)&&minute<60&&second<60&&millisecond<1e3&&month>-1&&month<12&&hourOffset<24&&minuteOffset<60&&day>-1&&day<dayFromMonth(year,month+1)-dayFromMonth(year,month)){result=((dayFromMonth(year,month)+day)*24+hour+hourOffset*signOffset)*60;result=((result+minute+minuteOffset*signOffset)*60+second)*1e3+millisecond;if(isLocalTime){result=toUTC(result)}if(-864e13<=result&&result<=864e13){return result}}return NaN}return NativeDate.parse.apply(this,arguments)};return Date}(Date)}if(!Date.now){Date.now=function now(){return(new Date).getTime()}}if(!Number.prototype.toFixed||8e-5.toFixed(3)!=="0.000"||.9.toFixed(0)==="0"||1.255.toFixed(2)!=="1.25"||0xde0b6b3a7640080.toFixed(0)!=="1000000000000000128"){(function(){var base,size,data,i;base=1e7;size=6;data=[0,0,0,0,0,0];function multiply(n,c){var i=-1;while(++i<size){c+=n*data[i];data[i]=c%base;c=Math.floor(c/base)}}function divide(n){var i=size,c=0;while(--i>=0){c+=data[i];data[i]=Math.floor(c/n);c=c%n*base}}function toString(){var i=size;var s="";while(--i>=0){if(s!==""||i===0||data[i]!==0){var t=String(data[i]);if(s===""){s=t}else{s+="0000000".slice(0,7-t.length)+t}}}return s}function pow(x,n,acc){return n===0?acc:n%2===1?pow(x,n-1,acc*x):pow(x*x,n/2,acc)}function log(x){var n=0;while(x>=4096){n+=12;x/=4096}while(x>=2){n+=1;x/=2}return n}Number.prototype.toFixed=function(fractionDigits){var f,x,s,m,e,z,j,k;f=Number(fractionDigits);f=f!==f?0:Math.floor(f);if(f<0||f>20){throw new RangeError("Number.toFixed called with invalid number of decimals")}x=Number(this);if(x!==x){return"NaN"}if(x<=-1e21||x>=1e21){return String(x)}s="";if(x<0){s="-";x=-x}m="0";if(x>1e-21){e=log(x*pow(2,69,1))-69;z=e<0?x*pow(2,-e,1):x/pow(2,e,1);z*=4503599627370496;e=52-e;if(e>0){multiply(0,z);j=f;while(j>=7){multiply(1e7,0);j-=7}multiply(pow(10,j,1),0);j=e-1;while(j>=23){divide(1<<23);j-=23}divide(1<<j);multiply(1,1);divide(2);m=toString()}else{multiply(0,z);multiply(1<<-e,0);m=toString()+"0.00000000000000000000".slice(2,2+f)}}if(f>0){k=m.length;if(k<=f){m=s+"0.0000000000000000000".slice(0,f-k+2)+m}else{m=s+m.slice(0,k-f)+"."+m.slice(k-f)}}else{m=s+m}return m}})()}var string_split=String.prototype.split;if("ab".split(/(?:ab)*/).length!==2||".".split(/(.?)(.?)/).length!==4||"tesst".split(/(s)*/)[1]==="t"||"".split(/.?/).length||".".split(/()()/).length>1){(function(){var compliantExecNpcg=/()??/.exec("")[1]===void 0;String.prototype.split=function(separator,limit){var string=this;if(separator===void 0&&limit===0)return[];if(Object.prototype.toString.call(separator)!=="[object RegExp]"){return string_split.apply(this,arguments)}var output=[],flags=(separator.ignoreCase?"i":"")+(separator.multiline?"m":"")+(separator.extended?"x":"")+(separator.sticky?"y":""),lastLastIndex=0,separator=new RegExp(separator.source,flags+"g"),separator2,match,lastIndex,lastLength;string+="";if(!compliantExecNpcg){separator2=new RegExp("^"+separator.source+"$(?!\\s)",flags)}limit=limit===void 0?-1>>>0:limit>>>0;while(match=separator.exec(string)){lastIndex=match.index+match[0].length;if(lastIndex>lastLastIndex){output.push(string.slice(lastLastIndex,match.index));if(!compliantExecNpcg&&match.length>1){match[0].replace(separator2,function(){for(var i=1;i<arguments.length-2;i++){if(arguments[i]===void 0){match[i]=void 0}}})}if(match.length>1&&match.index<string.length){Array.prototype.push.apply(output,match.slice(1))}lastLength=match[0].length;lastLastIndex=lastIndex;if(output.length>=limit){break}}if(separator.lastIndex===match.index){separator.lastIndex++}}if(lastLastIndex===string.length){if(lastLength||!separator.test("")){output.push("")}}else{output.push(string.slice(lastLastIndex))}return output.length>limit?output.slice(0,limit):output}})()}else if("0".split(void 0,0).length){String.prototype.split=function(separator,limit){if(separator===void 0&&limit===0)return[];return string_split.apply(this,arguments)}}if("".substr&&"0b".substr(-1)!=="b"){var string_substr=String.prototype.substr;String.prototype.substr=function(start,length){return string_substr.call(this,start<0?(start=this.length+start)<0?0:start:start,length)}}var ws="	\n\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003"+"\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028"+"\u2029\ufeff";if(!String.prototype.trim||ws.trim()){ws="["+ws+"]";var trimBeginRegexp=new RegExp("^"+ws+ws+"*"),trimEndRegexp=new RegExp(ws+ws+"*$");String.prototype.trim=function trim(){if(this===void 0||this===null){throw new TypeError("can't convert "+this+" to object")}return String(this).replace(trimBeginRegexp,"").replace(trimEndRegexp,"")}}if(parseInt(ws+"08")!==8||parseInt(ws+"0x16")!==22){parseInt=function(origParseInt){var hexRegex=/^0[xX]/;return function parseIntES5(str,radix){str=String(str).trim();if(!+radix){radix=hexRegex.test(str)?16:10}return origParseInt(str,radix)}}(parseInt)}function toInteger(n){n=+n;if(n!==n){n=0}else if(n!==0&&n!==1/0&&n!==-(1/0)){n=(n>0||-1)*Math.floor(Math.abs(n))}return n}function isPrimitive(input){var type=typeof input;return input===null||type==="undefined"||type==="boolean"||type==="number"||type==="string"}function toPrimitive(input){var val,valueOf,toString;if(isPrimitive(input)){return input}valueOf=input.valueOf;if(typeof valueOf==="function"){val=valueOf.call(input);if(isPrimitive(val)){return val}}toString=input.toString;if(typeof toString==="function"){val=toString.call(input);if(isPrimitive(val)){return val}}throw new TypeError}var toObject=function(o){if(o==null){throw new TypeError("can't convert "+o+" to object")}return Object(o)}});
( function(global) {
    var GCsdk = {}, modules = {};

    /* SDK internal function */
    var testCache = {}, detectionTests = {};
    GCsdk.addDetectionTest = function(name, fn) {
        if (!detectionTests[name]) {
            detectionTests[name] = fn;
        }
    };

    /* SDK internal function */
    GCsdk.detect = function(testName) {
        if (typeof testCache[testCache] === 'undefined') {
            testCache[testName] = detectionTests[testName]();
        }
        return testCache[testName];
    };


    /* SDK internal function */
    GCsdk.define = function(module, dependencies, fn) {
        if ( typeof define === 'function' && define.amd) {
            define(module, dependencies, fn);
        } else {
            if (dependencies && dependencies.length) {
                for (var i = 0; i < dependencies.length; i++) {
                    dependencies[i] = modules[dependencies[i]];
                }
            }
            modules[module] = fn.apply(this, dependencies || []);
        }
    };

    // Export `GCsdk` based on environment.
    global.GCsdk = GCsdk;

    if (typeof exports !== 'undefined') {
        exports.GCsdk = GCsdk;
    }

    GCsdk.define('GCsdk.core', [], function() {
        return GCsdk;
    });

    // use require.js if available otherwise we use our own
    if (typeof define === 'undefined') {
        global.define = GCsdk.define;
    }
}( typeof window === 'undefined' ? this : window));
define('GCsdk.promise', ['GCsdk.core'], function(turing) {
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

	if ( typeof module !== 'undefined') {
		module.exports = function(t) {
			return PromiseModule(t);
		};
	} else {
		PromiseModule(GCsdk);
	}

	return GCsdk.Promise;
});
define('GCsdk.net', ['GCsdk.core'], function(GCsdk) {
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
    * JSON.parse support can be inferred using `GCsdk.detect('JSON.parse')`.
    */
  GCsdk.addDetectionTest('JSON.parse', function() {
    return window.JSON && window.JSON.parse;
  });

  /**
    * Parses JSON represented as a string.
    *
    * @param {String} string The original string
    * @returns {Object} A JavaScript object
    */
  net.parseJSON = function(string) {
    if (typeof string !== 'string' || !string) return null;
    string = trim(string);
    return GCsdk.detect('JSON.parse') ?
      window.JSON.parse(string) :
      (new Function('return ' + string))();
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
    if (GCsdk.Promise) {
      promise = new GCsdk.Promise();
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
    this.methodName = '__GCsdk_jsonp_' + parseInt(new Date().getTime());
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
   *     GCsdk.net.jsonp(url, {
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
    * The Ajax methods are mapped to the `GCsdk` object:
    *
    *      GCsdk.get();
    *      GCsdk.post();
    *      GCsdk.json();
    *
    */
  GCsdk.get = net.get;
  GCsdk.post = net.post;
  GCsdk.jsonp = net.jsonp;

  net.ajax = ajax;
  GCsdk.net = net;
  return net;
});
define("GCsdk.Util", ["GCsdk.core"], function(GCsdk) {

	var Util = function() {
		this.getMetadata = function() {
			return {
				screenSize : window.innerWidth + "x" + window.innerHeight,
				platformIdentifier : window.navigator.userAgent,
				sdkIdentifier : ((document.GC && document.GC.rppEnabledPage) ? 'rpp-' : '') + 'JavaScriptClientSDK/v2.1.0',
				sdkCreator: 'Ingenico'
			};
		};

		this.base64Encode = function(data) {
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

			return ( r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
		};
	};
	GCsdk.Util = Util;
	return Util;
});
define("GCsdk.PublicKeyResponse", ["GCsdk.core"], function(GCsdk) {

	var PublicKeyResponse = function(json) {
		this.json = json;
		this.keyId = json.keyId;
		this.publicKey = json.publicKey;
	};

	GCsdk.PublicKeyResponse = PublicKeyResponse;
	return PublicKeyResponse;
});
define("GCsdk.C2SCommunicatorConfiguration", ["GCsdk.core"], function(GCsdk) {

    var C2SCommunicatorConfiguration = function (sessionDetails) {
        this.endpoints = {
                            PROD: {
                                EU: {
                                    API: "https://api-eu.globalcollect.com/client/v1"
                                    ,ASSETS: "https://assets.pay1.poweredbyglobalcollect.com"
                                }
                                ,US: {
                                    API: "https://api-us.globalcollect.com/client/v1"
                                    ,ASSETS: "https://assets.pay2.poweredbyglobalcollect.com"
                                }
                            }
                            ,PREPROD: {
                                EU: {
                                    API: "https://api-eu-preprod.globalcollect.com/client/v1"
                                    ,ASSETS: "https://assets.pay1.preprod.poweredbyglobalcollect.com"
                                }
                                ,US: {
                                    API: "https://api-us-preprod.globalcollect.com/client/v1"
                                    ,ASSETS: "https://assets.pay2.preprod.poweredbyglobalcollect.com"
                                }
                            }
                            ,SANDBOX: {
                                EU: {
                                    API: "https://api-eu-sandbox.globalcollect.com/client/v1"
                                    ,ASSETS: "https://assets.pay1.sandbox.poweredbyglobalcollect.com"
                                }
                                ,US: {
                                    API: "https://api-us-sandbox.globalcollect.com/client/v1"
                                    ,ASSETS: "https://assets.pay2.sandbox.poweredbyglobalcollect.com"
                                }
                            }

                            // Non public settings. Only needed in GC development environment. Do not use
                            // these, they will not work outside GC.
                            ,INTEGRATION: {
                                EU: {
                                    API: "https://int-test-api.gcsip.nl:4443/client/v1"
                                    ,ASSETS: "https://assets.int-test-rpp.gcsip.nl:4443"
                                }
                                ,US: {
                                    API: "https://int-test-api.gcsip.nl:4443/client/v1"
                                    ,ASSETS: "https://assets.int-test-rpp.gcsip.nl:4443"
                                }
                            }
                            ,DEV_NAMI: {
                                EU: {
                                    API: "https://nami-test-api.gcsip.nl:4443/client/v1"
                                    ,ASSETS: "https://assets.nami-test-rpp.gcsip.nl:4443"
                                }
                                ,US: {
                                    API: "https://nami-test-api.gcsip.nl:4443/client/v1"
                                    ,ASSETS: "https://assets.nami-test-rpp.gcsip.nl:4443"
                                }
                            }
                            ,DEV_ISC: {
                                EU: {
                                    API: "http://api.gc-dev.isaac.local/client/v1"
                                    ,ASSETS: "http://rpp.gc-dev.isaac.local"
                                }
                                ,US: {
                                    API: "http://api.gc-dev.isaac.local/client/v1"
                                    ,ASSETS: "http://rpp.gc-dev.isaac.local"
                                }
                            }
                        };

        this.region = sessionDetails.region;
        this.environment = sessionDetails.environment || 'RPP'; // in case this is used in the RPP; the RPP will override the endpoints; by using the apiBaseUrl
        this.clientSessionId = sessionDetails.clientSessionID;
        this.customerId = sessionDetails.customerId;
        this.apiBaseUrl = (sessionDetails.apiBaseUrl || sessionDetails.apiBaseUrl === '') ? sessionDetails.apiBaseUrl : this.endpoints[this.environment][this.region].API;
        this.assetsBaseUrl = (sessionDetails.assetsBaseUrl || sessionDetails.assetsBaseUrl === '' ) ? sessionDetails.assetsBaseUrl : this.endpoints[this.environment][this.region].ASSETS;
    };

    GCsdk.C2SCommunicatorConfiguration = C2SCommunicatorConfiguration;
    return C2SCommunicatorConfiguration;
});
define("GCsdk.IinDetailsResponse", ["GCsdk.core", "GCsdk.promise"], function(GCsdk, Promise) {

	var IinDetailsResponse = function () {
		this.status = '';
		this.countryCode = '';
		this.paymentProductId = '';
		this.isAllowedInContext = '';
		this.coBrands = [];
	};
	GCsdk.IinDetailsResponse = IinDetailsResponse;
	return IinDetailsResponse;
});
define("GCsdk.C2SCommunicator", ["GCsdk.core", "GCsdk.promise", "GCsdk.net", "GCsdk.Util", "GCsdk.PublicKeyResponse", "GCsdk.IinDetailsResponse"], function(GCsdk, Promise, Net, Util, PublicKeyResponse, IinDetailsResponse) {
	var C2SCommunicator = function(c2SCommunicatorConfiguration, paymentProduct) {
		var _c2SCommunicatorConfiguration = c2SCommunicatorConfiguration;
		var _util = new Util();
		var _cache = {};
		var _providedPaymentProduct = paymentProduct;
		var that = this;

		var _mapType = {
			"expirydate" : "tel",
			"string" : "text",
			"numericstring" : "tel",
			"integer" : "number",
			"expirationDate" : "tel"
		};

		var _cleanJSON = function(json, url) {
			for (var i = 0, il = json.fields.length; i < il; i++) {
				var field = json.fields[i];
				field.type = (field.displayHints.obfuscate) ? "password" : _mapType[field.type];
				// helper code for templating tools like Handlebars
				for (validatorKey in field.dataRestrictions.validators) {
					field.validators = field.validators || [];
					field.validators.push(validatorKey);
				}
				if (field.displayHints.formElement.type === 'list') {
					field.displayHints.formElement.list = true;
				}

				// full image paths
				if (field.displayHints.tooltip && field.displayHints.tooltip.image) {
					field.displayHints.tooltip.image = url + "/" + field.displayHints.tooltip.image;
				}
			}
			// apply sortorder
			json.fields.sort(function(a, b) {
				if (a.displayHints.displayOrder < b.displayHints.displayOrder) {
					return -1;
				}
				return 1;
			});
			// set full image path
			json.displayHints.logo = url + "/" + json.displayHints.logo;
			return json;
		};

		var _extendLogoUrl = function(json, url, postfix) {
			for (var i = 0, il = json["paymentProduct" + postfix].length; i < il; i++) {
				var product = json["paymentProduct" + postfix][i];
				product.displayHints.logo = url + "/" + product.displayHints.logo;
			}
			json["paymentProduct" + postfix].sort(function(a, b) {
				if (a.displayHints.displayOrder < b.displayHints.displayOrder) {
					return -1;
				}
				return 1;
			});
			return json;
		};

		var metadata = _util.getMetadata();

		this.getBasicPaymentProducts = function(context) {
			var promise = new Promise()
				,cacheBust = new Date().getTime()
				,cacheKey = "getPaymentProducts-"  + context.totalAmount + "_" + context.countryCode + "_"
				    + context.locale + "_" + context.isRecurring + "_" + context.currency;

			if (_cache[cacheKey]) {
				setTimeout(function() {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(_c2SCommunicatorConfiguration.apiBaseUrl + "/" + _c2SCommunicatorConfiguration.customerId
				    + "/products" + "?countryCode=" + context.countryCode + "&isRecurring=" + context.isRecurring
				    + "&amount=" + context.totalAmount + "&currencyCode=" + context.currency
				    + "&hide=fields&locale=" + context.locale + "&cacheBust=" + cacheBust)
				.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
				.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
				.end(function(res) {
					if (res.success) {
						var json = _extendLogoUrl(res.responseJSON, _c2SCommunicatorConfiguration.assetsBaseUrl, "s");
						_cache[cacheKey] = json;
						promise.resolve(json);
					} else {
						promise.reject();
					}
				});
			}
			return promise;
		};

		this.getBasicPaymentProductGroups = function(context) {
			var promise = new Promise()
				,cacheBust = new Date().getTime()
				,cacheKey = "getPaymentProductGroups-"  + context.totalAmount + "_" + context.countryCode + "_"
				    + context.locale + "_" + context.isRecurring + "_" + context.currency;

			if (_cache[cacheKey]) {
				setTimeout(function() {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(_c2SCommunicatorConfiguration.apiBaseUrl + "/" + _c2SCommunicatorConfiguration.customerId
				    + "/productgroups" + "?countryCode=" + context.countryCode + "&isRecurring=" + context.isRecurring
				    + "&amount=" + context.totalAmount + "&currencyCode=" + context.currency
				    + "&hide=fields&locale=" + context.locale + "&cacheBust=" + cacheBust)
				.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
				.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
				.end(function(res) {
					if (res.success) {
						var json = _extendLogoUrl(res.responseJSON, _c2SCommunicatorConfiguration.assetsBaseUrl, "Groups");
						_cache[cacheKey] = json;
						promise.resolve(json);
					} else {
						promise.reject();
					}
				});
			}
			return promise;
		};

		this.getPaymentProduct = function(paymentProductId, context) {
			var promise = new Promise()
				,cacheBust = new Date().getTime()
				,cacheKey = "getPaymentProduct-" + paymentProductId + "_" + context.totalAmount + "_"
				    + context.countryCode + "_" + "_" + context.locale + "_" + context.isRecurring + "_"
				    + context.currency;
			if (_providedPaymentProduct && _providedPaymentProduct.id === paymentProductId) {
				if (_cache[cacheKey]) {
					setTimeout(function() {
						promise.resolve(_cache[cacheKey]);
					}, 0);
				} else {
					var json = _cleanJSON(_providedPaymentProduct, _c2SCommunicatorConfiguration.assetsBaseUrl);
					_cache[cacheKey] = json;
					setTimeout(function() {
						promise.resolve(_cache[cacheKey]);
					}, 0);
				}
			} else if (_cache[cacheKey]) {
				setTimeout(function() {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(_c2SCommunicatorConfiguration.apiBaseUrl + "/" + _c2SCommunicatorConfiguration.customerId
				    + "/products/" + paymentProductId + "?countryCode=" + context.countryCode
				    + "&isRecurring=" + context.isRecurring + "&amount=" + context.totalAmount
				    + "&currencyCode=" + context.currency + "&locale=" + context.locale + "&cacheBust=" + cacheBust)
				.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
				.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
				.end(function(res) {
					if (res.success) {
						var cleanedJSON = _cleanJSON(res.responseJSON, c2SCommunicatorConfiguration.assetsBaseUrl);
						_cache[cacheKey] = cleanedJSON;
						promise.resolve(cleanedJSON);
					} else {
						promise.reject();
					}
				});
			}
			return promise;
		};

		this.getPaymentProductGroup = function(paymentProductGroupId, context) {
			var promise = new Promise()
				,cacheBust = new Date().getTime()
				,cacheKey = "getPaymentProductGroup-" + paymentProductGroupId + "_" + context.totalAmount + "_"
				    + context.countryCode + "_" + "_" + context.locale + "_" + context.isRecurring + "_"
				    + context.currency;
			if (_providedPaymentProduct && _providedPaymentProduct.id === paymentProductGroupId) {
				if (_cache[cacheKey]) {
					setTimeout(function() {
						promise.resolve(_cache[cacheKey]);
					}, 0);
				} else {
					var json = _cleanJSON(_providedPaymentProduct, _c2SCommunicatorConfiguration.assetsBaseUrl);
					_cache[cacheKey] = json;
					setTimeout(function() {
						promise.resolve(_cache[cacheKey]);
					}, 0);
				}
			} else if (_cache[cacheKey]) {
				setTimeout(function() {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(_c2SCommunicatorConfiguration.apiBaseUrl + "/" + _c2SCommunicatorConfiguration.customerId
				    + "/productgroups/" + paymentProductGroupId + "?countryCode=" + context.countryCode
				    + "&isRecurring=" + context.isRecurring + "&amount=" + context.totalAmount
				    + "&currencyCode=" + context.currency + "&locale=" + context.locale + "&cacheBust=" + cacheBust)
				.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
				.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
				.end(function(res) {
					if (res.success) {
						var cleanedJSON = _cleanJSON(res.responseJSON, c2SCommunicatorConfiguration.assetsBaseUrl);
						_cache[cacheKey] = cleanedJSON;
						promise.resolve(cleanedJSON);
					} else {
						promise.reject();
					}
				});
			}
			return promise;
		};

		this.getPaymentProductIdByCreditCardNumber = function(partialCreditCardNumber, context) {
			var promise = new Promise()
			     ,iinDetailsResponse = new IinDetailsResponse()
			     ,cacheKey = "getPaymentProductIdByCreditCardNumber-" + partialCreditCardNumber;

			var that = this;
			this.context = context;
			if (_cache[cacheKey]) {// cache is based on digit 1-6
				setTimeout(function() {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				var isEnoughDigits = function(partialCreditCardNumber) {
					if (partialCreditCardNumber.length < 6) {
						return false;
					}
					return true;
				};
				if (isEnoughDigits(partialCreditCardNumber)) {
					Net.post(_c2SCommunicatorConfiguration.apiBaseUrl + "/" + _c2SCommunicatorConfiguration.customerId + "/services/getIINdetails")
					.data(JSON.stringify(this.convertContextToIinDetailsContext(partialCreditCardNumber, this.context)))
					.set('X-GCS-ClientMetaInfo', _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function(res) {
						if (res.success) {
							iinDetailsResponse.json = res.responseJSON;
							iinDetailsResponse.countryCode = res.responseJSON.countryCode;
							iinDetailsResponse.paymentProductId = res.responseJSON.paymentProductId;
							iinDetailsResponse.isAllowedInContext = res.responseJSON.isAllowedInContext;
							iinDetailsResponse.coBrands = res.responseJSON.coBrands;
							// check if this card is supported
							// if isAllowedInContext is available in the response set status and resolve
							if(res.responseJSON.hasOwnProperty('isAllowedInContext')){
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
							promise.reject(iinDetailsResponse);
						}
					});
				} else {
					iinDetailsResponse.status = "NOT_ENOUGH_DIGITS";
					setTimeout(function() {
						promise.resolve(iinDetailsResponse);
					}, 0);
				}
			}
			return promise;
		};

		this.convertContextToIinDetailsContext = function (partialCreditCardNumber, context) {
			return {
				"bin": partialCreditCardNumber,
				"paymentContext": {
					"countryCode": context.countryCode,
					"isRecurring": context.isRecurring,
					"amountOfMoney": {
						"amount": context.totalAmount,
						"currencyCode": context.currency
					}
				}
			}
		};

		this.getPublicKey = function() {
			var promise = new Promise()
			 ,cacheKey = "publicKey";

			if (_cache[cacheKey]) {
				setTimeout(function() {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(_c2SCommunicatorConfiguration.apiBaseUrl + "/" + _c2SCommunicatorConfiguration.customerId + "/crypto/publickey")
					.set("X-GCS-ClientMetaInfo", _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function(res) {
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

		this.getPaymentProductDirectory = function(paymentProductId, currencyCode, countryCode) {
			var promise = new Promise()
			 ,cacheKey = "getPaymentProductDirectory-" + paymentProductId + "_" + currencyCode + "_" + countryCode;

			if (_cache[cacheKey]) {
				setTimeout(function() {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(_c2SCommunicatorConfiguration.apiBaseUrl + "/" + _c2SCommunicatorConfiguration.customerId + "/products/" + paymentProductId + "/directory?countryCode=" +  countryCode + "&currencyCode=" + currencyCode)
					.set("X-GCS-ClientMetaInfo", _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function(res) {
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

		this.convertAmount = function(amount, source, target) {
			var promise = new Promise()
			 ,cacheKey = "convertAmount-" + amount + "_" + source + "_" + target;

			if (_cache[cacheKey]) {
				setTimeout(function() {
					promise.resolve(_cache[cacheKey]);
				}, 0);
			} else {
				Net.get(_c2SCommunicatorConfiguration.apiBaseUrl + "/" + _c2SCommunicatorConfiguration.customerId + "/services/convert/amount?source=" + source + "&target=" + target + "&amount=" + amount)
					.set("X-GCS-ClientMetaInfo", _util.base64Encode(metadata))
					.set('Authorization', 'GCS v1Client:' + _c2SCommunicatorConfiguration.clientSessionId)
					.end(function(res) {
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
	};


	GCsdk.C2SCommunicator = C2SCommunicator;
	return C2SCommunicator;
});
define("GCsdk.LabelTemplateElement", ["GCsdk.core"], function(GCsdk) {

	var LabelTemplateElement = function (json) {
		this.json = json;
		this.attributeKey = json.attributeKey;
		this.mask = json.mask;
		this.wildcardMask = json.mask ? json.mask.replace(/9/g, "*") : "";
	};

	GCsdk.LabelTemplateElement = LabelTemplateElement;
	return LabelTemplateElement;
});
define("GCsdk.Attribute", ["GCsdk.core"], function(GCsdk) {

	var Attribute = function (json) {
		this.json = json;
		this.key = json.key;
		this.value = json.value;
		this.status = json.status;
		this.mustWriteReason = json.mustWriteReason;
	};

	GCsdk.Attribute = Attribute;
	return Attribute;
});
define("GCsdk.AccountOnFileDisplayHints", ["GCsdk.core", "GCsdk.LabelTemplateElement"], function(GCsdk, LabelTemplateElement) {

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

	GCsdk.AccountOnFileDisplayHints = AccountOnFileDisplayHints;
	return AccountOnFileDisplayHints;
});
define("GCsdk.AccountOnFile", ["GCsdk.core" ,"GCsdk.AccountOnFileDisplayHints", "GCsdk.Attribute"], function(GCsdk, AccountOnFileDisplayHints, Attribute) {

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
				var maskingUtil = new GCsdk.MaskingUtil();
				return maskingUtil.applyMask(wildcardMask, value);
			}
			return undefined;
		};

		_parseJSON(json, this.attributes, this.attributeByKey);
	};

	GCsdk.AccountOnFile = AccountOnFile;
	return AccountOnFile;
});
define("GCsdk.PaymentProductDisplayHints", ["GCsdk.core"], function(GCsdk) {

	var PaymentProductDisplayHints = function (json) {
		this.json = json;
		this.displayOrder = json.displayOrder;
		this.label = json.label;
		this.logo = json.logo;
	};

	GCsdk.PaymentProductDisplayHints = PaymentProductDisplayHints;
	return PaymentProductDisplayHints;
});
define("GCsdk.BasicPaymentProduct", ["GCsdk.core", "GCsdk.AccountOnFile", "GCsdk.PaymentProductDisplayHints"], function(GCsdk, AccountOnFile, PaymentProductDisplayHints) {

	var _parseJSON = function (_json, _accountsOnFile, _accountOnFileById) {
		if (_json.accountsOnFile) {
			for (var i = 0, il = _json.accountsOnFile.length; i < il; i++) {
				var accountOnFile = new AccountOnFile(_json.accountsOnFile[i]);
				_accountsOnFile.push(accountOnFile);
				_accountOnFileById[accountOnFile.id] = accountOnFile;
			}
		}
	};

	var BasicPaymentProduct = function (json) {
		this.json = json;
		this.json.type = "product";
		this.accountsOnFile = [];
		this.accountOnFileById = {};
		this.allowsRecurring = json.allowsRecurring;
		this.allowsTokenization = json.allowsTokenization;
		this.autoTokenized  = json.autoTokenized ;
		this.displayHints = new PaymentProductDisplayHints(json.displayHints);
		this.id = json.id;
		this.maxAmount = json.maxAmount;
		this.minAmount = json.minAmount;
		this.paymentMethod = json.paymentMethod;
		this.mobileIntegrationLevel = json.mobileIntegrationLevel;
		this.usesRedirectionTo3rdParty = json.usesRedirectionTo3rdParty;
		this.paymentProductGroup = json.paymentProductGroup;

		_parseJSON(json, this.accountsOnFile, this.accountOnFileById);
	};

	GCsdk.BasicPaymentProduct = BasicPaymentProduct;
	return BasicPaymentProduct;
});
define("GCsdk.BasicPaymentProductGroup", ["GCsdk.core", "GCsdk.AccountOnFile", "GCsdk.PaymentProductDisplayHints"], function(GCsdk, AccountOnFile, PaymentProductDisplayHints) {

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
		this.displayHints = new PaymentProductDisplayHints(json.displayHints);
		this.accountsOnFile = [];
		this.accountOnFileById = {};
		_parseJSON(json, this.accountsOnFile, this.accountOnFileById);
	};

	GCsdk.BasicPaymentProductGroup = BasicPaymentProductGroup;
	return BasicPaymentProductGroup;
});
define("GCsdk.MaskedString", ["GCsdk.core"], function(GCsdk) {

	var MaskedString = function(formattedValue, cursorIndex) {

		this.formattedValue = formattedValue;
		this.cursorIndex = cursorIndex;
	};

	GCsdk.MaskedString = MaskedString;
	return MaskedString;
});
define("GCsdk.MaskingUtil", ["GCsdk.core", "GCsdk.MaskedString"], function(GCsdk, MaskedString) {

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

	GCsdk.MaskingUtil = MaskingUtil;
	return MaskingUtil;
});
define("GCsdk.ValidationRuleLuhn", ["GCsdk.core"], function(GCsdk) {

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

	GCsdk.ValidationRuleLuhn = ValidationRuleLuhn;
	return ValidationRuleLuhn;
});
define("GCsdk.ValidationRuleExpirationDate", ["GCsdk.core"], function (GCsdk) {

	var _validateDateFormat = function (value) {
		var pattern = /\d{4}|\d{6}$/g;
		return pattern.test(value);
	};

	var ValidationRuleExpirationDate = function (json) {
		this.json = json;
		this.type = json.type,
			this.errorMessageId = json.type;

		// value is mmYY or mmYYYY
		this.validate = function (value) {
			value = value.replace(/[^\d]/g, '');
			if (value.length === 4) {
				split = [value.substring(0, 2), "20" + value.substring(2, 4)];
			} else if (value.length === 6) {
				split = [value.substring(0, 2), value.substring(2, 6)];
			} else {
				return false;
			}
			if (_validateDateFormat(value)) {
				var now = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
				var expirationDate = new Date(split[1], split[0] - 1, 1);
				if (expirationDate.getMonth() !== Number(split[0] - 1) || expirationDate.getFullYear() !== Number(split[1])) {
					return false;
				}
				return expirationDate >= now; // the expiration month could be THIS month but that is still valid!
			}
			return false;
		};
	};

	GCsdk.ValidationRuleExpirationDate = ValidationRuleExpirationDate;
	return ValidationRuleExpirationDate;
});
define("GCsdk.ValidationRuleFixedList", ["GCsdk.core"], function(GCsdk) {

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

	GCsdk.ValidationRuleFixedList = ValidationRuleFixedList;
	return ValidationRuleFixedList;
});
define("GCsdk.ValidationRuleLength", ["GCsdk.core"], function(GCsdk) {

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

	GCsdk.ValidationRuleLength = ValidationRuleLength;
	return ValidationRuleLength;
});
define("GCsdk.ValidationRuleRange", ["GCsdk.core"], function(GCsdk) {

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

	GCsdk.ValidationRuleRange = ValidationRuleRange;
	return ValidationRuleRange;
});
define("GCsdk.ValidationRuleRegularExpression", ["GCsdk.core"], function(GCsdk) {

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

	GCsdk.ValidationRuleRegularExpression = ValidationRuleRegularExpression;
	return ValidationRuleRegularExpression;
});
define("GCsdk.ValidationRuleEmailAddress", ["GCsdk.core"], function(GCsdk) {

	var ValidationRuleEmailAddress = function(json) {
        this.json = json;
        this.type = json.type,
        this.errorMessageId = json.type;
        
		this.validate = function(value) {
			var regexp = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
			return regexp.test(value);
		};
	};

	GCsdk.ValidationRuleEmailAddress = ValidationRuleEmailAddress;
	return ValidationRuleEmailAddress;
});
define("GCsdk.ValidationRuleFactory", ["GCsdk.core", "GCsdk.ValidationRuleEmailAddress", "GCsdk.ValidationRuleExpirationDate", "GCsdk.ValidationRuleFixedList", "GCsdk.ValidationRuleLength", "GCsdk.ValidationRuleLuhn", "GCsdk.ValidationRuleRange", "GCsdk.ValidationRuleRegularExpression"], function(GCsdk, ValidationRuleEmailAddress, ValidationRuleExpirationDate, ValidationRuleFixedList, ValidationRuleLength, ValidationRuleLuhn, ValidationRuleRange, ValidationRuleRegularExpression) {

	var ValidationRuleFactory = function () {
	    
	    this.makeValidator = function(json) {
            // create new class based on the rule
            var classType = json.type.charAt(0).toUpperCase() + json.type.slice(1), // camel casing
                className = eval("ValidationRule" + classType);
            return new className(json);
        };
	};

	GCsdk.ValidationRuleFactory = ValidationRuleFactory;
	return ValidationRuleFactory;
});
define("GCsdk.DataRestrictions", ["GCsdk.core", "GCsdk.ValidationRuleExpirationDate", "GCsdk.ValidationRuleFixedList", "GCsdk.ValidationRuleLength", "GCsdk.ValidationRuleLuhn", "GCsdk.ValidationRuleRange", "GCsdk.ValidationRuleRegularExpression", "GCsdk.ValidationRuleEmailAddress", "GCsdk.ValidationRuleFactory"], function(GCsdk, ValidationRuleExpirationDate, ValidationRuleFixedList, ValidationRuleLength, ValidationRuleLuhn, ValidationRuleRange, ValidationRuleRegularExpression, ValidationRuleEmailAddress, ValidationRuleFactory) {

	var DataRestrictions = function (json, mask) {

		var _parseJSON = function (_json, _validationRules, _validationRuleByType) {
		    var validationRuleFactory = new ValidationRuleFactory();
			if (_json.validators) {
				for (var key in _json.validators) {
					var validationRule = validationRuleFactory.makeValidator({type: key, attributes: _json.validators[key]});
					_validationRules.push(validationRule);
					_validationRuleByType[validationRule.type] = validationRule;
				}
			}
		};

		this.json = json;
		this.isRequired = json.isRequired;
		this.validationRules = [];
		this.validationRuleByType = {};
		
		_parseJSON(json, this.validationRules, this.validationRuleByType);
	};

	GCsdk.DataRestrictions = DataRestrictions;
	return DataRestrictions;
});
define("GCsdk.ValueMappingElement", ["GCsdk.core"], function(GCsdk) {

	var ValueMappingElement = function (json) {
		this.json = json;
		this.displayName = json.displayName;
		this.value = json.value;
	};

	GCsdk.ValueMappingElement = ValueMappingElement;
	return ValueMappingElement;
});
define("GCsdk.FormElement", ["GCsdk.core", "GCsdk.ValueMappingElement"], function(GCsdk, ValueMappingElement) {

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

	GCsdk.FormElement = FormElement;
	return FormElement;
});
define("GCsdk.Tooltip", ["GCsdk.core"], function(GCsdk) {

	var Tooltip = function (json) {
		this.json = json;
		this.image = json.image;
		this.label = json.label;
	};

	GCsdk.Tooltip = Tooltip;
	return Tooltip;
});
define("GCsdk.PaymentProductFieldDisplayHints", ["GCsdk.core", "GCsdk.Tooltip", "GCsdk.FormElement"], function(GCsdk, Tooltip, FormElement) {

	var PaymentProductFieldDisplayHints = function (json) {
		this.json = json;
 		this.displayOrder = json.displayOrder;
		this.formElement = new FormElement(json.formElement);
		this.label = json.label;
		this.mask = json.mask;
		this.obfuscate = json.obfuscate;
		this.placeholderLabel = json.placeholderLabel;
		this.preferredInputType = json.preferredInputType;
		this.tooltip = json.tooltip? new Tooltip(json.tooltip): undefined;
		this.alwaysShow = json.alwaysShow;
		this.wildcardMask = json.mask ? json.mask.replace(/9/g, "*") : "";
	};

	GCsdk.PaymentProductFieldDisplayHints = PaymentProductFieldDisplayHints;
	return PaymentProductFieldDisplayHints;
});
define("GCsdk.PaymentProductField", ["GCsdk.core", "GCsdk.PaymentProductFieldDisplayHints", "GCsdk.DataRestrictions", "GCsdk.MaskingUtil"], function(GCsdk, PaymentProductFieldDisplayHints, DataRestrictions, MaskingUtil) {
	var PaymentProductField = function (json) {
		this.json = json;
		this.displayHints = new PaymentProductFieldDisplayHints(json.displayHints);
		this.dataRestrictions = new DataRestrictions(json.dataRestrictions, this.displayHints.mask);
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
			value = this.removeMask(value);
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

	GCsdk.PaymentProductField = PaymentProductField;
	return PaymentProductField;
});
define("GCsdk.PaymentProduct", ["GCsdk.core", "GCsdk.BasicPaymentProduct", "GCsdk.PaymentProductField"], function(GCsdk, BasicPaymentProduct, PaymentProductField) {

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
		basicPaymentProduct.json = json;
		basicPaymentProduct.paymentProductFields = [];
		basicPaymentProduct.paymentProductFieldById = {};

		_parseJSON(basicPaymentProduct.json, basicPaymentProduct.paymentProductFields, basicPaymentProduct.paymentProductFieldById);

		return basicPaymentProduct;
	};

	GCsdk.PaymentProduct = PaymentProduct;
	return PaymentProduct;
});
define("GCsdk.PaymentProductGroup", ["GCsdk.core", "GCsdk.BasicPaymentProduct", "GCsdk.PaymentProductField"], function(GCsdk, BasicPaymentProduct, PaymentProductField) {

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

	GCsdk.PaymentProductGroup = PaymentProductGroup;
	return PaymentProductGroup;
});
define("GCsdk.BasicPaymentProducts", ["GCsdk.core", "GCsdk.BasicPaymentProduct"], function(GCsdk, BasicPaymentProduct) {

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

	GCsdk.BasicPaymentProducts = BasicPaymentProducts;
	return BasicPaymentProducts;
});
define("GCsdk.BasicPaymentProductGroups", ["GCsdk.core", "GCsdk.BasicPaymentProductGroup"], function(GCsdk, BasicPaymentProductGroup) {

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

	GCsdk.BasicPaymentProductGroups = BasicPaymentProductGroups;
	return BasicPaymentProductGroups;
});
define("GCsdk.BasicPaymentItems", ["GCsdk.core"], function(GCsdk) {
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
	GCsdk.BasicPaymentItems = BasicPaymentItems;
	return BasicPaymentItems;
});
define("GCsdk.PaymentRequest", ["GCsdk.core"], function(GCsdk) {
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
  GCsdk.PaymentRequest = PaymentRequest;
  return PaymentRequest;
});
define("GCsdk.C2SPaymentProductContext", ["GCsdk.core"], function(GCsdk) {

  var C2SPaymentProductContext = function (payload) {
	this.totalAmount = payload.totalAmount;
	this.countryCode = payload.countryCode;
	this.isRecurring = payload.isRecurring;
	this.currency = payload.currency;
	this.locale = payload.locale;
  };

  GCsdk.C2SPaymentProductContext = C2SPaymentProductContext;
  return C2SPaymentProductContext;
});
define("GCsdk.Session", ["GCsdk.core", "GCsdk.C2SCommunicator", "GCsdk.C2SCommunicatorConfiguration", "GCsdk.IinDetailsResponse", "GCsdk.promise", "GCsdk.C2SPaymentProductContext", "GCsdk.BasicPaymentProducts", "GCsdk.BasicPaymentProductGroups", "GCsdk.PaymentProduct", "GCsdk.PaymentProductGroup", "GCsdk.BasicPaymentItems", "GCsdk.PaymentRequest", "GCsdk.Encryptor"], function(GCsdk, C2SCommunicator, C2SCommunicatorConfiguration, IinDetailsResponse, Promise, C2SPaymentProductContext, BasicPaymentProducts, BasicPaymentProductGroups, PaymentProduct, PaymentProductGroup, BasicPaymentItems, PaymentRequest, Encryptor) {

	var session = function (sessionDetails, paymentProduct) {

		var _c2SCommunicatorConfiguration = new C2SCommunicatorConfiguration(sessionDetails)
			,_c2sCommunicator = new C2SCommunicator(_c2SCommunicatorConfiguration, paymentProduct)
			,_paymentProductId, _paymentProduct, _paymentRequestPayload, _paymentRequest, _paymentProductGroupId, _paymentProductGroup, _session = this;
		this.apiBaseUrl = _c2SCommunicatorConfiguration.apiBaseUrl;
		this.assetsBaseUrl = _c2SCommunicatorConfiguration.assetsBaseUrl;

		this.getBasicPaymentProducts = function(paymentRequestPayload) {
			var promise = new Promise();
			var c2SPaymentProductContext = new C2SPaymentProductContext(paymentRequestPayload);
			_c2sCommunicator.getBasicPaymentProducts(c2SPaymentProductContext).then(function (json) {
				_paymentRequestPayload = paymentRequestPayload;
				var paymentProducts = new BasicPaymentProducts(json);
				promise.resolve(paymentProducts);
			}, function () {
				promise.reject();
			});
			return promise;
		};

		this.getBasicPaymentProductGroups = function(paymentRequestPayload) {
			var promise = new Promise();
			var c2SPaymentProductContext = new C2SPaymentProductContext(paymentRequestPayload);
			_c2sCommunicator.getBasicPaymentProductGroups(c2SPaymentProductContext).then(function (json) {
				_paymentRequestPayload = paymentRequestPayload;
				var paymentProductGroups = new BasicPaymentProductGroups(json);
				promise.resolve(paymentProductGroups);
			}, function () {
				promise.reject();
			});
			return promise;
		};

		this.getBasicPaymentItems = function(paymentRequestPayload, useGroups) {
			var promise = new Promise();
			// get products & groups
			if (useGroups) {
				_session.getBasicPaymentProducts(paymentRequestPayload).then(function (products) {
					_session.getBasicPaymentProductGroups(paymentRequestPayload).then(function (groups) {
						var basicPaymentItems = new BasicPaymentItems(products, groups);
						promise.resolve(basicPaymentItems);
					}, function () {
						promise.reject();
					});
				}, function () {
					promise.reject();
				});
			} else {
				_session.getBasicPaymentProducts(paymentRequestPayload).then(function (products) {
					var basicPaymentItems = new BasicPaymentItems(products, null);
					promise.resolve(basicPaymentItems);
				}, function () {
					promise.reject();
				});
			}
			return promise;
		};

		this.getPaymentProduct = function(paymentProductId, paymentRequestPayload) {
			var promise = new Promise();
			_paymentProductId = paymentProductId;
			var c2SPaymentProductContext = new C2SPaymentProductContext(_paymentRequestPayload || paymentRequestPayload);
			_c2sCommunicator.getPaymentProduct(paymentProductId, c2SPaymentProductContext).then(function (response) {
				_paymentProduct = new PaymentProduct(response);
				promise.resolve(_paymentProduct);
			}, function () {
				_paymentProduct = null;
				promise.reject();
			});
			return promise;
		};

		this.getPaymentProductGroup = function(paymentProductGroupId, paymentRequestPayload) {
			var promise = new Promise();
			_paymentProductGroupId = paymentProductGroupId;
			var c2SPaymentProductContext = new C2SPaymentProductContext(_paymentRequestPayload || paymentRequestPayload);
			_c2sCommunicator.getPaymentProductGroup(paymentProductGroupId, c2SPaymentProductContext).then(function (response) {
				_paymentProductGroup = new PaymentProductGroup(response);
				promise.resolve(_paymentProductGroup);
			}, function () {
				_paymentProductGroup = null;
				promise.reject();
			});
			return promise;
		};

		this.getIinDetails = function (partialCreditCardNumber, paymentRequestPayload) {
			partialCreditCardNumber = partialCreditCardNumber.replace(/ /g, '').substring(0,6);
			var c2SPaymentProductContext = new C2SPaymentProductContext(_paymentRequestPayload || paymentRequestPayload);
			return _c2sCommunicator.getPaymentProductIdByCreditCardNumber(partialCreditCardNumber, c2SPaymentProductContext);
		};

		this.getPublicKey = function () {
			return _c2sCommunicator.getPublicKey();
		};

		this.getPaymentProductDirectory = function (paymentProductId, currencyCode, countryCode) {
			return _c2sCommunicator.getPaymentProductDirectory(paymentProductId, currencyCode, countryCode);
		};

		this.convertAmount = function (amount, source, target) {
			return _c2sCommunicator.convertAmount(amount, source, target);
		};

		this.getPaymentRequest = function () {
			if (!_paymentRequest) {
				_paymentRequest = new PaymentRequest(sessionDetails.clientSessionID);

			}
			return _paymentRequest;
		};

		this.getEncryptor = function () {
			var publicKeyResponsePromise = _c2sCommunicator.getPublicKey();
			return new Encryptor(publicKeyResponsePromise);
		};
	};
	GCsdk.Session = session;
	return session;
});