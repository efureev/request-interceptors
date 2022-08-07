import DownloadAction from './DownloadAction';
import BlobAction from './BlobAction';
import RedirectAction from './RedirectAction';
import globalActionManager from './ActionsManager';
import type { RawDataType } from './BaseAction';
import BaseAction from './BaseAction';
import { ActionInterceptorConfig } from '../ActionInterceptor';
import { Nullable } from '../../../global';
export { globalActionManager };
export declare function buildAction(data: RawDataType & {
    private: boolean;
}, interceptorConfig: ActionInterceptorConfig): Nullable<BaseAction>;
export { BaseAction, DownloadAction, BlobAction, RedirectAction };
//# sourceMappingURL=index.d.ts.map