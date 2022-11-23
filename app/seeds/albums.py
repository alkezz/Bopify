from app.models import db, Album, environment, SCHEMA

def seed_albums():
    wall = Album(
        artist_id=1,
        name="The Wall",
        year = "1979",
        album_img="https://i.scdn.co/image/ab67616d0000b273f34e8811de255b34c56301d8"
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
        album_img="https://i.scdn.co/image/ab67616d00001e020af2276ae66a42e73eb07683"
    )
    sound = Album(
        artist_id=4,
        name="The Sound of Perseverance",
        year = "1998",
        album_img="https://i.scdn.co/image/ab67616d00001e0291fcdc499f2dbfbcd7e58b59"
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
