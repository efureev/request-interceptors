"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var ConsoleLogRequestInterceptor = function ConsoleLogRequestInterceptor() {
  var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (!enable) {
    return;
  }

  return function (options, extra) {
    return function (config) {
      console.info("\t\uD83C\uDF10 [".concat(config.method.toUpperCase(), "] ").concat(config.baseURL, "/").concat(config.url));
      return config;
    };
  };
};

var _default = ConsoleLogRequestInterceptor;
exports.default = _default;
//# sourceMappingURL=ConsoleLogRequestInterceptor.js.map