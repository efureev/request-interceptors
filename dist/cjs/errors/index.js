"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = exports.ValidationError = exports.ConflictError = exports.isNativeError = exports.makeHttpError = void 0;
const ValidationError_1 = __importDefault(require("./ValidationError"));
exports.ValidationError = ValidationError_1.default;
const HttpError_1 = __importDefault(require("./HttpError"));
exports.HttpError = HttpError_1.default;
const ConflictError_1 = __importDefault(require("./ConflictError"));
exports.ConflictError = ConflictError_1.default;
const axios_1 = require("axios");
function make(error) {
    if (error instanceof axios_1.AxiosError) {
        return makeHttpError(error);
    }
    return error;
}
exports.default = make;
function makeHttpError(error) {
    const status = error?.response?.status || 500;
    switch (status) {
        case 409:
            return new ConflictError_1.default(error, status);
        case 422:
            return new ValidationError_1.default(error, status);
        default:
            return new HttpError_1.default(error, status);
    }
}
exports.makeHttpError = makeHttpError;
function isNativeError(error) {
    return !(error instanceof axios_1.AxiosError || error instanceof HttpError_1.default);
}
exports.isNativeError = isNativeError;
//# sourceMappingURL=index.js.map