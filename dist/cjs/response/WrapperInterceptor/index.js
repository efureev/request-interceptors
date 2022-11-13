"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrapperInterceptor = exports.ResponseWrapper = void 0;
const Interceptor_1 = __importDefault(require("./Interceptor"));
exports.WrapperInterceptor = Interceptor_1.default;
const ResponseWrapper_1 = __importDefault(require("./ResponseWrapper"));
exports.ResponseWrapper = ResponseWrapper_1.default;
exports.default = Interceptor_1.default;
//# sourceMappingURL=index.js.map