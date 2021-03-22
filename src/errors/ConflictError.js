import HttpError from './HttpError'

export default class ConflictError extends HttpError {
  constructor(error, status) {
    super(error, status)

    this.name = 'ConflictError'
  }
}
