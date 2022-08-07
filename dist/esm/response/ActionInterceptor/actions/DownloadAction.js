import BaseAction from './BaseAction';
export default class DownloadAction extends BaseAction {
  constructor(data, interceptorConfig) {
    super(data, interceptorConfig);
    this.url = data.url;
    this.name = data.name;
  }

  handle(configLayer, response) {
    const link = document.createElement('a');
    link.href = this.url;

    if (this.name) {
      link.download = this.name;
    }

    document.body.append(link);
    link.click();
    link.remove();
  }

}
//# sourceMappingURL=DownloadAction.js.map