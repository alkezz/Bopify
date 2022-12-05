from flask import Blueprint, jsonify, session, request, render_template
from app.models import db, Album, Artist, Playlist, User, Song
from flask_login import current_user, login_user, logout_user, login_required
from ..forms import PlaylistForm
from werkzeug.utils import secure_filename
import boto3
import os

playlist_routes = Blueprint("playlists", __name__)

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("AWS_ACCESS_KEY"),
   aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY")
)
BUCKET_NAME=os.environ.get("AWS_BUCKET_NAME")

@playlist_routes.route("/images/upload", methods=["POST"])
def upload():
    if request.method == "POST":
        img = request.files["file"]
        if img:
            filename = secure_filename(img.filename)
            s3.upload_fileobj(
                img,
                BUCKET_NAME,
                filename,
                ExtraArgs = {'ACL':"public-read", 'ContentType': img.content_type}
            )
            return {"image": f"https://ali-practice-aws-bucket.s3.amazonaws.com/{filename}"}
        else:
            return {"message": "Image was not valid"}

@playlist_routes.route("/upload")
def test():
    return render_template("upload_image.html")

@playlist_routes.route("/")
def all_playlists():
    all_playlists = Playlist.query.all()
    playlists_dict = [playlist.to_dict(user=True) for playlist in all_playlists]
    return {"Playlists": playlists_dict}

@playlist_routes.route("/", methods=["POST"])
@login_required
def new_playlist():
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_playlist = Playlist(
            name = form.data["name"],
            description = form.data["description"],
            playlist_img = form.data["playlist_img"],
            user_id = form.data["user_id"]
        )
        db.session.add(new_playlist)
        db.session.commit()
        return new_playlist.to_dict(user=True)
    else:
        return form.errors

@playlist_routes.route("/<int:id>/add_song/<int:id2>", methods=["POST"])
@login_required
def add_song_to_playlist(id, id2):
    """
    Route to add a song to a playlist, returns the playlist with songs
    /api/playlists/:playlistId/add_song/:songId
    """
    playlist = Playlist.query.get(id)
    song = Song.query.get(id2)
    if playlist:
        if song:
            if playlist.user_id == current_user.id:
                playlist.playlist_song_list.append(song)
                db.session.commit()
                return playlist.to_dict(songs=True)
            else:
                return {"message": "Can not add songs to a playlist you don't own!"}
        else:
            return {"message": f"Could not find song with id of {id2}"}
    else:
        return {"message": f"Could not find playlist with id of {id}"}

@playlist_routes.route("/<int:id>/delete_song/<int:id2>", methods=["DELETE"])
@login_required
def remove_song_from_playlist(id, id2):
    """
    Route to delete a song from a playlist, returns the playlist with songs
    /api/playlists/:playlistId/delete_song/:songId
    """
    playlist = Playlist.query.get(id)
    song = Song.query.get(id2)
    if playlist:
        if song:
            if playlist.user_id == current_user.id:
                playlist.playlist_song_list.remove(song)
                db.session.commit()
                return playlist.to_dict(songs=True)
            else:
                return {"message": "Can not delete songs from a playlist you don't own!"}
        else:
            return {"message": f"Could not find song with id of {id2}"}
    else:
        return {"message": f"Could not find playlist with id of {id}"}

@playlist_routes.route("/<int:id>/playlist-follows")
def playlist_follows(id):
    playlist = Playlist.query.get(id)

    if playlist:
        return playlist.to_dict(playlist_followers=True)
    else:
        return {"message": f"Playlist with id of {id} not found"}

@playlist_routes.route("/<int:id>/")
def one_playlist(id):
    playlist = Playlist.query.get(id)
    if playlist:
        playlist_dict = playlist.to_dict(user=True, songs=True)
        return playlist_dict
    else:
        return {"message": f"No playlist with id of {id} found"}

@playlist_routes.route("/<int:id>/", methods=["PUT","DELETE"])
@login_required
def edit_delete_playlist(id):
    playlist = Playlist.query.get(id)
    if request.method == "DELETE":
        if playlist:
            if playlist.user_id == current_user.id:
                db.session.delete(playlist)
                db.session.commit()
                return {"message": "Playlist successfully deleted"}
            else:
                return {"message": "Can not delete playlist not owned by you!"}
        else:
            return {"message": f"No project found with id of {id}"}
    if request.method == "PUT":
        new_name = request.json["name"]
        new_description = request.json["description"]
        new_image = request.json["playlist_img"]
        if playlist:
            if playlist.user_id == current_user.id:
                if new_name:
                    playlist.name = new_name
                else:
                    playlist.name = playlist.name
                if new_description:
                    playlist.description = new_description
                else:
                    playlist.description = playlist.description
                if new_image:
                    playlist.playlist_img = new_image
                else:
                    playlist.playlist_img = playlist.playlist_img
                db.session.commit()
                return playlist.to_dict(user=True, image=True)
            else:
                return {"message": "Can not edit a playlist not owned by you!"}
        else:
            return {"message": f"No project found with id of {id}"}
