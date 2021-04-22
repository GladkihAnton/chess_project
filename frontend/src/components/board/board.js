import React, {Component} from "react";
import Cell from "../cell/cell";

import style from './board.module.css';
import _ from "underscore";
import {connect} from "react-redux";

class Board extends Component {

    prepareBoard() {
        let boardItems = [];
        _.times(8, (y) => {
            _.times(8 , (x) => {
                const chosenPiece = this.props.chosenPiece?.posX === x &&
                    this.props.chosenPiece?.posY === y ? this.props.chosenPiece : null;
                const canMove = this.props.moves[y][x] !== '';
                boardItems.push(<Cell key={8*y + x + this.props.board[y][x]} posX={x} posY={y} chosenPiece={chosenPiece} canMove={canMove} piece={this.getFigure(x, y)}/>);
            });
        });

        return boardItems;
    }

    getFigure(posX, posY) {
        return this.props.board[posY][posX];
    }

    render() {
        return (
            <div className={style.board}>
                {this.prepareBoard()}
            </div>
        );
    }
}

function  mapStateToProps(state, ownProps) {
    return {
        board: state.game.board,
        moves: state.game.moves,
        chosenPiece: state.game.chosenPiece
    };
}

export default connect(
    mapStateToProps, null
)(Board)