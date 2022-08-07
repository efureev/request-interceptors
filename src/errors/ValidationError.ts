import HttpError from './HttpError'

export default class ValidationError extends HttpError {
  public messageErrors: string[] = []

  protected setMessage(message?: string): void {
    super.setMessage(message)

    const errors = this.response?.data?.errors
    if (errors) {
      this.messageErrors = errors
    }
  }
}
