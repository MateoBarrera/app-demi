import unittest
import os
import secrets
from datetime import datetime, timedelta
import pytz
import cv2
from flask import Flask, request, current_app, Response, make_response, render_template, redirect, session, url_for, flash
from app import create_app
from app.forms import TodoForms, DeleteTodoForm, UpdateTodo, TerapiaForm, ConclusionesForm, CuestionarioForm, ContactoForm, SignupEstForm, SignupForm
from flask_login import login_required, current_user
from app.email import send_email
from app.mysql import MySQL_connector
from werkzeug.security import generate_password_hash
from werkzeug.utils import secure_filename
from app.models import UserData, SessionData
import secure
from werkzeug.security import generate_password_hash, check_password_hash

secure_headers = secure.Secure()
app, socketio, mysql_init = create_app()
app.mysql_object = MySQL_connector(mysql_init)
app.session_object = dict()

@app.after_request
def set_secure_headers(response):
    secure_headers.framework.flask(response)
    return response

@app.cli.command()
def test():
    tests = unittest.TestLoader().discover('test')
    unittest.TextTestRunner().run(tests)

@app.errorhandler(404)
def not_found(error):
    return render_template('error/404.html', error=error)

@app.errorhandler(500)
def not_found(error):
    return render_template('error/500.html', error=error)

@app.route('/')
def index():
    user_ip = request.remote_addr
    response = make_response(redirect('/inicio'))
    session['user_ip'] = user_ip
    return response

""" @app.route('/hello', methods=['GET', 'POST'])
@login_required
def hello():
    user_ip = session.get('user_ip')
    username = current_user.nombre  # current_user.id
    result = app.mysql_object.set_user('nombre', 'contraseña', 1)
    print("Set_user")
    print(result)
    result = app.mysql_object.get_user('nombre')
    print(result)

    todo_form = TodoForms()
    delete_form = DeleteTodoForm()
    update_form = UpdateTodo()
    context = {
        'user_ip': user_ip,
        'todos': get_todos(username),
        'username': username,
        'todo_form': todo_form,
        'delete_form': delete_form,
        'update_form': update_form
    }
    if todo_form.validate_on_submit():
        put_todo(username, todo_form.description.data)
        flash('Tarea registrada con exito.')
        return redirect(url_for('hello'))

    return render_template('hello.html', **context)

@app.route('/todos/delete/<todo_id>', methods=['POST'])
def delete(todo_id):
    user_id = current_user.id
    delete_todo(user_id, todo_id)
    return redirect(url_for('hello'))

@app.route('/todos/update/<todo_id>/<int:done>', methods=['POST'])
def update(todo_id, done): 
    user_id = current_user.id
    update_todo(user_id, todo_id, done)
    return redirect(url_for('hello'))"""

@app.route('/inicio', methods=['GET', 'POST'])
def inicio():
    user_ip = request.remote_addr
    session['user_ip'] = user_ip
    contacto_form = ContactoForm()

    if current_user.is_authenticated:
        user_ip = session.get('user_ip')
        username = current_user.id
        if current_user.imagen is None:
            img = url_for('static', filename='/images/avatar.jpg')
        else:
            img = url_for('static', filename='/images/userImage.jpg')
        context = {
            'user_ip': user_ip,
            'username': username,
            'contacto_form': contacto_form,
            'anonymous': False,
            'user_img': img
        }
    else:
        context = {
            'contacto_form': contacto_form,
            'username': "anonymous",
            'anonymous': True
        }
    print("Anonymous: {}".format(context['anonymous']))

    if request.method == 'POST':
        if contacto_form.validate() == False:
            flash('All fields are required.')
        else:
            email = contacto_form.correo.data
            contacto_context = {
                'correo': contacto_form.correo.data,
                'nombre': contacto_form.nombre.data,
                'numero': contacto_form.numero.data,
                'asunto': contacto_form.asunto.data,
                'mensaje': contacto_form.mensaje.data,
            }
            send_email(email, contacto_context)
            print(contacto_context)
            return redirect(url_for('inicio'))

    return render_template('inicio.html', **context)

@app.route('/iniciar-terapia', methods=['GET', 'POST'])
@login_required
def iniciar_terapia():
    #Inicializar el contexto de la vista con el modelo de usuario
    user = current_user
    if user.cargo == 'Investigador':
        students = app.mysql_object.get_all_students()
        all_sessions = app.mysql_object.get_all_session_ev()
    else:
        students = app.mysql_object.get_all_doc_students(user.id_table)
        all_sessions = app.mysql_object.get_all_doc_session_info(user.id_table)

    terapia_form = TerapiaForm()
    context = {
        'students': students,
        'rol': user.rol,
        'data': user,
        'username': user.id,
        'terapia_form': terapia_form,
        'all_sessions': all_sessions,
    }  
    #Check de sesiones previas
    try:
        if session['prev_session']:
            context['prev_session'] = session['prev_session']
            prev_session_data = app.session_object['{}'.format(
                session['session_token'])]
            context['prev_session_data'] = prev_session_data
            flash('Existe una sesión previa en curso')            
    except KeyError as e:
        print(e)
        session['prev_session'] = False
        
    #Gestión de los post en el formulario de iniciar terapia, reanudar o iniciar de cero
    if terapia_form.validate_on_submit() and (user.rol == 'inv/doc'):
        estudiante = terapia_form.nombre_form.data
        emocion = dict(terapia_form.emocion_percibida.choices).get(terapia_form.emocion_percibida.data)

        tema = terapia_form.tema_form.data
        identificacion = terapia_form.identificacion_form.data

        if not session['prev_session']:
            session['session_token'] = secrets.token_urlsafe(6)
        session['stage'] = 'inicial'
        key = '{}'.format(session['session_token'])
        app.session_object[key] = SessionData()
        app.session_object[key].fecha = datetime.now(pytz.timezone(app.config['TIMEZONE'])).strftime('%Y-%m-%d %H:%M:%S')
        app.session_object[key].evaluacion['ev_ini_doc'] = emocion
        app.session_object[key].id_usuario = app.mysql_object.get_user(session['username'])[0]['idlogin']
        app.session_object[key].id_estudiante = app.mysql_object.get_student(identificacion)[0]
        app.session_object[key].nombre = estudiante
        app.session_object[key].identificacion = identificacion
        app.session_object[key].institucion = request.form['text_inst']
        app.session_object[key].grado = request.form['text_grado']
        app.session_object[key].docente = user.nombre
        app.session_object[key].tema = tema

        if app.mysql_object.get_student_image(app.session_object[key].id_estudiante):
            app.session_object[key].est_image = url_for(
                'static', filename='/images/estImage.jpg')
        else:
            app.session_object[key].est_image = url_for(
                'static', filename='/images/avatar.jpg')

        session['prev_session'] = True
    
        if terapia_form.virtual.data:
            return redirect(url_for('script.panel_virtual'))
        else:
            return redirect(url_for('script.stage',stage=1))

    return render_template('terapia.html', **context)

