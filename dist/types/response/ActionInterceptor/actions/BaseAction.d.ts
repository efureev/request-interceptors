import type { ActionInterceptorConfig } from '../ActionInterceptor';
import type { LayerConfig } from '@feugene/layer-request';
import type { AxiosResponse } from 'axios';
import type ResponseWrapper from '../../WrapperInterceptor/ResponseWrapper';
export interface RawDataType extends Record<PropertyKey, any> {
    type: string;
}
export default class BaseAction {
    private type;
    private executed;
    private rawData;
    private interceptorConfig;
    constructor(data: RawDataType, interceptorConfig: ActionInterceptorConfig);
    run(configLayer: LayerConfig, response: AxiosResponse | ResponseWrapper): void;
    /**
     * if return `false` - don't handle an action
     */
    protected handle(configLayer: LayerConfig, response: AxiosResponse | ResponseWrapper): false | void;
    protected done(): void;
    protected shouldHandle(): boolean;
}
//# sourceMappingURL=BaseAction.d.ts.map