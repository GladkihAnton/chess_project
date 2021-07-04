from sqlalchemy import Table, MetaData, Column, Integer, VARCHAR, create_engine
from sqlalchemy.engine import Engine, Connection


engine: Engine = create_engine('postgresql://user:password123@127.0.0.1:5432/postgres')


def get_table(name: str) -> Table:
    for table in TABLES:
        if table.name == name:
            return table
    raise TableWasNotFound


def get_connection() -> Connection:
    return engine.connect()


class TableWasNotFound(Exception):
    pass


metadata = MetaData()

TABLES = [
    Table(
        'player', metadata,
        Column('id', Integer, primary_key=True),
        Column('email', VARCHAR(256), key='email'),
        Column('password', VARCHAR(32))
    ),

    Table(
        'session', metadata,
        Column('session_id', VARCHAR(32), primary_key=True)
    ),

    Table(
        'jwt_token', metadata,
        Column('id', Integer, primary_key=True),
        Column('access_token', VARCHAR(256)),
        Column('refresh_token', VARCHAR(256)),
        Column('player_id', Integer, unique=True),
        Column('last_updated_ts', Integer)
   )
]
