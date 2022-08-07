import HttpError from './HttpError';
export default class ValidationError extends HttpError {
    messageErrors: string[];
    protected setMessage(message?: string): void;
}
//# sourceMappingURL=ValidationError.d.ts.map