import type { AxiosResponse } from 'axios';
interface ResponseWrapperConfig {
    dataKey: string;
    root: boolean;
}
/**
 * Create instance, which represent response object
 */
export default class ResponseWrapper {
    private dataType;
    private readonly config;
    private readonly datas;
    readonly response: AxiosResponse;
    private message?;
    constructor(response: AxiosResponse, config?: Partial<ResponseWrapperConfig>);
    private dataKeyName;
    private setData;
    private setExtraData;
    private setMessageData;
    /**
     * @example resp.get('data')
     * @example resp.get('data.title')
     * @example resp.get('extra')
     * @example resp.get('extra.meta')
     */
    get(key: string): any;
    /**
     * Get response's `base`-data in `data`-block, or `root`-block (if config.root === true)
     *
     * @example resp.data()     => { data: ... }
     * @example resp.data('title')    => { data: { title: 'Title' } }
     * @example resp.data('content.components.2.title')    => { data: { content: { components: [..., ..., {title: 'Title' }] } } }
     */
    data(parameter?: string): any;
    /**
     * Return extra data - all in root side, exclude `data`-block
     */
    extra(parameter?: string): any;
    isContent(): boolean;
    isBinary(): boolean;
    getDataType(): string;
}
export {};
//# sourceMappingURL=ResponseWrapper.d.ts.map