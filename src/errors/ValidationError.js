import HttpError from './HttpError'

export default class ValidationError extends HttpError {
  constructor(error, status) {
    super(error, status)

    this.name = 'ValidationError'
  }

  setMessage(message = null) {
    super.setMessage(message)

    const errs = this.response?.data?.errors
    if (errs) {
      this.messageErrors = errs
    }
  }
}
