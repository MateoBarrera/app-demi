"""Main file

This module includes all the main dependencies and methods for handling HTTP requests for DEMI. 

@Author: Mateo Barrera
@Date: 12-07-2022  
"""
from flask import request, render_template, redirect, make_response, url_for, session, Response, flash, current_app as app  # pylint: disable=import-error
from . import script
from flask_login import login_required, login_user, logout_user  # pylint: disable=import-error
from imageio import imread  # pylint: disable=import-error
from flask_socketio import SocketIO, emit, send  # pylint: disable=import-error
import numpy as np
import base64
import cv2  # pylint: disable=import-error
from flask_login import login_required, current_user  # pylint: disable=import-error
from app.webcam_web import frames, endframes  # pylint: disable=import-error
from app.forms import CuestionarioForm, ConclusionesForm
from .. import socketio
import operator
from flask_socketio import join_room, leave_room  # pylint: disable=import-error
import secure  # pylint: disable=import-error

secure_headers = secure.Secure()


@script.after_request
def set_secure_headers(response):
    """_summary_

    Args:
        response (_type_): _description_

    Returns:
        _type_: _description_
    """
    secure_headers.framework.flask(response)
    return response


@socketio.on('virtual_status', namespace='/admin-info')
def on_virtual_status(data):
    """_summary_

    Args:
        data (_type_): _description_
    """
    session['admin_room'] = data['admin_id']
    emit('virtual_status', data['info'], room=data['admin_id'])


@socketio.on('join')
def on_join(data):
    """_summary_

    Args:
        data (_type_): _description_
    """
    print('DATA')
    print(data)
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)


@socketio.on('leave')
def on_leave(data):
    """_summary_

    Args:
        data (_type_): _description_
    """
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)


@socketio.on('connect')
def test_connect():
    """_summary_
    """
    app.logger.info('Client connected')


@socketio.on('image_ev')
def image(data_image, stage):
    """_summary_

    Args:
        data_image (_type_): _description_
        stage (_type_): _description_
    """
    # print('Recibiendo solicitud')
    image_raw = base64.b64decode(
        data_image.replace('data:image/jpeg;base64,', ''))
    image_raw = imread(image_raw, pilmode='RGB')
    cv2_img = cv2.cvtColor(np.array(image_raw), cv2.COLOR_RGB2BGR)
    cv2_img_raw, cv2_img_response, response_label, preds = frames(cv2_img)

    # base64 encode
    retval, buffer = cv2.imencode('.jpg', cv2_img_response)

    b = base64.b64encode(buffer)
    b = b.decode()
    image_data = 'data:image/jpeg;base64,' + b

    if session['admin_room']:
        print('########################Enviando Imagen')
        emit('admin_image', image_data,
             room=session['admin_room'], namespace='/admin-info')
        emit('admin_label', response_label,
             room=session['admin_room'], namespace='/admin-info')

    is_success, im_buf_arr = cv2.imencode(".jpg", cv2_img_response)
    byte_im = im_buf_arr.tostring()
    is_success, im_buf_arr = cv2.imencode(".jpg", cv2_img_raw)
    byte_im_raw = im_buf_arr.tostring()
    preds = np.around(preds, 4)
    str_stage = 'inicial' if stage == 1 else 'final'
    try:
        app.session_object['{}'.format(
            session['session_token'])].images[str_stage].append([byte_im_raw, byte_im, preds[0], preds[1], preds[2], preds[3], preds[4]])
        app.session_object['{}'.format(
            session['session_token'])].response_labels[str_stage].append(response_label)
    except:
        response_label = 'Sin datos de cámara'

    emit('response_label', response_label)


@script.route('/socket', methods=['GET', 'POST'])
def receiber():
    """_summary_

    Returns:
        _type_: _description_
    """
    context = {
        'user': 'user'
    }
    print("#################OSSOCJE")
    return render_template('sockect_hard.html', **context)


@script.route('/ventana-carga/token=<token>', methods=['GET', 'POST'])
def ventana_carga(token):
    """_summary_

    Args:
        token (_type_): _description_

    Returns:
        _type_: _description_
    """
    param = request.args.get('virtual', 'False')
    print("Respuesta: {}".format(param))
    print("Respuesta format: {}".format(type(param)))
    context = {
        'etapa': 'Evaluación inicial',
        'token': token
    }
    return render_template('ventana_carga.html', **context)


