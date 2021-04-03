import React, {Component} from "react";
import Cell from "../cell/cell";

import style from './board.module.css';
import _ from "underscore";
import test from '../../images/chess_figures/dark_bishop.png';

class Board extends Component {
    COUNT_OF_CELLS = 64;
    constructor(props) {
        super(props);
        console.log(props);
        this.board = props.board;
    }

    prepareBoard() {
        let boardItems = [];

        _.times(this.COUNT_OF_CELLS, (i) => {
            boardItems.push(<Cell key={i} cellNumber={i} figure={this.getFigure(i)} dispatch={this.props.dispatch}/>);
        });

        return boardItems;
    }

    // getMoves() {
    //     this
    // }

    getFigure(number) {
        return this.board[~~(number / 8)][number % 8];
    }

    fillBoard() {
        console.log(this.state);
    }

    render() {
        this.fillBoard();
        return (

            <div className={style.board}>
                {this.prepareBoard()}
            </div>
        );
    }
}

export default Board