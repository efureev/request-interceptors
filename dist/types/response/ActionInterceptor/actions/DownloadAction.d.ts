import type { RawDataType } from './BaseAction';
import BaseAction from './BaseAction';
import type { ActionInterceptorConfig } from '../ActionInterceptor';
import type { LayerConfig } from '@feugene/layer-request';
import type { AxiosResponse } from 'axios';
import type ResponseWrapper from '../../WrapperInterceptor/ResponseWrapper';
import { ExtraProperties } from '@feugene/layer-request';
export default class DownloadAction extends BaseAction {
    private readonly url;
    private readonly name?;
    constructor(data: RawDataType, interceptorConfig: ActionInterceptorConfig, requestExtra: ExtraProperties);
    protected handle(configLayer: LayerConfig, response: AxiosResponse | ResponseWrapper): false | void;
}
//# sourceMappingURL=DownloadAction.d.ts.map