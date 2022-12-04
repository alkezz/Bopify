from app.models import db, Album, environment, SCHEMA

def seed_albums():
    wall = Album(
        artist_id=1,
        name="Animals",
        year = "1977",
        album_img="https://i.scdn.co/image/ab67616d00001e02810168d54f85d48f07389237"
    )
    abnormal = Album(
        artist_id=2,
        name="The New Abnormal",
        year = "2020",
        album_img="https://i.scdn.co/image/ab67616d00001e02bfa99afb5ef0d26d5064b23b"
    )
    cherry = Album(
        artist_id=3,
        name="Depression Cherry",
        year = "2015",
        album_img="https://i.scdn.co/image/ab67616d00001e029b7190e673e46271b2754aab"
    )
    sound = Album(
        artist_id=4,
        name="Once in a Long, Long While...",
        year = "2017",
        album_img="https://i.scdn.co/image/ab67616d00001e0287986e804018697f14194ace"
    )
    Emany = Album(
        artist_id=5,
        name="Emany Satae",
        year = "1973",
        album_img="https://i.scdn.co/image/ab67616d00001e0252fb8ee4341fcf40afaf616b"
    )

    db.session.add(wall)
    db.session.add(abnormal)
    db.session.add(cherry)
    db.session.add(sound)
    db.session.add(Emany)
    db.session.commit()

def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM albums")

    db.session.commit()
