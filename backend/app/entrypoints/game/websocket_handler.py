import json

from aiohttp.web import WebSocketResponse, Response
from aiohttp import WSMsgType, WSMessage

from app.web import BaseView


class WebsocketGameHandler(BaseView):

    async def get(self):
        ws = WebSocketResponse()
        await ws.prepare(self.request)

        lobby_id = self.request.query.get('lobby_id')

        await ws.send_json({
            'event': 'board',
            'board': self.request.app.lobby_id_to_lobby[lobby_id].game.board
        })

        self.request.app.lobby_id_to_lobby[lobby_id].add_websocket_subscriber(ws)

        msg: WSMessage
        async for msg in ws:
            if msg.type == WSMsgType.text:
                if msg.data == 'close':
                    await ws.close()
                else:
                    data = json.loads(msg.data)
                    if data['type'] == 'movePiece':
                        self.request.app.lobby_id_to_lobby[data['lobby_id']].game.engine. \
                            do_move(from_x=data['from']['pos_x'],
                                    from_y=data['from']['pos_y'],
                                    to_x=data['to']['pos_x'],
                                    to_y=data['to']['pos_y'])

                        for _ws in self.request.app.lobby_id_to_lobby[data['lobby_id']].websocket_subscribers:
                            await _ws.send_json({
                                'event': 'move_piece',
                                'from_x': data['from']['pos_x'], 'from_y': data['from']['pos_y'],
                                'to_x': data['to']['pos_x'], 'to_y': data['to']['pos_y'],
                            })

            elif msg.type == WSMsgType.error:
                print(msg)

        self.request.app.lobby_id_to_lobby[lobby_id].remove_websocket_subscriber(ws)

        return Response(text='websocket close', status=200)
