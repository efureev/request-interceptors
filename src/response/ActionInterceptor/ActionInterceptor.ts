import type { AxiosError, AxiosResponse } from 'axios'
import { buildAction } from './actions'
import type { ExtraProperties, LayerConfig } from '@feugene/layer-request'
import ResponseWrapper from '../WrapperInterceptor/ResponseWrapper'
import { createResponseWrapper } from '../WrapperInterceptor/WrapperInterceptor'
import OnlyOneActionError from './actions/OnlyOneActionError'
import HttpError from '../../errors/HttpError'
import makeError from '../../errors'

const defaultConfig: ActionInterceptorConfig = {
  actionAttributeName: 'status',
}

export interface ActionInterceptorConfig {
  actionAttributeName: string
}

const errHandler = (interceptorConfig: ActionInterceptorConfig, configLayer: LayerConfig) =>
  (error: AxiosError | HttpError) => {
    if (!(error instanceof HttpError)) {
      error = makeError(error)
    }

    if (error.data && error.data[interceptorConfig.actionAttributeName]) {
      const action = buildAction(
        error.data[interceptorConfig.actionAttributeName],
        interceptorConfig,
      )

      if (action && error.response) {
        action.run(configLayer, error.response)
        if (configLayer.getExtra('onlyOneAction')) {
          throw new OnlyOneActionError(error.response)
        }
      }
    }

    return Promise.reject(error)
  }

const successHandler = (interceptorConfig: ActionInterceptorConfig, configLayer: LayerConfig) =>
  (response: AxiosResponse | ResponseWrapper) => {

    if (!(response instanceof ResponseWrapper)) {
      response = createResponseWrapper(<AxiosResponse>response, configLayer)
    }

    const rawData = !response.isBinary()
      ? response.response.data[interceptorConfig.actionAttributeName]
      : { type: 'blob' }

    const action = buildAction(rawData, interceptorConfig)

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

const ActionInterceptor = (interceptorConfig: ActionInterceptorConfig = defaultConfig) =>
  (layerConfig: LayerConfig, requestExtra: ExtraProperties) =>
    [
      successHandler(interceptorConfig, layerConfig),
      errHandler(interceptorConfig, layerConfig),
    ]

export {
  ActionInterceptor,
}
