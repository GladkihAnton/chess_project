from hashlib import md5

from app.config import PASSWORD_SALT


def hash_password(password: str) -> str:
    return md5((password + PASSWORD_SALT).encode()).hexdigest()
