import {CHOOSE_DARK_PAWN, CHOOSE_LIGHT_PAWN, MOVE_PIECE} from "../actions/actions";
const initialState = {
    board: [
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', 'p', '', '', ''],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
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
        case CHOOSE_LIGHT_PAWN: {
            action.availableMoves.map(
                (availableMove) => {newState.moves[availableMove['y']][availableMove['x']] = 'X'}
            );
            return {
                ...newState,
                chosenPiece: action.chosenPiece
            };
        }

        case CHOOSE_DARK_PAWN: {
            const posX = action.posX;
            const posY = action.posY;

            newState.moves[posY + 1][posX] = 'X';
            newState.moves[posY + 2][posX] = 'X';
            newState.chosenPiece = {
                posX,
                posY,
                piece: state.board[posY][posX]
            }
            return newState;
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

        default: return initialState;
    }
}
