import {
    GET_SESSION_DATA_ACTION,
    UPDATE_AUTHENTICATION_ACTION,
    UPDATE_TOKEN_REFRESHING_ACTION,
    UPDATE_USER_ID_ACTION
} from "../actions/auth";

const initialState = {
    isAuthenticate: false,
    isTokenRefreshing: false,
    playerId: null
};


export function auth(state=initialState, action) {
    let newState = {
        ...state,
    };

    switch(action.type) {
        case GET_SESSION_DATA_ACTION: {
            // newState.isAuthenticate = false;
            return newState;
        }

        case UPDATE_AUTHENTICATION_ACTION: {
            newState.isAuthenticate = action.isAuthenticate;
            return newState;
        }

        case UPDATE_TOKEN_REFRESHING_ACTION: {
            newState.isTokenRefreshing = action.isRefreshing;
            return newState;
        }

        case UPDATE_USER_ID_ACTION: {
            newState.playerId = action.playerId;
            return newState;
        }

        default: return newState;
    }
}
