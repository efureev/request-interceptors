import type { RawDataType } from './BaseAction';
import BaseAction from './BaseAction';
import type { ActionInterceptorConfig } from '../ActionInterceptor';
import type { LayerConfig } from '@feugene/layer-request';
import type { AxiosResponse } from 'axios';
import type ResponseWrapper from '../../WrapperInterceptor/ResponseWrapper';
interface DownloadRawDataType extends RawDataType {
    url: string;
    name?: string;
}
export default class DownloadAction extends BaseAction {
    private readonly url;
    private readonly name?;
    constructor(data: DownloadRawDataType, interceptorConfig: ActionInterceptorConfig);
    protected handle(configLayer: LayerConfig, response: AxiosResponse | ResponseWrapper): false | void;
}
export {};
//# sourceMappingURL=DownloadAction.d.ts.map