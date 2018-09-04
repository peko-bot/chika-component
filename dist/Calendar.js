(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/component/Calendar/Calendar.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_css-loader@1.0.0@css-loader/index.js!./src/component/Calendar/css/Calendar.css":
/*!*********************************************************************************************!*\
  !*** ./node_modules/_css-loader@1.0.0@css-loader!./src/component/Calendar/css/Calendar.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/_css-loader@1.0.0@css-loader/lib/css-base.js */ "./node_modules/_css-loader@1.0.0@css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".Calendar {\r\n    /* overflow-x: hidden;\r\n    overflow-y: auto; */\r\n}\r\n\r\n.Calendar .week-name {\r\n    width: 100%;\r\n    text-align: center;\r\n    border-collapse: collapse;\r\n}\r\n\r\n.Calendar .week-name tr {\r\n    border-bottom: 1px solid #ECECEC;\r\n    height: 50px;\r\n}\r\n\r\n.Calendar .week-name td {\r\n    position: relative;\r\n}\r\n\r\n.Calendar .week-name .cal-text {\r\n    /* box-sizing: border-box; */\r\n    border-radius: 50%;\r\n    width: 32px;\r\n    height: 32px;\r\n    line-height: 32px;\r\n    margin: auto;\r\n    transition: background .7s cubic-bezier(0.35, 0, 0.25, 1), color .7s cubic-bezier(0.35, 0, 0.25, 1);\r\n}\r\n\r\n.cal-text .cal-badge {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    /* color: #FE0002;\r\n    font-weight: bold;\r\n    font-size: 20px; */\r\n}\r\n\r\n.Calendar table {\r\n    border-spacing: 0 10px;\r\n}\r\n\r\n.Calendar .container {\r\n    position: fixed;\r\n    width: 100%;\r\n    height: 0px;\r\n    transition: transform .7s cubic-bezier(0.35, 0, 0.25, 1), opacity .7s cubic-bezier(0.35, 0, 0.25, 1);\r\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/_css-loader@1.0.0@css-loader/lib/css-base.js":
/*!*******************************************************************!*\
  !*** ./node_modules/_css-loader@1.0.0@css-loader/lib/css-base.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/_react-hot-loader@4.3.4@react-hot-loader/dist/react-hot-loader.production.min.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/_react-hot-loader@4.3.4@react-hot-loader/dist/react-hot-loader.production.min.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function _interopDefault(t){return t&&"object"==typeof t&&"default"in t?t.default:t}Object.defineProperty(exports,"__esModule",{value:!0});var React=_interopDefault(__webpack_require__(/*! react */ "react")),classCallCheck=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},inherits=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},possibleConstructorReturn=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},AppContainer=function(t){function e(){return classCallCheck(this,e),possibleConstructorReturn(this,t.apply(this,arguments))}return inherits(e,t),e.prototype.render=function(){return React.Children.only(this.props.children)},e}(React.Component),hot_prod=function(){return function(t){return t}},areComponentsEqual=function(t,e){return t===e},setConfig=function(){},cold=function(t){return t};exports.AppContainer=AppContainer,exports.hot=hot_prod,exports.areComponentsEqual=areComponentsEqual,exports.setConfig=setConfig,exports.cold=cold;


/***/ }),

/***/ "./node_modules/_react-hot-loader@4.3.4@react-hot-loader/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/_react-hot-loader@4.3.4@react-hot-loader/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(/*! ./dist/react-hot-loader.production.min.js */ "./node_modules/_react-hot-loader@4.3.4@react-hot-loader/dist/react-hot-loader.production.min.js");
} else {}


/***/ }),

/***/ "./node_modules/_style-loader@0.21.0@style-loader/lib/addStyles.js":
/*!*************************************************************************!*\
  !*** ./node_modules/_style-loader@0.21.0@style-loader/lib/addStyles.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/_style-loader@0.21.0@style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/_style-loader@0.21.0@style-loader/lib/urls.js":
/*!********************************************************************!*\
  !*** ./node_modules/_style-loader@0.21.0@style-loader/lib/urls.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./node_modules/_webpack@4.16.3@webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/component/Calendar/Calendar.js":
/*!********************************************!*\
  !*** ./src/component/Calendar/Calendar.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _Touch = __webpack_require__(/*! ../../util/Touch */ "./src/util/Touch.js");

