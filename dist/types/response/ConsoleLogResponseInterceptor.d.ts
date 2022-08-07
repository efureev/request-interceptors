import type { ExtraProperties, LayerConfig } from '@feugene/layer-request';
import type { AxiosError, AxiosResponse } from 'axios';
declare const ConsoleLogResponseInterceptor: (enable?: boolean) => ((options: LayerConfig, extra: ExtraProperties) => (((error: AxiosError) => Promise<never> | undefined) | ((response: AxiosResponse) => AxiosResponse))[]) | null;
export default ConsoleLogResponseInterceptor;
//# sourceMappingURL=ConsoleLogResponseInterceptor.d.ts.map