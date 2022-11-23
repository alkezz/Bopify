from app.models import db, Song, Playlist, environment, SCHEMA

def seed_songs():
    flesh = Song(
        name="In The Flesh?",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/1%20-%2001%20-%20In%20The%20Flesh.mp3",
        album_id=1
    )
    thin = Song(
        name="The Thin Ice",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/1%20-%2002%20-%20The%20Thin%20Ice.mp3",
        album_id=1
    )
    pt1 = Song(
        name="Another Brick in the Wall Pt.1",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/1%20-%2003%20-%20Another%20Brick%20in%20the%20Wall,%20Pt.%201.mp3",
        album_id=1
    )
    happiest = Song(
        name="The Happiest Days of our Lives",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/1%20-%2004%20-%20The%20Happiest%20Days%20Of%20Our%20Lives.mp3",
        album_id=1
    )
    pt2 = Song(
        name="Another Brick in the Wall Pt.2",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/1%20-%2005%20-%20Another%20Brick%20in%20the%20Wall,%20Pt.%202.mp3",
        album_id=1
    )
    mother = Song(
        name="Mother",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/1%20-%2006%20-%20Mother.mp3",
        album_id=1
    )
    bluesky = Song(
        name="Goodbye Blue Sky",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/1%20-%2007%20-%20Goodbye%20Blue%20Sky.mp3",
        album_id=1
    )
    empty = Song(
        name="Empty Spaces",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/1%20-%2008%20-%20Empty%20Spaces.mp3",
        album_id=1
    )
    young = Song(
        name="Young Lust",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/1%20-%2009%20-%20Young%20Lust.mp3",
        album_id=1
    )
    turns = Song(
        name="One Of My Turns",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/1%20-%2010%20-%20One%20Of%20My%20Turns.mp3",
        album_id=1
    )
    leave = Song(
        name="Don't Leave Me Now",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/1%20-%2011%20-%20Don't%20Leave%20Me%20Now.mp3",
        album_id=1
    )
    pt3 = Song(
        name="Another Brick in the Wall Pt.3",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/1%20-%2012%20-%20Another%20Brick%20in%20the%20Wall,%20Pt.%203.mp3",
        album_id=1
    )
    goodbye = Song(
        name="Goodbye Cruel World",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/1%20-%2013%20-%20Goodbye%20Cruel%20World.mp3",
        album_id=1
    )
    Hey = Song(
        name="Hey You",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/2%20-%2001%20-%20Hey%20You.mp3",
        album_id=1
    )
    anybody = Song(
        name="Is There Anybody Out There",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/2%20-%2002%20-%20Is%20There%20Anybody%20Out%20There.mp3",
        album_id=1
    )
    nobody = Song(
        name="Nobody Home",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/2%20-%2003%20-%20Nobody%20Home.mp3",
        album_id=1
    )
    vera = Song(
        name="Vera",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/2%20-%2004%20-%20Vera.mp3",
        album_id=1
    )
    boys = Song(
        name="Bring The Boys Back Home",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/2%20-%2005%20-%20Bring%20The%20Boys%20Back%20Home.mp3",
        album_id=1
    )
    numb = Song(
        name="Comfortably Numb",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/2%20-%2006%20-%20Comfortably%20Numb.mp3",
        album_id=1
    )
    must = Song(
        name="The Show Must Go On",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/2%20-%2007%20-%20The%20Show%20Must%20Go%20On.mp3",
        album_id=1
    )
    the = Song(
        name="In The Flesh",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/2%20-%2008%20-%20In%20The%20Flesh.mp3",
        album_id=1
    )
    run = Song(
        name="Run Like Hell",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/2%20-%2009%20-%20Run%20Like%20Hell.mp3",
        album_id=1
    )
    worms = Song(
        name="Waiting For The Worms",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/2%20-%2010%20-%20Waiting%20For%20The%20Worms.mp3",
        album_id=1
    )
    stop = Song(
        name="Stop",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/2%20-%2011%20-%20Stop.mp3",
        album_id=1
    )
    trial = Song(
        name="The Trial",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/2%20-%2012%20-%20The%20Trial.mp3",
        album_id=1
    )
    outside = Song(
        name="Outside The Wall",
        song_url="http://188.165.227.112/portail/musique/Pink%20Floyd%20-%20full%20discography/1979%20-%20The%20Wall/2%20-%2013%20-%20Outside%20The%20Wall.mp3",
        album_id=1
    )
    db.session.add(flesh)
    db.session.add(thin)
    db.session.add(pt1)
    db.session.add(happiest)
    db.session.add(pt2)
    db.session.add(mother)
    db.session.add(bluesky)
    db.session.add(empty)
    db.session.add(young)
    db.session.add(turns)
    db.session.add(leave)
    db.session.add(pt3)
    db.session.add(goodbye)
    db.session.add(Hey)
    db.session.add(anybody)
    db.session.add(nobody)
    db.session.add(vera)
    db.session.add(boys)
    db.session.add(numb)
    db.session.add(must)
    db.session.add(the)
    db.session.add(run)
    db.session.add(worms)
    db.session.add(stop)
    db.session.add(trial)
    db.session.add(outside)
    db.session.commit()

    adults = Song(
        name="The Adults Are Talking",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/1+Adults+Are+Talking.mp3",
        album_id=2
    )
    selfless = Song(
        name="Selfless",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/2+Selfless.mp3",
        album_id=2
    )

    brooklyn = Song(
        name="Brooklyn Bridge To Chorus",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/3+Brooklyn+Bridge.mp3",
        album_id=2
    )

    bad = Song(
        name="Bad Decisions",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/4+Bad+Decisions.mp3",
        album_id=2
    )

    summer = Song(
        name="Eternal Summer",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/5+Eternal+Summer.mp3",
        album_id=2
    )

    door = Song(
        name="At The Door",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/6+At+the+door.mp3",
        album_id=2
    )
    sundays = Song(
        name="Why Are Sundays So Depressing",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/7+Sundays.mp3",
        album_id=2
    )

    same = Song(
        name="Not The Same Anymore",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/8+Not+the+same.mp3",
        album_id=2
    )

    mets = Song(
        name="Ode To The Mets",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/9+Ode+To+The+Mets.mp3",
        album_id=2
    )

    db.session.add(adults)
    db.session.add(selfless)
    db.session.add(brooklyn)
    db.session.add(bad)
    db.session.add(summer)
    db.session.add(door)
    db.session.add(sundays)
    db.session.add(same)
    db.session.add(mets)
    db.session.commit()

    lev = Song(
        name="Levitation",
        song_url = "https://ali-practice-aws-bucket.s3.amazonaws.com/Depression+Cherry/01++-+Levitation.mp3",
        album_id=3
    )

    spark = Song(
        name="Sparks",
        song_url = "https://ali-practice-aws-bucket.s3.amazonaws.com/Depression+Cherry/02++-+Sparks.mp3",
        album_id = 3
    )
    Space = Song(
        name="Space Song",
        song_url = "https://ali-practice-aws-bucket.s3.amazonaws.com/Depression+Cherry/03++-+Space+Song.mp3",
        album_id = 3
    )
    beyond = Song(
        name="Beyond Love",
        song_url = "https://ali-practice-aws-bucket.s3.amazonaws.com/Depression+Cherry/04++-+Beyond+Love.mp3",
        album_id = 3
    )
    ten = Song(
        name="10-37",
        song_url = "https://ali-practice-aws-bucket.s3.amazonaws.com/Depression+Cherry/05++-+10-37.mp3",
        album_id = 3
    )
    ppp = Song(
        name="PPP",
        song_url = "https://ali-practice-aws-bucket.s3.amazonaws.com/Depression+Cherry/06++-+PPP.mp3",
        album_id = 3
    )
    Wildflower = Song(
        name="Sparks",
        song_url = "https://ali-practice-aws-bucket.s3.amazonaws.com/Depression+Cherry/07++-+Wildflower.mp3",
        album_id = 3
    )
    Bluebird = Song(
        name="Bluebird",
        song_url = "https://ali-practice-aws-bucket.s3.amazonaws.com/Depression+Cherry/08++-+Bluebird.mp3",
        album_id = 3
    )
    Days = Song(
        name="Days Of Candy",
        song_url = "https://ali-practice-aws-bucket.s3.amazonaws.com/Depression+Cherry/09++-+Days+of+Candy.mp3",
        album_id = 3
    )
    db.session.add(lev)
    db.session.add(spark)
    db.session.add(Space)
    db.session.add(beyond)
    db.session.add(ten)
    db.session.add(ppp)
    db.session.add(Wildflower)
    db.session.add(Bluebird)
    db.session.add(Days)
    db.session.commit()

    scav = Song(
        name="Scavenger of Human Sorrow",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/death/1+Scavenger.mp3",
        album_id=4
    )
    Bite = Song(
        name="Bite the Pain",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/death/2+Bite+The+Pain.mp3",
        album_id=4
    )
    Spirit = Song(
        name="Spirit Crusher",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/death/3+Spirit+Crusher.mp3",
        album_id=4
    )
    Story = Song(
        name="Story to Tell",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/death/4+Story+to+tell.mp3",
        album_id=4
    )
    fleshpower = Song(
        name="Flesh and the Power It Holds",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/death/5+Flesh+And+the+power+it+holds.mp3",
        album_id=4
    )
    voices = Song(
        name="Voices of the Soul",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/death/6+Voice+of+the+soul.mp3",
        album_id=4
    )
    forgive = Song(
        name="To Forgive is to Suffer",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/death/7+Forgive+is+to+suffer.mp3",
        album_id=4
    )
    clarity = Song(
        name="A Moment of Clarity",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/death/8+Moment+of+clarity.mp3",
        album_id=4
    )
    pain = Song(
        name="Painkiller",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/death/9+Painkiller.mp3",
        album_id=4
    )

    db.session.add(scav)
    db.session.add(Bite)
    db.session.add(Spirit)
    db.session.add(Story)
    db.session.add(fleshpower)
    db.session.add(voices)
    db.session.add(forgive)
    db.session.add(clarity)
    db.session.add(pain)
    db.session.commit()

    emany = Song(
        name="Emany Satea",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Emany/1+Emany.mp3",
        album_id=5
    )
    mass = Song(
        name="Masseytkon Be El Kheir",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Emany/2+Masseytkon.mp3",
        album_id=5
    )
    tareek = Song(
        name="Tareek El Nahl",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Emany/3+Tareek.mp3",
        album_id=5
    )
    weinon = Song(
        name="Weinon",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Emany/4+Weinon.mp3",
        album_id=5
    )
    Habbaitak = Song(
        name="Habbaitak Be El Saif",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Emany/5+Habbaitak.mp3",
        album_id=5
    )
    Shady = Song(
        name="Shady",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Emany/6+Shady.mp3",
        album_id=5
    )
    teegy = Song(
        name="La Teegy El Youm",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Emany/7+La+Teegy.mp3",
        album_id=5
    )
    nas = Song(
        name="Saalouny El Nas",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Emany/8+Saalouny.mp3",
        album_id=5
    )

    db.session.add(emany)
    db.session.add(mass)
    db.session.add(tareek)
    db.session.add(weinon)
    db.session.add(Habbaitak)
    db.session.add(Shady)
    db.session.add(teegy)
    db.session.add(nas)
    db.session.commit()

    one = Playlist(
        user_id=1,
        name="Cool Playlist",
        description="Probably my best playlist yet",
        playlist_song_list= [flesh, thin, pt1, happiest, scav, Space, lev]
    )
    two = Playlist(
        user_id=2,
        name="Nice Playlist",
        description="Chillin out ya know?",
        playlist_song_list= [lev, Space, spark, ppp, Wildflower]
    )
    three = Playlist(
        user_id=3,
        name="No Time for chilling",
        description="Gotta get this done ASAP",
        playlist_song_list= [scav, Bite, Spirit, Story, voices, forgive, fleshpower, voices]
    )
    four = Playlist(
        user_id=4,
        name="Pink Floyd GOAT",
        description="I'm a Pink Floyd fan can you tell?",
        playlist_song_list= [flesh, thin, pt1, happiest, pt2, mother, bluesky, empty, young, turns, leave, pt3, goodbye, Hey]
    )
    five = Playlist(
        user_id=5,
        name="Ya Habibi Waynak",
        description="Shta'tellak Kteer",
        playlist_song_list= [emany, mass, tareek, weinon, Habbaitak, Shady, teegy, nas]
    )
    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.add(four)
    db.session.add(five)
    db.session.commit()

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM songs")
        db.session.execute("DELETE FROM playlists")
        db.session.execute("DELETE FROM playlist_songs")

    db.session.commit()
