import {Component} from "react";
import lightPawnLogo from '../../../../../images/chess_figures/light_pawn.png'
import darkPawnLogo from '../../../../../images/chess_figures/dark_pawn.png'
import style from './pawn.module.css'
import {ChoosePiece} from "../../../../../redux/actions/game";
import {connect} from "react-redux";
import {checkCheckAfterMove, isOppositePiece, tryChoosePiece} from "../utils";


class Pawn extends Component {

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
                <img className={style.logo} src={this.color === 'black' ? darkPawnLogo : lightPawnLogo}/>
            </button>
        )
    }

    availableMoves() {
        let availableMoves = [];
        const direction = this.color === 'black' ? 1 : -1
        if (this.board[this.posY + direction][this.posX] === '') {
            if (!checkCheckAfterMove.call(this, this.color, this.posX, this.posY + direction)) {
                availableMoves.push({x: this.posX, y: this.posY + direction});
            }
            if (this.posY === ((direction + 7) % 7) && this.board[this.posY + direction * 2][this.posX] === ''
                && !checkCheckAfterMove.call(this, this.color, this.posX, this.posY + 2 * direction)) {
                    availableMoves.push({x: this.posX, y: this.posY + direction * 2});
            }
        }

        if (isOppositePiece.call(this, this.posX + 1, this.posY + direction) && !checkCheckAfterMove.call(this, this.color, this.posX + 1, this.posY + direction)) {
            availableMoves.push({x: this.posX + 1, y: this.posY + direction});
        }

        if (isOppositePiece.call(this,this.posX - 1, this.posY + direction) && !checkCheckAfterMove.call(this, this.color, this.posX - 1, this.posY + direction)) {
            availableMoves.push({x: this.posX - 1, y: this.posY + direction});
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

export default connect(mapStateToProps, actions)(Pawn)
