from aiohttp import web
import sqlalchemy as sa
from app import db


class RegisterHandler:

    @staticmethod
    def temp():
        player_t = db.get_table('player')
        query = sa.select([player_t])

        with db.get_connection() as conn:
            result = conn.execute(query)
            for row in result:
                print(dict(row))

    @staticmethod
    async def get(request):

        return web.json_response({})

    @staticmethod
    async def post(request: web.Request):
        a = await request.json()
        print(a)
        print(request.get('email'))
        return web.json_response({}, headers={"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"})