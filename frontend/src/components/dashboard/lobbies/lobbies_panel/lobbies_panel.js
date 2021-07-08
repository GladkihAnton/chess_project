import React, {Component} from "react";

import {connect} from "react-redux";
import style from './lobbies_panel.module.css';
import configFile from "../../../../config.json";
import Modal from 'react-modal';
import {toggleCreateLobbyModal, createNewLobby} from "../../../../redux/actions/lobbies";
import request from "../../../../utils/request";
import Lobby from "../lobby/lobby";


class LobbiesPanel extends Component {

    constructor(props) {
        super(props);
        this.isCreateLobbyModalOpen = this.props.isCreateLobbyModalOpen;
        this.lobbyName = React.createRef();

        this.client = new WebSocket(`ws://${configFile.SERVER_URL}/ws/lobby`); // todo put access_token and delete url from white list
        this.websocketHandling();
    }

    render() {
        return (
            <div>
                <button onClick={this.props.toggleCreateLobbyModal.bind(this, true)}>create new lobby</button>
                <div className={style.panel}>
                    {this.prepareLobbyList(this.props.lobbies)}
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
                            <p>
                                <button onClick={this.props.toggleCreateLobbyModal.bind(this, false)}>close</button>
                                <button type='button' onClick={this.createLobby.bind(this)}>save</button>
                            </p>
                        </form>
                    </Modal>
                </div>
            </div>
        )
    }

    createLobby(e) {
        request.post('/lobbies/create-lobby',
            {
                lobby_name: this.lobbyName.current.value,
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
            switch(data.type) {
                case 'new_lobby':
                    this.props.createNewLobby(data.lobby_data);
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

    prepareLobbyList(lobbies) {
        let yourLobbies = [];
        let commonLobbies = [];
        for (let lobby of lobbies) {
            commonLobbies.push(<Lobby key={lobby.lobby_id} lobby_id={lobby.lobby_id} lobbyName={lobby.lobby_name} nextMove={lobby.next_move}
                           whiteRemainingTs={lobby.white_remaining_ts} blackRemainingTs={lobby.black_remaining_ts}/>)
        }
        console.log(lobbies);

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
        lobbies: state.lobbies.lobbies
    };
}

const actions = {toggleCreateLobbyModal, createNewLobby}

export default connect(
    mapStateToProps, actions
)(LobbiesPanel)