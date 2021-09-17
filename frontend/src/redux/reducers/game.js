import {
    CHOOSE_PIECE_ACTION,
    CONNECT_GAME_ACTION,
    DISCONNECT_GAME_ACTION,
    MOVE_PIECE_ACTION,
    SET_LOADING_ACTION
} from "../actions/game";
import request from "../../utils/request";


const initialState = {
    board: [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '']
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
    loading: true
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

        case DISCONNECT_GAME_ACTION: {
            newState.board = [...initialState.board];
            newState.loading = true;
            return newState;
        }

        case CONNECT_GAME_ACTION: {
            console.log(CONNECT_GAME_ACTION);
            newState.board = action.board;
            newState.loading = false;
            return newState;
        }

        default: return state;
    }
}
