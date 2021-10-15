import BaseAction from './BaseAction'

export default class RedirectAction extends BaseAction {
  constructor(data) {
    super(data)
    this.url = data.url
    this.target = data.target

    this.normalizeTarget()
  }

  run(axiosConfig) {
    if (/^http(s)?:\/\//.test(this.url)) {

      this.openUrl(this.url)

      return
    }

    const url = new URL(window.location.origin + this.url)

    this.openUrl(url)
  }

  openUrl(url) {
    window.open(url, this.target) || window.location.replace(url)
  }

  normalizeTarget() {
    if (this.target === '_blank' || this.target === '_self') {
      return
    }
    this.target = '_self'
  }
}
