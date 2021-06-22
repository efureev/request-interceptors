import assert from 'assert'
import manager, { ActionsManager } from '../src/response/ActionInterceptor/actions/ActionsManager'
import BlobAction from '../src/response/ActionInterceptor/actions/BlobAction'

describe('create action manager', () => {

  it('empty instance', () => {
    assert.strictEqual(true, manager instanceof ActionsManager)

    manager.clear()
    assert.strictEqual(0, Object.keys(manager.list).length)

    manager.add('customBlob', BlobAction)

    assert.strictEqual(1, Object.keys(manager.list).length)
    assert.strictEqual(true, manager.get('customBlob') instanceof Function)

  })
    .timeout(10000)
})
