from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextField
from wtforms.validators import DataRequired

class PlaylistForm(FlaskForm):
    name = StringField("Name")
    description = TextField("Description")
    playlist_img = TextField("Image")
    user_id = IntegerField("user id", validators=[DataRequired()])
