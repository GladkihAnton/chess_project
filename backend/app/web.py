from typing import TYPE_CHECKING, Optional, List

from aiohttp.web import Request, View
from aiohttp.web_urldispatcher import UrlMappingMatchInfo


if TYPE_CHECKING:
    from model.player import Player
    from app.chess_app import ChessApp


class BaseUrlMappingMatchInfo(UrlMappingMatchInfo):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._apps: List[ChessApp] = []
        self._current_app: Optional[ChessApp] = None

    @property
    def current_app(self) -> ChessApp:
        app = self._current_app
        assert app is not None
        return app


class BaseRequest(Request):

    def __init__(self, *args, **kwargs) -> None:
        super(BaseRequest, self).__init__(*args, **kwargs)
        self.player: Optional[Player] = None
        self._match_info: Optional[BaseUrlMappingMatchInfo] = None

    @property
    def app(self) -> ChessApp:
        """Application instance."""
        match_info = self._match_info
        assert match_info is not None
        return match_info.current_app


class BaseView(View):

    def __init__(self, request: BaseRequest) -> None:
        super().__init__(request)
        self._request: BaseRequest = request

    @property
    def request(self) -> BaseRequest:
        return self._request
