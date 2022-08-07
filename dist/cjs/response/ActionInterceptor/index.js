"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ActionInterceptor: true
};
Object.defineProperty(exports, "ActionInterceptor", {
  enumerable: true,
  get: function get() {
    return _ActionInterceptor.ActionInterceptor;
  }
});
exports.default = void 0;

var _ActionInterceptor = require("./ActionInterceptor");

var _actions = require("./actions");

Object.keys(_actions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _actions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _actions[key];
    }
  });
});
var _default = _ActionInterceptor.ActionInterceptor;
exports.default = _default;
//# sourceMappingURL=index.js.map