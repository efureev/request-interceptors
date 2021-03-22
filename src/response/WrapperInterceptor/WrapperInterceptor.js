import makeError from '../../errors'
import ResponseWrapper from './ResponseWrapper'
import { isFunction } from '@feugene/mu/src/is'

const errHandler = (error) => {
  const { config } = error
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) {
    return Promise.reject(makeError(error))
  }

  if (!error.response && isFunction(options.onThrowErrorFn)) {
    return options.onThrowErrorFn(error, this)
    // @todo create none http error
    // return Promise.reject(makeError(error))
  }

  const errorWrap = makeError(error)

  return Promise.reject(errorWrap)
}

const successHandler = (ResponseWrapperConfig) => (response) => {
  //console.log('WrapperInterceptor: response', response)
  return new ResponseWrapper(response, ResponseWrapperConfig)
}

// @todo rewrite this block
const BuildWrapperInterceptor = (ResponseWrapperConfig) => {
  //console.log('WrapperInterceptor: WrapperInterceptorConfig', ResponseWrapperConfig)

  return (layerConfig) => {
    //console.log('WrapperInterceptor: config', layerConfig)
    return [
      (response) => {
        // const config = merge({}, ResponseWrapperConfig, layerConfig)
        return new ResponseWrapper(response, layerConfig.extra.withoutDataBlock ? { dataKey: '' } : null)
      },
      errHandler,
    ]
  }
}

const WrapperInterceptor = () => {
  return (layerConfig) => [
    (response) => new ResponseWrapper(response, layerConfig.extra.withoutDataBlock ? { dataKey: '' } : null),
    errHandler,
  ]
}

export default WrapperInterceptor

export {
  BuildWrapperInterceptor,
}
