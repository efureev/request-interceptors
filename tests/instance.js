import '@babel/polyfill'

import assert from 'assert'
import buildRequest from '@feugene/layer-request'
// import WrapperInterceptor from '../src/response/WrapperInterceptor/WrapperInterceptor'
import RequestConsoleInterceptor from './utils/RequestConsoleInterceptor'
import RequestConsoleInterceptor2 from './utils/RequestConsoleInterceptor2'
import RequestConsoleInterceptor3 from './utils/RequestConsoleInterceptor3'
import { forEach } from '@feugene/mu/src'
import isObject from '@feugene/mu/src/is/isObject'

describe('create Request with interceptoprs', () => {
  it('request interceptors', async () => {

    const r = buildRequest()

    const layoutApi = r.manager.addLayer((cm) => cm.new({
      requestConfig: {
        baseURL: 'https://mockery.dev/api/v1',
        timeout: 30000,
      },
      interceptors: {
        request: [RequestConsoleInterceptor, RequestConsoleInterceptor2, RequestConsoleInterceptor3],
      },
    }))

    r.manager.addLayer(layoutApi, 'api')

    const l = r.manager.getLayer('api')

    assert.strictEqual(3, l.interceptors.request.length)
    assert.strictEqual(0, l.interceptors.response.length)

    const buildReq = r.build('api')
    // console.log(buildReq.wrapper.selectConfig)
    buildReq.wrapper.selectConfig.requestConfig.runRequestInterceptors = []

    assert.strictEqual(3, buildReq.interceptors.request.handlers.length)

    const response = await buildReq.get('users/2')
      .catch(err => {
        console.log('err >>  ', err)
      })

    assert.strictEqual(200, response.status)
    assert.strictEqual(true, isObject(response.headers))
    assert.strictEqual(true, isObject(response.config))

    forEach(['RequestConsoleInterceptor', 'RequestConsoleInterceptor 2', 'RequestConsoleInterceptor 3'], v => {
      assert.strictEqual(true, buildReq.wrapper.selectConfig.requestConfig.runRequestInterceptors.includes(v))
    })
  })

})
