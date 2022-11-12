"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorAction = exports.RedirectAction = exports.BlobAction = exports.DownloadAction = exports.BaseAction = exports.buildAction = exports.globalActionManager = void 0;
const mu_1 = require("@feugene/mu");
const DownloadAction_1 = __importDefault(require("./DownloadAction"));
exports.DownloadAction = DownloadAction_1.default;
const BlobAction_1 = __importDefault(require("./BlobAction"));
exports.BlobAction = BlobAction_1.default;
const RedirectAction_1 = __importDefault(require("./RedirectAction"));
exports.RedirectAction = RedirectAction_1.default;
const ErrorAction_1 = __importDefault(require("./ErrorAction"));
exports.ErrorAction = ErrorAction_1.default;
const ActionsManager_1 = __importDefault(require("./ActionsManager"));
exports.globalActionManager = ActionsManager_1.default;
const BaseAction_1 = __importDefault(require("./BaseAction"));
exports.BaseAction = BaseAction_1.default;
ActionsManager_1.default.add('download', DownloadAction_1.default);
ActionsManager_1.default.add('blob', BlobAction_1.default);
ActionsManager_1.default.add('redirect', RedirectAction_1.default);
function buildAction(data, interceptorConfig, requestExtra) {
    if (!(0, mu_1.isObject)(data) || (0, mu_1.isEmpty)(data.type)) {
        return;
    }
    if (data.private) {
        return;
    }
    const action = ActionsManager_1.default.get(data.type);
    if (!action) {
        return;
    }
    return new action(data, interceptorConfig, requestExtra);
}
exports.buildAction = buildAction;
//# sourceMappingURL=index.js.map