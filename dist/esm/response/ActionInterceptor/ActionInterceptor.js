import { buildAction } from './actions';
import ResponseWrapper from '../WrapperInterceptor/ResponseWrapper';
import { createResponseWrapper } from '../WrapperInterceptor/WrapperInterceptor';
import OnlyOneActionError from './actions/OnlyOneActionError';
import HttpError from '../../errors/HttpError';
import makeError from '../../errors';
const defaultConfig = {
  actionAttributeName: 'status'
};

const errHandler = (interceptorConfig, configLayer, requestExtra) => error => {
  if (!(error instanceof HttpError)) {
    error = makeError(error);
  }

  if (error.data && error.data[interceptorConfig.actionAttributeName]) {
    const action = buildAction(error.data[interceptorConfig.actionAttributeName], interceptorConfig, requestExtra);

    if (action && error.response) {
      action.run(configLayer, error.response);

      if (configLayer.getExtra('onlyOneAction')) {
        throw new OnlyOneActionError(error.response);
      }
    }
  }

  return Promise.reject(error);
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