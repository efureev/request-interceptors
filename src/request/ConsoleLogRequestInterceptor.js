const ConsoleLogRequestInterceptor = function(enable = false) {
  if (!enable) {
    return null
  }

  return (options, requestExtra) => (config) => {
    console.info(
      `\t🌐 [${config.method.toUpperCase()}] ${config.baseURL}${config.url}`,
    )
    return config
  }
}

export default ConsoleLogRequestInterceptor
