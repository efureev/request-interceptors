"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BaseAction", {
  enumerable: true,
  get: function get() {
    return _BaseAction.default;
  }
});
Object.defineProperty(exports, "BlobAction", {
  enumerable: true,
  get: function get() {
    return _BlobAction.default;
  }
});
Object.defineProperty(exports, "DownloadAction", {
  enumerable: true,
  get: function get() {
    return _DownloadAction.default;
  }
});
Object.defineProperty(exports, "RedirectAction", {
  enumerable: true,
  get: function get() {
    return _RedirectAction.default;
  }
});
exports.buildAction = buildAction;
Object.defineProperty(exports, "globalActionManager", {
  enumerable: true,
  get: function get() {
    return _ActionsManager.default;
  }
});

var _mu = require("@feugene/mu");

var _DownloadAction = _interopRequireDefault(require("./DownloadAction"));

var _BlobAction = _interopRequireDefault(require("./BlobAction"));

var _RedirectAction = _interopRequireDefault(require("./RedirectAction"));

var _ActionsManager = _interopRequireDefault(require("./ActionsManager"));

var _BaseAction = _interopRequireDefault(require("./BaseAction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ActionsManager.default.add('download', _DownloadAction.default);

_ActionsManager.default.add('blob', _BlobAction.default);

_ActionsManager.default.add('redirect', _RedirectAction.default);

function buildAction(data, interceptorConfig) {
  if (!(0, _mu.isObject)(data) || (0, _mu.isEmpty)(data.type)) {
    return;
  }

  if (data.private) {
    return;
  }

  var action = _ActionsManager.default.get(data.type);

  if (!action) {
    return;
  }

  return new action(data, interceptorConfig);
}
//# sourceMappingURL=index.js.map