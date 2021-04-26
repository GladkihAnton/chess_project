import {UPDATE_SIGNUP_FIELD} from "../actions/actions";

const initialState = {
    signup: {
        email: 'asd',
        password: '',
        confirmPassword: ''
    },
    bla:'123',
};

export function profile(state=initialState, action) {
    console.log(action);
    let newState = {
        ...state,
        signup: {...state.signup}
    };
    switch(action.type) {
        case UPDATE_SIGNUP_FIELD: {
            newState.signup[action.fieldName] = action.fieldValue;
            return newState;
        }

        default: return newState;
    }
}
