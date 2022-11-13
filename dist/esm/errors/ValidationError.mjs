import HttpError from './HttpError.mjs';
export default class ValidationError extends HttpError {
    setMessage(message) {
        this.messageErrors = [];
        super.setMessage(message);
        const errors = this.response?.data?.errors;
        if (errors) {
            this.messageErrors = errors;
        }
    }
}
//# sourceMappingURL=ValidationError.mjs.map