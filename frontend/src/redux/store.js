import {combineReducers, createStore} from "redux";
import {game} from "./reducers/game";
import {auth} from "./reducers/auth";

function configureStore() {
    return createStore(
        combineReducers({game, auth}),
    );
}
let store = configureStore();

export default store