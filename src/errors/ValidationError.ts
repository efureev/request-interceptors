import HttpError from './HttpError'

export default class ValidationError extends HttpError {
  // @ts-ignore
  public messageErrors: string[]

  protected setMessage(message?: string): void {
    this.messageErrors = []
    super.setMessage(message)

    const errors = this.response?.data?.errors
    if (errors) {
      this.messageErrors = errors
    }
  }
}
