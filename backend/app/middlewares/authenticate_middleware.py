import re
import uuid

import jwt
from aiohttp import web
from sqlalchemy import Table, sql, select
from sqlalchemy.engine import LegacyRow

from app import db
from app.config import JWT_SECRET, JWT_ALGORITHM, JWT_EXP_DELTA_SECONDS


@web.middleware
async def authenticate_middleware(request, handler):
    request.user = None
    jwt_token = request.headers.get('authorization', None)
    if jwt_token:
        try:
            payload = jwt.decode(jwt_token, JWT_SECRET, JWT_ALGORITHM, leeway=JWT_EXP_DELTA_SECONDS)
        except (jwt.DecodeError, jwt.ExpiredSignatureError):
            return web.json_response({'error': 'token_is_invalid'}, status=401)

        request.user = _get_player(payload['pla'])
    return await handler(request)


def check_request_in_white_list(request, entries):
    for pattern in entries:
        if re.match(pattern, request.path):
            return True

    return False


def _get_player(player_id: uuid.UUID) -> LegacyRow:
    player_t: Table = db.get_table('player')
    query: sql.Select = select([player_t]).where(player_t.c.id == player_id)

    with db.get_connection() as conn:
        result = conn.execute(query).fetchone()

    return result
