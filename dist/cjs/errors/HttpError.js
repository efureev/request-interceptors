"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statuses_1 = __importDefault(require("../statuses"));
const mu_1 = require("@feugene/mu");
/**
 * Create instant, which represent error object
 */
class HttpError extends Error {
    constructor(error, status) {
        super();
        this.statusText = '';
        this.url = '';
        this.statusCode = status;
        this.error = error;
        this.stack = error.stack || new Error().stack;
        this.url = error.request?.responseURL;
        this.config = error.config;
        this.request = error?.request;
        this.response = error?.response;
        if (!!this.response) {
            this.data = this.response?.data;
            this.statusCode = this.response.status;
            this.statusText = (0, statuses_1.default)(this.statusCode);
            this.setMessage();
        }
    }
    setMessage(message) {
        if (!message) {
            message = this.response?.data?.message;
        }
        this.message = message || 'Unknown Error';
    }
    hasResponse() {
        return !!this.response;
    }
    toHtml() {
        return `<div><div class="title">${this.message}</div><ul class="details list-reset">${this.statusCode && this.statusText ? `<li>[${this.statusCode}] ${this.statusText}</li>` : ''}<li>[url] ${this.url}</li></ul></div>`;
    }
    /**
     * @example errorWrap.get('response.data.text')
     */
    get(key) {
        return (0, mu_1.select)(this, key);
    }
}
exports.default = HttpError;
//# sourceMappingURL=HttpError.js.map