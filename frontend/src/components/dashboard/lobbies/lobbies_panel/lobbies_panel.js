import React, {Component} from "react";

import {connect} from "react-redux";
import style from './lobbies_panel.module.css';
import configFile from "../../../../config.json";
import Modal from 'react-modal';
import {toggleCreateLobbyModal, createNewLobby, getLobbies, playerJoined} from "../../../../redux/actions/lobbies";
import request from "../../../../utils/request";
import Lobby from "../lobby/lobby";
import {Route, Switch} from "react-router-dom";
import Board from "../../game/board/board";


class LobbiesPanel extends Component {

    constructor(props) {
        super(props);
        this.isCreateLobbyModalOpen = this.props.isCreateLobbyModalOpen;
        this.lobbyName = React.createRef();
        this.pieceColor = React.createRef();
        this.client = new WebSocket(`ws://${configFile.SERVER_URL}/ws/lobby`); // todo put access_token and delete url from white list
        this.websocketHandling();
    }

    render() {
        return (
            <div>
                <button onClick={this.props.toggleCreateLobbyModal.bind(this, true)}>create new lobby</button>
                <div className={style.panel}>
                    {this.prepareLobbyList(this.props.lobbyIdToLobby)}
                </div>
                <div>
                    <Modal
                        isOpen={this.props.isCreateLobbyModalOpen}
                        onAfterOpen={this.afterOpenModal}
                        ariaHideApp={false}
                        // onRequestClose={this.props.toggleCreateLobbyModal.bind(this, false)}
                        className={style.create_lobby_modal}
                        overlayClassName={style.overlay_create_lobby_modal}
                        contentLabel="Create Lobby Modal"
                    >
                        <h2>Создание лобби</h2>
                        <form>
                            <p><input id='lobby_name' name='lobby_name' ref={this.lobbyName}/></p>
                            <p><select id='piece_color' name='piece_color' ref={this.pieceColor}>
                                <option value='white'>Белые</option>
                                <option value='black'>Черные</option>
                            </select></p>
                            <p>
                                <button onClick={this.props.toggleCreateLobbyModal.bind(this, false)}>close</button>
                                <button type='button' onClick={this.createLobby.bind(this)}>save</button>
                            </p>
                        </form>
                    </Modal>
                </div>
                <Switch>
                    <Route path={`${this.props.match.path}/:gameId`} component={() => <Board key={this.props.chosenLobby}/>}/>
                </Switch>
            </div>
        )
    }

    createLobby(e) {
        request.post('/lobbies/lobby',
            {
                event: 'new_lobby',
                lobby_name: this.lobbyName.current.value,
                piece_color: this.pieceColor.current.value
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

    websocketHandling() {
        this.client.onopen = () => {
          console.log('WebSocket Client Connected');
        };
        this.client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            switch(data.event) {
                case 'new_lobby':
                    this.props.createNewLobby(data.lobby_data, data.lobby_id);
                    break;
                case 'lobbies':
                    this.props.getLobbies(data.lobby_id_to_lobby);
                    break;
                case 'player_joined':
                    this.props.playerJoined(data.lobby_id, data.piece_color, data.player_id);
                    break;
                default:
                    break;
            }
        };
        this.client.onclose = (message) => {
          console.log(message);
        };
        this.client.onerror = (message) => {
          console.log(message);
        };
    }

    prepareLobbyList(lobbyIdToLobby) {
        let yourLobbies = [];
        let commonLobbies = [];
        for (let lobbyId in lobbyIdToLobby) {
            if (!lobbyIdToLobby.hasOwnProperty(lobbyId)) {
                continue;
            }

            let lobby = lobbyIdToLobby[lobbyId];

            commonLobbies.push(<Lobby key={lobby.lobby_id + lobby.white_player_id + lobby.black_player_id}
                           lobbyId={lobby.lobby_id} lobbyName={lobby.lobby_name} nextMove={lobby.next_move}
                           whiteRemainingTs={lobby.white_remaining_ts} blackRemainingTs={lobby.black_remaining_ts}
                           whitePlayerId={lobby.white_player_id} blackPlayerId={lobby.black_player_id}
                           match={this.props.match}/>)
        }

        return commonLobbies;
    }

    showError(error) {
        console.log(error);
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }
}


function  mapStateToProps(state, ownProps) {
    return {
        isCreateLobbyModalOpen: state.lobbies.isCreateLobbyModalOpen,
        lobbyIdToLobby: state.lobbies.lobbyIdToLobby,
        chosenLobby: state.lobbies.chosenLobby
    };
}

const actions = {toggleCreateLobbyModal, createNewLobby, getLobbies, playerJoined}

export default connect(
    mapStateToProps, actions
)(LobbiesPanel)