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
      throw new axios.Cancel()
    }
  }

  return Promise.reject(error)
}

const ActionInterceptorBuild = (interceptorConfig = defaultInterceptorConfig()) => (options) =>
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
        action.run(options, response)
        throw new axios.Cancel()
      }

      return response
    },
    errHandler(interceptorConfig),
  ]

export {
  ActionInterceptorBuild,
}
