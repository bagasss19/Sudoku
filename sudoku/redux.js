import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

const globalStore = {
    boards: [],
    loading: true
}


export function FETCHBOARD(level) {
    return (dispatch) => {
        fetch(`https://sugoku.herokuapp.com/board?difficulty=${level}`)
            .then(response => response.json())
            .then(data => {
                dispatch(GETBOARD(data))
                dispatch(SETLOADING(false))
            })
            .catch(e => {
                console.log(e)
            })
    };
}

export function GETBOARD(data) {
    return { type: "GETBOARD", data }
}

export function SETLOADING(data) {
    return { type: "SETLOADING", data }
}

function reducer(state = globalStore, action) {
    switch (action.type) {
        case 'GETBOARD':
            return { ...state, boards: action.data }

        case 'SETLOADING':
            return { ...state, loading: action.data }

        default:
            return state
    }
}


const store = createStore(reducer, applyMiddleware(thunk))

// console.log(store.getState(), "<<<<<store redux")
export default store