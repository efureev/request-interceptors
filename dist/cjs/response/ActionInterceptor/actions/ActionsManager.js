"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionsManager = void 0;
class ActionsManager {
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
exports.ActionsManager = ActionsManager;
const globalActionManager = new ActionsManager();
exports.default = globalActionManager;
//# sourceMappingURL=ActionsManager.js.map