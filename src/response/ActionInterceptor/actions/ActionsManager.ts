import type { Nullable } from '~/global'

export class ActionsManager {
  private readonly list: Map<string, Function>

  constructor() {
    this.list = new Map()
  }

  public add(type: string, action: Function): void {
    this.list.set(type, action)
  }

  public addList(typeList: string[], action: Function): void {
    typeList.forEach((type: string) => {
      this.add(type, action)
    })
  }

  public get(type: string): Nullable<Function> {
    return this.list.get(type)
  }

  public keys(): string[] {
    return Array.from(this.list.keys())
  }

  public all(): Map<string, Function> {
    return this.list
  }

  public clear(): void {
    this.list.clear()
  }
}

const globalActionManager = new ActionsManager()

export default globalActionManager
