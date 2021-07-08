from aiohttp.web import View, json_response

from app.engine.lobby_engine import LobbyEngine
from app.model.lobby import Lobby


class CreateLobbyRequestHandler(View):

    async def post(self):
        data = await self.request.json()
        LobbyEngine.create_new_lobby(self.request.app, data['lobby_name'])

        return json_response({'result': 'ok'})
