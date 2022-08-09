import DownloadAction from './DownloadAction';
import BlobAction from './BlobAction';
import RedirectAction from './RedirectAction';
import ErrorAction from './ErrorAction';
import globalActionManager from './ActionsManager';
import type { RawDataType } from './BaseAction';
import BaseAction from './BaseAction';
import { ActionInterceptorConfig } from '../ActionInterceptor';
import { Nullable } from '../../../global';
import { ExtraProperties } from '@feugene/layer-request';
export { globalActionManager };
export declare function buildAction(data: RawDataType & {
    private: boolean;
}, interceptorConfig: ActionInterceptorConfig, requestExtra: ExtraProperties): Nullable<BaseAction>;
export { BaseAction, DownloadAction, BlobAction, RedirectAction, ErrorAction };
//# sourceMappingURL=index.d.ts.map