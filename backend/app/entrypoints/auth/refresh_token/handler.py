import json
import uuid
from typing import Dict
from functools import partial

from aiohttp import web
from sqlalchemy import sql, insert, select, Table
from jwt import decode
from jwt import encode

from app import db
from app.utils import hash_password
from app.engine.session_engine import SessionEngine


class RefreshTokenRequestHandler(web.View):
    TOKEN_HEADER = {
      "alg": "HS256",
      "typ": "JWT"
    }

    JWT_TOKEN_T = 'jwt_token'
    ACCESS_TOKEN_EXPIRATION_TIME = 60 * 15  # 15 min

    @staticmethod
    async def refresh(request: web.Request) -> web.Response:
        request_json: dict = await request.json()
        body: Dict[str, str] = json.loads(request_json['body'])

        access_token: str = body['access_token']
        refresh_token: str = request.cookies.get('REFRESH_TOKEN')

        last_six_letters = slice(-1, -7, -1)
        # if access_token[last_six_letters] == refresh_token[last_six_letters]


        # if RefreshTokenRequestHandler._is_user_exist(email):
        return web.json_response({'error': 'user_already_exist'})

        # query = RefreshTokenRequestHandler._build_query({'email': email, 'password': hashed_password})
        # with db.get_connection() as conn:
        #     conn.execute(query)
        #
        # response = web.json_response({'result': 'ok'})
        # prefix_refresh_token = uuid.uuid4().hex
        # session = SessionEngine.create_session(request.app)
        # response.set_cookie('SESSION_ID', session.session_id, secure=True, samesite='None')
        #
        # return response
    #
    # @staticmethod
    # def _build_query(data: Dict[str, str]) -> sql.Insert:
    #     player_t: Table = db.get_table(RegisterRequestHandler.PLAYER_T)
    #     return insert(player_t).values(password=data.get('password'), email=data.get('email'))
    #
    # @staticmethod
    # def _is_user_exist(email: str) -> bool:
    #     player_t: Table = db.get_table(RegisterRequestHandler.PLAYER_T)
    #     query: sql.Select = select(player_t.c.email).where(player_t.c.email == email)
    #     with db.get_connection() as conn:
    #         result = conn.execute(query).fetchall()
    #     return bool(result)
