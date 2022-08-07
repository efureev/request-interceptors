import type { RawDataType } from './BaseAction';
import BaseAction from './BaseAction';
import type { ActionInterceptorConfig } from '../ActionInterceptor';
import type { LayerConfig } from '@feugene/layer-request';
import type { AxiosResponse } from 'axios';
import type ResponseWrapper from '../../WrapperInterceptor/ResponseWrapper';
interface RedirectRawDataType extends RawDataType {
    url: string;
    target?: string;
}
export default class RedirectAction extends BaseAction {
    private readonly url;
    private readonly target;
    constructor(data: RedirectRawDataType, interceptorConfig: ActionInterceptorConfig);
    run(configLayer: LayerConfig, response: AxiosResponse | ResponseWrapper): void;
    openUrl(url: URL): void;
}
export {};
//# sourceMappingURL=RedirectAction.d.ts.map