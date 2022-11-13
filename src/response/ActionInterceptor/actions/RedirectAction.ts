import type { RawDataType } from './BaseAction'
import BaseAction from './BaseAction'
import ErrorAction from './ErrorAction'
import type { ActionInterceptorConfig } from '~/response/ActionInterceptor/Interceptor'
import type { LayerConfig } from '@feugene/layer-request'
import { ExtraProperties } from '@feugene/layer-request'
import type { AxiosResponse } from 'axios'
import type ResponseWrapper from '~/response/WrapperInterceptor/ResponseWrapper'

interface RedirectRawDataType extends RawDataType {
  url: string
  target?: string
}


export default class RedirectAction extends BaseAction {
  private readonly url: string
  private readonly target: string = '_self'

  constructor(data: RawDataType, interceptorConfig: ActionInterceptorConfig, requestExtra: ExtraProperties) {
    super(data, interceptorConfig, requestExtra)

    this.url = data.url

    const target = data.target
    if (target === '_blank' || target === '_self') {
      this.target = target
    }
  }

  public run(configLayer: LayerConfig, response: AxiosResponse | ResponseWrapper): void {
    if (/^http(s)?:\/\//.test(this.url)) {
      this.openUrl(new URL(this.url))

      return
    }
    this.openUrl(new URL(window.location.origin + this.url))
  }

  openUrl(url: URL) {
    const a = document.createElement('a')
    a.setAttribute('href', url.toString())
    a.setAttribute('target', this.target)
    a.click()

    this.done()

    throw new ErrorAction(`Redirect to ${url}`, this)
  }
}
