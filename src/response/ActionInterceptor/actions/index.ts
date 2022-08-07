import { isEmpty, isObject } from '@feugene/mu'
import DownloadAction from './DownloadAction'
import BlobAction from './BlobAction'
import RedirectAction from './RedirectAction'
import globalActionManager from './ActionsManager'
import type { RawDataType } from './BaseAction'
import BaseAction from './BaseAction'
import { ActionInterceptorConfig } from '../ActionInterceptor'
import { Nullable } from '../../../global'

globalActionManager.add('download', DownloadAction)
globalActionManager.add('blob', BlobAction)
globalActionManager.add('redirect', RedirectAction)

export { globalActionManager }

export function buildAction(data: RawDataType & { private: boolean }, interceptorConfig: ActionInterceptorConfig): Nullable<BaseAction> {
  if (!isObject(data) || isEmpty(data.type)) {
    return
  }

  if (data.private) {
    return
  }

  const action = <any>globalActionManager.get(data.type)
  if (!action) {
    return
  }

  return new action(data, interceptorConfig)
}


export { BaseAction, DownloadAction, BlobAction, RedirectAction }
