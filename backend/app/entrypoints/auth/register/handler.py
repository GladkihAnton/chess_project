import json
from typing import Dict

from aiohttp import web

from app.utils import hash_password
from app.entrypoints.auth.helper import do_login
from app.engine.player_engine import PlayerEngine, UserDoesNotExist


class RegisterRequestHandler(web.View):
    PLAYER_T = 'player'

    async def post(self) -> web.Response:
        request_json: dict = await self.request.json()
        body: Dict[str, str] = json.loads(request_json['body'])

        password: str = body['password']
        email: str = body['email']
        hashed_password: str = hash_password(password)

        try:
            PlayerEngine.load_player_by_email(email)
            return web.json_response({'error': 'user_already_exist'})
        except UserDoesNotExist:
            pass

        player = PlayerEngine.create_player(email, hashed_password)
        return do_login(player)
