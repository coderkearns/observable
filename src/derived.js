import { observable } from "./observable.js"

export function derived(observables, fn) {
    if (!Array.isArray(observables)) observables = [observables]

    const d = observable(fn())

    const handler = () => d.set(fn())
    observables.forEach(o => o.subscribe(handler))

    d.toString = () => `derived(${d()})`

    return d
}
