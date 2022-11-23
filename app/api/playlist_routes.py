from flask import Blueprint, jsonify, session, request
from app.models import Album, Artist, Playlist, User

playlist_routes = Blueprint("playlists", __name__)

@playlist_routes.route("/")
def all_playlists():
    all_playlists = Playlist.query.all()
    playlists_dict = [playlist.to_dict(user=True) for playlist in all_playlists]
    print("ALL_PLAYLISTS", playlists_dict)
    return {"Playlists": playlists_dict}

@playlist_routes.route("/user/<int:id>")
def user_playlists(id):
    user = User.query.get(id)
    user_dict = user.to_dict()
    return user_dict

@playlist_routes.route("/<int:id>/")
def one_playlist(id):
    playlist = Playlist.query.get(id)
    playlist_dict = playlist.to_dict(user=True)
    return playlist_dict
