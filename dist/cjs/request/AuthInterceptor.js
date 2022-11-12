"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mu_1 = require("@feugene/mu");
const AuthInterceptor = (layerConfig, extra) => (config) => {
    const auth = layerConfig.getExtra('auth');
    if (auth) {
        ;
        config.headers.Authorization = (0, mu_1.isFunction)(auth) ? auth(config) : config.auth;
    }
    else {
        config.headers && delete config.headers.Authorization;
    }
    return config;
};
exports.default = AuthInterceptor;
//# sourceMappingURL=AuthInterceptor.js.map