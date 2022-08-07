"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.S503 = exports.S500 = exports.S422 = exports.S404 = exports.S401 = exports.S400 = exports.S204 = exports.S201 = exports.S200 = void 0;
exports.default = statusMessage;
var S200 = 'All done. Request successfully executed';
exports.S200 = S200;
var S201 = 'Data successfully created';
exports.S201 = S201;
var S204 = 'Not Content';
exports.S204 = S204;
var S400 = 'Bad Request';
exports.S400 = S400;
var S401 = 'Need auth';
exports.S401 = S401;
var S404 = 'Not found';
exports.S404 = S404;
var S422 = 'Unprocessable Entity';
exports.S422 = S422;
var S500 = 'Server error';
exports.S500 = S500;
var S503 = 'Service Unavailable';
exports.S503 = S503;

function statusMessage(status) {
  var message = '';

  switch (status) {
    case 200:
      message = S200;
      break;

    case 201:
      message = S201;
      break;

    case 204:
      message = S204;
      break;

    case 400:
      message = S400;
      break;

    case 401:
      message = S401;
      break;

    case 404:
      message = S404;
      break;

    case 422:
      message = S422;
      break;

    case 500:
      message = S500;
      break;

    case 503:
      message = S503;
      break;

    default:
      message = 'Something wrong. Client default error message';
      break;
  }

  return message;
}
//# sourceMappingURL=statuses.js.map