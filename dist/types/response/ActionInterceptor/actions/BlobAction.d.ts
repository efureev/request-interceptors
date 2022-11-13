import BaseAction from './BaseAction';
import type { LayerConfig } from '@feugene/layer-request';
import type { AxiosResponse } from 'axios';
import ResponseWrapper from '../../../response/WrapperInterceptor/ResponseWrapper';
export default class BlobAction extends BaseAction {
    run(configLayer: LayerConfig, response: AxiosResponse | ResponseWrapper): void;
}
//# sourceMappingURL=BlobAction.d.ts.map