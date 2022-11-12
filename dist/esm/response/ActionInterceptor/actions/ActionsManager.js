export class ActionsManager {
    constructor() {
        this.list = new Map();
    }
    add(type, action) {
        this.list.set(type, action);
    }
    addList(typeList, action) {
        typeList.forEach((type) => {
            this.add(type, action);
        });
    }
    get(type) {
        return this.list.get(type);
    }
    keys() {
        return Array.from(this.list.keys());
    }
    all() {
        return this.list;
    }
    clear() {
        this.list.clear();
    }
}
const globalActionManager = new ActionsManager();
export default globalActionManager;
//# sourceMappingURL=ActionsManager.js.map