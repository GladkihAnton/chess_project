import {Component} from "react";
import pawnLogo from '../../../../images/chess_figures/light_pawn.png'
import style from './pawn.module.css'
import {ChoosePiece} from "../../../../redux/actions/game";
import {connect} from "react-redux";


class LightPawn extends Component {

    constructor(props) {
        super(props);
        this.posX = props.posX;
        this.posY = props.posY;
        this.board = props.board;
    }

    render() {
        return (
            <button className={style.clickable_cell}
                    onClick={
                        this.props.ChoosePiece
                            .bind(this,
                                this.availableMoves.bind(this),
                                {
                                    posX: this.posX,
                                    posY: this.posY,
                                    piece: this.props.board[this.posY][this.posX]
                                }
                            )
                    }>
                <img className={style.logo} src={pawnLogo}/>
            </button>
        )
    }

    availableMoves() {
        let availableMoves = [];

        if (this.board[this.posY - 1][this.posX] === '') {
            availableMoves.push({x: this.posX, y: this.posY - 1});

            if (this.posY === 6 && this.board[this.posY - 2][this.posX] === '') {
                availableMoves.push({x: this.posX, y: this.posY - 2});
            }
        }

        if (this.isOppositePiece(this.posX + 1, this.posY - 1)) {
            availableMoves.push({x: this.posX + 1, y: this.posY - 1});
        }

        if (this.isOppositePiece(this.posX - 1, this.posY - 1)) {
            availableMoves.push({x: this.posX - 1, y: this.posY - 1});
        }

        return availableMoves;
    }

    isOppositePiece(toPosX, toPosY) {
        return this.board[toPosY][toPosX] &&
            this.board[this.posY][this.posX] === this.board[this.posY][this.posX].toUpperCase() ^
            this.board[toPosY][toPosX] === this.board[toPosY][toPosX].toUpperCase();
    }
}

const actions = {ChoosePiece}

function mapStateToProps(state, ownProps) {
    return {board: state.game.board};
}

export default connect(mapStateToProps, actions)(LightPawn)
