import {
    CHOOSE_PIECE,
    MOVE_PIECE
} from "../actions/actions";
const initialState = {
    board: [
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', 'p', '', '', ''],
        ['P', 'P', 'P', '', '', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ],
    moves: [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '']
    ],
    chosenPiece: null,
    isWhiteMove: true,
    twoSqrMoveLine: null
};

export function game(state=initialState, action) {
    let newState = {
        ...state,
        board: [...state.board],
        moves: [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '']
        ],
    }
    switch(action.type) {
        case CHOOSE_PIECE: {
            action.availableMoves.map(
                (availableMove) => {newState.moves[availableMove['y']][availableMove['x']] = 'X'}
            );
            return {
                ...newState,
                chosenPiece: action.chosenPiece
            };
        }

        case MOVE_PIECE: {
            const toPosX = action.posX;
            const toPosY = action.posY;
            const fromPosX = state.chosenPiece.posX;
            const fromPosY = state.chosenPiece.posY;
            newState.board[fromPosY][fromPosX] = '';
            newState.board[toPosY][toPosX] = state.chosenPiece.piece;
            newState.twoSqrMoveLine = Math.abs(fromPosY - toPosY) === 2 ? toPosX : null;
            newState.chosenPiece = null;
            return newState;
        }

        default: return state;
    }
}
