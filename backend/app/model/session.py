from __future__ import annotations
from dataclasses import dataclass

from sqlalchemy.sql import insert

from app import db


class Session:

    def __init__(self, dto: SessionDto):
        self._dto = dto

    @property
    def session_id(self):
        return self._dto.session_id

    @session_id.setter
    def session_id(self, session_id: str):
        self._dto.session_id = session_id

    def store(self) -> None:
        #todo сделать через абстракцию
        session_t = db.get_table('session')
        insert(session_t).values(session_id=self.session_id)


@dataclass
class SessionDto:
    session_id: str

