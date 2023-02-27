"""Mail file

This module include methods for send mail from. 

@Author: Mateo Barrera
@Date: 12-07-2022  
"""
from threading import Thread
from flask import current_app, render_template, url_for  # pylint: disable=import-error
from flask_mail import Message  # pylint: disable=import-error
from app import mail


def send_async_email(app, msg):
    """_summary_

    Args:
        app (_type_): _description_
        msg (_type_): _description_
    """
    with app.app_context():
        mail.send(msg)


def send_email(to, context):
    """_summary_

    Args:
        to (_type_): _description_
        context (_type_): _description_
    """
    app = current_app._get_current_object()
    msg = Message(context['asunto'], recipients=[to])
    msg.html = render_template('correo_contato.html', **context)
    # win_print(template='correo_contato.html', context=context, msg=msg)
    thr = Thread(target=send_async_email, args=[app, msg])
    thr.start()


def win_print(template, context, msg):
    """_summary_

    Args:
        template (_type_): _description_
        context (_type_): _description_
        msg (_type_): _description_

    Returns:
        _type_: _description_
    """
    # Ejecutar Js para generar el pdf
    # ...
    app = current_app._get_current_object()
    render_template(template, **context)
    with app.open_resource("ok.pdf") as fp:
        msg.attach("ok.pdf", "application/pdf", fp.read())

    return msg
