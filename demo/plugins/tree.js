
/*!
 * name:tree.js
 * description:strong tree
 * version:0.0.1
 * author:mocheer
 * license:MIT
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	__webpack_require__(1);

	var _Trunk = __webpack_require__(5);

	var _Trunk2 = _interopRequireDefault(_Trunk);

	__webpack_require__(6);

	__webpack_require__(16);

	__webpack_require__(20);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//

	// 基础类库

	// 拓展类库

	// 核心类库
	exports.default = _Trunk2.default;
	// React 插件
	//+build tree.js
	// 夹层类库

	window.T = _Trunk2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	if (!Object.assign) {
	    Object.assign = function (target) {
	        var source = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            source[_i - 1] = arguments[_i];
	        }
	        var from, to = Object(target), hasOwnProperty = Object.prototype.hasOwnProperty;
	        for (var i = 0, l = source.length; i < l; i++) {
	            from = Object(source[i]);
	            for (var key in from) {
	                if (hasOwnProperty.call(from, key)) {
	                    to[key] = from[key];
	                }
	            }
	        }
	        return to;
	    };
	}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	if (!Array.prototype.find) {
	    Array.prototype.find = function find(predicate, thisArg) {
	        if (this == null) {
	            throw TypeError();
	        }
	        var len = this.length, ctx = thisArg || this;
	        if (len === 0) {
	            return undefined;
	        }
	        for (var i = 0, item = void 0; i < len; i++) {
	            item = this[i];
	            if (predicate.call(ctx, item, i, this)) {
	                return item;
	            }
	        }
	        return undefined;
	    };
	}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	if (!String.prototype.repeat) {
	    String.prototype.repeat = function (count) {
	        if (this == null) {
	            throw TypeError();
	        }
	        var string = String(this);
	        var n = count ? Number(count) : 0;
	        if (n != n) {
	            n = 0;
	        }
	        if (n < 0 || n == Infinity) {
	            throw RangeError();
	        }
	        var result = '';
	        while (n) {
	            if (n % 2 == 1) {
	                result += string;
	            }
	            if (n > 1) {
	                string += string;
	            }
	            n >>= 1;
	        }
	        return result;
	    };
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var T = function (path, tag, className, props) {
	        var branchs = T.branchs, node = branchs[path];
	        if (tag === void 0) {
	            return node;
	        }
	        if (!node) {
	            var index = path.lastIndexOf('.'), parent_1;
	            if (index > 0) {
	                parent_1 = T(path.slice(0, index), 'div');
	            }
	            else {
	                parent_1 = T.root;
	            }
	            if (className === void 0) {
	                className = path.slice(index + 1);
	            }
	            node = T.create(tag, className, parent_1);
	            props && T.prop(node, props);
	            branchs[path] = node;
	        }
	        return node;
	    };
	    T.config = function (conf) {
	        var mount = conf.mount, router = conf.router, req = conf.req, ajax = conf.ajax, task = conf.task, data = conf.data;
	        mount && T.mount(mount);
	        T.meta = data;
	        req && T.require.config(req);
	        ajax && T.Ajax.config(ajax);
	        router && T.router.config(router);
	        task && T.task.config(task);
	    };
	    T.mount = function (node) {
	        T.root = T.create('div', 'T', node);
	        T.branchs = {};
	        T.leaves = {};
	        T.meta = {};
	    };
	    T.unmount = function () {
	        delete T.root;
	        delete T.branchs;
	        delete T.leaves;
	        delete T.meta;
	    };
	    T.moveTo = function (node) {
	        T.root.parentNode.removeChild(T.root);
	        node && node.appendChild(T.root);
	    };
	    T.create = function (tag, className, parent) {
	        var el = document.createElement(tag);
	        if (className)
	            el.className = className;
	        if (parent)
	            parent.appendChild(el);
	        return el;
	    };
	    T.fork = function (name, branch, node) {
	        var branchs = T.branchs, lastNode = branchs[branch];
	        if (!lastNode) {
	            throw 'fork error!';
	        }
	        node = node || T.create('div', name);
	        lastNode.parentNode.insertBefore(node, lastNode);
	        branchs[name] = node;
	        return node;
	    };
	    T.set = function (name, style) {
	        var el = T.branchs[name];
	        if (el) {
	            if (typeof style === 'string') {
	                el.className = style;
	            }
	            else {
	                for (var key in style) {
	                    if (style.hasOwnProperty(key)) {
	                        el.style[key] = style[key];
	                    }
	                }
	            }
	        }
	    };
	    T.prop = function (el, props) {
	        var k;
	        for (k in props) {
	            if (props.hasOwnProperty(k)) {
	                el[k] = props[k];
	            }
	        }
	    };
	    T.attr = function (el, attrs) {
	        var k, v;
	        for (k in attrs) {
	            if (attrs.hasOwnProperty(k)) {
	                v = attrs[k];
	                if (v !== null) {
	                    el.setAttribute(k, v + '');
	                }
	                else {
	                    el.removeAttribute(k);
	                }
	            }
	        }
	    };
	    T.remove = function (name) {
	        var branchs = T.branchs, el = branchs[name];
	        if (el) {
	            delete branchs[name];
	            el.parentNode.removeChild(el);
	        }
	    };
	    T.empty = function (el) {
	        if (el === void 0) {
	            el = T.root;
	        }
	        while (el.firstChild) {
	            el.removeChild(el.firstChild);
	        }
	    };
	    T.leaf = function (name, leaf) {
	        var leaves = T.leaves;
	        if (leaf === void 0) {
	            return leaves[name];
	        }
	        if (leaves[name]) {
	            console.log('warn:update the leaf:', name);
	        }
	        leaves[name] = leaf;
	        T.do('leafload_' + name, leaf);
	    };
	    T.data = function (key, value) {
	        var meta = T.meta, old = meta[key];
	        if (value === void 0) {
	            return old;
	        }
	        meta[key] = value;
	        T.do('datachange_' + key, { old: old, new: value });
	    };
	    T.pop = function (name, style) {
	        var el = T('popbox.' + name, 'div', 'pop');
	        return;
	    };
	    T.unpop = function (name) {
	        if (name === void 0) {
	            T.remove('popbox');
	        }
	        else {
	            T.remove('popbox.' + name);
	        }
	    };
	    exports.default = T;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(5), __webpack_require__(8), __webpack_require__(9), __webpack_require__(10), __webpack_require__(7), __webpack_require__(11), __webpack_require__(12), __webpack_require__(13), __webpack_require__(14), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Trunk_1, Ajax_1, Router_1, Action_1, Clock_1, Timer_1, Task_1, Fmtter_1) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    Trunk_1.default.Ajax = Ajax_1.default;
	    Trunk_1.default.ajax = function (conf) {
	        return new Ajax_1.default(conf).load();
	    };
	    Trunk_1.default.getJSON = function (url, data, callback) {
	        return new Ajax_1.default({ url: url, data: data, success: callback }).load();
	    };
	    Trunk_1.default.Router = Router_1.default;
	    Trunk_1.default.router = new Router_1.default();
	    Trunk_1.default.Action = Action_1.default;
	    var action = Trunk_1.default.action = new Action_1.default();
	    Trunk_1.default.on = function (type, listener, priority) {
	        action.on(type, listener, priority);
	    };
	    Trunk_1.default.cancel = function (type, listener) {
	        action.cancel(type, listener);
	    };
	    Trunk_1.default.do = function (type, data) {
	        action.do(type, data);
	    };
	    Trunk_1.default.Clock = Clock_1.default;
	    Trunk_1.default.clock = function (t) {
	        return new Clock_1.default(t || Trunk_1.default.data('date'));
	    };
	    Trunk_1.default.Timer = Timer_1.default;
	    Trunk_1.default.timer = function (task, delay) {
	        return new Timer_1.default(delay, 0).start(task);
	    };
	    Trunk_1.default.Task = Task_1.default;
	    Trunk_1.default.task = new Task_1.default(60000, 500);
	    Trunk_1.default.Fmtter = Fmtter_1.default;
	    var fmtter = Trunk_1.default.fmtter = new Fmtter_1.default();
	    Trunk_1.default.fmt = function (str, args) {
	        return fmtter.fmt(str, args);
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var Clock = (function () {
	        function Clock(t) {
	            if (typeof t === 'string') {
	                t = Clock.parse(t);
	            }
	            this.date = t || new Date();
	        }
	        Clock.prototype.addHour = function (h) {
	            return new Date(this.date.valueOf() + 3600000 * h);
	        };
	        Clock.prototype.get8h = function (divide) {
	            if (divide === void 0) { divide = 8; }
	            var date = this.date, newDate;
	            if (date.getHours() > divide) {
	                newDate = new Date(date);
	            }
	            else {
	                newDate = new Date(date.valueOf() - 86400000);
	            }
	            newDate.setHours(8, 0, 0);
	            return newDate;
	        };
	        Clock.prototype.fmt = function (fmt) {
	            return Clock.fmt(this.date, fmt);
	        };
	        Clock.getYears = function (min, max) {
	            var years = [min];
	            if (max == void 0) {
	                max = new Date().getFullYear();
	            }
	            while (min < max) {
	                years.push(++min);
	            }
	            return years;
	        };
	        Clock.getMonths = function () {
	            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	        };
	        Clock.fmt = function (date, fmt) {
	            if (fmt === void 0) {
	                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	            }
	            else {
	                var o = {
	                    "M+": date.getMonth() + 1,
	                    "D+": date.getDate(),
	                    "h+": date.getHours(),
	                    "m+": date.getMinutes(),
	                    "s+": date.getSeconds(),
	                    "S": date.getMilliseconds()
	                };
	                if (/(Y+)/.test(fmt))
	                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	                for (var k in o)
	                    if (o.hasOwnProperty(k) && new RegExp("(" + k + ")").test(fmt))
	                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	                return fmt;
	            }
	        };
	        Clock.parse = function (t) {
	            var p = t.indexOf('T') > 0 ? 'T' : ' ', ps = t.split(p), pd = ps[0].split("-"), pt = ps.length > 1 ? ps[1].split(":") : [0, 0, 0];
	            return new Date(pd[0], pd[1] - 1, pd[2], pt[0], pt[1], pt[2]);
	        };
	        Clock.sub = function (d1, d2) {
	            if (typeof d1 === 'string') {
	                d1 = Clock.parse(d1);
	            }
	            if (typeof d2 === 'string') {
	                d2 = Clock.parse(d2);
	            }
	            return d1.valueOf() - d2.valueOf();
	        };
	        return Clock;
	    }());
	    exports.default = Clock;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var Ajax = (function () {
	        function Ajax(conf) {
	            this.conf = Object.assign({}, Ajax.conf, conf);
	        }
	        Ajax.config = function (conf) {
	            Object.assign(Ajax.conf, conf);
	        };
	        Ajax.dataFilter = function (xmlhttp, format) {
	            var data;
	            switch (format) {
	                case "json":
	                    data = eval("(" + xmlhttp.responseText + ")");
	                    break;
	                case "xml":
	                    data = xmlhttp.responseXML;
	                    break;
	                default:
	                    data = xmlhttp.responseText;
	                    break;
	            }
	            return data;
	        };
	        Ajax.prototype.get = function (conf) {
	            conf = conf || {};
	            conf.method = "GET";
	            this.load(conf);
	        };
	        Ajax.prototype.post = function (conf) {
	            conf = conf || {};
	            conf.method = "POST";
	            this.load(conf);
	        };
	        Ajax.prototype.load = function (conf) {
	            conf = Object.assign({}, Ajax.conf, this.conf, conf);
	            conf.inject && conf.inject.call(this, conf);
	            var url = conf.url, success = conf.success, err = conf.err, f = conf.f, method = conf.method, data = conf.data, async = conf.async, cache = conf.cache, context = conf.context, contentType = conf.contentType, dataFilter = conf.dataFilter, xmlhttp, sendString = [], isIE = T.isIE();
	            if (url.indexOf('http') !== 0) {
	                url = conf.baseUrl + url;
	            }
	            if (typeof data === "string") {
	                var tmpArr = data.split('&');
	                for (var i = 0, j = tmpArr.length; i < j; i++) {
	                    var datum = tmpArr[i].split('=');
	                    sendString.push(encodeURIComponent(datum[0]) + "=" + encodeURIComponent(datum[1]));
	                }
	            }
	            else if (T.isPostData(data)) {
	                for (var k in data) {
	                    var datum = data[k];
	                    if (T.isArray(datum)) {
	                        for (var i_1 = 0, j_1 = datum.length; i_1 < j_1; i_1++) {
	                            sendString.push(encodeURIComponent(k) + "[]=" + encodeURIComponent(datum[i_1]));
	                        }
	                    }
	                    else {
	                        sendString.push(encodeURIComponent(k) + "=" + encodeURIComponent(datum));
	                    }
	                }
	            }
	            sendString = sendString.join('&');
	            if (isIE && isIE < 10 && typeof XDomainRequest != 'undefined') {
	                xmlhttp = new XDomainRequest();
	                xmlhttp.onload = function () {
	                    success && success.call(context, dataFilter(xmlhttp, f));
	                };
	                xmlhttp.onerror = function () {
	                    err && err.call(context, xmlhttp.responseText);
	                };
	                if (method === "GET") {
	                    if (sendString)
	                        url += "?" + sendString;
	                    xmlhttp.open(method, url);
	                    xmlhttp.send();
	                }
	                else {
	                    xmlhttp.open(method, url);
	                    xmlhttp.send(sendString);
	                }
	            }
	            else {
	                xmlhttp = new XMLHttpRequest();
	                xmlhttp.onreadystatechange = function () {
	                    if (xmlhttp.readyState === 4) {
	                        if (xmlhttp.status === 200) {
	                            if (success) {
	                                success.call(context, dataFilter(xmlhttp, f));
	                            }
	                        }
	                        else {
	                            err && err.call(context, xmlhttp.responseText);
	                            console.log("ajax error:" + xmlhttp.readyState + " Status " + xmlhttp.status);
	                        }
	                    }
	                };
	                if (method === "GET") {
	                    if (cache === false) {
	                        xmlhttp.setRequestHeader("If-Modified-Since", "0");
	                    }
	                    if (sendString)
	                        url += "?" + sendString;
	                    xmlhttp.open(method, url);
	                    xmlhttp.send();
	                }
	                else {
	                    xmlhttp.open(method, url, async);
	                    xmlhttp.setRequestHeader("Content-Type", contentType);
	                    xmlhttp.send(sendString);
	                }
	            }
	            return this;
	        };
	        return Ajax;
	    }());
	    Ajax.conf = {
	        baseUrl: '',
	        method: 'GET',
	        async: true,
	        dataFilter: Ajax.dataFilter,
	        contentType: 'application/x-www-form-urlencoded'
	    };
	    exports.default = Ajax;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var Router = (function () {
	        function Router() {
	            this.route = new Route();
	            this.listen();
	        }
	        Router.prototype.listen = function () {
	            var _this = this;
	            var refresh = function (e) {
	                _this.exec();
	            };
	            window.addEventListener('load', refresh, false);
	            window.addEventListener('hashchange', refresh, false);
	        };
	        Router.prototype.config = function (conf) {
	            var route = conf.route, go = conf.go;
	            this.route.config(route);
	            if (go && !location.hash) {
	                location.hash = go;
	            }
	            else {
	                this.exec();
	            }
	        };
	        Router.prototype.exec = function () {
	            var cpath = location.hash.slice(1) || '/', params = cpath.split('?'), cdata;
	            cpath = params[0];
	            params = params[1];
	            if (params) {
	                params = params.split('&');
	                cdata = {};
	                for (var i = 0, l = params.length, kv = void 0; i < l; i++) {
	                    kv = params[i].split("=");
	                    cdata[kv[0]] = kv[1];
	                }
	            }
	            this.route.go(this.path, cpath, cdata);
	            this.path = cpath;
	            this.data = cdata;
	        };
	        Router.prototype.go = function (rout) {
	            location.hash = rout;
	        };
	        Router.prototype.pass = function (rout) {
	            return (this.path !== void 0 && this.path.indexOf(rout) === 0);
	        };
	        Router.prototype.on = function (path, callback, delay) {
	            !delay && this.pass(path) && callback.call(this, this.data);
	            return this.route.config({ path: path, on: callback });
	        };
	        Router.prototype.once = function (path, callback) {
	            if (this.pass(path)) {
	                callback.call(this, this.data);
	                return;
	            }
	            return this.route.config({ path: path, once: callback });
	        };
	        Router.prototype.exit = function (path, callback) {
	            return this.route.config({ path: path, exit: callback });
	        };
	        return Router;
	    }());
	    exports.default = Router;
	    var Route = (function () {
	        function Route() {
	            this.way = this.createWay('/');
	        }
	        Route.prototype.createWay = function (path) {
	            return { path: path, on: [], exit: [], once: [] };
	        };
	        Route.prototype.config = function (conf) {
	            var _this = this;
	            var way = this.way, get = function (conf) {
	                var path = conf.path;
	                if (path.length > 1) {
	                    conf = { path: '/', children: conf };
	                }
	                return conf;
	            };
	            conf = get(conf);
	            if (conf.path === way.path) {
	                var set_1 = function (conf, way) {
	                    var on = conf.on, exit = conf.exit, once = conf.once, deps = conf.deps, children = conf.children, leaf = conf.leaf, suspend = conf.suspend, removes = conf.removes;
	                    on && way.on.push(on);
	                    once && way.once.push(once);
	                    exit && way.exit.push(exit);
	                    way.leaf = leaf;
	                    if (deps) {
	                        if (!way.deps) {
	                            way.deps = deps;
	                        }
	                        else {
	                            way.deps = way.deps.concat(deps);
	                        }
	                    }
	                    if (suspend) {
	                        if (!way.suspend) {
	                            way.suspend = suspend;
	                        }
	                        else {
	                            way.suspend = way.suspend.concat(suspend);
	                        }
	                    }
	                    if (removes) {
	                        if (!way.removes) {
	                            way.removes = removes;
	                        }
	                        else {
	                            way.removes = way.removes.concat(removes);
	                        }
	                    }
	                    if (children) {
	                        var pchildren_1 = way.children;
	                        if (!pchildren_1) {
	                            pchildren_1 = way.children = [];
	                        }
	                        children.map(function (conf) {
	                            var flag = pchildren_1.some(function (way) {
	                                var flag = conf.path.indexOf(way.path) == 0 && (conf.path.length == way.path.length || conf.path.charAt(way.path.length) == '/');
	                                if (flag) {
	                                    set_1(conf, way);
	                                }
	                                return flag;
	                            });
	                            if (!flag) {
	                                var way_1 = _this.createWay(conf.path);
	                                pchildren_1.push(way_1);
	                                set_1(conf, way_1);
	                            }
	                        });
	                    }
	                };
	                set_1(conf, way);
	            }
	        };
	        Route.prototype.go = function (from, to, data) {
	            var go = function (way) {
	                var path = way.path;
	                if (to.indexOf(path) === 0 && (path === '/' || path.length == to.length || to.charAt(path.length) == '/')) {
	                    var once_1 = way.once.concat(way.on), deps = way.deps, children_1 = way.children, suspend = way.suspend, removes = way.removes, leaf = way.leaf;
	                    if (suspend) {
	                        var leaves = T.data('leaf'), paths_1 = (leaves && leaves.paths) || {};
	                        suspend.map(function (ita) {
	                            if (paths_1[ita]) {
	                                var mount = paths_1[ita].mount || path[ita].deps[0];
	                                if (T.branchs[mount]) {
	                                    T.branchs[mount].style.display = 'none';
	                                }
	                                if (T.leaves[mount]) {
	                                    T.leaves[mount].suspend && T.leaves[mount].suspend();
	                                }
	                            }
	                        });
	                    }
	                    if (leaf) {
	                        var leaves = T.data('leaf'), paths_2 = (leaves && leaves.paths) || {};
	                        leaf.map(function (ita) {
	                            if (paths_2[ita]) {
	                                var mount = paths_2[ita].mount || path[ita].deps[0];
	                                if (T.branchs[mount]) {
	                                    T.branchs[mount].style.display = 'block';
	                                }
	                                if (T.leaves[mount]) {
	                                    T.leaves[mount].resume && T.leaves[mount].resume();
	                                }
	                            }
	                        });
	                    }
	                    if (deps) {
	                        T.require(deps, function () {
	                            var args = [];
	                            for (var _i = 0; _i < arguments.length; _i++) {
	                                args[_i] = arguments[_i];
	                            }
	                            args.unshift(data);
	                            once_1.map(function (func) {
	                                func.apply(null, args);
	                            });
	                            way.leaf && T.add(way.leaf);
	                            children_1 && children_1.map(function (way) { go(way); });
	                        });
	                    }
	                    else {
	                        once_1.map(function (func) {
	                            func(data);
	                        });
	                        way.leaf && T.add(way.leaf);
	                        children_1 && children_1.map(function (way) { go(way); });
	                    }
	                    way.once = [];
	                    if (removes) {
	                        var leaves = T.data('leaf'), paths_3 = (leaves && leaves.paths) || {};
	                        removes.map(function (ita) {
	                            if (paths_3[ita]) {
	                                var mount = paths_3[ita].mount || path[ita].deps[0];
	                                T.remove(mount);
	                            }
	                        });
	                    }
	                }
	                else if (from && from.indexOf(path) === 0) {
	                    way.exit.map(function (func) {
	                        func(data);
	                    });
	                }
	            };
	            go(this.way);
	        };
	        return Route;
	    }());
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var Action = (function () {
	        function Action() {
	            this.ls = {};
	        }
	        Action.prototype.on = function (type, listener, priority) {
	            var ls = this.ls[type];
	            if (!ls) {
	                this.ls[type] = [listener];
	            }
	            else {
	                if (priority === void 0 || priority > ls.length) {
	                    ls.push(listener);
	                }
	                else {
	                    ls.splice(priority, 0, listener);
	                }
	            }
	        };
	        Action.prototype.do = function (type, data) {
	            if (!type) {
	                throw 'error: action is empty !';
	            }
	            var ls = this.ls[type];
	            if (ls) {
	                ls.forEach(function (callback) {
	                    callback(data);
	                });
	            }
	        };
	        Action.prototype.cancel = function (type, listener) {
	            if (!listener) {
	                delete this.ls[type];
	                return;
	            }
	            var ls = this.ls[type];
	            if (ls) {
	                var index = ls.indexOf(listener);
	                if (index !== -1) {
	                    if (ls.length === 1) {
	                        delete this[type];
	                    }
	                    else {
	                        ls.splice(index, 1);
	                    }
	                }
	            }
	        };
	        Action.prototype.clear = function () {
	            this.ls = {};
	        };
	        return Action;
	    }());
	    exports.default = Action;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var Timer = (function () {
	        function Timer(delay, num) {
	            this.delay = delay;
	            this.num = num;
	        }
	        Timer.prototype.start = function (task) {
	            if (task !== void 0) {
	                this.task = task;
	            }
	            this.reset().run();
	            return this;
	        };
	        Timer.prototype.run = function () {
	            var _this = this;
	            this.cid = setTimeout(function () {
	                _this.task.call(_this, null);
	                if (!_this.num || _this.count < _this.num) {
	                    _this.count++;
	                    _this.run();
	                }
	                else {
	                    _this.stop();
	                }
	            }, this.delay);
	        };
	        Timer.prototype.stop = function () {
	            if (this.cid) {
	                clearTimeout(this.cid);
	                this.cid = null;
	            }
	        };
	        Timer.prototype.reset = function () {
	            this.stop();
	            this.count = 0;
	            return this;
	        };
	        return Timer;
	    }());
	    exports.default = Timer;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var Task = (function () {
	        function Task(delay, interval) {
	            this.delay = delay;
	            this.interval = interval;
	        }
	        Task.prototype.config = function (conf) {
	            var delay = conf.delay, interval = conf.interval;
	            this.delay = delay;
	            this.interval = interval;
	        };
	        Task.prototype.add = function (callback, delay, check) {
	            var tasks = this.tasks, task = {
	                time: new Date().getTime() + delay,
	                delay: delay,
	                check: check
	            };
	            if (!tasks) {
	                tasks = this.tasks = [];
	            }
	            tasks.push(task);
	            this.start();
	            return task;
	        };
	        Task.prototype.remove = function (task) {
	            var tasks = this.tasks;
	            if (!tasks) {
	                return;
	            }
	            if (tasks.indexOf(task) != -1) {
	                tasks.splice(task, 1);
	            }
	            if (tasks.length === 0) {
	                this.tasks = null;
	                this.stop();
	            }
	        };
	        Task.prototype.start = function () {
	            if (!this.running) {
	                this.cid = setInterval(this.run, this.delay);
	                this.running = true;
	            }
	        };
	        Task.prototype.run = function () {
	            if (this.rtasks) {
	                console.log("warn:tasks is running!");
	                return;
	            }
	            var tasks = this.tasks, task, now = new Date().getTime(), rtasks = this.rtasks = [];
	            for (var i = 0, l = tasks.length; i < l; i++) {
	                task = tasks[i];
	                if (task.time > now) {
	                    task.time += task.delay;
	                    rtasks.push(task);
	                }
	            }
	            if (rtasks.length > 0) {
	                this.runTask();
	            }
	            else {
	                this.rtasks = null;
	            }
	        };
	        Task.prototype.runTask = function () {
	            var rtasks = this.rtasks, task = rtasks.shift();
	            if ((!task.check || task.check())) {
	                task.callback();
	            }
	            if (rtasks.length > 0) {
	                setTimeout(this.runTask.bind(this), this.interval);
	            }
	            else {
	                this.rtasks = null;
	            }
	        };
	        Task.prototype.stop = function () {
	            if (this.cid) {
	                clearInterval(this.cid);
	                this.cid = null;
	                this.running = false;
	            }
	        };
	        return Task;
	    }());
	    exports.default = Task;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var Fmtter = (function () {
	        function Fmtter() {
	            this.regexp = /\{([^}]+)\}/g;
	        }
	        Fmtter.prototype.dateFmt = function (str, clock) {
	            return str.replace(this.regexp, function (match, key) {
	                return clock.fmt(key);
	            });
	        };
	        Fmtter.prototype.stringFmt = function (str, args) {
	            return str.replace(this.regexp, function (match, key) {
	                return args[key];
	            });
	        };
	        Fmtter.prototype.dataFmt = function (str, args) {
	            return str.replace(this.regexp, function (match, key) {
	                var v = args;
	                if (args[key]) {
	                    v = args[key];
	                }
	                else {
	                    var ks = key.split('.');
	                    while (ks.length > 0) {
	                        key = ks.shift();
	                        if (v[key]) {
	                            if (T.isFunction(v[key])) {
	                                v = v[key](ks.shift());
	                            }
	                            else {
	                                v = v[key];
	                            }
	                        }
	                        else {
	                            break;
	                        }
	                    }
	                }
	                if (T.isFunction(v)) {
	                    v = v();
	                }
	                return v;
	            });
	        };
	        Fmtter.prototype.fmt = function (str, args) {
	            var format;
	            if (args instanceof T.Clock) {
	                return this.dateFmt(str, args);
	            }
	            else {
	                return this.dataFmt(str, args);
	            }
	        };
	        return Fmtter;
	    }());
	    exports.default = Fmtter;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Trunk_1) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    Trunk_1.default.isIE = function () {
	        if ("ActiveXObject" in window) {
	            if (/MSIE (\d+)/.test(navigator.userAgent)) {
	                return RegExp["$1"];
	            }
	            return 11;
	        }
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Trunk_1) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var op = Object.prototype, ostring = op.toString;
	    Trunk_1.default.isArray = function (v) {
	        return ostring.call(v) === '[object Array]';
	    };
	    Trunk_1.default.isFunction = function (v) {
	        return ostring.call(v) === '[object Function]';
	    };
	    Trunk_1.default.isPostData = function (v) {
	        return typeof v === 'object' && !(v instanceof String || (FormData && v instanceof FormData));
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(5), __webpack_require__(17), __webpack_require__(18), __webpack_require__(19)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Trunk_1, ZCode, Store_1, Handler_1) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    Trunk_1.default.ZCode = ZCode;
	    Trunk_1.default.Store = Store_1.default;
	    Trunk_1.default.Handler = Handler_1.default;
	    Trunk_1.default.handler = function (data) {
	        return new Handler_1.default(data);
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    function fmt(code, radix) {
	        if (radix === void 0) { radix = 15; }
	        code = code.trim();
	        while (code.length < radix) {
	            code += "0";
	        }
	        if (code.length > radix) {
	            code.slice(0, radix);
	        }
	        return code;
	    }
	    exports.fmt = fmt;
	    function trim(code) {
	        code = code.trim();
	        var l = code.length, triming = function (index, str) {
	            if (l > index && code.slice(index, index + str.length) === str) {
	                l = index;
	                return true;
	            }
	        };
	        triming(12, '000') && triming(9, '000') && triming(6, '000') && triming(4, '00');
	        return code.slice(0, l);
	    }
	    exports.trim = trim;
	    function eq(c1, c2) {
	        return fmt(c1) === fmt(c2);
	    }
	    exports.eq = eq;
	    function filter(pcode, data, key) {
	        pcode = trim(pcode);
	        return data.filter(function (item, index, array) {
	            return item[key] && item[key].indexOf(pcode) === 0;
	        });
	    }
	    exports.filter = filter;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(10), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Action_1, Ajax_1) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var Store = (function (_super) {
	        __extends(Store, _super);
	        function Store(conf) {
	            var _this = _super.call(this) || this;
	            _this.config(conf);
	            return _this;
	        }
	        Store.prototype.config = function (conf) {
	            var ajax = conf.ajax;
	            if (ajax) {
	                this.ajax = new Ajax_1.default(ajax);
	            }
	        };
	        Object.defineProperty(Store.prototype, "state", {
	            get: function () {
	                return this.data;
	            },
	            set: function (value) {
	                var data = this.data;
	                if (data != value) {
	                    this.data = value;
	                }
	                this.do('change', { old: data, new: value });
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Store.prototype.load = function (conf) {
	            this.ajax.load(conf);
	        };
	        Store.prototype.suspend = function () {
	        };
	        Store.prototype.resume = function () {
	        };
	        Store.prototype.dispose = function () {
	            delete this.data;
	        };
	        return Store;
	    }(Action_1.default));
	    exports.default = Store;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var Handler = (function () {
	        function Handler(data) {
	            this.data = data;
	        }
	        Handler.prototype.find = function (callback) {
	            if (!T.isFunction(callback)) {
	                var val = callback;
	                callback = function (item, index, arr) {
	                };
	            }
	            this.data.find(callback);
	        };
	        Handler.prototype.filter = function (callback) {
	            if (!T.isFunction(callback)) {
	                var _a = callback, col = _a.col, rel = _a.rel, val = _a.val;
	                switch (rel) {
	                    case "=":
	                        callback = function (item) {
	                            return item[col] == val;
	                        };
	                        break;
	                    case "!":
	                        callback = function (item) {
	                            return item[col] != val;
	                        };
	                        break;
	                    case "%":
	                        callback = function (item) {
	                            return item[col] && item[col].indexOf(val) != -1;
	                        };
	                        break;
	                    case "/":
	                        callback = function (item) {
	                            return val.indexOf(item[val]) != -1;
	                        };
	                        break;
	                    case ">":
	                        callback = function (item) {
	                            return item[val] && item[val] > val;
	                        };
	                        break;
	                    case ">=":
	                        0;
	                        callback = function (item) {
	                            return item[val] && item[val] >= val;
	                        };
	                        break;
	                    case "<":
	                        callback = function (item) {
	                            return item[val] && item[val] < val;
	                        };
	                        break;
	                    case "<=":
	                        callback = function (item) {
	                            return item[val] && item[val] <= val;
	                        };
	                        break;
	                }
	            }
	            return this.data.filter(callback);
	        };
	        Handler.prototype.sort = function (cols, options) {
	            options = options.toString(2);
	            var desc = options[0] ? -1 : 1, isClone = options[2], ls = isClone ? this.data.concat() : this.data, col, cl = cols.length, sort = function (a, b, c) {
	                if (c === void 0) { c = 0; }
	                col = cols[c];
	                if (a[col] < b[col]) {
	                    return desc * -1;
	                }
	                if (a[col] > b[col]) {
	                    return desc;
	                }
	                c++;
	                if (c < cl) {
	                    return sort(a, b, c);
	                }
	                return 0;
	            };
	            return ls.sort(sort);
	        };
	        Handler.prototype.select = function (query) {
	            var data = this.data, arr = [], newItem, i, j, item, l = data.length, cols = query.split(","), colCount = cols.length;
	            cols = cols.map(function (item) {
	                if (item.indexOf(" as ") !== -1) {
	                    return item.split(" as ");
	                }
	                return [item, item];
	            });
	            for (i = 0; i < l; i++) {
	                item = data[item];
	                newItem = {};
	                for (j = 0; j < colCount; j++) {
	                    newItem[colCount[1]] = item[colCount[0]];
	                }
	            }
	            return arr;
	        };
	        Handler.prototype.toTree = function (ks) {
	            var to = function (data, keys) {
	                var key = keys.shift(), i, item, col, l = data.length, arr = [], childItem, children, handler = new Handler(arr);
	                for (i = 0; i < l; i++) {
	                    item = data[i];
	                    col = item[key];
	                    childItem = handler.find(col);
	                    if (!childItem) {
	                        childItem = { children: [] };
	                        arr.push(childItem);
	                    }
	                    children = childItem.children;
	                    children.push(item);
	                }
	                if (keys.length > 0) {
	                    l = arr.length;
	                    for (i = 0; i < l; i++) {
	                        childItem = arr[i];
	                        childItem.children = to(childItem.children, keys.contact());
	                    }
	                }
	                return arr;
	            };
	            return to(this.data, ks);
	        };
	        Handler.prototype.toKV = function (key) {
	            var data = this.data, i, item, l = data.length, kv = {};
	            for (i = 0; i < l; i++) {
	                item = data[i];
	                kv[item[key]] = item;
	            }
	            return kv;
	        };
	        Handler.prototype.toArray = function (key) {
	            var data = this.data, k, item, arr = [];
	            for (k in data) {
	                item = data[k];
	                item[key] = k;
	                arr.push(item);
	            }
	            return arr;
	        };
	        Handler.prototype.toPercent = function (radix) {
	            if (radix === void 0) { radix = 0; }
	            return (this.data * 100).toFixed(radix) + '%';
	        };
	        Handler.prototype.toJson = function () {
	            return JSON.parse(this.data);
	        };
	        Handler.prototype.toString = function () {
	            return JSON.stringify(this.data);
	        };
	        return Handler;
	    }());
	    Handler.DESC = 1;
	    Handler.NUM = 2;
	    Handler.NEWARRAY = 4;
	    exports.default = Handler;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Trunk_1) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    Trunk_1.default.setState = function (ref, state) {
	        var leaf = Trunk_1.default.leaves[ref];
	        leaf && leaf.setState && leaf.setState(state);
	    };
	    Trunk_1.default.render = function (path, component, className, props) {
	        var require = Trunk_1.default.require, ReactDOM = require('react-dom'), target, leaf;
	        if (typeof path === 'string') {
	            target = Trunk_1.default(path, 'div', className, props);
	        }
	        else if (Trunk_1.default.isArray(path)) {
	            target = Trunk_1.default.fork.apply(null, path);
	        }
	        else {
	            target = path;
	            path = component.type.name;
	        }
	        leaf = ReactDOM.render(component, target);
	        Trunk_1.default.leaf(path, leaf);
	        return leaf;
	    };
	    Trunk_1.default.add = function (deps, complete) {
	        if (complete) {
	            Trunk_1.default.attach({ deps: deps, complete: complete });
	        }
	        else {
	            var leaf = Trunk_1.default.data('leaf'), paths_1 = (leaf && leaf.paths) || {}, conf = void 0;
	            deps.map(function (k) {
	                Trunk_1.default.attach(paths_1[k] || { deps: [k] });
	            });
	        }
	    };
	    Trunk_1.default.attach = function (conf) {
	        var require = Trunk_1.default.require, leaf = Trunk_1.default.data('leaf') || {};
	        require(leaf.deps || [], function (React) {
	            require(conf.deps, function (mod, config) {
	                if (mod) {
	                    var children = conf.children, render = function (component, conf) {
	                        if (component.__esModule) {
	                            component = component.default;
	                        }
	                        if (component.prototype.isReactComponent) {
	                            var mount = conf.mount, props = conf.props, className = conf.className;
	                            props = props || {};
	                            props.config = config;
	                            props.mount = mount;
	                            component = React.createElement(component, props);
	                            return Trunk_1.default.render(mount || conf.deps[0], component, className);
	                        }
	                    };
	                    if (children) {
	                        for (var i = 0, l = children.length, conf_1; i < l; i++) {
	                            conf_1 = children[i];
	                            render(mod[conf_1.key], conf_1);
	                        }
	                    }
	                    else {
	                        render(mod, conf);
	                    }
	                }
	                conf.callback && conf.callback(mod, config);
	            });
	        });
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })
/******/ ]);/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.3 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */

