from typing import Dict

import jwt
from aiohttp import web
from sqlalchemy import sql, select, Table
from sqlalchemy.engine import LegacyRow

from app import db
from app.config import JWT_SECRET, JWT_ALGORITHM
from app.engine.player_engine import PlayerEngine
from app.entrypoints.auth.helper import do_login


class RefreshTokenRequestHandler(web.View):
    PLAYER_T = 'player'
    TOKEN_HEADER = {
      "alg": "HS256",
      "typ": "JWT"
    }

    JWT_TOKEN_T = 'jwt_token'
    ACCESS_TOKEN_EXPIRATION_TIME = 60  # 15 min

    async def post(self) -> web.Response:
        body: Dict[str, str] = await self.request.json()

        access_token: str = body['access_token']
        refresh_token: str = self.request.cookies.get('REFRESH_TOKEN')

        last_six_letters = slice(-1, -7, -1)
        if not access_token or not refresh_token or \
                access_token[last_six_letters] != refresh_token[last_six_letters]:
            return web.json_response({'error': 'token_is_invalid'})

        try:
            payload = jwt.decode(access_token, key=JWT_SECRET, algorithms=JWT_ALGORITHM, options={'verify_exp': False})
        except jwt.DecodeError:
            raise web.HTTPUnauthorized

        player_id = payload.get('player_id')

        if not self._compare_tokens_with_db(player_id, access_token, refresh_token):
            return web.json_response({'error': 'token_is_invalid'})

        return do_login(PlayerEngine.load_player_by_id(player_id))

    @staticmethod
    def _compare_tokens_with_db(player_id: str, access_token: str, refresh_token: str) -> bool:
        jwt_token_t: Table = db.get_table(RefreshTokenRequestHandler.JWT_TOKEN_T)
        query: sql.Select = select([jwt_token_t.c.access_token, jwt_token_t.c.refresh_token]).where(jwt_token_t.c.player_id == player_id)

        with db.get_connection() as conn:
            loaded_tokens: LegacyRow = conn.execute(query).fetchone()

        return loaded_tokens.access_token == access_token and loaded_tokens.refresh_token == refresh_token
