from __future__ import annotations

from dataclasses import dataclass


class Player:

    def __init__(self, dto: PlayerDto):
        self._dto = dto

    @property
    def player_id(self):
        return self._dto.player_id

    @player_id.setter
    def player_id(self, player_id: str):
        self._dto.player_id = player_id

    @property
    def email(self):
        return self._dto.email

    @email.setter
    def email(self, email: str):
        self._dto.email = email

    @property
    def password(self):
        return self._dto.password

    @password.setter
    def password(self, password: str):
        self._dto.password = password


@dataclass
class PlayerDto:
    player_id: str
    email: str
    password: str

