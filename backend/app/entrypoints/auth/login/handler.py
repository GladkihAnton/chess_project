from typing import Dict

from aiohttp import web
from sqlalchemy import sql, select, Table
from sqlalchemy.engine import LegacyRow

from app import db
from app.utils import hash_password
from app.entrypoints.auth.helper import do_login


class LoginRequestHandler(web.View):
    PLAYER_T = 'player'
    JWT_TOKEN_T = 'jwt_token'

    async def post(self) -> web.Response:
        request_json: Dict[str, str] = await self.request.json()

        try:
            email: str = request_json['email']
            password: str = request_json['password']
            player: LegacyRow = self._get_player(email)
            self._match_passwords(player, password)
        except UserDoesNotExist:
            return web.json_response({'error': 'user_does_not_exist'})
        except PasswordsDontMatch:
            return web.json_response({'error': 'wrong_password'})

        return do_login(player)

    def _get_player(self, email: str) -> LegacyRow:
        player_t: Table = db.get_table(self.PLAYER_T)
        query: sql.Select = select([player_t]).where(player_t.c.email == email)

        with db.get_connection() as conn:
            result = conn.execute(query).fetchone()

        if not result:
            raise UserDoesNotExist

        return result

    @staticmethod
    def _match_passwords(player, password):
        if hash_password(password) != player.password:
            raise PasswordsDontMatch


class UserDoesNotExist(Exception):
    pass


class PasswordsDontMatch(Exception):
    pass
