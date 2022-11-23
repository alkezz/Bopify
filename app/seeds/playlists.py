from app.models import db, Playlist, environment, SCHEMA

def seed_playlists():
    one = Playlist(
        user_id=1,
        name="Cool Playlist",
        description="Probably my best playlist yet",
        playlist_song_list= [1,2,3,4,5]
    )

    db.session.add(one)
    db.session.commit()

def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM playlists")

    db.session.commit()
