from flask_wtf import FlaskForm
from wtforms.fields import StringField, PasswordField, SubmitField, SelectField, TextAreaField, RadioField, FormField, HiddenField, BooleanField
from wtforms.validators import DataRequired, Optional, EqualTo, InputRequired, Regexp, Email, Length, Regexp, NoneOf
from wtforms.fields.html5 import EmailField ,DateField
from flask_wtf.file import FileField, FileAllowed, FileRequired


class LoginForm(FlaskForm):
    nombre = StringField('Nombre de usuario', validators=[InputRequired(),Length(min=4, max=25)])
    contraseña = PasswordField('Contraseña', validators=[
                               InputRequired()])
    login = SubmitField('Iniciar sesión')


class SignupForm(FlaskForm):
    nombre = StringField('Nombre de usuario', validators=[
                         InputRequired(), Regexp('^[\S]+$', message="El campo no debe contener espacios"), Length(min=4, max=25)])
    contraseña = PasswordField('Contraseña', validators=[
                               InputRequired(), Length(min=4, max=25)])
    contraseña_conf = PasswordField(
        'Confirmar Contraseña', validators=[InputRequired(), EqualTo('contraseña', message='Las contraseñas no coinciden'), Length(min=4, max=25)])
    cargo = SelectField('Cargo', choices=[
                        ('-1', ' '), ('1', 'Docente'), ('2', 'Investigador')], validators=[DataRequired()])
    terminos = BooleanField(
        "Autorizo política de tratamiento de datos personales *", validators=[DataRequired()])
    iniciar = SubmitField('Registrarse')


class UploadForm(FlaskForm):
    upload = FileField('Imagen', validators=[Optional(),
        FileAllowed(['jpg', 'png'], 'Requiere .jpg o .png')])
class SignupEstForm(FlaskForm):
    nombre = StringField('Nombre estudiante *', validators=[
                         InputRequired(), Regexp("^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$", message="Escriba nombre y apellidos, omita caracteres especiales."), Length(min=4, max=45)])
    identificacion = StringField('Numero identificación *', validators=[
        InputRequired(), Regexp("^[0-9]{8,20}?$", message="Numero de identificación sin puntos."), Length(min=4, max=45)])
    imagen = FileField('Imagen', validators=[Optional(),
                                             FileAllowed(['jpg', 'png'], 'Requiere .jpg o .png')])
    nacimiento = DateField('Fecha Nacimiento *',
                           validators=[DataRequired()])
    institucion = StringField('Institución Educativa *', validators=[DataRequired()])
    grado = SelectField("Grado Escolar *", choices=[('-1', ' '), ('1', '1°'), ('2', '2°'), ('3', '3°'), ('4', '4°'), ('5', '5°'), (
        '6', '6°'), ('7', '7°'), ('8', '8°'), ('9', '9°'), ('10', '10°'), ('11', '11°')], validators=[DataRequired()])
    anotaciones = TextAreaField("Anotaciones")
    terminos = BooleanField(
        "Política de tratamiento de datos personales *",validators=[DataRequired()])
    iniciar = SubmitField('Registrar')


class TodoForms(FlaskForm):
    description = StringField('Descripción', validators=[DataRequired()])
    submit = SubmitField('Crear')


class DeleteTodoForm(FlaskForm):
    submit = SubmitField('Borrar')


class UpdateTodo(FlaskForm):
    submit = SubmitField('Actualizar')


""" def mail_validatork(form, field):
    if len(field.data) > 50:
        raise ValidationError('Field must be less than 50 characters')

class MyForm(Form):
    name = StringField('Name', [InputRequired(), my_length_check]) """


class ContactoForm(FlaskForm):
    nombre = StringField('Nombre', validators=[
                         InputRequired("Ingrese su nombre")])
    correo = EmailField('Correo', validators=[InputRequired(
        "Ingrese su dirección de correo"), Email()])
    numero = StringField('Numero', validators=[
                         InputRequired("Ingrese su numero")])
    asunto = StringField('Asunto', validators=[
                         InputRequired("Ingrese el asunto del correo")])
    mensaje = TextAreaField('Mensaje', validators=[
                            InputRequired("Ingrese el mensaje")])
    enviar = SubmitField('Enviar')


class TerapiaForm(FlaskForm):
    nombre_form = HiddenField('Nombre del estudiante', validators=[DataRequired()])
    emocion_percibida = SelectField("Emoción percibida", choices=[('-1', ' '), ('a', 'Felicidad'), (
        'b', 'Tristeza'), ('c', 'Enojo'), ('d', 'Sorpresa'), ('e', 'Neutro')], validators=[DataRequired()])
    virtual = BooleanField("¿Terapia presencial o remota?")
    iniciar = SubmitField(label='Iniciar')


class CuestionarioForm(FlaskForm):
    resp_1 = RadioField("¿Te sentiste bien con el desarrollo de la clase?", choices=[
                        ('a', 'Si'), ('b', 'No')], validators=[DataRequired()])
    resp_2 = RadioField("¿Te ha pasado algo divertido en la clase de hoy?", choices=[
                        ('a', 'Si'), ('b', 'No')], validators=[DataRequired()])
    resp_3 = RadioField("¿Te gusto la clase?", choices=[
                        ('a', 'Si'), ('b', 'No')], validators=[DataRequired()])

    iniciar = SubmitField('Finalizar')


class ConclusionesForm(FlaskForm):
    emocion_percibida = SelectField("Emoción percibida", choices=[('-1',' '), ('a','Felicidad'), ('b',
        'Tristeza'), ('c','Enojo'), ('d','Sorpresa'), ('e','Neutro')], validators=[InputRequired(), NoneOf(' ', message="Seleccione un campo valido.")])
    observacion = TextAreaField("Observaciones")
    iniciar = SubmitField('Finalizar')
