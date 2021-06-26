import axios from 'axios'
import { buildAction } from './actions'

const defaultInterceptorConfig = () => ({
  actionAttributeName: 'status',
})

const errHandler = (interceptorConfig) => (error) => {
  const { config } = error

  if (error.data && error.data[interceptorConfig.actionAttributeName]) {
    const action = buildAction(error.data[interceptorConfig.actionAttributeName])

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

const ActionInterceptorBuild = (interceptorConfig = defaultInterceptorConfig()) => (configLayer) =>
  [
    /**
     * @param {ResponseWrapper} response
     * @return {ResponseWrapper}
     */
      (response) => {

      const action = buildAction(!response.isBinary()
        ? response.extra(interceptorConfig.actionAttributeName)
        : { type: 'blob' },
      )

      if (action) {
        action.run(configLayer, response)
        if (configLayer.extra.onlyOneAction) {
          const err = new axios.Cancel()
          err.response = response

          throw err
        }
      }

      return response
    },
    errHandler(interceptorConfig),
  ]

export {
  ActionInterceptorBuild,
}
