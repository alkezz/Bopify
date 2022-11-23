from flask import Blueprint, jsonify, session, request
from app.models import db, Album, Artist, Playlist, User
from ..forms import PlaylistForm
from werkzeug.utils import secure_filename
import os
import boto3

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("AWS_ACCESS_KEY"),
   aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY")
)
BUCKET_NAME=os.environ.get("AWS_BUCKET_NAME")

playlist_routes = Blueprint("playlists", __name__)

@playlist_routes.route("/picture/upload")
def upload():
    if request.method == "POST":
        img = request.files['file']
        if img:
            filename = secure_filename(img.filename)
            s3.upload_fileobj(
                img,
                BUCKET_NAME,
                filename,
                ExtraArgs = {'ACL':"public-read", 'ContentType': img.content_type}
            )
            new_img = f"https://ali-practice-aws-bucket.s3.amazonaws.com/{filename}"
    return {"image": new_img}

@playlist_routes.route("/")
def all_playlists():
    all_playlists = Playlist.query.all()
    playlists_dict = [playlist.to_dict(user=True) for playlist in all_playlists]
    print("ALL_PLAYLISTS", playlists_dict)
    return {"Playlists": playlists_dict}

@playlist_routes.route("/<int:id>/")
def one_playlist(id):
    playlist = Playlist.query.get(id)
    playlist_dict = playlist.to_dict(user=True)
    return playlist_dict

@playlist_routes.route("/", methods=["POST"])
def createPlaylist():
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_playlist = Playlist(
            name = form.data["name"],
            description = form.data["description"],
            user_id = form.data["user_id"],
            playlist_img = form.data["playlist_img"]
        )
        db.session.add(new_playlist)
        db.session.commit()
        return new_playlist.to_dict(user=True)
