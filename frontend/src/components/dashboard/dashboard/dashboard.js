import React, {Component} from "react";

import {connect} from "react-redux";
import style from './dashboard.module.css';
import LobbiesPanel from "../lobbies/lobbies_panel/lobbies_panel";


class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={style.dashboard}>
                <LobbiesPanel match={this.props.match}/>
            </div>
        )
    }
}


export default connect(
    null, null
)(Dashboard)