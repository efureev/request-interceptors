import ValidationError from './ValidationError'
import HttpError from './HttpError'
import ConflictError from './ConflictError'
import { AxiosError } from 'axios'

export default function make(error: Error): HttpError | Error {
  if (error instanceof AxiosError) {
    return makeHttpError(error)
  }

  return error
}

export function makeHttpError(error: AxiosError): HttpError {
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

export function isNativeError(error: Error): boolean {
  return !(error instanceof AxiosError || error instanceof HttpError)
}

export { ConflictError, ValidationError, HttpError }
