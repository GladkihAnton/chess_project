import re
import uuid

import jwt
from aiohttp import web
from sqlalchemy import Table, sql, select
from sqlalchemy.engine import LegacyRow

from app import db
from app.config import JWT_SECRET, JWT_ALGORITHM, JWT_EXP_DELTA_SECONDS, WHITE_LIST_PATHS


@web.middleware
async def authenticate_middleware(request, handler):
    request.user = None
    if _is_request_in_white_list(request, WHITE_LIST_PATHS):
        return await handler(request)

    authorization_header = request.headers.get('authorization', None)
    if not authorization_header:
        return web.json_response({'error': 'token_is_invalid'}, status=401)

    try:
        scheme, token = authorization_header.strip().split(' ')
    except ValueError:
        raise web.HTTPForbidden(
            reason='Invalid authorization header',
        )

    try:
        payload = jwt.decode(token, JWT_SECRET, JWT_ALGORITHM, leeway=JWT_EXP_DELTA_SECONDS)
    except jwt.DecodeError:
        return web.json_response({'error': 'token_is_invalid'}, status=401)

    request.user = _get_player(payload['player_id'])
    return await handler(request)


def _is_request_in_white_list(request, entries):
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
