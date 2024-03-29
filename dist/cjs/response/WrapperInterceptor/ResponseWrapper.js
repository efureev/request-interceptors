"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mu_1 = require("@feugene/mu");
const defaultConfig = {
    dataKey: 'data',
    root: false,
};
/**
 * Create instance, which represent response object
 */
class ResponseWrapper {
    constructor(response, config) {
        this.dataType = 'mixed';
        this.datas = {
            data: null,
            extra: {},
        };
        this.config = (0, mu_1.merge)({}, defaultConfig, config || {});
        this.response = response;
        this.setData();
        if (!this.isContent()) {
            this.setExtraData();
            this.setMessageData();
        }
    }
    dataKeyName() {
        if (this.config.root) {
            return '';
        }
        return !(0, mu_1.isEmpty)(this.config.dataKey) ? this.config.dataKey : '';
    }
    setData() {
        if ((0, mu_1.isString)(this.response.data)) {
            this.datas.data = this.response.data;
            this.dataType = 'content';
            return;
        }
        const dk = this.dataKeyName();
        const data = !(0, mu_1.isEmpty)(dk) && this.response.data[dk] !== undefined ? this.response.data[dk] : this.response.data;
        if ((0, mu_1.isObject)(data)) {
            this.datas.data = { ...data };
            this.dataType = 'entity';
        }
        else if ((0, mu_1.isArray)(data)) {
            this.datas.data = [...data];
            this.dataType = 'collection';
        }
        else if ((0, mu_1.isBlob)(data)) {
            this.datas.data = data;
            this.dataType = 'blob';
        }
        else {
            this.datas.data = data;
            this.dataType = (0, mu_1.isEmpty)(dk) ? 'content' : 'mixed';
        }
    }
    setExtraData() {
        const dk = this.dataKeyName();
        if (dk) {
            (0, mu_1.forEach)(this.response.data, (value, key) => {
                if (key !== dk && key !== 'message') {
                    this.datas.extra[key] = value;
                }
            });
        }
    }
    setMessageData(message = null) {
        if (!this.isBinary()) {
            this.message = !message ? this.response.data.message : message;
        }
    }
    /**
     * @example resp.get('data')
     * @example resp.get('data.title')
     * @example resp.get('extra')
     * @example resp.get('extra.meta')
     */
    get(key) {
        return (0, mu_1.select)(this.datas, key);
    }
    /**
     * Get response's `base`-data in `data`-block, or `root`-block (if config.root === true)
     *
     * @example resp.data()     => { data: ... }
     * @example resp.data('title')    => { data: { title: 'Title' } }
     * @example resp.data('content.components.2.title')    => { data: { content: { components: [..., ..., {title: 'Title' }] } } }
     */
    data(parameter) {
        if (this.isContent() || this.isBinary()) {
            return this.datas.data;
        }
        return this.get(`data${parameter ? `.${parameter}` : ''}`);
    }
    /**
     * Return extra data - all in root side, exclude `data`-block
     */
    extra(parameter) {
        if (this.isContent()) {
            return this.datas.extra;
        }
        return this.get(`extra${parameter ? `.${parameter}` : ''}`);
    }
    isContent() {
        return this.dataType === 'content';
    }
    isBinary() {
        return this.dataType === 'blob';
    }
    getDataType() {
        return this.dataType;
    }
}
exports.default = ResponseWrapper;
//# sourceMappingURL=ResponseWrapper.js.map