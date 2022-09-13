import { createSubscription } from "./utils.js"

export function mutable(value) {
    //! NOTE that the value passed in will be mutated, so make sure to clone beforehand if that's not what you want.
    let m = () => value

    const trigger = createSubscription(m)

    m.mutate = fn => {
        fn(value)
        trigger()
    }

    m.toString = () => `mutable(${value})`

    return m
}
