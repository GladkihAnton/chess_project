import re

import jwt
from aiohttp import web

from app.engine.player_engine import PlayerEngine
from app.config import JWT_SECRET, JWT_ALGORITHM, JWT_EXP_DELTA_SECONDS, WHITE_LIST_PATHS


@web.middleware
async def authenticate_middleware(request, handler):
    request.player = None
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

    request.player = PlayerEngine.load_player_by_id(payload['player_id'])
    return await handler(request)


def _is_request_in_white_list(request, entries):
    for pattern in entries:
        if re.match(pattern, request.path):
            return True

    return False
