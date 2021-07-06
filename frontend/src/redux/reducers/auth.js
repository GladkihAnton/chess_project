import {GET_SESSION_DATA_ACTION, UPDATE_AUTHENTICATION_ACTION, UPDATE_TOKEN_REFRESHING_ACTION} from "../actions/auth";

const initialState = {
    isAuthenticate: false,
    isTokenRefreshing: false
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
            newState.isAuthenticate = action.isRefreshing;
            return newState;
        }

        default: return newState;
    }
}
