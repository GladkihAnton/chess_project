import {UPDATE_SIGNUP_FIELD_ACTION, GET_SESSION_DATA_ACTION} from "../actions/actions";

const initialState = {
    signup: {
        email: 'asd',
        password: '',
        confirmPassword: ''
    },
    bla:'123',
    isAuthenticate: false,
    accessToken: null
};


export function profile(state=initialState, action) {
    let newState = {
        ...state,
        signup: {...state.signup}
    };

    switch(action.type) {
        case UPDATE_SIGNUP_FIELD_ACTION: {
            newState.signup[action.fieldName] = action.fieldValue;
            return newState;
        }
        case GET_SESSION_DATA_ACTION: {
            console.log(action.data);
            newState.isAuthenticate = false;
            return newState;
        }

        default: return newState;
    }
}
