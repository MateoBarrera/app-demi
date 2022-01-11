from threading import Thread
from flask import current_app, render_template, url_for
from flask_mail import Message
from app import mail



def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)


def send_email(to, context):
    app = current_app._get_current_object()
    msg = Message(context['asunto'], recipients=[to])
    msg.html = render_template('correo_contato.html', **context)
    #win_print(template='correo_contato.html', context=context, msg=msg)
    thr = Thread(target=send_async_email, args=[app, msg])
    thr.start()



def win_print(template, context, msg):
    ##Ejecutar Js para generar el pdf
    ##...
    render_template(template, **context)
    with app.open_resource("ok.pdf") as fp:
        msg.attach("ok.pdf", "application/pdf", fp.read())
    
    return msg
