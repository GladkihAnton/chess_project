import {combineReducers, createStore} from "redux";
import {game} from "./reducers/game";
import {auth} from "./reducers/auth";
import {lobbies} from "./reducers/lobbies";

function configureStore() {
    return createStore(
        combineReducers({game, auth, lobbies}),
    );
}
let store = configureStore();

export function getPlayerId() {return store.getState().auth.playerId}

export default store