var requirejs, require, define;
(function (global, setTimeout) {
    var req, s, head, baseElement, dataMain, src,
        interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = '2.3.3',
        commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
        //PS3 indicates loaded and complete, but need to wait for complete
        //specifically. Sequence is 'loading', 'loaded', execution,
        // then 'complete'. The UA check is unfortunate, but not sure how
        //to feature test w/o causing perf issues.
        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?
                      /^complete$/ : /^(complete|loaded)$/,
        defContextName = '_',
        //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    //Could match something like ')//comment', do not lose the prefix to comment.
    function commentReplace(match, singlePrefix) {
        return singlePrefix || '';
    }

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value === 'object' && value &&
                        !isArray(value) && !isFunction(value) &&
                        !(value instanceof RegExp)) {

                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    function defaultOnError(err) {
        throw err;
    }

    //Allow getting a global that is expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function (part) {
            g = g[part];
        });
        return g;
    }

    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }

    if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            //Do not overwrite an existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }

    //Allow for a require config object
    if (typeof require !== 'undefined' && !isFunction(require)) {
        //assume it is a config object.
        cfg = require;
        require = undefined;
    }

    function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers,
            checkLoadedTimeoutId,
            config = {
                //Defaults. Do not set a default for map
                //config to speed up normalize(), which
                //will run faster if there is no default.
                waitSeconds: 7,
                baseUrl: './',
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            registry = {},
            //registry of just enabled modules, to speed
            //cycle breaking code when lots of modules
            //are registered, but not activated.
            enabledRegistry = {},
            undefEvents = {},
            defQueue = [],
            defined = {},
            urlFetched = {},
            bundlesMap = {},
            requireCounter = 1,
            unnormalizedCounter = 1;

        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part;
            for (i = 0; i < ary.length; i++) {
                part = ary[i];
                if (part === '.') {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i === 1 && ary[2] === '..') || ary[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }

        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex,
                foundMap, foundI, foundStarMap, starI, normalizedBaseParts,
                baseParts = (baseName && baseName.split('/')),
                map = config.map,
                starMap = map && map['*'];

            //Adjust any relative paths.
            if (name) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // If wanting node ID compatibility, strip .js from end
                // of IDs. Have to do this here, and not in nameToUrl
                // because node allows either .js or non .js to map
                // to same file.
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                // Starts with a '.' so need the baseName
                if (name[0].charAt(0) === '.' && baseParts) {
                    //Convert baseName to array, and lop off the last part,
                    //so that . matches that 'directory' and not name of the baseName's
                    //module. For instance, baseName of 'one/two/three', maps to
                    //'one/two/three.js', but we want the directory, 'one/two' for
                    //this normalization.
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = normalizedBaseParts.concat(name);
                }

                trimDots(name);
                name = name.join('/');
            }

            //Apply map config if available.
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split('/');

                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join('/');

                    if (baseParts) {
                        //Find the longest baseName segment match in the config.
                        //So, do joins on the biggest to smallest lengths of baseParts.
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

                            //baseName segment has config, find if it has one for
                            //this name.
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    //Match, update name to the new value.
                                    foundMap = mapValue;
                                    foundI = i;
                                    break outerLoop;
                                }
                            }
                        }
                    }

                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }

                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }

                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join('/');
                }
            }

            // If the name points to a package's name, use
            // the package main instead.
            pkgMain = getOwn(config.pkgs, name);

            return pkgMain ? pkgMain : name;
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function (scriptNode) {
                    if (scriptNode.getAttribute('data-requiremodule') === name &&
                            scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig.shift();
                context.require.undef(id);

                //Custom require that does not do map translation, since
                //ID is "absolute", already mapped/resolved.
                context.makeRequire(null, {
                    skipMap: true
                })([id]);

                return true;
            }
        }

        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
        }

        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts,
                prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = '';

            //If no name, then it means it is a require call, generate an
            //internal name.
            if (!name) {
                isDefine = false;
                name = '_@r' + (requireCounter += 1);
            }

            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];

            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(defined, prefix);
            }

            //Account for relative paths if there is a base name.
            if (name) {
                if (prefix) {
                    if (isNormalized) {
                        normalizedName = name;
                    } else if (pluginModule && pluginModule.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName = pluginModule.normalize(name, function (name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        // If nested plugin references, then do not try to
                        // normalize, as it will not normalize correctly. This
                        // places a restriction on resourceIds, and the longer
                        // term solution is not to normalize until plugins are
                        // loaded and all normalizations to allow for async
                        // loading of a loader plugin. But for now, fixes the
                        // common uses. Details in #1131
                        normalizedName = name.indexOf('!') === -1 ?
                                         normalize(name, parentName, applyMap) :
                                         name;
                    }
                } else {
                    //A regular module.
                    normalizedName = normalize(name, parentName, applyMap);

                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;

                    url = context.nameToUrl(normalizedName);
                }
            }

            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix = prefix && !pluginModule && !isNormalized ?
                     '_unnormalized' + (unnormalizedCounter += 1) :
                     '';

            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ?
                        prefix + '!' + normalizedName :
                        normalizedName) + suffix
            };
        }

        function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }

            return mod;
        }

        function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (hasProp(defined, id) &&
                    (!mod || mod.defineEmitComplete)) {
                if (name === 'defined') {
                    fn(defined[id]);
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === 'error') {
                    fn(mod.error);
                } else {
                    mod.on(name, fn);
                }
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;

            if (errback) {
                errback(err);
            } else {
                each(ids, function (id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        //Set error on module, so it skips timeout checks.
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit('error', err);
                        }
                    }
                });

                if (!notified) {
                    req.onError(err);
                }
            }
        }

        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
                each(globalDefQueue, function(queueItem) {
                    var id = queueItem[0];
                    if (typeof id === 'string') {
                        context.defQueueMap[id] = true;
                    }
                    defQueue.push(queueItem);
                });
                globalDefQueue = [];
            }
        }

        handlers = {
            'require': function (mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return (mod.require = context.makeRequire(mod.map));
                }
            },
            'exports': function (mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return (defined[mod.map.id] = mod.exports);
                    } else {
                        return (mod.exports = defined[mod.map.id] = {});
                    }
                }
            },
            'module': function (mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return (mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function () {
                            return getOwn(config.config, mod.map.id) || {};
                        },
                        exports: mod.exports || (mod.exports = {})
                    });
                }
            }
        };

        function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
            delete enabledRegistry[id];
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;

            if (mod.error) {
                mod.emit('error', mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function (depMap, i) {
                    var depId = depMap.id,
                        dep = getOwn(registry, depId);

                    //Only force things that have not completed
                    //being defined, so still in the registry,
                    //and only if it has not been matched up
                    //in the module already.
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, defined[depId]);
                            mod.check(); //pass false?
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }

        function checkLoaded() {
            var err, usingPathFallback,
                waitInterval = config.waitSeconds * 1000,
                //It is possible to disable the wait interval by using waitSeconds of 0.
                expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true;

            //Do not bother if this call was a result of a cycle break.
            if (inCheckLoaded) {
                return;
            }

            inCheckLoaded = true;

            //Figure out the state of all the modules.
            eachProp(enabledRegistry, function (mod) {
                var map = mod.map,
                    modId = map.id;

                //Skip things that are not enabled or in error state.
                if (!mod.enabled) {
                    return;
                }

                if (!map.isDefine) {
                    reqCalls.push(mod);
                }

                if (!mod.error) {
                    //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return (needCycleCheck = false);
                        }
                    }
                }
            });

            if (expired && noLoads.length) {
                //If wait time expired, throw error of unloaded modules.
                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }

            //Not expired, check for a cycle.
            if (needCycleCheck) {
                each(reqCalls, function (mod) {
                    breakCycle(mod, {}, {});
                });
            }

            //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.
            if ((!expired || usingPathFallback) && stillLoading) {
                //Something is still waiting to load. Wait for it, but only
                //if a timeout is not already in effect.
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function () {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }

            inCheckLoaded = false;
        }

        Module = function (map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;

            /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
        };

        Module.prototype = {
            init: function (depMaps, factory, errback, options) {
                options = options || {};

                //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                if (this.inited) {
                    return;
                }

                this.factory = factory;

                if (errback) {
                    //Register for errors on this module.
                    this.on('error', errback);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback = bind(this, function (err) {
                        this.emit('error', err);
                    });
                }

                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0);

                this.errback = errback;

                //Indicate this module has be initialized
                this.inited = true;

                this.ignore = options.ignore;

                //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                if (options.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },

            defineDep: function (i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },

            fetch: function () {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;

                context.startTime = (new Date()).getTime();

                var map = this.map;

                //If the manager is for a plugin managed resource,
                //ask the plugin to load it now.
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function () {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    //Regular dependency.
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },

            load: function () {
                var url = this.map.url;

                //Regular dependency.
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },

            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function () {
                if (!this.enabled || this.enabling) {
                    return;
                }

                var err, cjsModule,
                    id = this.map.id,
                    depExports = this.depExports,
                    exports = this.exports,
                    factory = this.factory;

                if (!this.inited) {
                    // Only fetch if not already in the defQueue.
                    if (!hasProp(context.defQueueMap, id)) {
                        this.fetch();
                    }
                } else if (this.error) {
                    this.emit('error', this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;

                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            //If there is an error listener, favor passing
                            //to that instead of throwing an error. However,
                            //only do it for define()'d  modules. require
                            //errbacks should not be called for failures in
                            //their callbacks (#699). However if a global
                            //onError is set, use that.
                            if ((this.events.error && this.map.isDefine) ||
                                req.onError !== defaultOnError) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }

                            // Favor return value over exports. If node/cjs in play,
                            // then will not have a return value anyway. Favor
                            // module.exports assignment over exports object.
                            if (this.map.isDefine && exports === undefined) {
                                cjsModule = this.module;
                                if (cjsModule) {
                                    exports = cjsModule.exports;
                                } else if (this.usingExports) {
                                    //exports already set the defined value.
                                    exports = this.exports;
                                }
                            }

                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                err.requireType = this.map.isDefine ? 'define' : 'require';
                                return onError((this.error = err));
                            }

                        } else {
                            //Just a literal value
                            exports = factory;
                        }

                        this.exports = exports;

                        if (this.map.isDefine && !this.ignore) {
                            defined[id] = exports;

                            if (req.onResourceLoad) {
                                var resLoadMaps = [];
                                each(this.depMaps, function (depMap) {
                                    resLoadMaps.push(depMap.normalizedMap || depMap);
                                });
                                req.onResourceLoad(context, this.map, resLoadMaps);
                            }
                        }

                        //Clean up
                        cleanRegistry(id);

                        this.defined = true;
                    }

                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;

                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit('defined', this.exports);
                        this.defineEmitComplete = true;
                    }

                }
            },

            callPlugin: function () {
                var map = this.map,
                    id = map.id,
                    //Map already normalized the prefix.
                    pluginMap = makeModuleMap(map.prefix);

                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap);

                on(pluginMap, 'defined', bind(this, function (plugin) {
                    var load, normalizedMap, normalizedMod,
                        bundleId = getOwn(bundlesMap, this.map.id),
                        name = this.map.name,
                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {
                            enableBuildCallback: true
                        });

                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    if (this.map.unnormalized) {
                        //Normalize the ID if the plugin allows it.
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function (name) {
                                return normalize(name, parentName, true);
                            }) || '';
                        }

                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap = makeModuleMap(map.prefix + '!' + name,
                                                      this.map.parentMap,
                                                      true);
                        on(normalizedMap,
                            'defined', bind(this, function (value) {
                                this.map.normalizedMap = normalizedMap;
                                this.init([], function () { return value; }, null, {
                                    enabled: true,
                                    ignore: true
                                });
                            }));

                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap);

                            if (this.events.error) {
                                normalizedMod.on('error', bind(this, function (err) {
                                    this.emit('error', err);
                                }));
                            }
                            normalizedMod.enable();
                        }

                        return;
                    }

                    //If a paths config, then just load that file instead to
                    //resolve the plugin, as it is built into that paths layer.
                    if (bundleId) {
                        this.map.url = context.nameToUrl(bundleId);
                        this.load();
                        return;
                    }

                    load = bind(this, function (value) {
                        this.init([], function () { return value; }, null, {
                            enabled: true
                        });
                    });

                    load.error = bind(this, function (err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];

                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function (mod) {
                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });

                        onError(err);
                    });

                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load.fromText = bind(this, function (text, textAlt) {
                        /*jslint evil: true */
                        var moduleName = map.name,
                            moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;

                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        if (textAlt) {
                            text = textAlt;
                        }

                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        if (hasInteractive) {
                            useInteractive = false;
                        }

                        //Prime the system by creating a module instance for
                        //it.
                        getModule(moduleMap);

                        //Transfer any config to this other module.
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id];
                        }

                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError('fromtexteval',
                                             'fromText eval for ' + id +
                                            ' failed: ' + e,
                                             e,
                                             [id]));
                        }

                        if (hasInteractive) {
                            useInteractive = true;
                        }

                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap);

                        //Support anonymous modules.
                        context.completeLoad(moduleName);

                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire([moduleName], load);
                    });

                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin.load(map.name, localRequire, load, config);
                }));

                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },

            enable: function () {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;

                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;

                //Enable each dependency
                each(this.depMaps, bind(this, function (depMap, i) {
                    var id, mod, handler;

                    if (typeof depMap === 'string') {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap,
                                               (this.map.isDefine ? this.map : this.map.parentMap),
                                               false,
                                               !this.skipMap);
                        this.depMaps[i] = depMap;

                        handler = getOwn(handlers, depMap.id);

                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }

                        this.depCount += 1;

                        on(depMap, 'defined', bind(this, function (depExports) {
                            if (this.undefed) {
                                return;
                            }
                            this.defineDep(i, depExports);
                            this.check();
                        }));

                        if (this.errback) {
                            on(depMap, 'error', bind(this, this.errback));
                        } else if (this.events.error) {
                            // No direct errback on this module, but something
                            // else is listening for errors, so be sure to
                            // propagate the error correctly.
                            on(depMap, 'error', bind(this, function(err) {
                                this.emit('error', err);
                            }));
                        }
                    }

                    id = depMap.id;
                    mod = registry[id];

                    //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));

                //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));

                this.enabling = false;

                this.check();
            },

            on: function (name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },

            emit: function (name, evt) {
                each(this.events[name], function (cb) {
                    cb(evt);
                });
                if (name === 'error') {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name];
                }
            }
        };

        function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }

        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
                //Probably IE. If not it will throw an error, which will be
                //useful to know.
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }

        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;

            //Remove the listeners once here.
            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
            removeListener(node, context.onScriptError, 'error');

            return {
                node: node,
                id: node && node.getAttribute('data-requiremodule')
            };
        }

        function intakeDefines() {
            var args;

            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue();

            //Make sure any remaining defQueue items get properly processed.
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' +
                        args[args.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
            }
            context.defQueueMap = {};
        }

        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            defQueueMap: {},
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,

            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function (cfg) {
                //Make sure the baseUrl ends in a slash.
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                        cfg.baseUrl += '/';
                    }
                }

                // Convert old style urlArgs string to a function.
                if (typeof cfg.urlArgs === 'string') {
                    var urlArgs = cfg.urlArgs;
                    cfg.urlArgs = function(id, url) {
                        return (url.indexOf('?') === -1 ? '?' : '&') + urlArgs;
                    };
                }

                //Save off the paths since they require special processing,
                //they are additive.
                var shim = config.shim,
                    objs = {
                        paths: true,
                        bundles: true,
                        config: true,
                        map: true
                    };

                eachProp(cfg, function (value, prop) {
                    if (objs[prop]) {
                        if (!config[prop]) {
                            config[prop] = {};
                        }
                        mixin(config[prop], value, true, true);
                    } else {
                        config[prop] = value;
                    }
                });

                //Reverse map the bundles
                if (cfg.bundles) {
                    eachProp(cfg.bundles, function (value, prop) {
                        each(value, function (v) {
                            if (v !== prop) {
                                bundlesMap[v] = prop;
                            }
                        });
                    });
                }

                //Merge shim
                if (cfg.shim) {
                    eachProp(cfg.shim, function (value, id) {
                        //Normalize the structure
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    config.shim = shim;
                }

                //Adjust packages if necessary.
                if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location, name;

                        pkgObj = typeof pkgObj === 'string' ? {name: pkgObj} : pkgObj;

                        name = pkgObj.name;
                        location = pkgObj.location;
                        if (location) {
                            config.paths[name] = pkgObj.location;
                        }

                        //Save pointer to main module ID for pkg name.
                        //Remove leading dot in main, so main paths are normalized,
                        //and remove any trailing .js, since different package
                        //envs have different conventions: some use a module name,
                        //some use a file name.
                        config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main')
                                     .replace(currDirRegExp, '')
                                     .replace(jsSuffixRegExp, '');
                    });
                }

                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function (mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id, null, true);
                    }
                });

                //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },

            makeShimExports: function (value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || (value.exports && getGlobal(value.exports));
                }
                return fn;
            },

            makeRequire: function (relMap, options) {
                options = options || {};

                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;

                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }

                    if (typeof deps === 'string') {
                        if (isFunction(callback)) {
                            //Invalid call
                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                        }

                        //If require|exports|module are requested, get the
                        //value for them from the special handlers. Caveat:
                        //this only works while module is being defined.
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }

                        //Synchronous access to one module. If require.get is
                        //available (as in the Node adapter), prefer that.
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire);
                        }

                        //Normalize module name, if it contains . or ..
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;

                        if (!hasProp(defined, id)) {
                            return onError(makeError('notloaded', 'Module name "' +
                                        id +
                                        '" has not been loaded yet for context: ' +
                                        contextName +
                                        (relMap ? '' : '. Use require([])')));
                        }
                        return defined[id];
                    }

                    //Grab defines waiting in the global queue.
                    intakeDefines();

                    //Mark all the dependencies as needing to be loaded.
                    context.nextTick(function () {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines();

                        requireMod = getModule(makeModuleMap(null, relMap));

                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod.skipMap = options.skipMap;

                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });

                        checkLoaded();
                    });

                    return localRequire;
                }

                mixin(localRequire, {
                    isBrowser: isBrowser,

                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function (moduleNamePlusExt) {
                        var ext,
                            index = moduleNamePlusExt.lastIndexOf('.'),
                            segment = moduleNamePlusExt.split('/')[0],
                            isRelative = segment === '.' || segment === '..';

                        //Have a file extension alias, and it is not the
                        //dots from a relative path.
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }

                        return context.nameToUrl(normalize(moduleNamePlusExt,
                                                relMap && relMap.id, true), ext,  true);
                    },

                    defined: function (id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                    },

                    specified: function (id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(defined, id) || hasProp(registry, id);
                    }
                });

                //Only allow undef on top level require calls
                if (!relMap) {
                    localRequire.undef = function (id) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue();

                        var map = makeModuleMap(id, relMap, true),
                            mod = getOwn(registry, id);

                        mod.undefed = true;
                        removeScript(id);

                        delete defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];

                        //Clean queued defines too. Go backwards
                        //in array so that the splices do not
                        //mess up the iteration.
                        eachReverse(defQueue, function(args, i) {
                            if (args[0] === id) {
                                defQueue.splice(i, 1);
                            }
                        });
                        delete context.defQueueMap[id];

                        if (mod) {
                            //Hold on to listeners in case the
                            //module will be attempted to be reloaded
                            //using a different config.
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }

                            cleanRegistry(id);
                        }
                    };
                }

                return localRequire;
            },

            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function (depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },

            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function (moduleName) {
                var found, args, mod,
                    shim = getOwn(config.shim, moduleName) || {},
                    shExports = shim.exports;

                takeGlobalQueue();

                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        //Found matching define call for this script!
                        found = true;
                    }

                    callGetModule(args);
                }
                context.defQueueMap = {};

                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = getOwn(registry, moduleName);

                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError('nodefine',
                                             'No define call for ' + moduleName,
                                             null,
                                             [moduleName]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
                    }
                }

                checkLoaded();
            },

            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function (moduleName, ext, skipExt) {
                var paths, syms, i, parentModule, url,
                    parentPath, bundleId,
                    pkgMain = getOwn(config.pkgs, moduleName);

                if (pkgMain) {
                    moduleName = pkgMain;
                }

                bundleId = getOwn(bundlesMap, moduleName);

                if (bundleId) {
                    return context.nameToUrl(bundleId, ext, skipExt);
                }

                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
                } else {
                    //A module that needs to be converted to a path.
                    paths = config.paths;

                    syms = moduleName.split('/');
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join('/');

                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        }
                    }

                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join('/');
                    url += (ext || (/^data\:|^blob\:|\?/.test(url) || skipExt ? '' : '.js'));
                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
                }

                return config.urlArgs && !/^blob\:/.test(url) ?
                       url + config.urlArgs(moduleName, url) : url;
            },

            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function (id, url) {
                req.load(context, id, url);
            },

            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function (name, callback, args, exports) {
                return callback.apply(exports, args);
            },

            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function (evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if (evt.type === 'load' ||
                        (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;

                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },

            /**
             * Callback for script errors.
             */
            onScriptError: function (evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    var parents = [];
                    eachProp(registry, function(value, key) {
                        if (key.indexOf('_@r') !== 0) {
                            each(value.depMaps, function(depMap) {
                                if (depMap.id === data.id) {
                                    parents.push(key);
                                    return true;
                                }
                            });
                        }
                    });
                    return onError(makeError('scripterror', 'Script error for "' + data.id +
                                             (parents.length ?
                                             '", needed by: ' + parents.join(', ') :
                                             '"'), evt, [data.id]));
                }
            }
        };

        context.require = context.makeRequire();
        return context;
    }

    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req = requirejs = function (deps, callback, errback, optional) {

        //Find the right context, use default
        var context, config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }

        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        return context.require(deps, callback, errback);
    };

    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req.config = function (config) {
        return req(config);
    };

    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
        setTimeout(fn, 4);
    } : function (fn) { fn(); };

    /**
     * Export require as a global, but only if it does not already exist.
     */
    if (!require) {
        require = req;
    }

    req.version = version;

    //Used to filter out dependencies that are already paths.
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };

    //Create default context.
    req({});

    //Exports some context-sensitive methods on global require.
    each([
        'toUrl',
        'undef',
        'defined',
        'specified'
    ], function (prop) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });

    if (isBrowser) {
        head = s.head = document.getElementsByTagName('head')[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName('base')[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }

    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req.onError = defaultOnError;

    /**
     * Creates the node for the load command. Only used in browser envs.
     */
    req.createNode = function (config, moduleName, url) {
        var node = config.xhtml ?
                document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
                document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        return node;
    };

    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req.load = function (context, moduleName, url) {
        var config = (context && context.config) || {},
            node;
        if (isBrowser) {
            //In the browser so use a script tag
            node = req.createNode(config, moduleName, url);

            node.setAttribute('data-requirecontext', context.contextName);
            node.setAttribute('data-requiremodule', moduleName);

            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            if (node.attachEvent &&
                    //Check if node.attachEvent is artificially added by custom script or
                    //natively supported by browser
                    //read https://github.com/requirejs/requirejs/issues/187
                    //if we can NOT find [native code] then it must NOT natively supported.
                    //in IE8, node.attachEvent does not have toString()
                    //Note the test for "[native code" with no closing brace, see:
                    //https://github.com/requirejs/requirejs/issues/273
                    !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                    !isOpera) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive = true;

                node.attachEvent('onreadystatechange', context.onScriptLoad);
                //It would be great to add an error handler here to catch
                //404s in IE9+. However, onreadystatechange will fire before
                //the error handler, so that does not help. If addEventListener
                //is used, then IE will fire error before load, but we cannot
                //use that pathway given the connect.microsoft.com issue
                //mentioned above about not doing the 'script execute,
                //then fire the script load event listener before execute
                //next script' that other browsers do.
                //Best hope: IE10 fixes the issues,
                //and then destroys all installs of IE 6-9.
                //node.attachEvent('onerror', context.onScriptError);
            } else {
                node.addEventListener('load', context.onScriptLoad, false);
                node.addEventListener('error', context.onScriptError, false);
            }
            node.src = url;

            //Calling onNodeCreated after all properties on the node have been
            //set, but before it is placed in the DOM.
            if (config.onNodeCreated) {
                config.onNodeCreated(node, config, moduleName, url);
            }

            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;

            return node;
        } else if (isWebWorker) {
            try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation is that a build has been done so
                //that only one script needs to be loaded anyway. This may need
                //to be reevaluated if other use cases become common.

                // Post a task to the event loop to work around a bug in WebKit
                // where the worker gets garbage-collected after calling
                // importScripts(): https://webkit.org/b/153317
                setTimeout(function() {}, 0);
                importScripts(url);

                //Account for anonymous modules
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError('importscripts',
                                'importScripts failed for ' +
                                    moduleName + ' at ' + url,
                                e,
                                [moduleName]));
            }
        }
    };

    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        eachReverse(scripts(), function (script) {
            if (script.readyState === 'interactive') {
                return (interactiveScript = script);
            }
        });
        return interactiveScript;
    }

    //Look for a data-main script attribute, which could also adjust the baseUrl.
    if (isBrowser && !cfg.skipDataMain) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function (script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
                head = script.parentNode;
            }

            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                //Preserve dataMain in case it is a path (i.e. contains '?')
                mainScript = dataMain;

                //Set final baseUrl if there is not already an explicit one,
                //but only do so if the data-main value is not a loader plugin
                //module ID.
                if (!cfg.baseUrl && mainScript.indexOf('!') === -1) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = mainScript.split('/');
                    mainScript = src.pop();
                    subPath = src.length ? src.join('/')  + '/' : './';

                    cfg.baseUrl = subPath;
                }

                //Strip off any trailing .js since mainScript is now
                //like a module name.
                mainScript = mainScript.replace(jsSuffixRegExp, '');

                //If mainScript is still a path, fall back to dataMain
                if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain;
                }

                //Put the data-main script in the files to load.
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];

                return true;
            }
        });
    }

    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define = function (name, deps, callback) {
        var node, context;

        //Allow for anonymous modules
        if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }

        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }

        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps && isFunction(callback)) {
            deps = [];
            //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            if (callback.length) {
                callback
                    .toString()
                    .replace(commentRegExp, commentReplace)
                    .replace(cjsRequireRegExp, function (match, dep) {
                        deps.push(dep);
                    });

                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
        }

        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        if (context) {
            context.defQueue.push([name, deps, callback]);
            context.defQueueMap[name] = true;
        } else {
            globalDefQueue.push([name, deps, callback]);
        }
    };

    define.amd = {
        jQuery: true
    };

    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req.exec = function (text) {
        /*jslint evil: true */
        return eval(text);
    };

    //Set up with config info.
    req(cfg);
}(this, (typeof setTimeout === 'undefined' ? undefined : setTimeout)));


(function(){
var T = window.T;T.require = require; T.define = define;T.version = '0.0.1';})();