@app.route('/registro-estudiante/<terapia>', methods=['GET', 'POST'])
@login_required
def registro_est(terapia):
    print("terapia= {}".format(terapia))
    val_est = True
    estudiante_form = SignupEstForm()
    context = {
        'estudiante_form': estudiante_form,
        'val_est': val_est,
        'redirect_terapia': terapia,
    }

    if estudiante_form.validate_on_submit():
        identificacion = estudiante_form.identificacion.data
        user = app.mysql_object.get_user(identificacion)
        if not user:
            password = estudiante_form.identificacion.data
            password_hash = generate_password_hash(password)
            user_new = app.mysql_object.set_student(
                identificacion, password_hash)
            print(user_new)
            if user_new:
                nombre = estudiante_form.nombre.data
                nacimiento = estudiante_form.nacimiento.data
                grado = estudiante_form.grado.data
                institucion = estudiante_form.institucion.data
                """                 uploaded_file = request.files['imagen']
                imagen = None
                if uploaded_file.filename != '':
                    uploaded_file.save('userImage.jpg')
                    imagen = cv2.imread('userImage.jpg') """
                anotacion = estudiante_form.anotaciones.data
                user_new = user_new[0]
                app.mysql_object.set_student_data(
                    user_new['idlogin'], nombre, identificacion, nacimiento, grado, institucion, anotacion, imagen=None)
                if terapia:
                    return redirect(url_for('iniciar_terapia'))
                else:
                    return redirect(url_for('inicio'))
        else:
            context['val_est'] = False

    return render_template('registro_est.html', **context)

@app.route('/correo', methods=['GET', 'POST'])
def correo():
    contacto_context = {
        'nombre': "Nombre",
        'numero': "315412180",
        'asunto': "Asunto Prueba",
        'correo': "correo@correo.com",
        'mensaje': "contacto_form.mensaje.data contacto_form.mensaje.data contacto_form.mensaje.data contacto_form.mensaje.data",
    }
    return render_template('correo_contato.html', **contacto_context)

@app.route('/consulta', methods=['GET', 'POST'])
@login_required
def consulta():
    contacto_form = ContactoForm()
    user = current_user
    student_data = dict()
    img = url_for('static', filename='/images/user.jpg')
    events = list()
    recent_sessions = list()

    if user.cargo == 'Investigador':
        all_users = app.mysql_object.get_all_users()
        all_students = app.mysql_object.get_all_students()
        all_sessions_info = app.mysql_object.get_all_session_info()
        all_sessions = app.mysql_object.get_all_session_ev()
        props = app.mysql_object.get_all_session_prob()

    else:
        all_users = app.mysql_object.get_all_doc_students(user.id_table)
        all_students = all_users
        all_sessions_info = app.mysql_object.get_all_doc_session_info(user.id_table)
        all_sessions = app.mysql_object.get_all_doc_session_ev(user.id_table)
        props = app.mysql_object.get_all_doc_session_prob(user.id_table)


    for item in all_sessions_info:
        aux_day = item['fecha'].split(' ', 1)
        item['fecha'] = '{}'.format(aux_day[0])
        item['hora'] = '{}'.format(aux_day[1])
        events.append({'todo': 'Sesión {}'.format(
            item['idsesiones']), 'date': item['fecha'], 'hora_1': item['hora']})
        time_session = datetime.strptime(item['fecha'], '%Y-%m-%d')
        now = datetime.now() if not time_session.tzinfo else datetime.now(time_session.tzinfo)
        if now-time_session < timedelta(days=5):
            recent_sessions.append(item)
    context = {
        'contacto_form': contacto_form,
        'student_data': student_data,
        'user_img': img,
        'events': events,
        'all_users': all_users,
        'all_students': all_students,
        'all_sessions_info': all_sessions_info,
        'all_sessions':all_sessions,
        'props':props,
        'recent_sessions': recent_sessions,
        'rol_user':user.cargo,
    }

    return render_template('consulta.html', **context)

@app.route('/test', methods=['GET', 'POST'])
def test():
    context = {

    }
    return render_template('virtual/admin_session.html', **context)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
    #socketio.run(app, host='0.0.0.0', debug=True)
