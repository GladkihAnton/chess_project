export const CHOOSE_PIECE_ACTION='CHOOSE_PIECE_ACTION';
export const MOVE_PIECE_ACTION='MOVE_PIECE_ACTION';

export function ChoosePiece(availableMovesFn, chosenPiece) {
    return {type: CHOOSE_PIECE_ACTION, availableMoves: availableMovesFn(), chosenPiece}
}

export function doMovePiece(toPosX, toPosY, fromPosX, fromPosY) {
    return {type: MOVE_PIECE_ACTION, toPosX, toPosY, fromPosX, fromPosY}
}