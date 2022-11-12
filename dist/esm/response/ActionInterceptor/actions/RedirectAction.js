import BaseAction from './BaseAction';
import ErrorAction from './ErrorAction';
export default class RedirectAction extends BaseAction {
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
        throw new ErrorAction(`Redirect to ${url}`, this);
    }
}
//# sourceMappingURL=RedirectAction.js.map