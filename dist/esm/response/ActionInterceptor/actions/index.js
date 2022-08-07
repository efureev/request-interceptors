import { isEmpty, isObject } from '@feugene/mu';
import DownloadAction from './DownloadAction';
import BlobAction from './BlobAction';
import RedirectAction from './RedirectAction';
import globalActionManager from './ActionsManager';
import BaseAction from './BaseAction';
globalActionManager.add('download', DownloadAction);
globalActionManager.add('blob', BlobAction);
globalActionManager.add('redirect', RedirectAction);
export { globalActionManager };
export function buildAction(data, interceptorConfig) {
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

  return new action(data, interceptorConfig);
}
export { BaseAction, DownloadAction, BlobAction, RedirectAction };
//# sourceMappingURL=index.js.map