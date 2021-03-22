import ValidationError from './ValidationError'
import HttpError from './HttpError'
import ConflictError from './ConflictError'

export default function make(error) {
  const status = error?.response?.status

  switch (status) {
    case 409:
      return new ConflictError(error, status)
    case 422:
      return new ValidationError(error, status)
    default:
      return new HttpError(error, status)
  }
}

export { ConflictError, ValidationError, HttpError }
