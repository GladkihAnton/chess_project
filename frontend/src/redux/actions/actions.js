export const CHOOSE_PIECE_ACTION='CHOOSE_PIECE_ACTION';
export const MOVE_PIECE_ACTION='MOVE_PIECE_ACTION';
export const UPDATE_SIGNUP_FIELD_ACTION='UPDATE_SIGNUP_FIELD_ACTION';
export const GET_SESSION_DATA_ACTION='GET_SESSION_DATA_ACTION';

export function ChoosePiece(availableMovesFn, chosenPiece) {
    return {type: CHOOSE_PIECE_ACTION, availableMoves: availableMovesFn(), chosenPiece}
}

export function movePiece(posX, posY) {
    return {type: MOVE_PIECE_ACTION, posX, posY}
}

export function updateField(element) {
    return {type: UPDATE_SIGNUP_FIELD_ACTION, fieldName: element.target.id, fieldValue: element.target.value}
}

export function updateSessionData(data) {
    return {type: GET_SESSION_DATA_ACTION, data}
}