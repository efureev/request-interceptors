import type { ActionInterceptorConfig } from '../../../response/ActionInterceptor/Interceptor';
import type { ExtraProperties, LayerConfig } from '@feugene/layer-request';
import type { AxiosResponse } from 'axios';
import type ResponseWrapper from '../../../response/WrapperInterceptor/ResponseWrapper';
export interface RawDataType extends Record<PropertyKey, any> {
    type: string;
}
export default class BaseAction {
    private type;
    private executed;
    private rawData;
    private interceptorConfig;
    private requestExtra;
    constructor(data: RawDataType, interceptorConfig: ActionInterceptorConfig, requestExtra: ExtraProperties);
    run(configLayer: LayerConfig, response: AxiosResponse | ResponseWrapper): void;
    /**
     * if return `false` - don't handle an action
     */
    protected handle(configLayer: LayerConfig, response: AxiosResponse | ResponseWrapper): false | void;
    protected done(): void;
    protected shouldHandle(): boolean;
}
//# sourceMappingURL=BaseAction.d.ts.map