"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ConflictError", {
  enumerable: true,
  get: function get() {
    return _ConflictError.default;
  }
});
Object.defineProperty(exports, "HttpError", {
  enumerable: true,
  get: function get() {
    return _HttpError.default;
  }
});
Object.defineProperty(exports, "ValidationError", {
  enumerable: true,
  get: function get() {
    return _ValidationError.default;
  }
});
exports.default = make;
exports.isNativeError = isNativeError;
exports.makeHttpError = makeHttpError;

var _ValidationError = _interopRequireDefault(require("./ValidationError"));

var _HttpError = _interopRequireDefault(require("./HttpError"));

var _ConflictError = _interopRequireDefault(require("./ConflictError"));

var _axios = require("axios");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function make(error) {
  if (error instanceof _axios.AxiosError) {
    return makeHttpError(error);
  }

  return error;
}

function makeHttpError(error) {
  var _error$response;

  var status = (error === null || error === void 0 ? void 0 : (_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) || 500;

  switch (status) {
    case 409:
      return new _ConflictError.default(error, status);

    case 422:
      return new _ValidationError.default(error, status);

    default:
      return new _HttpError.default(error, status);
  }
}

function isNativeError(error) {
  return !(error instanceof _axios.AxiosError || error instanceof _HttpError.default);
}
//# sourceMappingURL=index.js.map