import { isFunction } from '@feugene/mu'
import type { ExtraProperties, InterceptorSuccessParam, LayerConfig } from '@feugene/layer-request'
import type { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

const AuthInterceptor =
  (layerConfig: LayerConfig, extra: ExtraProperties): InterceptorSuccessParam<AxiosRequestConfig> =>
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      const auth = layerConfig.getExtra('auth')
      if (auth) {
        ;(<AxiosRequestHeaders>config.headers).Authorization = isFunction(auth) ? auth(config) : config.auth
      }
      else {
        config.headers && delete config.headers.Authorization
      }

      return config
    }

export default AuthInterceptor
