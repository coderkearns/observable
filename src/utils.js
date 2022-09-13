// Creates a itsy bitsy event emitter with only one event
//! Note that a listener is usually a function, but it can (not should, mind you) be an object with a .call() function EX { call: (_, ...args) => console.log(args) }
export function createSubscription(obj) {
    obj.$OBSERVABLE = true

    obj._listeners = []

    obj.subscribe = function subscribe(fn) {
        if (fn?.call === undefined || typeof fn.call !== 'function') throw new Error('Subscriber must be a function or object with .call()')
        obj._listeners.push(fn)
        return () => { obj._listeners = obj._listeners.filter(l => l !== fn) }
    }

    function trigger(...args) {
        obj._listeners.forEach(l => l.call({}, ...args))
    }

    return trigger
}
