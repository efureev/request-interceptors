import type { ExtraProperties, InterceptorSuccessParam, LayerConfig } from '@feugene/layer-request'
import type { AxiosRequestConfig } from 'axios'

const RequestConsoleInterceptor2 = (options: LayerConfig, extra: ExtraProperties): InterceptorSuccessParam<AxiosRequestConfig> =>
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    // @ts-ignore
    options.axiosRequestConfig.runRequestInterceptors.push('RequestConsoleInterceptor 2')

    console.log('run RequestConsoleInterceptor 2')
    return config
  }

export default RequestConsoleInterceptor2
