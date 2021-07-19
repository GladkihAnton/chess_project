import React, {Component} from "react";
import Cell from "../cell/cell";

import style from './board.module.css';
import _ from "underscore";
import {connect} from "react-redux";
import configFile from "../../../../config.json";
import {doMovePiece} from "../../../../redux/actions/game";

class Board extends Component {

    constructor(props) {
        super(props);
        this.chosenLobby = this.props.chosenLobby;
        this.wsClient = new WebSocket(`ws://${configFile.SERVER_URL}/ws/game?lobby_id=${this.props.chosenLobby}`); // todo put access_token and delete url from white list
        this.websocketHandling();
    }

    prepareBoard() {
        let boardItems = [];
        _.times(8, (y) => {
            _.times(8 , (x) => {
                const canMove = this.props.moves[y][x] !== '';
                boardItems.push(<Cell wsClient={this.wsClient} key={8*y + x + this.props.board[y][x] + this.props.stepNumber}
                                      posX={x} posY={y} movePiece={this.movePiece.bind(this)} canMove={canMove}
                                      piece={this.getFigure(x, y)}/>);
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
            switch(data.type) {
                case 'move_piece':
                    this.props.doMovePiece(data['to_x'], data['to_y'], data['from_x'], data['from_y'])
                    break;
                default:
                    break;
            }
        };
        this.wsClient.onclose = (message) => {
          console.log(message);
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
        }))
    }

    render() {
        return (
            <div className={style.board}>
                {this.prepareBoard()}
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
        stepNumber: state.game.stepNumber
    };
}

const actions = {
    doMovePiece
}

export default connect(
    mapStateToProps, actions
)(Board)