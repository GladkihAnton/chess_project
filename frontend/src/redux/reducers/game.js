import {CHOOSE_PIECE_ACTION, MOVE_PIECE_ACTION} from "../actions/game";
import request from "../../utils/request";


const initialState = {
    board: [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
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
    stepNumber: 1,
    twoSqrMoveLine: null,
    whitePlayerId: null,
    blackPlayerId: null
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
        case CHOOSE_PIECE_ACTION: {
            action.availableMoves.map(
                (availableMove) => {newState.moves[availableMove['y']][availableMove['x']] = 'X'}
            );
            return {
                ...newState,
                chosenPiece: action.chosenPiece
            };
        }

        case MOVE_PIECE_ACTION: {
            const toPosX = action.toPosX;
            const toPosY = action.toPosY;
            const fromPosX = action.fromPosX;
            const fromPosY = action.fromPosY;

            newState.board[toPosY][toPosX] = state.board[fromPosY][fromPosX];
            newState.board[fromPosY][fromPosX] = '';

            newState.twoSqrMoveLine = Math.abs(fromPosY - toPosY) === 2 ? toPosX : null;
            newState.chosenPiece = null;
            newState.stepNumber += 1;

            return newState;
        }

        default: return state;
    }
}
