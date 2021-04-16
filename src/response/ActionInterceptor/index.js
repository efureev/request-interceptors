import axios from 'axios'
import { buildAction } from './actions'

const defaultInterceptorConfig = () => ({
  actionAttributeName: 'status',
})

const ActionInterceptorBuild = (interceptorConfig = defaultInterceptorConfig()) => (options) =>
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
  }

export {
  ActionInterceptorBuild,
}
