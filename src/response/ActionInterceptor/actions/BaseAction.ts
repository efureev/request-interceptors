import type { ActionInterceptorConfig } from '../ActionInterceptor'
import type { ExtraProperties, LayerConfig } from '@feugene/layer-request'
import type { AxiosResponse } from 'axios'
import type ResponseWrapper from '../../WrapperInterceptor/ResponseWrapper'

export interface RawDataType extends Record<PropertyKey, any> {
  type: string
}

export default class BaseAction {
  private type: string
  private executed: boolean = false

  private rawData: RawDataType
  private interceptorConfig: any
  private requestExtra: ExtraProperties

  constructor(data: RawDataType, interceptorConfig: ActionInterceptorConfig, requestExtra: ExtraProperties) {
    this.type = data.type
    this.rawData = data
    this.executed = false
    this.interceptorConfig = interceptorConfig
    this.requestExtra = requestExtra
  }

  public run(configLayer: LayerConfig, response: AxiosResponse | ResponseWrapper): void {
    if (!this.shouldHandle()) {
      return
    }

    if (this.handle(configLayer, response) !== false) {
      this.done()
    }
  }

  /**
   * if return `false` - don't handle an action
   */
  protected handle(configLayer: LayerConfig, response: AxiosResponse | ResponseWrapper): false | void {
  }

  protected done(): void {
    this.executed = true
  }

  protected shouldHandle(): boolean {
    return true
  }
}
