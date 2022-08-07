import globalActionManager from './ActionsManager';
import type { RawDataType } from './BaseAction';
import BaseAction from './BaseAction';
import { ActionInterceptorConfig } from '../ActionInterceptor';
import { Nullable } from '../../../global';
export { globalActionManager, BaseAction };
export declare function buildAction(data: RawDataType & {
    private: boolean;
}, interceptorConfig: ActionInterceptorConfig): Nullable<BaseAction>;
//# sourceMappingURL=index.d.ts.map