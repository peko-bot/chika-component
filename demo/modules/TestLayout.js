define(["react","react-dom"], function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) { return /******/ (function(modules) { // webpackBootstrap
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _table = __webpack_require__(3);

	var _table2 = _interopRequireDefault(_table);

	var _massage = __webpack_require__(8);

	var _massage2 = _interopRequireDefault(_massage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TestLayout = function (_React$Component) {
	  _inherits(TestLayout, _React$Component);

	  function TestLayout(props) {
	    _classCallCheck(this, TestLayout);

	    var _this = _possibleConstructorReturn(this, (TestLayout.__proto__ || Object.getPrototypeOf(TestLayout)).call(this, props));

	    _this.componentDidMount = function () {};

	    _this.getList = function () {
	      T.ajax({
	        key: 'aa',
	        data: { obtime: '[2013-10-1,2014-11-1 8:00]' },
	        success: function success(result) {
	          var massage = [{ 'a': '3月26日', 'b': '小雨', 'c': result.substring(1, 20) }];
	          T.data('weather_list', massage);
	        }
	      });
	      T.ajax({
	        key: 'json',
	        success: function success(result) {
	          console.log(result);
	        }
	      });
	    };

	    _this.setList = function (data) {
	      T.data('weather_list', data);
	    };

	    _this.state = {
	      like: true
	    };
	    return _this;
	  }

	  _createClass(TestLayout, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'div',
	        { ref: 'main' },
	        _react2.default.createElement(_table2.default, { freshKey: 'weather_list' }),
	        _react2.default.createElement(_massage2.default, { getList: function getList() {
	            return _this2.getList();
	          }, setList: function setList(data) {
	            return _this2.setList(data);
	          } })
	      );
	    }
	  }]);

	  return TestLayout;
	}(_react2.default.Component);

	exports.default = TestLayout;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	__webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Table = function (_React$Component) {
	  _inherits(Table, _React$Component);

	  function Table(props) {
	    _classCallCheck(this, Table);

	    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

	    _this.dataSouce = [{ "a": "dada", "b": "b", "c": "c", "d": ["a", "b", "c", "d", "e"] }];

	    _this.componentDidMount = function () {
	      var key = 'datachange_' + _this.props.freshKey;
	      T.on(key, function (data) {
	        this.dataSouce = data.new;
	        this.setState({});
	      }.bind(_this));
	    };

	    _this.updataMassage = function (data) {
	      // this.dataSouce.list = data;
	      // thi.setState({})
	    };

	    _this.state = {
	      liked: 1,
	      list_massage: [],
	      abc: 'abc'
	    };
	    return _this;
	  }

	  _createClass(Table, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'default table', style: { overflow: 'hidden', width: '100%' } },
	        this.dataSouce.map(function (item, i) {
	          return _react2.default.createElement(
	            'div',
	            { style: { float: 'left', width: '150px' }, key: 'table' + i },
	            _react2.default.createElement(
	              'div',
	              null,
	              item.a
	            ),
	            _react2.default.createElement(
	              'div',
	              null,
	              item.b
	            ),
	            _react2.default.createElement(
	              'div',
	              null,
	              item.c
	            )
	          );
	        })
	      );
	    }
	  }]);

	  return Table;
	}(_react2.default.Component);

	exports.default = Table;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	__webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Massage = function (_React$Component) {
	  _inherits(Massage, _React$Component);

	  _createClass(Massage, [{
	    key: 'changeState',
	    value: function changeState() {
	      this.setState({});
	    }
	  }, {
	    key: 'set',
	    value: function set(value) {
	      this.changeState();
	    }
	  }]);

	  function Massage(props) {
	    _classCallCheck(this, Massage);

	    var _this = _possibleConstructorReturn(this, (Massage.__proto__ || Object.getPrototypeOf(Massage)).call(this, props));

	    _this.componentDidMount = function () {};

	    _this.getList = function () {
	      _this.setTime();
	      if (_this.props.getList) {
	        _this.props.getList();
	      }
	    };

	    _this.setList = function () {
	      _this.setTime();
	      if (_this.props.setList) {
	        var massage = [{ a: '2月1日', b: '大雨', c: '天气很好' }, { a: '2月2日', b: '中雨', c: '天气很不好' }];
	        _this.props.setList(massage);
	      }
	    };

	    _this.state = {
	      updataTime: ''
	    };
	    return _this;
	  }

	  _createClass(Massage, [{
	    key: 'setTime',
	    value: function setTime() {
	      this.setState({ updataTime: T.clock(new Date()).fmt('YYYY-MM-DD hh:mm:ss') });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'default massage', style: { position: 'relative', top: '50px', left: this.state.left + 'px' } },
	        _react2.default.createElement('img', { style: { width: '33px', height: '33px', backgroundColor: '#cecece' }, src: './config/favicon.ico' }),
	        _react2.default.createElement(
	          'button',
	          { onClick: this.getList },
	          'get'
	        ),
	        _react2.default.createElement(
	          'button',
	          { onClick: this.setList },
	          'set'
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          '\u5237\u65B0\u65F6\u95F4 : ',
	          this.state.updataTime
	        )
	      );
	    }
	  }]);

	  return Massage;
	}(_react2.default.Component);

	exports.default = Massage;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })
/******/ ])});;