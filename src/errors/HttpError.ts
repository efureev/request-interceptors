import statusMessage from '~/statuses'
import { select } from '@feugene/mu'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { Nullable } from '~/global'

/**
 * Create instant, which represent error object
 */
export default class HttpError extends Error {
  public readonly statusCode: number
  public readonly statusText: string = ''
  public readonly stack?: string
  public readonly error: AxiosError

  public readonly url: string = ''
  public config: AxiosRequestConfig
  public readonly request: any
  public readonly response: Nullable<AxiosResponse>

  public data: any

  constructor(error: AxiosError, status: number) {
    super()

    this.statusCode = status
    this.error = error
    this.stack = error.stack || new Error().stack

    this.url = error.request?.responseURL
    this.config = error.config

    this.request = error?.request
    this.response = error?.response

    if (!!this.response) {
      this.data = this.response?.data

      this.statusCode = this.response.status
      this.statusText = statusMessage(this.statusCode)

      this.setMessage()
    }
  }

  protected setMessage(message?: string): void {
    if (!message) {
      message = this.response?.data?.message
    }

    this.message = message || 'Unknown Error'
  }

  public hasResponse(): boolean {
    return !!this.response
  }

  public toHtml() {
    return `<div><div class="title">${this.message}</div><ul class="details list-reset">${
      this.statusCode && this.statusText ? `<li>[${this.statusCode}] ${this.statusText}</li>` : ''
    }<li>[url] ${this.url}</li></ul></div>`
  }

  /**
   * @example errorWrap.get('response.data.text')
   */
  get(key: string): any {
    return select(this, key)
  }
}
