"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OnlyOneActionError extends Error {
    constructor(response) {
        super();
        this.response = response;
    }
}
exports.default = OnlyOneActionError;
//# sourceMappingURL=OnlyOneActionError.js.map