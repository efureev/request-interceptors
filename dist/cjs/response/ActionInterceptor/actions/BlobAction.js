"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseAction_1 = __importDefault(require("./BaseAction"));
const mu_1 = require("@feugene/mu");
const ResponseWrapper_1 = __importDefault(require("../../WrapperInterceptor/ResponseWrapper"));
const getFileName = (contentDisposition, value) => {
    if (value) {
        return value;
    }
    if (contentDisposition) {
        return contentDisposition.split('filename=')[1];
    }
    return 'download-file';
};
const buildReader = (filename, fnOnDone) => {
    const reader = new FileReader();
    reader.onloadend = function () {
        let url = reader.result;
        url = url.replace(/^data:[^;]*;/, 'data:attachment/file;');
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.target = '_blank';
        document.body.append(link);
        link.click();
        link.remove();
        fnOnDone();
    };
    return reader;
};
class BlobAction extends BaseAction_1.default {
    run(configLayer, response) {
        let responseData;
        let axiosResponse;
        if (response instanceof ResponseWrapper_1.default) {
            axiosResponse = response.response;
        }
        else {
            responseData = response.data;
            axiosResponse = response;
        }
        const contentDisposition = axiosResponse.headers['content-disposition'];
        const headerFilename = axiosResponse.headers['x-filename'];
        const filename = getFileName(contentDisposition, (0, mu_1.b64ToUtf8Safe)(headerFilename));
        buildReader(filename, () => {
            this.done();
        })
            .readAsDataURL(new Blob([responseData], {
            type: responseData.type || 'application/octet-stream',
        }));
    }
}
exports.default = BlobAction;
//# sourceMappingURL=BlobAction.js.map