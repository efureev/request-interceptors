const ConsoleLogRequestInterceptor = function (enable = false) {
  if (!enable) {
    return;
  }

  return (options, extra) => config => {
    console.info(`\t🌐 [${config.method.toUpperCase()}] ${config.baseURL}/${config.url}`);
    return config;
  };
};

export default ConsoleLogRequestInterceptor;
//# sourceMappingURL=ConsoleLogRequestInterceptor.js.map