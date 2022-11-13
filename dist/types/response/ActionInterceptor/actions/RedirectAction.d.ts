import type { RawDataType } from './BaseAction';
import BaseAction from './BaseAction';
import type { ActionInterceptorConfig } from '../../../response/ActionInterceptor/Interceptor';
import type { LayerConfig } from '@feugene/layer-request';
import { ExtraProperties } from '@feugene/layer-request';
import type { AxiosResponse } from 'axios';
import type ResponseWrapper from '../../../response/WrapperInterceptor/ResponseWrapper';
export default class RedirectAction extends BaseAction {
    private readonly url;
    private readonly target;
    constructor(data: RawDataType, interceptorConfig: ActionInterceptorConfig, requestExtra: ExtraProperties);
    run(configLayer: LayerConfig, response: AxiosResponse | ResponseWrapper): void;
    openUrl(url: URL): void;
}
//# sourceMappingURL=RedirectAction.d.ts.map