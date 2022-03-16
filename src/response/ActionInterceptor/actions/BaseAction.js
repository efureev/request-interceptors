export default class ContentAction {
  constructor(data, interceptorConfig) {
    this.type = data.type
    this.rawData = data
    this.executed = false
    this.interceptorConfig = interceptorConfig
  }

  run(config, response) {
    if (!this.shouldHandle()) {
      return
    }

    if (this.handle(config, response) !== false) {
      this.done()
    }
  }

  handle(config, response) {}

  done() {
    this.executed = true
  }

  shouldHandle() {
    return true
  }
}
