const RequestConsoleInterceptor = (options) =>
  (config) => {
    options.runRequestInterceptors.push('RequestConsoleInterceptor')

    console.log('run RequestConsoleInterceptor')
    return config
  }

export default RequestConsoleInterceptor
