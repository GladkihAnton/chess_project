from aiohttp.web import json_response

from app.engine.lobby_engine import LobbyEngine
from app.web import BaseView


class LobbyRequestHandler(BaseView):

    async def post(self):
        data = await self.request.json()
        event = data['event']

        if event == 'new_lobby':
            LobbyEngine.create_new_lobby(self.request.app, data, self.request.player)
        elif event == 'enter_into_lobby':
            pass

        return json_response({'result': 'ok'})

