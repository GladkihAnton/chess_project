import json
from typing import Dict

from aiohttp import web
from sqlalchemy.engine.cursor import LegacyRow
from sqlalchemy import sql, insert, select, Table

from app import db
from app.utils import hash_password
from app.entrypoints.auth.helper import do_login


class RegisterRequestHandler(web.View):
    PLAYER_T = 'player'

    async def post(self) -> web.Response:
        request_json: dict = await self.request.json()
        body: Dict[str, str] = json.loads(request_json['body'])

        password: str = body['password']
        email: str = body['email']
        hashed_password: str = hash_password(password)

        if self._is_user_exist(email):
            return web.json_response({'error': 'user_already_exist'})

        player = self._create_player({'email': email, 'password': hashed_password})
        return do_login(player)

    @staticmethod
    def _create_player(data: Dict[str, str]) -> LegacyRow:
        player_t: Table = db.get_table(RegisterRequestHandler.PLAYER_T)
        query: sql.Insert = insert(player_t).values(password=data.get('password'), email=data.get('email')) \
                                            .returning(player_t.c.id, player_t.c.email)

        with db.get_connection() as conn:
            result: LegacyRow = conn.execute(query).fetchone()

        return result

    @staticmethod
    def _is_user_exist(email: str) -> bool:
        player_t: Table = db.get_table(RegisterRequestHandler.PLAYER_T)
        query: sql.Select = select(player_t.c.email).where(player_t.c.email == email)
        with db.get_connection() as conn:
            result = conn.execute(query).fetchall()
        return bool(result)
