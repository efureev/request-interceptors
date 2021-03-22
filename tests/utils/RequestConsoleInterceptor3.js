const RequestConsoleInterceptor3 = (options) => (config) => {

  options.runRequestInterceptors.push('RequestConsoleInterceptor 3')

  console.log('run RequestConsoleInterceptor 3')
  return config
}

export default RequestConsoleInterceptor3
