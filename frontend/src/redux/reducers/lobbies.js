import {OPEN_CREATE_LOBBY_ACTION, CREATE_NEW_LOBBY_ACTION} from "../actions/lobbies";

const initialState = {
    isCreateLobbyModalOpen: false,
    lobbies: []
};


export function lobbies(state=initialState, action) {
    let newState = {
        ...state,
        ...state.lobbies
    };

    switch(action.type) {
        case OPEN_CREATE_LOBBY_ACTION:
            newState.isCreateLobbyModalOpen = action.isOpen;
            return newState;

        case CREATE_NEW_LOBBY_ACTION:
            newState.lobbies.push(action.lobbyData);
            return newState;

        default:
            return newState;
    }
}
