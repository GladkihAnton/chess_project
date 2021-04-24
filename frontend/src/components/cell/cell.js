import {Component} from "react";
import {connect} from 'react-redux';
import style from './cell.module.css'
import {movePiece} from "../../redux/actions/actions";
import DarkPawn from '../pieces/pawn/dark_pawn'
import LightPawn from '../pieces/pawn/light_pawn'
import LightBishop from "../pieces/bishop/bishop";
import LightRook from "../pieces/rook/rook";
import LightKnight from "../pieces/knight/knight";
import LightQueen from "../pieces/queen/queen";
import LightKing from "../pieces/king/king";


class Cell extends Component {
    constructor(props) {
        super(props);
        this.piece = props.piece;
        this.posY = this.props.posY;
        this.posX = this.props.posX;

    }
    // todo cell -> square
    prepareCell() {
        const isDarkCell = (this.posX+this.posY) % 2 !== 0;
        const cellClasses = `${style.cell} ${isDarkCell ? style.dark_cell : style.light_cell}`;
        return (
            <a type='button' className={cellClasses}>
                {this.getPiece()}
                {this.props.canMove && <button onClick={this.props.movePiece.bind(this, this.posX, this.posY)} className={style.move}></button>}
            </a>
        );
    }

    getPiece() {
        switch (this.piece) {
            case 'P':
                return <LightPawn posX={this.posX} posY={this.posY}/>
            case 'p':
                return <DarkPawn posX={this.posX} posY={this.posY}/>
            case 'B':
                return <LightBishop posX={this.posX} posY={this.posY}/>
            case 'b':
                return <LightPawn posX={this.posX} posY={this.posY}/>
            case 'R':
                return <LightRook posX={this.posX} posY={this.posY}/>
            case 'r':
                return <LightPawn posX={this.posX} posY={this.posY}/>
            case 'N':
                return <LightKnight posX={this.posX} posY={this.posY}/>
            case 'n':
                return <LightPawn posX={this.posX} posY={this.posY}/>
            case 'Q':
                return <LightQueen posX={this.posX} posY={this.posY}/>
            case 'q':
                return <LightPawn posX={this.posX} posY={this.posY}/>
            case 'K':
                return <LightKing posX={this.posX} posY={this.posY}/>
            case 'k':
                return <LightPawn posX={this.posX} posY={this.posY}/>

        }
    }


    render() {
        return (
            this.prepareCell()
        );
    }
}

const actions = {
    movePiece
}

export default connect(null, actions)(Cell)
