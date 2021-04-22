import {Component} from "react";
import pawnLogo from '../../../images/chess_figures/dark_pawn.png'
import style from './pawn.module.css'
import {ChooseDarkPawn} from '../../../redux/actions/actions'
import {connect} from "react-redux";


class DarkPawn extends Component {

    constructor(props) {
        super(props);
        this.posX = props.posX;
        this.posY = props.posY;
    }

    render() {
        return (
            <button className={style.clickable_cell} onClick={this.props.ChooseDarkPawn.bind(this, this.posX, this.posY)}>
                <img className={style.logo} src={pawnLogo}/>
            </button>
        )
    }
}

const actions = {ChooseDarkPawn}
//todo change logic for opossite figures
export default connect(null, actions)(DarkPawn)
