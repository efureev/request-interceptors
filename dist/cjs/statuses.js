"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S503 = exports.S500 = exports.S422 = exports.S404 = exports.S401 = exports.S400 = exports.S204 = exports.S201 = exports.S200 = void 0;
exports.S200 = 'All done. Request successfully executed';
exports.S201 = 'Data successfully created';
exports.S204 = 'Not Content';
exports.S400 = 'Bad Request';
exports.S401 = 'Need auth';
exports.S404 = 'Not found';
exports.S422 = 'Unprocessable Entity';
exports.S500 = 'Server error';
exports.S503 = 'Service Unavailable';
function statusMessage(status) {
    let message = '';
    switch (status) {
        case 200:
            message = exports.S200;
            break;
        case 201:
            message = exports.S201;
            break;
        case 204:
            message = exports.S204;
            break;
        case 400:
            message = exports.S400;
            break;
        case 401:
            message = exports.S401;
            break;
        case 404:
            message = exports.S404;
            break;
        case 422:
            message = exports.S422;
            break;
        case 500:
            message = exports.S500;
            break;
        case 503:
            message = exports.S503;
            break;
        default:
            message = 'Something wrong. Client default error message';
            break;
    }
    return message;
}
exports.default = statusMessage;
//# sourceMappingURL=statuses.js.map