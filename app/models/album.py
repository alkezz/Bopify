from .db import db, environment, SCHEMA, add_prefix_for_prod

class Album(db.Model):
    __tablename__ = "albums"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("artists.id")))
    name = db.Column(db.String)
    year = db.Column(db.String)
    album_img = db.Column(db.Text)

    #relationships
    artist = db.relationship("Artist", back_populates="albums")
    songs = db.relationship("Song", back_populates="albums")

    def to_dict(self, artist=False, images=False, songs=False):
        album = {
            "id": self.id,
            "name": self.name,
            "year": self.year
        }

        if images:
            album["albumPic"] = self.album_img

        if songs:
            album["Songs"] = [song.to_dict() for song in self.songs]
        return album
