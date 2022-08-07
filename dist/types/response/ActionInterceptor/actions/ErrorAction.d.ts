import type BaseAction from './BaseAction';
export default class ErrorAction extends Error {
    action: BaseAction;
    constructor(error: string, action: BaseAction);
}
//# sourceMappingURL=ErrorAction.d.ts.map