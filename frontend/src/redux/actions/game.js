export const CHOOSE_PIECE_ACTION='CHOOSE_PIECE_ACTION';
export const MOVE_PIECE_ACTION='MOVE_PIECE_ACTION';
export const DISCONNECT_GAME_ACTION='DISCONNECT_GAME_ACTION';
export const CONNECT_GAME_ACTION='CONNECT_GAME_ACTION';
export const SET_LOADING_ACTION='SET_LOADING_ACTION';

export function ChoosePiece(availableMovesFn, chosenPiece) {
    return {type: CHOOSE_PIECE_ACTION, availableMoves: availableMovesFn(), chosenPiece}
}

export function doMovePiece(toPosX, toPosY, fromPosX, fromPosY) {
    return {type: MOVE_PIECE_ACTION, toPosX, toPosY, fromPosX, fromPosY}
}

export function disconnectGame() {
    return {type: DISCONNECT_GAME_ACTION}
}

export function connectGame(board) {
    return {type: CONNECT_GAME_ACTION, board}
}