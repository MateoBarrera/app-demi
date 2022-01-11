import json
import base64
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
        val = (usuario,contraseña, rol)
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

    def set_user_data(self, idlogin, cargo, nombre=None, imagen=None, identificacion=None):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = "INSERT INTO usuarios (nombre, identificacion, cargo, imagen, idlogin) VALUES (%s, %s, %s, %s, %s);"
        val = (nombre, identificacion,cargo, imagen, idlogin)
        cursor.execute(sql, val)
        conn.commit()
        conn.close()

    def set_student_data(self, id_login, nombre, identificacion, nacimiento, grado, institucion, imagen=None):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = "INSERT INTO estudiantes (nombre, identificacion, fecha_nacimiento, grado, institucion, imagen, idlogin) VALUES (%s, %s, %s, %s, %s ,%s ,%s);"
        val = (nombre, identificacion, nacimiento, grado, institucion, imagen, id_login)
        cursor.execute(sql, val)
        conn.commit()
        conn.close()

    def get_student(self, student):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT idestudiantes  FROM estudiantes WHERE estudiante= '{(student)}';"
        cursor.execute(sql)
        result = cursor.fetchall()
        conn.close()
        return result[0]

    def get_all_users(self):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT nombre, cargo FROM usuarios;"
        cursor.execute(sql)
        user_login = dict()
        columns = [col[0] for col in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return rows

    def get_all_students(self):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT estudiante, fecha_nacimiento, institucion, grado  FROM estudiantes;"
        cursor.execute(sql)
        user_login = dict()
        columns = [col[0] for col in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return rows

    def get_all_session_info(self):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = f"SELECT sesion.idsesiones,usuarios.nombre,estudiantes.estudiante,sesion.fecha FROM sesion JOIN usuarios ON usuarios.idusuarios= sesion.idusuarios JOIN estudiantes ON estudiantes.idestudiantes = sesion.idestudiantes;"
        cursor.execute(sql)
        user_login = dict()
        columns = [col[0] for col in cursor.description]
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        conn.close()
        return rows

    def create_session(self, session):
        conn = self.mysql_init.connect()
        cursor = conn.cursor()
        sql = "INSERT INTO sesion (fecha, idusuarios, idestudiantes) VALUES (%s, %s, %s);"
        val = (session.fecha, session.id_usuario, session.id_estudiante)
        print(val)
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
        conteo_inicial = json.dumps(session.conteo_inicial)
        conteo_final = json.dumps(session.conteo_final)
 
        sql = "UPDATE sesion SET ev_ini_doc = %s, ev_ini_est = %s, ev_ini_herr = %s, conteo_inicial = %s, ev_fin_doc = %s, ev_fin_est = %s, ev_fin_herr = %s, conteo_final = %s, observaciones = %s WHERE idsesiones = %s;"
        val = (session.evaluacion['ev_ini_doc'], session.evaluacion['ev_ini_est'], session.evaluacion['ev_ini_herr'], conteo_inicial,
               session.evaluacion['ev_fin_doc'], session.evaluacion['ev_fin_est'], session.evaluacion['ev_fin_herr'], conteo_final, session.observaciones, session.id_session)
        cursor.execute(sql, val)

        val = session.images['inicial']
        print(len(val))
        sql = f"Insert INTO reconocimiento (idsesiones, etapa, raw_imagen, imagen, p_enojo, p_felicidad, p_tristeza, p_sorpresa, p_neutral) VALUES ('{session.id_session}', {0}, %s, %s, %s, %s, %s, %s, %s)"
        cursor.executemany(sql, val)

        val = session.images['final']
        print(len(val))
        sql = f"Insert INTO reconocimiento (idsesiones, etapa, raw_imagen, imagen, p_enojo, p_felicidad, p_tristeza, p_sorpresa, p_neutral) VALUES ('{session.id_session}', {1}, %s, %s, %s, %s, %s, %s, %s)"
        cursor.executemany(sql, val)
        
        conn.commit()
        conn.close()

    def get_session(self,idsesion):
        pass
        """ for byte_im in byte_im_array:
            nparr = np.fromstring(byte_im[0], np.uint8)
            img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            registro.append(img_np) """


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


