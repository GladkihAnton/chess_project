export const OPEN_CREATE_LOBBY_ACTION='OPEN_CREATE_LOBBY_ACTION';
export const CREATE_NEW_LOBBY_ACTION='CREATE_NEW_LOBBY_ACTION';

export function toggleCreateLobbyModal(isOpen) {
    return {type: OPEN_CREATE_LOBBY_ACTION, isOpen}
}

export function createNewLobby(lobbyData) {
    return {type: CREATE_NEW_LOBBY_ACTION, lobbyData}
}

