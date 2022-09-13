import { useState, useEffect } from 'react'

export default function useObservable(o) {
    const [state, _setState] = useState()

    useEffect(() => {
        const unsubscribe = o.subscribe(v => { _setState(() => v) })
        _setState(o())

        return () => {
            unsubscribe()
        }
    }, [o])


    return [state, o.set]
}
