from flask import request, render_template, redirect, make_response, url_for, session, Response, current_app as app
from . import script
from flask_login import login_required, login_user, logout_user
from PIL import Image
from imageio import imread
from flask_socketio import SocketIO, emit, send
from io import StringIO, BytesIO
import json
import numpy as np
import base64
import cv2
from flask_login import login_required, current_user
#from app.webcam_web import frames, endframes
from app.forms import CuestionarioForm, ConclusionesForm
from .. import socketio
import operator


from app.models import UserData, SessionData

from flask_socketio import join_room, leave_room

@socketio.on('virtual_status', namespace='/admin-info')
def on_virtual_status(data):
    emit('virtual_status', data['info'], room=data['admin_id'])

@socketio.on('join')
def on_join(data):
    print("DATA")
    print(data)
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)


@socketio.on('connect')
def test_connect():
    app.logger.info("Client connected")


@socketio.on('image_ev')
def image(data_image):
    print("Recibiendo solicitud")
    image = base64.b64decode(data_image.replace("data:image/jpeg;base64,", ""))
    image = imread(image, pilmode="RGB")
    cv2_img = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    cv2_img_raw, cv2_img_response, response_label, preds = frames(cv2_img)

    # base64 encode
    #retval, buffer = cv2.imencode('.jpg', cv2_img_response)

    #b = base64.b64encode(buffer)
    #b = b.decode()
    #image_data = "data:image/jpeg;base64," + b
    #emit('response_back', image_data)

    is_success, im_buf_arr = cv2.imencode(".jpg", cv2_img_response)
    byte_im = im_buf_arr.tostring()
    is_success, im_buf_arr = cv2.imencode(".jpg", cv2_img_raw)
    byte_im_raw = im_buf_arr.tostring()
    preds = np.around(preds, 4)

    try:
        app.session_object['{}'.format(
            session['session_token'])].images[session['stage']].append([byte_im_raw, byte_im, preds[0], preds[1], preds[2], preds[3], preds[4]])
        app.session_object['{}'.format(
            session['session_token'])].response_labels[session['stage']].append(response_label)
    except:
        pass

    emit('response_label', response_label)


@script.route('/socket', methods=['GET', 'POST'])
def receiber():
    context = {
        'user': 'user'
    }
    print("#################OSSOCJE")
    return render_template('sockect_hard.html', **context)


@script.route('/ventana-carga', methods=['GET', 'POST'])
def ventana_carga():
    param = request.args.get('virtual', 'False')
    print("Respuesta: {}".format(param))
    print("Respuesta format: {}".format(type(param)))
    context = {
        'etapa': "Evaluación inicial",
    }
    return render_template('ventana_carga.html', **context)


@script.route('/evaluacion', methods=['GET', 'POST'])
def evaluacion():
    session['virtual'] = request.args.get('virtual', 'False')
    session['admin_id'] = None

    if session['virtual']=='True':
        session['stage'] = request.args.get('stage', 'False')
        print("stage "+ session['stage'])
        session['session_token'] = ('{}'.format(request.args.get('id', 'False'))).replace("'","")
        print("virtual")
        print(session['session_token'])
        session['admin_id'] = request.args.get('admin_id', 'False')
        ###TEMPORAL###
        #app.session_object[session['session_token']] = SessionData()
    print(session['session_token'])

    if session['stage'] == 'inicial':
        context = {
            'etapa': "Evaluación inicial",
            'mensaje': "¿Como te sientes hoy?",
            'virtual': session['virtual'],
            'admin_id':session['admin_id'],
            'stage': session['stage'],
            
        }
        return render_template('evaluacion.html', **context)
    elif session['stage'] == 'final':
        context = {
            'etapa': "Evaluación final",
            'mensaje': "¿Como te sientes ahora?",
            'virtual': session['virtual'],
            'admin_id': session['admin_id'],
            'stage': session['stage'],
        }
        return render_template('evaluacion.html', **context)
    else:
        return make_response(redirect(url_for('iniciar_terapia')))


@script.route('/ventana-espera', methods=['GET', 'POST'])
def ventana_espera():
    context = {
        'etapa': "Evaluación final",
    }
    return render_template('ventana_carga.html', **context)


