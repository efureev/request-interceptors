import { isNativeError, makeHttpError } from '../../errors'
import ResponseWrapper from './ResponseWrapper'
import { isFunction } from '@feugene/mu'
import type { ExtraProperties, InterceptorFn, InterceptorNormal, LayerConfig } from '@feugene/layer-request'
import type { AxiosError, AxiosResponse } from 'axios'


const errHandler = (layerConfig: LayerConfig) => (error: AxiosError | Error) => {
  if (isNativeError(error)) {
    return Promise.reject(error)
  }

  const { config } = <AxiosError>error
  // If config does not exist or the retry option is not set, reject
  // @ts-ignore
  if (!config || !config.retry) {
    return Promise.reject(makeHttpError(<AxiosError>error))
  }

  if (!(<AxiosError>error).response) {
    const onThrowErrorFn = layerConfig.getExtra('onThrowErrorFn')
    if (isFunction(onThrowErrorFn)) {
      return onThrowErrorFn(error, this)
      // @todo create none http error
      // return Promise.reject(makeError(error))
    }
  }

  const errorWrap = makeHttpError(<AxiosError>error)

  return Promise.reject(errorWrap)
}

const WrapperInterceptor = (): InterceptorFn<AxiosResponse, ResponseWrapper> => {
  return (layerConfig: LayerConfig, requestExtra: ExtraProperties): InterceptorNormal<AxiosResponse, ResponseWrapper> => [
    (response: AxiosResponse): ResponseWrapper => createResponseWrapper(response, layerConfig),
    errHandler(layerConfig),
  ]
}
export const createResponseWrapper = (response: AxiosResponse, layerConfig: LayerConfig) => new ResponseWrapper(
  response,
  layerConfig.getExtra('withoutDataBlock') ? { dataKey: '' } : {},
)

export default WrapperInterceptor
