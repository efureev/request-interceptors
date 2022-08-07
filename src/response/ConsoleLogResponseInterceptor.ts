import type { ExtraProperties, LayerConfig } from '@feugene/layer-request'
import type { AxiosError, AxiosResponse } from 'axios'

const errHandler = (error: AxiosError) => {
  if (!error.response?.config) {
    return
  }
  console.info(
    `\t❌ [${error.response.config.method?.toUpperCase()}]  ${
      error.response.request.responseURL || error.response.request.res.responseUrl
    }`
  )
  return Promise.reject(error)
}

const successHandler = (response: AxiosResponse): AxiosResponse => {
  console.info(
    `\t✅ [${response.config.method?.toUpperCase()}]  ${
      response.request.responseURL || response.request.res.responseUrl
    }`
  )
  return response
}

const ConsoleLogResponseInterceptor = function (enable: boolean = false) {
  return enable ? (options: LayerConfig, extra: ExtraProperties) => [successHandler, errHandler] : null
}

export default ConsoleLogResponseInterceptor
