"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var errHandler = function errHandler(error) {
  var _error$response, _error$response$confi;

  if (!((_error$response = error.response) !== null && _error$response !== void 0 && _error$response.config)) {
    return;
  }

  console.info("\t\u274C [".concat((_error$response$confi = error.response.config.method) === null || _error$response$confi === void 0 ? void 0 : _error$response$confi.toUpperCase(), "]  ").concat(error.response.request.responseURL || error.response.request.res.responseUrl));
  return Promise.reject(error);
};

var successHandler = function successHandler(response) {
  var _response$config$meth;

  console.info("\t\u2705 [".concat((_response$config$meth = response.config.method) === null || _response$config$meth === void 0 ? void 0 : _response$config$meth.toUpperCase(), "]  ").concat(response.request.responseURL || response.request.res.responseUrl));
  return response;
};

var ConsoleLogResponseInterceptor = function ConsoleLogResponseInterceptor() {
  var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return enable ? function (options, extra) {
    return [successHandler, errHandler];
  } : null;
};

var _default = ConsoleLogResponseInterceptor;
exports.default = _default;
//# sourceMappingURL=ConsoleLogResponseInterceptor.js.map