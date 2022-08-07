import type BaseAction from './BaseAction'

export default class ErrorAction extends Error {
  public action: BaseAction

  constructor(error: string, action: BaseAction) {
    super(error)
    this.action = action
  }
}
