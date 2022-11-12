"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseAction_1 = __importDefault(require("./BaseAction"));
class DownloadAction extends BaseAction_1.default {
    constructor(data, interceptorConfig, requestExtra) {
        super(data, interceptorConfig, requestExtra);
        this.url = data.url;
        this.name = data.name;
    }
    handle(configLayer, response) {
        const link = document.createElement('a');
        link.href = this.url;
        if (this.name) {
            link.download = this.name;
        }
        document.body.append(link);
        link.click();
        link.remove();
    }
}
exports.default = DownloadAction;
//# sourceMappingURL=DownloadAction.js.map