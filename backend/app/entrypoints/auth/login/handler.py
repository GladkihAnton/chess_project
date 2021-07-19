from typing import Dict

from aiohttp import web

from app.utils import hash_password
from app.model.player import Player
from app.entrypoints.auth.helper import do_login
from app.engine.player_engine import PlayerEngine, UserDoesNotExist


class LoginRequestHandler(web.View):
    PLAYER_T = 'player'
    JWT_TOKEN_T = 'jwt_token'

    async def post(self) -> web.Response:
        request_json: Dict[str, str] = await self.request.json()

        try:
            email: str = request_json['email']
            password: str = request_json['password']
            player: Player = PlayerEngine.load_player_by_email(email)
            self._match_passwords(player, password)
        except UserDoesNotExist:
            return web.json_response({'error': 'user_does_not_exist'})
        except PasswordsDontMatch:
            return web.json_response({'error': 'wrong_password'})

        return do_login(player)

    @staticmethod
    def _match_passwords(player: Player, password: str):
        if hash_password(password) != player.password:
            raise PasswordsDontMatch


class PasswordsDontMatch(Exception):
    pass
