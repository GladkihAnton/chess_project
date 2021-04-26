export const CHOOSE_PIECE='CHOOSE_PIECE';
export const MOVE_PIECE='MOVE_PIECE';
export const UPDATE_SIGNUP_FIELD='UPDATE_SIGNUP_FIELD';

export function ChoosePiece(availableMovesFn, chosenPiece) {
    return {type: CHOOSE_PIECE, availableMoves: availableMovesFn(), chosenPiece}
}

export function movePiece(posX, posY) {
    return {type: MOVE_PIECE, posX, posY}
}

export function updateField(element) {
    return {type: UPDATE_SIGNUP_FIELD, fieldName: element.target.id, fieldValue: element.target.value}
}