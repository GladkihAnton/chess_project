import {Component} from "react";
import {connect} from 'react-redux';
import style from './cell.module.css'
import Pawn from '../pieces/pawn/pawn'
import Bishop from "../pieces/bishop/bishop";
import Rook from "../pieces/rook/rook";
import Knight from "../pieces/knight/knight";
import Queen from "../pieces/queen/queen";
import King from "../pieces/king/king";


class Cell extends Component {
    constructor(props) {
        super(props);
        this.piece = props.piece;
        this.posY = this.props.posY;
        this.posX = this.props.posX;
    }
    // todo cell -> square
    prepareCell() {
        const isDarkCell = (this.posX + this.posY) % 2 !== 0;
        const cellClasses = `${style.cell} ${isDarkCell ? style.dark_cell : style.light_cell}`;
        return (
            <a type='button' className={cellClasses}>
                {this.getPiece()}
                {this.props.canMove && <button onClick={this.tryMovePiece.bind(this)}
                                               className={style.move}></button>}
            </a>
        );
    }

    tryMovePiece() {
        this.props.movePiece(this.posX, this.posY)
    }

    getPiece() {
        switch(this.piece) {
            case 'P':
                return <Pawn posX={this.posX} posY={this.posY} piece={this.piece} color='white'/>
            case 'p':
                return <Pawn posX={this.posX} posY={this.posY} piece={this.piece} color='black'/>
            case 'B':
                return <Bishop posX={this.posX} posY={this.posY} piece={this.piece} color='white'/>
            case 'b':
                return <Bishop posX={this.posX} posY={this.posY} piece={this.piece} color='black'/>
            case 'R':
                return <Rook posX={this.posX} posY={this.posY} piece={this.piece} color='white'/>
            case 'r':
                return <Rook posX={this.posX} posY={this.posY} piece={this.piece} color='black'/>
            case 'N':
                return <Knight posX={this.posX} posY={this.posY} piece={this.piece} color='white'/>
            case 'n':
                return <Knight posX={this.posX} posY={this.posY} piece={this.piece} color='black'/>
            case 'Q':
                return <Queen posX={this.posX} posY={this.posY} piece={this.piece} color='white'/>
            case 'q':
                return <Queen posX={this.posX} posY={this.posY} piece={this.piece} color='black'/>
            case 'K':
                return <King posX={this.posX} posY={this.posY} piece={this.piece} color='white'/>
            case 'k':
                return <King posX={this.posX} posY={this.posY} piece={this.piece} color='black'/>
            default:
                break;
        }
    }

    render() {
        return (
            this.prepareCell()
        );
    }
}

export default connect(null, null)(Cell)
