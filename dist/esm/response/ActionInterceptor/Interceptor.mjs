import { buildAction } from './actions/index.mjs';
import ResponseWrapper from '../../response/WrapperInterceptor/ResponseWrapper.mjs';
import { createResponseWrapper } from '../../response/WrapperInterceptor/Interceptor.mjs';
import OnlyOneActionError from './actions/OnlyOneActionError.mjs';
import HttpError from '../../errors/HttpError.mjs';
import { isNativeError, makeHttpError } from '../../errors/index.mjs';
const defaultConfig = {
    actionAttributeName: 'status',
};
const errHandler = (interceptorConfig, configLayer, requestExtra) => (error) => {
    if (isNativeError(error)) {
        return Promise.reject(error);
    }
    const e = error instanceof HttpError ? error : makeHttpError(error);
    if (e.data && e.data[interceptorConfig.actionAttributeName]) {
        const action = buildAction(e.data[interceptorConfig.actionAttributeName], interceptorConfig, requestExtra);
        if (action && e.response) {
            action.run(configLayer, e.response);
            if (configLayer.getExtra('onlyOneAction')) {
                throw new OnlyOneActionError(e.response);
            }
        }
    }
    return Promise.reject(e);
};
const successHandler = (interceptorConfig, configLayer, requestExtra) => (response) => {
    if (!(response instanceof ResponseWrapper)) {
        response = createResponseWrapper(response, configLayer);
    }
    const rawData = !response.isBinary()
        ? response.response.data[interceptorConfig.actionAttributeName]
        : { type: 'blob' };
    const action = buildAction(rawData, interceptorConfig, requestExtra);
    if (action) {
        // @ts-ignore
        response.action = action;
        action.run(configLayer, response);
        if (configLayer.getExtra('onlyOneAction')) {
            throw new OnlyOneActionError(response.response);
        }
    }
    return response;
};
const Interceptor = (interceptorConfig = defaultConfig) => (layerConfig, requestExtra) => [
    successHandler(interceptorConfig, layerConfig, requestExtra),
    errHandler(interceptorConfig, layerConfig, requestExtra),
];
export { Interceptor, };
//# sourceMappingURL=Interceptor.mjs.map