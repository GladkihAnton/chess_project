export const CHOOSE_LIGHT_PAWN='CHOOSE_LIGHT_PAWN';
export const CHOOSE_DARK_PAWN='CHOOSE_DARK_PAWN';
export const MOVE_PIECE='MOVE_PIECE';

export function ChooseLightPawn(availableMovesFn, chosenPiece) {
    return {type: CHOOSE_LIGHT_PAWN, availableMoves: availableMovesFn(), chosenPiece}
}

export function ChooseDarkPawn(forwardMoves, canCaptureLeft, canCaptureRight) {
    return {type: CHOOSE_DARK_PAWN, forwardMoves, canCaptureLeft, canCaptureRight}
}

export function movePiece(posX, posY) {
    return {type: MOVE_PIECE, posX, posY}
}