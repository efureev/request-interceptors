import axios from 'axios'
import { buildAction } from './actions'

const defaultInterceptorConfig = () => ({
  actionAttributeName: 'status',
})

const errHandler = (interceptorConfig, configLayer) => (error) => {
  const { config } = error

  if (error.data && error.data[interceptorConfig.actionAttributeName]) {
    const action = buildAction(
      error.data[interceptorConfig.actionAttributeName],
      interceptorConfig,
    )

    if (action) {
      action.run(config, error.response)
      if (configLayer.extra.onlyOneAction) {
        const err = new axios.Cancel()
        err.response = response

        throw err
      }
      // throw new axios.Cancel()
    }
  }

  return Promise.reject(error)
}

const successHandler = (interceptorConfig, configLayer) =>
  /**
   * @param {ResponseWrapper} response
   * @return {ResponseWrapper}
   */
    (response) => {

    const action = buildAction(
      !response.isBinary()
        ? response.response.data[interceptorConfig.actionAttributeName]
        : { type: 'blob' },
      interceptorConfig)

    if (action) {
      response.action = action

      action.run(configLayer, response)
      if (configLayer.extra.onlyOneAction) {
        const err = new axios.Cancel()
        err.response = response

        throw err
      }
    }

    return response
  }

const ActionInterceptorBuild = (interceptorConfig = defaultInterceptorConfig()) => (configLayer) =>
  [
    successHandler(interceptorConfig, configLayer),
    errHandler(interceptorConfig, configLayer),
  ]

export {
  ActionInterceptorBuild,
}
