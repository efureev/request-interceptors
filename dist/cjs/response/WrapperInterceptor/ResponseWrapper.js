"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mu = require("@feugene/mu");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultConfig = {
  dataKey: 'data',
  root: false
};

/**
 * Create instance, which represent response object
 */
var ResponseWrapper = /*#__PURE__*/function () {
  function ResponseWrapper(response, config) {
    _classCallCheck(this, ResponseWrapper);

    _defineProperty(this, "dataType", 'mixed');

    _defineProperty(this, "datas", {
      data: null,
      extra: {}
    });

    this.config = (0, _mu.merge)({}, defaultConfig, config || {});
    this.response = response;
    this.setData();

    if (!this.isContent()) {
      this.setExtraData();
      this.setMessageData();
    }
  }

  _createClass(ResponseWrapper, [{
    key: "dataKeyName",
    value: function dataKeyName() {
      if (this.config.root) {
        return '';
      }

      return !(0, _mu.isEmpty)(this.config.dataKey) ? this.config.dataKey : '';
    }
  }, {
    key: "setData",
    value: function setData() {
      if ((0, _mu.isString)(this.response.data)) {
        this.datas.data = this.response.data;
        this.dataType = 'content';
        return;
      }

      var dk = this.dataKeyName();
      var data = !(0, _mu.isEmpty)(dk) && this.response.data[dk] !== undefined ? this.response.data[dk] : this.response.data;

      if ((0, _mu.isObject)(data)) {
        this.datas.data = _objectSpread({}, data);
        this.dataType = 'entity';
      } else if ((0, _mu.isArray)(data)) {
        this.datas.data = _toConsumableArray(data);
        this.dataType = 'collection';
      } else if ((0, _mu.isBlob)(data)) {
        this.datas.data = data;
        this.dataType = 'blob';
      } else {
        this.datas.data = data;
        this.dataType = (0, _mu.isEmpty)(dk) ? 'content' : 'mixed';
      }
    }
  }, {
    key: "setExtraData",
    value: function setExtraData() {
      var _this = this;

      var dk = this.dataKeyName();

      if (dk) {
        (0, _mu.forEach)(this.response.data, function (value, key) {
          if (key !== dk && key !== 'message') {
            _this.datas.extra[key] = value;
          }
        });
      }
    }
  }, {
    key: "setMessageData",
    value: function setMessageData() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!this.isBinary()) {
        this.message = !message ? this.response.data.message : message;
      }
    }
    /**
     * @example resp.get('data')
     * @example resp.get('data.title')
     * @example resp.get('extra')
     * @example resp.get('extra.meta')
     */

  }, {
    key: "get",
    value: function get(key) {
      return (0, _mu.select)(this.datas, key);
    }
    /**
     * Get response's `base`-data in `data`-block, or `root`-block (if config.root === true)
     *
     * @example resp.data()     => { data: ... }
     * @example resp.data('title')    => { data: { title: 'Title' } }
     * @example resp.data('content.components.2.title')    => { data: { content: { components: [..., ..., {title: 'Title' }] } } }
     */

  }, {
    key: "data",
    value: function data(parameter) {
      if (this.isContent() || this.isBinary()) {
        return this.datas.data;
      }

      return this.get("data".concat(parameter ? ".".concat(parameter) : ''));
    }
    /**
     * Return extra data - all in root side, exclude `data`-block
     */

  }, {
    key: "extra",
    value: function extra(parameter) {
      if (this.isContent()) {
        return this.datas.extra;
      }

      return this.get("extra".concat(parameter ? ".".concat(parameter) : ''));
    }
  }, {
    key: "isContent",
    value: function isContent() {
      return this.dataType === 'content';
    }
  }, {
    key: "isBinary",
    value: function isBinary() {
      return this.dataType === 'blob';
    }
  }, {
    key: "getDataType",
    value: function getDataType() {
      return this.dataType;
    }
  }]);

  return ResponseWrapper;
}();

exports.default = ResponseWrapper;
//# sourceMappingURL=ResponseWrapper.js.map