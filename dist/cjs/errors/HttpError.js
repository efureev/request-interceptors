"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _statuses = _interopRequireDefault(require("../statuses"));

var _mu = require("@feugene/mu");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Create instant, which represent error object
 */
var HttpError = /*#__PURE__*/function (_Error) {
  _inherits(HttpError, _Error);

  var _super = _createSuper(HttpError);

  function HttpError(error, status) {
    var _error$request;

    var _this;

    _classCallCheck(this, HttpError);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "statusText", '');

    _defineProperty(_assertThisInitialized(_this), "url", '');

    _this.statusCode = status;
    _this.error = error;
    _this.stack = error.stack || new Error().stack;
    _this.url = (_error$request = error.request) === null || _error$request === void 0 ? void 0 : _error$request.responseURL;
    _this.config = error.config;
    _this.request = error === null || error === void 0 ? void 0 : error.request;
    _this.response = error === null || error === void 0 ? void 0 : error.response;

    if (!!_this.response) {
      var _this$response;

      _this.data = (_this$response = _this.response) === null || _this$response === void 0 ? void 0 : _this$response.data;
      _this.statusCode = _this.response.status;
      _this.statusText = (0, _statuses.default)(_this.statusCode);

      _this.setMessage();
    }

    return _this;
  }

  _createClass(HttpError, [{
    key: "setMessage",
    value: function setMessage(message) {
      if (!message) {
        var _this$response2, _this$response2$data;

        message = (_this$response2 = this.response) === null || _this$response2 === void 0 ? void 0 : (_this$response2$data = _this$response2.data) === null || _this$response2$data === void 0 ? void 0 : _this$response2$data.message;
      }

      this.message = message || 'Unknown Error';
    }
  }, {
    key: "hasResponse",
    value: function hasResponse() {
      return !!this.response;
    }
  }, {
    key: "toHtml",
    value: function toHtml() {
      return "<div><div class=\"title\">".concat(this.message, "</div><ul class=\"details list-reset\">").concat(this.statusCode && this.statusText ? "<li>[".concat(this.statusCode, "] ").concat(this.statusText, "</li>") : '', "<li>[url] ").concat(this.url, "</li></ul></div>");
    }
    /**
     * @example errorWrap.get('response.data.text')
     */

  }, {
    key: "get",
    value: function get(key) {
      return (0, _mu.select)(this, key);
    }
  }]);

  return HttpError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.default = HttpError;
//# sourceMappingURL=HttpError.js.map