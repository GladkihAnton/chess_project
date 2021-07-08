from typing import Optional
from aiohttp.web import Request

from aiohttp.web import View, WebSocketResponse
from aiohttp import WSMsgType, WSMessage


class WebsocketLobbyHandler(View):

    async def get(self):
        ws = WebSocketResponse()
        await ws.prepare(self.request)

        _ws: WebSocketResponse
        for _ws in self.request.app['websocket_lobbies']:
            await _ws.send_str('joined bla')
        self.request.app['websocket_lobbies'].append(ws)

        msg: WSMessage
        async for msg in ws:
            if msg.type == WSMsgType.text:
                if msg.data == 'close':
                    await ws.close()
                else:
                    # print(msg)
                    # pass
                    for _ws in self.request.app['websocket_lobbies']:
                        await _ws.send_json({'asd': 'asd'})
            elif msg.type == WSMsgType.error:
                print(msg)

        self.request.app['websocket_lobbies'].remove(ws)
        for _ws in self.request.app['websocket_lobbies']:
            await _ws.send_str('disconected')
        # log.debug('websocket connection closed')
