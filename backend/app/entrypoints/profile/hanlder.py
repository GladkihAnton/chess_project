from aiohttp.web import View, Response, Request, json_response


class ProfileRequestHandler(View):

    async def get(self) -> Response:
        return json_response({'result': 'ok'})
