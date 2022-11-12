export default class ErrorAction extends Error {
    constructor(error, action) {
        super(error);
        this.action = action;
    }
}
//# sourceMappingURL=ErrorAction.js.map