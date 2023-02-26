"""Demi App

crate_app method allows the initialization of the server configuration parameters.

@Author: Mateo Barrera
@Date: 12-07-2022  
"""
from flask.app import Flask  # pylint: disable=import-error
from .config import Config
from .auth import auth
from flask_login import LoginManager  # pylint: disable=import-error
from flask_mail import Mail  # pylint: disable=import-error
from .models import UserModel
from flask_socketio import SocketIO  # pylint: disable=import-error
from flaskext.mysql import MySQL  # pylint: disable=import-error
# from flask_talisman import Talisman


mysql_init = MySQL()

mail = Mail()
# socketio = SocketIO(async_mode='eventlet')
socketio = SocketIO()


login_manager = LoginManager()
login_manager.login_view = 'auth.login'
login_manager.login_message = 'Debes iniciar sesión para acceder a esta función.'


@login_manager.user_loader
def load_user(username):
    """User session manager.

    Args:
        username (str): login form username value.

    Returns:
        UserModel: UserModel data class.
    """
    return UserModel.query(username)


def create_app():
    """Application server Constructor.

    Returns:
        Flask.app: Server flask object.
    """
    from .script import script
    app = Flask(__name__)
    app.config.from_object(Config)
    login_manager.init_app(app)
    mail = Mail(app)
    app.register_blueprint(auth)
    app.register_blueprint(script)
    # Talisman(app)
    socketio.init_app(app)
    mysql_init.init_app(app)
    return app, socketio, mysql_init
