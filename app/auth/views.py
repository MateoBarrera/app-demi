from flask import request, render_template, redirect, flash, url_for, session, current_app as app
from . import auth
from app.forms import LoginForm, SignupForm, SignupEstForm
from app.models import UserData, UserModel, SessionData
from flask_login import login_required, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from wtforms.validators import ValidationError
import secure

secure_headers = secure.Secure()

@auth.after_request
def set_secure_headers(response):
    secure_headers.framework.flask(response)
    return response

@auth.route('/login', methods=['GET', 'POST'])
def login():
    next_view = request.args.get('next', False)
    print("NEXT            ###############  ")
    print(next_view)
    val_name = True
    val_cont = True
    login_form = LoginForm()
    context = {
        'login_form': login_form,
        'val_name': val_name,
        'val_cont': val_cont,
    }
    if login_form.validate_on_submit():
        username = login_form.nombre.data
        password = login_form.contraseña.data
        user = app.mysql_object.get_user(username)
        if user:
            user = user[0]
            password_db = user['contraseña']
            if check_password_hash(password_db, password):
                user_data, est = (app.mysql_object.get_user_data(
                    user_id=user['idlogin'], rol=user['rol']))
                user_class = UserData(user, user_data, est)
                user_model = UserModel(user_class)
                login_user(user_model)
                session['username'] = username
                session['prev_session'] = False
                session.permanent = True
                if not next_view:
                    print("11111111111111111$$$$$$$$$$$$$$$$$$")
                    return redirect(url_for('inicio'))
                print("########$$$$$$$$$$$$$$$$$$")
                return redirect(url_for('iniciar_terapia'))
            else:
                context['val_cont'] = False
        else:
            context['val_name'] = False
    #print(context['val_name'], context['val_cont'])
    return render_template('auth/login.html', **context)

@auth.route('signup', methods=['GET', 'POST'])
def signup():
    val_name = True
    signup_form = SignupForm()
    context = {
        'signup_form': signup_form,
        'val_name': val_name
    }
    if signup_form.validate_on_submit():
        username = signup_form.nombre.data
        user = app.mysql_object.get_user(username)
        if not user:
            password = signup_form.contraseña.data
            position = dict(signup_form.cargo.choices).get(
                signup_form.cargo.data)
            password_hash = generate_password_hash(password)
            user_new = app.mysql_object.set_user(username, password_hash, 1)
            print(user_new)
            if user_new:
                user_new = user_new[0]
                app.mysql_object.set_user_data(
                    user_new['idlogin'], position, docente=username, identificacion=username)
                user_data, est = (app.mysql_object.get_user_data(
                    user_id=user_new['idlogin'], rol=user_new['rol']))
                user_class = UserData(user_new, user_data, est)
                user_model = UserModel(user_class)
                print(user_model.get_id())
                login_user(user_model)
                session['username'] = username

                return redirect(url_for('inicio'))
        else:
            context['val_name'] = False

    return render_template('auth/signup.html', **context)

@auth.route('logout')
@login_required
def logout():
    logout_user()
    flash('Regresa Pronto.')
    return redirect(url_for('auth.login'))