@script.route('/evaluacion/token=<token>/stage=<int:stage>', methods=['GET', 'POST'])
def evaluacion(token, stage):
    """_summary_

    Args:
        token (_type_): _description_
        stage (_type_): _description_

    Returns:
        _type_: _description_
    """
    session['virtual'] = request.args.get('virtual', 'False')
    session['admin_id'] = None

    requestUrl = request.url
    print(requestUrl)
    url_backup = requestUrl
    session['url_backup'] = url_backup

    if session['virtual'] == 'True':
        stage = request.args.get('stage', 'False')
        session['session_token'] = ('{}'.format(
            request.args.get('id', 'False'))).replace("'", "")
        session['admin_id'] = request.args.get('admin_id', 'False')

    if stage == 1:
        context = {
            'etapa': 'Evaluación inicial',
            'mensaje': '¿Como te sientes hoy?',
            'virtual': session['virtual'],
            'admin_id': session['admin_id'],
            'token': token,
            'stage': stage,
        }
        return render_template('evaluacion.html', **context)
    elif stage == 2:
        return make_response(redirect(url_for('script.stage', token=token, stage=2)))
    elif stage == 3:
        context = {
            'etapa': 'Evaluación final',
            'mensaje': '¿Como te sientes ahora?',
            'virtual': session['virtual'],
            'admin_id': session['admin_id'],
            'token': token,
            'stage': stage,
        }

        return render_template('evaluacion.html', **context)
    else:
        return make_response(redirect(url_for('iniciar_terapia')))


@script.route('/ventana-espera/token=<token>/stage=<int:stage>', methods=['GET', 'POST'])
def ventana_espera(token, stage):
    """_summary_

    Args:
        token (_type_): _description_
        stage (_type_): _description_

    Returns:
        _type_: _description_
    """
    if stage == 1:
        context = {
            'etapa': 'Evaluación inicial',
            'token': token,
            'stage': stage,
            'student': app.session_object[token].nombre
        }
    else:
        context = {
            'etapa': 'Evaluación final',
            'token': token,
            'stage': stage,
            'student': app.session_object[token].nombre
        }

    return render_template('ventana_carga.html', **context)


@script.route('/final-evaluacion//token=<token>/stage=<int:stage>/<ev_est>/<virtual>', methods=['GET', 'POST'])
def final_evaluacion(token, stage, ev_est, virtual):
    """_summary_

    Args:
        token (_type_): _description_
        stage (_type_): _description_
        ev_est (_type_): _description_
        virtual (_type_): _description_

    Returns:
        _type_: _description_
    """
    key = token
    if stage == 1:
        try:
            labels_list = app.session_object[key].response_labels['inicial']
            count_dict = {i: labels_list.count(i) for i in labels_list}
            print(f'Conteos {count_dict}')
            app.session_object[key].conteo_inicial = count_dict
            app.session_object[key].evaluacion['ev_ini_herr'] = max(
                count_dict.items(), key=operator.itemgetter(1))[0]
            app.session_object[key].evaluacion['ev_ini_est'] = ev_est
            # print('MAX {}'.format(app.session_object['{}'.format(session['session_token'])].evaluacion['ev_ini_herr']))
            app.session_object[key].stage = 'final'
            # response = make_response(redirect(url_for('script.ventana_espera')))

            response = make_response(
                redirect(url_for('script.stage', token=token, stage=2)))
        except Exception:
            response = make_response(redirect(url_for('script.error')))
            return response
    else:
        try:
            labels_list = app.session_object[key].response_labels['final']
            count_dict = {i: labels_list.count(i) for i in labels_list}
            app.session_object[key].evaluacion['ev_fin_herr'] = max(
                count_dict.items(), key=operator.itemgetter(1))[0]
            app.session_object[key].evaluacion['ev_fin_est'] = ev_est
            app.session_object[key].conteo_final = count_dict
            # print('MAX {}'.format(app.session_object[key].evaluacion['ev_fin_herr']))
            print(f'Conteos {count_dict}')
            response = make_response(
                redirect(url_for('script.cuestionario', token=token)))
            # response = make_response(redirect(url_for('script.stage',stage=3)))
        except Exception:
            response = make_response(redirect(url_for('script.error')))
            return response

    if virtual == 'True':
        return render_template('virtual/close_tab.html')
    return response


@script.route('/cuestionario/token=<token>', methods=['GET', 'POST'])
def cuestionario(token):
    """_summary_

    Args:
        token (_type_): _description_

    Returns:
        _type_: _description_
    """
    cuestionario_form = CuestionarioForm()
    context = {
        'etapa': 'Evaluación inicial',
        'mensaje': '¿Como te sientes hoy?',
        'cuestionario_form': cuestionario_form,
        'token': token,
        'student': app.session_object[token].nombre
    }
    if cuestionario_form.validate_on_submit():
        return redirect(url_for('script.conclusion', token=token))

    return render_template('cuestionario.html', **context)


