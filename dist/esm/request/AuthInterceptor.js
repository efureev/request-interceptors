import { isFunction } from '@feugene/mu';
const AuthInterceptor = (layerConfig, extra) => (config) => {
    const auth = layerConfig.getExtra('auth');
    if (auth) {
        ;
        config.headers.Authorization = isFunction(auth) ? auth(config) : config.auth;
    }
    else {
        config.headers && delete config.headers.Authorization;
    }
    return config;
};
export default AuthInterceptor;
//# sourceMappingURL=AuthInterceptor.js.map