const RequestConsoleInterceptor2 = (options) => (config) => {
  options.requestConfig.runRequestInterceptors.push('RequestConsoleInterceptor 2')

  console.log('run RequestConsoleInterceptor 2')
  return config
}

export default RequestConsoleInterceptor2