@script.route('/final-evaluacion/<ev_est>/<virtual>', methods=['GET', 'POST'])
def final_evaluacion(ev_est, virtual):
    if session['stage'] == 'inicial':
        labels_list = app.session_object['{}'.format(
            session['session_token'])].response_labels['inicial']
        print(labels_list)
        count_dict = {i: labels_list.count(i) for i in labels_list}
        print("Conteos {}".format(count_dict))
        app.session_object['{}'.format(
            session['session_token'])].conteo_inicial = count_dict
        app.session_object['{}'.format(session['session_token'])].evaluacion['ev_ini_herr'] = max(
            count_dict.items(), key=operator.itemgetter(1))[0]
        app.session_object['{}'.format(
            session['session_token'])].evaluacion['ev_ini_est'] = ev_est
        #print("MAX {}".format(app.session_object['{}'.format(session['session_token'])].evaluacion['ev_ini_herr']))
        session['stage'] = 'final'
        response = make_response(redirect(url_for('script.ventana_espera')))

    else:
        labels_list = app.session_object['{}'.format(
            session['session_token'])].response_labels['final']
        count_dict = {i: labels_list.count(i) for i in labels_list}
        app.session_object['{}'.format(session['session_token'])].evaluacion['ev_fin_herr'] = max(
            count_dict.items(), key=operator.itemgetter(1))[0]

        app.session_object['{}'.format(
            session['session_token'])].evaluacion['ev_fin_est'] = ev_est
        app.session_object['{}'.format(
            session['session_token'])].conteo_final = count_dict
        print("MAX {}".format(app.session_object['{}'.format(
            session['session_token'])].evaluacion['ev_fin_herr']))
        print("Conteos {}".format(count_dict))

        response = make_response(redirect(url_for('script.cuestionario')))

    if virtual == 'True':
        return render_template('virtual/close_tab.html')
    return response


@script.route('/cuestionario', methods=['GET', 'POST'])
def cuestionario():
    cuestionario_form = CuestionarioForm()
    context = {

        'etapa': "Evaluación inicial",
        'mensaje': "¿Como te sientes hoy?",
        'cuestionario_form': cuestionario_form
    }
    if cuestionario_form.validate_on_submit():
        return redirect(url_for('script.conclusion'))

    return render_template('cuestionario.html', **context)


@script.route('/conclusion', methods=['GET', 'POST'])
def conclusion():
    key = '{}'.format(session['session_token'])
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
    print("#####Preds desde images###############")
    print(preds_inicial)
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
    print("#####Preds Final desde images###############")
    print(preds_final)
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
        'conclusion_form': conclusiones_form
    }
    if conclusiones_form.validate_on_submit():
        app.session_object['{}'.format(session['session_token'])].evaluacion['ev_fin_doc'] = dict(conclusiones_form.emocion_percibida.choices).get(
            conclusiones_form.emocion_percibida.data)
        app.session_object['{}'.format(
            session['session_token'])].observaciones = conclusiones_form.observacion.data
        return redirect(url_for('script.guardar'))

    return render_template('conclusion.html', **context)


@script.route('/conclusion/guardando', methods=['GET', 'POST'])
def guardar():
    app.session_object['{}'.format(session['session_token'])].id_session = app.mysql_object.create_session(
        app.session_object['{}'.format(session['session_token'])])
    session_data = app.session_object['{}'.format(session['session_token'])]
    app.mysql_object.save_session(session_data)
    print(session_data)
    return redirect(url_for('inicio'))


@script.route('/index_r')
def endwc():
    response = make_response(redirect('/inicio'))
    return response  # , Response=(endframes()))


@script.route('/panel-virtual', methods=['GET', 'POST'])
def panel_virtual():
    key = '{}'.format(session['session_token'])
    student_data = app.session_object[key]
    requestUrl = request.url
    requestUrl = requestUrl.split("panel-virtual")
    url_1 = requestUrl[0]+f"evaluacion?virtual=True&stage=inicial&id='{key}'"
    url_2 = requestUrl[0]+f"evaluacion?virtual=True&stage=final&id='{key}'"
    context = {
        'student':student_data,
        'url_inicial':url_1,
        'url_final': url_2,
        'key':key,
    }
    if request.method == 'POST':
        return make_response(redirect(url_for('script.cuestionario')))

    return render_template('virtual/admin_session.html', **context)
