export function tryChoosePiece() {
    if ((this.stepNumber % 2 === 0 && this.color !== 'black') ||
        (this.stepNumber % 2 === 1 && this.color !== 'white')
    ) {
        return;
    }

    this.props.ChoosePiece(this.availableMoves.bind(this), {
        posX: this.posX,
        posY: this.posY,
        piece: this.props.board[this.posY][this.posX]
    })
}

export function isMoveLegal(toPosX, toPosY) {
    return 0 <= toPosX && toPosX <= 7 && 0 <= toPosY && toPosY <= 7;
}

export function canMove(board, toPosX, toPosY) {
    return board[toPosY][toPosX] === '';
}

export function isOppositePiece(toPosX, toPosY) {
    return this.board[toPosY][toPosX] &&
        this.board[this.posY][this.posX] === this.board[this.posY][this.posX].toUpperCase() ^
        this.board[toPosY][toPosX] === this.board[toPosY][toPosX].toUpperCase();
}

export function checkCheckAfterMove(color, toPosX, toPosY) {
    let boardAfterMove = JSON.parse(JSON.stringify(this.board));
    boardAfterMove[this.posY][this.posX] = '';
    boardAfterMove[toPosY][toPosX] = this.piece;

    const kingPos = getKingPosition(boardAfterMove, color);
    const oppositePieces = {'pawn': 'p', 'knight': 'n', 'king': 'k', 'bishop': 'b', 'rook': 'r', 'queen': 'q'};

    if (color === 'black') {
        for(let piece in oppositePieces) {
            oppositePieces[piece] = oppositePieces[piece].toUpperCase();
        }
    }

    return isKingAttackedOnDiagonal(boardAfterMove, kingPos['posX'], kingPos['posY'],
        [oppositePieces['queen'], oppositePieces['bishop']]) ||
        isKingAttackedOnStraight(boardAfterMove, kingPos['posX'], kingPos['posY'],
        [oppositePieces['queen'], oppositePieces['bishop']]) ||
        isKingAttackedByKnight(boardAfterMove, kingPos['posX'], kingPos['posY'],
        [oppositePieces['knight']]) ||
        isKingAttackedByKing(boardAfterMove, kingPos['posX'], kingPos['posY'],
        [oppositePieces['king']]) ||
        isKingAttackedByPawn(boardAfterMove, kingPos['posX'], kingPos['posY'],
        [oppositePieces['pawn']], color)
}

function getKingPosition(board, color) {
    for (let y in board) {
        if (!board.hasOwnProperty(y)) {
                continue;
        }

        for (let x in board[y]) {
            if (!board[y].hasOwnProperty(x)) {
                continue;
            }

            if (board[y][x] === (color === 'black' ? 'k' : 'K')) {
                return {'posX': parseInt(x), 'posY': parseInt(y)}
            }
        }
    }
}

function isKingAttackedByPawn(board, kingPosX, kingPosY, oppositePieces, color) {
    const pawnDirection = color === 'black' ? 1 : -1;
    const directions = [{x: 1, y: pawnDirection}, {x: -1, y: pawnDirection}];
    return isKingAttackedDependsOnDirections(directions, 1, kingPosX, kingPosY, board, oppositePieces);
}
function isKingAttackedByKing(board, kingPosX, kingPosY, oppositePieces) {
    const directions = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1},
            {x: 1, y: 1}, {x: -1, y: 1}, {x: 1, y: -1}, {x: -1, y: -1}];
    return isKingAttackedDependsOnDirections(directions, 1, kingPosX, kingPosY, board, oppositePieces);
}

function isKingAttackedByKnight(board, kingPosX, kingPosY, oppositePieces) {
    const directions = [{x: 2, y: 1}, {x: -2, y: 1}, {x: -1, y: 2}, {x: 1, y: 2},
                        {x: 2, y: -1}, {x: -2, y: -1}, {x: -1, y: -2}, {x: 1, y: -2}];
    return isKingAttackedDependsOnDirections(directions, 1, kingPosX, kingPosY, board, oppositePieces);
}

function isKingAttackedOnDiagonal(board, kingPosX, kingPosY, oppositePieces) {
    const directions = [{x: 1, y: 1}, {x: -1, y: 1}, {x: 1, y: -1}, {x: -1, y: -1}];
    return isKingAttackedDependsOnDirections(directions, 7, kingPosX, kingPosY, board, oppositePieces);
}

function isKingAttackedOnStraight(board, kingPosX, kingPosY, oppositePieces) {
    const directions = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}];
    return isKingAttackedDependsOnDirections(directions, 7, kingPosX, kingPosY, board, oppositePieces);
}

function isKingAttackedDependsOnDirections(directions, maxMoveDist, kingPosX, kingPosY, board, oppositePieces) {
    let posX, posY;
    for (let direction of directions) {
        for (let moveDist = 1; moveDist < maxMoveDist + 1; moveDist++) {
            posX = kingPosX + direction['x'] * moveDist;
            posY = kingPosY + direction['y'] * moveDist;
            if (!isMoveLegal(posX, posY)) {
                break;
            }
            if (oppositePieces.includes(board[posY][posX])) {
                return true;
            }

            if (!canMove(board, posX, posY)) {
                break;
            }
        }
    }
    return false;
}