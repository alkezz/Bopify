from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

follows = db.Table(
    "follows",
    db.Model.metadata,
    db.Column("follower_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("followed_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
)

if environment == 'production':
    follows.schema = SCHEMA

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    #relationships
    playlist_users = db.relationship("Playlist", back_populates="user_playlists")
    playlist_following = db.relationship(
        "Playlist",
        secondary="playlist_followers",
        back_populates="playlist_follower"
    )
    followers = db.relationship(
        'User', secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref('follows', lazy='dynamic'),
        lazy='dynamic'
    )
    #! MIGRATE TO FIX RELATIONSHIP ISSUE, LIKES TABLE DNE IN ALEMBIC MIGRATIONS !#
    user_likes = db.relationship(
        "Song",
        secondary="likes",
        back_populates="song_likes"
    )

    def to_dict(self, followed_playlists=False, likes=False, playlist=False):
        user = {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
        if playlist:
            user["Playlists"] = [playlistList.to_dict(image=True) for playlistList in self.playlist_users]

        if followed_playlists:
            user["followedPlaylists"] = [playlist.to_dict() for playlist in self.playlist_following]
        if likes:
            user["likedSongs"] = [song.to_dict() for song in self.user_likes]

        return user
