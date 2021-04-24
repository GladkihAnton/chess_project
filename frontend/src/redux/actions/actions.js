export const CHOOSE_PIECE='CHOOSE_PIECE';
export const MOVE_PIECE='MOVE_PIECE';

export function ChoosePiece(availableMovesFn, chosenPiece) {
    return {type: CHOOSE_PIECE, availableMoves: availableMovesFn(), chosenPiece}
}

export function movePiece(posX, posY) {
    return {type: MOVE_PIECE, posX, posY}
}