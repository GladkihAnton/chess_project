from __future__ import annotations

from dataclasses import dataclass, field
from typing import TYPE_CHECKING, Optional, List

from aiohttp.web import WebSocketResponse

from app.model.player import Player

if TYPE_CHECKING:
    from app.model.game import Game
    from app.engine.lobby_engine import LobbyEngine


class Lobby:

    def __init__(self, dto: LobbyDto):
        self._dto = dto
        self.engine: Optional[LobbyEngine] = None

    @property
    def lobby_id(self):
        return self._dto.lobby_id

    @lobby_id.setter
    def lobby_id(self, lobby_id: str):
        self._dto.lobby_id = lobby_id

    @property
    def lobby_name(self):
        return self._dto.lobby_name

    @lobby_name.setter
    def lobby_name(self, lobby_name: str):
        self._dto.lobby_name = lobby_name

    # @property
    # def current_position(self):
    #     return self._dto.current_position
    #
    # @current_position.setter
    # def current_position(self, current_position: str):
    #     self._dto.current_position = current_position

    @property
    def next_move(self):
        return self._dto.next_move

    @next_move.setter
    def next_move(self, next_move: str):
        self._dto.next_move = next_move

    @property
    def game(self):
        return self._dto.game

    @game.setter
    def game(self, game: str):
        self._dto.game = game

    @property
    def white_remaining_ts(self):
        return self._dto.white_remaining_ts

    @white_remaining_ts.setter
    def white_remaining_ts(self, white_remaining_ts: int):
        self._dto.white_remaining_ts = white_remaining_ts

    @property
    def black_remaining_ts(self):
        return self._dto.black_remaining_ts

    @black_remaining_ts.setter
    def black_remaining_ts(self, black_remaining_ts: int):
        self._dto.black_remaining_ts = black_remaining_ts

    @property
    def white_player(self):
        return self._dto.white_player

    @white_player.setter
    def white_player(self, white_player: Player):
        self._dto.white_player = white_player

    @property
    def black_player(self):
        return self._dto.black_player

    @black_player.setter
    def black_player(self, black_player: Player):
        self._dto.black_player = black_player

    @property
    def websocket_subscribers(self):
        return self._dto.websocket_subscribers

    def add_websocket_subscriber(self, ws: WebSocketResponse):
        self._dto.websocket_subscribers.append(ws)

    def remove_websocket_subscriber(self, ws: WebSocketResponse):
        self._dto.websocket_subscribers.remove(ws)

    def to_dict(self):
        return {
            'lobby_id': self.lobby_id,
            'lobby_name': self.lobby_name,
            'next_move': self.next_move,
            'white_remaining_ts': self.white_remaining_ts,
            'black_remaining_ts': self.black_remaining_ts,
            'white_player_id': self.white_player.player_id if self.white_player else None,
            'black_player_id': self.black_player.player_id if self.black_player else None
        }


@dataclass
class LobbyDto:
    lobby_id: str
    lobby_name: str
    white_remaining_ts: int
    black_remaining_ts: int
    next_move: str

    white_player: Optional[Player] = None
    black_player: Optional[Player] = None
    game: Optional[Game] = None

    websocket_subscribers: List[WebSocketResponse] = field(default_factory=list)
