const errHandler = (error) => {
  console.info(
    `\t❌ [${error.response.config.method.toUpperCase()}]  ${
      error.response.request.responseURL || error.response.request.res.responseURL
    }`,
  )
  return Promise.reject(error)
}

const successHandler = (response) => {
  console.info(
    `\t✅ [${response.config.method.toUpperCase()}]  ${
      response.request.responseURL || response.request.res.responseURL
    }`,
  )
  return response
}

const ConsoleLogResponseInterceptor = function(enable = false) {
  return enable ? (configLayer) => [successHandler, errHandler] : null
}

export default ConsoleLogResponseInterceptor
