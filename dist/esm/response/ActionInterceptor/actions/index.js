import { isEmpty, isObject } from '@feugene/mu';
import DownloadAction from './DownloadAction';
import BlobAction from './BlobAction';
import RedirectAction from './RedirectAction';
import ErrorAction from './ErrorAction';
import globalActionManager from './ActionsManager';
import BaseAction from './BaseAction';
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
//# sourceMappingURL=index.js.map