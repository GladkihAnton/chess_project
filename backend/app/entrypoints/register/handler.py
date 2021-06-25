import json
from typing import Dict

from aiohttp import web
from sqlalchemy import sql, insert, select, Table

from app import db
from app.utils import hash_password


class RegisterHandler:
    PLAYER_T = 'player'

    @staticmethod
    async def post(request: web.Request) -> web.Response:
        request_json: dict = await request.json()
        body: Dict[str, str] = json.loads(request_json['body'])

        password: str = body['password']
        email: str = body['email']
        hashed_password: str = hash_password(password)

        if RegisterHandler._is_user_exist(email):
            return web.json_response({'error': 'user_already_exist'})

        query = RegisterHandler._build_query({'email': email, 'password': hashed_password})
        with db.get_connection() as conn:
            conn.execute(query)

        return web.json_response({'result': 'ok'})

    @staticmethod
    def _build_query(data: Dict[str, str]) -> sql.Insert:
        player_t: Table = db.get_table(RegisterHandler.PLAYER_T)
        return insert(player_t).values(password=data.get('password'), email=data.get('email'))

    @staticmethod
    def _is_user_exist(email: str) -> bool:
        player_t: Table = db.get_table(RegisterHandler.PLAYER_T)
        query: sql.Select = select(player_t.c.email).where(player_t.c.email == email)
        with db.get_connection() as conn:
            result = conn.execute(query).fetchall()
        return bool(result)
