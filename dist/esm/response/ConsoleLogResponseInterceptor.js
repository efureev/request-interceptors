const errHandler = (error) => {
    if (!error.response?.config) {
        return;
    }
    console.info(`\t❌ [${error.response.config.method?.toUpperCase()}]  ${error.response.request.responseURL || error.response.request.res.responseUrl}`);
    return Promise.reject(error);
};
const successHandler = (response) => {
    console.info(`\t✅ [${response.config.method?.toUpperCase()}]  ${response.request.responseURL || response.request.res.responseUrl}`);
    return response;
};
const ConsoleLogResponseInterceptor = function (enable = false) {
    return enable ? (options, extra) => [successHandler, errHandler] : null;
};
export default ConsoleLogResponseInterceptor;
//# sourceMappingURL=ConsoleLogResponseInterceptor.js.map