import json
import uuid
from typing import Dict
from datetime import datetime

import jwt
from aiohttp import web
from sqlalchemy import sql, insert, select, Table
from sqlalchemy.engine import LegacyRow

from app import db
from app.utils import hash_password
from app.engine.session_engine import SessionEngine
from app.entrypoints.auth.login.controller import do_login


class LoginRequestHandler(web.View):
    PLAYER_T = 'player'
    JWT_TOKEN_T = 'jwt_token'

    @staticmethod
    async def login(request: web.Request) -> web.Response:
        request_json: dict = await request.json()
        body: Dict[str, str] = json.loads(request_json['body'])

        try:
            email: str = body['email']
            password: str = body['password']
            player: LegacyRow = await LoginRequestHandler._get_player(email)
            LoginRequestHandler._match_passwords(player, password)
        except UserDoesNotExist:
            return web.json_response({'error': 'user_does_not_exist'})
        except PasswordsDontMatch:
            return web.json_response({'error': 'wrong_password'})

        # session = SessionEngine.create_session(request.app)

        return do_login(player)

    @staticmethod
    def _get_player(email: str) -> LegacyRow:
        player_t: Table = db.get_table(LoginRequestHandler.PLAYER_T)
        query: sql.Select = select([player_t]).where(player_t.c.email == email)

        with db.get_connection() as conn:
            result = conn.execute(query).fetchone()

        if not result:
            raise UserDoesNotExist

        return result

    @staticmethod
    def _match_passwords(player, password):
        if hash_password(player.password) != password:
            raise PasswordsDontMatch


class UserDoesNotExist(Exception):
    pass


class PasswordsDontMatch(Exception):
    pass
