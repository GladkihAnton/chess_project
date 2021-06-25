from aiohttp import web
from aiohttp_middlewares import cors_middleware

from .entrypoints.register.handler import RegisterHandler


def init_func(argv):
    app = web.Application(
        middlewares=[
            cors_middleware(origins=["http://localhost:3000"])
        ])
    app.router.add_post("/signup", RegisterHandler.post)

    return app
