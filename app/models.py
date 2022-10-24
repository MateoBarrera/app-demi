from cv2 import imwrite
from flask_login import UserMixin
from flask import current_app as app
import numpy as np
import cv2


class UserData:
    def __init__(self, user_login, user_data, est):
        self.id = user_login['idlogin']
        self.usuario = user_login['usuario']
        self.contraseña = user_login['contraseña']
        if est:
            self.id_table = user_data['idestudiantes']
            self.nombre = user_data['estudiante']
            self.identificacion = user_data['identificacion']
            if user_data['imagen'] is not None:
                nparr = np.fromstring(user_data['imagen'], np.uint8)
                self.imagen = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                imwrite('app/static/images/userImage.jpg', self.imagen)
            else:
                self.imagen = None
            self.fecha_nac = user_data['fecha_nacimiento']
            self.grado = user_data['grado']
            self.institucion = user_data['institucion']
            self.cargo = None
            self.rol = 'est'
        else:
            self.id_table = user_data['idusuarios']
            self.nombre = user_data['nombre']
            self.identificacion = user_data['identificacion']
            if user_data['imagen'] is not None:
                nparr = np.fromstring(user_data['imagen'], np.uint8)
                self.imagen = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                imwrite('app/static/images/userImage.jpg', self.imagen)
            else:
                self.imagen = None
            self.fecha_nac = None
            self.grado = None
            self.institucion = None
            self.cargo = user_data['cargo']
            self.rol = 'inv/doc'
class UserModel(UserMixin):
    def __init__(self, user_data):
        self.id = user_data.usuario
        self.usuario = user_data.usuario
        self.contraseña = user_data.contraseña
        self.id_table = user_data.id_table
        self.nombre = user_data.nombre
        self.identificacion = user_data.identificacion
        self.imagen = user_data.imagen
        self.fecha_nac = user_data.fecha_nac
        self.grado = user_data.grado
        self.institucion = user_data.institucion
        self.cargo = user_data.cargo
        self.rol = user_data.rol

    @staticmethod
    def query(user_id):
        user_login = app.mysql_object.get_user(user_id)
        if user_login:
            user_login = user_login[0]
            user_data, est = (app.mysql_object.get_user_data(
                user_id=user_login['idlogin'], rol=user_login['rol']))
            user_data = UserData(user_login, user_data, est)
            return UserModel(user_data)
        else:
            return None

class SessionData():
    def __init__(self):
        self.id_sesion = None
        self.id_usuario = None
        self.id_estudiante = None
        self.session_token = None
        self.nombre = None
        self.identificacion = None
        self.institucion = None
        self.grado = None
        self.est_image = None
        self.docente = None
        self.fecha = None
        self.evaluacion = {
            'ev_ini_doc': 'None doc',
            'ev_ini_herr' : 'None herr',
            'ev_ini_est' : 'None est',
            'ev_fin_herr' : 'None herr 2',
            'ev_fin_est' : 'None est 2',
            'ev_fin_doc' : 'None doc 2'
        }
        self.conteo_inicial = list()
        self.response_labels ={
            'inicial' : list(),
            'final' : list()

        }
        self.conteo_final = list()
        self.response_preds = {
            'inicial' : list(),
            'final' : list()

        }
        self.images = {
            'inicial': list(),
            'final': list()
        }
        self.observaciones = None
        self.cuestionario = None
