import { isEmpty, isObject } from '@feugene/mu';
import DownloadAction from './DownloadAction.mjs';
import BlobAction from './BlobAction.mjs';
import RedirectAction from './RedirectAction.mjs';
import ErrorAction from './ErrorAction.mjs';
import globalActionManager from './ActionsManager.mjs';
import BaseAction from './BaseAction.mjs';
globalActionManager.add('download', DownloadAction);
globalActionManager.add('blob', BlobAction);
globalActionManager.add('redirect', RedirectAction);
export { globalActionManager };
export function buildAction(data, interceptorConfig, requestExtra) {
    if (!isObject(data) || isEmpty(data.type)) {
        return;
    }
    if (data.private) {
        return;
    }
    const action = globalActionManager.get(data.type);
    if (!action) {
        return;
    }
    return new action(data, interceptorConfig, requestExtra);
}
export { BaseAction, DownloadAction, BlobAction, RedirectAction, ErrorAction };
//# sourceMappingURL=index.mjs.map