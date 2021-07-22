import uuid
import asyncio
from typing import Dict, TYPE_CHECKING

from aiohttp import WSMessage

from app.model.lobby import Lobby, LobbyDto

if TYPE_CHECKING:
    from app.chess_app import ChessApp


class LobbyEngine:

    class Moves:
        WHITE = 'white'
        BLACK = 'black'

    def __init__(self, lobby, chess_app):
        self.lobby = lobby
        self.chess_app: ChessApp = chess_app

    @staticmethod
    def create_new_lobby(chess_app: 'ChessApp', data: Dict[str, str], player) -> Lobby:
        result = Lobby(LobbyDto(
            lobby_id=uuid.uuid4().hex,
            lobby_name=data['lobby_name'],
            next_move=LobbyEngine.Moves.WHITE,
            white_remaining_ts=60 * 10,  # todo get depends on type game
            black_remaining_ts=60 * 10,  # todo get depends on type game
            white_player=player if data['piece_color'] == 'white' else None,
            black_player=player if data['piece_color'] == 'black' else None
        ))
        result.engine = LobbyEngine(result, chess_app)

        chess_app.lobby_id_to_lobby[result.lobby_id] = result

        msg: WSMessage

        result.engine.send_action_to_subscribers(event='new_lobby', data={'lobby_id': result.lobby_id,
                                                                          'lobby_data': result.to_dict()})

        return result

    def add_player_to_lobby(self, player):
        piece_color = None
        if player in [self.lobby.white_player, self.lobby.black_player]:
            return

        if not self.lobby.white_player:
            self.lobby.white_player = player
            piece_color = 'white'
        elif not self.lobby.black_player:
            self.lobby.black_player = player
            piece_color = 'black'

        self.send_action_to_subscribers(event='player_joined', data={'lobby_id': self.lobby.lobby_id,
                                                                     'player_id': player.player_id,
                                                                     'piece_color': piece_color})

    def send_action_to_subscribers(self, event, data):
        async def do_send_action_to_subscribers(chess_app: 'ChessApp'):
            for _ws in chess_app.websocket_lobbies_subs:
                await _ws.send_json({'event': event} | data)

        asyncio.create_task(do_send_action_to_subscribers(self.chess_app))
