import type { AxiosError, AxiosResponse } from 'axios';
import type { ExtraProperties, LayerConfig } from '@feugene/layer-request';
import ResponseWrapper from '../WrapperInterceptor/ResponseWrapper';
import HttpError from '../../errors/HttpError';
export interface ActionInterceptorConfig {
    actionAttributeName: string;
}
declare const ActionInterceptor: (interceptorConfig?: ActionInterceptorConfig) => (layerConfig: LayerConfig, requestExtra: ExtraProperties) => (((error: AxiosError | HttpError) => Promise<never>) | ((response: AxiosResponse | ResponseWrapper) => ResponseWrapper))[];
export { ActionInterceptor, };
//# sourceMappingURL=ActionInterceptor.d.ts.map