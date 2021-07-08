JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 60 * 15
PASSWORD_SALT = 'password_salt'
WHITE_LIST_PATHS = frozenset(['/auth/login', '/auth/signup', '/auth/logout', '/auth/refresh', '/ws/lobby'])
