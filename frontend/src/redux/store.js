import {combineReducers, createStore} from "redux";
import {game} from "./reducers/reducer";

function configureStore() {
    return createStore(
        combineReducers({game}),
    );
}
let store = configureStore();

export default store