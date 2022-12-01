from flask import Blueprint, jsonify, session, request
from app.models import Album, Song

song_routes = Blueprint("songs", __name__)

@song_routes.route("/")
def allSongs():
    allSongs = Song.query.all()
    songDict = [song.to_dict() for song in allSongs]
    return {"songs": songDict}

@song_routes.route("/<int:id>")
def oneSong(id):
    one_song = Song.query.get(id)
    if one_song:
        return one_song.to_dict()
    else:
        return {"message": f"No song with id of {id} found"}
