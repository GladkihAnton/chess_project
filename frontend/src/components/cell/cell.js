import {Component} from "react";
import {connect} from 'react-redux';
import style from './cell.module.css'
import figureLogos from "../figure_logos/figure_logos";
import TEMP_ACTION from "../../redux/actions/actions";
// import store from "../../redux/store";



class Cell extends Component {
    constructor(props) {
        super(props);
        this.figure = props.figure;
        this.cellNumber = this.props.cellNumber;
    }

    prepareCell() {
        const isDarkCell = (this.cellNumber + ~~(this.cellNumber / 8)) % 2 !== 0;

        const cellClasses = `${style.cell} ${isDarkCell ? style.dark_cell : style.light_cell}`;

        return (
            <a type='button' className={cellClasses} onClick={() => this.props.dispatch({
                type: TEMP_ACTION, cellNumber:this.cellNumber, figure: this.figure})}>
                {this.figure && <img className={style.logo} src={this.getFigureLogo()}></img>}
            </a>
        );
    }

    getFigureLogo() {
        return figureLogos[this.figure];
    }


    render() {
        return (
            this.prepareCell()
        );
    }
}


export default Cell
// export default connect(mapStateToProps)(Cell);