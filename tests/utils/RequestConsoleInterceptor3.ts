import type { ExtraProperties, InterceptorSuccessParam, LayerConfig } from '@feugene/layer-request'
import type { AxiosRequestConfig } from 'axios'

const RequestConsoleInterceptor3 = (options: LayerConfig, extra: ExtraProperties): InterceptorSuccessParam<AxiosRequestConfig> =>
  (config: AxiosRequestConfig): AxiosRequestConfig => {

    options.axiosRequestConfig.runRequestInterceptors.push('RequestConsoleInterceptor 3')

    console.log('run RequestConsoleInterceptor 3')
    return config
  }

export default RequestConsoleInterceptor3
