import type { ExtraProperties, InterceptorSuccessParam, LayerConfig } from '@feugene/layer-request';
import type { AxiosRequestConfig } from 'axios';
declare const ConsoleLogRequestInterceptor: (enable?: boolean) => ((options: LayerConfig, extra: ExtraProperties) => InterceptorSuccessParam<AxiosRequestConfig>) | undefined;
export default ConsoleLogRequestInterceptor;
//# sourceMappingURL=ConsoleLogRequestInterceptor.d.ts.map