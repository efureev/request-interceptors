import { forEach, isArray, isBlob, isEmpty, isObject, isString, merge, select } from '@feugene/mu'
import type { AxiosResponse } from 'axios'

const defaultConfig: ResponseWrapperConfig = {
  dataKey: 'data',
  root: false,
}


interface ResponseWrapperConfig {
  dataKey: string
  root: boolean,
}

interface ResponseWrapperData {
  data: any,
  extra: Record<string, any>,
}

type DataType = 'mixed' | 'content' | 'entity' | 'collection' | 'blob'
/**
 * Create instance, which represent response object
 */
export default class ResponseWrapper {
  private dataType: DataType = 'mixed'
  private readonly config: ResponseWrapperConfig
  private readonly datas: ResponseWrapperData = {
    data: null,
    extra: {},
  }

  public readonly response: AxiosResponse
  private message?: string

  constructor(response: AxiosResponse, config?: Partial<ResponseWrapperConfig>) {
    this.config = merge<ResponseWrapperConfig>({}, defaultConfig, config || {})
    this.response = response

    this.setData()

    if (!this.isContent()) {
      this.setExtraData()
      this.setMessageData()
    }
  }

  private dataKeyName(): string {
    if (this.config.root) {
      return ''
    }
    return !isEmpty(this.config.dataKey) ? this.config.dataKey : ''
  }

  private setData(): void {
    if (isString(this.response.data)) {
      this.datas.data = this.response.data
      this.dataType = 'content'
      return
    }

    const dk = this.dataKeyName()
    const data = !isEmpty(dk) && this.response.data[dk] !== undefined ? this.response.data[dk] : this.response.data

    if (isObject(data)) {
      this.datas.data = { ...data }
      this.dataType = 'entity'
    }
    else if (isArray(data)) {
      this.datas.data = [...data]
      this.dataType = 'collection'
    }
    else if (isBlob(data)) {
      this.datas.data = data
      this.dataType = 'blob'
    }
    else {
      this.datas.data = data
      this.dataType = isEmpty(dk) ? 'content' : 'mixed'
    }
  }

  private setExtraData(): void {
    const dk = this.dataKeyName()
    if (dk) {
      forEach(this.response.data, (value, key) => {
        if (key !== dk && key !== 'message') {
          this.datas.extra[<string>key] = value
        }
      })
    }
  }

  private setMessageData(message = null): void {
    if (!this.isBinary()) {
      this.message = !message ? this.response.data.message : message
    }
  }

  /**
   * @example resp.get('data')
   * @example resp.get('data.title')
   * @example resp.get('extra')
   * @example resp.get('extra.meta')
   */
  public get(key: string): any {
    return select(this.datas, key)
  }

  /**
   * Get response's `base`-data in `data`-block, or `root`-block (if config.root === true)
   *
   * @example resp.data()     => { data: ... }
   * @example resp.data('title')    => { data: { title: 'Title' } }
   * @example resp.data('content.components.2.title')    => { data: { content: { components: [..., ..., {title: 'Title' }] } } }
   */
  public data(parameter?: string): any {
    if (this.isContent() || this.isBinary()) {
      return this.datas.data
    }
    return this.get(`data${parameter ? `.${parameter}` : ''}`)
  }

  /**
   * Return extra data - all in root side, exclude `data`-block
   */
  public extra(parameter?: string) {
    if (this.isContent()) {
      return this.datas.extra
    }
    return this.get(`extra${parameter ? `.${parameter}` : ''}`)
  }

  public isContent(): boolean {
    return this.dataType === 'content'
  }

  public isBinary(): boolean {
    return this.dataType === 'blob'
  }

  public getDataType(): string {
    return this.dataType
  }
}
