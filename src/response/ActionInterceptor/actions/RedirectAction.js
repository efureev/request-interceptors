import BaseAction from './BaseAction'
import ErrorAction from './ErrorAction'

export default class RedirectAction extends BaseAction {
  applyProperties(data) {
    this.url = data.url
    this.target = data.target

    this.normalizeTarget()
  }

  run(axiosConfig, response) {
    if (/^http(s)?:\/\//.test(this.url)) {
      this.openUrl(this.url)

      return
    }

    const url = new URL(window.location.origin + this.url)

    this.openUrl(url)
  }

  openUrl(url) {
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('target', this.target)
    a.click()

    this.done()

    throw new ErrorAction(`Redirect to ${url}`, this)
  }

  normalizeTarget() {
    if (this.target === '_blank' || this.target === '_self') {
      return
    }
    this.target = '_self'
  }
}
