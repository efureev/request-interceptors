import ValidationError from './ValidationError';
import HttpError from './HttpError';
import ConflictError from './ConflictError';
import { AxiosError } from 'axios';
export default function make(error) {
    if (error instanceof AxiosError) {
        return makeHttpError(error);
    }
    return error;
}
export function makeHttpError(error) {
    const status = error?.response?.status || 500;
    switch (status) {
        case 409:
            return new ConflictError(error, status);
        case 422:
            return new ValidationError(error, status);
        default:
            return new HttpError(error, status);
    }
}
export function isNativeError(error) {
    return !(error instanceof AxiosError || error instanceof HttpError);
}
export { ConflictError, ValidationError, HttpError };
//# sourceMappingURL=index.js.map