@script.route('/conclusion/token=<token>', methods=['GET', 'POST'])
def conclusion(token):
    """_summary_

    Args:
        token (_type_): _description_

    Returns:
        _type_: _description_
    """
    session['session_token'] = token
    key = token
    ev_ini_doc = app.session_object[key].evaluacion['ev_ini_doc']
    ev_ini_herr = app.session_object[key].evaluacion['ev_ini_herr']
    ev_ini_est = app.session_object[key].evaluacion['ev_ini_est']
    ev_fin_herr = app.session_object[key].evaluacion['ev_fin_herr']
    ev_fin_est = app.session_object[key].evaluacion['ev_fin_est']
    conteo_inicial = app.session_object[key].conteo_inicial
    preds_inicial = {
        '0': list(),
        '1': list(),
        '2': list(),
        '3': list(),
        '4': list(),
    }
    for preds in app.session_object[key].images['inicial']:
        preds_inicial['0'].append(preds[2])
        preds_inicial['1'].append(preds[3])
        preds_inicial['2'].append(preds[4])
        preds_inicial['3'].append(preds[5])
        preds_inicial['4'].append(preds[6])
    # print('#####Preds desde images###############')
    # print(preds_inicial)
    conteo_final = app.session_object[key].conteo_final
    preds_final = {
        '0': list(),
        '1': list(),
        '2': list(),
        '3': list(),
        '4': list(),
    }
    for preds in app.session_object[key].images['final']:
        preds_final['0'].append(preds[2])
        preds_final['1'].append(preds[3])
        preds_final['2'].append(preds[4])
        preds_final['3'].append(preds[5])
        preds_final['4'].append(preds[6])
    # print('#####Preds Final desde images###############')
    # print(preds_final)
    conclusiones_form = ConclusionesForm()
    context = {
        'ev_ini_doc': ev_ini_doc,
        'ev_ini_herr': ev_ini_herr,
        'ev_ini_est': ev_ini_est,
        'ev_fin_herr': ev_fin_herr,
        'ev_fin_est': ev_fin_est,
        'conteo_inicial': conteo_inicial,
        'conteo_final': conteo_final,
        'preds_inicial': preds_inicial,
        'preds_final': preds_final,
        'conclusion_form': conclusiones_form,
        'token': token,
        'student': app.session_object[token].nombre
    }
    if conclusiones_form.validate_on_submit():
        app.session_object[f"{session['session_token']}"].evaluacion['ev_fin_doc'] = dict(
            conclusiones_form.emocion_percibida.choices).get(
            conclusiones_form.emocion_percibida.data)
        app.session_object[f"{session['session_token']}"].observaciones = conclusiones_form.observacion.data
        return redirect(url_for('script.guardar', token=token))

    return render_template('conclusion.html', **context)


@script.route('/conclusion/guardando/token=<token>', methods=['GET', 'POST'])
def guardar(token):
    """_summary_

    Args:
        token (_type_): _description_

    Returns:
        _type_: _description_
    """
    key = token
    # .id_session = app.mysql_object.create_session(app.session_object['{}'.format(session['session_token'])])
    session_data = app.session_object[key]
    session_data.id_session = app.mysql_object.create_session(
        app.session_object[key])
    print("####################### SAVE DATA #########################")
    print(session_data)
    app.mysql_object.save_session(session_data)
    app.session_object.pop(key)
    session.pop('session_token')
    session['prev_session'] = False
    return redirect(url_for('inicio'))


@script.route('/index_r')
def endwc():
    """_summary_

    Returns:
        _type_: _description_
    """
    response = make_response(redirect('/inicio'))
    return response  # , Response=(endframes()))


@script.route('/panel-virtual', methods=['GET', 'POST'])
def panel_virtual():
    """_summary_

    Returns:
        _type_: _description_
    """
    key = f"{session['session_token']}"
    student_data = app.session_object[key]
    request_url = request.url
    request_url = request_url.replace("http", "https")
    request_url = request_url.split("panel-virtual")

    url_1 = request_url[0]+f"evaluacion?virtual=True&stage=inicial&id='{key}'"
    url_2 = request_url[0]+f"evaluacion?virtual=True&stage=final&id='{key}'"
    context = {
        'student': student_data,
        'url_inicial': url_1,
        'url_final': url_2,
        'key': key,
        'student_image': student_data.est_image
    }
    if request.method == 'POST':
        return make_response(redirect(url_for('script.cuestionario')))

    return render_template('virtual/admin_session.html', **context)


@script.route('/internal-error', methods=['GET', 'POST'])
def error():
    """_summary_

    Returns:
        _type_: _description_
    """
    flash('Ups! el reconocimiento fallo, intentando nuevamente', 'error')
    response = make_response(redirect(session['url_backup']))
    return response


@script.route('/desarrollo/token=<token>/stage=<int:stage>', methods=['GET', 'POST'])
def stage(token, stage):
    """_summary_

    Args:
        token (_type_): _description_
        stage (_type_): _description_

    Returns:
        _type_: _description_
    """
    session['session_token'] = token

    context = {
        'actual_stage': stage,
        'token': token,
        'student': app.session_object[token].nombre
    }
    return render_template('stage.html', **context)
