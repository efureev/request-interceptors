import type { AxiosError, AxiosResponse } from 'axios'
import { buildAction } from './actions/index'
import type { ExtraProperties, LayerConfig } from '@feugene/layer-request'
import ResponseWrapper from '~/response/WrapperInterceptor/ResponseWrapper'
import { createResponseWrapper } from '~/response/WrapperInterceptor/Interceptor'
import OnlyOneActionError from './actions/OnlyOneActionError'
import HttpError from '~/errors/HttpError'
import { isNativeError, makeHttpError } from '~/errors/index'

const defaultConfig: ActionInterceptorConfig = {
  actionAttributeName: 'status',
}

export interface ActionInterceptorConfig {
  actionAttributeName: string
}

const errHandler = (interceptorConfig: ActionInterceptorConfig, configLayer: LayerConfig, requestExtra: ExtraProperties) =>
  (error: AxiosError | HttpError | Error) => {
    if (isNativeError(error)) {
      return Promise.reject(error)
    }
    const e: HttpError = error instanceof HttpError ? error : makeHttpError(<AxiosError>error)

    if (e.data && e.data[interceptorConfig.actionAttributeName]) {
      const action = buildAction(
        e.data[interceptorConfig.actionAttributeName],
        interceptorConfig,
        requestExtra,
      )

      if (action && e.response) {
        action.run(configLayer, e.response)
        if (configLayer.getExtra('onlyOneAction')) {
          throw new OnlyOneActionError(e.response)
        }
      }
    }

    return Promise.reject(e)
  }

const successHandler = (interceptorConfig: ActionInterceptorConfig, configLayer: LayerConfig, requestExtra: ExtraProperties) =>
  (response: AxiosResponse | ResponseWrapper) => {

    if (!(response instanceof ResponseWrapper)) {
      response = createResponseWrapper(<AxiosResponse>response, configLayer)
    }

    const rawData = !response.isBinary()
      ? response.response.data[interceptorConfig.actionAttributeName]
      : { type: 'blob' }

    const action = buildAction(rawData, interceptorConfig, requestExtra)

    if (action) {
      // @ts-ignore
      response.action = action

      action.run(configLayer, response)

      if (configLayer.getExtra('onlyOneAction')) {
        throw new OnlyOneActionError(response.response)
      }
    }

    return response
  }

const Interceptor = (interceptorConfig: ActionInterceptorConfig = defaultConfig) =>
  (layerConfig: LayerConfig, requestExtra: ExtraProperties) =>
    [
      successHandler(interceptorConfig, layerConfig, requestExtra),
      errHandler(interceptorConfig, layerConfig, requestExtra),
    ]

export {
  Interceptor,
}
