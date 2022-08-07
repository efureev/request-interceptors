import ResponseWrapper from './ResponseWrapper';
import type { InterceptorFn, LayerConfig } from '@feugene/layer-request';
import type { AxiosResponse } from 'axios';
declare const WrapperInterceptor: () => InterceptorFn<AxiosResponse, ResponseWrapper>;
export declare const createResponseWrapper: (response: AxiosResponse, layerConfig: LayerConfig) => ResponseWrapper;
export default WrapperInterceptor;
//# sourceMappingURL=WrapperInterceptor.d.ts.map