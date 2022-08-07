import assert from 'assert'
import { ActionsManager } from '../src/response/ActionInterceptor/actions/ActionsManager'
import BlobAction from '../src/response/ActionInterceptor/actions/BlobAction'
import { globalActionManager } from '../src/response/ActionInterceptor/actions'

describe('create action manager', () => {
  it('already filled instance', () => {
    assert.strictEqual(true, globalActionManager instanceof ActionsManager)
    assert.strictEqual(3, globalActionManager.keys().length)

    assert.strictEqual(true, globalActionManager.get('blob') instanceof Function)
    assert.strictEqual(true, globalActionManager.get('download') instanceof Function)
    assert.strictEqual(true, globalActionManager.get('redirect') instanceof Function)

    globalActionManager.add('customBlob', BlobAction)

    assert.strictEqual(4, globalActionManager.keys().length)
    assert.strictEqual(true, globalActionManager.get('customBlob') instanceof Function)

  })
})
