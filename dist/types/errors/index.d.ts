import ValidationError from './ValidationError';
import HttpError from './HttpError';
import ConflictError from './ConflictError';
import { AxiosError } from 'axios';
export default function make(error: Error): HttpError | Error;
export declare function makeHttpError(error: AxiosError): HttpError;
export declare function isNativeError(error: Error): boolean;
export { ConflictError, ValidationError, HttpError };
//# sourceMappingURL=index.d.ts.map