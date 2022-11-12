"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("./HttpError"));
class ValidationError extends HttpError_1.default {
    setMessage(message) {
        this.messageErrors = [];
        super.setMessage(message);
        const errors = this.response?.data?.errors;
        if (errors) {
            this.messageErrors = errors;
        }
    }
}
exports.default = ValidationError;
//# sourceMappingURL=ValidationError.js.map