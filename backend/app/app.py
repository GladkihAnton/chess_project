from aiohttp import web

async def hello(request):

    return web.json_response({})

# app = web.Application()
# app.add_routes([web.get('/', hello)])

# web.run_app(app)

def init_func(argv):
    app = web.Application()
    app.router.add_get("/", hello)
    return app