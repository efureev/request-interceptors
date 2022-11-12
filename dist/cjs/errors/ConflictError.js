"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("./HttpError"));
class ConflictError extends HttpError_1.default {
}
exports.default = ConflictError;
//# sourceMappingURL=ConflictError.js.map