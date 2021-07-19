from aiohttp.web import Response, json_response

from app.web import BaseView


class ProfileRequestHandler(BaseView):

    async def get(self) -> Response:
        return json_response({'result': 'ok'})
