"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorAction extends Error {
    constructor(error, action) {
        super(error);
        this.action = action;
    }
}
exports.default = ErrorAction;
//# sourceMappingURL=ErrorAction.js.map