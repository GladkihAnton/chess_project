from aiohttp import web
from .entrypoints.register.handler import RegisterHandler
from app import db
import sqlalchemy as sa

async def hello(request):

    return web.json_response({})

# app = web.Application()
# app.add_routes([web.get('/', hello)])

# web.run_app(app)

def init_func(argv):
    app = web.Application()
    app.router.add_post("/signup", RegisterHandler.post)
    # app.router.add_get("/login")
    return app