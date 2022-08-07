import { buildAction } from './actions';
import ResponseWrapper from '../WrapperInterceptor/ResponseWrapper';
import { createResponseWrapper } from '../WrapperInterceptor/WrapperInterceptor';
import OnlyOneActionError from './actions/OnlyOneActionError';
import HttpError from '../../errors/HttpError';
import { isNativeError, makeHttpError } from '../../errors';
const defaultConfig = {
  actionAttributeName: 'status'
};

const errHandler = (interceptorConfig, configLayer, requestExtra) => error => {
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

const successHandler = (interceptorConfig, configLayer, requestExtra) => response => {
  if (!(response instanceof ResponseWrapper)) {
    response = createResponseWrapper(response, configLayer);
  }

  const rawData = !response.isBinary() ? response.response.data[interceptorConfig.actionAttributeName] : {
    type: 'blob'
  };
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

const ActionInterceptor = (interceptorConfig = defaultConfig) => (layerConfig, requestExtra) => [successHandler(interceptorConfig, layerConfig, requestExtra), errHandler(interceptorConfig, layerConfig, requestExtra)];

export { ActionInterceptor };
//# sourceMappingURL=ActionInterceptor.js.map