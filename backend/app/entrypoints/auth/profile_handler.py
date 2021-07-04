from aiohttp.web import View, Response, Request, json_response


class ProfileRequestHandler(View):

    @staticmethod
    async def get_session_data(request: Request) -> Response:

        return json_response({'ads': 'asdas'})
