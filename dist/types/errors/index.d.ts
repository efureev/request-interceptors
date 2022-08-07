import ValidationError from './ValidationError';
import HttpError from './HttpError';
import ConflictError from './ConflictError';
import type { AxiosError } from 'axios';
export default function make(error: AxiosError): HttpError;
export { ConflictError, ValidationError, HttpError };
//# sourceMappingURL=index.d.ts.map