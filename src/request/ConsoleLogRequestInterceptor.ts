import type { ExtraProperties, InterceptorSuccessParam, LayerConfig } from '@feugene/layer-request'
import type { AxiosRequestConfig, Method } from 'axios'

const ConsoleLogRequestInterceptor = function (enable: boolean = false) {
  if (!enable) {
    return
  }

  return (options: LayerConfig, extra: ExtraProperties): InterceptorSuccessParam<AxiosRequestConfig> =>
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      console.info(`\t🌐 [${(<Method>config.method).toUpperCase()}] ${config.baseURL}/${config.url}`)
      return config
    }
}

export default ConsoleLogRequestInterceptor
