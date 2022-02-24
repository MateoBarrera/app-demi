# Comentario para git
import unittest
import os
import datetime as Datetime
import secrets
from datetime import datetime
import cv2
from flask import Flask, request, current_app, Response, make_response, render_template, redirect, session, url_for, flash
from app import create_app
from app.forms import TodoForms, DeleteTodoForm, UpdateTodo, TerapiaForm, ConclusionesForm, CuestionarioForm, ContactoForm, SignupEstForm, SignupForm
#from app.firestore_service import get_users, get_todos, put_todo, delete_todo, update_todo
from flask_login import login_required, current_user
from app.email import send_email
from app.mysql import MySQL_connector
from werkzeug.security import generate_password_hash
from werkzeug.utils import secure_filename


from app.models import UserData, SessionData


app, socketio, mysql_init = create_app()

app.mysql_object = MySQL_connector(mysql_init)
app.session_object = dict()


@app.cli.command()
def test():
    tests = unittest.TestLoader().discover('test')
    unittest.TextTestRunner().run(tests)


@app.errorhandler(404)
def not_found(error):
    return render_template('error/404.html', error=error)


@app.route('/')
def index():
    user_ip = request.remote_addr
    response = make_response(redirect('/inicio'))
    session['user_ip'] = user_ip
    return response


@app.route('/hello', methods=['GET', 'POST'])
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
    return redirect(url_for('hello'))


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
    print("Anonymous {}".format(context['anonymous']))

    if request.method == 'POST':
        if contacto_form.validate() == False:
            print('All fields are required.')
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

    user_ip = session.get('user_ip')
    username = current_user.id
    students = app.mysql_object.get_all_students()
    terapia_form = TerapiaForm()
    context = {
        'students': students,
        'rol': current_user.rol,
        'data': current_user,
        'user_ip': user_ip,
        'username': username,
        'terapia_form': terapia_form,
    }
    # Terapia presencial
    if terapia_form.validate_on_submit() and (current_user.rol == 'inv/doc'):
        session['session_token'] = secrets.token_urlsafe(16)
        session['stage'] = 'inicial'

        key = '{}'.format(session['session_token'])
        print("token")
        print(session['session_token'])
        app.session_object[key] = SessionData()
        app.session_object[key].fecha = datetime.now().strftime(
            '%Y-%m-%d %H:%M:%S')
        app.session_object[key].evaluacion['ev_ini_doc'] = dict(terapia_form.emocion_percibida.
                                                                choices).get(
            terapia_form.emocion_percibida.data)
        app.session_object[key].id_usuario = app.mysql_object.get_user(
            session['username'])[0]['idlogin']
        app.session_object[key].id_estudiante = app.mysql_object.get_student(
            terapia_form.identificacion_form.data)[0]
        app.session_object[key].nombre = terapia_form.nombre_form.data
        app.session_object[key].identificacion = terapia_form.identificacion_form.data
        app.session_object[key].institucion = request.form['text_inst']
        app.session_object[key].grado = request.form['text_grado']
        app.session_object[key].docente = current_user.nombre
        if app.mysql_object.get_student_image(app.session_object[key].id_estudiante):
            app.session_object[key].est_image = url_for(
                'static', filename='/images/estImage.jpg')
        else:
            app.session_object[key].est_image = url_for(
                'static', filename='/images/avatar.jpg')

        if terapia_form.virtual.data:
            return redirect(url_for('script.panel_virtual'))
        else:
            return redirect(url_for('script.ventana_carga'))

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
                uploaded_file = request.files['imagen']
                imagen = None
                if uploaded_file.filename != '':
                    uploaded_file.save('userImage.jpg')
                    imagen = cv2.imread('userImage.jpg')
                anotacion = estudiante_form.anotaciones.data
                user_new = user_new[0]
                app.mysql_object.set_student_data(
                    user_new['idlogin'], nombre, identificacion, nacimiento, grado, institucion, anotacion, imagen)
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
def consulta():
    contacto_form = ContactoForm()
    user_ip = session.get('user_ip')
    student_data = dict()
    img = url_for('static', filename='/images/user.jpg')
    events = list()
    all_users = app.mysql_object.get_all_users()

    all_students = app.mysql_object.get_all_students()
    all_sessions = app.mysql_object.get_all_session_info()
    recent_sessions = list()
    now = datetime.now()
    for item in all_sessions:

        aux_day = item['fecha'].split(" ", 1)
        item['fecha'] = "{}".format(aux_day[0])
        item['hora'] = "{}".format(aux_day[1])
        events.append({'todo': 'Sesión {}'.format(
            item['idsesiones']), 'date': item['fecha'], 'hora_1': item['hora']})
        if now-datetime.strptime(item['fecha'], '%Y-%m-%d') < Datetime.timedelta(days=5):
            recent_sessions.append(item)
    print(events)

    context = {
        'contacto_form': contacto_form,
        'student_data': student_data,
        'user_ip': user_ip,
        'user_img': img,
        'events': events,
        'all_users': all_users,
        'all_students': all_students,
        'all_sessions': all_sessions,
        'recent_sessions': recent_sessions
    }

    return render_template('consulta.html', **context)


@app.route('/test', methods=['GET', 'POST'])
def test():
    context = {

    }
    return render_template('virtual/admin_session.html', **context)


if __name__ == '__main__':
    app.run(debug=True)
    #socketio.run(app, host='0.0.0.0', debug=True)
