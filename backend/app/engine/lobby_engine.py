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

    def __init__(self, lobby):
        self.lobby = lobby

    @staticmethod
    def create_new_lobby(chess_app: ChessApp, data: Dict[str, str], player) -> Lobby:
        result = Lobby(LobbyDto(
            lobby_id=uuid.uuid4().hex,
            lobby_name=data['lobby_name'],
            next_move=LobbyEngine.Moves.WHITE,
            white_remaining_ts=60 * 10,  # todo get depends on type game
            black_remaining_ts=60 * 10,  # todo get depends on type game
            white_player_id=player.player_id if data['piece_color'] == 'white' else None,
            black_player_id=player.player_id if data['piece_color'] == 'black' else None
        ))
        result.engine = LobbyEngine(result)

        chess_app.lobby_id_to_lobby[result.lobby_id] = result

        msg: WSMessage

        async def send_lobby_to_subscribers():
            for _ws in chess_app.websocket_lobbies_subs:
                await _ws.send_json({'type': 'new_lobby', 'lobby_id': result.lobby_id, 'lobby_data': result.to_dict()})

        asyncio.create_task(send_lobby_to_subscribers())

        return result
