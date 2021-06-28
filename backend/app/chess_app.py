from __future__ import annotations

from functools import partial

from aiohttp import web
from aiohttp_middlewares import cors_middleware

from app.entrypoints.register.handler import RegisterHandler


class ChessApp(web.Application):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.session_id_to_session = {}

    @classmethod
    def make_app(cls):
        chess_app = cls(
            middlewares=[
                cors_middleware(origins=["http://localhost:3000"], allow_credentials=True, max_age=3600)
            ])
        chess_app.router.add_post("/signup", partial(RegisterHandler.post, chess_app=chess_app))

        return chess_app


if __name__ == '__main__':
    chess_app = ChessApp.make_app()
    web.run_app(chess_app, host='localhost', port=8080)
