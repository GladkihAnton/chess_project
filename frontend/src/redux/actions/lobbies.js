export const OPEN_CREATE_LOBBY_ACTION='OPEN_CREATE_LOBBY_ACTION';
export const CREATE_NEW_LOBBY_ACTION='CREATE_NEW_LOBBY_ACTION';
export const GET_LOBBIES_ACTION='GET_LOBBIES_ACTION';
export const CHOOSE_LOBBY_ACTION='CHOOSE_LOBBY_ACTION';
export const PLAYER_JOINED_ACTION='PLAYER_JOINED_ACTION';

export function toggleCreateLobbyModal(isOpen) {
    return {type: OPEN_CREATE_LOBBY_ACTION, isOpen}
}

export function createNewLobby(lobbyData, lobbyId) {
    return {type: CREATE_NEW_LOBBY_ACTION, lobbyData, lobbyId}
}

export function chooseLobby(lobbyId) {
    return {type: CHOOSE_LOBBY_ACTION, lobbyId}
}

export function getLobbies(lobbyIdToLobby) {
    return {type: GET_LOBBIES_ACTION, lobbyIdToLobby}
}

export function playerJoined(lobbyId, pieceColor, playerId) {
    return {type: PLAYER_JOINED_ACTION, lobbyId, pieceColor, playerId}
}

