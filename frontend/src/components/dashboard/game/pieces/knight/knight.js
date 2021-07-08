import {Component} from "react";
import knightLogo from '../../../../../images/chess_figures/light_knight.png'
import style from './knight.module.css'
import {ChoosePiece} from "../../../../../redux/actions/game";
import {connect} from "react-redux";


class LightKnight extends Component {

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
                <img className={style.logo} src={knightLogo}/>
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
            if (!this.isMoveLegal(toPosX, toPosY)) {
                continue;
            }
            if (this.isOppositePiece(toPosX, toPosY)) {
                availableMoves.push({x: toPosX, y: toPosY});
                continue;
            }
            if (!this.canMove(toPosX, toPosY)) {
                continue;
            }
            availableMoves.push({x: toPosX, y: toPosY});
        }
        return availableMoves;
    }

    isMoveLegal(toPosX, toPosY) {
        return 0 <= toPosX && toPosX <= 7 && 0 <= toPosY && toPosY <= 7;
    }

    canMove(toPosX, toPosY) {
        return this.board[toPosY][toPosX] === '';
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

export default connect(mapStateToProps, actions)(LightKnight)
