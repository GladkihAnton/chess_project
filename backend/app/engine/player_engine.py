from sqlalchemy import sql, Table, select, insert
from sqlalchemy.engine import LegacyRow

from app import db
from app.model.player import Player, PlayerDto


class PlayerEngine:

    PLAYER_T = 'player'

    def __init__(self, player: Player):
        self.player = player

    @staticmethod
    def load_player_by_id(player_id: str) -> Player:
        player_t: Table = db.get_table(PlayerEngine.PLAYER_T)
        query: sql.Select = select([player_t]).where(player_t.c.id == player_id)

        with db.get_connection() as conn:
            row: LegacyRow = conn.execute(query).fetchone()

        result = Player(PlayerDto(email=row.email, player_id=player_id, password=row.password))

        result.engine = PlayerEngine(result)

        return result

    @staticmethod
    def load_player_by_email(email: str) -> Player:
        player_t: Table = db.get_table(PlayerEngine.PLAYER_T)
        query: sql.Select = select([player_t]).where(player_t.c.email == email)

        with db.get_connection() as conn:
            row = conn.execute(query).fetchone()

        if not row:
            raise UserDoesNotExist

        result = Player(PlayerDto(email=email, player_id=row.id.hex, password=row.password))

        result.engine = PlayerEngine(result)

        return result

    @staticmethod
    def create_player(email: str, password: str) -> Player:
        player_t: Table = db.get_table(PlayerEngine.PLAYER_T)
        query: sql.Insert = insert(player_t).values(password=password, email=email) \
            .returning(player_t.c.id, player_t.c.email, player_t.c.password)

        with db.get_connection() as conn:
            row: LegacyRow = conn.execute(query).fetchone()

        if not row:
            raise UserDoesNotExist

        result = Player(PlayerDto(email=email, player_id=row.id.hex, password=password))

        result.engine = PlayerEngine(result)

        return result


class UserDoesNotExist(Exception):
    pass
