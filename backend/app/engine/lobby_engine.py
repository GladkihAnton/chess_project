import uuid
import asyncio

from aiohttp import WSMessage
from aiohttp.web import Application

from app.model.lobby import Lobby, LobbyDto


class LobbyEngine:

    class Moves:
        WHITE = 'white'
        BLACK = 'black'

    def __init__(self, lobby):
        self.lobby = lobby

    @staticmethod
    def create_new_lobby(chess_app: Application, lobby_name: str) -> Lobby:
        result = Lobby(LobbyDto(
            lobby_id=uuid.uuid4().hex,
            lobby_name=lobby_name,
            next_move=LobbyEngine.Moves.WHITE,
            white_remaining_ts=60 * 10,  # todo get depends on type game
            black_remaining_ts=60 * 10  # todo get depends on type game
        ))
        result.engine = LobbyEngine(result)

        chess_app['lobby_id_to_lobby'][result.lobby_id] = result

        msg: WSMessage

        async def test():
            for _ws in chess_app['websocket_lobbies']:
                await _ws.send_json({'type': 'new_lobby', 'lobby_data': result.to_dict()})

        asyncio.create_task(test())

        return result