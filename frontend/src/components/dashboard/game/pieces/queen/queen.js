import {Component} from "react";
import lightQueenLogo from '../../../../../images/chess_figures/light_queen.png'
import darkQueenLogo from '../../../../../images/chess_figures/dark_queen.png'
import style from './queen.module.css'
import {ChoosePiece} from "../../../../../redux/actions/game";
import {connect} from "react-redux";
import {canMove, checkCheckAfterMove, isMoveLegal, isOppositePiece, tryChoosePiece} from "../utils";


class Queen extends Component {

    constructor(props) {
        super(props);
        this.posX = props.posX;
        this.posY = props.posY;
        this.board = props.board;
        this.color = props.color;
        this.stepNumber = props.stepNumber;
        this.piece = props.piece;
    }

    render() {
        return (
            <button className={style.clickable_cell}
                    onClick={tryChoosePiece.bind(this)}>
                <img className={style.logo} src={this.color === 'black' ? darkQueenLogo : lightQueenLogo}/>
            </button>
        )
    }

    availableMoves() {
        const allDirections = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1},
                               {x: 1, y: 1}, {x: -1, y: 1}, {x: 1, y: -1}, {x: -1, y: -1}];

        let availableMoves = [];
        for (let direction of allDirections) {
            for (let moveDist = 1; moveDist < 8; moveDist++) {
                const toPosX = this.posX + direction['x'] * moveDist;
                const toPosY = this.posY + direction['y'] * moveDist;
                if (!isMoveLegal.call(this, toPosX, toPosY)) {
                    break;
                }
                if (isOppositePiece.call(this, toPosX, toPosY) && !checkCheckAfterMove.call(this, this.color, toPosX, toPosY)) {
                    availableMoves.push({x: toPosX, y: toPosY});
                    break;
                }
                if (!canMove(this.board, toPosX, toPosY)) {
                    break;
                }
                if (checkCheckAfterMove.call(this, this.color, toPosX, toPosY)) {
                    continue;
                }
                availableMoves.push({x: toPosX, y: toPosY});
            }
        }
        return availableMoves;
    }
}

const actions = {ChoosePiece}

function mapStateToProps(state, ownProps) {
    return {
        board: state.game.board,
        stepNumber: state.game.stepNumber
    };
}

export default connect(mapStateToProps, actions)(Queen)
