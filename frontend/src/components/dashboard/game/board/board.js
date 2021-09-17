import React, {Component} from "react";
import Cell from "../cell/cell";

import style from './board.module.css';
import _ from "underscore";
import {connect} from "react-redux";
import configFile from "../../../../config.json";
import {doMovePiece, connectGame, disconnectGame} from "../../../../redux/actions/game";
import {getPlayerId} from "../../../../redux/store";
import {ClipLoader} from "react-spinners";

class Board extends Component {

    constructor(props) {
        super(props);
        this.chosenLobby = this.props.chosenLobby;
        this.wsClient = new WebSocket(`ws://${configFile.SERVER_URL}/ws/game?lobby_id=${this.props.chosenLobby}`); // todo put access_token and delete url from white list
        this.websocketHandling();
    }

    prepareBoard() {
        const boardItems = [];
        const lobby = this.props.lobbyIdToLobby[this.chosenLobby];

        let canMove, cell;
        _.times(8, (y) => {
            _.times(8 , (x) => {
                canMove = this.props.moves[y][x] !== '';
                cell = <Cell wsClient={this.wsClient} key={8*y + x + this.props.board[y][x] + this.props.stepNumber}
                                      posX={x} posY={y} movePiece={this.movePiece.bind(this)} canMove={canMove}
                                      piece={this.getFigure(x, y)}/>;
                lobby.black_player_id === getPlayerId() ? boardItems.unshift(cell) : boardItems.push(cell);
            });
        });

        return boardItems;
    }

    getFigure(posX, posY) {
        return this.props.board[posY][posX];
    }

    websocketHandling() {
        this.wsClient.onopen = () => {
          console.log('WebSocket Client Connected');
        };
        this.wsClient.onmessage = (message) => {
            const data = JSON.parse(message.data);
            switch(data.event) {
                case 'move_piece':
                    this.props.doMovePiece(data['to_x'], data['to_y'], data['from_x'], data['from_y'])
                    break;
                case 'board':
                    this.props.connectGame(data['board'])
                    break;
                default:
                    break;
            }
        };
        this.wsClient.onclose = (message) => {
          this.props.disconnectGame();
        };
        this.wsClient.onerror = (message) => {
          console.log(message);
        };
    }

    movePiece(toPosX, toPosY) {
        this.wsClient.send(JSON.stringify({
            'type': 'movePiece',
            'lobby_id': this.chosenLobby,
            'from': {'pos_x': this.props.chosenPiece.posX, 'pos_y': this.props.chosenPiece.posY},
            'to': {'pos_x': toPosX, 'pos_y': toPosY}
        }));
    }

    render() {
        return (
            <div className={style.board}>
                {this.prepareBoard()}
                <ClipLoader color='black' loading={this.props.loading} size={150} css='position: absolute; top: 35%; left: 35%;'/>
            </div>
        );
    }
}

function  mapStateToProps(state, ownProps) {
    return {
        board: state.game.board,
        moves: state.game.moves,
        chosenPiece: state.game.chosenPiece,
        chosenLobby: state.lobbies.chosenLobby,
        lobbyIdToLobby: state.lobbies.lobbyIdToLobby,
        stepNumber: state.game.stepNumber,
        loading: state.game.loading
    };
}

const actions = {
    doMovePiece, connectGame, disconnectGame
}

export default connect(
    mapStateToProps, actions
)(Board)