import '@babel/polyfill'

import assert from 'assert'
import buildRequest from '@feugene/layer-request'
// import WrapperInterceptor from '../src/response/WrapperInterceptor/WrapperInterceptor'
import WrapperInterceptor from '../src/response/WrapperInterceptor'
import isObject from '@feugene/mu/src/is/isObject'
import ResponseWrapper from '../src/response/WrapperInterceptor/ResponseWrapper'
import isEmpty from '@feugene/mu/src/is/isEmpty'
import isArray from '@feugene/mu/src/is/isArray'

describe('create Request with interceptoprs', () => {

  it('response wrapper interceptor with data key', async () => {

    const r = buildRequest()

    const layoutApi = r.manager.addLayer((cm) => cm.new({
      requestConfig: {
        baseURL: 'https://mockery.dev/api',
        timeout: 30000,
      },
      interceptors: {
        response: [WrapperInterceptor()],
      },
    }))

    r.manager.addLayer(layoutApi, 'api')

    const l = r.manager.getLayer('api')

    assert.strictEqual(0, l.interceptors.request.length)
    assert.strictEqual(1, l.interceptors.response.length)

    const buildReq = r.build('api')
    assert.strictEqual(1, buildReq.interceptors.response.handlers.length)

    const response = await buildReq.get('v1/users')
      .catch(err => {
        console.log('err >>  ', err)
      })

    assert.strictEqual(true, response instanceof ResponseWrapper)
    assert.strictEqual('data', response.config.dataKey)
    assert.strictEqual('collection', response.type)

    assert.strictEqual(true, isObject(response.extra('links')))
    assert.strictEqual(103, response.extra('total'))

    const response2 = await r.build('api', { withoutDataBlock: true }).get('v1/users')
      .catch(err => {
        console.log('err >>  ', err)
      })

    assert.strictEqual(true, response2 instanceof ResponseWrapper)
    assert.strictEqual('', response2.config.dataKey)
    assert.strictEqual('entity', response2.type)
    // assert.strictEqual(2, response2.data('data.id'))

    assert.strictEqual(true, isArray(response2.data('data')))
    assert.strictEqual(true, isObject(response2.data()))
    assert.strictEqual(true, isObject(response2.data('links')))
    assert.strictEqual(103, response2.data('total'))

    const response3 = await r.build('api').get('v1/users/2')
      .catch(err => {
        console.log('err >>  ', err)
      })

    assert.strictEqual(true, response3 instanceof ResponseWrapper)
    assert.strictEqual('data', response3.config.dataKey)
    assert.strictEqual('entity', response3.type)
    assert.strictEqual(true, isObject(response3.data()))
    assert.strictEqual(2, response3.data('id'))
    assert.strictEqual(false, isEmpty(response3.data('url')))

    const responseUuid = await r.build('api').get('v2/users/bf48b829-1d3b-4443-a4fc-269935de2748')
      .catch(err => {
        console.log('err >>  ', err)
      })

    assert.strictEqual(true, responseUuid instanceof ResponseWrapper)
    assert.strictEqual('data', responseUuid.config.dataKey)
    assert.strictEqual('entity', responseUuid.type)
    assert.strictEqual('bf48b829-1d3b-4443-a4fc-269935de2748', responseUuid.data('id'))
    assert.strictEqual(true, isArray(responseUuid.data('permissions')))
  })
})
