import { createSubscription } from "./utils.js"

export function observable(value) {
    let o = () => value

    const trigger = createSubscription(o)

    o.set = newValue => {
        const oldValue = value
        value = (typeof newValue === "function") ? newValue(oldValue) : newValue
        trigger(value, oldValue)
    }

    o.toString = () => `observable(${value})`

    return o
}
