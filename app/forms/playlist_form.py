from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextField
from wtforms.validators import DataRequired, ValidationError

class PlaylistForm(FlaskForm):
    user_id = IntegerField("User id", validators=[DataRequired()])
    name = StringField("Name")
    description = TextField("Description")
    playlist_img = TextField("Playlist Image")
