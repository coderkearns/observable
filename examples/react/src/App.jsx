import { observable } from "../../src/observable"
// import useObservable from "../../src/hooks/useObservable"
import useRequireObservable from "../../src/hooks/useRequireObservable"
import './App.css'

// Usually in a separate file with all the global state
const c = observable(0)

function App() {
    // const [count, setCount] = useObservable(c)
    useRequireObservable(c)

    return (
        <div className="App">
            <h1>Hello, Observable!</h1>
            <p>Count is {c()}</p>
            {/* <p>Count is {count}</p> */}
            {/* <button onClick={() => setCount(oldCount => oldCount + 1)}>count++</button> */}
            <button onClick={() => c.set(oldCount => oldCount + 1)}>count++</button>
        </div>
    )
}

export default App
