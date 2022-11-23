from .db import db, environment, SCHEMA, add_prefix_for_prod

class Artist(db.Model):
    __tablename__ = "artists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    bio = db.Column(db.Text)
    artist_img = db.Column(db.Text)

    #relationships

    albums = db.relationship("Album", back_populates="artist")

    def to_dict(self, images=False, albums=False, songs=False):
        artist = {
            "id": self.id,
            "name": self.name,
            "bio": self.bio
        }
        if images:
            artist["Artist_Pic"] = self.artist_img

        if albums:
            artist["Albums"] = [album.to_dict() for album in self.albums]

        if songs:
            artist["Albums"] = [album.to_dict(songs=True) for album in self.albums]

        return artist
