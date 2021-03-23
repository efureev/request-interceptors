const RequestConsoleInterceptor3 = (options) => (config) => {

  options.requestConfig.runRequestInterceptors.push('RequestConsoleInterceptor 3')

  console.log('run RequestConsoleInterceptor 3')
  return config
}

export default RequestConsoleInterceptor3
