
(function(a,b){function cg(a){return d.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cd(a){if(!bZ[a]){var b=d("<"+a+">").appendTo("body"),c=b.css("display");b.remove();if(c==="none"||c==="")c="block";bZ[a]=c}return bZ[a]}function cc(a,b){var c={};d.each(cb.concat.apply([],cb.slice(0,b)),function(){c[this]=a});return c}function bY(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function bX(){try{return new a.XMLHttpRequest}catch(b){}}function bW(){d(a).unload(function(){for(var a in bU)bU[a](0,1)})}function bQ(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var e=a.dataTypes,f={},g,h,i=e.length,j,k=e[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h==="string"&&(f[h.toLowerCase()]=a.converters[h]);l=k,k=e[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=f[m]||f["* "+k];if(!n){p=b;for(o in f){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=f[j[1]+" "+k];if(p){o=f[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&d.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function bP(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function bO(a,b,c,e){if(d.isArray(b)&&b.length)d.each(b,function(b,f){c||bq.test(a)?e(a,f):bO(a+"["+(typeof f==="object"||d.isArray(f)?b:"")+"]",f,c,e)});else if(c||b==null||typeof b!=="object")e(a,b);else if(d.isArray(b)||d.isEmptyObject(b))e(a,"");else for(var f in b)bO(a+"["+f+"]",b[f],c,e)}function bN(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bH,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l==="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bN(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bN(a,c,d,e,"*",g));return l}function bM(a){return function(b,c){typeof b!=="string"&&(c=b,b="*");if(d.isFunction(c)){var e=b.toLowerCase().split(bB),f=0,g=e.length,h,i,j;for(;f<g;f++)h=e[f],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bo(a,b,c){var e=b==="width"?bi:bj,f=b==="width"?a.offsetWidth:a.offsetHeight;if(c==="border")return f;d.each(e,function(){c||(f-=parseFloat(d.css(a,"padding"+this))||0),c==="margin"?f+=parseFloat(d.css(a,"margin"+this))||0:f-=parseFloat(d.css(a,"border"+this+"Width"))||0});return f}function ba(a,b){b.src?d.ajax({url:b.src,async:!1,dataType:"script"}):d.globalEval(b.text||b.textContent||b.innerHTML||""),b.parentNode&&b.parentNode.removeChild(b)}function _(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):[]}function $(a,b){if(b.nodeType===1){var c=b.nodeName.toLowerCase();b.clearAttributes(),b.mergeAttributes(a);if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(d.expando)}}function Z(a,b){if(b.nodeType===1&&d.hasData(a)){var c=d.expando,e=d.data(a),f=d.data(b,e);if(e=e[c]){var g=e.events;f=f[c]=d.extend({},e);if(g){delete f.handle,f.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)d.event.add(b,h+(g[h][i].namespace?".":"")+g[h][i].namespace,g[h][i],g[h][i].data)}}}}function Y(a,b){return d.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function O(a,b,c){if(d.isFunction(b))return d.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return d.grep(a,function(a,d){return a===b===c});if(typeof b==="string"){var e=d.grep(a,function(a){return a.nodeType===1});if(J.test(b))return d.filter(b,e,!c);b=d.filter(b,e)}return d.grep(a,function(a,e){return d.inArray(a,b)>=0===c})}function N(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function F(a,b){return(a&&a!=="*"?a+".":"")+b.replace(r,"`").replace(s,"&")}function E(a){var b,c,e,f,g,h,i,j,k,l,m,n,o,q=[],r=[],s=d._data(this,"events");if(a.liveFired!==this&&s&&s.live&&!a.target.disabled&&(!a.button||a.type!=="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var t=s.live.slice(0);for(i=0;i<t.length;i++)g=t[i],g.origType.replace(p,"")===a.type?r.push(g.selector):t.splice(i--,1);f=d(a.target).closest(r,a.currentTarget);for(j=0,k=f.length;j<k;j++){m=f[j];for(i=0;i<t.length;i++){g=t[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))&&!m.elem.disabled){h=m.elem,e=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,e=d(a.relatedTarget).closest(g.selector)[0];(!e||e!==h)&&q.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=q.length;j<k;j++){f=q[j];if(c&&f.level>c)break;a.currentTarget=f.elem,a.data=f.handleObj.data,a.handleObj=f.handleObj,o=f.handleObj.origHandler.apply(f.elem,arguments);if(o===!1||a.isPropagationStopped()){c=f.level,o===!1&&(b=!1);if(a.isImmediatePropagationStopped())break}}return b}}function C(a,c,e){var f=d.extend({},e[0]);f.type=a,f.originalEvent={},f.liveFired=b,d.event.handle.call(c,f),f.isDefaultPrevented()&&e[0].preventDefault()}function w(){return!0}function v(){return!1}function g(a){for(var b in a)if(b!=="toJSON")return!1;return!0}function f(a,c,f){if(f===b&&a.nodeType===1){f=a.getAttribute("data-"+c);if(typeof f==="string"){try{f=f==="true"?!0:f==="false"?!1:f==="null"?null:d.isNaN(f)?e.test(f)?d.parseJSON(f):f:parseFloat(f)}catch(g){}d.data(a,c,f)}else f=b}return f}var c=a.document,d=function(){function I(){if(!d.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(I,1);return}d.ready()}}var d=function(a,b){return new d.fn.init(a,b,g)},e=a.jQuery,f=a.$,g,h=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,i=/\S/,j=/^\s+/,k=/\s+$/,l=/\d/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=navigator.userAgent,w,x=!1,y,z="then done fail isResolved isRejected promise".split(" "),A,B=Object.prototype.toString,C=Object.prototype.hasOwnProperty,D=Array.prototype.push,E=Array.prototype.slice,F=String.prototype.trim,G=Array.prototype.indexOf,H={};d.fn=d.prototype={constructor:d,init:function(a,e,f){var g,i,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!e&&c.body){this.context=c,this[0]=c.body,this.selector="body",this.length=1;return this}if(typeof a==="string"){g=h.exec(a);if(!g||!g[1]&&e)return!e||e.jquery?(e||f).find(a):this.constructor(e).find(a);if(g[1]){e=e instanceof d?e[0]:e,k=e?e.ownerDocument||e:c,j=m.exec(a),j?d.isPlainObject(e)?(a=[c.createElement(j[1])],d.fn.attr.call(a,e,!0)):a=[k.createElement(j[1])]:(j=d.buildFragment([g[1]],[k]),a=(j.cacheable?d.clone(j.fragment):j.fragment).childNodes);return d.merge(this,a)}i=c.getElementById(g[2]);if(i&&i.parentNode){if(i.id!==g[2])return f.find(a);this.length=1,this[0]=i}this.context=c,this.selector=a;return this}if(d.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return d.makeArray(a,this)},selector:"",jquery:"1.5.1",length:0,size:function(){return this.length},toArray:function(){return E.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var e=this.constructor();d.isArray(a)?D.apply(e,a):d.merge(e,a),e.prevObject=this,e.context=this.context,b==="find"?e.selector=this.selector+(this.selector?" ":"")+c:b&&(e.selector=this.selector+"."+b+"("+c+")");return e},each:function(a,b){return d.each(this,a,b)},ready:function(a){d.bindReady(),y.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(E.apply(this,arguments),"slice",E.call(arguments).join(","))},map:function(a){return this.pushStack(d.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:D,sort:[].sort,splice:[].splice},d.fn.init.prototype=d.fn,d.extend=d.fn.extend=function(){var a,c,e,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i==="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!=="object"&&!d.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){e=i[c],f=a[c];if(i===f)continue;l&&f&&(d.isPlainObject(f)||(g=d.isArray(f)))?(g?(g=!1,h=e&&d.isArray(e)?e:[]):h=e&&d.isPlainObject(e)?e:{},i[c]=d.extend(l,h,f)):f!==b&&(i[c]=f)}return i},d.extend({noConflict:function(b){a.$=f,b&&(a.jQuery=e);return d},isReady:!1,readyWait:1,ready:function(a){a===!0&&d.readyWait--;if(!d.readyWait||a!==!0&&!d.isReady){if(!c.body)return setTimeout(d.ready,1);d.isReady=!0;if(a!==!0&&--d.readyWait>0)return;y.resolveWith(c,[d]),d.fn.trigger&&d(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!x){x=!0;if(c.readyState==="complete")return setTimeout(d.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",A,!1),a.addEventListener("load",d.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",A),a.attachEvent("onload",d.ready);var b=!1;try{b=a.frameElement==null}catch(e){}c.documentElement.doScroll&&b&&I()}}},isFunction:function(a){return d.type(a)==="function"},isArray:Array.isArray||function(a){return d.type(a)==="array"},isWindow:function(a){return a&&typeof a==="object"&&"setInterval"in a},isNaN:function(a){return a==null||!l.test(a)||isNaN(a)},type:function(a){return a==null?String(a):H[B.call(a)]||"object"},isPlainObject:function(a){if(!a||d.type(a)!=="object"||a.nodeType||d.isWindow(a))return!1;if(a.constructor&&!C.call(a,"constructor")&&!C.call(a.constructor.prototype,"isPrototypeOf"))return!1;var c;for(c in a){}return c===b||C.call(a,c)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!=="string"||!b)return null;b=d.trim(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return a.JSON&&a.JSON.parse?a.JSON.parse(b):(new Function("return "+b))();d.error("Invalid JSON: "+b)},parseXML:function(b,c,e){a.DOMParser?(e=new DOMParser,c=e.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b)),e=c.documentElement,(!e||!e.nodeName||e.nodeName==="parsererror")&&d.error("Invalid XML: "+b);return c},noop:function(){},globalEval:function(a){if(a&&i.test(a)){var b=c.head||c.getElementsByTagName("head")[0]||c.documentElement,e=c.createElement("script");d.support.scriptEval()?e.appendChild(c.createTextNode(a)):e.text=a,b.insertBefore(e,b.firstChild),b.removeChild(e)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,e){var f,g=0,h=a.length,i=h===b||d.isFunction(a);if(e){if(i){for(f in a)if(c.apply(a[f],e)===!1)break}else for(;g<h;)if(c.apply(a[g++],e)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(var j=a[0];g<h&&c.call(j,g,j)!==!1;j=a[++g]){}return a},trim:F?function(a){return a==null?"":F.call(a)}:function(a){return a==null?"":(a+"").replace(j,"").replace(k,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var e=d.type(a);a.length==null||e==="string"||e==="function"||e==="regexp"||d.isWindow(a)?D.call(c,a):d.merge(c,a)}return c},inArray:function(a,b){if(b.indexOf)return b.indexOf(a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length==="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,b,c){var d=[],e;for(var f=0,g=a.length;f<g;f++)e=b(a[f],f,c),e!=null&&(d[d.length]=e);return d.concat.apply([],d)},guid:1,proxy:function(a,c,e){arguments.length===2&&(typeof c==="string"?(e=a,a=e[c],c=b):c&&!d.isFunction(c)&&(e=c,c=b)),!c&&a&&(c=function(){return a.apply(e||this,arguments)}),a&&(c.guid=a.guid=a.guid||c.guid||d.guid++);return c},access:function(a,c,e,f,g,h){var i=a.length;if(typeof c==="object"){for(var j in c)d.access(a,j,c[j],f,g,e);return a}if(e!==b){f=!h&&f&&d.isFunction(e);for(var k=0;k<i;k++)g(a[k],c,f?e.call(a[k],k,g(a[k],c)):e,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},_Deferred:function(){var a=[],b,c,e,f={done:function(){if(!e){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=d.type(i),j==="array"?f.done.apply(f,i):j==="function"&&a.push(i);k&&f.resolveWith(k[0],k[1])}return this},resolveWith:function(d,f){if(!e&&!b&&!c){c=1;try{while(a[0])a.shift().apply(d,f)}catch(g){throw g}finally{b=[d,f],c=0}}return this},resolve:function(){f.resolveWith(d.isFunction(this.promise)?this.promise():this,arguments);return this},isResolved:function(){return c||b},cancel:function(){e=1,a=[];return this}};return f},Deferred:function(a){var b=d._Deferred(),c=d._Deferred(),e;d.extend(b,{then:function(a,c){b.done(a).fail(c);return this},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,promise:function(a){if(a==null){if(e)return e;e=a={}}var c=z.length;while(c--)a[z[c]]=b[z[c]];return a}}),b.done(c.cancel).fail(b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){var b=arguments.length,c=b<=1&&a&&d.isFunction(a.promise)?a:d.Deferred(),e=c.promise();if(b>1){var f=E.call(arguments,0),g=b,h=function(a){return function(b){f[a]=arguments.length>1?E.call(arguments,0):b,--g||c.resolveWith(e,f)}};while(b--)a=f[b],a&&d.isFunction(a.promise)?a.promise().then(h(b),c.reject):--g;g||c.resolveWith(e,f)}else c!==a&&c.resolve(a);return e},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}d.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.subclass=this.subclass,a.fn.init=function b(b,c){c&&c instanceof d&&!(c instanceof a)&&(c=a(c));return d.fn.init.call(this,b,c,e)},a.fn.init.prototype=a.fn;var e=a(c);return a},browser:{}}),y=d._Deferred(),d.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){H["[object "+b+"]"]=b.toLowerCase()}),w=d.uaMatch(v),w.browser&&(d.browser[w.browser]=!0,d.browser.version=w.version),d.browser.webkit&&(d.browser.safari=!0),G&&(d.inArray=function(a,b){return G.call(b,a)}),i.test(" ")&&(j=/^[\s\xA0]+/,k=/[\s\xA0]+$/),g=d(c),c.addEventListener?A=function(){c.removeEventListener("DOMContentLoaded",A,!1),d.ready()}:c.attachEvent&&(A=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",A),d.ready())});return d}();(function(){d.support={};var b=c.createElement("div");b.style.display="none",b.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";var e=b.getElementsByTagName("*"),f=b.getElementsByTagName("a")[0],g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=b.getElementsByTagName("input")[0];if(e&&e.length&&f){d.support={leadingWhitespace:b.firstChild.nodeType===3,tbody:!b.getElementsByTagName("tbody").length,htmlSerialize:!!b.getElementsByTagName("link").length,style:/red/.test(f.getAttribute("style")),hrefNormalized:f.getAttribute("href")==="/a",opacity:/^0.55$/.test(f.style.opacity),cssFloat:!!f.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,deleteExpando:!0,optDisabled:!1,checkClone:!1,noCloneEvent:!0,noCloneChecked:!0,boxModel:null,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableHiddenOffsets:!0},i.checked=!0,d.support.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,d.support.optDisabled=!h.disabled;var j=null;d.support.scriptEval=function(){if(j===null){var b=c.documentElement,e=c.createElement("script"),f="script"+d.now();try{e.appendChild(c.createTextNode("window."+f+"=1;"))}catch(g){}b.insertBefore(e,b.firstChild),a[f]?(j=!0,delete a[f]):j=!1,b.removeChild(e),b=e=f=null}return j};try{delete b.test}catch(k){d.support.deleteExpando=!1}!b.addEventListener&&b.attachEvent&&b.fireEvent&&(b.attachEvent("onclick",function l(){d.support.noCloneEvent=!1,b.detachEvent("onclick",l)}),b.cloneNode(!0).fireEvent("onclick")),b=c.createElement("div"),b.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";var m=c.createDocumentFragment();m.appendChild(b.firstChild),d.support.checkClone=m.cloneNode(!0).cloneNode(!0).lastChild.checked,d(function(){var a=c.createElement("div"),b=c.getElementsByTagName("body")[0];if(b){a.style.width=a.style.paddingLeft="1px",b.appendChild(a),d.boxModel=d.support.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,d.support.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",d.support.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";var e=a.getElementsByTagName("td");d.support.reliableHiddenOffsets=e[0].offsetHeight===0,e[0].style.display="",e[1].style.display="none",d.support.reliableHiddenOffsets=d.support.reliableHiddenOffsets&&e[0].offsetHeight===0,a.innerHTML="",b.removeChild(a).style.display="none",a=e=null}});var n=function(a){var b=c.createElement("div");a="on"+a;if(!b.attachEvent)return!0;var d=a in b;d||(b.setAttribute(a,"return;"),d=typeof b[a]==="function"),b=null;return d};d.support.submitBubbles=n("submit"),d.support.changeBubbles=n("change"),b=e=f=null}})();var e=/^(?:\{.*\}|\[.*\])$/;d.extend({cache:{},uuid:0,expando:"jQuery"+(d.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?d.cache[a[d.expando]]:a[d.expando];return!!a&&!g(a)},data:function(a,c,e,f){if(d.acceptData(a)){var g=d.expando,h=typeof c==="string",i,j=a.nodeType,k=j?d.cache:a,l=j?a[d.expando]:a[d.expando]&&d.expando;if((!l||f&&l&&!k[l][g])&&h&&e===b)return;l||(j?a[d.expando]=l=++d.uuid:l=d.expando),k[l]||(k[l]={},j||(k[l].toJSON=d.noop));if(typeof c==="object"||typeof c==="function")f?k[l][g]=d.extend(k[l][g],c):k[l]=d.extend(k[l],c);i=k[l],f&&(i[g]||(i[g]={}),i=i[g]),e!==b&&(i[c]=e);if(c==="events"&&!i[c])return i[g]&&i[g].events;return h?i[c]:i}},removeData:function(b,c,e){if(d.acceptData(b)){var f=d.expando,h=b.nodeType,i=h?d.cache:b,j=h?b[d.expando]:d.expando;if(!i[j])return;if(c){var k=e?i[j][f]:i[j];if(k){delete k[c];if(!g(k))return}}if(e){delete i[j][f];if(!g(i[j]))return}var l=i[j][f];d.support.deleteExpando||i!=a?delete i[j]:i[j]=null,l?(i[j]={},h||(i[j].toJSON=d.noop),i[j][f]=l):h&&(d.support.deleteExpando?delete b[d.expando]:b.removeAttribute?b.removeAttribute(d.expando):b[d.expando]=null)}},_data:function(a,b,c){return d.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=d.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),d.fn.extend({data:function(a,c){var e=null;if(typeof a==="undefined"){if(this.length){e=d.data(this[0]);if(this[0].nodeType===1){var g=this[0].attributes,h;for(var i=0,j=g.length;i<j;i++)h=g[i].name,h.indexOf("data-")===0&&(h=h.substr(5),f(this[0],h,e[h]))}}return e}if(typeof a==="object")return this.each(function(){d.data(this,a)});var k=a.split(".");k[1]=k[1]?"."+k[1]:"";if(c===b){e=this.triggerHandler("getData"+k[1]+"!",[k[0]]),e===b&&this.length&&(e=d.data(this[0],a),e=f(this[0],a,e));return e===b&&k[1]?this.data(k[0]):e}return this.each(function(){var b=d(this),e=[k[0],c];b.triggerHandler("setData"+k[1]+"!",e),d.data(this,a,c),b.triggerHandler("changeData"+k[1]+"!",e)})},removeData:function(a){return this.each(function(){d.removeData(this,a)})}}),d.extend({queue:function(a,b,c){if(a){b=(b||"fx")+"queue";var e=d._data(a,b);if(!c)return e||[];!e||d.isArray(c)?e=d._data(a,b,d.makeArray(c)):e.push(c);return e}},dequeue:function(a,b){b=b||"fx";var c=d.queue(a,b),e=c.shift();e==="inprogress"&&(e=c.shift()),e&&(b==="fx"&&c.unshift("inprogress"),e.call(a,function(){d.dequeue(a,b)})),c.length||d.removeData(a,b+"queue",!0)}}),d.fn.extend({queue:function(a,c){typeof a!=="string"&&(c=a,a="fx");if(c===b)return d.queue(this[0],a);return this.each(function(b){var e=d.queue(this,a,c);a==="fx"&&e[0]!=="inprogress"&&d.dequeue(this,a)})},dequeue:function(a){return this.each(function(){d.dequeue(this,a)})},delay:function(a,b){a=d.fx?d.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){d.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var h=/[\n\t\r]/g,i=/\s+/,j=/\r/g,k=/^(?:href|src|style)$/,l=/^(?:button|input)$/i,m=/^(?:button|input|object|select|textarea)$/i,n=/^a(?:rea)?$/i,o=/^(?:radio|checkbox)$/i;d.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"},d.fn.extend({attr:function(a,b){return d.access(this,a,b,!0,d.attr)},removeAttr:function(a,b){return this.each(function(){d.attr(this,a,""),this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(d.isFunction(a))return this.each(function(b){var c=d(this);c.addClass(a.call(this,b,c.attr("class")))});if(a&&typeof a==="string"){var b=(a||"").split(i);for(var c=0,e=this.length;c<e;c++){var f=this[c];if(f.nodeType===1)if(f.className){var g=" "+f.className+" ",h=f.className;for(var j=0,k=b.length;j<k;j++)g.indexOf(" "+b[j]+" ")<0&&(h+=" "+b[j]);f.className=d.trim(h)}else f.className=a}}return this},removeClass:function(a){if(d.isFunction(a))return this.each(function(b){var c=d(this);c.removeClass(a.call(this,b,c.attr("class")))});if(a&&typeof a==="string"||a===b){var c=(a||"").split(i);for(var e=0,f=this.length;e<f;e++){var g=this[e];if(g.nodeType===1&&g.className)if(a){var j=(" "+g.className+" ").replace(h," ");for(var k=0,l=c.length;k<l;k++)j=j.replace(" "+c[k]+" "," ");g.className=d.trim(j)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,e=typeof b==="boolean";if(d.isFunction(a))return this.each(function(c){var e=d(this);e.toggleClass(a.call(this,c,e.attr("class"),b),b)});return this.each(function(){if(c==="string"){var f,g=0,h=d(this),j=b,k=a.split(i);while(f=k[g++])j=e?j:!h.hasClass(f),h[j?"addClass":"removeClass"](f)}else if(c==="undefined"||c==="boolean")this.className&&d._data(this,"__className__",this.className),this.className=this.className||a===!1?"":d._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if((" "+this[c].className+" ").replace(h," ").indexOf(b)>-1)return!0;return!1},val:function(a){if(!arguments.length){var c=this[0];if(c){if(d.nodeName(c,"option")){var e=c.attributes.value;return!e||e.specified?c.value:c.text}if(d.nodeName(c,"select")){var f=c.selectedIndex,g=[],h=c.options,i=c.type==="select-one";if(f<0)return null;for(var k=i?f:0,l=i?f+1:h.length;k<l;k++){var m=h[k];if(m.selected&&(d.support.optDisabled?!m.disabled:m.getAttribute("disabled")===null)&&(!m.parentNode.disabled||!d.nodeName(m.parentNode,"optgroup"))){a=d(m).val();if(i)return a;g.push(a)}}if(i&&!g.length&&h.length)return d(h[f]).val();return g}if(o.test(c.type)&&!d.support.checkOn)return c.getAttribute("value")===null?"on":c.value;return(c.value||"").replace(j,"")}return b}var n=d.isFunction(a);return this.each(function(b){var c=d(this),e=a;if(this.nodeType===1){n&&(e=a.call(this,b,c.val())),e==null?e="":typeof e==="number"?e+="":d.isArray(e)&&(e=d.map(e,function(a){return a==null?"":a+""}));if(d.isArray(e)&&o.test(this.type))this.checked=d.inArray(c.val(),e)>=0;else if(d.nodeName(this,"select")){var f=d.makeArray(e);d("option",this).each(function(){this.selected=d.inArray(d(this).val(),f)>=0}),f.length||(this.selectedIndex=-1)}else this.value=e}})}}),d.extend({attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,e,f){if(!a||a.nodeType===3||a.nodeType===8||a.nodeType===2)return b;if(f&&c in d.attrFn)return d(a)[c](e);var g=a.nodeType!==1||!d.isXMLDoc(a),h=e!==b;c=g&&d.props[c]||c;if(a.nodeType===1){var i=k.test(c);if(c==="selected"&&!d.support.optSelected){var j=a.parentNode;j&&(j.selectedIndex,j.parentNode&&j.parentNode.selectedIndex)}if((c in a||a[c]!==b)&&g&&!i){h&&(c==="type"&&l.test(a.nodeName)&&a.parentNode&&d.error("type property can't be changed"),e===null?a.nodeType===1&&a.removeAttribute(c):a[c]=e);if(d.nodeName(a,"form")&&a.getAttributeNode(c))return a.getAttributeNode(c).nodeValue;if(c==="tabIndex"){var o=a.getAttributeNode("tabIndex");return o&&o.specified?o.value:m.test(a.nodeName)||n.test(a.nodeName)&&a.href?0:b}return a[c]}if(!d.support.style&&g&&c==="style"){h&&(a.style.cssText=""+e);return a.style.cssText}h&&a.setAttribute(c,""+e);if(!a.attributes[c]&&(a.hasAttribute&&!a.hasAttribute(c)))return b;var p=!d.support.hrefNormalized&&g&&i?a.getAttribute(c,2):a.getAttribute(c);return p===null?b:p}h&&(a[c]=e);return a[c]}});var p=/\.(.*)$/,q=/^(?:textarea|input|select)$/i,r=/\./g,s=/ /g,t=/[^\w\s.|`]/g,u=function(a){return a.replace(t,"\\$&")};d.event={add:function(c,e,f,g){if(c.nodeType!==3&&c.nodeType!==8){try{d.isWindow(c)&&(c!==a&&!c.frameElement)&&(c=a)}catch(h){}if(f===!1)f=v;else if(!f)return;var i,j;f.handler&&(i=f,f=i.handler),f.guid||(f.guid=d.guid++);var k=d._data(c);if(!k)return;var l=k.events,m=k.handle;l||(k.events=l={}),m||(k.handle=m=function(){return typeof d!=="undefined"&&!d.event.triggered?d.event.handle.apply(m.elem,arguments):b}),m.elem=c,e=e.split(" ");var n,o=0,p;while(n=e[o++]){j=i?d.extend({},i):{handler:f,data:g},n.indexOf(".")>-1?(p=n.split("."),n=p.shift(),j.namespace=p.slice(0).sort().join(".")):(p=[],j.namespace=""),j.type=n,j.guid||(j.guid=f.guid);var q=l[n],r=d.event.special[n]||{};if(!q){q=l[n]=[];if(!r.setup||r.setup.call(c,g,p,m)===!1)c.addEventListener?c.addEventListener(n,m,!1):c.attachEvent&&c.attachEvent("on"+n,m)}r.add&&(r.add.call(c,j),j.handler.guid||(j.handler.guid=f.guid)),q.push(j),d.event.global[n]=!0}c=null}},global:{},remove:function(a,c,e,f){if(a.nodeType!==3&&a.nodeType!==8){e===!1&&(e=v);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=d.hasData(a)&&d._data(a),t=s&&s.events;if(!s||!t)return;c&&c.type&&(e=c.handler,c=c.type);if(!c||typeof c==="string"&&c.charAt(0)==="."){c=c||"";for(h in t)d.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+d.map(m.slice(0).sort(),u).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=t[h];if(!p)continue;if(!e){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))d.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=d.event.special[h]||{};for(j=f||0;j<p.length;j++){q=p[j];if(e.guid===q.guid){if(l||n.test(q.namespace))f==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(f!=null)break}}if(p.length===0||f!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&d.removeEvent(a,h,s.handle),g=null,delete t[h]}if(d.isEmptyObject(t)){var w=s.handle;w&&(w.elem=null),delete s.events,delete s.handle,d.isEmptyObject(s)&&d.removeData(a,b,!0)}}},trigger:function(a,c,e){var f=a.type||a,g=arguments[3];if(!g){a=typeof a==="object"?a[d.expando]?a:d.extend(d.Event(f),a):d.Event(f),f.indexOf("!")>=0&&(a.type=f=f.slice(0,-1),a.exclusive=!0),e||(a.stopPropagation(),d.event.global[f]&&d.each(d.cache,function(){var b=d.expando,e=this[b];e&&e.events&&e.events[f]&&d.event.trigger(a,c,e.handle.elem)}));if(!e||e.nodeType===3||e.nodeType===8)return b;a.result=b,a.target=e,c=d.makeArray(c),c.unshift(a)}a.currentTarget=e;var h=d._data(e,"handle");h&&h.apply(e,c);var i=e.parentNode||e.ownerDocument;try{e&&e.nodeName&&d.noData[e.nodeName.toLowerCase()]||e["on"+f]&&e["on"+f].apply(e,c)===!1&&(a.result=!1,a.preventDefault())}catch(j){}if(!a.isPropagationStopped()&&i)d.event.trigger(a,c,i,!0);else if(!a.isDefaultPrevented()){var k,l=a.target,m=f.replace(p,""),n=d.nodeName(l,"a")&&m==="click",o=d.event.special[m]||{};if((!o._default||o._default.call(e,a)===!1)&&!n&&!(l&&l.nodeName&&d.noData[l.nodeName.toLowerCase()])){try{l[m]&&(k=l["on"+m],k&&(l["on"+m]=null),d.event.triggered=!0,l[m]())}catch(q){}k&&(l["on"+m]=k),d.event.triggered=!1}}},handle:function(c){var e,f,g,h,i,j=[],k=d.makeArray(arguments);c=k[0]=d.event.fix(c||a.event),c.currentTarget=this,e=c.type.indexOf(".")<0&&!c.exclusive,e||(g=c.type.split("."),c.type=g.shift(),j=g.slice(0).sort(),h=new RegExp("(^|\\.)"+j.join("\\.(?:.*\\.)?")+"(\\.|$)")),c.namespace=c.namespace||j.join("."),i=d._data(this,"events"),f=(i||{})[c.type];if(i&&f){f=f.slice(0);for(var l=0,m=f.length;l<m;l++){var n=f[l];if(e||h.test(n.namespace)){c.handler=n.handler,c.data=n.data,c.handleObj=n;var o=n.handler.apply(this,k);o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[d.expando])return a;var e=a;a=d.Event(e);for(var f=this.props.length,g;f;)g=this.props[--f],a[g]=e[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=c.documentElement,i=c.body;a.pageX=a.clientX+(h&&h.scrollLeft||i&&i.scrollLeft||0)-(h&&h.clientLeft||i&&i.clientLeft||0),a.pageY=a.clientY+(h&&h.scrollTop||i&&i.scrollTop||0)-(h&&h.clientTop||i&&i.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:d.proxy,special:{ready:{setup:d.bindReady,teardown:d.noop},live:{add:function(a){d.event.add(this,F(a.origType,a.selector),d.extend({},a,{handler:E,guid:a.handler.guid}))},remove:function(a){d.event.remove(this,F(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){d.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},d.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},d.Event=function(a){if(!this.preventDefault)return new d.Event(a);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?w:v):this.type=a,this.timeStamp=d.now(),this[d.expando]=!0},d.Event.prototype={preventDefault:function(){this.isDefaultPrevented=w;var a=this.originalEvent;a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=w;var a=this.originalEvent;a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=w,this.stopPropagation()},isDefaultPrevented:v,isPropagationStopped:v,isImmediatePropagationStopped:v};var x=function(a){var b=a.relatedTarget;try{if(b!==c&&!b.parentNode)return;while(b&&b!==this)b=b.parentNode;b!==this&&(a.type=a.data,d.event.handle.apply(this,arguments))}catch(e){}},y=function(a){a.type=a.data,d.event.handle.apply(this,arguments)};d.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){d.event.special[a]={setup:function(c){d.event.add(this,b,c&&c.selector?y:x,a)},teardown:function(a){d.event.remove(this,b,a&&a.selector?y:x)}}}),d.support.submitBubbles||(d.event.special.submit={setup:function(a,b){if(this.nodeName&&this.nodeName.toLowerCase()!=="form")d.event.add(this,"click.specialSubmit",function(a){var b=a.target,c=b.type;(c==="submit"||c==="image")&&d(b).closest("form").length&&C("submit",this,arguments)}),d.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,c=b.type;(c==="text"||c==="password")&&d(b).closest("form").length&&a.keyCode===13&&C("submit",this,arguments)});else return!1},teardown:function(a){d.event.remove(this,".specialSubmit")}});if(!d.support.changeBubbles){var z,A=function(a){var b=a.type,c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?d.map(a.options,function(a){return a.selected}).join("-"):"":a.nodeName.toLowerCase()==="select"&&(c=a.selectedIndex);return c},B=function B(a){var c=a.target,e,f;if(q.test(c.nodeName)&&!c.readOnly){e=d._data(c,"_change_data"),f=A(c),(a.type!=="focusout"||c.type!=="radio")&&d._data(c,"_change_data",f);if(e===b||f===e)return;if(e!=null||f)a.type="change",a.liveFired=b,d.event.trigger(a,arguments[1],c)}};d.event.special.change={filters:{focusout:B,beforedeactivate:B,click:function(a){var b=a.target,c=b.type;(c==="radio"||c==="checkbox"||b.nodeName.toLowerCase()==="select")&&B.call(this,a)},keydown:function(a){var b=a.target,c=b.type;(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")&&B.call(this,a)},beforeactivate:function(a){var b=a.target;d._data(b,"_change_data",A(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in z)d.event.add(this,c+".specialChange",z[c]);return q.test(this.nodeName)},teardown:function(a){d.event.remove(this,".specialChange");return q.test(this.nodeName)}},z=d.event.special.change.filters,z.focus=z.beforeactivate}c.addEventListener&&d.each({focus:"focusin",blur:"focusout"},function(a,b){function c(a){a=d.event.fix(a),a.type=b;return d.event.handle.call(this,a)}d.event.special[b]={setup:function(){this.addEventListener(a,c,!0)},teardown:function(){this.removeEventListener(a,c,!0)}}}),d.each(["bind","one"],function(a,c){d.fn[c]=function(a,e,f){if(typeof a==="object"){for(var g in a)this[c](g,e,a[g],f);return this}if(d.isFunction(e)||e===!1)f=e,e=b;var h=c==="one"?d.proxy(f,function(a){d(this).unbind(a,h);return f.apply(this,arguments)}):f;if(a==="unload"&&c!=="one")this.one(a,e,f);else for(var i=0,j=this.length;i<j;i++)d.event.add(this[i],a,h,e);return this}}),d.fn.extend({unbind:function(a,b){if(typeof a!=="object"||a.preventDefault)for(var e=0,f=this.length;e<f;e++)d.event.remove(this[e],a,b);else for(var c in a)this.unbind(c,a[c]);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){d.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){var c=d.Event(a);c.preventDefault(),c.stopPropagation(),d.event.trigger(c,b,this[0]);return c.result}},toggle:function(a){var b=arguments,c=1;while(c<b.length)d.proxy(a,b[c++]);return this.click(d.proxy(a,function(e){var f=(d._data(this,"lastToggle"+a.guid)||0)%c;d._data(this,"lastToggle"+a.guid,f+1),e.preventDefault();return b[f].apply(this,arguments)||!1}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var D={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};d.each(["live","die"],function(a,c){d.fn[c]=function(a,e,f,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:d(this.context);if(typeof a==="object"&&!a.preventDefault){for(var o in a)n[c](o,e,a[o],m);return this}d.isFunction(e)&&(f=e,e=b),a=(a||"").split(" ");while((h=a[i++])!=null){j=p.exec(h),k="",j&&(k=j[0],h=h.replace(p,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,h==="focus"||h==="blur"?(a.push(D[h]+k),h=h+k):h=(D[h]||h)+k;if(c==="live")for(var q=0,r=n.length;q<r;q++)d.event.add(n[q],"live."+F(h,m),{data:e,selector:m,handler:f,origType:h,origHandler:f,preType:l});else n.unbind("live."+F(h,m),f)}return this}}),d.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){d.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},d.attrFn&&(d.attrFn[b]=!0)}),function(){function u(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}if(i.nodeType===1){f||(i.sizcache=c,i.sizset=g);if(typeof b!=="string"){if(i===b){j=!0;break}}else if(k.filter(b,[i]).length>0){j=i;break}}i=i[a]}d[g]=j}}}function t(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,e=0,f=Object.prototype.toString,g=!1,h=!0,i=/\\/g,j=/\W/;[0,0].sort(function(){h=!1;return 0});var k=function(b,d,e,g){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!=="string")return e;var i,j,n,o,q,r,s,t,u=!0,w=k.isXML(d),x=[],y=b;do{a.exec(""),i=a.exec(y);if(i){y=i[3],x.push(i[1]);if(i[2]){o=i[3];break}}}while(i);if(x.length>1&&m.exec(b))if(x.length===2&&l.relative[x[0]])j=v(x[0]+x[1],d);else{j=l.relative[x[0]]?[d]:k(x.shift(),d);while(x.length)b=x.shift(),l.relative[b]&&(b+=x.shift()),j=v(b,j)}else{!g&&x.length>1&&d.nodeType===9&&!w&&l.match.ID.test(x[0])&&!l.match.ID.test(x[x.length-1])&&(q=k.find(x.shift(),d,w),d=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:p(g)}:k.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),j=q.expr?k.filter(q.expr,q.set):q.set,x.length>0?n=p(j):u=!1;while(x.length)r=x.pop(),s=r,l.relative[r]?s=x.pop():r="",s==null&&(s=d),l.relative[r](n,s,w)}else n=x=[]}n||(n=j),n||k.error(r||b);if(f.call(n)==="[object Array]")if(u)if(d&&d.nodeType===1)for(t=0;n[t]!=null;t++)n[t]&&(n[t]===!0||n[t].nodeType===1&&k.contains(d,n[t]))&&e.push(j[t]);else for(t=0;n[t]!=null;t++)n[t]&&n[t].nodeType===1&&e.push(j[t]);else e.push.apply(e,n);else p(n,e);o&&(k(o,h,e,g),k.uniqueSort(e));return e};k.uniqueSort=function(a){if(r){g=h,a.sort(r);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},k.matches=function(a,b){return k(a,null,null,b)},k.matchesSelector=function(a,b){return k(b,null,null,[a]).length>0},k.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=l.order.length;e<f;e++){var g,h=l.order[e];if(g=l.leftMatch[h].exec(a)){var j=g[1];g.splice(1,1);if(j.substr(j.length-1)!=="\\"){g[1]=(g[1]||"").replace(i,""),d=l.find[h](g,b,c);if(d!=null){a=a.replace(l.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!=="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},k.filter=function(a,c,d,e){var f,g,h=a,i=[],j=c,m=c&&c[0]&&k.isXML(c[0]);while(a&&c.length){for(var n in l.filter)if((f=l.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=l.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;j===i&&(i=[]);if(l.preFilter[n]){f=l.preFilter[n](f,j,d,i,e,m);if(f){if(f===!0)continue}else g=o=!0}if(f)for(var s=0;(p=j[s])!=null;s++)if(p){o=q(p,f,s,j);var t=e^!!o;d&&o!=null?t?g=!0:j[s]=!1:t&&(i.push(p),g=!0)}if(o!==b){d||(j=i),a=a.replace(l.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)k.error(a);else break;h=a}return j},k.error=function(a){throw"Syntax error, unrecognized expression: "+a};var l=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b==="string",d=c&&!j.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1){}a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&k.filter(b,a,!0)},">":function(a,b){var c,d=typeof b==="string",e=0,f=a.length;if(d&&!j.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&k.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=u;typeof b==="string"&&!j.test(b)&&(b=b.toLowerCase(),d=b,g=t),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=u;typeof b==="string"&&!j.test(b)&&(b=b.toLowerCase(),d=b,g=t),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!=="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!=="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!=="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(i,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(i,"")},TAG:function(a,b){return a[1].replace(i,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||k.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&k.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(i,"");!f&&l.attrMap[g]&&(a[1]=l.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(i,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=k(b[3],null,null,c);else{var g=k.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(l.match.POS.test(b[0])||l.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){return"text"===a.getAttribute("type")},radio:function(a){return"radio"===a.type},checkbox:function(a){return"checkbox"===a.type},file:function(a){return"file"===a.type},password:function(a){return"password"===a.type},submit:function(a){return"submit"===a.type},image:function(a){return"image"===a.type},reset:function(a){return"reset"===a.type},button:function(a){return"button"===a.type||a.nodeName.toLowerCase()==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=l.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||k.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}k.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=l.attrHandle[c]?l.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=l.setFilters[e];if(f)return f(a,c,b,d)}}},m=l.match.POS,n=function(a,b){return"\\"+(b-0+1)};for(var o in l.match)l.match[o]=new RegExp(l.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[o].source.replace(/\\(\d+)/g,n));var p=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(q){p=function(a,b){var c=0,d=b||[];if(f.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length==="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var r,s;c.documentElement.compareDocumentPosition?r=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(r=function(a,b){var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(a===b){g=!0;return 0}if(h===i)return s(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return s(e[k],f[k]);return k===c?s(a,f[k],-1):s(e[k],b,1)},s=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),k.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=k.getText(c.childNodes));return b},function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(l.find.ID=function(a,c,d){if(typeof c.getElementById!=="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!=="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},l.filter.ID=function(a,b){var c=typeof a.getAttributeNode!=="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(l.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!=="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(l.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=k,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){k=function(b,e,f,g){e=e||c;if(!g&&!k.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return p(e.getElementsByTagName(b),f);if(h[2]&&l.find.CLASS&&e.getElementsByClassName)return p(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return p([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return p([],f);if(i.id===h[3])return p([i],f)}try{return p(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e,n=e.getAttribute("id"),o=n||d,q=e.parentNode,r=/^\s*[+~]/.test(b);n?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),r&&q&&(e=e.parentNode);try{if(!r||q)return p(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(s){}finally{n||m.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)k[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector,d=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(e){d=!0}b&&(k.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(a))try{if(d||!l.match.PSEUDO.test(c)&&!/!=/.test(c))return b.call(a,c)}catch(e){}return k(c,null,null,[a]).length>0})}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!=="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?k.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?k.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:k.contains=function(){return!1},k.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var v=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=l.match.PSEUDO.exec(a))e+=c[0],a=a.replace(l.match.PSEUDO,"");a=l.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)k(a,f[g],d);return k.filter(e,d)};d.find=k,d.expr=k.selectors,d.expr[":"]=d.expr.filters,d.unique=k.uniqueSort,d.text=k.getText,d.isXMLDoc=k.isXML,d.contains=k.contains}();var G=/Until$/,H=/^(?:parents|prevUntil|prevAll)/,I=/,/,J=/^.[^:#\[\.,]*$/,K=Array.prototype.slice,L=d.expr.match.POS,M={children:!0,contents:!0,next:!0,prev:!0};d.fn.extend({find:function(a){var b=this.pushStack("","find",a),c=0;for(var e=0,f=this.length;e<f;e++){c=b.length,d.find(a,this[e],b);if(e>0)for(var g=c;g<b.length;g++)for(var h=0;h<c;h++)if(b[h]===b[g]){b.splice(g--,1);break}}return b},has:function(a){var b=d(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(d.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(O(this,a,!1),"not",a)},filter:function(a){return this.pushStack(O(this,a,!0),"filter",a)},is:function(a){return!!a&&d.filter(a,this).length>0},closest:function(a,b){var c=[],e,f,g=this[0];if(d.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(e=0,f=a.length;e<f;e++)i=a[e],j[i]||(j[i]=d.expr.match.POS.test(i)?d(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:d(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=L.test(a)?d(a,b||this.context):null;for(e=0,f=this.length;e<f;e++){g=this[e];while(g){if(l?l.index(g)>-1:d.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b)break}}c=c.length>1?d.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a||typeof a==="string")return d.inArray(this[0],a?d(a):this.parent().children());return d.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a==="string"?d(a,b):d.makeArray(a),e=d.merge(this.get(),c);return this.pushStack(N(c[0])||N(e[0])?e:d.unique(e))},andSelf:function(){return this.add(this.prevObject)}}),d.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return d.dir(a,"parentNode")},parentsUntil:function(a,b,c){return d.dir(a,"parentNode",c)},next:function(a){return d.nth(a,2,"nextSibling")},prev:function(a){return d.nth(a,2,"previousSibling")},nextAll:function(a){return d.dir(a,"nextSibling")},prevAll:function(a){return d.dir(a,"previousSibling")},nextUntil:function(a,b,c){return d.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return d.dir(a,"previousSibling",c)},siblings:function(a){return d.sibling(a.parentNode.firstChild,a)},children:function(a){return d.sibling(a.firstChild)},contents:function(a){return d.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:d.makeArray(a.childNodes)}},function(a,b){d.fn[a]=function(c,e){var f=d.map(this,b,c),g=K.call(arguments);G.test(a)||(e=c),e&&typeof e==="string"&&(f=d.filter(e,f)),f=this.length>1&&!M[a]?d.unique(f):f,(this.length>1||I.test(e))&&H.test(a)&&(f=f.reverse());return this.pushStack(f,a,g.join(","))}}),d.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?d.find.matchesSelector(b[0],a)?[b[0]]:[]:d.find.matches(a,b)},dir:function(a,c,e){var f=[],g=a[c];while(g&&g.nodeType!==9&&(e===b||g.nodeType!==1||!d(g).is(e)))g.nodeType===1&&f.push(g),g=g[c];return f},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var P=/ jQuery\d+="(?:\d+|null)"/g,Q=/^\s+/,R=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,S=/<([\w:]+)/,T=/<tbody/i,U=/<|&#?\w+;/,V=/<(?:script|object|embed|option|style)/i,W=/checked\s*(?:[^=]|=\s*.checked.)/i,X={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};X.optgroup=X.option,X.tbody=X.tfoot=X.colgroup=X.caption=X.thead,X.th=X.td,d.support.htmlSerialize||(X._default=[1,"div<div>","</div>"]),d.fn.extend({text:function(a){if(d.isFunction(a))return this.each(function(b){var c=d(this);c.text(a.call(this,b,c.text()))});if(typeof a!=="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return d.text(this)},wrapAll:function(a){if(d.isFunction(a))return this.each(function(b){d(this).wrapAll(a.call(this,b))});if(this[0]){var b=d(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(d.isFunction(a))return this.each(function(b){d(this).wrapInner(a.call(this,b))});return this.each(function(){var b=d(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){d(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){d.nodeName(this,"body")||d(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=d(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,d(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,e;(e=this[c])!=null;c++)if(!a||d.filter(a,[e]).length)!b&&e.nodeType===1&&(d.cleanData(e.getElementsByTagName("*")),d.cleanData([e])),e.parentNode&&e.parentNode.removeChild(e);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&d.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return d.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(P,""):null;if(typeof a!=="string"||V.test(a)||!d.support.leadingWhitespace&&Q.test(a)||X[(S.exec(a)||["",""])[1].toLowerCase()])d.isFunction(a)?this.each(function(b){var c=d(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);else{a=a.replace(R,"<$1></$2>");try{for(var c=0,e=this.length;c<e;c++)this[c].nodeType===1&&(d.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(f){this.empty().append(a)}}return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(d.isFunction(a))return this.each(function(b){var c=d(this),e=c.html();c.replaceWith(a.call(this,b,e))});typeof a!=="string"&&(a=d(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;d(this).remove(),b?d(b).before(a):d(c).append(a)})}return this.pushStack(d(d.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,e){var f,g,h,i,j=a[0],k=[];if(!d.support.checkClone&&arguments.length===3&&typeof j==="string"&&W.test(j))return this.each(function(){d(this).domManip(a,c,e,!0)});if(d.isFunction(j))return this.each(function(f){var g=d(this);a[0]=j.call(this,f,c?g.html():b),g.domManip(a,c,e)});if(this[0]){i=j&&j.parentNode,d.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?f={fragment:i}:f=d.buildFragment(a,this,k),h=f.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&d.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)e.call(c?Y(this[l],g):this[l],f.cacheable||m>1&&l<n?d.clone(h,!0,!0):h)}k.length&&d.each(k,ba)}return this}}),d.buildFragment=function(a,b,e){var f,g,h,i=b&&b[0]?b[0].ownerDocument||b[0]:c;a.length===1&&typeof a[0]==="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!V.test(a[0])&&(d.support.checkClone||!W.test(a[0]))&&(g=!0,h=d.fragments[a[0]],h&&(h!==1&&(f=h))),f||(f=i.createDocumentFragment(),d.clean(a,i,f,e)),g&&(d.fragments[a[0]]=h?f:1);return{fragment:f,cacheable:g}},d.fragments={},d.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){d.fn[a]=function(c){var e=[],f=d(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&f.length===1){f[b](this[0]);return this}for(var h=0,i=f.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();d(f[h])[b](j),e=e.concat(j)}return this.pushStack(e,a,f.selector)}}),d.extend({clone:function(a,b,c){var e=a.cloneNode(!0),f,g,h;if((!d.support.noCloneEvent||!d.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!d.isXMLDoc(a)){$(a,e),f=_(a),g=_(e);for(h=0;f[h];++h)$(f[h],g[h])}if(b){Z(a,e);if(c){f=_(a),g=_(e);for(h=0;f[h];++h)Z(f[h],g[h])}}return e},clean:function(a,b,e,f){b=b||c,typeof b.createElement==="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var g=[];for(var h=0,i;(i=a[h])!=null;h++){typeof i==="number"&&(i+="");if(!i)continue;if(typeof i!=="string"||U.test(i)){if(typeof i==="string"){i=i.replace(R,"<$1></$2>");var j=(S.exec(i)||["",""])[1].toLowerCase(),k=X[j]||X._default,l=k[0],m=b.createElement("div");m.innerHTML=k[1]+i+k[2];while(l--)m=m.lastChild;if(!d.support.tbody){var n=T.test(i),o=j==="table"&&!n?m.firstChild&&m.firstChild.childNodes:k[1]==="<table>"&&!n?m.childNodes:[];for(var p=o.length-1;p>=0;--p)d.nodeName(o[p],"tbody")&&!o[p].childNodes.length&&o[p].parentNode.removeChild(o[p])}!d.support.leadingWhitespace&&Q.test(i)&&m.insertBefore(b.createTextNode(Q.exec(i)[0]),m.firstChild),i=m.childNodes}}else i=b.createTextNode(i);i.nodeType?g.push(i):g=d.merge(g,i)}if(e)for(h=0;g[h];h++)!f||!d.nodeName(g[h],"script")||g[h].type&&g[h].type.toLowerCase()!=="text/javascript"?(g[h].nodeType===1&&g.splice.apply(g,[h+1,0].concat(d.makeArray(g[h].getElementsByTagName("script")))),e.appendChild(g[h])):f.push(g[h].parentNode?g[h].parentNode.removeChild(g[h]):g[h]);return g},cleanData:function(a){var b,c,e=d.cache,f=d.expando,g=d.event.special,h=d.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&d.noData[j.nodeName.toLowerCase()])continue;c=j[d.expando];if(c){b=e[c]&&e[c][f];if(b&&b.events){for(var k in b.events)g[k]?d.event.remove(j,k):d.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[d.expando]:j.removeAttribute&&j.removeAttribute(d.expando),delete e[c]}}}});var bb=/alpha\([^)]*\)/i,bc=/opacity=([^)]*)/,bd=/-([a-z])/ig,be=/([A-Z])/g,bf=/^-?\d+(?:px)?$/i,bg=/^-?\d/,bh={position:"absolute",visibility:"hidden",display:"block"},bi=["Left","Right"],bj=["Top","Bottom"],bk,bl,bm,bn=function(a,b){return b.toUpperCase()};d.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return d.access(this,a,c,!0,function(a,c,e){return e!==b?d.style(a,c,e):d.css(a,c)})},d.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bk(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{zIndex:!0,fontWeight:!0,opacity:!0,zoom:!0,lineHeight:!0},cssProps:{"float":d.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,e,f){if(a&&a.nodeType!==3&&a.nodeType!==8&&a.style){var g,h=d.camelCase(c),i=a.style,j=d.cssHooks[h];c=d.cssProps[h]||h;if(e===b){if(j&&"get"in j&&(g=j.get(a,!1,f))!==b)return g;return i[c]}if(typeof e==="number"&&isNaN(e)||e==null)return;typeof e==="number"&&!d.cssNumber[h]&&(e+="px");if(!j||!("set"in j)||(e=j.set(a,e))!==b)try{i[c]=e}catch(k){}}},css:function(a,c,e){var f,g=d.camelCase(c),h=d.cssHooks[g];c=d.cssProps[g]||g;if(h&&"get"in h&&(f=h.get(a,!0,e))!==b)return f;if(bk)return bk(a,c,g)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]},camelCase:function(a){return a.replace(bd,bn)}}),d.curCSS=d.css,d.each(["height","width"],function(a,b){d.cssHooks[b]={get:function(a,c,e){var f;if(c){a.offsetWidth!==0?f=bo(a,b,e):d.swap(a,bh,function(){f=bo(a,b,e)});if(f<=0){f=bk(a,b,b),f==="0px"&&bm&&(f=bm(a,b,b));if(f!=null)return f===""||f==="auto"?"0px":f}if(f<0||f==null){f=a.style[b];return f===""||f==="auto"?"0px":f}return typeof f==="string"?f:f+"px"}},set:function(a,b){if(!bf.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),d.support.opacity||(d.cssHooks.opacity={get:function(a,b){return bc.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style;c.zoom=1;var e=d.isNaN(b)?"":"alpha(opacity="+b*100+")",f=c.filter||"";c.filter=bb.test(f)?f.replace(bb,e):c.filter+" "+e}}),c.defaultView&&c.defaultView.getComputedStyle&&(bl=function(a,c,e){var f,g,h;e=e.replace(be,"-$1").toLowerCase();if(!(g=a.ownerDocument.defaultView))return b;if(h=g.getComputedStyle(a,null))f=h.getPropertyValue(e),f===""&&!d.contains(a.ownerDocument.documentElement,a)&&(f=d.style(a,e));return f}),c.documentElement.currentStyle&&(bm=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!bf.test(d)&&bg.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bk=bl||bm,d.expr&&d.expr.filters&&(d.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!d.support.reliableHiddenOffsets&&(a.style.display||d.css(a,"display"))==="none"},d.expr.filters.visible=function(a){return!d.expr.filters.hidden(a)});var bp=/%20/g,bq=/\[\]$/,br=/\r?\n/g,bs=/#.*$/,bt=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bu=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bv=/(?:^file|^widget|\-extension):$/,bw=/^(?:GET|HEAD)$/,bx=/^\/\//,by=/\?/,bz=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bA=/^(?:select|textarea)/i,bB=/\s+/,bC=/([?&])_=[^&]*/,bD=/(^|\-)([a-z])/g,bE=function(a,b,c){return b+c.toUpperCase()},bF=/^([\w\+\.\-]+:)\/\/([^\/?#:]*)(?::(\d+))?/,bG=d.fn.load,bH={},bI={},bJ,bK;try{bJ=c.location.href}catch(bL){bJ=c.createElement("a"),bJ.href="",bJ=bJ.href}bK=bF.exec(bJ.toLowerCase()),d.fn.extend({load:function(a,c,e){if(typeof a!=="string"&&bG)return bG.apply(this,arguments);if(!this.length)return this;var f=a.indexOf(" ");if(f>=0){var g=a.slice(f,a.length);a=a.slice(0,f)}var h="GET";c&&(d.isFunction(c)?(e=c,c=b):typeof c==="object"&&(c=d.param(c,d.ajaxSettings.traditional),h="POST"));var i=this;d.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?d("<div>").append(c.replace(bz,"")).find(g):c)),e&&i.each(e,[c,b,a])}});return this},serialize:function(){return d.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?d.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bA.test(this.nodeName)||bu.test(this.type))}).map(function(a,b){var c=d(this).val();return c==null?null:d.isArray(c)?d.map(c,function(a,c){return{name:b.name,value:a.replace(br,"\r\n")}}):{name:b.name,value:c.replace(br,"\r\n")}}).get()}}),d.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){d.fn[b]=function(a){return this.bind(b,a)}}),d.each(["get","post"],function(a,c){d[c]=function(a,e,f,g){d.isFunction(e)&&(g=g||f,f=e,e=b);return d.ajax({type:c,url:a,data:e,success:f,dataType:g})}}),d.extend({getScript:function(a,c){return d.get(a,b,c,"script")},getJSON:function(a,b,c){return d.get(a,b,c,"json")},ajaxSetup:function(a,b){b?d.extend(!0,a,d.ajaxSettings,b):(b=a,a=d.extend(!0,d.ajaxSettings,b));for(var c in {context:1,url:1})c in b?a[c]=b[c]:c in d.ajaxSettings&&(a[c]=d.ajaxSettings[c]);return a},ajaxSettings:{url:bJ,isLocal:bv.test(bK[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*/*"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":d.parseJSON,"text xml":d.parseXML}},ajaxPrefilter:bM(bH),ajaxTransport:bM(bI),ajax:function(a,c){function v(a,c,l,n){if(r!==2){r=2,p&&clearTimeout(p),o=b,m=n||"",u.readyState=a?4:0;var q,t,v,w=l?bP(e,u,l):b,x,y;if(a>=200&&a<300||a===304){if(e.ifModified){if(x=u.getResponseHeader("Last-Modified"))d.lastModified[k]=x;if(y=u.getResponseHeader("Etag"))d.etag[k]=y}if(a===304)c="notmodified",q=!0;else try{t=bQ(e,w),c="success",q=!0}catch(z){c="parsererror",v=z}}else{v=c;if(!c||a)c="error",a<0&&(a=0)}u.status=a,u.statusText=c,q?h.resolveWith(f,[t,c,u]):h.rejectWith(f,[u,c,v]),u.statusCode(j),j=b,s&&g.trigger("ajax"+(q?"Success":"Error"),[u,e,q?t:v]),i.resolveWith(f,[u,c]),s&&(g.trigger("ajaxComplete",[u,e]),--d.active||d.event.trigger("ajaxStop"))}}typeof a==="object"&&(c=a,a=b),c=c||{};var e=d.ajaxSetup({},c),f=e.context||e,g=f!==e&&(f.nodeType||f instanceof d)?d(f):d.event,h=d.Deferred(),i=d._Deferred(),j=e.statusCode||{},k,l={},m,n,o,p,q,r=0,s,t,u={readyState:0,setRequestHeader:function(a,b){r||(l[a.toLowerCase().replace(bD,bE)]=b);return this},getAllResponseHeaders:function(){return r===2?m:null},getResponseHeader:function(a){var c;if(r===2){if(!n){n={};while(c=bt.exec(m))n[c[1].toLowerCase()]=c[2]}c=n[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){r||(e.mimeType=a);return this},abort:function(a){a=a||"abort",o&&o.abort(a),v(0,a);return this}};h.promise(u),u.success=u.done,u.error=u.fail,u.complete=i.done,u.statusCode=function(a){if(a){var b;if(r<2)for(b in a)j[b]=[j[b],a[b]];else b=a[u.status],u.then(b,b)}return this},e.url=((a||e.url)+"").replace(bs,"").replace(bx,bK[1]+"//"),e.dataTypes=d.trim(e.dataType||"*").toLowerCase().split(bB),e.crossDomain||(q=bF.exec(e.url.toLowerCase()),e.crossDomain=q&&(q[1]!=bK[1]||q[2]!=bK[2]||(q[3]||(q[1]==="http:"?80:443))!=(bK[3]||(bK[1]==="http:"?80:443)))),e.data&&e.processData&&typeof e.data!=="string"&&(e.data=d.param(e.data,e.traditional)),bN(bH,e,c,u);if(r===2)return!1;s=e.global,e.type=e.type.toUpperCase(),e.hasContent=!bw.test(e.type),s&&d.active++===0&&d.event.trigger("ajaxStart");if(!e.hasContent){e.data&&(e.url+=(by.test(e.url)?"&":"?")+e.data),k=e.url;if(e.cache===!1){var w=d.now(),x=e.url.replace(bC,"$1_="+w);e.url=x+(x===e.url?(by.test(e.url)?"&":"?")+"_="+w:"")}}if(e.data&&e.hasContent&&e.contentType!==!1||c.contentType)l["Content-Type"]=e.contentType;e.ifModified&&(k=k||e.url,d.lastModified[k]&&(l["If-Modified-Since"]=d.lastModified[k]),d.etag[k]&&(l["If-None-Match"]=d.etag[k])),l.Accept=e.dataTypes[0]&&e.accepts[e.dataTypes[0]]?e.accepts[e.dataTypes[0]]+(e.dataTypes[0]!=="*"?", */*; q=0.01":""):e.accepts["*"];for(t in e.headers)u.setRequestHeader(t,e.headers[t]);if(e.beforeSend&&(e.beforeSend.call(f,u,e)===!1||r===2)){u.abort();return!1}for(t in {success:1,error:1,complete:1})u[t](e[t]);o=bN(bI,e,c,u);if(o){u.readyState=1,s&&g.trigger("ajaxSend",[u,e]),e.async&&e.timeout>0&&(p=setTimeout(function(){u.abort("timeout")},e.timeout));try{r=1,o.send(l,v)}catch(y){status<2?v(-1,y):d.error(y)}}else v(-1,"No Transport");return u},param:function(a,c){var e=[],f=function(a,b){b=d.isFunction(b)?b():b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=d.ajaxSettings.traditional);if(d.isArray(a)||a.jquery&&!d.isPlainObject(a))d.each(a,function(){f(this.name,this.value)});else for(var g in a)bO(g,a[g],c,f);return e.join("&").replace(bp,"+")}}),d.extend({active:0,lastModified:{},etag:{}});var bR=d.now(),bS=/(\=)\?(&|$)|()\?\?()/i;d.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return d.expando+"_"+bR++}}),d.ajaxPrefilter("json jsonp",function(b,c,e){var f=typeof b.data==="string";if(b.dataTypes[0]==="jsonp"||c.jsonpCallback||c.jsonp!=null||b.jsonp!==!1&&(bS.test(b.url)||f&&bS.test(b.data))){var g,h=b.jsonpCallback=d.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2",m=function(){a[h]=i,g&&d.isFunction(i)&&a[h](g[0])};b.jsonp!==!1&&(j=j.replace(bS,l),b.url===j&&(f&&(k=k.replace(bS,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},e.then(m,m),b.converters["script json"]=function(){g||d.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),d.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){d.globalEval(a);return a}}}),d.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),d.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var bT=d.now(),bU,bV;d.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&bX()||bY()}:bX,bV=d.ajaxSettings.xhr(),d.support.ajax=!!bV,d.support.cors=bV&&"withCredentials"in bV,bV=b,d.support.ajax&&d.ajaxTransport(function(a){if(!a.crossDomain||d.support.cors){var c;return{send:function(e,f){var g=a.xhr(),h,i;a.username?g.open(a.type,a.url,a.async,a.username,a.password):g.open(a.type,a.url,a.async);if(a.xhrFields)for(i in a.xhrFields)g[i]=a.xhrFields[i];a.mimeType&&g.overrideMimeType&&g.overrideMimeType(a.mimeType),(!a.crossDomain||a.hasContent)&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(i in e)g.setRequestHeader(i,e[i])}catch(j){}g.send(a.hasContent&&a.data||null),c=function(e,i){var j,k,l,m,n;try{if(c&&(i||g.readyState===4)){c=b,h&&(g.onreadystatechange=d.noop,delete bU[h]);if(i)g.readyState!==4&&g.abort();else{j=g.status,l=g.getAllResponseHeaders(),m={},n=g.responseXML,n&&n.documentElement&&(m.xml=n),m.text=g.responseText;try{k=g.statusText}catch(o){k=""}j||!a.isLocal||a.crossDomain?j===1223&&(j=204):j=m.text?200:404}}}catch(p){i||f(-1,p)}m&&f(j,k,m,l)},a.async&&g.readyState!==4?(bU||(bU={},bW()),h=bT++,g.onreadystatechange=bU[h]=c):c()},abort:function(){c&&c(0,1)}}}});var bZ={},b$=/^(?:toggle|show|hide)$/,b_=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,ca,cb=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];d.fn.extend({show:function(a,b,c){var e,f;if(a||a===0)return this.animate(cc("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)e=this[g],f=e.style.display,!d._data(e,"olddisplay")&&f==="none"&&(f=e.style.display=""),f===""&&d.css(e,"display")==="none"&&d._data(e,"olddisplay",cd(e.nodeName));for(g=0;g<h;g++){e=this[g],f=e.style.display;if(f===""||f==="none")e.style.display=d._data(e,"olddisplay")||""}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cc("hide",3),a,b,c);for(var e=0,f=this.length;e<f;e++){var g=d.css(this[e],"display");g!=="none"&&!d._data(this[e],"olddisplay")&&d._data(this[e],"olddisplay",g)}for(e=0;e<f;e++)this[e].style.display="none";return this},_toggle:d.fn.toggle,toggle:function(a,b,c){var e=typeof a==="boolean";d.isFunction(a)&&d.isFunction(b)?this._toggle.apply(this,arguments):a==null||e?this.each(function(){var b=e?a:d(this).is(":hidden");d(this)[b?"show":"hide"]()}):this.animate(cc("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,e){var f=d.speed(b,c,e);if(d.isEmptyObject(a))return this.each(f.complete);return this[f.queue===!1?"each":"queue"](function(){var b=d.extend({},f),c,e=this.nodeType===1,g=e&&d(this).is(":hidden"),h=this;for(c in a){var i=d.camelCase(c);c!==i&&(a[i]=a[c],delete a[c],c=i);if(a[c]==="hide"&&g||a[c]==="show"&&!g)return b.complete.call(this);if(e&&(c==="height"||c==="width")){b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];if(d.css(this,"display")==="inline"&&d.css(this,"float")==="none")if(d.support.inlineBlockNeedsLayout){var j=cd(this.nodeName);j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)}else this.style.display="inline-block"}d.isArray(a[c])&&((b.specialEasing=b.specialEasing||{})[c]=a[c][1],a[c]=a[c][0])}b.overflow!=null&&(this.style.overflow="hidden"),b.curAnim=d.extend({},a),d.each(a,function(c,e){var f=new d.fx(h,b,c);if(b$.test(e))f[e==="toggle"?g?"show":"hide":e](a);else{var i=b_.exec(e),j=f.cur();if(i){var k=parseFloat(i[2]),l=i[3]||(d.cssNumber[c]?"":"px");l!=="px"&&(d.style(h,c,(k||1)+l),j=(k||1)/f.cur()*j,d.style(h,c,j+l)),i[1]&&(k=(i[1]==="-="?-1:1)*k+j),f.custom(j,k,l)}else f.custom(j,e,"")}});return!0})},stop:function(a,b){var c=d.timers;a&&this.queue([]),this.each(function(){for(var a=c.length-1;a>=0;a--)c[a].elem===this&&(b&&c[a](!0),c.splice(a,1))}),b||this.dequeue();return this}}),d.each({slideDown:cc("show",1),slideUp:cc("hide",1),slideToggle:cc("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){d.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),d.extend({speed:function(a,b,c){var e=a&&typeof a==="object"?d.extend({},a):{complete:c||!c&&b||d.isFunction(a)&&a,duration:a,easing:c&&b||b&&!d.isFunction(b)&&b};e.duration=d.fx.off?0:typeof e.duration==="number"?e.duration:e.duration in d.fx.speeds?d.fx.speeds[e.duration]:d.fx.speeds._default,e.old=e.complete,e.complete=function(){e.queue!==!1&&d(this).dequeue(),d.isFunction(e.old)&&e.old.call(this)};return e},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig||(b.orig={})}}),d.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(d.fx.step[this.prop]||d.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=d.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,b,c){function g(a){return e.step(a)}var e=this,f=d.fx;this.startTime=d.now(),this.start=a,this.end=b,this.unit=c||this.unit||(d.cssNumber[this.prop]?"":"px"),this.now=this.start,this.pos=this.state=0,g.elem=this.elem,g()&&d.timers.push(g)&&!ca&&(ca=setInterval(f.tick,f.interval))},show:function(){this.options.orig[this.prop]=d.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),d(this.elem).show()},hide:function(){this.options.orig[this.prop]=d.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=d.now(),c=!0;if(a||b>=this.options.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),this.options.curAnim[this.prop]=!0;for(var e in this.options.curAnim)this.options.curAnim[e]!==!0&&(c=!1);if(c){if(this.options.overflow!=null&&!d.support.shrinkWrapBlocks){var f=this.elem,g=this.options;d.each(["","X","Y"],function(a,b){f.style["overflow"+b]=g.overflow[a]})}this.options.hide&&d(this.elem).hide();if(this.options.hide||this.options.show)for(var h in this.options.curAnim)d.style(this.elem,h,this.options.orig[h]);this.options.complete.call(this.elem)}return!1}var i=b-this.startTime;this.state=i/this.options.duration;var j=this.options.specialEasing&&this.options.specialEasing[this.prop],k=this.options.easing||(d.easing.swing?"swing":"linear");this.pos=d.easing[j||k](this.state,i,0,1,this.options.duration),this.now=this.start+(this.end-this.start)*this.pos,this.update();return!0}},d.extend(d.fx,{tick:function(){var a=d.timers;for(var b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||d.fx.stop()},interval:13,stop:function(){clearInterval(ca),ca=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){d.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),d.expr&&d.expr.filters&&(d.expr.filters.animated=function(a){return d.grep(d.timers,function(b){return a===b.elem}).length});var ce=/^t(?:able|d|h)$/i,cf=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?d.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){d.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return d.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(e){}var f=b.ownerDocument,g=f.documentElement;if(!c||!d.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=f.body,i=cg(f),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||d.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||d.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:d.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){d.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return d.offset.bodyOffset(b);d.offset.initialize();var c,e=b.offsetParent,f=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(d.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===e&&(l+=b.offsetTop,m+=b.offsetLeft,d.offset.doesNotAddBorder&&(!d.offset.doesAddBorderForTableAndCells||!ce.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),f=e,e=b.offsetParent),d.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;d.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},d.offset={initialize:function(){var a=c.body,b=c.createElement("div"),e,f,g,h,i=parseFloat(d.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";d.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),e=b.firstChild,f=e.firstChild,h=e.nextSibling.firstChild.firstChild,this.doesNotAddBorder=f.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,f.style.position="fixed",f.style.top="20px",this.supportsFixedPosition=f.offsetTop===20||f.offsetTop===15,f.style.position=f.style.top="",e.style.overflow="hidden",e.style.position="relative",this.subtractsBorderForOverflowNotVisible=f.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),a=b=e=f=g=h=null,d.offset.initialize=d.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;d.offset.initialize(),d.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(d.css(a,"marginTop"))||0,c+=parseFloat(d.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var e=d.css(a,"position");e==="static"&&(a.style.position="relative");var f=d(a),g=f.offset(),h=d.css(a,"top"),i=d.css(a,"left"),j=e==="absolute"&&d.inArray("auto",[h,i])>-1,k={},l={},m,n;j&&(l=f.position()),m=j?l.top:parseInt(h,10)||0,n=j?l.left:parseInt(i,10)||0,d.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):f.css(k)}},d.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),e=cf.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(d.css(a,"marginTop"))||0,c.left-=parseFloat(d.css(a,"marginLeft"))||0,e.top+=parseFloat(d.css(b[0],"borderTopWidth"))||0,e.left+=parseFloat(d.css(b[0],"borderLeftWidth"))||0;return{top:c.top-e.top,left:c.left-e.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&(!cf.test(a.nodeName)&&d.css(a,"position")==="static"))a=a.offsetParent;return a})}}),d.each(["Left","Top"],function(a,c){var e="scroll"+c;d.fn[e]=function(c){var f=this[0],g;if(!f)return null;if(c!==b)return this.each(function(){g=cg(this),g?g.scrollTo(a?d(g).scrollLeft():c,a?c:d(g).scrollTop()):this[e]=c});g=cg(f);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:d.support.boxModel&&g.document.documentElement[e]||g.document.body[e]:f[e]}}),d.each(["Height","Width"],function(a,c){var e=c.toLowerCase();d.fn["inner"+c]=function(){return this[0]?parseFloat(d.css(this[0],e,"padding")):null},d.fn["outer"+c]=function(a){return this[0]?parseFloat(d.css(this[0],e,a?"margin":"border")):null},d.fn[e]=function(a){var f=this[0];if(!f)return a==null?null:this;if(d.isFunction(a))return this.each(function(b){var c=d(this);c[e](a.call(this,b,c[e]()))});if(d.isWindow(f)){var g=f.document.documentElement["client"+c];return f.document.compatMode==="CSS1Compat"&&g||f.document.body["client"+c]||g}if(f.nodeType===9)return Math.max(f.documentElement["client"+c],f.body["scroll"+c],f.documentElement["scroll"+c],f.body["offset"+c],f.documentElement["offset"+c]);if(a===b){var h=d.css(f,e),i=parseFloat(h);return d.isNaN(i)?h:i}return this.css(e,typeof a==="string"?a:a+"px")}}),a.jQuery=a.$=d})(window);


jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

//Begin
//ҳ�涥�������û���¼���Ĳ�ͬ״̬����ʾ��ͬ��Ϣ����ִ�в�ͬ����
//�����ߣ�����

var topshopnum = 0;
//��ȡurl��ַ��ָ���Ĳ���
var searchurl = location.href;
searchurl += searchurl.indexOf("?") != -1 ? "" : "?";
function getUrl(name) {//��ȡurl��ַ��������ֵ
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //����һ������Ŀ�������������ʽ
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null; //���ز���ֵ
}
$(document).ready(function () {
    //    if (getUrl("Keys") != null) {
    //        $("#Keys").val(getUrl("Keys"));
    //    }
    if (getUrl("CId") != null) {
        var CIdvalue = $("#catelistname").find("a[class=" + getUrl("CId") + "]").text();
        $("#cateName").text(CIdvalue);
    }
    $.ajax({
        url: "http://login.yoybuy.com/jsonpislogged",
        dataType: "jsonp",
        cache: false,
        data: {},
        success: function (data) {
            if (data.result == true) {
                $("#username").html("Welcome,<a href='http://customercenter.yoybuy.com/en/userindex.html'>" + data.username + "</a>");
                //$("#useryoybuy").html("<a href='http://customercenter.yoybuy.com/en/userindex.html'>My Yoybuy</a>");
                $("#regOrSignOut").html("<div ><a href='javascript:void(0)' onclick='SignOut()' >Sign Out</a><div>");
            }
            else {
                if (data.username == null || data.username == "") {
                    $("#username").html("<a href='http://login.yoybuy.com/en/login'> Sign In</a>");
                    //$("#useryoybuy").html("<a href='http://customercenter.yoybuy.com/en/userindex.html'>My Yoybuy</a>");
                    $("#regOrSignOut").html("<a href='http://login.yoybuy.com/en/Register'>Register</a>");
                }
                else {
                    $("#username").html("Welcome," + data.username + "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href='http://login.yoybuy.com/en/login'>Sign In</a>");
                    //$("#useryoybuy").html("<a href='http://customercenter.yoybuy.com/en/userindex.html'>My Yoybuy</a>");
                    $("#regOrSignOut").html("<a href='http://login.yoybuy.com/en/Register'>Register</a>");
                }
            }
        }
    });
    $.ajax({
        url: "http://shoppingcart.yoybuy.com/shoppingcart/GetGoodsCost",
        dataType: "jsonp",
        cache: false,
        success: function (data) {
            if (data.result == true) {
                $("#goodsNum").html("<b>Cart: </b>" + data.data + " item(s)");
                topshopnum = data.data;
            }
            else {
            }
        }
    });
});
function GetNoteValueByRow(row, note) {
    if (row == "") {
        return "";
    }
    var list = row.split(':');

    for (var i = 0; i < list.length; i++) {
        if ($.trim(list[i].split('=')[0]) == note) {
            return list[i].split('=')[1];
        }
    }
}
function SignOut() {
    $.ajax({
        url: "http://login.yoybuy.com/jsonpsignout",
        dataType: "jsonp",
        cache: false,
        data: {},
        success: function (data) {
            if (data.result == true) {
                $("#username").html("<a href='http://login.yoybuy.com/en/login'>Sign In</a>");
                //$("#useryoybuy").html("<a href='http://login.yoybuy.com/en/login'>My Yoybuy</a>");
                $("#regOrSignOut").html("<a href='http://login.yoybuy.com/en/Register'>Register</a>");
                window.location.href = 'http://www.yoybuy.com/en';
            }
            else {
                alert("Sorry!System busy.Please try again later.");
            }
        }
    });
}
////End

function doSetFocus(curId, setValue) {
    var curValue = window.document.getElementById(curId).value;
    if (setValue == curValue) { window.document.getElementById(curId).value = ""; }
    if (curValue == "") { window.document.getElementById(curId).value = setValue; }
}

function GetNoteValueByRow(row, note) {
    if (row == "") {
        return "";
    }

    var list = row.split(':');

    for (var i = 0; i < list.length; i++) {
        if ($.trim(list[i].split('=')[0]) == note) {
            return list[i].split('=')[1];
        }
    }
}
var selectvalue = 0;
$(document).ready(function () {

    $("#CategoriesTB").hover(function () {
        $("#CateUl").show();
    });
});

function Hide(divId) {
    selectstatus = 1;
    $("#" + divId).slideUp();
}
function vod() {
    return;
}
$(function () {
    $("#CurPage").keyup(function () {
        var reg = /^[0-9]*$/;
        if (!reg.test($(this).val())) {
            $(this).val("1");
        }
    });
    $("#ShopingArea").hover(function () {
        var href = window.location.href;
        if ($.trim(href.toLowerCase()) == "http://shoppingcart.yoybuy.com/" || $.trim(href.toLowerCase()) == "http://shoppingcart.yoybuy.com/shoppingcart/index" || $.trim(href.toLowerCase()) == "http://shoppingcart.yoybuy.com/en/shoppingcart.html") {
        }
        else {
            $("#ShopingCart").show();
            GetTopFourGoods();
        }


    }, function () { $("#ShopingCart").hide(); });
    $("span[id^='DelShopingGood_']").live("click", function () {
        var goodsId = $(this).attr("id").split('_')[1];
        var UserId = $(this).attr("id").split('_')[2] == "" ? 0 : $(this).attr("id").split('_')[2];

        $.ajax({
            url: "http://shoppingcart.yoybuy.com/shoppingcart/DeleteRecentlyViewedGoods",
            cache: false,
            dataType: "jsonp",
            data: { "goodsId": goodsId, "UserId": UserId },
            success: function (data) {
                if (data.result) {
                    $("#goodsItem_" + goodsId).remove();
                    flag = 0;
                    topshopnum = topshopnum - 1;
                    GetTopFourGoods();
                    alert("Deleted successful!");
                }
                else {
                    alert("Delete failed!");
                }
            }
        });
    });
});
var flag = 0;
function GetTopFourGoods() {

    if (parseInt(flag, 10) == 0) {

        flag = 1;

        $("#ShopingCart").html("<div style='text-align:center; width:100%;line-height:30px;float:left;margin-top:5px;'><img src='http://www.yoybuy.com/Content/images/head/loadingb.gif' /></div>");

        $.ajax({
            url: 'http://shoppingcart.yoybuy.com/shoppingcart/GetRecentlyViewedGoods',
            dataType: "jsonp",
            cache: false,
            success: function (data) {
                if (data.result) {
                    $("#goodsNum").html("<b>Cart: </b>" + topshopnum + " item(s)");
                    $("#ShopingCart").html(data.data);
                }
                else {
                    $("#ShopingCart").html("<div style='text-align:center; width:100%;line-height:30px;margin-top:5px'>The shopping cart is empty.</div><b><a href='http://shoppingcart.yoybuy.com/en/shoppingcart.html' style=\"color:#1F8AEA\">View Shopping Cart &gt;&gt;</a></b>");
                }
            }
        });
    }
}
//��ʽ��С�������������롣�磺FormatNum(100.12345678,4)
function FormatNum(Num1, Num2) {
    if (isNaN(Num1) || isNaN(Num2)) {
        return (0);
    } else {
        Num1 = Num1.toString();
        Num2 = parseInt(Num2);
        if (Num1.indexOf('.') == -1) {
            return (Num1);
        } else {
            var b = Num1.substring(0, Num1.indexOf('.') + Num2 + 1);
            var c = Num1.substring(Num1.indexOf('.') + Num2 + 1, Num1.indexOf('.') + Num2 + 2);
            //alert(b);
            //alert(c);
            if (c == "") {
                return (b);
            } else {
                if (parseInt(c) < 5) {
                    return (b);
                } else {
                    return ((Math.round(parseFloat(b) * Math.pow(10, Num2)) + Math.round(parseFloat(Math.pow(0.1, Num2).toString().substring(0, Math.pow(0.1, Num2).toString().indexOf('.') + Num2 + 1)) * Math.pow(10, Num2))) / Math.pow(10, Num2));
                }
            }
        }
    }
}
function CNYtoUSDConstr(CNY) {
    return CNY / 6.25;
}
var headdata = {
    menudrp: function (object, classname) {
        $(object).attr("class", classname);
        $(object).find("[name=head-menulist]").hide();
    },
    menudown: function (object, classname) {
        $(object).attr("class", classname);
        GetTopFourGoods();
        $(object).find("[name=head-menulist]").show();
    }
}
function keys() {
    var eTop = $("#Keys").offset().top;
    var eLeft = $("#Keys").offset().left;
    eTop = eTop + 30;
    if ($("#Keys").val() != "") {
        $.ajax({
            url: "http://www.yoybuy.com/en/TaobaoShop/GetList",
            dataType: "jsonp",
            cache: false,
            data: { keys: $("#Keys").val() },
            success: function (data) {
                if (data.Result != "") {
                    $("#uMess").html("");
                    var datalist = eval(data.Result);

                    for (var i = 0; i < datalist.length; i++) {
                        $("#uMess").append("<li><a>" + datalist[i].keywords + "</a></li>");
                    }
                    $("#SelectDiv").css({ "position": "absolute" }).animate({ left: eLeft, top: eTop, opacity: "show" }, 1);
                    $("#uMess li").live("click", function () {
                        $("#Keys").val($(this).text());
                        submitSearch();
                        $("#SelectDiv").hide();
                    });
                }
            }
        });
    } else {
        $("#uMess").html("");
        $("#SelectDiv").hide();
    }
}
function getkeys() {
    $.ajax({
        url: "http://www.yoybuy.com/en/TaobaoShop/GetKeys",
        dataType: "jsonp",
        cache: false,
        success: function (data) {
            if (data.Result != "") {
                $("#hotkeys").html(data.Result);
            }
        }
    });
}
function GetCateId(cateId, object) {
    var cateName = $(object).text();
    $("#cateName").text(cateName);
    $("#CateID").val(cateId);
    $(object).parent().parent().hide();
    submitSearch();
}
function submitSearch() {
    var keysvalue = $.trim($("#Keys").val());
    var CId = $("#CateID").val();
    keysvalue = keysvalue.replace(/(^\s*)|(\s*$)/g, "");
    var keyval = "Please enter keywords";
    keyval = keyval.replace(/(^\s*)|(\s*$)/g, "");

    if (keysvalue.indexOf(keyval) >= 0 && CId == 0) {
        alert("Please enter keywords & URL!");
    } else if (keysvalue.indexOf(keyval) < 0 && CId != 0) {
        location.href = "http://www.yoybuy.com/en/product/search?CId=" + CId + "&Keys=" + encodeURIComponent($("#Keys").val());
    } else if (keysvalue.indexOf(keyval) < 0) {
        location.href = "http://www.yoybuy.com/en/product/search?keyword=" + encodeURIComponent($("#Keys").val());
    } else if (CId != 0) {
        location.href = "http://www.yoybuy.com/en/product/search?CId=" + CId;
    }
}
function rightkeys(object) {
    var keyvalue = $(object).text();
    if (keyvalue != "") {
        $("#Keys").val(keyvalue);
        window.location.href = "//www.yoybuy.com/en/product/search?CId=0&keyword=" + keyvalue;
    }
}
function getFocus(object) {
    var keyvalue = $(object).val();
}
function onblur(object) {
    var keyvalue = $(object).val();
}
function goTopEx() {//���ض���
    var n = 0;
    var obj = document.getElementById("AdLayer");
    if (!obj) { return false; }
    var x = 0;
    var fe = $("#AdLayer");
    window.onscroll = function () {
        obj.style.top = (document.body.scrollTop || document.documentElement.scrollTop) + n + 'px';
        x = (document.body.scrollTop || document.documentElement.scrollTop) + n;
        if (x == 0) {
            fe.fadeOut().hide();
        } else {
            fe.fadeIn().show();
        };
    };
    window.onresize = function () { obj.style.top = (document.body.scrollTop || document.documentElement.scrollTop) + n + 'px'; };
}


function Common100Position() {

    var iTop = (window.screen.availHeight - 30 - 543) / 2;
    var iLeft = (document.body.scrollWidth - 555) / 2;
    var iHeight = 543;
    var iWidth = 555;
    var newin = window.open('http://www.yoybuy.com/home/submitticket', 'dbdetails', 'height=' + iHeight + ',width=' + iWidth + ',top=' + iTop + ',left=' + iLeft + 'scrollbars=yes');
    if (newin != null) {
        newin.focus();

    }
}

$(document).ready(function () {
    $("#Comm100Div").html(" <a title=\"Live Chat\" href=\"http://www.comm100.com/livechat\" target=\"_blank\" onclick=\"comm100_137448.openChatWindow(event,448,-1);return false;\"><img alt=\"Live Chat\" style=\"border: 0px\" id=\"comm100_ButtonImage\" src=\"https://chatserver.comm100.com/BBS.aspx?siteId=137448&amp;planId=448&amp;partnerId=-1\"></img></a><script src=\"https://chatserver.comm100.com/js/LiveChat.js?siteId=137448&amp;planId=448&amp;partnerId=-1\" type=\"text/javascript\"></script>");
    var datamenu = $("[name=head-menu]");
    datamenu.mouseleave(function () {
        headdata.menudrp(this, "");
    });
    datamenu.mouseenter(function () {
        headdata.menudown(this, "helpmenu");
    });
    var toolmenu = $("[name=Tool-menu]");
    toolmenu.mouseleave(function () {
        headdata.menudrp(this, "");
    });
    toolmenu.mouseenter(function () {
        headdata.menudown(this, "toolmenu");
    });

    var accountmenu = $("div[name='headaccountMenu']");
    accountmenu.mouseleave(function () {
        headdata.menudrp(this, "acunt");
    });
    accountmenu.mouseenter(function () {
        headdata.menudown(this, "acunt acuntmove");
    });

    var cartmenu = $("div[name='headCartMenu']");
    var href = window.location.href;
    cartmenu.mouseleave(function () {
        headdata.menudrp(this, "acunt cart");
    });
    cartmenu.mouseenter(function () {
        if ($.trim(href.toLowerCase()) == "http://shoppingcart.yoybuy.com/" || $.trim(href.toLowerCase()) == "http://shoppingcart.yoybuy.com/shoppingcart/index" || $.trim(href.toLowerCase()) == "http://shoppingcart.yoybuy.com/en/shoppingcart.html") {
        } else {
            headdata.menudown(this, "acunt cart movecart");
        }
    });

    $("#catemenudrop").mouseleave(function () {
        $(this).find("dd").hide();
    });
    $("#catemenudrop").mouseenter(function () {
        $(this).find("dd").show();
    });
    $("#leftmenu").mouseleave(function () {
        $(this).find("div[name='menulest']").hide();
        $(this).find("li[name=menu]").mouseleave(function () {
            $(this).find("ul[class='fltc']").hide();
        });
    });
    $("#leftmenu").mouseenter(function () {
        $(this).find("div[name='menulest']").show();
        $(this).find("li[name=menu]").mouseenter(function () {
            $(this).find("ul[name='sonmenu']").show();

            $(this).attr("class", "flmove");
            $(this).find("a:first").attr("class", "subdj");
            $(this).find("a:first").width(187);
            $(this).find("img").remove();
        });
        $(this).find("li[name=menu]").mouseleave(function () {
            $(this).find("ul[name='sonmenu']").hide();

            $(this).attr("class", "flname");
            $(this).find("a:first").attr("class", "");
            $(this).find("a:first").width(165);
            //$(this).find("span").append("<img src=\"../../Content/Images/Index/xy.png\" width=\"12\" height=\"12\" alt=\"\" />");
        });
    });
    var hrefvalue = $("#NavigationArea").html();
    if (hrefvalue != null) {
        $("#NavigationDiv").html(hrefvalue);
    }
    getkeys(); //��ȡ�ؼ���
    goTopEx(); //���ض���js
});

function InitLanguageSelect(lang,href) {

    if (lang != null && lang != "") {
        $("#langSelect option[value=" + lang + "]").attr("selected", "selected");
        switch (lang) {
            case "en":
                $("#webhelp").html("Help");
                break;
            case "es":
                $("#webhelp").html("Ayuda");
                break;
            case "ru":
                $("#webhelp").html("Помощь");
                break;
            default:
        }
    }

    $("#langSelect").change(
        function () {
            location.href = "/" + $(this).val() + href;
        }
    );
}


/*
 * jScroller2 1.5 - Scroller Script
 *
 * Copyright (c) 2008 Markus Bordihn (markusbordihn.de)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2008-06-12 18:00:00 +0100 (Sat, 12 July 2008) $
 * $Rev: 1.5 $
 */
 
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('k={1Y:{2f:"25 1X",1O:1.5,24:"22 1W (1U://1N.1J)",2d:"2c 27 26"},m:[],t:{19:17,1z:1V,z:\'1S\',Z:0,1d:0},1r:D(){v a=29.1D(\'1C\'),i;M(i=0;i<a.F;i++){v b=a[i].V.S(\' \'),q=18;l(k.C(b,k.t.z+\'B\')){q=\'B\'}E l(k.C(b,k.t.z+\'T\')){q=\'T\'}E l(k.C(b,k.t.z+\'r\')){q=\'r\'}E l(k.C(b,k.t.z+\'Q\')){q=\'Q\'}l(q){k.1w(a[i],q)}}l(!k.19){l(k.m.F>0){k.Y();l(k.t.Z){M(i=0;i<k.m.F;i++){l(k.m[i][11]>0){K.1L("k.Z("+k.m[i][11]+",0)",k.m[i][11])}}}l(k.t.1d===0){k.N(K,\'1K\',k.1f);k.N(K,\'1I\',k.Y);k.N(K,\'1H\',k.Y);k.N(K,\'1G\',k.Y)}}}},1w:D(a,b){v i,1c=17;l(a&&b){l(k.m.F>0){M(i=0;i<k.m.F;i++){l(k.m[i][2]===a){k.m[i][8]=b;1c=1F}}}}E{1c=1F}l(!1c){v c=0,p=1,U=0,x=0,X=0,o=a,O=o.V.S(\' \'),y=a.1m,w=18,1l=18,1b=18,1k=D(e){k.1j(e,0)},1i=D(e){k.1j(e,1)};l(y.V.1a(\'23\')>=0){y=y.1m}l(y){y.n.1h=\'21\';y.n.20=\'1Z\';v d=y.1D(\'1C\');M(i=0;i<d.F;i++){v f=d[i].V.S(\' \');l(k.C(f,k.t.z+b+\'1B\')){w=d[i]}}l(o){o.n.1h=\'1A\';o.n.R=o.n.r=0;W(b){s"B":o.n.R=(o.L*-1)+y.L+\'u\';A;s"Q":o.n.r=(o.I*-1)+y.I+\'u\';A}W(b){s"B":s"T":o.n.1y=y.I+\'u\';A;s"Q":s"r":o.n.1x=y.L+\'u\';A}l(w){w.n.1h=\'1A\';1l=w.I;1b=w.L;W(b){s"B":w.n.R=1b*-1+\'u\';A;s"T":w.n.R=o.L+\'u\';A;s"r":w.n.r=o.I+\'u\';A;s"Q":w.n.r=o.I*-1+\'u\';A}W(b){s"B":s"T":w.n.r=0;w.n.1y=y.I+\'u\';A;s"r":s"Q":w.n.R=0;w.n.1x=y.L+\'u\';A}}}l(k.C(O,k.t.z+\'p-\',1)){p=14(k.C(O,k.t.z+\'p-\',1)||10)/10;l(K.1e&&p<1){p=1}}l(k.C(O,k.t.z+\'1T\')){k.t.1d=1}l(k.C(O,k.t.z+\'x\')){x=1}l(k.C(O,k.t.z+\'X\')){X=1}l(k.C(O,k.t.z+\'16-\',1)){U=1;k.t.Z=1;c=k.C(O,k.t.z+\'16-\',1)*1R}l(k.C(O,k.t.z+\'1v\')){k.N(o,\'1u\',1i);k.N(o,\'1t\',1k);l(w){k.N(w,\'1u\',1i);k.N(w,\'1t\',1k)}}k.m.1M([y.L,y.I,o,o.L,o.I,w,1b,1l,b,p,U,c,x,X])}}},1P:D(a){l(a){M(v i=0;i<k.m.F;i++){l(k.m[i][2]===a){k.m.1Q(i,1)}}l(k.m.F<=0){k.1f()}}},1s:D(){M(v i=0;i<k.m.F;i++){v a=k.m[i][0],H=k.m[i][1],o=k.m[i][2],G=k.m[i][3],J=k.m[i][4],P=k.m[i][5],1o=k.m[i][6],1g=k.m[i][7],q=k.m[i][8],p=k.m[i][9],U=k.m[i][10],16=k.m[i][11],x=k.m[i][12],X=k.m[i][13];l(!U&&!16){l(X){G=k.m[i][3]=o.L;J=k.m[i][4]=o.I;l(P){1o=k.m[i][6]=P.L;1g=k.m[i][7]=P.I}}W(q){s\'B\':s\'T\':v b=14(o.n.R.S(\'u\')[0]);b=(x===2)?((q===\'B\')?b-p:b+p):((q===\'B\')?b+p:b-p);l(P&&!x){b=k.1q(q,\'R\',b,P,G,a,1o,p,x)}E{l(x){l(x===((q===\'B\')?1:2)&&((G>a&&b+p>0)||(G<a&&b+G+p>a))){k.m[i][12]=((q===\'B\')?2:1)}l(x===((q===\'B\')?2:1)&&((G>a&&b+G<a+p)||(G<a&&b<0))){k.m[i][12]=((q===\'B\')?1:2)}}E{l(q===\'B\'){l(b>H){b=(G)*-1}}E{l(b<G*-1){b=a}}}}o.n.R=b+\'u\';A;s\'r\':s\'Q\':v c=14(o.n.r.S(\'u\')[0]);c=(x===2)?((q===\'r\')?c+p:c-p):(q===\'r\')?c-p:c+p;l(P&&!x){c=k.1q(q,\'r\',c,P,J,H,1g,p,x)}E{l(x){l(x===((q===\'r\')?2:1)&&((J>H&&c+p>0)||(J<H&&c+J+p>H))){k.m[i][12]=((q===\'r\')?1:2)}l(x===((q===\'r\')?1:2)&&((J>H&&c+J<H+p)||(J<H&&c-p<0))){k.m[i][12]=((q===\'r\')?2:1)}}E{l(q===\'r\'){l(c<J*-1){c=H}}E{l(c>H){c=(J)*-1}}}}o.n.r=c+\'u\';A}}}},1q:D(a,b,c,d,e,f,g,h,i){v j;W(a){s\'B\':s\'Q\':j=14(d.n[b].S(\'u\')[0])+h;l(c>0&&c<=f){d.n[b]=c-g+\'u\'}l(j+g>=f&&j<=f+h){d.n[b]=j+\'u\';c=j+e*-1}1p c;s\'T\':s\'r\':j=14(d.n[b].S(\'u\')[0])-h;l(c+e<=f){d.n[b]=c+e+\'u\'}l(j+g<=f&&j+g+h>=0){d.n[b]=j+\'u\';c=j+g}1p c}},Y:D(e){l(!k.15){k.19=k.15=K.2b(k.1s,k.t.1z)}},1f:D(e){l(k.15){K.2a(k.15);k.19=k.15=17}},1j:D(e,a){l(e.1n||e.1E){v b=e.1n?e.1n:e.1E;M(v i=0;i<5;i++){l(b.V.1a(k.t.z+\'1v\')<0&&b.V.1a(\'1B\')<0){b=b.1m}E{A}}k.U(b,a)}},Z:D(a){l(a>0){M(v i=0;i<k.m.F;i++){l(a===k.m[i][11]){k.m[i][10]=k.m[i][11]=0}}}},U:D(a,b){l(a&&b>=0){M(v i=0;i<k.m.F;i++){l(a===k.m[i][2]||a===k.m[i][5]){k.m[i][10]=b}}}},C:D(a,b,c){v d=\'\';l(a&&b){M(v i=0;i<a.F;i++){l(c&&a[i].1a(b)>=0){d=a[i].S(b)[1];A}E l(a[i]===b){d=a[i];A}}}1p d},N:D(a,b,c){l(a&&b&&c){l(K.1e){a.1e("28"+b,c)}E{a.2e(b,c,17)}}}};k.N(K,\'2g\',k.1r);',62,141,'||||||||||||||||||||ByRei_jScroller2|if|obj|style|child_div|speed|direction|left|case|cache|px|var|child_endless|alternate|parent_div|prefix|break|down|check_array|function|else|length|child_div_height|parent_div_width|clientWidth|child_div_width|window|clientHeight|for|set_eventListener|child_div_classNames|endless_div|right|top|split|up|pause|className|switch|dynamic|start|delayer|||||parseFloat|timer|delay|false|null|active|indexOf|child_endless_Height|error|ileave|attachEvent|stop|endless_div_width|position|func_stop|start_stop|func_start|child_endless_Width|parentNode|target|endless_div_height|return|check_endless|init|scroller|mouseout|mouseover|mousemove|add|height|width|refreshtime|absolute|_endless|div|getElementsByTagName|srcElement|true|scroll|resize|focus|de|blur|setTimeout|push|markusbordihn|Version|remove|splice|1000|jscroller2_|ignoreleave|http|150|Bordihn|jScroller2|info|hidden|overflow|relative|Markus|jscroller2|Author|ByRei|Autoscroller|Generation|on|document|clearInterval|setInterval|Next|Description|addEventListener|Name|load'.split('|'),0,{}))

/* (c) 2008, 2009, 2010 Add This, LLC */
if(!window._ate){var _atd="www.addthis.com/",_atr="//s7.addthis.com/",_atn="//l.addthiscdn.com/",_euc=encodeURIComponent,_duc=decodeURIComponent,_atc={dr:0,ver:250,loc:0,enote:"",cwait:500,bamp:0.25,camp:1,damp:1,famp:0.02,pamp:0.2,tamp:1,vamp:1,ltj:1,xamp:0.5,abf:!!window.addthis_do_ab,ufc:1};(function(){var l;try{l=window.location;if(l.protocol.indexOf("file")===0||l.protocol.indexOf("safari-extension")===0||l.protocol.indexOf("chrome-extension")===0){_atr="http:"+_atr;}if(l.hostname.indexOf("localhost")!=-1){_atc.loc=1;}}catch(e){}var ua=navigator.userAgent.toLowerCase(),d=document,w=window,dl=d.location,b={win:/windows/.test(ua),xp:(/windows nt 5.1/.test(ua))||(/windows nt 5.2/.test(ua)),osx:/os x/.test(ua),chr:/chrome/.test(ua),iph:/iphone/.test(ua),dro:/android/.test(ua),ipa:/ipad/.test(ua),saf:/safari/.test(ua),opr:/opera/.test(ua),msi:(/msie/.test(ua))&&!(/opera/.test(ua)),ffx:/firefox/.test(ua),ff2:/firefox\/2/.test(ua),ffn:/firefox\/((3.[6789][0-9a-z]*)|(4.[0-9a-z]*))/.test(ua),ie6:/msie 6.0/.test(ua),ie7:/msie 7.0/.test(ua),ie8:/msie 8.0/.test(ua),ie9:/msie 9.0/.test(ua),mod:-1},_7={rev:"100141",bro:b,wlp:(l||{}).protocol,dl:dl,upm:!!w.postMessage&&(""+w.postMessage).toLowerCase().indexOf("[native code]")!==-1,bamp:_atc.bamp-Math.random(),camp:_atc.camp-Math.random(),xamp:_atc.xamp-Math.random(),vamp:_atc.vamp-Math.random(),tamp:_atc.tamp-Math.random(),pamp:_atc.pamp-Math.random(),ab:"-",inst:1,wait:500,tmo:null,sub:!!window.at_sub,dbm:0,uid:null,spt:"static/r07/widget31.png",api:{},imgz:[],hash:window.location.hash};d.ce=d.createElement;d.gn=d.getElementsByTagName;window._ate=_7;_7.evl=function(_8,_9){return eval(_8);};var _a=function(o,fn,_d,_e){if(!o){return _d;}if(o instanceof Array||(o.length&&(typeof o!=="function"))){for(var i=0,len=o.length,v=o[0];i<len;v=o[++i]){_d=fn.call(_e||o,_d,v,i,o);}}else{for(var _12 in o){_d=fn.call(_e||o,_d,o[_12],_12,o);}}return _d;},_13=Array.prototype.slice,_14=function(a){return _13.apply(a,_13.call(arguments,1));},_16=function(s){return(""+s).replace(/(^\s+|\s+$)/g,"");},_18=function(A,B){return _a(_14(arguments,1),function(A,_1c){return _a(_1c,function(o,v,k){if(o){o[k]=v;}return o;},A);},A);},_20=function(o,del){return _a(o,function(acc,v,k){k=_16(k);if(k){acc.push(_euc(k)+"="+_euc(_16((typeof(v)=="object"?_20(v):(v)))));}return acc;},[]).join(del||"&");},_26=function(o,del){return _a(o,function(acc,v,k){k=_16(k);if(k){acc.push(_euc(k)+"="+_euc(_16(v)));}return acc;},[]).join(del||"&");},_2c=function(q,del){return _a((q||"").split(del||"&"),function(acc,_30){try{var kv=_30.split("="),k=_16(_duc(kv[0])),v=_16(_duc(kv.slice(1).join("=")));if(v.indexOf(del||"&")>-1){v=_2c(del||"&");}if(k){acc[k]=v;}}catch(e){}return acc;},{});},_34=function(q,del){return _a((q||"").split(del||"&"),function(acc,_38){try{var kv=_38.split("="),k=_16(_duc(kv[0])),v=_16(_duc(kv.slice(1).join("=")));if(k){acc[k]=v;}}catch(e){}return acc;},{});},_3c=function(){var _3d=_14(arguments,0),fn=_3d.shift(),_3f=_3d.shift();return function(){return fn.apply(_3f,_3d.concat(_14(arguments,0)));};},_40=function(un,obj,evt,fn){if(!obj){return;}if(we){obj[(un?"detach":"attach")+"Event"]("on"+evt,fn);}else{obj[(un?"remove":"add")+"EventListener"](evt,fn,false);}},_45=function(obj,evt,fn){_40(0,obj,evt,fn);},_49=function(obj,evt,fn){_40(1,obj,evt,fn);},_4d={reduce:_a,slice:_14,strip:_16,extend:_18,toKV:_26,rtoKV:_20,fromKV:_34,rfromKV:_2c,bind:_3c,listen:_45,unlisten:_49};_7.util=_4d;_18(_7,_4d);(function(_4e,_4f,env){var _51,u=_4e.util;function PolyEvent(_53,_54,_55,_56,_57){this.type=_53;this.triggerType=_54||_53;this.target=_55||_56;this.triggerTarget=_56||_55;this.data=_57||{};}u.extend(PolyEvent.prototype,{constructor:PolyEvent,bubbles:false,preventDefault:u.noop,stopPropagation:u.noop,clone:function(){return new this.constructor(this.type,this.triggerType,this.target,this.triggerTarget,u.extend({},this.data));}});function EventDispatcher(_58,_59){this.target=_58;this.queues={};this.defaultEventType=_59||PolyEvent;}function getQueue(evt){var Qs=this.queues;if(!Qs[evt]){Qs[evt]=[];}return Qs[evt];}function addEventListener(evt,fn){this.getQueue(evt).push(fn);}function removeEventListener(evt,fn){var q=this.getQueue(evt),idx=q.indexOf(fn);if(idx!==-1){q.splice(idx,1);}}function fire(_62,_63,_64,_65){var _66=this;if(!_65){setTimeout(function(){_66.dispatchEvent(new _66.defaultEventType(_62,_62,_63,_66.target,_64));},10);}else{_66.dispatchEvent(new _66.defaultEventType(_62,_62,_63,_66.target,_64));}}function dispatchEvent(evt){for(var i=0,_69=evt.target,q=this.getQueue(evt.type),L=q.length;i<L;i++){q[i].call(_69,evt.clone());}}function decorate(_6c){if(!_6c){return;}for(var k in _6e){_6c[k]=u.bind(_6e[k],this);}return _6c;}var _6e={constructor:EventDispatcher,getQueue:getQueue,addEventListener:addEventListener,removeEventListener:removeEventListener,dispatchEvent:dispatchEvent,fire:fire,decorate:decorate};u.extend(EventDispatcher.prototype,_6e);_4e.event={PolyEvent:PolyEvent,EventDispatcher:EventDispatcher};})(_7,_7.api,_7);_7.ed=new _7.event.EventDispatcher(_7);var _6f={isBound:0,isReady:0,readyList:[],onReady:function(){if(!_6f.isReady){_6f.isReady=1;var l=_6f.readyList.concat(window.addthis_onload||[]);for(var fn=0;fn<l.length;fn++){l[fn].call(window);}_6f.readyList=[];}},addLoad:function(_72){var o=w.onload;if(typeof w.onload!="function"){w.onload=_72;}else{w.onload=function(){if(o){o();}_72();};}},bindReady:function(){if(r.isBound||_atc.xol){return;}r.isBound=1;if(d.addEventListener&&!b.opr){d.addEventListener("DOMContentLoaded",r.onReady,false);}var apc=window.addthis_product;if(apc&&apc.indexOf("f")>-1){r.onReady();return;}if(b.msi&&!b.ie9&&window==top){(function(){if(r.isReady){return;}try{d.documentElement.doScroll("left");}catch(error){setTimeout(arguments.callee,0);return;}r.onReady();})();}if(b.opr){d.addEventListener("DOMContentLoaded",function(){if(r.isReady){return;}for(var i=0;i<d.styleSheets.length;i++){if(d.styleSheets[i].disabled){setTimeout(arguments.callee,0);return;}}r.onReady();},false);}if(b.saf){var _76;(function(){if(r.isReady){return;}if(d.readyState!="loaded"&&d.readyState!="complete"){setTimeout(arguments.callee,0);return;}if(_76===undefined){var _78=d.gn("link");for(var i=0;i<_78.length;i++){if(_78[i].getAttribute("rel")=="stylesheet"){_76++;}}var _7a=d.gn("style");_76+=_7a.length;}if(d.styleSheets.length!=_76){setTimeout(arguments.callee,0);return;}r.onReady();})();}r.addLoad(r.onReady);},append:function(fn,_7c){r.bindReady();if(r.isReady){fn.call(window,[]);}else{r.readyList.push(function(){return fn.call(window,[]);});}}},r=_6f,a=_7;_18(_7,{plo:[],lad:function(x){_7.plo.push(x);}});(function(_7f,_80,env){var w=window;_7f.pub=function(){return _euc((window.addthis_config||{}).pubid||(window.addthis_config||{}).username||window.addthis_pub||"");};_7f.usu=function(url,f){if(!w.addthis_share){w.addthis_share={};}if(f||url!=addthis_share.url){addthis_share.imp_url=0;}};_7f.rsu=function(){var d=document,dt=d.title,du=d.location?d.location.href:"";if(_atc.ver>=250&&addthis_share.imp_url&&du&&du!=w.addthis_share.url&&!(_7.util.ivc((d.location.hash||"").substr(1).split(",").shift()))){w.addthis_share.url=w.addthis_url=du;w.addthis_share.title=w.addthis_title=dt;return 1;}return 0;};_7f.igv=function(u,t){if(!w.addthis_config){w.addthis_config={username:w.addthis_pub};}else{if(addthis_config.data_use_cookies===false){_atc.xck=1;}}if(!w.addthis_share){w.addthis_share={};}if(!addthis_share.url){if(!w.addthis_url&&addthis_share.imp_url===undefined){addthis_share.imp_url=1;}addthis_share.url=(w.addthis_url||u||"").split("#{").shift();}if(!addthis_share.title){addthis_share.title=(w.addthis_title||t||"").split("#{").shift();}};if(!_atc.ost){if(!w.addthis_conf){w.addthis_conf={};}for(var i in addthis_conf){_atc[i]=addthis_conf[i];}_atc.ost=1;}})(_7,_7.api,_7);(function(_8b,_8c,env){var _8e,d=document,u=_8b.util;_8b.ckv=u.fromKV(d.cookie,";");function read(k){return u.fromKV(d.cookie,";")[k];}if(!_8b.cookie){_8b.cookie={};}_8b.cookie.rck=read;})(_7,_7.api,_7);(function(_91,_92,env){var _94,d=document,_95=0,u=_91.util;function canWeWrite(){if(_95){return 1;}set("xtc",1);if(1==_91.cookie.rck("xtc")){_95=1;}kill("xtc",1);return _95;}function checkForGovSite(_97){if(_atc.xck){return;}var h=_97||_7.dh||_7.du||(_7.dl?_7.dl.hostname:"");if(h.indexOf(".gov")>-1||h.indexOf(".mil")>-1){_atc.xck=1;}var p=typeof(_91.pub)==="function"?_91.pub():_91.pub,x=["usarmymedia","govdelivery"];for(i in x){if(p==x[i]){_atc.xck=1;break;}}}function kill(k,ud){if(d.cookie){d.cookie=k+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/"+(ud?"; domain="+(_91.bro.msi?"":".")+"addthis.com":"");}}function set(u,v,s,nd,_a1){checkForGovSite();if(!_atc.xck){if(!_a1){var _a1=new Date();_a1.setYear(_a1.getFullYear()+2);}document.cookie=u+"="+v+(!s?"; expires="+_a1.toUTCString():"")+"; path=/;"+(!nd?" domain="+(_91.bro.msi?"":".")+"addthis.com":"");}}if(!_91.cookie){_91.cookie={};}_91.cookie.sck=set;_91.cookie.kck=kill;_91.cookie.cww=canWeWrite;_91.cookie.gov=checkForGovSite;})(_7,_7.api,_7);(function(_a2,_a3,env){function getUniqueBits(){var ua=munge(navigator.userAgent,16),up=((new Date()).getTimezoneOffset())+""+navigator.javaEnabled()+(navigator.userLanguage||navigator.language),up2=window.screen.colorDepth+""+window.screen.width+window.screen.height+window.screen.availWidth+window.screen.availHeight,_a8=navigator.plugins,_a9=_a8.length;if(_a9>0){for(var i=0;i<Math.min(10,_a9);i++){if(i<5){up+=_a8[i].name+_a8[i].description;}else{up2+=_a8[i].name+_a8[i].description;}}}return ua.substr(0,2)+munge(up,16).substr(0,3)+munge(up2,16).substr(0,3);}function munge(s,_ac){var mv=291;if(s){for(var i=0;i<s.length;i++){mv=(mv*(s.charCodeAt(i)+i)+3)&1048575;}}return(mv&16777215).toString(_ac||32);}_a2.mun=munge;_a2.gub=getUniqueBits;})(_7,_7.api,_7);(function(_af,_b0,env){var _b2,u=_af.util,max=4294967295,_b5=new Date().getTime();function generateCuid(){return((_b5/1000)&max).toString(16)+("00000000"+(Math.floor(Math.random()*(max+1))).toString(16)).slice(-8);}function getDateFromCuid(_b6){return isValidCuid(_b6)?(new Date((parseInt(_b6.substr(0,8),16)*1000))):new Date();}function isCuidInFuture(_b7){var d=getDateFromCuid();return((d.getTime()-1000*86400)>(new Date()).getTime());}function isCuidOlderThan(_b9,_ba){var d=getDateFromCuid(_b9);return(((new Date()).getTime()-d.getTime())>_ba*1000);}function isValidCuid(_bc){return _bc&&_bc.match(/^[0-9a-f]{16}$/)&&!isCuidInFuture(_bc);}u.cuid=generateCuid;u.ivc=isValidCuid;u.ioc=isCuidOlderThan;})(_7,_7.api,_7);(function(_bd,_be,env){function getHashParams(s,qs){var q=s.indexOf("#")>-1&&!qs?s.replace(/^[^\#]+\#?/,""):s.replace(/^[^\?]+\??/,""),p=_bd.util.fromKV(q);return p;}function getScriptParams(_c4){var ss=document.gn("script"),_c6=ss.length,s=ss[_c6-1],p=getHashParams(s.src);if(_c4||(s.src&&s.src.indexOf("addthis")==-1)){for(var i=0;i<_c6;i++){if((ss[i].src||"").indexOf(_c4||"addthis.com")>-1){p=getHashParams(ss[i].src);break;}}}return p;}if(!_bd.util){_bd.util={};}_bd.util.gsp=getScriptParams;_bd.util.ghp=getHashParams;})(_7,_7.api,_7);(function(_ca,_cb,env){var u=_ca.util,_ce="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";function hexToBase64(_cf){var _d0="",_d1,_d2,_d3,_d4,_d5,i=0;if(/[0-9a-fA-F]+/.test(_cf)){while(i<_cf.length){_d1=parseInt(_cf.charAt(i++),16);_d2=parseInt(_cf.charAt(i++),16);_d3=parseInt(_cf.charAt(i++),16);_d4=(_d1<<2)|(isNaN(_d3)?_d2&3:(_d2>>2));_d5=((_d2&3)<<4)|_d3;_d0+=_ce.charAt(_d4)+(isNaN(_d3)?"":_ce.charAt(_d5));}}else{}return _d0;}function base64ToHex(_d7){var _d8="",_d9,_da,_db,_dc,_dd,i=0;while(i<_d7.length){_dc=_ce.indexOf(_d7.charAt(i++));_dd=i>=_d7.length?NaN:_ce.indexOf(_d7.charAt(i++));_d9=_dc>>2;_da=isNaN(_dd)?(_dc&3):(((_dc&3)<<2)|(_dd>>4));_db=_dd&15;_d8+=_d9.toString(16)+_da.toString(16)+(isNaN(_dd)?"":_db.toString(16));}return _d8;}u.hbtoa=hexToBase64;u.atohb=base64ToHex;})(_7,_7.api,_7);(function(_df,_e0,env){var a=_df,_e3=new Date().getTime(),ran=function(){return Math.floor(Math.random()*4294967295).toString(36);},off=function(){return Math.floor((new Date().getTime()-_e3)/100).toString(16);},sid=0,_e7=function(f){if(sid===0){a.sid=sid=(f||a.util.cuid());}return sid;},_e9=null,sxm=function(b,xmi){if(_e9!==null){clearTimeout(_e9);}if(b){_e9=setTimeout(function(){xmi(false);},_7.wait);}},fcv=function(k,v){return _euc(k)+"="+_euc(v)+";"+off();},seq=1,_f1=function(url,f){var u=(url||"").split("?"),url=u.shift(),_f5=(u.pop()||"").split("&");return f(url,_f5);},_f6=function(url,_f8,_f9,svc){if(!_f8){_f8={};}if(!_f8.remove){_f8.remove=[];}_f8.remove.push("sms_ss");_f8.remove.push("at_xt");_f8.remove.push("fb_ref");_f8.remove.push("fb_source");if(_f8.remove){url=_fb(url,_f8.remove);}if(_f8.clean){url=_fc(url);}if(_f8.defrag){url=_fd(url);}if(_f8.add){url=_fe(url,_f8.add,_f9,svc);}return url;},_fe=function(url,_100,_101,_102){var _103={};if(_100){for(var k in _100){if(url.indexOf(k+"=")>-1){continue;}_103[k]=_105(_100[k],url,_101,_102);}_100=_7.util.toKV(_103);}return url+(_100.length?((url.indexOf("?")>-1?"&":"?")+_100):"");},_105=function(s,url,_108,_109){var _108=_108||addthis_share;return s.replace(/{{service}}/g,_euc(_109||"")).replace(/{{code}}/g,_euc(_109||"")).replace(/{{title}}/g,_euc(_108.title)).replace(/{{url}}/g,_euc(url));},_fb=function(url,_10b){var _10c={},_10b=_10b||[];for(var i=0;i<_10b.length;i++){_10c[_10b[i]]=1;}return _f1(url,function(url,_10f){var _110=[];if(_10f){for(var i in _10f){if(typeof(_10f[i])=="string"){var kv=(_10f[i]||"").split("=");if(kv.length!=2&&_10f[i]){_110.push(_10f[i]);}else{if(_10c[kv[0]]){continue;}else{if(_10f[i]){_110.push(_10f[i]);}}}}}url+=(_110.length?("?"+_110.join("&")):"");}return url;});},_113=function(url){var frag=url.split("#").pop().split(",").shift().split("=").pop();if(_7.util.ivc(frag)){return url.split("#").pop().split(",");}return[""];},_fd=function(url){var frag=_113(url).shift().split("=").pop();if(_7.util.ivc(frag)){return url.split("#").shift();}else{frag=url.split("#").slice(1).join("#");if(frag.length==12&&frag.substr(0,1)=="."&&/[a-zA-Z0-9\-_]{11}/.test(frag.substr(1))){return url.split("#").shift();}}return url;},_fc=function(url){return _f1(url,function(url,_11a){var jidx=url.indexOf(";jsessionid"),_11c=[];if(jidx>-1){url=url.substr(0,jidx);}if(_11a){for(var i in _11a){if(typeof(_11a[i])=="string"){var kv=(_11a[i]||"").split("=");if(kv.length==2){if(kv[0].indexOf("utm_")===0||kv[0]=="gclid"||kv[0]=="sms_ss"||kv[0]=="at_xt"||kv[0]=="fb_ref"||kv[0]=="fb_source"){continue;}}if(_11a[i]){_11c.push(_11a[i]);}}}url+=(_11c.length?("?"+_11c.join("&")):"");}return url;});},sta=function(){var pub=(typeof(a.pub||"")=="function"?a.pub():a.pub)||"unknown";return"AT-"+pub+"/-/"+a.ab+"/"+_e7()+"/"+(seq++)+(a.uid!==null?"/"+a.uid:"");};if(!_7.track){_7.track={};}_df.util.extend(_7.track,{fcv:fcv,ran:ran,rup:_fb,aup:_fe,cof:_fd,gof:_113,clu:_fc,mgu:_f6,ssid:_e7,sta:sta,sxm:sxm});})(_7,_7.api,_7);(function(_121,_122,env){var _124=".",_125=_124.length,_126=0,_127={wpp:1,blg:1};function extractOurParameters(dl,dr){if(!dl){dl=document.location;}if(!dr){dr=d.referer||d.referrer||"";}var rxi,rsi,rsiq,rsc,fuid,_12f=0,du=dl?dl.href:"",_131=(du||"").split("#").shift(),hash=(du||"").split("#").pop(),_133=_7.util.ghp(du,1),_134=_7.util.ghp(du);_12f=0,at_st=_134.at_st,rsc=_133.sms_ss,fb_ref=_133.fb_ref,at_xt=_133.at_xt,q_at_st=_133.at_st;if(fb_ref){var _135=fb_ref.split("=").pop().split("_");if(_135.length==2&&_7.util.ivc(_135[0])){at_xt=_135.join(",");rsc="facebook_like";}}if(!at_st){if(hash.length==(11+_125)&&(hash.substr(0,_125)==_124)&&/[a-zA-Z0-9\-_]{11}/.test(hash.substr(_125))){var key=_7.util.atohb(hash.substr(_125));fuid=key.substr(8,8);at_st=key.substr(0,8)+"00000000,";at_st+=parseInt(key.substr(16),10);}}at_st=at_st&&_7.util.ivc(at_st.split(",").shift())?at_st:"";if(at_st){_12f=parseInt(at_st.split(",").pop())+1;rsi=at_st.split(",").shift();}else{if(du.indexOf(_atd+"book")==-1&&_131!=dr){var cvt=[],sm;if(at_xt){sm=at_xt.split(",");rxi=_duc(sm.shift());if(rxi.indexOf(",")>-1){sm=rxi.split(",");rxi=sm.shift();}}else{if(q_at_st){sm=q_at_st.split(",");rsiq=_duc(sm.shift());if(rsiq.indexOf(",")>-1){sm=rsiq.split(",");rsiq=sm.shift();}}}if(sm&&sm.length){_12f=Math.min(3,parseInt(sm.pop())+1);}}}if(!_7.util.ivc(rsi)){rsi=null;}if(!_7.util.ivc(rsiq)){rsiq=null;}return{rsi:rsi,rsiq:rsiq,fuid:fuid,rxi:rxi,rsc:rsc,gen:_12f};}function clickTrackableProduct(_139,_13a){if(!_13a||(_13a.data_track_clickback!==false&&_13a.data_track_linkback!==false)){if(_126){return true;}_139=(_139||window.addthis_product||"").split(",");for(var i=0;i<_139.length;i++){if(_127[_139[i].split("-").shift()]){return(_126=true);}}}return false;}_7.extend(_7.track,{cpf:_124,ctp:clickTrackableProduct,eop:extractOurParameters});})(_7,_7.api,_7);(function(){var d=document,a=_7,cvt=[],avt=null,qtp=[],xtp=function(){var p;while(p=qtp.pop()){trk(p);}},pcs=[],spc=null,apc=function(c){c=c.split("-").shift();for(var i=0;i<pcs.length;i++){if(pcs[i]==c){return;}}pcs.push(c);},gat=function(){},atf=null,_14a=function(){var div=d.getElementById("_atssh");if(!div){div=d.ce("div");div.style.visibility="hidden";div.id="_atssh";a.opp(div.style);d.body.insertBefore(div,d.body.firstChild);}return div;},ctf=function(url){var ifr,r=Math.floor(Math.random()*1000),div=_14a();if(!a.bro.msi){ifr=d.ce("iframe");ifr.id="_atssh"+r;ifr.title="AddThis utility frame";}else{if(a.bro.ie6&&!url&&d.location.protocol.indexOf("https")==0){url="javascript:''";}div.innerHTML="<iframe id=\"_atssh"+r+"\" width=\"1\" height=\"1\" title=\"AddThis utility frame\" name=\"_atssh"+r+"\" "+(url?"src=\""+url+"\"":"")+">";ifr=d.getElementById("_atssh"+r);}a.opp(ifr.style);ifr.frameborder=ifr.style.border=0;ifr.style.top=ifr.style.left=0;return ifr;},_150=function(e){var _152=300;if(e&&e.data&&e.data.service){if(a.dcp>=_152){return;}trk({gen:_152,sh:e.data.service});a.dcp=_152;}},_153=function(evt){var t={},data=evt.data||{},svc=data.svc,pco=data.pco,_159=data.cmo,_15a=data.crs,_15b=data.cso;if(svc){t.sh=svc;}if(_159){t.cm=_159;}if(_15b){t.cs=1;}if(_15a){t.cr=1;}if(pco){t.spc=pco;}img("sh","3",null,t);},trk=function(t){var dr=a.dr,rev=(a.rev||"");if(!t){return;}t.xck=_atc.xck?1:0;t.xxl=1;t.sid=a.track.ssid();t.pub=a.pub();t.ssl=a.ssl||0;t.du=a.tru(a.du||a.dl.href);if(a.dt){t.dt=a.dt;}if(a.cb){t.cb=a.cb;}t.lng=a.lng();t.ver=_atc.ver;if(!a.upm&&a.uid){t.uid=a.uid;}t.pc=t.spc||pcs.join(",");if(dr){t.dr=a.tru(dr);}if(a.dh){t.dh=a.dh;}if(rev){t.rev=rev;}if(a.xfr){if(a.upm){if(atf){atf.contentWindow.postMessage(_26(t),"*");}}else{var div=_14a(),base="static/r07/sh43.html"+(false?"?t="+new Date().getTime():"");if(atf){div.removeChild(div.firstChild);}atf=ctf();atf.src=_atr+base+"#"+_26(t);div.appendChild(atf);}}else{qtp.push(t);}},img=function(i,c,x,obj,_166){if(!window.at_sub&&!_atc.xtr){var t=obj||{};t.evt=i;if(x){t.ext=x;}avt=t;if(_166===1){xmi(true);}else{a.track.sxm(true,xmi);}}},cev=function(k,v){cvt.push(a.track.fcv(k,v));a.track.sxm(true,xmi);},xmi=function(_16c){var h=a.dl?a.dl.hostname:"";if(cvt.length>0||avt){a.track.sxm(false,xmi);if(_atc.xtr){return;}var t=avt||{};t.ce=cvt.join(",");cvt=[];avt=null;trk(t);if(_16c){var i=d.ce("iframe");i.id="_atf";_7.opp(i.style);d.body.appendChild(i);i=d.getElementById("_atf");}}};a.ed.addEventListener("addthis-internal.compact",_153);a.ed.addEventListener("addthis.menu.share",_150);if(!a.track){a.track={};}a.util.extend(a.track,{pcs:pcs,apc:apc,cev:cev,ctf:ctf,gtf:_14a,qtp:function(p){qtp.push(p);},stf:function(f){atf=f;},trk:trk,xtp:xtp});})();_18(_7,{_rec:[],xfr:!_7.upm||!_7.bro.ffx,pmh:function(e){if(e.origin.slice(-12)==".addthis.com"){if(!e.data){return;}var data=_34(e.data),r=_7._rec;for(var n=0;n<r.length;n++){r[n](data);}}}});_18(_7,{lng:function(){return window.addthis_language||(window.addthis_config||{}).ui_language||(_7.bro.msi?navigator.userLanguage:navigator.language)||"en";},iwb:function(l){var wd={th:1,pl:1,sl:1,gl:1,hu:1,is:1,nb:1,se:1,su:1,sw:1};return!!wd[l];},gfl:function(l){var map={ca:"es",cs:"CZ",cy:"GB",da:"DK",de:"DE",eu:"ES",ck:"US",en:"US",es:"LA",fb:"FI",gl:"ES",ja:"JP",ko:"KR",nb:"NO",nn:"NO",sv:"SE",ku:"TR",zh:"CN","zh-tr":"CN","zh-hk":"HK","zh-tw":"TW",fo:"FO",fb:"LT",af:"ZA",sq:"AL",hy:"AM",be:"BY",bn:"IN",bs:"BA",nl:"NL",et:"EE",fr:"FR",ka:"GE",el:"GR",gu:"IN",hi:"IN",ga:"IE",jv:"ID",kn:"IN",kk:"KZ",la:"VA",li:"NL",ms:"MY",mr:"IN",ne:"NP",pa:"IN",pt:"PT",rm:"CH",sa:"IN",sr:"RS",sw:"KE",tl:"PH",ta:"IN",pl:"PL",tt:"RU",te:"IN",ml:"IN",uk:"UA",vi:"VN",tr:"TR",xh:"ZA",zu:"ZA",km:"KH",tg:"TJ",he:"IL",ur:"PK",fa:"IR",yi:"DE",gn:"PY",qu:"PE",ay:"BO",se:"NO",ps:"AF",tl:"ST"},rv=map[l]||map[l.split("-").shift()];if(rv){return l.split("-").shift()+"_"+rv;}else{return"en_US";}},ivl:function(l){var lg={af:1,afr:"af",ar:1,ara:"ar",az:1,aze:"az",be:1,bye:"be",bg:1,bul:"bg",bn:1,ben:"bn",bs:1,bos:"bs",ca:1,cat:"ca",cs:1,ces:"cs",cze:"cs",cy:1,cym:"cy",da:1,dan:"da",de:1,deu:"de",ger:"de",el:1,gre:"el",ell:"ell",en:1,eo:1,es:1,esl:"es",spa:"spa",et:1,est:"et",eu:1,fa:1,fas:"fa",per:"fa",fi:1,fin:"fi",fo:1,fao:"fo",fr:1,fra:"fr",fre:"fr",ga:1,gae:"ga",gdh:"ga",gl:1,glg:"gl",gu:1,he:1,heb:"he",hi:1,hin:"hin",hr:1,ht:1,cro:"hr",hu:1,hun:"hu",id:1,ind:"id",is:1,ice:"is",it:1,ita:"it",ja:1,jpn:"ja",ko:1,kor:"ko",ku:1,lb:1,ltz:"lb",lt:1,lit:"lt",lv:1,lav:"lv",mk:1,mac:"mk",mak:"mk",ml:1,mn:1,ms:1,msa:"ms",may:"ms",nb:1,nl:1,nla:"nl",dut:"nl",no:1,nds:1,nn:1,nno:"no",oc:1,oci:"oc",pl:1,pol:"pl",ps:1,pt:1,por:"pt",ro:1,ron:"ro",rum:"ro",ru:1,rus:"ru",sk:1,slk:"sk",slo:"sk",sl:1,slv:"sl",sq:1,alb:"sq",sr:1,se:1,si:1,ser:"sr",su:1,sv:1,sve:"sv",sw:1,swe:"sv",ta:1,tam:"ta",te:1,teg:"te",th:1,tha:"th",tl:1,tgl:"tl",tn:1,tr:1,tur:"tr",tt:1,uk:1,ukr:"uk",ur:1,urd:"ur",vi:1,vec:1,vie:"vi","zh-hk":1,"chi-hk":"zh-hk","zho-hk":"zh-hk","zh-tr":1,"chi-tr":"zh-tr","zho-tr":"zh-tr","zh-tw":1,"chi-tw":"zh-tw","zho-tw":"zh-tw",zh:1,chi:"zh",zho:"zh"};if(lg[l]){return lg[l];}l=l.split("-").shift();if(lg[l]){if(lg[l]===1){return l;}else{return lg[l];}}return 0;},gvl:function(l){var rv=_7.ivl(l)||"en";if(rv===1){rv=l;}return rv;},alg:function(al,f){var l=_7.gvl((al||_7.lng()).toLowerCase());if(l.indexOf("en")!==0&&(!_7.pll||f)){_7.pll=_7.ajs("static/r07/lang10/"+l+".js");}}});_18(_7,{trim:function(s,e){try{s=s.replace(/^[\s\u3000]+|[\s\u3000]+$/g,"");if(e){s=_euc(s);}}catch(e){}return s||"";},trl:[],tru:function(u,k){var rv="",_186=0,_187=-1;if(u){rv=u.substr(0,300);if(rv!==u){if((_187=rv.lastIndexOf("%"))>=rv.length-4){rv=rv.substr(0,_187);}if(rv!=u){for(var i in _7.trl){if(_7.trl[i]==k){_186=1;}}if(!_186){_7.trl.push(k);}}}}return rv;},opp:function(st){st.width=st.height="1px";st.position="absolute";st.zIndex=100000;},jlr:{},ajs:function(name,_18b){if(!_7.jlr[name]){var o=d.ce("script"),head=d.gn("head")[0]||d.documentElement;o.setAttribute("type","text/javascript");o.src=(_18b?"":_atr)+name;head.insertBefore(o,head.firstChild);_7.jlr[name]=1;return o;}return 1;},jlo:function(){try{var a=_7,al=a.lng(),aig=function(src){var img=new Image();_7.imgz.push(img);img.src=src;};a.alg(al);if(!a.pld){if(a.bro.ie6){aig(_atr+a.spt);aig(_atr+"static/t00/logo1414.gif");aig(_atr+"static/t00/logo88.gif");if(window.addthis_feed){aig("static/r05/feed00.gif",1);}}if(a.pll&&!window.addthis_translations){setTimeout(function(){a.pld=a.ajs("static/r07/menu75.js");},10);}else{a.pld=a.ajs("static/r07/menu75.js");}}}catch(e){}},ao:function(elt,pane,iurl,_196,_197,_198){_7.lad(["open",elt,pane,iurl,_196,_197,_198]);_7.jlo();return false;},ac:function(){},as:function(s,cf,sh){_7.lad(["send",s,cf,sh]);_7.jlo();}});(function(_19c,_19d,env){var d=document,_1a0=1,_1a1=["cbea","kkk","zvys","phz"],i=_1a1.length,_1a3={};function rot(s){return s.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});}while(i--){_1a3[rot(_1a1[i])]=1;}function classifyString(s){var c=0;if(!s||typeof(s)!="string"){return c;}s=((s||"").toLowerCase()+"").replace(/[^a-zA-Z]/g," ").split(" ");for(var i=0,_1a9=s.length;i<_1a9;i++){if(_1a3[s[i]]){c|=_1a0;return c;}}return c;}function classify(){var _1aa=(w.addthis_title||d.title),_1ab=classifyString(_1aa),_1ac=d.all?d.all.tags("META"):d.getElementsByTagName?d.getElementsByTagName("META"):new Array(),j=(_1ac||"").length;if(_1ac&&j){while(j--){var m=_1ac[j]||{},n=(m.name||"").toLowerCase(),c=m.content;if(n=="description"||n=="keywords"){_1ab|=classifyString(c);}}}return _1ab;}if(!_19c.ad){_19c.ad={};}_7.extend(_19c.ad,{cla:classify});})(_7,_7.api,_7);(function(_1b1,_1b2,env){var _1b4,d=document,u=_1b1.util,_1b6=_1b1.event.EventDispatcher,_1b7=25,_1b8=[];function ApiQueueFactory(name,fn,cxt){var _1bc=[];function _1bc(){_1bc.push(arguments);}function ready(){cxt[name]=fn;while(_1bc.length){fn.apply(cxt,_1bc.shift());}}_1bc.ready=ready;return _1bc;}function monitor(_1bd){if(_1bd&&_1bd instanceof Resource){_1b8.push(_1bd);}for(var i=0;i<_1b8.length;){var _1bf=_1b8[i];if(_1bf&&_1bf.test()){_1b8.splice(i,1);Resource.fire("load",_1bf,{resource:_1bf});}else{i++;}}if(_1b8.length){setTimeout(monitor,_1b7);}}function Resource(id,url,test){var self=this,hub=new _1b6(self);hub.decorate(hub).decorate(self);this.ready=false;this.loading=false;this.id=id;this.url=url;if(typeof(test)==="function"){this.test=test;}else{this.test=function(){return(!!_window[test]);};}Resource.addEventListener("load",function(evt){var r=evt.resource;if(!r||r.id!==self.id){return;}self.loading=false;self.ready=true;hub.fire(evt.type,r,{resource:r});});}u.extend(Resource.prototype,{load:function(){if(!this.loading){var l;if(this.url.substr(this.url.length-4)==".css"){var head=(d.gn("head")[0]||d.documentElement);l=d.ce("link");l.rel="stylesheet";l.type="text/css";l.href=this.url;l.media="all";head.insertBefore(l,head.firstChild);}else{l=_7.ajs(this.url,1);}this.loading=true;Resource.monitor(this);return l;}else{return 1;}}});var _1c9=new _1b6(Resource);_1c9.decorate(_1c9).decorate(Resource);u.extend(Resource,{known:{},loading:_1b8,monitor:monitor});_1b1.resource={Resource:Resource,ApiQueueFactory:ApiQueueFactory};})(_7,_7.api,_7);(function(_1ca,_1cb,env){var d=document,a=_1ca,_1ce=function(){var _1cf=d.gn("link"),rv={};for(var i=0;i<_1cf.length;i++){var l=_1cf[i];if(l.href&&l.rel){rv[l.rel]=l.href;}}return rv;},_1d3=_1ce(),_1d4=function(){var p=d.location.protocol;if(p=="file:"){p="http:";}return p+"//"+_atd;},srd=function(){if(a.dr){return"&pre="+_euc(a.track.cof(a.dr));}else{return"";}},_1d7=function(svc,feed,_1da,_1db){return _1d4()+(feed?"feed.php":(svc=="email"&&_atc.ver>=300?"tellfriend.php":"bookmark.php"))+"?v="+(_atc.ver)+"&winname=addthis&"+uadd(svc,feed,_1da,_1db)+srd()+"&tt=0"+(svc==="more"&&a.bro.ipa?"&imore=1":"");},uadd=function(svc,feed,_1df,_1e0){var t=a.trim,d=window,pub=a.pub(),w=window._atw||{},u=(_1df&&_1df.url?_1df.url:(w.share&&w.share.url?w.share.url:(d.addthis_url||d.location.href))),acs,hc=function(s){if(u&&u!=""){var i=u.indexOf("#at"+s);if(i>-1){u=u.substr(0,i);}}};if(!_1e0){_1e0=w.conf||{};}else{for(var k in w.conf){if(!(_1e0[k])){_1e0[k]=w.conf[k];}}}if(!_1df){_1df=w.share||{};}else{for(var k in w.share){if(!(_1df[k])){_1df[k]=w.share[k];}}}if(a.rsu()){_1df.url=window.addthis_url;_1df.title=window.addthis_title;u=_1df.url;}if(!pub||pub=="undefined"){pub="unknown";}acs=_1e0.services_custom;hc("pro");hc("opp");hc("cle");hc("clb");hc("abc");if(u.indexOf("addthis.com/static/r07/ab")>-1){u=u.split("&");for(var i=0;i<u.length;i++){var p=u[i].split("=");if(p.length==2){if(p[0]=="url"){u=p[1];break;}}}}if(acs instanceof Array){for(var i=0;i<acs.length;i++){if(acs[i].code==svc){acs=acs[i];break;}}}var tmp=((_1df.templates&&_1df.templates[svc])?_1df.templates[svc]:""),_1ec=((_1df.modules&&_1df.modules[svc])?_1df.modules[svc]:""),_1ed=_1df.share_url_transforms||_1df.url_transforms||{},_1ee=_1df.track_url_transforms||_1df.url_transforms,_1ef=((_1ed&&_1ed.shorten&&_1df.shorteners)?(typeof(_1ed.shorten)=="string"?_1ed.shorten:(_1ed.shorten[svc]||_1ed.shorten["default"]||"")):""),_1f0="",prc=(_1e0.product||d.addthis_product||("men-"+_atc.ver)),crs=w.crs,_1f3="",_1f4=a.track.gof(u),rsi=_1f4.length==2?_1f4.shift().split("=").pop():"",gen=_1f4.length==2?_1f4.pop():"";if(_1df.email_vars){for(var k in _1df.email_vars){_1f3+=(_1f3==""?"":"&")+_euc(k)+"="+_euc(_1df.email_vars[k]);}}if(a.track.spc&&prc.indexOf(a.track.spc)==-1){prc+=","+a.track.spc;}if(_1ed&&_1ed.shorten&&_1df.shorteners){for(var k in _1df.shorteners){for(var kk in _1df.shorteners[k]){_1f0+=(_1f0.length?"&":"")+_euc(k+"."+kk)+"="+_euc(_1df.shorteners[k][kk]);}}}u=a.track.cof(u);u=a.track.mgu(u,_1ed,_1df,svc);if(_1ee){_1df.trackurl=a.track.mgu(_1df.trackurl||u,_1ee,_1df,svc);}var rv="pub="+pub+"&source="+prc+"&lng="+(a.lng()||"xx")+"&s="+svc+(_1e0.ui_508_compliant?"&u508=1":"")+(feed?"&h1="+t((_1df.feed||_1df.url).replace("feed://",""),1)+"&t1=":"&url="+t(u,1)+"&title=")+t(_1df.title||d.addthis_title,1)+(_atc.ver<200?"&logo="+t(d.addthis_logo,1)+"&logobg="+t(d.addthis_logo_background,1)+"&logocolor="+t(d.addthis_logo_color,1):"")+"&ate="+a.track.sta()+((window.addthis_ssh&&(!crs||addthis_ssh!=crs)&&(addthis_ssh==svc||addthis_ssh.search(new RegExp("(?:^|,)("+svc+")(?:$|,)"))>-1))?"&ips=1":"")+(crs?"&cr="+(svc==crs?1:0):"")+"&uid="+_euc(a.uid&&a.uid!="x"?a.uid:a.util.cuid())+(_1df.email_template?"&email_template="+_euc(_1df.email_template):"")+(_1f3?"&email_vars="+_euc(_1f3):"")+(_1ef?"&shortener="+_euc(typeof(_1ef)=="array"?_1ef.join(","):_1ef):"")+(_1ef&&_1f0?"&"+_1f0:"")+((_1df.passthrough||{})[svc]?"&passthrough="+t((typeof(_1df.passthrough[svc])=="object"?a.util.toKV(_1df.passthrough[svc]):_1df.passthrough[svc]),1):"")+(_1df.description?"&description="+t(_1df.description,1):"")+(_1df.html?"&html="+t(_1df.html,1):(_1df.content?"&html="+t(_1df.content,1):""))+(_1df.trackurl&&_1df.trackurl!=u?"&trackurl="+t(_1df.trackurl,1):"")+(_1df.screenshot?"&screenshot="+t(_1df.screenshot,1):"")+(_1df.swfurl?"&swfurl="+t(_1df.swfurl,1):"")+(a.cb?"&cb="+a.cb:"")+(a.ufbl?"&ufbl=1":"")+(_1df.iframeurl?"&iframeurl="+t(_1df.iframeurl,1):"")+(_1df.width?"&width="+_1df.width:"")+(_1df.height?"&height="+_1df.height:"")+(_1e0.data_track_p32?"&p32="+_1e0.data_track_p32:"")+(_1e0.data_track_clickback||_1e0.data_track_linkback||!pub||pub=="AddThis"||_7.track.ctp(_1e0.product,_1e0)?"&sms_ss=1&at_xt=1":"")+((acs&&acs.url)?"&acn="+_euc(acs.name)+"&acc="+_euc(acs.code)+"&acu="+_euc(acs.url):"")+(a.smd?(a.smd.rxi?"&rxi="+a.smd.rxi:"")+(a.smd.rsi?"&rsi="+a.smd.rsi:"")+(a.smd.gen?"&gen="+a.smd.gen:""):((rsi?"&rsi="+rsi:"")+(gen?"&gen="+gen:"")))+(_1df.xid?"&xid="+t(_1df.xid,1):"")+(tmp?"&template="+t(tmp,1):"")+(_1ec?"&module="+t(_1ec,1):"")+(_1e0.ui_cobrand?"&ui_cobrand="+t(_1e0.ui_cobrand,1):"")+(_1e0.ui_header_color?"&ui_header_color="+t(_1e0.ui_header_color,1):"")+(_1e0.ui_header_background?"&ui_header_background="+t(_1e0.ui_header_background,1):"");return rv;},_1f9=function(_1fa,_1fb){var xid=_1fa.xid||a.util.cuid();if(_1fb.data_track_clickback||_1fb.data_track_linkback||_7.track.ctp(_1fb.product,_1fb)){return"at_xt="+xid+","+((a.smd||{}).gen||0);}else{return"";}},_1fd=function(_1fe,_1ff,_200,_201,_202,_203){var pub=a.pub(),url=_201||_1ff.url||"",xid=_1ff.xid||a.util.cuid();if(url.toLowerCase().indexOf("http%3a%2f%2f")===0){url=_duc(url);}if(_202){var _207={};for(var k in _1ff){_207[k]=_1ff[k];}_207.xid=xid;setTimeout(function(){(new Image()).src=_1d7(_1fe=="twitter"&&_203?"tweet":_1fe,0,_207,_200);},100);}return url+(_200.data_track_clickback||_200.data_track_linkback||!pub||pub=="AddThis"?((url.indexOf("?")>-1)?"&":"?")+("sms_ss="+_1fe)+("&at_xt="+xid+","+((a.smd||{}).gen||0)):"");},_209=function(_20a,_20b,_20c){var _20b=_20b||{},_20d=_20a.share_url_transforms||_20a.url_transforms||{},url=a.track.cof(a.track.mgu(_20a.url,_20d,_20a,"mailto"));return"mailto:?subject="+_euc(_20a.title?_20a.title:url)+"&body="+_euc(_1fd("mailto",_20a,_20b,url,_20c));},_20f=function(_210){return((!_210.templates||!_210.templates.twitter)&&(!a.wlp||a.wlp=="http:"));},_211=function(url,_213,_214,name){var neww=_213||550,newh=_214||450,_218=screen.width,_219=screen.height,_21a=Math.round((_218/2)-(neww/2)),_21b=0,i;if(_219>newh){_21a=Math.round((_219/2)-(newh/2));}w.open(url,name||"addthis_share","left="+_21a+",top="+_21b+",width="+neww+",height="+newh+",personalbar=no,toolbar=no,scrollbars=yes,location=yes,resizable=yes");return false;},_21d=function(s,_21f,_220){w.open(_1d7(s,0,_21f,_220),"addthis_share");return false;},_221=function(svc){var _223={wordpress:1,vk:1};return _223[svc];},_224=function(svc,_226,_227,_228,_229,name){var _22b={wordpress:{width:720,height:570},linkedin:{width:600,height:400},vk:{width:720,height:290},"default":{width:550,height:450}},url=_1d7(svc,0,_226,_227);if(_227.ui_use_same_window){window.location.href=url;}else{_211(url,_228||(_22b[svc]||_22b["default"]).width,_229||(_22b[svc]||_22b["default"]).height,name);}return false;},_22d=function(_22e,_22f,_230,_231){var _232="",_233=_22e.share_url_transforms||_22e.url_transforms||{},_234,url=a.track.cof(a.track.mgu(_22e.url,_233,_22e,"twitter"));if((_22e.passthrough||{}).twitter){if(_22e.passthrough.twitter.text){_234=_22e.title;_22e.title=_22e.passthrough.twitter.text;}_232=a.util.toKV(_22e.passthrough.twitter);}if(_232.indexOf("text=")==-1){_232="text="+_euc(_22e.title)+"&"+_232;}if(_232.indexOf("via=")==-1){_232="via=AddThis&"+_232;}url="http://twitter.com/share?url="+_euc(_1fd("twitter",_22e,_22f,url,1,_230))+"&"+_232;if(_234){_22e.title=_234;}if(_22f.ui_use_same_window||_231){window.location.href=url;}else{_211(url,550,450,"twitter_tweet");}return false;},_236=[],_237=function(svc,feed,_23a,_23b){var url=_1d7(svc,feed,_23a,_23b);_236.push(a.ajs(url,1));},_23d=function(_23e,_23f,_240){return _1d4()+"tellfriend.php?&fromname=aaa&fromemail="+_euc(_23f.from)+"&frommenu=1&tofriend="+_euc(_23f.to)+(_23e.email_template?"&template="+_euc(_23e.email_template):"")+(_23f.vars?"&vars="+_euc(_23f.vars):"")+"&lng="+(a.lng()||"xx")+"&note="+_euc(_23f.note)+"&"+uadd("email",null,null,_240);};_1ca.share={auw:_221,ocw:_211,stw:_224,siw:_21d,pts:_22d,unt:_20f,uadd:uadd,genurl:_1d7,geneurl:_23d,genieu:_209,acb:_1fd,gcp:_1f9,svcurl:_1d4,track:_237,links:_1d3};})(_7,_7.api,_7);var w=window,ac=w.addthis_config||{},css=new _7.resource.Resource("widgetcss",_atr+"static/r07/widget59.css",function(){return true;}),_243=new _7.resource.Resource("widget32css",_atr+"static/r07/widgetbig59.css",function(){return true;});function main(){try{if(_atc.xol&&!_atc.xcs&&ac.ui_use_css!==false){css.load();if(_7.bro.ipa){_243.load();}}var a=_7,msi=a.bro.msi,hp=0,_247=window.addthis_config||{},dt=d.title,dr=(typeof(a.rdr)!=="undefined")?a.rdr:(d.referer||d.referrer||""),du=dl?dl.href:null,dh=dl.hostname,_24c=du,_24d=0,al=(_7.lng().split("-")).shift(),_24f=_7.track.eop(dl,dr),cvt=[],rsiq=_24f.rsiq,rsi=_24f.rsi,rxi=_24f.rxi,rsc=_24f.rsc,gen=_24f.gen,fuid=_24f.fuid,ifr,_258=_atr+"static/r07/sh43.html#",data,_25a=function(){if(!_7.track.pcs.length){_7.track.apc(window.addthis_product||("men-"+_atc.ver));}data.pc=_7.track.pcs.join(",");};if(window.addthis_product){_7.track.apc(addthis_product);if(addthis_product.indexOf("fxe")==-1&&addthis_product.indexOf("bkm")==-1){_7.track.spc=addthis_product;}}var l=_7.share.links.canonical;if(l){if(l.indexOf("http")!==0){_24c=(du||"").split("//").pop().split("/");if(l.indexOf("/")===0){_24c=_24c.shift()+l;}else{_24c.pop();_24c=_24c.join("/")+"/"+l;}_24c=dl.protocol+"//"+_24c;}else{_24c=l;}_7.usu(0,1);}_24c=_24c.split("#{").shift();a.igv(_24c,d.title||"");var _25c=addthis_share.view_url_transforms||addthis_share.track_url_transforms||addthis_share.url_transforms;if(_25c){_24c=_7.track.mgu(_24c,_25c);}if(rsi){rsi=rsi.substr(0,8)+fuid;}a.smd={rsi:rsi,rxi:rxi,gen:gen,rsc:rsc};a.dr=a.tru(dr,"fr");a.du=a.tru(_24c,"fp");a.dt=dt=w.addthis_share.title;a.cb=a.ad.cla();a.dh=dl.hostname;a.ssl=du&&du.indexOf("https")===0?1:0;data={cb:a.cb,ab:a.ab,dh:a.dh,dr:a.dr,du:a.du,dt:dt,inst:a.inst,lng:a.lng(),pc:w.addthis_product||"men",pub:a.pub(),ssl:a.ssl,sid:_7.track.ssid(),srd:_atc.damp,srf:_atc.famp,srp:_atc.pamp,srx:_atc.xamp,ver:_atc.ver,xck:_atc.xck||0};if(a.trl.length){data.trl=a.trl.join(",");}if(a.rev){data.rev=a.rev;}if(_247.data_track_clickback||_247.data_track_linkback||_7.track.ctp(data.pc,_247)){data.ct=a.ct=1;}if(a.prv){data.prv=_26(a.prv);}if(rsc){data.sr=rsc;}if(a.vamp>=0&&!a.sub){if(rsi&&(fuid!=a.gub())){cvt.push(a.track.fcv("plv",Math.round(1/_atc.vamp)));cvt.push(a.track.fcv("rsi",rsi));cvt.push(a.track.fcv("gen",gen));cvt.push(a.track.fcv("abc",1));data.ce=cvt.join(",");_24d="addressbar";}else{if(rxi||rsiq||rsc){cvt.push(a.track.fcv("plv",Math.round(1/_atc.vamp)));if(rsc){cvt.push(a.track.fcv("rsc",rsc));}if(rxi){cvt.push(a.track.fcv("rxi",rxi));}else{if(rsiq){cvt.push(a.track.fcv("rsi",rsiq));}}if(rsiq||rxi){cvt.push(a.track.fcv("gen",gen));}data.ce=cvt.join(",");_24d=rsc||"unknown";}}}if(_24d&&a.bamp>=0){data.clk=1;a.dcp=data.gen=50;_7.ed.fire("addthis.user.clickback",window.addthis||{},{service:_24d});}if(a.upm){data.xd=1;if(_7.bro.ffx){data.xld=1;}}if(window.history&&typeof(history.replaceState)=="function"&&!_7.bro.chr&&(_247.data_track_addressbar||_247.data_track_addressbar_paths)&&((du||"").split("#").shift()!=dr)&&(du.indexOf("#")==-1||rsi)){var path=dl.pathname||"",_25e,_25f=path!="/";if(_247.data_track_addressbar_paths){_25f=0;for(var i=0;i<_247.data_track_addressbar_paths.length;i++){_25e=new RegExp(_247.data_track_addressbar_paths[i].replace(/\*/g,".*")+"$");if(_25e.test(path)){_25f=1;break;}}}if(_25f&&(!rsi||a.util.ioc(rsi,5))){var _261=function(){history.replaceState({d:(new Date()),g:gen},d.title,dl.href.split("#").shift()+"#"+_7.track.cpf+_7.util.hbtoa(_7.track.ssid().substr(0,8)+_7.gub()+Math.min(3,gen)));};_261();}}if(dl.href.indexOf(_atr)==-1&&!a.sub){if(a.upm){if(msi){setTimeout(function(){_25a();ifr=a.track.ctf(_258+_26(data));a.track.stf(ifr);},_7.wait);w.attachEvent("onmessage",a.pmh);}else{ifr=a.track.ctf();w.addEventListener("message",a.pmh,false);}if(_7.bro.ffx){ifr.src=_258;_7.track.qtp(data);}else{if(!msi){setTimeout(function(){_25a();ifr.src=_258+_26(data);},_7.wait);}}}else{ifr=a.track.ctf();setTimeout(function(){_25a();ifr.src=_258+_26(data);},_7.wait);}if(ifr){ifr=a.track.gtf().appendChild(ifr);a.track.stf(ifr);}}if(w.addthis_language||ac.ui_language){a.alg();}if(a.plo.length>0){a.jlo();}}catch(e){window.console&&console.log("lod",e);}}w._ate=a;w._adr=r;a._rec.push(function(data){if(data.sshs){var s=window.addthis_ssh=_duc(data.sshs);a.gssh=1;a._ssh=s.split(",");}if(data.uss){var u=a._uss=_duc(data.uss).split(",");if(window.addthis_ssh){var seen={},u=u.concat(a._ssh),_266=[];for(var i=0;i<u.length;i++){var s=u[i];if(!seen[s]){_266.push(s);}seen[s]=1;}u=_266;}a._ssh=u;window.addthis_ssh=u.join(",");}if(data.ups){var s=data.ups.split(",");a.ups={};for(var i=0;i<s.length;i++){if(s[i]){var o=_34(_duc(s[i]));a.ups[o.name]=o;}}a._ups=a.ups;}if(data.uid){a.uid=data.uid;_7.ed.fire("addthis-internal.data.uid",{},{uid:data.uid});}if(data.dbm){a.dbm=data.dbm;}if(data.rdy){a.xfr=1;a.track.xtp();return;}});try{var _269={},_26a=_7.util.gsp("addthis_widget.js");if(typeof(_26a)=="object"){if(_26a.provider){_269={provider:_7.mun(_26a.provider_code||_26a.provider),auth:_26a.auth||_26a.provider_auth||""};if(_26a.uid||_26a.provider_uid){_269.uid=_7.mun(_26a.uid||_26a.provider_uid);}if(_26a.logout){_269.logout=1;}_7.prv=_269;}if(_26a.pubid||_26a.pub||_26a.username){w.addthis_pub=_duc(_26a.pubid||_26a.pub||_26a.username);}if(w.addthis_pub&&w.addthis_config){w.addthis_config.username=w.addthis_pub;}if(_26a.domready){_atc.dr=1;}if(_26a.onready&&_26a.onready.match(/[a-zA-Z0-9_\.\$]+/)){try{_7.onr=_7.evl(_26a.onready);}catch(e){window.console&&console.log("addthis: onready function ("+_26a.onready+") not defined",e);}}if(_26a.async){_atc.xol=1;}}if((window.addthis_conf||{}).xol){_atc.xol=1;}if(_atc.ver===120){var rc="atb"+_7.util.cuid();d.write("<span id=\""+rc+"\"></span>");_7.igv();_7.lad(["span",rc,addthis_share.url||"[url]",addthis_share.title||"[title]"]);}if(w.addthis_clickout){_7.lad(["cout"]);}if(!_atc.xol&&!_atc.xcs&&ac.ui_use_css!==false){css.load();if(_7.bro.ipa){_243.load();}}}catch(e){if(window.console){console.log("main",e);}}_6f.bindReady();_6f.append(main);})();function addthis_open(){if(typeof iconf=="string"){iconf=null;}return _ate.ao.apply(_ate,arguments);}function addthis_close(){_ate.ac();}function addthis_sendto(){_ate.as.apply(_ate,arguments);return false;}if(_atc.dr){_adr.onReady();}}else{_ate.inst++;}if(_atc.abf){addthis_open(document.getElementById("ab"),"emailab",window.addthis_url||"[URL]",window.addthis_title||"[TITLE]");}if(!window.addthis||window.addthis.nodeType!==undefined){window.addthis=(function(){var e={a1webmarks:"A1&#8209;Webmarks",aim:"AOL Lifestream",amazonwishlist:"Amazon",aolmail:"AOL Mail",aviary:"Aviary Capture",domaintoolswhois:"Whois Lookup",googlebuzz:"Google Buzz",googlereader:"Google Reader",googletranslate:"Google Translate",linkagogo:"Link-a-Gogo",meneame:"Men&eacute;ame",misterwong:"Mister Wong",mailto:"Email App",myaol:"myAOL",myspace:"MySpace",readitlater:"Read It Later",rss:"RSS",stumbleupon:"StumbleUpon",typepad:"TypePad",wordpress:"WordPress",yahoobkm:"Y! Bookmarks",yahoomail:"Y! Mail",youtube:"YouTube"},g=document,c=g.gn("body").item(0),f=_ate.util.bind;function b(d,l){var m;if(window._atw&&_atw.list){m=_atw.list[d]}else{if(e[d]){m=e[d]}else{m=(l?d:(d.substr(0,1).toUpperCase()+d.substr(1)))}}return(m||"").replace(/&nbsp;/g," ")}function i(d,u,s,r,t){u=u.toUpperCase();var p=(d==c&&addthis.cache[u]?addthis.cache[u]:(d||c||g.body).getElementsByTagName(u)),n=[],q,m;if(d==c){addthis.cache[u]=p}if(t){for(q=0;q<p.length;q++){m=p[q];if((m.className||"").indexOf(s)>-1){n.push(m)}}}else{s=s.replace(/\-/g,"\\-");var l=new RegExp("(^|\\s)"+s+(r?"\\w*":"")+"(\\s|$)");for(q=0;q<p.length;q++){m=p[q];if(l.test(m.className)){n.push(m)}}}return(n)}var k=g.getElementsByClassname||i;function j(d){if(typeof d=="string"){var l=d.substr(0,1);if(l=="#"){d=g.getElementById(d.substr(1))}else{if(l=="."){d=k(c,"*",d.substr(1))}else{}}}if(!d){d=[]}else{if(!(d instanceof Array)){d=[d]}}return d}function a(l,d){return function(){addthis.plo.push({call:l,args:arguments,ns:d})}}function h(m){var l=this,d=this.queue=[];this.name=m;this.call=function(){d.push(arguments)};this.call.queuer=this;this.flush=function(p,o){for(var n=0;n<d.length;n++){p.apply(o||l,d[n])}return p}}return{ost:0,cache:{},plo:[],links:[],ems:[],init:_adr.onReady,_Queuer:h,_queueFor:a,_select:j,_gebcn:i,button:a("button"),counter:a("counter"),toolbox:a("toolbox"),update:a("update"),util:{getServiceName:b},addEventListener:f(_ate.ed.addEventListener,_ate.ed),removeEventListener:f(_ate.ed.removeEventListener,_ate.ed)}})()}_adr.append((function(){if(!window.addthis.ost){_ate.extend(C,_ate.api);var W=document,K=undefined,J=window,n=function(d){if(d.indexOf("&")>-1){d=d.replace(/&([aeiou]).+;/g,"$1")}return d},p=function(){return(typeof(window.FB)=="object"&&FB.Event&&typeof(FB.Event.subscribe)=="function")},j=0,U=[],f={},Y={compact:1,expanded:1,facebook:1,email:1,twitter:1,print:1,google:1,live:1,stumbleupon:1,myspace:1,favorites:1,digg:1,delicious:1,blogger:1,googlebuzz:1,friendfeed:1,vk:1,mymailru:1,gmail:1,yahoomail:1,reddit:1,orkut:1},E=new _ate.resource.Resource("widget32css",_atr+"static/r07/widgetbig59.css",function(){return true}),R=false,ab=true,x=J.addthis_config,O=J.addthis_share,F={},A={},t=W.gn("body").item(0),C=window.addthis,c=C._select,z=C._gebcn(t,"A","addthis_button_",true,true),T={rss:"Subscribe via RSS"},S={tweet:"Tweet",email:"Email",mailto:"Email",print:"Print",favorites:"Save to Favorites",twitter:"Tweet This",digg:"Digg This",more:"View more services"},L={email_vars:1,passthrough:1,modules:1,templates:1,services_custom:1},X={feed:1,more:_atc.ver<300,email:1,mailto:1},G={feed:1,email:1,mailto:1,print:1,more:!_ate.bro.ipa&&_atc.ver<300,favorites:1},Q={more:_atc.ver>=300},l=0,H=0,y=0,m=0,M=[],aa={};function e(u,w){if(w&&u!==w){for(var d in w){if(u[d]===K){u[d]=w[d]}}}}function r(ac,u,ad){var w=ac.onclick||function(){},d=function(){_ate.ed.fire("addthis.menu.share",window.addthis||{},{element:ac,service:u,url:ac.share.url})};if(ac.conf.data_ga_tracker||addthis_config.data_ga_tracker||ac.conf.data_ga_property||addthis_config.data_ga_property){ac.onclick=function(){_ate.gat(u,ad,ac.conf,ac.share);d();return w()}}else{ac.onclick=function(){d();return w()}}}function v(u,d){var w={googlebuzz:"http://www.google.com/profiles/%s",youtube:"http://www.youtube.com/user/%s",facebook:"http://www.facebook.com/profile.php?id=%s",facebook_url:"http://www.facebook.com/%s",rss:"%s",flickr:"http://www.flickr.com/photos/%s",twitter:"http://twitter.com/%s",linkedin:"http://www.linkedin.com/in/%s"};if(u=="facebook"&&isNaN(parseInt(d))){u="facebook_url"}return(w[u]||"").replace("%s",d)||""}function q(u,d){if(R&&!d){return true}var w=(u.parentNode||{}).className||"";R=(w.indexOf("32x32")>-1||u.className.indexOf("32x32")>-1);return R}function B(u){var w=(u.parentNode||{}).className||"",d=u.conf&&u.conf.product&&w.indexOf("toolbox")==-1?u.conf.product:"tbx"+(u.className.indexOf("32x32")>-1||w.indexOf("32x32")>-1?"32":"")+"-"+_atc.ver;if(d.indexOf(32)>-1){R=true}_ate.track.apc(d);return d}function h(w,ac){var u={};for(var d in w){if(ac[d]){u[d]=ac[d]}else{u[d]=w[d]}}return u}function b(u,d){var ac={};for(var w=0;w<u.length;w++){ac[u[w]]=1}for(var w=0;w<d.length;w++){if(!ac[d[w]]){u.push(d[w]);ac[d[w]]=1}}return u}function V(d,ad,ae,ac){var u=W.ce("img");u.width=d;u.height=ad;u.border=0;u.alt=ae;u.src=ac;return u}function i(ac,ad){var w,d=[],ae={};for(var u=0;u<ac.attributes.length;u++){w=ac.attributes[u];d=w.name.split(ad+":");if(d.length==2){ae[d.pop()]=w.value}}return ae}function D(u,ag,d,ac){var ag=ag||{},w={},ae=i(u,"addthis");for(var ad in ag){w[ad]=ag[ad]}if(ac){for(var ad in u[d]){w[ad]=u[d][ad]}}for(var ad in ae){if(ag[ad]&&!ac){w[ad]=ag[ad]}else{var ah=ae[ad];if(ah){w[ad]=ah}else{if(ag[ad]){w[ad]=ag[ad]}}if(w[ad]==="true"){w[ad]=true}else{if(w[ad]==="false"){w[ad]=false}}}if(w[ad]!==K&&L[ad]&&(typeof w[ad]=="string")){var af=w[ad];_ate.evl("var e = "+w[ad],this);w[ad]=af}}return w}function I(w){var u=(w||{}).services_custom;if(!u){return}if(!(u instanceof Array)){u=[u]}for(var ac=0;ac<u.length;ac++){var d=u[ac];if(d.name&&d.icon&&d.url){d.code=d.url=d.url.replace(/ /g,"");d.code=d.code.split("//").pop().split("?").shift().split("/").shift().toLowerCase();f[d.code]=d}}}function s(u,d){return f[u]||{}}function a(u,d,w,ac){var ad={conf:d||{},share:w||{}};ad.conf=D(u,d,"conf",ac);ad.share=D(u,w,"share",ac);return ad}function P(au,ag,am,ae){_ate.igv();if(au){ag=ag||{};am=am||{};var av=ag.conf||x,ar=ag.share||O,ad=am.onmouseover,w=am.onmouseout,ax=am.onclick,aj=am.internal,ao=am.singleservice;if(ao){if(ax===K){ax=X[ao]?function(aA,ay,aB){var az=h(aB,A);return addthis_open(aA,ao,az.url,az.title,h(ay,F),az)}:G[ao]?function(aA,ay,aB){var az=h(aB,A);return addthis_sendto(ao,h(ay,F),az)}:Q[ao]?function(aA,ay,aB){var az=h(aB,A);return _ate.share.stw(ao,az,ay,735)}:null}}else{if(!am.noevents){if(!am.nohover){if(ad===K){ad=function(az,ay,aA){return addthis_open(az,"",null,null,h(ay,F),h(aA,A))}}if(w===K){w=function(ay){return addthis_close()}}if(ax===K){ax=function(az,ay,aA){return addthis_sendto("more",h(ay,F),h(aA,A))}}}else{if(ax===K){ax=function(az,ay,aA){return addthis_open(az,"more",null,null,h(ay,F),h(aA,A))}}}}}au=c(au);for(var at=0;at<au.length;at++){var al=au[at],ap=al.parentNode,u=a(al,av,ar,!ae)||{};e(u.conf,x);e(u.share,O);al.conf=u.conf;al.share=u.share;if(al.conf.ui_language){_ate.alg(al.conf.ui_language)}I(al.conf);if(ap&&ap.className.indexOf("toolbox")>-1&&(al.conf.product||"").indexOf("men")===0){al.conf.product="tbx"+(ap.className.indexOf("32x32")>-1?"32":"")+"-"+_atc.ver;_ate.track.apc(al.conf.product)}if(ao&&ao!=="more"){al.conf.product=B(al)}if((!al.conf||(!al.conf.ui_click&&!al.conf.ui_window_panes))&&!_ate.bro.ipa){if(ad){al.onmouseover=function(){return ad(this,this.conf,this.share)}}if(w){al.onmouseout=function(){return w(this)}}if(ax){al.onclick=function(){return ax(al,al.conf,al.share)}}}else{if(ax){if(ao){al.onclick=function(){return ax(this,this.conf,this.share)}}else{if(!al.conf.ui_window_panes){al.onclick=function(){return addthis_open(this,"",null,null,this.conf,this.share)}}else{al.onclick=function(){return addthis_sendto("more",this.conf,this.share)}}}}}if(al.tagName.toLowerCase()=="a"){var ac=al.share.url||addthis_share.url;_ate.usu(ac);if(ao){var ai=s(ao,al.conf),d=al.firstChild;if(ai&&ai.code&&ai.icon){if(d&&d.className.indexOf("at300bs")>-1){var ak="16";if(q(al,1)){d.className=d.className.split("at15nc").join("");ak="32"}d.style.background="url("+ai.icon+") no-repeat top left transparent";if(!d.style.cssText){d.style.cssText=""}d.style.cssText="line-height:"+ak+"px!important;width:"+ak+"px!important;height:"+ak+"px!important;background:"+d.style.background+"!important"}}if(!G[ao]){if(am.follow){al.href=ac;al.onclick=function(){_ate.share.track(ao,1,al.share,al.conf)};if(al.children&&al.children.length==1&&al.parentNode&&al.parentNode.className.indexOf("toolbox")>-1){var aq=W.ce("span");aq.className="addthis_follow_label";aq.innerHTML=C.util.getServiceName(ao);al.appendChild(aq)}}else{if(ao=="twitter"){if(_ate.share.unt(al.share)){al.onclick=function(ay){return _ate.share.pts(al.share,al.conf)};al.noh=1}else{al.onclick=null;al.href=_ate.share.genurl(ao,0,al.share,al.conf);al.noh=0}}else{if(!al.noh){if(al.conf.ui_open_windows||_ate.share.auw(ao)){al.onclick=function(ay){return _ate.share.stw(ao,al.share,al.conf)}}else{al.onclick=function(ay){return _ate.share.siw(ao,al.share,al.conf)};al.href=_ate.share.genurl(ao,0,al.share,al.conf)}}}}r(al,ao,ac);if(!al.target){al.target="_blank"}C.links.push(al)}else{if(ao=="mailto"||(ao=="email"&&(al.conf.ui_use_mailto||_ate.bro.iph||_ate.bro.ipa))){al.onclick=function(){al.share.xid=_ate.util.cuid();(new Image()).src=_ate.share.genurl("mailto",0,al.share,al.config)};al.href=_ate.share.genieu(al.share);r(al,ao,ac);C.ems.push(al)}}if(!al.title||al.at_titled){var ah=C.util.getServiceName(ao,!ai);al.title=n(am.follow?(T[ao]?T[ao]:"Follow on "+ah):(S[ao]?S[ao]:"Send to "+ah));al.at_titled=1}}else{if(al.conf.product&&al.parentNode.className.indexOf("toolbox")==-1){B(al)}}}var af;switch(aj){case"img":if(!al.hasChildNodes()){var aw=(al.conf.ui_language||_ate.lng()).split("-").shift(),an=_ate.ivl(aw);if(!an){aw="en"}else{if(an!==1){aw=an}}af=V(_ate.iwb(aw)?150:125,16,"Share",_atr+"static/btn/v2/lg-share-"+aw.substr(0,2)+".gif")}break}if(af){al.appendChild(af)}}}}function g(){if(window.gapi&&window.gapi.plusone){gapi.plusone.go();return}else{if(!m){var d=_ate.ajs("//apis.google.com/js/plusone.js",1);m=1}}if(H<3){setTimeout(g,3000+1000*2*(H++))}}function N(){if(W.location.href.indexOf(_atr)==-1&&!_ate.sub&&!j){if(p()){j=1;FB.Event.subscribe("edge.create",function(w){if(!aa[w]){var d={};for(var u in addthis_share){d[u]=addthis_share[u]}d.url=w;_ate.share.track("facebook_like",0,d,addthis_config);aa[w]=1}});FB.Event.subscribe("edge.remove",function(w){if(aa[w]){var d={};for(var u in addthis_share){d[u]=addthis_share[u]}d.url=w;_ate.share.track("facebook_dislike",0,d,addthis_config);aa[w]=0}})}else{if(window.fbAsyncInit&&!y){if(l<3){setTimeout(N,3000+1000*2*(l++))}y=1}}}}function Z(aE,aF,aG,at,aM){for(var aP=0;aP<aE.length;aP++){var aX=aE[aP];if(aX==null){continue}if(at!==false||!aX.ost){var ap=a(aX,aF,aG,!aM),ac=0,aZ="at300",aW=aX.className||"",ag="",aI=aW.match(/addthis_button_([\w\.]+)(?:\s|$)/),ax={},ak=aI&&aI.length?aI[1]:0;e(ap.conf,x);e(ap.share,O);if(ak){if(ak==="tweetmeme"&&aX.className.indexOf("chiclet_style")==-1){if(aX.ost){continue}var aO=i(aX,"tm"),aH=50,aR=61;ag=_ate.util.toKV(aO);if(aO.style==="compact"){aH=95;aR=25}aX.innerHTML='<iframe frameborder="0" width="'+aH+'" height="'+aR+'" scrolling="no" allowTransparency="true" scrollbars="no"'+(_ate.bro.ie6?" src=\"javascript:''\"":"")+"></iframe>";var a1=aX.firstChild;a1.src="//api.tweetmeme.com/button.js?url="+_euc(ap.share.url)+"&"+ag;aX.noh=aX.ost=1}else{if(ak==="linkedin_counter"){if(aX.ost){continue}var aJ=i(aX,"li"),aG=ap.share,aY=aJ.width||100,ah=aJ.height||18,ag,aQ="",al;if(!aJ.counter){aJ.counter="horizontal"}if(!aG.passthrough){aG.passthrough={}}aG.passthrough.linkedin=_ate.util.toKV(aJ);aQ=_ate.util.rtoKV(aG);if(aJ.counter==="top"){ah=55;aY=57;if(!aJ.height){aJ.height=ah}if(!aJ.width){aJ.width=aY}}else{if(aJ.counter==="right"){aY=100;if(!aJ.width){aJ.width=ay}}}if(aJ.width){aY=aJ.width}if(aJ.height){ah=aJ.height}ag=_ate.util.toKV(aJ),aX.innerHTML='<iframe frameborder="0" role="presentation" scrolling="no" allowTransparency="true" scrollbars="no"'+(_ate.bro.ie6?" src=\"javascript:''\"":"")+' style="width:'+aY+"px; height:"+ah+'px;"></iframe>';al=aX.firstChild;if(!ap.conf.pubid){ap.conf.pubid=addthis_config.pubid||_ate.pub()}al.src=_atr+"static/r07/linkedin04.html#href="+_euc(ap.share.url)+"&dr="+_euc(_ate.dr)+"&conf="+_euc(_ate.util.toKV(ap.conf))+"&share="+_euc(aQ)+"&li="+_euc(ag);aX.noh=aX.ost=1}else{if(ak==="tweet"){if(aX.ost){continue}var ad=i(aX,"tw"),aG=ap.share,ay=ad.width||55,aD=ad.height||20,ag,aQ="",av;if(!ad.text){ad.text=ap.share.title}if(!ad.via){ad.via="AddThis"}if(!ad.count){ad.count="horizontal"}if(!aG.passthrough){aG.passthrough={}}aG.passthrough.twitter=_ate.util.toKV(ad);aQ=_ate.util.rtoKV(aG);if(ad.count==="vertical"){aD=62;if(!ad.height){ad.height=aD}}else{if(ad.count==="horizontal"){ay=110;if(!ad.width){ad.width=ay}}}if(ad.width){ay=ad.width}if(ad.height){aD=ad.height}ag=_ate.util.toKV(ad),aX.innerHTML='<iframe frameborder="0" role="presentation" scrolling="no" allowTransparency="true" scrollbars="no"'+(_ate.bro.ie6?" src=\"javascript:''\"":"")+' style="width:'+ay+"px; height:"+aD+'px;"></iframe>';av=aX.firstChild;if(!ap.conf.pubid){ap.conf.pubid=addthis_config.pubid||_ate.pub()}av.src=_atr+"static/r07/tweet04.html#href="+_euc(ap.share.url)+"&dr="+_euc(_ate.dr)+"&conf="+_euc(_ate.util.toKV(ap.conf))+"&share="+_euc(aQ)+"&tw="+_euc(ag);aX.noh=aX.ost=1}else{if(ak==="google_plusone"){var az=i(aX,"g:plusone"),aq="";az.href=az.href||_ate.track.mgu(ap.share.url);az.width=az.width||83;az.height=az.height||20;window._at_gpocbh=window._at_gpocbh||function(a4){var a2={};for(var a3 in addthis_share){a2[a3]=ap.share[a3]}a2.url=a4.href;_ate.share.track("google_"+(a4.state=="off"?"un":"")+"plusone",0,a2,ap.conf)};az.callback=az.callback||"_at_gpocbh";for(var aN in az){aq+=" "+aN+'="'+az[aN]+'"'}aX.innerHTML="<g:plusone "+aq+"></g:plusone>";g()}else{if(ak==="facebook_like"){if(aX.ost){continue}var w,ai=i(aX,"fb:like"),au="",a0=ai.layout||"button_count",aL=ai.locale||_ate.gfl(_ate.lng()),u={standard:[450,ai.show_faces?80:35],button_count:[90,25],box_count:[55,65]},aV=ai.width||(u[a0]?u[a0][0]:100),ae=ai.height||(u[a0]?u[a0][1]:25),an="fb-root",ar=false,aC=window.fbAsyncInit,aK=W.getElementById(an);ag=_ate.util.toKV(ai);_ate.ufbl=1;try{var aw=(document.getElementsByTagName("html"))[0];if(aw){if(aw.getAttribute&&aw.getAttribute("xmlns:fb")){ar=true}else{if(_ate.bro.msi){var aU=aw.outerHTML.substr(0,aw.outerHTML.indexOf(">"));if(aU.indexOf("xmlns:fb")>-1){ar=true}}}}}catch(aT){}if((_atc.ltj&&(!window.FB_RequireFeatures&&(!window.FB||(!FB.Share&&!FB.Bootstrap)))&&ar)||(p()&&FB.XFBML&&FB.XFBML.parse)){if(ai.layout===undefined){ai.layout="button_count"}if(ai.show_faces===undefined){ai.show_faces="false"}if(ai.action===undefined){ai.action="like"}if(ai.width===undefined){ai.width=aV}if(ai.font===undefined){ai.font="arial"}if(ai.href===undefined){ai.href=_ate.track.mgu(ap.share.url)}for(var aN in ai){au+=" "+aN+'="'+ai[aN]+'"'}if(_atc.ufc){aX.innerHTML='<fb:like ref="'+_ate.share.gcp(ap.share,ap.conf).replace(",","_")+'" '+au+"></fb:like>"}else{aX.innerHTML='<fb:like ref="addthis" '+au+"></fb:like>"}if(p()&&FB.XFBML&&FB.XFBML.parse){FB.XFBML.parse(aX);N()}else{if(aC){}else{if(!aK){aK=W.ce("div");aK.id=an;t.appendChild(aK)}if(!aC){aT=W.createElement("script");aT.src=W.location.protocol+"//connect.facebook.net/"+aL+"/all.js";aT.async=true;aK.appendChild(aT);aC=function(){FB.init({appId:"172525162793917",status:true,cookie:false})}}}M.push(aX);if(ab){ab=false;window.__orig__fbAsyncInit=aC;window.fbAsyncInit=function(){window.__orig__fbAsyncInit();for(var a2=0;a2<M.length;a2++){FB.XFBML.parse(M[a2])}N()}}}}else{if(!_ate.bro.msi){w=W.ce("iframe")}else{aX.innerHTML='<iframe frameborder="0" scrolling="no" allowTransparency="true" scrollbars="no"'+(_ate.bro.ie6?" src=\"javascript:''\"":"")+"></iframe>";w=aX.firstChild}w.style.overflow="hidden";w.style.scrolling="no";w.style.scrollbars="no";w.style.border="none";w.style.borderWidth="0px";w.style.width=aV+"px";w.style.height=ae+"px";w.src="//www.facebook.com/plugins/like.php?href="+_euc(_ate.track.mgu(ap.share.url))+"&layout=button_count&show_faces=false&width=100&action=like&font=arial&"+ag;if(!_ate.bro.msi){aX.appendChild(w)}}U.push(w);aX.noh=aX.ost=1}else{if(ak.indexOf("preferred")>-1){if(aX._iss){continue}aI=aW.match(/addthis_button_preferred_([0-9]+)(?:\s|$)/);var aS=((aI&&aI.length)?Math.min(16,Math.max(1,parseInt(aI[1]))):1)-1;if(!aX.conf){aX.conf={}}aX.conf.product="tbx-"+_atc.ver;B(aX);if(window._atw){if(!aX.parentNode.services){aX.parentNode.services={}}var af=_atw.conf.services_exclude||"",d=_atw.loc,aj=aX.parentNode.services,aB=b(addthis_options.replace(",more","").split(","),d.split(","));do{ak=aB[aS++]}while(aS<aB.length&&(af.indexOf(ak)>-1||aj[ak]));if(aj[ak]){for(var aN in _atw.list){if(!aj[aN]&&af.indexOf(aN)==-1){ak=aN;break}}}aX._ips=1;if(aX.className.indexOf(ak)==-1){aX.className+=" addthis_button_"+ak;aX._iss=1}aX.parentNode.services[ak]=1}else{_ate.alg(ap.conf.ui_language||window.addthis_language);_ate.plo.unshift(["deco",Z,[aX],aF,aG,true]);if(_ate.gssh){_ate.pld=_ate.ajs("static/r07/menu75.js")}else{if(!_ate.pld){_ate.pld=1;var ao=function(){_ate.pld=_ate.ajs("static/r07/menu75.js")};if(_ate.upm){_ate._rec.push(function(a2){if(a2.ssh){ao()}});setTimeout(ao,500)}else{ao()}}}continue}}else{if(ak.indexOf("follow")>-1){ak=ak.split("_follow").shift();ax.follow=true;ap.share.url=v(ak,ap.share.userid)}}}}}}}if(!Y[ak]&&(R||q(aX))){E.load()}if(!aX.childNodes.length){var am=W.ce("span");aX.appendChild(am);am.className=aZ+"bs at15nc at15t_"+ak}else{if(aX.childNodes.length==1){var aA=aX.childNodes[0];if(aA.nodeType==3){var am=W.ce("span");aX.insertBefore(am,aA);am.className=aZ+"bs at15nc at15t_"+ak}}else{ac=1}}if(ak==="compact"||ak==="expanded"){if(!ac&&aW.indexOf(aZ)==-1){aX.className+=" "+aZ+"m"}if(ap.conf.product&&ap.conf.product.indexOf("men-")==-1){ap.conf.product+=",men-"+_atc.ver}if(ak==="expanded"){ax.nohover=true;ax.singleservice="more"}}else{if((aX.parentNode.className||"").indexOf("toolbox")>-1){if(!aX.parentNode.services){aX.parentNode.services={}}aX.parentNode.services[ak]=1}if(!ac&&aW.indexOf(aZ)==-1){aX.className+=" "+aZ+"b"}ax.singleservice=ak}if(aX._ips){ax.issh=true}P([aX],ap,ax,aM);aX.ost=1;B(aX)}}}}function k(w,ag,d,ac){var u=d.data_ga_tracker,af=d.data_ga_property;if(af){if(typeof(window._gat)=="object"&&_gat._getTracker){u=_gat._getTracker(af)}else{if(typeof(window._gaq)=="object"&&_gaq._getAsyncTracker){u=_gaq._getAsyncTracker(af)}else{if(typeof(window._gaq)=="array"){_gaq.push([function(){_ate.gat(w,ag,d,ac)}])}}}}if(u&&typeof(u)=="string"){u=window[u]}if(u&&typeof(u)=="object"){var ad=ag||(ac||{}).url||location.href;if(ad.toLowerCase().replace("https","http").indexOf("http%3a%2f%2f")==0){ad=_duc(ad)}try{u._trackEvent("addthis",w,ad)}catch(ae){try{u._initData();u._trackEvent("addthis",w,ad)}catch(ae){}}}}_ate.gat=k;C.update=function(af,ad,w){if(af=="share"){if(ad=="url"){_ate.usu(0,1)}if(!window.addthis_share){window.addthis_share={}}window.addthis_share[ad]=w;A[ad]=w;for(var d in C.links){var ae=C.links[d],ac=new RegExp("&"+ad+"=(.*)&"),u="&"+ad+"="+_euc(w)+"&";if(ae.share){ae.share[ad]=w}if(!ae.noh){ae.href=ae.href.replace(ac,u);if(ae.href.indexOf(ad)==-1){ae.href+=u}}}for(var d in C.ems){var ae=C.ems[d];ae.href=_ate.share.genieu(addthis_share)}}else{if(af=="config"){if(!window.addthis_config){window.addthis_config={}}window.addthis_config[ad]=w;F[ad]=w}}};C._render=P;var o=[new _ate.resource.Resource("countercss",_atr+"static/r07/counter59.css",function(){return true}),new _ate.resource.Resource("counter",_atr+"js/250/plugin.sharecounter.js",function(){return window.addthis.counter.ost})];if(!J.JSON||!J.JSON.stringify){o.unshift(new _ate.resource.Resource("json2",_atr+"static/r07/json2.js",function(){return J.JSON&&J.JSON.stringify}))}C.counter=function(ac,u,w){if(ac){ac=C._select(ac);if(ac.length){if(!C.counter.selects){C.counter.selects=[]}C.counter.selects=C.counter.selects.concat({counter:ac,config:u,share:w});for(var d in o){if((o[d]||{}).load){o[d].load()}}}}};C.button=function(w,d,u){d=d||{};if(!d.product){d.product="men-"+_atc.ver}P(w,{conf:d,share:u},{internal:"img"})};C.toolbox=function(af,u,ag,ah){var ai=c(af);for(var ac=0;ac<ai.length;ac++){var w=ai[ac],ad=a(w,u,ag,ah),d=W.ce("div"),ae;w.services={};if(!ad.conf.product){ad.conf.product="tbx"+(w.className.indexOf("32x32")>-1?"32":"")+"-"+_atc.ver}if(w){ae=w.getElementsByTagName("a");if(ae){Z(ae,ad.conf,ad.share,!ah,!ah)}w.appendChild(d)}d.className="atclear"}};C.ready=function(){var d=C,u=".addthis_";if(d.ost){return}d.ost=1;C.toolbox(u+"toolbox",null,null,true);C.button(u+"button");C.counter(u+"counter");Z(z,null,null,false);_ate.ed.fire("addthis.ready",C);if(_ate.onr){_ate.onr(C)}for(var w=0,ad=d.plo,ac;w<ad.length;w++){ac=ad[w];(ac.ns?d[ac.ns]:d)[ac.call].apply(this,ac.args)}N()};C.util.getAttributes=a;window.addthis=C;window.addthis.ready()}}));_ate.extend(addthis,{user:(function(){var k=_ate,f=addthis,l={},c=0,m=0,e=0,d;function j(a,n){return k.reduce(["getID","getServiceShareHistory"],a,n)}function g(a,n){return function(o){setTimeout(function(){o(k[a]||n)},0)}}function i(a){if(c){return}if(!a||!a.uid){return}if(d!==null){clearTimeout(d)}d=null;c=1;j(function(p,n,o){l[n]=l[n].queuer.flush(g.apply(f,p[o]),f);return p},[["uid",""],["_ssh",[]]])}function h(){if(!_ate.pld){_ate.pld=(new _ate.resource.Resource("menujs",_atr+"static/r07/menu75.js",function(){return true})).load()}}function b(a){if(m&&(a.uid||a.ssh!==undefined)){h();m=0}}d=setTimeout(function(){var a={uid:"x",ssh:"",ups:""};e=1;i(a);b(a)},5000);k._rec.push(i);l.getPreferredServices=function(a){if(window._atw){_atw.gps(a)}else{_ate.ed.addEventListener("addthis.menu.ready",function(){_atw.gps(a)});_ate.alg();if(k.gssh||e){h()}else{if(!k.pld&&!m){_ate._rec.push(b)}}m=1}};return j(function(n,a){n[a]=(new f._Queuer(a)).call;return n},l)})()});

// JavaScript Document
<!--
/*第一种形式 第二种形式 更换显示样式*/
//function setTab(name,cursel,n){
// for(i=1;i<=n;i++){
//  var menu=document.getElementById(name+i);
//  var con=document.getElementById("con_"+name+"_"+i);
//  menu.className=i==cursel?"hover":"";
//  con.style.display=i==cursel?"block":"none";
// }
//}
//-->

function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;	
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}


function fbolck(){
	var obj = document.getElementById("fbox");
	obj.style.display = "block";
}
function fnone(){
	var obj = document.getElementById("fbox");
	obj.style.display = "none";
}

function setTab(name,cursel,n){
 for(i=1;i<=n;i++){
  var menu=document.getElementById(name+i);
  var con=document.getElementById("con_"+name+"_"+i);
  menu.className=i==cursel?"hover":"";
  con.style.display=i==cursel?"block":"none";
 }
}

function _(id) { 
  return document.getElementById(id); 
} 
var ti = null; 
function loading(){ 
    var tmd = 0; 
    var x1 = document.documentElement.clientWidth;  
    var y1 = document.body.offsetHeight; 
    var y2=document.documentElement.clientHeight;//整个页面的高度 
    with(_("div1")){ 
       style.width=x1+"px"; 
       if(y2>y1){ 
       style.height=y2+"px"; 
       }else{ 
       style.height=y1+"px"; 
       } 
       style.overflowX="hidden"; 
       style.overflowY="hidden"; 
       style.visibility="visible"; 
    } 
    _("div1").style.left=0; 
    _("div1").style.filter='Alpha(Opacity=0)'; 
    document.body.style.overflowX=""; 
    document.body.style.overflowY=""; 
    _("fbox").style.top=parseInt(document.documentElement.scrollTop)+((document.documentElement.clientHeight-250)/2)+"px";  //-550 变成-250
    _("fbox").style.left="50%"; 
    _("fbox").style.marginLeft="-190px" 
    _("fbox").style.visibility="visible"; 
    ti = setInterval("hei()",10); 
} 
var x = 0; 
function hei(){ 
    x+=10; 
    if(x<31){ 
        if(document.all){ 
            _("div1").style.filter='Alpha(Opacity='+x+')'; 
        }else{ 
            _("div1").style.opacity=""+x/100+"";     
        } 
    } 
} 
function unload(){ 
_("div1").style.visibility="hidden"; 
_("fbox").style.visibility="hidden"; 
clearInterval(ti); 
x=0; 
} 


function getDownloadUrl(productName) {
			var random = parseInt(Math.random()*100);
			var temp = 0;
	
			for(var i = 0; i < productName.length && random > temp; i++) {
				temp += parseInt(productName[i].percent);
			}
			i = (random == 0 ? 0 : i - 1);

			return "<a href=\"" + productName[i].url + "\">" + productName[i].name + "</a>";
}
function switchTab(identify,index,count) {
	for(i=0;i<count;i++) {
		var CurTabObj = document.getElementById("Tab_"+identify+"_"+i) ;
		var CurListObj = document.getElementById("List_"+identify+"_"+i) ;
		if (i != index) {
			fRemoveClass(CurTabObj , "upH3") ;
			fRemoveClass(CurListObj , "upBox") ;
		}
	}
	fAddClass(document.getElementById("Tab_"+identify+"_"+index),"upH3") ;
	fAddClass(document.getElementById("List_"+identify+"_"+index),"upBox") ;
}

function switchSideTab(identify,index,count) {
	for(i=0;i<count;i++) {
		var CurTabObj = document.getElementById("Tab_"+identify+"_"+i) ;
		var CurListObj = document.getElementById("List_"+identify+"_"+i) ;
		if (i != index) {
			fRemoveClass(CurTabObj , "upH3") ;
			fRemoveClass(CurListObj , "upUL") ;
		}
	}
	fAddClass(document.getElementById("Tab_"+identify+"_"+index),"upH3") ;
	fAddClass(document.getElementById("List_"+identify+"_"+index),"upUL") ;
}

function fAddClass(XEle, XClass)
{/* shawl.qiu code, void return */
  if(!XClass) throw new Error("XClass 不能为空!");
  if(XEle.className!="") 
  {
    var Re = new RegExp("\\b"+XClass+"\\b\\s*", "");
    XEle.className = XEle.className.replace(Re, "");
	var OldClassName = XEle.className.replace(/^\s+|\s+$/g,"") ;
	if (OldClassName == "" ) {
		 XEle.className = XClass;
	}
	else {
		XEle.className = OldClassName + " " + XClass;
	}
   
  }
  else XEle.className = XClass;
}/* end function fAddClass(XEle, XClass) */

function fRemoveClass(XEle, XClass)
{/* shawl.qiu code, void return */
  if(!XClass) throw new Error("XClass 不能为空!");
  var OldClassName = XEle.className.replace(/^\s+|\s+$/g,"") ;
  if(OldClassName!="") 
  {
	
    var Re = new RegExp("\\b"+XClass+"\\b\\s*", "");
    XEle.className = OldClassName.replace(Re, "");
  }
}/* function fRemoveClass(XEle, XClass) */
function switchPic(screen) {
	if (screen > MaxScreen) {
		screen = 1 ;
	}
	
	for (i=1;i<=MaxScreen;i++) {
		document.getElementById("Switch_"+i).style.display = "none" ;
	}
	document.getElementById("Switch_"+screen).style.display = "block" ;
	showSwitchNav(screen);
	showSwitchTitle(screen);
	//Effect.Appear("Switch_"+screen);
			
	//switchLittlePic(screen);
	//showSwitchTitles(screen);
	CurScreen = screen  ;
}
function showSwitchNav(screen) {
	var NavStr = "" ;
	for (i=1;i<=MaxScreen;i++) {
		if (i == screen) {
			NavStr += '<li onmouseover="pauseSwitch();" onmouseout="goonSwitch();"><a href="javascript://" target="_self" class="sel">'+i+'</a></li>' ;
		}
		else {
			NavStr += '<li onmouseover="pauseSwitch();" onmouseout="goonSwitch();" onclick="goManSwitch('+i+');"><a href="javascript://" target="_self">'+i+'</a></li>' ;
		}
		
	}
	document.getElementById("SwitchNav").innerHTML = NavStr ;
}
function showSwitchTitle(screen) {
	var titlestr = "" ;
	titlestr = '<h3><a href="'+Switcher[screen]['link']+'" target="_blank">'+Switcher[screen]['title']+'</a></h3><p><a href="'+Switcher[screen]['link']+'" target="_blank">'+Switcher[screen]['stitle']+'</a></p>' ;
	document.getElementById("SwitchTitle").innerHTML = titlestr ;
}
function reSwitchPic() {
	refreshSwitchTimer = null;
	switchPic(CurScreen+1);
	refreshSwitchTimer = setTimeout('reSwitchPic();', 3000);
}
function pauseSwitch() {
	clearTimeout(refreshSwitchTimer);
}
function goonSwitch() {
	clearTimeout(refreshSwitchTimer);
	refreshSwitchTimer = setTimeout('reSwitchPic();', 3000);
}
function goManSwitch(index) {
	clearTimeout(refreshSwitchTimer);
	
	CurScreen = index - 1 ;
	reSwitchPic();
}
function floatAdMove() {
	try{BigAd = document.getElementById("BigAd")}catch(e){}
	if (BigAd.style.display != "none") {
		if (document.ns) {
			BigAd.style.top=bdy.scrollTop+bdy.clientHeight-imgheight_close -360;
			BigAd.style.left=bdy.offsetWidth/2-bdy.scrollLeft-300;
		}
		else {
			BigAd_style_left=bdy.offsetWidth/2-bdy.scrollLeft-300;
			BigAd_style_top = 200 ;
			BigAd.style.top=BigAd_style_top + "px";
			BigAd.style.left=BigAd_style_left + "px";
		}
	}
	setTimeout("floatAdMove();",50) ;
 }

function FloatCtrlMove() {
	try{FloatCtrl = document.getElementById("FloatCtrl")}catch(e){}
	if (FloatCtrl.style.display != "none") {
		if (document.ns) {
			FloatCtrl.style.top=bdy.scrollTop+bdy.clientHeight-imgheight_close;
			FloatCtrl.style.left=bdy.scrollLeft+bdy.offsetWidth-150;
		}
		else {
			FloatCtrl_style_left=bdy.scrollLeft+bdy.offsetWidth-150;
			FloatCtrl_style_top = 500 ;
			FloatCtrl.style.top=FloatCtrl_style_top + "px";
			FloatCtrl.style.left=FloatCtrl_style_left + "px";
		}
	}
	setTimeout("FloatCtrlMove();",50) ;
}

function showFloatAd() {
	cleanTimer();
	try{floatbig = document.getElementById("floatbig")}catch(e){}
	if (floatbig.innerHTML != "") {
		BigAdStartTimer = setTimeout("Effect.Appear('BigAd');",500);
		BigAdEndTimer = setTimeout("hiddenFloatAd();",6000);
		hiddenFloatCtrl();
	}
}

 function hiddenFloatAd() {
	cleanTimer();
	Effect.Fade('BigAd');
	showFloatCtrl();
 }

 function showFloatCtrl() {
	try {FloatCtrl = getElementById("FloatCtrl")} catch(e){}
	FloatCtrl.style.display = "block" ;
 }
 function hiddenFloatCtrl() {
	try {FloatCtrl = getElementById("FloatCtrl")} catch(e){}
	FloatCtrl.style.display = "none" ;
 }
 function cleanTimer() {
	clearTimeout(BigAdStartTimer) ;
	clearTimeout(BigAdEndTimer);
 }




var email_list = new Array('163.com', '126.com', '139.com', '188.com', '2008.china.com', '2008.sina.com', '21cn.com', '263.net', 'china.com', 'chinaren.com', 'citiz.net', 'eyou.com', 'foxmail.com', 'gmail.com', 'hongkong.com', 'hotmail.com', 'live.cn', 'live.com', 'mail.china.com', 'msn.com', 'my3ia.sina.com', 'qq.com', 'sina.cn', 'sina.com', 'sina.com.cn', 'sogou.com', 'sohu.com', 'tom.com', 'vip.163.com', 'vip.qq.com', 'vip.sina.com', 'vip.sohu.com', 'vip.tom.com', 'yahoo.cn', 'yahoo.com', 'yahoo.com.cn', 'yahoo.com.hk', 'yahoo.com.tw', 'yeah.net');
$(document).ready(function () {


    setTab('two', currentIndex, 2)

    //提交修改
    $("#changeSubmit").click(function () {
        var countryId = $("#CountryId").val();
        //            if (countryId == 0 || $("#nameValidator").html() != "" || $("#phoneValidator").html() != "" || $("#postValidator").html() != "" || $("#name").val() == "" || $("#city").val() == "") {
        //              alert("Please fill in your complete information!");
        //                return false;
        //            } else {
        document.editUinfoForm.submit();
        //            }
    });
    //重置修改
    $("#reset").click(function () {
        document.editUinfoForm.reset();
        resetEditUinfoForm();
    });
    function resetEditUinfoForm() {
        $("#Name").val("");
        $("#Post").val("");
        $("#Phone").val("");
        $("#CountryId").val(0);
        $("#City").val("");
        $("#Address").val("");
        $("#Photo").val("");

    }
	 
    $("#UploadPicture").change(function () {
        $("#Img1").attr("src", this.value);
    });
    ///////////////////////////////////修改个人基本信息结束
});


//修改个人信息提交修改
function changeSubmit() {
    //        var countryId = $("#CountryId").val();
    //        if (countryId == 0 || $("#nameValidator").html() != "" || $("#phoneValidator").html() != "" || $("#postValidator").html() != "" || $("#name").val() == "" || $("#city").val() == "") {
    //            alert("Please fill in your complete personal information!");
    //            return;
    //        } else {
    document.editUinfoForm.submit();

    // }
}



//<![CDATA[

function advisorOmniture() {
    var eventType = 'Televisions';
    s_control_click('eVar31,events', 'event36', 'product advisor:' + eventType.toLowerCase() + ',event36', 'o', 'product advisor clicks');
}


//]]>

//<![CDATA[
var TRANSPARENCY_PROPERTY_ENABLE = 1;
var TRANSPARENCY_PROPERTY_DISABLE = 2;
var TRANSPARENCY_PROPERTY_IS_DISABLE = 3;
var transparencyVetoableChangeListener = [];
var transparency_debugAreaId = null;
function transparency_addVetoableChangeListener(vetoableChangeListener) {
    transparencyVetoableChangeListener[transparencyVetoableChangeListener.length] = vetoableChangeListener;
}

function transparency_enable() {
    document.getElementById('visualsearch_transparency').style.display = 'block';
    for (var i = 0; i < transparencyVetoableChangeListener.length; i++) {
        transparencyVetoableChangeListener[i](TRANSPARENCY_PROPERTY_ENABLE);
    }
}

function transparency_disable() {
    for (var i = 0; i < transparencyVetoableChangeListener.length; i++) {
        if (!transparencyVetoableChangeListener[i](TRANSPARENCY_PROPERTY_IS_DISABLE)) {
            if (transparency_debugAreaId != null) {
                var message = "" + transparencyVetoableChangeListener[i] + ": veto";
                transparency_debugAreaId.value += message + "\n";
            }
            return;
        }
    }

    document.getElementById('visualsearch_transparency').style.display = 'none';
    for (var i = 0; i < transparencyVetoableChangeListener.length; i++) {
        transparencyVetoableChangeListener[i](TRANSPARENCY_PROPERTY_DISABLE);
    }
}

function transparency_isEnable() {
    if (document.getElementById('visualsearch_transparency').style.display == 'block')
        return true;
    return false;
}
//]]>

//checkbox全选和取消全选
function checkalls() {
    if ($("#chkall").attr("checked")) {
        $("[name='EmailSubscriptionName']").attr("checked", 'true'); //全选
    } else {
        $("[name='EmailSubscriptionName']").removeAttr("checked"); //取消全选


        //遍历.column 下的 checkbox;
        $("[name='EmailSubscriptionName']").each(function () {
            if ($(this).attr("readonly")) {
                //alert($(this).attr("disabled"));
                $(this).attr("checked", "true");
                //给当前勾选的checkbox取反；  其中!$(this).attr("checked")是先获取他的属性，再取反，充当第二个参数；
                //attr方法只有一个参数时是取值，两个参数时是设值；
                //$(this).attr("checked", !$(this).attr("checked"));
                //$(this).attr("checked", !$(this).removeAttr("checked"));
            };
        });


    }
};

function SubmitEmailSubscription() {
    $("#BtnSubmitES").click();
};


/


		function getSiteCode() {
			var site_url = document.URL;
			var split_url;
			var site_cd;
	
			try {
				split_url = site_url.split("/");
				site_cd = split_url[3];		
			} catch(e) {
			site_cd = "us";	
			}	
			return site_cd;
		}
	
		function getAccountSiteCode() {
			var site_cd;
		
			try {
				site_cd = getSiteCode();
				site_cd = site_cd.replace("_", "")
			} catch(e) {
				site_cd = "us";
			}
			return site_cd;
		}
	
		function getCurrencyCode(siteCode) {
			var arrSiteCode = new Array("ar", "au", "at", "be_fr", "be", "br", "ca_fr", "ca", "cl", "cn", "co", "cz", "dk", "ee", "fi", "fr", "de", "gr", "hk_en", "hk", "hu", "in", "id", "iran", "ie", "il", "it", "jp", "kz_ru", "sec", "lv", "lt", "my", "mx", "nl", "nz", "no", "latin", "pe", "ph", "pl", "pt", "ru", "sa_en", "sg", "sk", "za", "es", "se", "ch_fr", "ch", "tw", "th", "tr", "us", "ae", "ua", "ua_ru", "vn", "uk", "global", "eu", "ro", "baltic","mea_ar","mea_en","africa_fr","africa_en","ae_ar");
			var arrCurrencyCode = new Array("ARS", "AUD", "EUR", "EUR", "EUR", "BRL", "CAD", "CAD", "CLP", "CNY", "COP", "CZK", "DKK", "EEK", "EUR", "EUR", "EUR", "EUR", "HKD", "HKD", "HUF", "INR", "IDR", "IRR", "EUR", "ILS", "EUR", "JPY", "KZT", "KRW", "LVL", "LTL", "MYR", "MXN", "ANG", "NZD", "NOK", "PAB", "PEN", "PHP", "PLN", "EUR", "RUB", "SAR", "SGD", "SKK", "ZAR", "EUR", "SEK", "CHF", "CHF", "TWD", "THB", "TRY", "USD", "AED", "UAH", "UAH", "VND", "GBP", "USD", "EUR", "ROL", "USD","USD","USD","USD","USD","AED");
			var currencyCode = "";
	
			try {
				for (var i=0; i<arrSiteCode.length; i++) {
					if (siteCode == arrSiteCode[i]) {
						currencyCode = arrCurrencyCode[i];
						break;
					}
				}
			} catch(e) {
			currencyCode = "SGD";
			}
		
			return currencyCode;
		}


/* Specify the Report Suite ID(s) to track here */

var s_account ="";

if ( window.location.host == "www.samsung.com" ) s_account="sssamsung" + getAccountSiteCode();
else if ( window.location.host == "origin2.samsung.com" ) s_account = "test" + getAccountSiteCode()+"dev";
else if ( window.location.host == "stgweb.samsung.com" ) s_account = "sssamsung" + getAccountSiteCode()+"dev";
else if ( window.location.host == "dev.samsung.com"   ) s_account = "test" + getAccountSiteCode();
else s_account = "test" + getAccountSiteCode();

var s=s_gi(s_account);
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* E-commerce Config */
s.currencyCode=getCurrencyCode(getSiteCode());
s.charSet="UTF-8";
/* Link Tracking Config */
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls,msi,djvu,CAB,sit,rom,bin,swf,chm,mht,htm";
s.linkInternalFilters="javascript:,samsung.com";
s.linkLeaveQueryString=false;
s.linkTrackVars="None";
s.linkTrackEvents="None";
s.variableProvider ='DFA#1511760:v21=[["DFA-"+lis+"-"+lip+"-"+lastimp+"-"+lastimptime+"-"+lcs+"-"+lcp+"-"+lastclk+"-"+lastclktime]]';

/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {
	/* Add calls to plugins here */

        s.partnerDFACheck("dfa_cookie","DFA");

	
	if(!s.campaign)
		s.campaign = s.getQueryParam('cid');
	
	s.campaign = s.getValOnce(s.campaign,"s_campaign",0);

	/*Add calls to plugins here */
	// Tracking internal campaigns or promotions
	if(!s.eVar7)
		s.eVar7=s.getQueryParam('pid');
	
	s.eVar7=s.getValOnce(s.eVar7,"s_evar7",0);
	
	if(s.prop1){
		s.eVar1 = s.prop1;
	}

	if(s.prop2){
		s.eVar2 = s.prop2;
	}

	if(s.prop3){
		s.eVar3 = s.prop3;
	}

	if(s.prop4){
		s.eVar4 = s.prop4;
	}
	
	if(s.prop5){
		s.eVar5 = s.prop5;
	}

	if(s.prop6){
		s.eVar6 = s.prop6;
	}


	if(s.prop22){
		s.eVar18=s.prop22;
	}

		
	if(s.prop23){
		s.eVar23=s.prop23;
	}
	

	if(s.prop45){
		s.eVar45=s.prop45;
	}
	
	if(s.prop46){
		s.eVar46=s.prop46;
	}

	// Copy original referrer into s.referrer if it exists
	var tempVar;
	tempVar = s.getQueryParam('origref');
	if(tempVar) s.referrer=tempVar;

	s.detectRIA('s_ria','prop13','prop14','','','1');	
	
	// s.setupFormAnalysis();
	
	
	/*
	 * capture page name when first time visit or return visit
	 */


    	var firstVisit="First Visit"
    	var noCookie="Cookies Not Supported"
    	var visitNo=s.getDaysSinceLastVisit('s_lv')
    		if(visitNo==firstVisit) s.prop24 = s.pageName
    		else if(visitNo!=noCookie) s.prop25 = s.pageName
    		    	

}
s.doPlugins = s_doPlugins;

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */


/*
 * Plugin: getQueryParam 2.3 - return query string parameter(s) 
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"escp(v)}return ''");

/*
 * Utility: escp 0.1 - ensures decodeURI will be used to decode URL parameters if it exists
 */
s.escp=new Function("x",""
+"var s=this;if(typeof(decodeURI)=='function'&&x)return decodeURI(s.r"
+"ep(''+x,'+',' '));else return unescape(s.rep(''+x,'+',' '));");


/*
 * Plugin: getValOnce_v1.0 - get a value once per session or number of days
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");
		


/*
 * Partner Plugin: DFA Check 0.6 - Restrict DFA calls to once a visit, 
 * per report suite, per click through. Used in conjunction with VISTA
 */
 
s.partnerDFACheck=new Function("c","src","p",""
+"var s=this,dl=',',cr,nc,q,g,i,j,k,fnd,v=1,t=new Date,cn=0,ca=new Ar"
+"ray,aa=new Array,cs=new Array;t.setTime(t.getTime()+1800000);cr=s.c"
+"_r(c);if(cr){v=0}ca=s.split(cr,dl);aa=s.split(s.un,dl);for(i=0;i<aa"
+".length;i++){fnd=0;for(j=0;j<ca.length;j++){if(aa[i]==ca[j]){fnd=1}"
+"}if(!fnd){cs[cn]=aa[i];cn++}}if(cs.length){for(k=0;k<cs.length;k++)"
+"{nc=(nc?nc+dl:'')+cs[k]}cr=(cr?cr+dl:'')+nc;s.vpr(p,nc);v=1}q=s.wd."
+"location.search.toLowerCase();g=q.indexOf(src+'=');if(g>0){s.vpr(p,"
+"cr);v=1}if(!s.c_w(c,cr,t)){s.c_w(c,cr,0)}if(!s.c_r(c)){v=0}if(v<1)s"
+".vpr('variableProvider','')");



/*
 * Plugin: Form Analysis 2.1 (Success, Error, Abandonment)
 */

/*
s.setupFormAnalysis=new Function(""
+"var s=this;if(!s.fa){s.fa=new Object;var f=s.fa;f.ol=s.wd.onload;s."
+"wd.onload=s.faol;f.uc=s.useCommerce;f.vu=s.varUsed;f.vl=f.uc?s.even"
+"tList:'';f.tfl=s.trackFormList;f.fl=s.formList;f.va=new Array('',''"
+",'','')}");
s.sendFormEvent=new Function("t","pn","fn","en",""
+"var s=this,f=s.fa;t=t=='s'?t:'e';f.va[0]=pn;f.va[1]=fn;f.va[3]=t=='"
+"s'?'Success':en;s.fasl(t);f.va[1]='';f.va[3]='';");
s.faol=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,r=true,fo,fn,i,en,t,tf;if(!e)e=s.wd."
+"event;f.os=new Array;if(f.ol)r=f.ol(e);if(s.d.forms&&s.d.forms.leng"
+"th>0){for(i=s.d.forms.length-1;i>=0;i--){fo=s.d.forms[i];fn=fo.name"
+";tf=f.tfl&&s.pt(f.fl,',','ee',fn)||!f.tfl&&!s.pt(f.fl,',','ee',fn);"
+"if(tf){f.os[fn]=fo.onsubmit;fo.onsubmit=s.faos;f.va[1]=fn;f.va[3]='"
+"No Data Entered';for(en=0;en<fo.elements.length;en++){el=fo.element"
+"s[en];t=el.type;if(t&&t.toUpperCase){t=t.toUpperCase();var md=el.on"
+"mousedown,kd=el.onkeydown,omd=md?md.toString():'',okd=kd?kd.toStrin"
+"g():'';if(omd.indexOf('.fam(')<0&&okd.indexOf('.fam(')<0){el.s_famd"
+"=md;el.s_fakd=kd;el.onmousedown=s.fam;el.onkeydown=s.fam}}}}}f.ul=s"
+".wd.onunload;s.wd.onunload=s.fasl;}return r;");
s.faos=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,su;if(!e)e=s.wd.event;if(f.vu){s[f.v"
+"u]='';f.va[1]='';f.va[3]='';}su=f.os[this.name];return su?su(e):tru"
+"e;");
s.fasl=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,a=f.va,l=s.wd.location,ip=s.trackPag"
+"eName,p=s.pageName;if(a[1]!=''&&a[3]!=''){a[0]=!p&&ip?l.host+l.path"
+"name:a[0]?a[0]:p;if(!f.uc&&a[3]!='No Data Entered'){if(e=='e')a[2]="
+"'Error';else if(e=='s')a[2]='Success';else a[2]='Abandon'}else a[2]"
+"='';var tp=ip?a[0]+':':'',t3=e!='s'?':('+a[3]+')':'',ym=!f.uc&&a[3]"
+"!='No Data Entered'?tp+a[1]+':'+a[2]+t3:tp+a[1]+t3,ltv=s.linkTrackV"
+"ars,lte=s.linkTrackEvents,up=s.usePlugins;if(f.uc){s.linkTrackVars="
+"ltv=='None'?f.vu+',events':ltv+',events,'+f.vu;s.linkTrackEvents=lt"
+"e=='None'?f.vl:lte+','+f.vl;f.cnt=-1;if(e=='e')s.events=s.pt(f.vl,'"
+",','fage',2);else if(e=='s')s.events=s.pt(f.vl,',','fage',1);else s"
+".events=s.pt(f.vl,',','fage',0)}else{s.linkTrackVars=ltv=='None'?f."
+"vu:ltv+','+f.vu}s[f.vu]=ym;s.usePlugins=false;var faLink=new Object"
+"();faLink.href='#';s.tl(faLink,'o','Form Analysis');s[f.vu]='';s.us"
+"ePlugins=up}return f.ul&&e!='e'&&e!='s'?f.ul(e):true;");
s.fam=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa;if(!e) e=s.wd.event;var o=s.trackLas"
+"tChanged,et=e.type.toUpperCase(),t=this.type.toUpperCase(),fn=this."
+"form.name,en=this.name,sc=false;if(document.layers){kp=e.which;b=e."
+"which}else{kp=e.keyCode;b=e.button}et=et=='MOUSEDOWN'?1:et=='KEYDOW"
+"N'?2:et;if(f.ce!=en||f.cf!=fn){if(et==1&&b!=2&&'BUTTONSUBMITRESETIM"
+"AGERADIOCHECKBOXSELECT-ONEFILE'.indexOf(t)>-1){f.va[1]=fn;f.va[3]=e"
+"n;sc=true}else if(et==1&&b==2&&'TEXTAREAPASSWORDFILE'.indexOf(t)>-1"
+"){f.va[1]=fn;f.va[3]=en;sc=true}else if(et==2&&kp!=9&&kp!=13){f.va["
+"1]=fn;f.va[3]=en;sc=true}if(sc){nface=en;nfacf=fn}}if(et==1&&this.s"
+"_famd)return this.s_famd(e);if(et==2&&this.s_fakd)return this.s_fak"
+"d(e);");
s.ee=new Function("e","n",""
+"return n&&n.toLowerCase?e.toLowerCase()==n.toLowerCase():false;");
s.fage=new Function("e","a",""
+"var s=this,f=s.fa,x=f.cnt;x=x?x+1:1;f.cnt=x;return x==a?e:'';");

*/


/*
 * Utility Function: vpr - set the variable vs with value v
 */
s.vpr=new Function("vs","v",
"if(typeof(v)!='undefined'){var s=this; eval('s.'+vs+'=\"'+v+'\"')}");

/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin: detectRIA v0.1 - detect and set Flash, Silverlight versions
 */
s.detectRIA=new Function("cn", "fp", "sp", "mfv", "msv", "sf", ""
+"cn=cn?cn:'s_ria';msv=msv?msv:2;mfv=mfv?mfv:10;var s=this,sv='',fv=-"
+"1,dwi=0,fr='',sr='',w,mt=s.n.mimeTypes,uk=s.c_r(cn),k=s.c_w('s_cc',"
+"'true',0)?'Y':'N';fk=uk.substring(0,uk.indexOf('|'));sk=uk.substrin"
+"g(uk.indexOf('|')+1,uk.length);if(k=='Y'&&s.p_fo('detectRIA')){if(u"
+"k&&!sf){if(fp){s[fp]=fk;}if(sp){s[sp]=sk;}return false;}if(!fk&&fp)"
+"{if(s.pl&&s.pl.length){if(s.pl['Shockwave Flash 2.0'])fv=2;x=s.pl['"
+"Shockwave Flash'];if(x){fv=0;z=x.description;if(z)fv=z.substring(16"
+",z.indexOf('.'));}}else if(navigator.plugins&&navigator.plugins.len"
+"gth){x=navigator.plugins['Shockwave Flash'];if(x){fv=0;z=x.descript"
+"ion;if(z)fv=z.substring(16,z.indexOf('.'));}}else if(mt&&mt.length)"
+"{x=mt['application/x-shockwave-flash'];if(x&&x.enabledPlugin)fv=0;}"
+"if(fv<=0)dwi=1;w=s.u.indexOf('Win')!=-1?1:0;if(dwi&&s.isie&&w&&exec"
+"Script){result=false;for(var i=mfv;i>=3&&result!=true;i--){execScri"
+"pt('on error resume next: result = IsObject(CreateObject(\"Shockwav"
+"eFlash.ShockwaveFlash.'+i+'\"))','VBScript');fv=i;}}fr=fv==-1?'flas"
+"h not detected':fv==0?'flash enabled (no version)':'flash '+fv;}if("
+"!sk&&sp&&s.apv>=4.1){var tc='try{x=new ActiveXObject(\"AgControl.A'"
+"+'gControl\");for(var i=msv;i>0;i--){for(var j=9;j>=0;j--){if(x.is'"
+"+'VersionSupported(i+\".\"+j)){sv=i+\".\"+j;break;}}if(sv){break;}'"
+"+'}}catch(e){try{x=navigator.plugins[\"Silverlight Plug-In\"];sv=x'"
+"+'.description.substring(0,x.description.indexOf(\".\")+2);}catch('"
+"+'e){}}';eval(tc);sr=sv==''?'silverlight not detected':'silverlight"
+" '+sv;}if((fr&&fp)||(sr&&sp)){s.c_w(cn,fr+'|'+sr,0);if(fr)s[fp]=fr;"
+"if(sr)s[sp]=sr;}}");
 
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");

/*
 * Plugin: Days since last Visit 1.1.H - capture time from last visit
 */

s.getDaysSinceLastVisit=new Function("c",""
+"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+"5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);"
+"s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da"
+"y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day"
+"){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s."
+"c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c"
+"_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c"
+"+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur"
+"n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s"
+"!=f5) return '';else return cval_s;");
 




/****************************** MODULES *****************************/

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="samsung";
s.dc=112;

if ( window.location.host == "www.samsung.com"||window.location.host =="stgweb.samsung.com") {
	s.trackingServer="nmetrics.samsung.com";
	s.trackingServerSecure="smetrics.samsung.com";
} else s.trackingServer="samsung.112.2o7.net";

s.vmk="47D561F8";


/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s"
+".an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=func"
+"tion(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexO"
+"f(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(c=='AUTO"
+"'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';"
+"else y+=escape(c)}x=y}else{x=x?s.rep(escape(''+x),'+','%2B'):x;if(x&&c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1)."
+"toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;return x?unescape(s.rep(''+x,'+',' ')):x};s.pt=function(x,d,f,a){var s=th"
+"is,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a"
+".indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0}"
+";s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(wd){var s=this,c=''+s_gi,a=c.indexOf(\"{\"),b=c.lastIndexOf(\"}\"),m;c=s_fe(a>0&&b>0?c.substring(a+1,b):0);if"
+"(wd&&wd.document&&c){wd.setTimeout('function s_sv(o,n,k){var v=o[k],i;if(v){if(typeof(v)==\"string\"||typeof(v)==\"number\")n[k]=v;else if (typeof(v)==\"array\"){n[k]=new Array;for(i=0;i<v.length;i"
+"++)s_sv(v,n[k],i)}else if (typeof(v)==\"object\"){n[k]=new Object;for(i in v)s_sv(v,n[k],i)}}}function s_si(t){var wd=window,s,i,j,c,a,b;wd.s_gi=new Function(\"un\",\"pg\",\"ss\",\"'+c+'\");wd.s=s_"
+"gi(\"'+s.oun+'\");s=wd.s;s.sa(\"'+s.un+'\");s.tfs=wd;s.pt(s.vl_g,\",\",\"vo1\",t);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3=\\'\\';if(t.m_l&&t.m_nl)for(i=0;i<"
+"t.m_nl.length;i++){n=t.m_nl[i];if(n){m=t[n];c=t[\"m_\"+n];if(m&&c){c=\"\"+c;if(c.indexOf(\"function\")>=0){a=c.indexOf(\"{\");b=c.lastIndexOf(\"}\");c=a>0&&b>0?c.substring(a+1,b):0;s[\"m_\"+n+\"_c"
+"\"]=c;if(m._e)s.loadModule(n);if(s[n])for(j=0;j<m._l.length;j++)s_sv(m,s[n],m._l[j])}}}}}var e,o,t;try{o=window.opener;if(o&&o.s_gi){t=o.s_gi(\"'+s.un+'\");if(t)s_si(t)}}catch(e){}',1)}};s.c_d='';s"
+".c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?par"
+"seInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ap"
+"e(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd("
+"),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie="
+"k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._"
+"in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x"
+".b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r"
+"');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfso"
+"e=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this"
+",p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet("
+"'gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s"
+"=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedRequests=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBu"
+"fferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorN"
+"amespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){i"
+"f(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.20.3/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if"
+"(s.isie&&!s.ismac){if(s.apv>5.5)rs=s.fl(rs,4095);else rs=s.fl(rs,2047)}if(id){s.br(id,rs);return}}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if"
+"(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]"
+"=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+u"
+"n+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(rs.indexOf('&pe=')>=0&&(!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;wh"
+"ile(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';re"
+"turn s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=t"
+"his,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://"
+"')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('google')>=0){a=s.sp(a,'&');if(a.length>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i"
+"=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c){y+='?'+b+'&'+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.link"
+"TrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s"
+".va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(v&&k!='linkName'&&k!='linkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='"
+"';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)"
+"}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if("
+"!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPe"
+"riods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='"
+"campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browse"
+"rWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')"
+"q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+q+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.to"
+"LowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'"
+"';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLower"
+"Case();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))re"
+"turn 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['"
+"+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t"
+"()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o"
+".protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i"
+"<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if(t=='INPUT'&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if("
+"!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript"
+"')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(o.value&&(t=='INPUT'||t=='SUBMIT')){n=o.value;x=3}else if(o.src&&t=='IMAGE')n=o.src"
+";if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?','+t.substring(0,e)+',':'';return u&&u.indexOf(','+un+',')>=0?s.epa(t.substring(e+1))"
+":''};s.rq=function(un){var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.ep"
+"a(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sq"
+"q=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?'"
+",':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s"
+"_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s"
+"_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s"
+".bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_"
+"'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t"
+"&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0}"
+";s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l."
+"toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.ou"
+"n+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i"
+")s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_"
+"t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.t"
+"oUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d"
+"(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl"
+"=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).in"
+"dexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+"
+"1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){"
+"var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElem"
+"ent){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o."
+"i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e"
+"',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f"
+"2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)"
+"g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.vo1=function(t,a){if(a[t]||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a"
+"[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;"
+"s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,','"
+",'vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.t=function(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floo"
+"r(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMin"
+"utes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta='',q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',"
+"c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>"
+"=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}"
+"}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugin"
+"s}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function"
+"('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default"
+"#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.c"
+"olorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt("
+"s.vl_g,',','vo1',vo)}if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}"
+"if((vo&&vo._t)||!s.m_m('d')){s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY')"
+"{o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".t"
+"l(\")>=0)return ''}ta=n?o.target:1;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+"
+"(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objec"
+"tID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if("
+"trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq(s.un)),0,id,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',v"
+"b);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests("
+")}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};if(pg){s.wd.s_co=function(o){var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_"
+"gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName"
+"){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Op"
+"era '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFl"
+"oat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if"
+"(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrati"
+"onServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvide"
+"r,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,products,linkName,linkType';for(var n=1;n<51;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,p"
+"ev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',track"
+"ingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccount"
+"Match,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_ref"
+"errer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s.wds()",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];if(!s._c||s._c=='s_c'){if(s.oun==un)return s;else if(s.fs&&s.sa&&s.fs(s.oun,un)){s.sa(un);return s}}}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf('Opera')<0){w.s_c=new Function("un","pg","ss","var s=this;"+c);return new s_c(un,pg,ss)}else s=new Function("un","pg","ss","var s=new Object;"+s_ft(c)+";return s");return s(un,pg,ss)}



	

		
		function getLanguageCode(siteCode) {
			var arrLangCode = new Array("es", "en", "de", "fr", "nl", "pt", "fr", "en", "es", "zh1", "es", "cs", "da", "et", "fi", "fr", "de", "el", "en", "zh2", "hu", "en", "id", "fa", "en", "he", "it", "ja", "ru", "ko", "lv", "lt", "en", "es", "nl", "en", "no", "es", "es", "en", "pl", "pt", "ru", "en", "en", "sl", "en", "es", "sv", "fr", "de", "zh", "th", "tr", "en", "en", "ua", "ru", "en", "vi", "en", "en", "en", "ro", "en","ar","en","fr","en","ar");
			var arrSiteCode = new Array("ar", "au", "at", "be_fr", "be", "br", "ca_fr", "ca", "cl", "cn", "co", "cz", "dk", "ee", "fi", "fr", "de", "gr", "hk_en", "hk", "hu", "in", "id", "iran", "ie", "il", "it", "jp", "kz_ru", "sec", "lv", "lt", "my", "mx", "nl", "nz", "no", "latin", "pe", "ph", "pl", "pt", "ru", "sa_en", "sg", "sk", "za", "es", "se", "ch_fr", "ch", "tw", "th", "tr", "us", "ae", "ua", "ua_ru", "gb", "vn", "uk", "global", "eu", "ro", "baltic","mea_ar","mea_en","africa_fr","africa_en","ae_ar");
			
			var langCode = "";
			
			for (var i=0; i<arrSiteCode.length; i++) {
				if (siteCode == arrSiteCode[i]) {
					langCode = arrLangCode[i];
					break;
				}
			}
			
			return langCode;
		}

	

	      function initVar() {
		s.pageName = s.server = s.channel = s.pageType = "";
		s.prop1 = s.prop2 = s.prop3 = s.prop4 = s.prop5 = s.prop6 = "";
		s.campaign = s.state = s.zip = s.events = s.products = s.purchaseID = "";
		s.eVar1 = s.eVar2 = s.eVar3 = s.eVar4 = s.eVar5 = s.eVar6= "";
		s.eVar11 = s.eVar37 = s.eVar38 = s.eVar39 ="";
		s.prop7 = s.prop8 = s.prop9 = s.prop10 = s.prop12 = "";
		s.prop15 = s.prop16 = s.prop17 = s.prop22 = s.prop23 = s.prop29 = "";
		s.eVar13 = s.eVar15 = s.eVar16 = s.eVar17 = s.eVar18 = s.eVar28 = s.eVar29 = s.eVar30 = "";	      	
		s.hier1 = "";
	      }



	
	    	String.prototype.trim = function() {
            		return this.replace(/(^\s*)|(\s*$)/gi, "");
       	        }
    
		function deleteSpace(str) {
			var s = "";
			for (var i=0; i<str.length; i++) {
				s += str.charAt(i).replace(" ", "");
			}
			return s;
		}
		
		function gup( name )
		{
			name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
			var regexS = "[\\?&]"+name+"=([^&#]*)";  
			var regex = new RegExp( regexS );  
			var results = regex.exec( window.location.href );  
			if( results == null )    return "";  
			else    return results[1];
		}

		
		function chkProductCategory( id )
		{	
			var target = document.getElementById( id );	
				

			if( target == undefined || target == null ) return false;
						
					
			if (target.getElementsByTagName( "strong" )[0] != undefined ) return "prd_detail"
			else if (target.getElementsByTagName( "b" )[0] != undefined ) return "acc_detail"
			else if (target.getElementsByTagName( "i" )[0] != undefined ) return "sup_detail"
			else if (target.getElementsByTagName( "a" )[0] != undefined ) return "other"
			else return "error";	
			
		}
		
		
		function chkProductCategoryLevel( id )
		{
			var target = document.getElementById( id );	
				
			if( target == undefined || target == null ) return false;
										
			if (target.getElementsByTagName( "strong" )[0] != undefined ||target.getElementsByTagName( "b" )[0] != undefined ) {
				if (target.getElementsByTagName( "a" ).length == 4) return "sub_sub_type"
				else return "sub_type"
				
			} else if (target.getElementsByTagName( "i" )[0] != undefined ) {
				if (target.getElementsByTagName( "a" ).length == 6) return "sub_sub_type"
				else return "sub_type"				
			} 					
		}

		
		
		function getProductInfo( id , tag )
		{
			var str = "";
			
			if ( id.getElementsByTagName(tag)[0] != undefined ) {
				var product = id.getElementsByTagName(tag);
				
				str = ":"+ product[0].innerHTML.trim();
				
				
				for ( var i = 1 ; i <product.length ; i++ )
				{
					str += ":" + product[ i ].innerHTML.trim();	
				}
				
				return str;     	
				
			} else return "";
			 	
			
		}
		

		function getTextNode( id )
		{
			
		    try {
			var target = document.getElementById( id );	
			var str = "";
			
		        

			if( target == undefined || target == null ) return false;

			if (target.getElementsByTagName( "a" )[0] != undefined){
				var hiers = target.getElementsByTagName( "a" );
				var consumer_product = target.getElementsByTagName( "strong" );
				var accessory_product = target.getElementsByTagName( "b" );
				var support_product = target.getElementsByTagName( "i" );

				

				str = hiers[ 0 ].innerHTML.trim();

				for( var i = 1 ; i < hiers.length ; i++ )
				{
					str += ":" + hiers[ i ].innerHTML.trim();
				}
	
			        str += getProductInfo(target, "strong");
			        str += getProductInfo(target, "b");
			        str += getProductInfo(target, "i");
			    
			}
			
			if(SplitedURL[4] == 'supportSearchResultView.do') {
				try {
					if (sorryResult != undefined || sorryResult != null ){
						str += ":" + sorryResult + ":no result";
					}
				} catch (e) {
					try {
						if (successResult != undefined || successResult != null ) {
							str += ":" + successResult + ":result";
						}
					} catch (e) {

					}
				}
			}

			return str;
		     } catch (e) {
		     
		     }
		     	
		}


		function getTextNodeEx( iframe_id,  id )
		{
			
		    try {
		    	
			var target = document.getElementById(iframe_id).contentWindow.document.getElementById( id );	
			var str = "";
			
		        

			if( target == undefined || target == null ) return false;

			if (target.getElementsByTagName( "a" )[0] != undefined){
				var hiers = target.getElementsByTagName( "a" );
				var consumer_product = target.getElementsByTagName( "strong" );
				var accessory_product = target.getElementsByTagName( "b" );
				var support_product = target.getElementsByTagName( "i" );

				

				str = hiers[ 0 ].innerHTML.trim();

				for( var i = 1 ; i < hiers.length ; i++ )
				{
					str += ":" + hiers[ i ].innerHTML.trim();
				}
	
			        str += getProductInfo(target, "strong");
			        str += getProductInfo(target, "b");
			        str += getProductInfo(target, "i");
			    
			}
			
			return str;
		     } catch (e) {
		     
		     }
		     	
		}



		var URL = unescape(window.location.href.replace( "http://", "" ));
		var SplitedURL = URL.split("?")[0].split("/");
	

		
		
		function getVisitStart(){
			var ref_url = document.referrer;

			
         	
         		if (ref_url) {
                      		var split_url;
                      		var domain_name;                   
                      		split_url = ref_url.split("/");
                      		cCode = split_url[3];
                      		if (!cCode) { return "external site"; }
 
                      		domain_name = split_url[2];
                      		if(domain_name.indexOf("samsung") >= 0) {
                                         if (cCode==getSiteCode()) {  
                                                if (domain_name.split(".")[1].length != 7) return "samsung domain";
                                                else  return; 
                                         } else { return "samsung domain"; }
                      		} else { return "external site"; }
             		} else return "typed/bookmarked";
         	
		}




		function tagPathindicator( site_cd, id ) 
		{

			var siteCode = site_cd;
			var prodtype = gup("pagetype");

			initVar(); 
			
			s.server = window.location.host; 
			s.prop1 = s.eVar1 = getLanguageCode(siteCode);
			s.prop2 = s.eVar2 = siteCode;
			
			
			try {
				if(getCookie("PreferBandwidth")){
					s.prop12 = getCookie("PreferBandwidth");
					s.prop12 = s.prop12.toLowerCase();			
                        	}else {
                        		s.prop12 = "high";
                        	}
                        } catch(e){
                        	
                        }

			var newPageNameENG = getTextNode( id );
			if ( newPageNameENG == false ) return false
			


			s.pageName = siteCode + ":" + newPageNameENG.toLowerCase();
			s.hier1 = s.pageName.replace(/:/gi, ">");
			
			
			if (prodtype.toLowerCase() == "type"){
				s.prop45 = newPageNameENG.split(":")[1].toLowerCase();
				s.prop22 = "product type page";
			} else if (prodtype.toLowerCase()=="subtype"){
				s.prop46 = newPageNameENG.split(":")[2].toLowerCase();
				s.prop22 = "product sub-type page";
			} else if (prodtype.toLowerCase()=="accsubtype") {
				s.prop46 = newPageNameENG.split(":")[2].toLowerCase();
				s.prop22 = "product sub-type page";

                        }				
			
			if (SplitedURL[ SplitedURL.length - 1 ].toLowerCase() == "type.do"){
				s.prop45 = newPageNameENG.split(":")[1].toLowerCase();
				s.prop22 = "product type page";
			} else if (SplitedURL[ SplitedURL.length - 1 ].toLowerCase() == "subtype.do") {
				s.prop46 = newPageNameENG.split(":")[2].toLowerCase();	
				s.prop22 = "product sub-type page";

			} else if (SplitedURL[ SplitedURL.length - 1 ].toLowerCase() == "acclist.do") {
			        s.prop46 = newPageNameENG.split(":")[2].toLowerCase();	
				s.prop22 = "product sub-type page";
			}
			
			
			
			if ( newPageNameENG.split(":")[0] != undefined ) {
				s.channel = siteCode + ":"+ newPageNameENG.split(":")[0].toLowerCase();
				s.prop3   = s.channel;
			}
			
			if ( newPageNameENG.split(":")[1] != undefined ) {
				s.prop4   = s.prop3 + ":" + newPageNameENG.split(":")[1].toLowerCase();
			}
			
			if ( newPageNameENG.split(":")[2] != undefined ) {
				s.prop5  = s.prop4 + ":" + newPageNameENG.split(":")[2].toLowerCase();
			}
			
			
			
			if ( chkProductCategory( id )  == "prd_detail" ){
				if (SplitedURL[3].toLowerCase() != "dealerlocator") s.events = "prodView,event2";

				s.products = ";" + siteCode + ":" + document.getElementById( "model_name" ).value;
				
				if (newPageNameENG.split(":")[5] != undefined ) { 
				       s.eVar39 = siteCode + ":" + newPageNameENG.split(":")[4].toLowerCase();
				       s.prop23 = s.prop5  + ":"+ newPageNameENG.split(":")[3].toLowerCase()+ ":" + newPageNameENG.split(":")[4].toLowerCase()+ ":" + newPageNameENG.split(":")[5].toLowerCase(); 
				}
				else { 
				       s.eVar39 = siteCode + ":" + newPageNameENG.split(":")[3].toLowerCase();
				       s.prop23 = s.prop5  + ":"+ newPageNameENG.split(":")[3].toLowerCase()+ ":" + newPageNameENG.split(":")[4].toLowerCase(); 
				}  
				s.eVar28 = document.getElementById( "pvi_type_name" ).value;
				s.eVar29 = document.getElementById( "pvi_subtype_name" ).value;
				s.eVar30 = document.getElementById( "pvi_project_name" ).value;
				s.eVar38 = siteCode + ":" + document.getElementById( "model_code" ).value;
				
				s.prop22 =  getVisitStart();

			}
			else if ( chkProductCategory( id )  == "acc_detail"  ) {
				if (SplitedURL[3].toLowerCase() != "dealerlocator") s.events = "prodView,event2";

				s.products = ";" + siteCode + ":" + document.getElementById( "model_name" ).value;
				s.eVar38 = siteCode +":" + document.getElementById( "model_code" ).value;

				if (newPageNameENG.split(":")[5] != undefined ) { 
				       s.eVar39 = siteCode + ":" + newPageNameENG.split(":")[4].toLowerCase();
				       s.prop23 = s.prop5  + ":"+ newPageNameENG.split(":")[3].toLowerCase()+ ":" + newPageNameENG.split(":")[4].toLowerCase()+ ":" + newPageNameENG.split(":")[5].toLowerCase(); 
				}
				else { 
				       s.eVar39 = siteCode + ":" + newPageNameENG.split(":")[3].toLowerCase();
				       s.prop23 = s.prop5  + ":"+ newPageNameENG.split(":")[3].toLowerCase()+ ":" + newPageNameENG.split(":")[4].toLowerCase(); 
				}  

				
				s.prop22 =  getVisitStart();
								
			}
			else if ( chkProductCategory( id ) == "sup_detail"   ) {
				
				s.events = "event16";					
				s.prop27 = newPageNameENG.split(":")[1].toLowerCase();
				
				if (chkProductCategoryLevel( id ) == "sub_sub_type") {
					s.prop28 = newPageNameENG.split(":")[6].toLowerCase();
					s.eVar13 = s.prop28;				
					if ( newPageNameENG.split(":")[7] != undefined && newPageNameENG.split(":")[7] != null )  {
						if ( newPageNameENG.split(":")[7].toLowerCase() != "result"&&newPageNameENG.split(":")[7].toLowerCase() != "no result")
						{
							s.prop29 = newPageNameENG.split(":")[7].toLowerCase(); 
						}
					}
				}
				else {
					s.prop28 = newPageNameENG.split(":")[5].toLowerCase();
					s.eVar13 = s.prop28;				
					if ( newPageNameENG.split(":")[6] != undefined && newPageNameENG.split(":")[6] != null ) {
						if ( newPageNameENG.split(":")[6].toLowerCase() != "result"&&newPageNameENG.split(":")[6].toLowerCase() != "no result")
						{
						   s.prop29 = newPageNameENG.split(":")[6].toLowerCase();
						}
					}
				}
				
				s.eVar14 = document.getElementById( "cms_type_name" ).value;
				s.eVar15 = document.getElementById( "cms_subtype_name" ).value;
				  
		       }
		       else {
		       	
						if ( document.getElementById( "event_set" ) != null )
						{
							s.events = document.getElementById( "event_set" ).value;
						 }
		       }
		       
		 
		
		       var s_code=s.t();if(s_code)document.write(s_code);
		   

		}

		function tagPathindicatorEx( site_cd,iframe_id, id ) 
		{

			var siteCode = site_cd;
			var prodtype = gup("pagetype");

			initVar(); 
		
			s.server = window.location.host; 
			s.prop1 = s.eVar1 = getLanguageCode(siteCode);
			s.prop2 = s.eVar2 = siteCode;
			
			try {
				if(getCookie("PreferBandwidth")){
					s.prop12 = getCookie("PreferBandwidth");
					s.prop12 = s.prop12.toLowerCase();			
	                        }else {
	                        	s.prop12 = "high";
	                        	}
                        } catch(e) 
                        {}

			var newPageNameENG = getTextNodeEx(iframe_id, id );
			
			if ( newPageNameENG == false ) return false
			

			s.pageName = siteCode + ":" + newPageNameENG.toLowerCase();
			s.hier1 = s.pageName.replace(/:/gi, ">");
			
			
			
			if ( newPageNameENG.split(":")[0] != undefined ) {
				s.channel = siteCode + ":"+ newPageNameENG.split(":")[0].toLowerCase();
				s.prop3   = s.channel;
			}
			
			if ( newPageNameENG.split(":")[1] != undefined ) {
				s.prop4   = s.prop3 + ":" + newPageNameENG.split(":")[1].toLowerCase();
			}
			
			if ( newPageNameENG.split(":")[2] != undefined ) {
				s.prop5  = s.prop4 + ":" + newPageNameENG.split(":")[2].toLowerCase();
			}
			
			
		
		       var s_code=s.t();if(s_code)document.write(s_code);
		   

		}
		
		function tagURL(site_cd) {
			var strUrl = "";
			strUrl = SplitedURL[ 1 ];
			var siteCode = site_cd;
			initVar(); 
			
			s.server = window.location.host; 
			s.prop1 = s.eVar1 = getLanguageCode(siteCode);
			s.prop2 = s.eVar2 = siteCode;
			
			

			try {
				if(getCookie("PreferBandwidth")){
					s.prop12 = getCookie("PreferBandwidth");
					s.prop12 = s.prop12.toLowerCase();			
	                        }
	                        else {
	                        	s.prop12 = "high";
	                        }
                        } catch(e)
                        {}

			for( var i = 2 ; i < SplitedURL.length ; i++ )
			{
				strUrl += ":" + SplitedURL[ i ];
			}	
			

	
			if (strUrl.lastIndexOf(":") == strUrl.length-1) { 
				 s.pageName = strUrl.toLowerCase() + "main"; 
			}else if (SplitedURL[SplitedURL.length - 1].toLowerCase() == "index.html") { 
				 s.pageName = strUrl.replace("index.html", "main"); 
			}
			else s.pageName = strUrl.toLowerCase();

			if (SplitedURL[1] != "") {								
				if (SplitedURL[2] == "") {
					s.pageName = siteCode+ ":home";
					s.channel = siteCode+ ":home";
					s.prop3 = s.channel;
                                        s.hier1 = s.pageName.replace(/:/gi, ">");
                                        s.prop22 = "homepage";
				} else if(SplitedURL[2] == "index.html"){
					s.pageName = siteCode+ ":home";
					s.channel = siteCode+ ":home";
					s.prop3 = s.channel;
                                        s.hier1 = s.pageName.replace(/:/gi, ">");
                                        s.prop22 = "homepage";
                                }
			}

                      


			if (SplitedURL[ SplitedURL.length - 1 ].toLowerCase() == "supportprddetail.do") return s.pageName;
			if (SplitedURL[ SplitedURL.length - 1 ].toLowerCase() == "supportsearchmodelresult.do") return s.pageName;
			if (SplitedURL[ SplitedURL.length - 1 ].toLowerCase() == "searchresult.do") return s.pageName;
			if (SplitedURL[ SplitedURL.length - 1 ].toLowerCase() == "espsearchresult.do") return s.pageName;
			if (SplitedURL[ SplitedURL.length - 1 ].toLowerCase() == "newssearch.do") return s.pageName;

			
			var s_code=s.t();if(s_code)document.write(s_code);
			
			return s.pageName;
		}
		
	

		function s_control_click(vLinkTrackVars, vLinkTrackEvents, vLinkTrackValues, vType, vTypeName) {
			var vSplitLinkTrackVars = vLinkTrackVars.split(',');
			var vSplitLinkTrackValues = "";
			

			if ( s_control_click_filter(vLinkTrackValues, vTypeName) == true ) return; 


			if (typeof(vLinkTrackValues)!="string")  vSplitLinkTrackValues = vLinkTrackValues ;
			else vSplitLinkTrackValues = vLinkTrackValues.split(',');
			

			
				
			s.linkTrackVars = vLinkTrackVars;
			s.linkTrackEvents = vLinkTrackEvents;
			
			for(var xFI = 0; xFI < vSplitLinkTrackVars.length; xFI++) {
				if(vSplitLinkTrackVars[xFI] == "products") {
				  s[vSplitLinkTrackVars[xFI]]= ";"+ vSplitLinkTrackValues[xFI].replace(";","");
				} else {
				  s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI].trim();
				}

			}
			
			s.tl(this, vType, vTypeName);
			s.linkTrackVars='none';
			s.linkTrackEvents='none';
		}


		function s_control_click_filter(vLinkTrackValues, vTypeName){
			
			var arrTypeNo = new Array("1", "2", "3", "4", "5", "6" ,"7", "8" ,"9", "10", "11", "12" ,"13","14","15","16","17","18","19","20");
			var arrTypeName  = new Array("product selector","product finding method","buy now step1","buy now","product interactions", "compare products","recently viewed","my saved products","dealer locator step 2","dealer locator searches : no results terms","product advisor clicks","predictive product search","search tab","product finding method & predictive product search","tell a friend","printer-friendly","product image usage","dealer locator step 1","dealer locator searches");
			var arrLinkTrackVarsUs = new Array("events,eVar20,prop5,eVar5", "prop5,eVar5", "products,events", "products,events,eVar2","products,events,eVar10","events","events","events","products,events","eVar36","eVar31,events","events,eVar14,prop15","prop1,prop3,prop5,eVar1,eVar5,events","prop5,eVar5,events,eVar14","products,events,eVar10","products,events,eVar10","products,events","products,events","products,events");
			var arrLinkTrackEventsUs = new Array("event42", "", "event14", "event10","event18","event38","event12","event37","event11","","event36","event34","event6","event33","event18","event18","event43","event35","event11");			
			var arrLinkTrackVarsGlobal = new Array("events,eVar20,prop22,eVar18","prop22,eVar18","products,events","products,events,eVar27","products,events,eVar9","events","events","events","products,events","eVar36","eVar31,events","events,eVar19,prop21","prop6,prop8,prop22,eVar6,eVar18,events","prop22,eVar18,events,eVar19","products,events,eVar9","products,events,eVar9","products,events","products,events","products,events");
			var arrLinkTrackEventsGlobal = new Array("event13", "", "event32", "event33","event3","event48","event42","event47","event35", "","event17","event12","event5","event11","event3","event3","event43","event29","event35");			
			
			var siteCode = getSiteCode();

			if (typeof(vLinkTrackValues)!="string")  vSplitLinkTrackValues = vLinkTrackValues;
			else vSplitLinkTrackValues = vLinkTrackValues.split(',');
			
			
			try {
				for (var i=0; i<arrTypeNo.length; i++) {
				
					if (vTypeName == arrTypeNo[i] || vTypeName.toLowerCase()== arrTypeName[i]) {
						if ( siteCode != "us" ) {
							s.linkTrackVars = arrLinkTrackVarsGlobal[i];
							s.linkTrackEvents = arrLinkTrackEventsGlobal[i];
							for(var xFI = 0; xFI < arrLinkTrackVarsGlobal[i].split(',').length; xFI++) {
								if(arrLinkTrackVarsGlobal[i].split(',')[xFI] == "products") {
								  s[arrLinkTrackVarsGlobal[i].split(',')[xFI]]= ";"+ siteCode + ":" + vSplitLinkTrackValues[xFI].replace(";","");
								} else if (arrLinkTrackVarsGlobal[i].split(',')[xFI] == "events") {
								  s[arrLinkTrackVarsGlobal[i].split(',')[xFI]] = arrLinkTrackEventsGlobal[i];	
								} else {
								  s[arrLinkTrackVarsGlobal[i].split(',')[xFI]]= vSplitLinkTrackValues[xFI].trim();
								}
				
							}
							s.tl(this, 'o', vTypeName);
							s.linkTrackVars='none';
							s.linkTrackEvents='none';
							return true;
														
						} else  return false;
					}
				}
			} catch(e) {
				
			    return false;
			}
		
			return false;
		}
		

		function s_control_click_in(vLinkTrackVars, vLinkTrackEvents, vLinkTrackValues, vType, vTypeName, vThisValue) {
	
 			var vSplitLinkTrackVars = vLinkTrackVars.split(',');
			var vSplitLinkTrackValues = "";

			if (typeof(vLinkTrackValues)!="string")  vSplitLinkTrackValues = vLinkTrackValues;
			else vSplitLinkTrackValues = vLinkTrackValues.split(',');

			if(vThisValue.href.indexOf("samsung.com") != -1){
				vLinkTrackEvents = "event32";
				vSplitLinkTrackValues[1] = "event32";
				vTypeName = "buy online by webcms(in)";		
			} 
				
			s.linkTrackVars = vLinkTrackVars;
			s.linkTrackEvents = vLinkTrackEvents;
			
			for(var xFI = 0; xFI < vSplitLinkTrackVars.length; xFI++) {
				if(vSplitLinkTrackVars[xFI] == "products") {
				  s[vSplitLinkTrackVars[xFI]]= ";"+ vSplitLinkTrackValues[xFI].replace(";","");
				} else {
				  s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI].trim();
				}

			}
			
			s.tl(this, vType, vTypeName);
			s.linkTrackVars='none';
			s.linkTrackEvents='none';
		}
		
		
		function s_control_click_detailLink(vButtonType, vModelName, vThisValue) {

			var siteCode = getSiteCode();

			var vLinkTrackVars = "products,events";
			var vLinkTrackEvents = "";
			var vLinkTrackValues = "";
			var vType = "o";
			var vTypeName = "";

			if (vButtonType == "SHOPNOW_LOCALRETAILER") {

				vLinkTrackEvents = "event29";
				vLinkTrackValues = ";" + vModelName + "," + vLinkTrackEvents;
				vTypeName = "Dealer Locator Step 1";

			} else if (vButtonType == "SHOPNOW_ONLINERETAILER") {

				vLinkTrackEvents = "event33";
				vLinkTrackValues = ";" + siteCode + ":" + vModelName + "," + vLinkTrackEvents;
				vTypeName = "buy online by webcms";

			}
			
			s_control_click(vLinkTrackVars, vLinkTrackEvents, vLinkTrackValues, vType, vTypeName);
		}

		
		function s_control_clickEx(vLinkTrackVars, vLinkTrackEvents, vLinkTrackValues, vType, vTypeName) {
			var vSplitLinkTrackVars = vLinkTrackVars.split(',');
			var vSplitLinkTrackValues = vLinkTrackValues;
			
						

			if ( s_control_click_filter(vLinkTrackValues, vTypeName) == true ) return; 

			
			s.linkTrackVars = vLinkTrackVars;
			s.linkTrackEvents = vLinkTrackEvents;
			
			for(var xFI = 0; xFI < vSplitLinkTrackVars.length; xFI++) {
				if(vSplitLinkTrackVars[xFI] == "products") {
				  s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI];
				} else {
				  s[vSplitLinkTrackVars[xFI]]= vSplitLinkTrackValues[xFI].trim();
				}

			}
			
			s.tl(this, vType, vTypeName);
			s.linkTrackVars='none';
			s.linkTrackEvents='none';
		}



