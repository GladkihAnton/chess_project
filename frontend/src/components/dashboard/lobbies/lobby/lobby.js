import React, {Component} from "react";

import {connect} from "react-redux";
import style from './lobby.module.css'
import {Link} from "react-router-dom";
import {chooseLobby} from "../../../../redux/actions/lobbies";
import request from "../../../../utils/request";

class Lobby extends Component {

    constructor(props) {
        super(props);
        this.lobbyId = this.props.lobbyId;
        this.lobbyName = this.props.lobbyName;
        this.nextMove = this.props.nextMove;
        this.whiteRemainingTs = this.props.whiteRemainingTs;
        this.blackRemainingTs = this.props.blackRemainingTs;
        this.whitePlayerId = this.props.whitePlayerId;
        this.blackPlayerId = this.props.blackPlayerId;
    }

    render() {
        return (
            <div className={style.lobby}>
                <h2>{this.lobbyName}</h2>
                <div><p>Следующий ход: {this.nextMove}</p>
                    <p>Время у белый: {this.whiteRemainingTs}</p>
                    <p>Время у черных: {this.blackRemainingTs}</p>
                </div>
                <Link to={`${this.props.match.path}/${this.lobbyId}`}
                      onClick={this.props.chooseLobby.bind(this, this.lobbyId)}>
                    <button>Открыть лобби</button>
                </Link>
                {this.canEnter() && <button onClick={this.enterIntoLobby.bind(this)}>Присоединиться</button>}
            </div>
        )
    }

    canEnter() {
        return !this.blackPlayerId || !this.whitePlayerId;
    }

    enterIntoLobby() {
        request.post('/lobbies/lobby',
            {
                event: 'enter_into_lobby',
                lobby_id: this.lobbyId
            },
            {}
        )
        .then((response) => {
            return response['data'];
        })
        .then((data) => {
            if ('error' in data) {
                this.showError(data['error']);
                return;
            }
            if (data['result'] === 'ok') {
                this.props.toggleCreateLobbyModal(false);
            }
        });
    }

    showError(error) {
        console.log(error);
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