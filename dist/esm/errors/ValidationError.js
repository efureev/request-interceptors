import HttpError from './HttpError';
export default class ValidationError extends HttpError {
  // @ts-ignore
  setMessage(message) {
    this.messageErrors = [];
    super.setMessage(message);
    const errors = this.response?.data?.errors;

    if (errors) {
      this.messageErrors = errors;
    }
  }

}
//# sourceMappingURL=ValidationError.js.map