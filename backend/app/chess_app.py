from __future__ import annotations

from aiohttp import web
from aiohttp_middlewares import cors_middleware, error_middleware

from app.entrypoints.profile.hanlder import ProfileRequestHandler
from app.entrypoints.auth.register.handler import RegisterRequestHandler
from app.entrypoints.auth.refresh_token.handler import RefreshTokenRequestHandler
from app.entrypoints.auth.login.handler import LoginRequestHandler
from app.middlewares.authenticate_middleware import authenticate_middleware


class ChessApp(web.Application):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.session_id_to_session = {}

    @classmethod
    def make_app(cls):
        chess_app = cls(
            middlewares=[
                cors_middleware(origins=['http://localhost:3000'], allow_credentials=True),
                error_middleware(),
                authenticate_middleware
            ])
        chess_app['access_token_salt'] = 'password_salt'  # todo get it from env.file

        chess_app.router.add_get('/get-session-data', ProfileRequestHandler)

        auth_app = cls(
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
    app = ChessApp.make_app()
    web.run_app(app, host='localhost', port=8080)
