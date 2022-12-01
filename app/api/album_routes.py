from flask import Blueprint, jsonify, session, request
from app.models import Album
# from flask_login import current_user, login_user, logout_user, login_required

album_routes = Blueprint("albums", __name__)

@album_routes.route("/")
def allAlbums():
    allAlbums = Album.query.all()
    album_dict = [album.to_dict(images=True) for album in allAlbums]
    return {"albums": album_dict}

@album_routes.route("/<int:id>/songs")
def one_album_songs(id):
    album = Album.query.get(id)
    return album.to_dict(images=True, songs=True)

@album_routes.route("/<int:id>/")
def oneAlbum(id):
    album = Album.query.get(id)
    return album.to_dict(images=True, songs=True)
