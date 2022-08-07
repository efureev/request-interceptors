"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createResponseWrapper = void 0;

var _errors = _interopRequireDefault(require("../../errors"));

var _ResponseWrapper = _interopRequireDefault(require("./ResponseWrapper"));

var _mu = require("@feugene/mu");

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errHandler = function errHandler(layerConfig) {
  return function (error) {
    var config = error.config; // If config does not exist or the retry option is not set, reject
    // @ts-ignore

    if (!config || !config.retry) {
      return Promise.reject((0, _errors.default)(error));
    }

    if (!error.response) {
      var onThrowErrorFn = layerConfig.getExtra('onThrowErrorFn');

      if ((0, _mu.isFunction)(onThrowErrorFn)) {
        return onThrowErrorFn(error, _this); // @todo create none http error
        // return Promise.reject(makeError(error))
      }
    }

    var errorWrap = (0, _errors.default)(error);
    return Promise.reject(errorWrap);
  };
};

var WrapperInterceptor = function WrapperInterceptor() {
  return function (layerConfig, requestExtra) {
    return [function (response) {
      return createResponseWrapper(response, layerConfig);
    }, errHandler(layerConfig)];
  };
};

var createResponseWrapper = function createResponseWrapper(response, layerConfig) {
  return new _ResponseWrapper.default(response, layerConfig.getExtra('withoutDataBlock') ? {
    dataKey: ''
  } : {});
};

exports.createResponseWrapper = createResponseWrapper;
var _default = WrapperInterceptor;
exports.default = _default;
//# sourceMappingURL=WrapperInterceptor.js.map