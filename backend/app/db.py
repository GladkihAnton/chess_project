from sqlalchemy import Table, MetaData, Column, Integer, VARCHAR, create_engine

engine = create_engine('sqlite:////Users/antongladkih/Documents/chess-project/backend/temp.sqlite')


def get_table(name):
    for table in TABLES:
        if table.name == name:
            return table
    raise TableWasNotFound


def get_connection():
    return engine.connect()


class TableWasNotFound(Exception):
    pass


metadata = MetaData()

TABLES = [
    Table('player', metadata,
        Column('id', Integer, primary_key=True),
        Column('email', VARCHAR(256), key='email'),
        Column('password', VARCHAR(32)),
    )
]
