import type { AxiosResponse } from 'axios'

export default class OnlyOneActionError extends Error {
  public response: AxiosResponse

  constructor(response: AxiosResponse) {
    super()
    this.response = response
  }
}
