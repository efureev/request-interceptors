import isFunction from '@feugene/mu/src/is/isFunction'

const AuthInterceptor = (options) => (config) => {
  if (options.auth) {
    config.headers.Authorization = isFunction(options.auth) ? (options.auth)(config) : config.auth
  } else {
    delete config.headers.Authorization
  }
}

export default AuthInterceptor