__webpack_require__(/*! ./css/Calendar.css */ "./src/component/Calendar/css/Calendar.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/_react-hot-loader@4.3.4@react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Author: zy9@github.com/zy410419243
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Date: 2018-02-04 ‏‎20:55:34
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified by: zy9
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified time: 2018-07-28 11:10:49
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Calendar = function (_React$Component) {
    _inherits(Calendar, _React$Component);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

        _this.componentDidMount = function () {
            // 绑定搜索面板滑动事件
            (0, _Touch.bindTouchDirection)(_this.content, function (direction) {
                _this.props.touch && _this.props.touch(direction);
            });

            _this.refresh();
        };

        _this.bindTouchDirection = function (ref, callback) {
            var startX = void 0,
                startY = void 0,
                endX = void 0,
                endY = void 0;

            ref.addEventListener('touchstart', function (e) {
                startX = e.touches[0].pageX;
                startY = e.touches[0].pageY;
            });

            ref.addEventListener('touchend', function (e) {
                endX = e.changedTouches[0].pageX;
                endY = e.changedTouches[0].pageY;

                var direction = _this.getDirection(startX, startY, endX, endY);

                callback(direction);
            });
        };

        _this.refresh = function () {
            var select = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var _this$state = _this.state,
                calendarBody = _this$state.calendarBody,
                calendarList = _this$state.calendarList;
            var _this$props = _this.props,
                start = _this$props.start,
                end = _this$props.end,
                position = _this$props.position;

            // 处理日历本体数据

            calendarBody = _this.handleSelectDate(select, _this.transCalendarDatas(start, end));

            var listLen = calendarList.length;

            // 本体左右滑动事件
            // 这里需要清理数组的，不然点多了会影响性能，暂时没做 mark
            switch (position) {
                case 'toRight':
                    for (var i = 0; i < calendarList.length; i++) {
                        calendarList[i]--;
                    }
                    if (listLen && calendarList[listLen - 1] == 0) {
                        calendarList.push(1);
                    }
                    // 移除头部元素
                    // calendarList.length >= 6 ? calendarList.shift() : null;
                    break;

                case 'toLeft':
                    for (var _i = 0; _i < calendarList.length; _i++) {
                        calendarList[_i]++;
                    }
                    listLen && calendarList[0] == 0 && calendarList.splice(0, 0, -1);

                    // 移除尾部元素
                    // calendarList.length >= 6 ? calendarList.pop() : null;
                    break;

                default:

                    break;
            }

            return { calendarBody: calendarBody, calendarList: calendarList };
        };

        _this.handleSelectDate = function (select, calendarBody) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = calendarBody[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var row = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = row[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var col = _step2.value;

                            var dateCol = new Date(col.dateStr).getTime();

                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = select[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var item = _step3.value;
                                    var style = item.style,
                                        badge = item.badge,
                                        _item$changeable = item.changeable,
                                        changeable = _item$changeable === undefined ? true : _item$changeable,
                                        date = item.date,
                                        disabled = item.disabled;


                                    var dateItem = new Date(date).getTime();

                                    if (dateCol === dateItem) {
                                        col = Object.assign(col, { style: style, badge: badge, changeable: changeable, disabled: disabled });
                                    }
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                        _iterator3.return();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return calendarBody;
        };

        _this.transCalendarDatas = function (start, end) {
            var calendarDatas = [];
            var startTimeStamp = new Date(start);
            var endTimeStamp = new Date(end);
            var diffDays = _this.getDaysByDateString(start, end);
            // 二维数组行数，每行七个对象
            var rowNum = Math.ceil(diffDays / 7) + 1;
            // 开始日期在一星期中的index
            var indexStart = startTimeStamp.getDay();
            // 结束日期在一星期中的index
            var indexEnd = endTimeStamp.getDay();

            // 初始化二维数组
            for (var i = 0; i < rowNum; i++) {
                calendarDatas.push([]);
            }

            /*
                   获得第一行的第一个日期和最后一行的最后一个日期
                   然后求两时间中间的所有日期
                   然后把这些日期填到二维数组里
               */
            // 开始、结束日期的毫秒数
            // 填满首尾两行
            var startTime = startTimeStamp.getTime() - indexStart * 24 * 3600 * 1000;
            var endTime = endTimeStamp.getTime() + (7 - indexEnd - 1) * 24 * 3600 * 1000;

            // 把日期填到二维数组里
            var row = 0,
                count = 0;

            while (endTime - startTime >= 0) {
                var dateObj = new Date(startTime);
                var dateStr = dateObj.getFullYear() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getDate(); // /是为了ios new Date时不出错
                var date = dateObj.getDate();

                var param = { date: date, dateStr: dateStr };
                /*
                          根据传进来的时段设置可点击日期的颜色，
                          颜色是在这里设置，点击事件在render的body里
                      */

                param.disabled = !(startTimeStamp.getTime() <= startTime && endTimeStamp.getTime() >= startTime);
                calendarDatas[row][count % 7] = param;

                count++;
                count != 0 && count % 7 == 0 && row++;
                startTime += 1 * 24 * 3600 * 1000;
            }

            return calendarDatas;
        };

        _this.getDaysByDateString = function (start, end) {
            if (start === undefined || end === undefined) return 1;
            var startDate = Date.parse(start.replace('/-/g', '/'));
            var endDate = Date.parse(end.replace('/-/g', '/'));
            var diffDate = endDate - startDate + 1 * 24 * 60 * 60 * 1000;
            var days = diffDate / (24 * 60 * 60 * 1000);

            return days;
        };

        _this.handleTdClick = function (item) {
            return _this.props.onChange && _this.props.onChange(item);
        };

        _this.render = function () {
            var _this$props$select = _this.props.select,
                select = _this$props$select === undefined ? [] : _this$props$select;
            var currentSelect = _this.state.currentSelect;

            var _this$refresh = _this.refresh(select),
                calendarBody = _this$refresh.calendarBody,
                calendarList = _this$refresh.calendarList;

            var head = [];

            head.push(_react2.default.createElement(
                'tbody',
                { key: 'body_tbody_-1' },
                _react2.default.createElement(
                    'tr',
                    null,
                    WEEK.map(function (item, i) {
                        return _react2.default.createElement(
                            'td',
                            { key: 'week_td_' + i },
                            _react2.default.createElement(
                                'span',
                                null,
                                item
                            )
                        );
                    })
                )
            ));

            var body = [];

            calendarBody.map(function (item, i) {
                body.push(_react2.default.createElement(
                    'tbody',
                    { key: 'body_tbody_' + i },
                    _react2.default.createElement(
                        'tr',
                        null,
                        item.map(function (jtem, j) {
                            var _jtem$style = jtem.style,
                                style = _jtem$style === undefined ? {} : _jtem$style,
                                date = jtem.date,
                                disabled = jtem.disabled,
                                _jtem$badge = jtem.badge,
                                badge = _jtem$badge === undefined ? { text: '', style: {} } : _jtem$badge;
                            var text = badge.text,
                                badgeStyle = badge.style;


                            return _react2.default.createElement(
                                'td',
                                { onClick: function onClick() {
                                        return _this.handleTdClick(jtem);
                                    }, key: 'body_td_' + j },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'cal-text', style: disabled ? { color: '#949494' } : style },
                                    badge ? _react2.default.createElement(
                                        'div',
                                        { className: 'cal-badge', style: disabled ? {} : badgeStyle },
                                        text
                                    ) : null,
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        date
                                    )
                                )
                            );
                        })
                    )
                ));
            });

            return _react2.default.createElement(
                'div',
                { className: 'Calendar', ref: function ref(_ref) {
                        return _this.content = _ref;
                    } },
                calendarList.map(function (item, i) {
                    return _react2.default.createElement(
                        'div',
                        { className: 'container', style: { transform: 'translate3d(' + item * -100 + '%, 0 , 0)', opacity: !item ? 1 : 0 }, key: 'list_div_' + i },
                        _react2.default.createElement(
                            'table',
                            { className: 'week-name' },
                            head,
                            body
                        )
                    );
                })
            );
        };

        _this.state = {
            calendarBody: [],
            calendarList: [-4, -3, -2, -1, 0, 1] // 翻页用 mark
        };
        return _this;
    }

    // 绑定 判断滑动方向 事件


    _createClass(Calendar, [{
        key: 'getDirection',


        //根据起点终点返回方向
        value: function getDirection(startX, startY, endX, endY) {
            var angx = endX - startX;
            var angy = endY - startY;
            var result = '我一直站在此处没有动，等你买橘回来给我付车费';

            // 如果滑动距离太短
            if (Math.abs(angx) < 25 && Math.abs(angy) < 25) {
                return result;
            }

            var angle = Math.atan2(angy, angx) * 180 / Math.PI;

            if (angle >= -135 && angle <= -45) {
                result = 'down'; // toTop
            } else if (angle > 45 && angle < 135) {
                result = 'top'; // toDown
            } else if (angle >= 135 && angle <= 180 || angle >= -180 && angle < -135) {
                result = 'right'; // toLeft
            } else if (angle >= -45 && angle <= 45) {
                result = 'left'; // toRight
            }

            return result;
        }

        /* 设置选中项样式
            这里就是简单遍历，性能会有问题
            优化的话应该是直接确定日期在二维数组中的位置 mark
        */


        /* 将起止日期转化成二维数组 */


        // 获得两个日期间隔天数

    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);

    return Calendar;
}(_react2.default.Component);

var _default = Calendar;
exports.default = _default;


var WEEK = ['日', '一', '二', '三', '四', '五', '六'];
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/_react-hot-loader@4.3.4@react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/_react-hot-loader@4.3.4@react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Calendar, 'Calendar', 'E:/Github/react-mobile-component/src/component/Calendar/Calendar.js');
    reactHotLoader.register(WEEK, 'WEEK', 'E:/Github/react-mobile-component/src/component/Calendar/Calendar.js');
    reactHotLoader.register(_default, 'default', 'E:/Github/react-mobile-component/src/component/Calendar/Calendar.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/_webpack@4.16.3@webpack/buildin/module.js */ "./node_modules/_webpack@4.16.3@webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/component/Calendar/css/Calendar.css":
/*!*************************************************!*\
  !*** ./src/component/Calendar/css/Calendar.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/_css-loader@1.0.0@css-loader!./Calendar.css */ "./node_modules/_css-loader@1.0.0@css-loader/index.js!./src/component/Calendar/css/Calendar.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/_style-loader@0.21.0@style-loader/lib/addStyles.js */ "./node_modules/_style-loader@0.21.0@style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/util/Touch.js":
/*!***************************!*\
  !*** ./src/util/Touch.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
	var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/_react-hot-loader@4.3.4@react-hot-loader/index.js").enterModule;

	enterModule && enterModule(module);
})();

/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-05 17:01:43
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-28 09:32:09
 */
// 根据起点终点返回方向
var getDirection = function getDirection(startX, startY, endX, endY) {
	var angx = endX - startX;
	var angy = endY - startY;
	var result = '我一直站在此处没有动，等你买橘回来给我付车费';

	// 如果滑动距离太短
	if (Math.abs(angx) < 25 && Math.abs(angy) < 25) {
		return result;
	}

	var angle = Math.atan2(angy, angx) * 180 / Math.PI;

	if (angle >= -135 && angle <= -45) {
		result = 'toTop';
	} else if (angle > 45 && angle < 135) {
		result = 'toDown';
	} else if (angle >= 135 && angle <= 180 || angle >= -180 && angle < -135) {
		result = 'toLeft';
	} else if (angle >= -45 && angle <= 45) {
		result = 'toRight';
	}

	return result;
};

// 绑定 判断滑动方向 事件
var bindTouchDirection = function bindTouchDirection(ref, callback) {
	var startX = void 0,
	    startY = void 0,
	    endX = void 0,
	    endY = void 0;

	ref.addEventListener('touchstart', function (e) {
		startX = e.touches[0].pageX;
		startY = e.touches[0].pageY;
	});

	ref.addEventListener('touchend', function (e) {
		endX = e.changedTouches[0].pageX;
		endY = e.changedTouches[0].pageY;

		var direction = getDirection(startX, startY, endX, endY);

		callback(direction);
	});
};

module.exports = { bindTouchDirection: bindTouchDirection };
;

(function () {
	var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/_react-hot-loader@4.3.4@react-hot-loader/index.js").default;

	var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/_react-hot-loader@4.3.4@react-hot-loader/index.js").leaveModule;

	if (!reactHotLoader) {
		return;
	}

	reactHotLoader.register(getDirection, 'getDirection', 'E:/Github/react-mobile-component/src/util/Touch.js');
	reactHotLoader.register(bindTouchDirection, 'bindTouchDirection', 'E:/Github/react-mobile-component/src/util/Touch.js');
	leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/_webpack@4.16.3@webpack/buildin/module.js */ "./node_modules/_webpack@4.16.3@webpack/buildin/module.js")(module)))

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ });
});
//# sourceMappingURL=Calendar.js.map