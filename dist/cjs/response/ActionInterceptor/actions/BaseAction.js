"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BaseAction = /*#__PURE__*/function () {
  function BaseAction(data, interceptorConfig, requestExtra) {
    _classCallCheck(this, BaseAction);

    _defineProperty(this, "executed", false);

    this.type = data.type;
    this.rawData = data;
    this.executed = false;
    this.interceptorConfig = interceptorConfig;
    this.requestExtra = requestExtra;
  }

  _createClass(BaseAction, [{
    key: "run",
    value: function run(configLayer, response) {
      if (!this.shouldHandle()) {
        return;
      }

      if (this.handle(configLayer, response) !== false) {
        this.done();
      }
    }
    /**
     * if return `false` - don't handle an action
     */

  }, {
    key: "handle",
    value: function handle(configLayer, response) {}
  }, {
    key: "done",
    value: function done() {
      this.executed = true;
    }
  }, {
    key: "shouldHandle",
    value: function shouldHandle() {
      return true;
    }
  }]);

  return BaseAction;
}();

exports.default = BaseAction;
//# sourceMappingURL=BaseAction.js.map