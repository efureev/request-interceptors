"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseWrapper = void 0;
const index_1 = require("../../errors/index");
const ResponseWrapper_1 = __importDefault(require("./ResponseWrapper"));
const mu_1 = require("@feugene/mu");
const errHandler = (layerConfig) => (error) => {
    if ((0, index_1.isNativeError)(error)) {
        return Promise.reject(error);
    }
    const { config } = error;
    // If config does not exist or the retry option is not set, reject
    // @ts-ignore
    if (!config || !config.retry) {
        return Promise.reject((0, index_1.makeHttpError)(error));
    }
    if (!error.response) {
        const onThrowErrorFn = layerConfig.getExtra('onThrowErrorFn');
        if ((0, mu_1.isFunction)(onThrowErrorFn)) {
            return onThrowErrorFn(error, this);
            // @todo create none http error
            // return Promise.reject(makeError(error))
        }
    }
    const errorWrap = (0, index_1.makeHttpError)(error);
    return Promise.reject(errorWrap);
};
const Interceptor = () => {
    return (layerConfig, requestExtra) => [
        (response) => (0, exports.createResponseWrapper)(response, layerConfig),
        errHandler(layerConfig),
    ];
};
const createResponseWrapper = (response, layerConfig) => new ResponseWrapper_1.default(response, layerConfig.getExtra('withoutDataBlock') ? { dataKey: '' } : {});
exports.createResponseWrapper = createResponseWrapper;
exports.default = Interceptor;
//# sourceMappingURL=Interceptor.js.map