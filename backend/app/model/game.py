from __future__ import annotations

from dataclasses import dataclass, field
from typing import List


class Game:

    DEFAULT_BOARD_POSITION = [
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
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

    @property
    def board(self):
        return self._dto.board

    @board.setter
    def board(self, board: str):
        self._dto.board = board

    def to_dict(self):
        return {
            'board': self.board,
        }


@dataclass
class GameDto:
    board: List[List[str]] = field(default_factory=Game.DEFAULT_BOARD_POSITION)
