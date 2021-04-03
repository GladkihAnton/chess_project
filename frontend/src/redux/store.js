import {createStore} from "redux";
import reducer from "./reducers/reducer";

function configureStore(initialState) {
    return createStore(
        reducer,
        initialState,
    );
}

const initialState = {
    board: [
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
    ],
    moves: Array(8).fill(Array(8).fill(''))
};


let store = configureStore(initialState);
console.log(store);
export default store