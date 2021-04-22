import {Component} from "react";
import {connect} from 'react-redux';
import style from './cell.module.css'
import {movePiece} from "../../redux/actions/actions";
import DarkPawn from '../pieces/pawn/dark_pawn'
import LightPawn from '../pieces/pawn/light_pawn'



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
                return <LightPawn posX={this.posX} posY={this.posY}/>
            case 'b':
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
