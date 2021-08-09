class ActionsManager {
  constructor() {
    this.list = {}
  }

  /**
   * @param {String} type
   * @param {String} action
   */
  add(type, action) {
    this.list[type] = action
  }

  /**
   * @param {Array} typeList
   * @param {String} action
   */
  addList(typeList, action) {
    typeList.forEach((type) => {
      this.add(type, action)
    })
  }

  /**
   * @param {String} type
   * @return {*}
   */
  get(type) {
    return this.list[type] ?? null
  }

  clear() {
    this.list = {}

    return this
  }
}

const manager = new ActionsManager()

export default manager
export { ActionsManager }
