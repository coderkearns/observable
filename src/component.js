import { createSubscription } from "./utils.js"
/* A component is a function that takes props and returns an element.
It can rely on a couple properties:
    1. `this` will always point to it's global "state" where things to be kept between renders can be stored.
    2. If it has a .update() function, that will be called to rerender. If not, it will re-call the base function with the same `this` state.
    3. If it has a .destroy() function, that will be called to remove the component.

Note that, in order to satisfy these conditions, the component doesn't actually *need* to be a function.
It can actually be any object with a `call()` method, and optional `update()` and `destroy()` methods
*/

export function Component(componentFn) {
    return function (props) {
        const state = {}

        const component = () => componentFn.call(state, props)

        // The component and it's methods like .update() can be accessed from inside using `this.$this`
        state.$this = component

        const trigger = createSubscription(component)

        if (typeof componentFn.update === 'function') {
            component.update = (...args) => {
                componentFn.update.call(state, ...args)
                trigger("update", ...args)
            }
        }

        if (typeof componentFn.destroy === 'function') {
            component.destroy = () => componentFn.destroy.call(state)
            trigger("destroy")
        }

        return component
    }
}

// EXAMPLE
/*
const Counter = Component(function ({ start = 0 }) {
    this.count = observable(start)

    const el = document.createElement('button')
    el.addEventListener("click", this.count.set(c => c + 1))
    this.count.subscribe((v) => el.innerText = `Count is now ${v}.`)

    return el
})

document.body.appendChild(Counter())
*/
