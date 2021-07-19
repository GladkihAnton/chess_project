import {Component} from "react";
import lightKnightLogo from '../../../../../images/chess_figures/light_knight.png'
import darkKnightLogo from '../../../../../images/chess_figures/dark_knight.png'
import style from './knight.module.css'
import {ChoosePiece} from "../../../../../redux/actions/game";
import {connect} from "react-redux";
import {canMove, checkCheckAfterMove, isMoveLegal, isOppositePiece, tryChoosePiece} from "../utils";


class Knight extends Component {

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
                <img className={style.logo} src={this.color === 'black' ? darkKnightLogo : lightKnightLogo}/>
            </button>
        )
    }

    availableMoves() {
        const allDirections = [{x: 2, y: 1}, {x: -2, y: 1}, {x: -1, y: 2}, {x: 1, y: 2},
                               {x: 2, y: -1}, {x: -2, y: -1}, {x: -1, y: -2}, {x: 1, y: -2}];

        let availableMoves = [];
        for (let direction of allDirections) {
            const toPosX = this.posX + direction['x'];
            const toPosY = this.posY + direction['y'];
            if (!isMoveLegal.call(this, toPosX, toPosY)) {
                continue;
            }
            if (isOppositePiece.call(this, toPosX, toPosY) && !checkCheckAfterMove.call(this, this.color, toPosX, toPosY)) {
                availableMoves.push({x: toPosX, y: toPosY});
                continue;
            }
            if (!canMove(this.board, toPosX, toPosY)) {
                continue;
            }
            if (checkCheckAfterMove.call(this, this.color, toPosX, toPosY)) {
                continue;
            }
            availableMoves.push({x: toPosX, y: toPosY});
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

export default connect(mapStateToProps, actions)(Knight)
