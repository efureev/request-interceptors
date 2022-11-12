import BaseAction from './BaseAction';
import { b64ToUtf8Safe } from '@feugene/mu';
import ResponseWrapper from '../../WrapperInterceptor/ResponseWrapper';
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
export default class BlobAction extends BaseAction {
    run(configLayer, response) {
        let responseData;
        let axiosResponse;
        if (response instanceof ResponseWrapper) {
            axiosResponse = response.response;
        }
        else {
            responseData = response.data;
            axiosResponse = response;
        }
        const contentDisposition = axiosResponse.headers['content-disposition'];
        const headerFilename = axiosResponse.headers['x-filename'];
        const filename = getFileName(contentDisposition, b64ToUtf8Safe(headerFilename));
        buildReader(filename, () => {
            this.done();
        })
            .readAsDataURL(new Blob([responseData], {
            type: responseData.type || 'application/octet-stream',
        }));
    }
}
//# sourceMappingURL=BlobAction.js.map