import assert from 'assert'
import { ActionsManager } from '../src/response/ActionInterceptor/actions/ActionsManager'
import BlobAction from '../src/response/ActionInterceptor/actions/BlobAction'
import { manager as managerFilled } from '../src/response/ActionInterceptor/actions'

describe('create action manager', () => {

  it('already filled instance', () => {
    assert.strictEqual(true, managerFilled instanceof ActionsManager)
    assert.strictEqual(3, Object.keys(managerFilled.list).length)

    assert.strictEqual(true, managerFilled.get('blob') instanceof Function)
    assert.strictEqual(true, managerFilled.get('download') instanceof Function)
    assert.strictEqual(true, managerFilled.get('redirect') instanceof Function)

    managerFilled.add('customBlob', BlobAction)

    assert.strictEqual(4, Object.keys(managerFilled.list).length)
    assert.strictEqual(true, managerFilled.get('customBlob') instanceof Function)

  })
    .timeout(10000)
})
