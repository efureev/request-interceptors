import assert from 'assert'
import { LayerConfig, LayerRequest } from '@feugene/layer-request'

import RequestConsoleInterceptor from './utils/RequestConsoleInterceptor'
import RequestConsoleInterceptor2 from './utils/RequestConsoleInterceptor2'
import RequestConsoleInterceptor3 from './utils/RequestConsoleInterceptor3'
import { forEach, isObject } from '@feugene/mu'

describe('create Request with interceptors', () => {
  it('request interceptors', async () => {

    const layerRequest = new LayerRequest()

    const layoutApi = layerRequest.manager.addLayer((cm) => cm.createLayer({
      axiosRequestConfig: {
        baseURL: 'https://mockery.dev/api/v1',
        timeout: 30000,
      },
      interceptors: {
        request: [RequestConsoleInterceptor, RequestConsoleInterceptor2, RequestConsoleInterceptor3],
      },
    }))

    layerRequest.manager.addLayer(layoutApi, 'api')

    const l: LayerConfig = <LayerConfig>layerRequest.manager.getLayer('api')

    assert.strictEqual(3, l.interceptors.request.length)
    assert.strictEqual(0, l.interceptors.response.length)

    const axiosRequest = layerRequest.useConfig('api')

    // @ts-ignore
    axiosRequest.$layerRequest.selectedConfig.axiosRequestConfig.runRequestInterceptors = []

    // @ts-ignore
    assert.strictEqual(3, axiosRequest.interceptors.request.handlers.length)

    const response: any = await axiosRequest.get('users/2')
      .catch(err => {
        console.log('err >>  ', err)
      })

    assert.strictEqual(200, response.status)
    assert.strictEqual(true, isObject(response.headers))
    assert.strictEqual(true, isObject(response.config))

    forEach(['RequestConsoleInterceptor', 'RequestConsoleInterceptor 2', 'RequestConsoleInterceptor 3'], v => {
      // @ts-ignore
      assert.strictEqual(true, axiosRequest.$layerRequest.selectedConfig.axiosRequestConfig.runRequestInterceptors.includes(v))
    })
  })

})
