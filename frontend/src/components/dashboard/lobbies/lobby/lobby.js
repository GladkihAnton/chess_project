import React, {Component} from "react";

import {connect} from "react-redux";
import style from './lobby.module.css'

class Lobby extends Component {

    constructor(props) {
        super(props);
        this.lobby_id = this.props.lobby_id;
        this.lobbyName = this.props.lobbyName;
        this.nextMove = this.props.nextMove;
        this.whiteRemainingTs = this.props.whiteRemainingTs;
        this.blackRemainingTs = this.props.blackRemainingTs;
    }

    render() {
        return (
            <div className={style.lobby}>
                <h2>Н{this.lobbyName}</h2>
                <p>Следующий ход: {this.nextMove}</p>
                <p>Время у белый: {this.whiteRemainingTs}</p>
                <p>Время у черных: {this.blackRemainingTs}</p>
            </div>
        )
    }
}


function  mapStateToProps(state, ownProps) {
    return {
        isCreateLobbyModalOpen: state.lobbies.isCreateLobbyModalOpen,
    };
}


export default connect(
    mapStateToProps,
)(Lobby)