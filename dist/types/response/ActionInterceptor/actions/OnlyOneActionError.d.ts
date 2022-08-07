import type { AxiosResponse } from 'axios';
export default class OnlyOneActionError extends Error {
    response: AxiosResponse;
    constructor(response: AxiosResponse);
}
//# sourceMappingURL=OnlyOneActionError.d.ts.map