from flask import Blueprint

script=Blueprint('script',__name__, url_prefix='/terapia')

from . import views
