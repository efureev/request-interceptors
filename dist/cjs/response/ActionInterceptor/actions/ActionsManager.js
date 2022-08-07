"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ActionsManager = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ActionsManager = /*#__PURE__*/function () {
  function ActionsManager() {
    _classCallCheck(this, ActionsManager);

    this.list = new Map();
  }

  _createClass(ActionsManager, [{
    key: "add",
    value: function add(type, action) {
      this.list.set(type, action);
    }
  }, {
    key: "addList",
    value: function addList(typeList, action) {
      var _this = this;

      typeList.forEach(function (type) {
        _this.add(type, action);
      });
    }
  }, {
    key: "get",
    value: function get(type) {
      return this.list.get(type);
    }
  }, {
    key: "keys",
    value: function keys() {
      return Array.from(this.list.keys());
    }
  }, {
    key: "all",
    value: function all() {
      return this.list;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.list.clear();
    }
  }]);

  return ActionsManager;
}();

exports.ActionsManager = ActionsManager;
var globalActionManager = new ActionsManager();
var _default = globalActionManager;
exports.default = _default;
//# sourceMappingURL=ActionsManager.js.map