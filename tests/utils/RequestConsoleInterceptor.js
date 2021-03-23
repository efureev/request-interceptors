const RequestConsoleInterceptor = (options) =>
  (config) => {
    options.requestConfig.runRequestInterceptors.push('RequestConsoleInterceptor')

    console.log('run RequestConsoleInterceptor')
    return config
  }

export default RequestConsoleInterceptor
