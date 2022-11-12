"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionInterceptor = void 0;
const actions_1 = require("./actions");
const ResponseWrapper_1 = __importDefault(require("../WrapperInterceptor/ResponseWrapper"));
const WrapperInterceptor_1 = require("../WrapperInterceptor/WrapperInterceptor");
const OnlyOneActionError_1 = __importDefault(require("./actions/OnlyOneActionError"));
const HttpError_1 = __importDefault(require("../../errors/HttpError"));
const errors_1 = require("../../errors");
const defaultConfig = {
    actionAttributeName: 'status',
};
const errHandler = (interceptorConfig, configLayer, requestExtra) => (error) => {
    if ((0, errors_1.isNativeError)(error)) {
        return Promise.reject(error);
    }
    const e = error instanceof HttpError_1.default ? error : (0, errors_1.makeHttpError)(error);
    if (e.data && e.data[interceptorConfig.actionAttributeName]) {
        const action = (0, actions_1.buildAction)(e.data[interceptorConfig.actionAttributeName], interceptorConfig, requestExtra);
        if (action && e.response) {
            action.run(configLayer, e.response);
            if (configLayer.getExtra('onlyOneAction')) {
                throw new OnlyOneActionError_1.default(e.response);
            }
        }
    }
    return Promise.reject(e);
};
const successHandler = (interceptorConfig, configLayer, requestExtra) => (response) => {
    if (!(response instanceof ResponseWrapper_1.default)) {
        response = (0, WrapperInterceptor_1.createResponseWrapper)(response, configLayer);
    }
    const rawData = !response.isBinary()
        ? response.response.data[interceptorConfig.actionAttributeName]
        : { type: 'blob' };
    const action = (0, actions_1.buildAction)(rawData, interceptorConfig, requestExtra);
    if (action) {
        // @ts-ignore
        response.action = action;
        action.run(configLayer, response);
        if (configLayer.getExtra('onlyOneAction')) {
            throw new OnlyOneActionError_1.default(response.response);
        }
    }
    return response;
};
const ActionInterceptor = (interceptorConfig = defaultConfig) => (layerConfig, requestExtra) => [
    successHandler(interceptorConfig, layerConfig, requestExtra),
    errHandler(interceptorConfig, layerConfig, requestExtra),
];
exports.ActionInterceptor = ActionInterceptor;
//# sourceMappingURL=ActionInterceptor.js.map