import { createSubscription } from "./utils.js"

export function store(defaultValue = {}) {
    const _s = Object.assign({}, defaultValue)

    const trigger = createSubscription(_s)

    const s = new Proxy(_s, {
        get(target, prop) {
            return target[prop]
        },
        set(target, prop, newValue) {
            const oldValue = target[prop]
            target[prop] = (typeof newValue === 'function') ? newValue(oldValue) : oldValue

            trigger(prop, target[prop], oldValue)
        }
    })

    Object.defineProperty(s, "toString", { value: () => `store(${JSON.stringify(_s)})` })

    return s
}
