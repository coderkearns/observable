import { useState, useEffect } from 'react'

function useRerender() {
    const [_, setS] = useState(false)
    return () => setS(s => !s)
}

export default function useRequireObservable(o) {
    const rerender = useRerender()

    useEffect(() => {
        const unsubscribe = o.subscribe(() => rerender())

        return () => {
            unsubscribe()
        }
    }, [o])
}
