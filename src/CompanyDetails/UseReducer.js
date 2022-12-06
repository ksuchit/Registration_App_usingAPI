import { useReducer } from "react"

const initialState = 0;
const reducer = (state,action) => {
    switch (action) {
        case 'increment':
            return state + 1
        case 'decrement':
            return state - 1
        case 'reset':
            return state=0
        default:
            return state
    }
}

export default function UseReducer() {

    const [count,dispatch ]=useReducer(reducer,initialState)
    return (
        <div>
            <div>count= {count}</div>
            <button onClick={()=>dispatch('increment')}>Increament</button>
            <button onClick={()=>dispatch('decrement')}>Decreament</button>
            <button onClick={() => dispatch('reset')}>Reset</button>
        </div>
    )
}