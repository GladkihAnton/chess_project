from __future__ import annotations

from typing import List, Dict

from aiohttp import web
from aiohttp_middlewares import cors_middleware, error_middleware

from app.entrypoints.lobby.handler import CreateLobbyRequestHandler
from app.entrypoints.lobby.websocket_handler import WebsocketLobbyHandler
from app.entrypoints.profile.hanlder import ProfileRequestHandler
from app.entrypoints.auth.register.handler import RegisterRequestHandler
from app.entrypoints.auth.refresh_token.handler import RefreshTokenRequestHandler
from app.entrypoints.auth.login.handler import LoginRequestHandler
from app.middlewares.authenticate_middleware import authenticate_middleware
from app.model.lobby import Lobby


def make_app() -> web.Application:
    chess_app = web.Application(
        middlewares=[
            cors_middleware(origins=['http://localhost:3000'], allow_credentials=True),
            error_middleware(),
            authenticate_middleware
        ])
    chess_app['access_token_salt'] = 'password_salt'  # todo get it from env.file
    chess_app['websocket_lobbies']: List[web.WebSocketResponse] = []
    chess_app['lobby_id_to_lobby']: Dict[str, Lobby] = {}

    chess_app.router.add_get('/get-session-data', ProfileRequestHandler)
    chess_app.router.add_get('/ws/lobby', WebsocketLobbyHandler)
    chess_app.router.add_post('/lobbies/create-lobby', CreateLobbyRequestHandler)

    auth_app = web.Application(
        middlewares=[
            cors_middleware(origins=['http://localhost:3000'], allow_credentials=True),
            error_middleware(),
        ])

    auth_app.router.add_post('/signup', RegisterRequestHandler)
    auth_app.router.add_post('/refresh-token', RefreshTokenRequestHandler)
    auth_app.router.add_post('/login', LoginRequestHandler)

    chess_app.add_subapp('/auth', auth_app)

    return chess_app


if __name__ == '__main__':
    app = make_app()
    web.run_app(app, host='localhost', port=8080)
