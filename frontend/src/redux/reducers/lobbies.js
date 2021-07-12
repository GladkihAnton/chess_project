import {OPEN_CREATE_LOBBY_ACTION, CREATE_NEW_LOBBY_ACTION, GET_LOBBIES_ACTION} from "../actions/lobbies";

const initialState = {
    isCreateLobbyModalOpen: false,
    lobbyIdToLobby: {}
};


export function lobbies(state=initialState, action) {
    let newState = {
        ...state,
        ...state.lobbyIdToLobby
    };

    switch(action.type) {
        case OPEN_CREATE_LOBBY_ACTION:
            newState.isCreateLobbyModalOpen = action.isOpen;
            return newState;

        case CREATE_NEW_LOBBY_ACTION:
            newState.lobbyIdToLobby[action.lobbyId] = action.lobbyData;
            return newState;

        case GET_LOBBIES_ACTION:
            newState.lobbyIdToLobby = action.lobbyIdToLobby;
            return newState;

        default:
            return newState;
    }
}
