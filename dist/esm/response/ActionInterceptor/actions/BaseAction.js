export default class BaseAction {
    constructor(data, interceptorConfig, requestExtra) {
        this.executed = false;
        this.type = data.type;
        this.rawData = data;
        this.executed = false;
        this.interceptorConfig = interceptorConfig;
        this.requestExtra = requestExtra;
    }
    run(configLayer, response) {
        if (!this.shouldHandle()) {
            return;
        }
        if (this.handle(configLayer, response) !== false) {
            this.done();
        }
    }
    /**
     * if return `false` - don't handle an action
     */
    handle(configLayer, response) {
    }
    done() {
        this.executed = true;
    }
    shouldHandle() {
        return true;
    }
}
//# sourceMappingURL=BaseAction.js.map