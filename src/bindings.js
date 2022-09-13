export function bind(o, node, onObserveChange, eventName, onEvent) {
    if (!o.$OBSERVABLE) throw new Error("bind() requires an observable as it's second value")

    // We are using an object with .call() as our listener instead of a function so we can modify its behavior without resubscribing
    const observableChangeListener = {
        call: (...args) => onObserveChange.call(...args),
    }

    const removeListener = o.subscribe(onObserveChange)

    const handleEvent = (e) => {
        observableChangeListener.call = () => { } // Remove the subscribe listener so any calls to set() don't rerender the node with the same value
        onEvent(e)
        observableChangeListener.call = (...args) => onObserveChange.call(...args) // Resubscribe
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
