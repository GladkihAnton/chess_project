import React, {Component} from "react";

import {connect} from "react-redux";
import style from './lobby.module.css'
import {Link} from "react-router-dom";
import {chooseLobby} from "../../../../redux/actions/lobbies";

class Lobby extends Component {

    constructor(props) {
        super(props);
        this.lobbyId = this.props.lobbyId;
        this.lobbyName = this.props.lobbyName;
        this.nextMove = this.props.nextMove;
        this.whiteRemainingTs = this.props.whiteRemainingTs;
        this.blackRemainingTs = this.props.blackRemainingTs;
    }

    render() {
        return (
            <div className={style.lobby}>
            <Link to={`${this.props.match.path}/${this.lobbyId}`}
                  onClick={this.props.chooseLobby.bind(this, this.lobbyId)}>
                {this.lobbyName}
                {/*<div><p>Следующий ход: {this.nextMove}</p>*/}
                {/*    <p>Время у белый: {this.whiteRemainingTs}</p>*/}
                {/*    <p>Время у черных: {this.blackRemainingTs}</p>*/}
                {/*</div>*/}
            </Link>
            </div>
        )
    }
}


function  mapStateToProps(state, ownProps) {
    return {
        isCreateLobbyModalOpen: state.lobbies.isCreateLobbyModalOpen,
    };
}

const actions = {chooseLobby}

export default connect(
    mapStateToProps, actions
)(Lobby)