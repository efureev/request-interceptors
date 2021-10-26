export default class ContentAction {
  constructor(data) {
    this.type = data.type
    this.executed = false
  }

  run(config, response) {}

  done() {
    this.executed = true
  }
}
