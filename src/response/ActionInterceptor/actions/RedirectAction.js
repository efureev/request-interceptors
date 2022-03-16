import BaseAction from './BaseAction'

export default class RedirectAction extends BaseAction {
  constructor(data) {
    super(data)
    this.url = data.url
    this.target = data.target

    this.normalizeTarget()
  }

  handle(axiosConfig, response) {
    if (/^http(s)?:\/\//.test(this.url)) {
      this.openUrl(this.url)

      return false
    }

    const url = new URL(window.location.origin + this.url)

    this.openUrl(url)
  }

  openUrl(url) {
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('target', this.target)
    a.click()
  }

  normalizeTarget() {
    if (this.target === '_blank' || this.target === '_self') {
      return
    }
    this.target = '_self'
  }
}
