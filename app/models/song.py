from .db import db, environment, SCHEMA, add_prefix_for_prod

class Song(db.Model):
    __tablename__ = "songs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    song_url = db.Column(db.String)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("albums.id")))

    #relationships
    albums = db.relationship("Album", back_populates="songs")
    playlist_song = db.relationship(
        "Playlist",
        secondary="playlist_songs",
        back_populates="playlist_song_list"
    )
    # song_likes = db.relationship(
    #     "User",
    #     secondary="likes",
    #     back_populates="user_likes"
    # )

    def to_dict(self, album=False):
        song = {
            "id": self.id,
            "name": self.name,
            "song_url": self.song_url,
            "album": self.albums.to_dict()
        }

        if album:
            song["Album"] = self.albums

        return song
