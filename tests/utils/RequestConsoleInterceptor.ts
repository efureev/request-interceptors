import type { ExtraProperties, InterceptorSuccessParam, LayerConfig } from '@feugene/layer-request'
import type { AxiosRequestConfig } from 'axios'

const RequestConsoleInterceptor = (options: LayerConfig, extra: ExtraProperties): InterceptorSuccessParam<AxiosRequestConfig> =>
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    options.axiosRequestConfig.runRequestInterceptors.push('RequestConsoleInterceptor')

    console.log('run RequestConsoleInterceptor')
    return config
  }

export default RequestConsoleInterceptor
