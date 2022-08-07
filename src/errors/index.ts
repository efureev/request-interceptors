import ValidationError from './ValidationError'
import HttpError from './HttpError'
import ConflictError from './ConflictError'
import type { AxiosError } from 'axios'

export default function make(error: AxiosError): HttpError {
  const status: number = error?.response?.status || 500

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
