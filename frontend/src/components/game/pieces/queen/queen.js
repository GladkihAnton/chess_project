import {Component} from "react";
import queenLogo from '../../../../images/chess_figures/light_queen.png'
import style from './queen.module.css'
import {ChoosePiece} from "../../../../redux/actions/actions";
import {connect} from "react-redux";


class LightQueen extends Component {

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
                <img className={style.logo} src={queenLogo}/>
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
                if (!this.isMoveLegal(toPosX, toPosY)) {
                    break;
                }
                if (this.isOppositePiece(toPosX, toPosY)) {
                    availableMoves.push({x: toPosX, y: toPosY});
                    break;
                }
                if (!this.canMove(toPosX, toPosY)) {
                    break;
                }
                availableMoves.push({x: toPosX, y: toPosY});
            }
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

export default connect(mapStateToProps, actions)(LightQueen)
