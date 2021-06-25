from sqlalchemy import Table, MetaData, Column, Integer, VARCHAR, create_engine
from sqlalchemy.engine import Engine, Connection


engine: Engine = create_engine('sqlite:////Users/antongladkih/Documents/workdir/chess_project/backend/identifier.sqlite')


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
        Column('password', VARCHAR(32)),
    )
]
