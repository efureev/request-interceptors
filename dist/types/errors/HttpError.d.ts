import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { Nullable } from '../global';
/**
 * Create instant, which represent error object
 */
export default class HttpError extends Error {
    readonly statusCode: number;
    readonly statusText: string;
    readonly stack?: string;
    readonly error: AxiosError;
    readonly url: string;
    config: AxiosRequestConfig;
    readonly request: any;
    readonly response: Nullable<AxiosResponse>;
    data: any;
    constructor(error: AxiosError, status: number);
    protected setMessage(message?: string): void;
    hasResponse(): boolean;
    toHtml(): string;
    /**
     * @example errorWrap.get('response.data.text')
     */
    get(key: string): any;
}
//# sourceMappingURL=HttpError.d.ts.map