import assert from 'assert'
import type { LayerConfig } from '@feugene/layer-request'
import { buildLayerRequest } from '@feugene/layer-request'
import WrapperInterceptor from '../src/response/WrapperInterceptor'
import ResponseWrapper from '../src/response/WrapperInterceptor/ResponseWrapper'
import { isArray, isEmpty, isNull, isObject } from '@feugene/mu'

describe('create Request with interceptoprs', () => {

  it('response wrapper interceptor with data key', async () => {

    const layerRequest = buildLayerRequest()

    const layoutApi = layerRequest.manager.addLayer((cm) => cm.createLayer({
      axiosRequestConfig: {
        baseURL: 'https://mockery.dev/api',
        timeout: 30000,
      },
      interceptors: {
        // @ts-ignore
        response: [WrapperInterceptor()],
      },
    }))

    layerRequest.manager.addLayer(layoutApi, 'api')

    const l: LayerConfig = <LayerConfig>layerRequest.manager.getLayer('api')

    assert.strictEqual(0, l.interceptors.request.length)
    assert.strictEqual(1, l.interceptors.response.length)

    const buildReq = layerRequest.useConfig('api')
    // @ts-ignore
    assert.strictEqual(1, buildReq.interceptors.response.handlers.length)

    const response: ResponseWrapper = <ResponseWrapper>await buildReq.get<any, ResponseWrapper>('v1/users')
      .catch
      (err => {
        console.log('err >>  ', err)
      })

    assert.strictEqual(true, response instanceof ResponseWrapper)
    // @ts-ignore
    assert.strictEqual('data', response.config.dataKey)
    assert.strictEqual('collection', response.getDataType())

    assert.strictEqual(true, isObject(response.extra('links')))
    assert.strictEqual(103, response.extra('total'))

    const response2: ResponseWrapper = <ResponseWrapper>await layerRequest
      .useConfig('api', { withoutDataBlock: true })
      .get<Record<string, any>, ResponseWrapper>('v1/users')
      .catch(err => {
        console.log('err >>  ', err)
      })

    assert.strictEqual(true, response2 instanceof ResponseWrapper)
    // @ts-ignore
    assert.strictEqual('', response2.config.dataKey)
    assert.strictEqual('entity', response2.getDataType())

    assert.strictEqual(true, isArray(response2.data('data')))
    assert.strictEqual(true, isObject(response2.data()))
    assert.strictEqual(true, isObject(response2.data('links')))
    assert.strictEqual(103, response2.data('total'))

    const response3: ResponseWrapper = <ResponseWrapper>await layerRequest.useConfig('api')
      .get<any, ResponseWrapper>('v1/users/2')
      .catch(err => {
        console.log('err >>  ', err)
      })

    assert.strictEqual(true, response3 instanceof ResponseWrapper)
    // @ts-ignore
    assert.strictEqual('data', response3.config.dataKey)
    assert.strictEqual('entity', response3.getDataType())
    assert.strictEqual(true, isObject(response3.data()))
    assert.strictEqual(2, response3.data('id'))
    assert.strictEqual(false, isEmpty(response3.data('url')))

    const responseUuid: ResponseWrapper = <ResponseWrapper>await layerRequest.useConfig('api')
      .get<any, ResponseWrapper>('v2/users/bf48b829-1d3b-4443-a4fc-269935de2748')
      .catch(err => {
        console.log('err >>  ', err)
      })

    assert.strictEqual(true, responseUuid instanceof ResponseWrapper)
    // @ts-ignore
    assert.strictEqual('data', responseUuid.config.dataKey)
    assert.strictEqual('entity', responseUuid.getDataType())
    assert.strictEqual('bf48b829-1d3b-4443-a4fc-269935de2748', responseUuid.data('id'))

    assert.strictEqual(false, isNull(responseUuid.data('permissions')))
  })
})
