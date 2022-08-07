import { Nullable } from '../../../global';
export declare class ActionsManager {
    private readonly list;
    constructor();
    add(type: string, action: Function): void;
    addList(typeList: string[], action: Function): void;
    get(type: string): Nullable<Function>;
    keys(): string[];
    all(): Map<string, Function>;
    clear(): void;
}
declare const globalActionManager: ActionsManager;
export default globalActionManager;
//# sourceMappingURL=ActionsManager.d.ts.map