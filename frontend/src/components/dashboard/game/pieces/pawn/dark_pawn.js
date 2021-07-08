import {Component} from "react";
import pawnLogo from '../../../../../images/chess_figures/dark_pawn.png'
import style from './pawn.module.css'
import {connect} from "react-redux";


class DarkPawn extends Component {

    constructor(props) {
        super(props);
        this.posX = props.posX;
        this.posY = props.posY;
    }

    render() {
        return (
            <button className={style.clickable_cell}>
                <img className={style.logo} src={pawnLogo}/>
            </button>
        )
    }
}

const actions = {}
//todo change logic for opossite figures
export default connect(null, actions)(DarkPawn)
