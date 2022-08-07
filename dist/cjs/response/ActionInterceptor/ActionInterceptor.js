"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionInterceptor = void 0;

var _actions = require("./actions");

var _ResponseWrapper = _interopRequireDefault(require("../WrapperInterceptor/ResponseWrapper"));

var _WrapperInterceptor = require("../WrapperInterceptor/WrapperInterceptor");

var _OnlyOneActionError = _interopRequireDefault(require("./actions/OnlyOneActionError"));

var _HttpError = _interopRequireDefault(require("../../errors/HttpError"));

var _errors = require("../../errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultConfig = {
  actionAttributeName: 'status'
};

var errHandler = function errHandler(interceptorConfig, configLayer, requestExtra) {
  return function (error) {
    if ((0, _errors.isNativeError)(error)) {
      return Promise.reject(error);
    }

    var e = error instanceof _HttpError.default ? error : (0, _errors.makeHttpError)(error);

    if (e.data && e.data[interceptorConfig.actionAttributeName]) {
      var action = (0, _actions.buildAction)(e.data[interceptorConfig.actionAttributeName], interceptorConfig, requestExtra);

      if (action && e.response) {
        action.run(configLayer, e.response);

        if (configLayer.getExtra('onlyOneAction')) {
          throw new _OnlyOneActionError.default(e.response);
        }
      }
    }

    return Promise.reject(e);
  };
};

var successHandler = function successHandler(interceptorConfig, configLayer, requestExtra) {
  return function (response) {
    if (!(response instanceof _ResponseWrapper.default)) {
      response = (0, _WrapperInterceptor.createResponseWrapper)(response, configLayer);
    }

    var rawData = !response.isBinary() ? response.response.data[interceptorConfig.actionAttributeName] : {
      type: 'blob'
    };
    var action = (0, _actions.buildAction)(rawData, interceptorConfig, requestExtra);

    if (action) {
      // @ts-ignore
      response.action = action;
      action.run(configLayer, response);

      if (configLayer.getExtra('onlyOneAction')) {
        throw new _OnlyOneActionError.default(response.response);
      }
    }

    return response;
  };
};

var ActionInterceptor = function ActionInterceptor() {
  var interceptorConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultConfig;
  return function (layerConfig, requestExtra) {
    return [successHandler(interceptorConfig, layerConfig, requestExtra), errHandler(interceptorConfig, layerConfig, requestExtra)];
  };
};

exports.ActionInterceptor = ActionInterceptor;
//# sourceMappingURL=ActionInterceptor.js.map