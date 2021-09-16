
from flask.app import Flask
from flask_bootstrap import Bootstrap
from .config import Config
from .auth import auth
from flask_login import LoginManager
from flask_mail import Mail
from .models import UserModel
from flask_socketio import SocketIO
from flaskext.mysql import MySQL


mysql_init = MySQL()

mail = Mail()
socketio = SocketIO()




login_manager = LoginManager()
login_manager.login_view = 'auth.login'

@login_manager.user_loader
def load_user(username):
  return UserModel.query(username)

def create_app():
  from .script import script
  app = Flask(__name__)
  bootstrap = Bootstrap(app)
  app.config.from_object(Config)
  login_manager.init_app(app)
  mail = Mail(app)
  app.register_blueprint(auth)
  app.register_blueprint(script)
  socketio.init_app(app)
  mysql_init.init_app(app)
  return app, socketio, mysql_init
