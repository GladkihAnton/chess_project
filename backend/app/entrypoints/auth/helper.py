import uuid
from typing import Dict, Union
from datetime import datetime

import jwt
from aiohttp import web
from sqlalchemy import Table, sql
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.engine import LegacyRow

from app import db
from app.config import JWT_SECRET, JWT_EXP_DELTA_SECONDS, JWT_ALGORITHM

JWT_TOKEN_T = 'jwt_token'


def do_login(player: LegacyRow) -> web.Response:

    now_ts = int(datetime.now().timestamp())

    access_token = jwt.encode(payload={
        'exp': now_ts + JWT_EXP_DELTA_SECONDS,
        'player_id': player.id.hex
    }, key=JWT_SECRET, algorithm=JWT_ALGORITHM)

    last_six_letters = slice(len(access_token) - 6, len(access_token))
    refresh_token = uuid.uuid4().hex + access_token[last_six_letters]

    response = web.json_response({'access_token': access_token})
    response.set_cookie('REFRESH_TOKEN', refresh_token, secure=True, samesite='None')
    _store_auth_tokens({
        'refresh_token': refresh_token,
        'access_token': access_token,
        'now_ts': now_ts,
        'player_id': player.id
    })
    return response


def _store_auth_tokens(data: Dict[str, Union[str, uuid.UUID]]) -> None:
    jwt_token_t: Table = db.get_table(JWT_TOKEN_T)
    data_to_store = {
        'access_token': data.get('access_token'),
        'refresh_token': data.get('refresh_token'),
        'last_updated_ts': data.get('now_ts')
    }

    query: sql.Insert = insert(jwt_token_t) \
        .values(
            player_id=data.get('player_id').hex,
            **data_to_store) \
        .on_conflict_do_update(
            index_elements=['player_id'],
            set_=data_to_store)\
        .returning(None)

    with db.get_connection() as conn:
        conn.execute(query)
