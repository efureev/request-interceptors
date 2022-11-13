import { isNativeError, makeHttpError } from '~/errors.mjs';
import ResponseWrapper from './ResponseWrapper.mjs';
import { isFunction } from '@feugene/mu';
const errHandler = (layerConfig) => (error) => {
    if (isNativeError(error)) {
        return Promise.reject(error);
    }
    const { config } = error;
    // If config does not exist or the retry option is not set, reject
    // @ts-ignore
    if (!config || !config.retry) {
        return Promise.reject(makeHttpError(error));
    }
    if (!error.response) {
        const onThrowErrorFn = layerConfig.getExtra('onThrowErrorFn');
        if (isFunction(onThrowErrorFn)) {
            return onThrowErrorFn(error, this);
            // @todo create none http error
            // return Promise.reject(makeError(error))
        }
    }
    const errorWrap = makeHttpError(error);
    return Promise.reject(errorWrap);
};
const Interceptor = () => {
    return (layerConfig, requestExtra) => [
        (response) => createResponseWrapper(response, layerConfig),
        errHandler(layerConfig),
    ];
};
export const createResponseWrapper = (response, layerConfig) => new ResponseWrapper(response, layerConfig.getExtra('withoutDataBlock') ? { dataKey: '' } : {});
export default Interceptor;
//# sourceMappingURL=Interceptor.mjs.map