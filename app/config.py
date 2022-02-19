class Config:
    SECRET_KEY = 'SUPER SECRET'

    ##DATA BASE https://www.freemysqlhosting.net/account/##


    """     MYSQL_DATABASE_HOST = 'sql5.freemysqlhosting.net'
    MYSQL_DATABASE_USER = 'sql5464955'
    MYSQL_DATABASE_PASSWORD = 'RbXhEAtUaq'
    MYSQL_DATABASE_DB = 'sql5464955' """

    # ClearDB
    MYSQL_DATABASE_HOST = 'us-cdbr-east-05.cleardb.net'
    MYSQL_DATABASE_USER = 'be85830ca83202'
    MYSQL_DATABASE_PASSWORD = '80e8cffe'
    MYSQL_DATABASE_DB = 'heroku_6714a6b1d39c19d'

    # LOCAL HOST#3
    """     MYSQL_DATABASE_HOST = 'localhost'
        MYSQL_DATABASE_USER = 'root'
        MYSQL_DATABASE_PASSWORD = 'Flask_APP/54'
        MYSQL_DATABASE_DB = 'webapp' """

    ##MAIL CONFIG##
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'web.noreply.app@gmail.com'
    MAIL_DEFAULT_SENDER = 'web.noreply.app@gmail.com'
    MAIL_PASSWORD = 'Flask_APP/54'
