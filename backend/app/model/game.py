from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, TYPE_CHECKING, Optional

if TYPE_CHECKING:
    from app.engine.game_engine import GameEngine


class Game:

    DEFAULT_BOARD_POSITION = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ]

    def __init__(self, dto: GameDto):
        self._dto = dto
        self.engine: Optional[GameEngine] = None

    @property
    def board(self):
        return self._dto.board

    @board.setter
    def board(self, board: str):
        self._dto.board = board

    @property
    def step_number(self):
        return self._dto.step_number

    @step_number.setter
    def step_number(self, step_number: str):
        self._dto.step_number = step_number

    def to_dict(self):
        return {
            'board': self.board,
        }


@dataclass
class GameDto:
    step_number: int = 1
    board: List[List[str]] = field(default_factory=lambda: Game.DEFAULT_BOARD_POSITION)
