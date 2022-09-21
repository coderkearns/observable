export function bind(o, node, onObserveChange, eventName, onEvent) {
    if (!o.$OBSERVABLE) throw new Error("bind() requires an observable as it's second value")

    // TODO decide whether to handle `shouldRender` ourselves or have the users handle it.
    // The users handling it allows them to call `.set()` of other observables if they choose, but puts more work on their end.
    // It would remove some of the "magic" though, which would be nice.
    let shouldRender = true

    const observableChangeListener = (...args) => {
        if (shouldRender) {
            onObserveChange.call(...args)
        }
    }

    const removeListener = o.subscribe(observableChangeListener)

    const handleEvent = (e) => {
        shouldRender = false // Remove the subscribe listener so any calls to set() don't rerender the node with the same value
        onEvent(e)
        shouldRender = true // Resubscribe
    }
    node.addEventListener(eventName, handleEvent)

    // Return a cleanup function to remove listeners
    return () => {
        removeListener()
        node.removeEventListener(eventName, handleEvent)
    }
}

// Bind an <input> element to an observable for the "input" event
export function bindInput(o, node) {
    return bind(o, node, v => { node.value = v }, "input", e => o.set(e.target.value))
}

// One-way binding between a <ul> element and an observable of a array when given a function to create each <li> element
export function bindList(o, node, createLi = (v) => { const li = document.createElement("li"); li.textContent = v; return li }) {
    // One-way binding, so bind() is not used under the hood
    if (!o.$OBSERVABLE) throw new Error("bind.list() requires an observable as it's second value")

    const removeListener = o.subscribe(() => {
        const childEls = o().map(createLi)
        node.replaceChildren(...childEls)
    })

    return () => {
        removeListener()
    }
}
