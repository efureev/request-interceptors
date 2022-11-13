import type { RawDataType } from './BaseAction'
import BaseAction from './BaseAction'
import type { ActionInterceptorConfig } from '~/response/ActionInterceptor/Interceptor'
import type { LayerConfig } from '@feugene/layer-request'
import type { AxiosResponse } from 'axios'
import type ResponseWrapper from '~/response/WrapperInterceptor/ResponseWrapper'
import { ExtraProperties } from '@feugene/layer-request'

interface DownloadRawDataType extends RawDataType {
  url: string
  name?: string
}

export default class DownloadAction extends BaseAction {
  private readonly url: string
  private readonly name?: string

  constructor(data: RawDataType, interceptorConfig: ActionInterceptorConfig, requestExtra: ExtraProperties) {
    super(data, interceptorConfig, requestExtra)

    this.url = data.url
    this.name = data.name
  }

  protected handle(configLayer: LayerConfig, response: AxiosResponse | ResponseWrapper): false | void {
    const link = document.createElement('a')

    link.href = this.url
    if (this.name) {
      link.download = this.name
    }

    document.body.append(link)
    link.click()
    link.remove()
  }
}
