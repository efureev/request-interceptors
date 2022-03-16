export default class ContentAction {
  constructor(data) {
    this.type = data.type
    this.rawData = data
    this.executed = false
  }

  run(config, response) {}

  done() {
    this.executed = true
  }
}
