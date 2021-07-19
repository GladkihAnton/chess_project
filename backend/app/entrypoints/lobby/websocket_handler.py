from aiohttp.web import WebSocketResponse, Response
from aiohttp import WSMsgType, WSMessage

from app.web import BaseView


class WebsocketLobbyHandler(BaseView):

    async def get(self):
        ws = WebSocketResponse()
        await ws.prepare(self.request)

        await ws.send_json({
            'type': 'lobbies',
            'lobby_id_to_lobby': {
                lobby_id: lobby.to_dict() for lobby_id, lobby
                in self.request.app.lobby_id_to_lobby.items()
            }})

        self.request.app.websocket_lobbies_subs.append(ws)

        msg: WSMessage
        async for msg in ws:
            if msg.type == WSMsgType.text:
                if msg.data == 'close':
                    await ws.close()
                else:
                    # print(msg)
                    # pass
                    for _ws in self.request.app.websocket_lobbies_subs:
                        await _ws.send_json({'asd': 'asd'})
            elif msg.type == WSMsgType.error:
                print(msg)

        self.request.app.websocket_lobbies_subs.remove(ws)

        # for _ws in self.request.app['websocket_lobbies_subs']:
        #     await _ws.send_str('disconected')

        return Response(text='websocket close', status=200)
