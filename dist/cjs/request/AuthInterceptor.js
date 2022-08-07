"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mu = require("@feugene/mu");

var AuthInterceptor = function AuthInterceptor(layerConfig, extra) {
  return function (config) {
    var auth = layerConfig.getExtra('auth');

    if (auth) {
      ;
      config.headers.Authorization = (0, _mu.isFunction)(auth) ? auth(config) : config.auth;
    } else {
      config.headers && delete config.headers.Authorization;
    }

    return config;
  };
};

var _default = AuthInterceptor;
exports.default = _default;
//# sourceMappingURL=AuthInterceptor.js.map