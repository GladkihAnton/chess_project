from aiohttp import web
import sqlalchemy as sa
from app import db
from app.utils import hash_password


class RegisterHandler:
    PLAYER_T = db.get_table('player')

    @staticmethod
    async def get(request: web.Request):
        password = request.rel_url.query['password']
        email = request.rel_url.query['email']
        hashed_password = hash_password(password)

        query = RegisterHandler._build_query({'email': email, 'password': hashed_password})
        with db.get_connection() as conn:
            conn.execute(query)

        return web.json_response({})

    @staticmethod
    async def post(request: web.Request):
        a = await request.json()
        print(a)
        print(request.get('email'))
        return web.json_response({}, headers={"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"})

    @staticmethod
    def _build_query(data):
        return sa.insert(RegisterHandler.PLAYER_T).values(password=data.get('password'), email=data.get('email'))

