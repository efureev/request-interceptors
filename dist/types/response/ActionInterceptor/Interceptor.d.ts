import type { AxiosError, AxiosResponse } from 'axios';
import type { ExtraProperties, LayerConfig } from '@feugene/layer-request';
import ResponseWrapper from '../../response/WrapperInterceptor/ResponseWrapper';
import HttpError from '../../errors/HttpError';
export interface ActionInterceptorConfig {
    actionAttributeName: string;
}
declare const Interceptor: (interceptorConfig?: ActionInterceptorConfig) => (layerConfig: LayerConfig, requestExtra: ExtraProperties) => (((error: AxiosError | HttpError | Error) => Promise<never>) | ((response: AxiosResponse | ResponseWrapper) => ResponseWrapper))[];
export { Interceptor, };
//# sourceMappingURL=Interceptor.d.ts.map