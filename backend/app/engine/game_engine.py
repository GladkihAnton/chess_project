import uuid
import asyncio

from aiohttp import WSMessage
from aiohttp.web import Application

from app.model.game import Game, GameDto
from app.model.lobby import Lobby


class GameEngine:

    def __init__(self, game):
        self.game = game

    @staticmethod
    def create_new_game(lobby: Lobby) -> Game:
        result = Game(GameDto())

        result.engine = GameEngine(result)

        lobby.game = result

        return result
