import {combineReducers, createStore} from "redux";
import {game} from "./reducers/game";
import {profile} from "./reducers/profile";

function configureStore() {
    return createStore(
        combineReducers({game, profile}),
    );
}
let store = configureStore();

export default store