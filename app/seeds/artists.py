from app.models import db, Artist, environment, SCHEMA

def seed_artists():
    pinkFloyd = Artist(
        name="Pink Floyd",
        bio="Pink Floyd are an English rock band formed in London in 1965. Gaining an early following as one of the first British psychedelic groups, they were distinguished by their extended compositions, sonic experimentation, philosophical lyrics and elaborate live shows. They became a leading band of the progressive rock genre, cited by some as the greatest progressive rock band of all time.",
        artist_img="https://i.scdn.co/image/d011c95081cd9a329e506abd7ded47535d524a07"
    )

    theStrokes = Artist(
        name="The Strokes",
        bio="The Strokes are an American rock band from New York City. Formed in 1998, the band is composed of lead singer and songwriter Julian Casablancas, guitarists Nick Valensi and Albert Hammond Jr., bassist Nikolai Fraiture, and drummer Fabrizio Moretti. They were a leading group of the early-2000s indie rock revival.",
        artist_img="https://i.scdn.co/image/ab6772690000dd22560322e3e86102d5bbe18bac"
    )

    beachHouse = Artist(
        name="Beach House",
        bio="Beach House is an American musical duo formed in Baltimore, Maryland in 2004. The band consists of vocalist and keyboardist Victoria Legrand and guitarist, keyboardist, and backup vocalist Alex Scally.",
        artist_img="https://i.scdn.co/image/ab6761670000ecd4d209d1a367570fcd7e20b25b"
    )

    death = Artist(
        name="Low Roar",
        bio="After leading the California-based indie rock band Audrye Sessions from 2002 to 2010, Karazija relocated to Reykjavík, Iceland and started the new project Low Roar, releasing a self-titled album in 2011.[3][4][5][6] A second album, 0, was released in 2014 by Tonequake Records,[7] followed by Once in a Long, Long While... in mid-2017.[8] The Low Roar album, ross., was released in November 2019,[9] with their latest album maybe tomorrow... released in July 2021.",
        artist_img="https://i.scdn.co/image/ab67616d0000b27329d7b7341523831085b533af"
    )

    fairuz = Artist(
        name="Fairuz",
        bio="Since the middle of the 20th century, the most famous living Arab singer and crown jewel of Lebanese music has been Fairuz (birth name Nuhad Haddad). She is world-renowned and has performed on all continents. She has been the voice of the Arab people -- regardless of political affiliation -- since she began working professionally as one of the young Lebanese artists to perform at the Baalbek International Festivals along with Sabah, Wadih Safi, Nasri Shamseddin, the dance group Abdulhalim Caracalla, and the songwriting and playwriting team of Assi and Mansour Rahbani, her longtime collaborators.",
        artist_img="https://images.mubicdn.net/images/cast_member/166652/cache-279851-1544474609/image-w856.jpg?size=800x"
    )

    radioHead = Artist(
        name="Radiohead",
        bio="At some point in the early 21st century, Radiohead became something more than a band: they became a touchstone for everything that is fearless and adventurous in rock, inheriting the throne from David Bowie, Pink Floyd, and the Talking Heads. The latter group gave the band its name -- it's an album track on 1986's True Stories -- but Radiohead never sounded much like the Heads, nor did they take much from Bowie, apart from their willingness to experiment. Instead, they spliced Floyd's spaciness with U2's messianic arena rock heft, bridging the gap with guitar skronk borrowed from the '80s American underground.",
        artist_img="https://ali-practice-aws-bucket.s3.amazonaws.com/radiohead-download-stream-burn-the-witch.jpg"
    )

    mgmt = Artist(
        name="MGMT",
        bio="MGMT was formed by Ben Goldwasser and Andrew VanWyngarden in 2001 while students at Wesleyan University. Since their first release, the EP Time To Pretend in 2005, MGMT have released four critically acclaimed albums: Oracular Spectacular (2008), Congratulations (2010), MGMT (2013), and Little Dark Age (2018).",
        artist_img="https://ali-practice-aws-bucket.s3.amazonaws.com/mgmt-11-11-11-cover.jpg"
    )

    db.session.add(pinkFloyd)
    db.session.add(theStrokes)
    db.session.add(beachHouse)
    db.session.add(death)
    db.session.add(fairuz)
    db.session.add(radioHead)
    db.session.add(mgmt)
    db.session.commit()

def undo_artists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.artists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM artists")

    db.session.commit()
