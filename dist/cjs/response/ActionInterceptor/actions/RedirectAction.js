"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseAction_1 = __importDefault(require("./BaseAction"));
const ErrorAction_1 = __importDefault(require("./ErrorAction"));
class RedirectAction extends BaseAction_1.default {
    constructor(data, interceptorConfig, requestExtra) {
        super(data, interceptorConfig, requestExtra);
        this.target = '_self';
        this.url = data.url;
        const target = data.target;
        if (target === '_blank' || target === '_self') {
            this.target = target;
        }
    }
    run(configLayer, response) {
        if (/^http(s)?:\/\//.test(this.url)) {
            this.openUrl(new URL(this.url));
            return;
        }
        this.openUrl(new URL(window.location.origin + this.url));
    }
    openUrl(url) {
        const a = document.createElement('a');
        a.setAttribute('href', url.toString());
        a.setAttribute('target', this.target);
        a.click();
        this.done();
        throw new ErrorAction_1.default(`Redirect to ${url}`, this);
    }
}
exports.default = RedirectAction;
//# sourceMappingURL=RedirectAction.js.map