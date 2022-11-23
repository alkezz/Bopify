from .db import db, environment, SCHEMA, add_prefix_for_prod

playlist_songs = db.Table(
    "playlist_songs",
    db.Model.metadata,
    db.Column("playlist_id", db.Integer, db.ForeignKey(add_prefix_for_prod("playlists.id"))),
    db.Column("song_id", db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")))
)

playlist_followers = db.Table(
    "playlist_followers",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("playlist_id", db.Integer, db.ForeignKey(add_prefix_for_prod("playlists.id")))
)

if environment == 'production':
    playlist_songs.schema = SCHEMA

if environment == 'production':
    playlist_followers.schema = SCHEMA

class Playlist(db.Model):
    __tablename__ = "playlists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    name = db.Column(db.String)
    description = db.Column(db.Text)
    playlist_img = db.Column(db.Text)

    #relationships
    user_playlists = db.relationship("User", back_populates="playlist_users")
    playlist_song_list = db.relationship(
        "Song",
        secondary=playlist_songs,
        back_populates="playlist_song"
    )
    playlist_follower = db.relationship(
        "User",
        secondary=playlist_followers,
        back_populates="playlist_following"
    )

    def to_dict(self, user=False, image=False, songs=False):
        playlist = {
            "id": self.id,
            "name": self.name,
            "description": self.description
        }
        if image:
            playlist["image"] = self.playlist_img

        if user:
            playlist["User"] = self.user_playlists.to_dict()

        if songs:
            playlist["Songs"] = [song.to_dict() for song in self.playlist_song_list]

        return playlist
