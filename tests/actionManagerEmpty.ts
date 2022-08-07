import assert from 'assert'
import globalActionManager, { ActionsManager } from '../src/response/ActionInterceptor/actions/ActionsManager'
import BlobAction from '../src/response/ActionInterceptor/actions/BlobAction'

describe('create action manager', () => {
  it('empty instance', () => {
    assert.strictEqual(true, globalActionManager instanceof ActionsManager)

    globalActionManager.clear()
    assert.strictEqual(0, globalActionManager.keys().length)

    globalActionManager.add('customBlob', BlobAction)

    assert.strictEqual(1, globalActionManager.keys().length)
    assert.strictEqual(true, globalActionManager.get('customBlob') instanceof Function)

  })
})
