from flask import Blueprint, jsonify, session, request
from app.models import Album, Artist

artist_routes = Blueprint("artists", __name__)

@artist_routes.route("/")
def all_artists():
    allArtists = Artist.query.all()
    artist_dict = [artist.to_dict(albums=True) for artist in allArtists]
    return {"artists": artist_dict}

@artist_routes.route("/<int:id>/songs")
def one_artist_songs(id):
    artist = Artist.query.get(id)
    artist_dict = artist.to_dict(songs=True)
    return artist_dict

@artist_routes.route("/<int:id>/")
def one_artist(id):
    artist = Artist.query.get(id)
    artist_dict = artist.to_dict(albums=True)
    return artist_dict
