import { Configer } from "./structs";
const originalRequireProto = module.constructor.prototype.require;
const injectRequireProto = (id: string) => {
    if (!skip && id in config) {
        skip = true;
        const time = originalRequireTime(id);
        waitThread((config[id] + 1) * time);
    } else {
        skip = false;
        module.constructor.prototype.require = originalRequireProto;
        const data = originalFullRequire(id);
        module.constructor.prototype.require = injectRequireProto;
        return data;
    }
};
const originalFullRequire = require;
let config: Configer = {};
let skip: boolean = false;
function waitThread(time: number): void {
    const start = Date.now();
    while (Date.now() - start < time) { };
}
export function timer(executor: () => any): number {
    const start = Date.now();
    executor();
    const end = Date.now();
    return end - start;
};
export function requireTime(id: string): number {
    return timer(() => require(id));
}
export function originalRequireTime(id: string): number {
    return timer(() => originalFullRequire(id));
}
export function percent(num: number): number {
    return num * 0.01;
}
export function increaseBy(newConfig: Configer): Configer {
    Object.assign(config, newConfig);
    const keys = Object.keys(config);
    for (const key of keys) {
        delete originalFullRequire.cache[require.resolve(key)];
    }
    Object.defineProperty(module.constructor.prototype, "require", {
        value: injectRequireProto
    });
    return config;
}
export function cancel(...name: string[]): boolean {
    for (const n of name) {
        if (n in config) {
            delete config[n];
        } else {
            return false;
        }
    }
    return true;
}