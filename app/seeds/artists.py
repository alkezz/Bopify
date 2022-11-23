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
        name="Death",
        bio="Death was an American death metal band formed in Altamonte Springs, Florida in 1984 by guitarist and vocalist Chuck Schuldiner. Death is considered to be among the most influential bands in heavy metal and a pioneering force in the extreme metal subgenre of death metal. The band's debut album, Scream Bloody Gore, has been widely regarded as one of the first death metal records, alongside the first records from Possessed and Necrophagia.",
        artist_img="https://i.scdn.co/image/9a0f1b399f5e272074b79f4efa3139cb2fce030e"
    )

    fairuz = Artist(
        name="Fairuz",
        bio="Since the middle of the 20th century, the most famous living Arab singer and crown jewel of Lebanese music has been Fairuz (birth name Nuhad Haddad). She is world-renowned and has performed on all continents. She has been the voice of the Arab people -- regardless of political affiliation -- since she began working professionally as one of the young Lebanese artists to perform at the Baalbek International Festivals along with Sabah, Wadih Safi, Nasri Shamseddin, the dance group Abdulhalim Caracalla, and the songwriting and playwriting team of Assi and Mansour Rahbani, her longtime collaborators.",
        artist_img="https://images.mubicdn.net/images/cast_member/166652/cache-279851-1544474609/image-w856.jpg?size=800x"
    )

    db.session.add(pinkFloyd)
    db.session.add(theStrokes)
    db.session.add(beachHouse)
    db.session.add(death)
    db.session.add(fairuz)
    db.session.commit()

def undo_artists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.artists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM artists")

    db.session.commit()
