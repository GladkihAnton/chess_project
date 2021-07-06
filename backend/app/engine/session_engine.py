import uuid

from app.model.session import Session, SessionDto


class SessionEngine:

    def __init__(self, session):
        self.session = session

    @staticmethod
    def create_session(chess_app) -> Session:
        result = Session(SessionDto(
            session_id=uuid.uuid4().hex
        ))
        result.engine = SessionEngine(result)

        chess_app.session_id_to_session[result.session_id] = result

        # сделать в другом потоке
        result.store()

        return result
