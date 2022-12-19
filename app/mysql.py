import json
import base64
from traceback import print_tb
from unittest import result
import cv2
import numpy as np


class MySQL_connector():
    def __init__(self, mysql_init):
        super().__init__()

        self.mysql_init = mysql_init

    def get_user(self, user):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT *  FROM login WHERE usuario = '{user}';"
        cursor.execute(sql)
        user_login = dict()
        columns = [col[0] for col in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return rows

    def get_user_data(self, user_id, rol):
        if rol == 1:
            sql = f"SELECT * FROM usuarios WHERE idlogin = '{(user_id)}';"
            est = False
        else:
            sql = f"SELECT * FROM estudiantes WHERE idlogin = '{(user_id)}';"
            est = True

        try:
            conn = self.mysql_init.connect()
            cursor = conn.cursor()
            cursor.execute(sql)
            columns = [col[0] for col in cursor.description]
            rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
            conn.close()
            return rows[0], est
        except:
            return None, est

    def set_user(self, usuario, contraseña, rol):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = "INSERT INTO login (usuario, contraseña, rol) VALUES (%s, %s, %s);"
        val = (usuario, contraseña, rol)
        cursor.execute(sql, val)
        conn.commit()

        sql = f"SELECT * FROM login WHERE usuario = '{usuario}';"
        cursor.execute(sql)
        columns = [col[0] for col in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return rows

    def set_student(self, identificacion, contraseña):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = "INSERT INTO login (usuario, contraseña, rol) VALUES (%s, %s, %s);"
        val = (identificacion, contraseña, 2)
        cursor.execute(sql, val)
        conn.commit()

        sql = f"SELECT * FROM login WHERE usuario = '{identificacion}';"
        cursor.execute(sql)
        columns = [col[0] for col in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return rows

    def set_user_data(self, idlogin, cargo, docente=None, imagen=None, identificacion=None):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = "INSERT INTO usuarios (docente, identificacion, cargo, imagen, idlogin) VALUES (%s, %s, %s, %s, %s);"
        val = (docente, identificacion, cargo, imagen, idlogin)
        cursor.execute(sql, val)
        conn.commit()
        conn.close()

    def set_student_data(self, id_login, docente, identificacion, nacimiento, grado, institucion, anotacion, imagen=None):
        byte_im = None
        if imagen is not None:
            is_success, im_buf_arr = cv2.imencode(".jpg", imagen)
            byte_im = im_buf_arr.tostring()
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = "INSERT INTO estudiantes (estudiante, identificacion, fecha_nacimiento, grado, institucion, imagen, idlogin, anotacion) VALUES (%s, %s, %s, %s, %s ,%s ,%s, %s);"
        val = (docente, identificacion, nacimiento,
               grado, institucion, byte_im, id_login, anotacion)
        cursor.execute(sql, val)
        conn.commit()
        conn.close()

    def get_student(self, student):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT idestudiantes  FROM estudiantes WHERE identificacion = '{(student)}';"
        cursor.execute(sql)
        result = cursor.fetchall()
        conn.close()
        return result[0]

    def get_all_users(self):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT docente, cargo FROM usuarios;"
        cursor.execute(sql)
        user_login = dict()
        columns = [col[0] for col in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return rows

    def get_all_students(self):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT estudiante, fecha_nacimiento, institucion, identificacion, grado  FROM estudiantes;"
        cursor.execute(sql)
        columns = [col[0] for col in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return rows

    def get_all_doc_students(self, id_usuarios):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT DISTINCT estudiantes.estudiante, estudiantes.fecha_nacimiento, estudiantes.institucion, estudiantes.identificacion, estudiantes.grado  FROM estudiantes JOIN sesion ON estudiantes.idestudiantes = sesion.idestudiantes WHERE sesion.idusuarios = '{id_usuarios}';"
        cursor.execute(sql)
        columns = [col[0] for col in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return rows
    
    def get_student_image(self, id_student):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT imagen  FROM estudiantes WHERE idestudiantes = '{id_student}';"
        cursor.execute(sql)
        result = cursor.fetchone()
        conn.close()
        if result[0] is not None:
            nparr = np.fromstring(result[0], np.uint8)
            imagen = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            cv2.imwrite('app/static/images/estImage.jpg', imagen)
            return True
        else:
            return False

    def get_all_session_info(self):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT sesion.idsesiones, usuarios.docente, estudiantes.estudiante, sesion.tema, sesion.fecha FROM sesion JOIN usuarios ON usuarios.idusuarios= sesion.idusuarios JOIN estudiantes ON estudiantes.idestudiantes = sesion.idestudiantes;"
        cursor.execute(sql)
        columns = [col[0] for col in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return rows

    def get_all_doc_session_info(self, id_usuarios):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT sesion.idsesiones, usuarios.docente, estudiantes.estudiante, sesion.tema, sesion.fecha FROM sesion JOIN usuarios ON usuarios.idusuarios= sesion.idusuarios JOIN estudiantes ON estudiantes.idestudiantes = sesion.idestudiantes WHERE sesion.idusuarios = '{id_usuarios}';"
        cursor.execute(sql)
        columns = [col[0] for col in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return rows

    def get_all_session_ev(self):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT sesion.idsesiones, sesion.ev_ini_doc, sesion.ev_ini_est, sesion.ev_ini_herr, sesion.ev_fin_doc, sesion.ev_fin_est, sesion.ev_fin_herr, sesion.observaciones FROM sesion JOIN usuarios ON usuarios.idusuarios= sesion.idusuarios JOIN estudiantes ON estudiantes.idestudiantes = sesion.idestudiantes;"

        """         sql = f"SELECT sesion.idsesiones, sesion.ev_ini_doc, sesion.ev_ini_est, sesion.ev_ini_herr_pred, sesion.ev_fin_doc, sesion.ev_fin_est, sesion.ev_fin_herr_pred, sesion.observaciones FROM sesion JOIN usuarios ON usuarios.idusuarios= sesion.idusuarios JOIN estudiantes ON estudiantes.idestudiantes = sesion.idestudiantes;" """
        cursor.execute(sql)
        user_login = dict()
        #columns = [col[0] for col in cursor.description]
        columns = ['Sesión', 'Inicial Docente', 'Inicial Estudiante', 'Inicial Herramienta','Final Docente', 'Final Estudiante', 'Final Herramienta', 'Observaciones']
        #print("###############################################")
        #print(columns)
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return rows

    def get_all_doc_session_ev(self, id_usuarios):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT sesion.idsesiones, sesion.ev_ini_doc, sesion.ev_ini_est, sesion.ev_ini_herr, sesion.ev_fin_doc, sesion.ev_fin_est, sesion.ev_fin_herr, sesion.observaciones FROM sesion JOIN usuarios ON usuarios.idusuarios= sesion.idusuarios JOIN estudiantes ON estudiantes.idestudiantes = sesion.idestudiantes WHERE sesion.idusuarios = '{id_usuarios}';"

        cursor.execute(sql)
        user_login = dict()
        columns = ['Sesión', 'Inicial Docente', 'Inicial Estudiante', 'Inicial Herramienta',
                   'Final Docente', 'Final Estudiante', 'Final Herramienta', 'Observaciones']
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return rows

    def get_all_session_prob(self):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT sesion.idsesiones, sesion.conteo_inicial, sesion.conteo_final FROM sesion;"
        cursor.execute(sql)
        columns = ['Sesión', 'conteo_inicial', 'conteo_final']
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        for row in rows:
            row['conteo_inicial'] = eval(row['conteo_inicial'])
            row['conteo_final'] = eval(row['conteo_final'])
        conn.close()
        return rows

    def get_all_doc_session_prob(self, id_usuarios):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT sesion.idsesiones, sesion.conteo_inicial, sesion.conteo_final FROM sesion WHERE idusuarios = '{id_usuarios}';"
        cursor.execute(sql)
        columns = ['Sesión', 'conteo_inicial', 'conteo_final']
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        for row in rows:
            row['conteo_inicial'] = eval(row['conteo_inicial'])
            row['conteo_final'] = eval(row['conteo_final'])
        conn.close()
        return rows

    def create_session(self, session):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT idusuarios FROM usuarios WHERE (idlogin ='{session.id_usuario}');"
        cursor.execute(sql)
        result = cursor.fetchone()
        sql = "INSERT INTO sesion (fecha, idusuarios, idestudiantes, tema) VALUES (%s, %s, %s, %s);"
        val = (session.fecha, result[0], session.id_estudiante, session.tema)
        cursor.execute(sql, val)
        conn.commit()
        sql = f"SELECT idsesiones FROM sesion WHERE (fecha = '{session.fecha}');"
        cursor.execute(sql)
        result = cursor.fetchone()
        conn.close()
        return result[0]

    def save_session(self, session: object):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        conteo_inicial = str(session.conteo_inicial)
        conteo_final = str(session.conteo_final)

        sql = "UPDATE sesion SET ev_ini_doc = %s, ev_ini_est = %s, ev_ini_herr = %s, conteo_inicial = %s, ev_fin_doc = %s, ev_fin_est = %s, ev_fin_herr = %s, conteo_final = %s, observaciones = %s, ev_ini_herr_pred = '0', ev_fin_herr_pred = '0'  WHERE idsesiones = %s;"
        val = (session.evaluacion['ev_ini_doc'], session.evaluacion['ev_ini_est'], session.evaluacion['ev_ini_herr'], conteo_inicial,
               session.evaluacion['ev_fin_doc'], session.evaluacion['ev_fin_est'], session.evaluacion['ev_fin_herr'], conteo_final, session.observaciones, session.id_session)
        cursor.execute(sql, val)

        val = session.images['inicial']
        sql = f"Insert INTO reconocimiento (idsesiones, etapa, raw_imagen, imagen, p_enojo, p_felicidad, p_tristeza, p_sorpresa, p_neutral) VALUES ('{session.id_session}', {0}, %s, %s, %s, %s, %s, %s, %s)"
        cursor.executemany(sql, val)

        val = session.images['final']
        sql = f"Insert INTO reconocimiento (idsesiones, etapa, raw_imagen, imagen, p_enojo, p_felicidad, p_tristeza, p_sorpresa, p_neutral) VALUES ('{session.id_session}', {1}, %s, %s, %s, %s, %s, %s, %s)"
        cursor.executemany(sql, val)

        conn.commit()
        conn.close()

    def get_session(self, idsesion):
        pass
        """ for byte_im in byte_im_array:
            nparr = np.fromstring(byte_im[0], np.uint8)
            img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            registro.append(img_np) """

    def get_all_themes(self):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT DISTINCT tema  FROM sesion;"
        cursor.execute(sql)
        columns = [col[0] for col in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return rows

    def get_all_doc_themes(self, id_usuarios):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT DISTINCT tema  FROM sesion WHERE idusuarios = '{id_usuarios}';"
        cursor.execute(sql)
        columns = [col[0] for col in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return rows


    def listar_db(self):
        '''
        Metodo de conexión:
        Crear u obtiene un objeto tipo MySQLConnection de conexión a un
        servidor MySQL con el que se trabaja a lo largo de los metodos que
        ejecutan sentencias SQL.
        Retorna -
        status (Resultado de la operación) >>> True or False
        err (si aplica) >>> mysql.connector.Error
        '''
        sql = "show tables;"
        try:
            conn = self.mysql_init.connect()
            cursor = conn.cursor()
            cursor.execute(sql)
            resultado = cursor.fetchall()
            conn.close()
        except Exception as err:
            return False, err
        else:
            return resultado
