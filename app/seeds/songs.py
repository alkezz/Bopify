from app.models import db, Song, Playlist, environment, SCHEMA

def seed_songs():
    flesh = Song(
        name="Pigs on the Wing 1",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Animals/01+Pigs+On+The+Wing+1.mp3",
        song_length="1:24",
        album_id=1
    )
    thin = Song(
        name="Dogs",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Animals/02+Dogs.mp3",
        song_length="17:05",
        album_id=1
    )
    pt1 = Song(
        name="Pigs (Three Different Ones)",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Animals/Pigs_Three_Different_Ones.mp3",
        song_length="11:25",
        album_id=1
    )
    happiest = Song(
        name="Sheep",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Animals/04+Sheep.mp3",
        song_length="10:19",
        album_id=1
    )
    pt2 = Song(
        name="Pigs on the Wing 2",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Animals/05+Pigs+on+the+wings+part+2.mp3",
        song_length="1:26",
        album_id=1
    )

    db.session.add(flesh)
    db.session.add(thin)
    db.session.add(pt1)
    db.session.add(happiest)
    db.session.add(pt2)
    db.session.commit()

    adults = Song(
        name="The Adults Are Talking",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/1+Adults+Are+Talking.mp3",
        song_length="5:09",
        album_id=2
    )
    selfless = Song(
        name="Selfless",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/2+Selfless.mp3",
        song_length="3:42",
        album_id=2
    )

    brooklyn = Song(
        name="Brooklyn Bridge To Chorus",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/3+Brooklyn+Bridge.mp3",
        song_length="3:55",
        album_id=2
    )

    bad = Song(
        name="Bad Decisions",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/4+Bad+Decisions.mp3",
        song_length="4:53",
        album_id=2
    )

    summer = Song(
        name="Eternal Summer",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/5+Eternal+Summer.mp3",
        song_length="6:15",
        album_id=2
    )

    door = Song(
        name="At The Door",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/6+At+the+door.mp3",
        song_length="5:10",
        album_id=2
    )
    sundays = Song(
        name="Why Are Sundays So Depressing",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/7+Sundays.mp3",
        song_length="4:35",
        album_id=2
    )

    same = Song(
        name="Not The Same Anymore",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/8+Not+the+same.mp3",
        song_length="5:37",
        album_id=2
    )

    mets = Song(
        name="Ode To The Mets",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/The+New+Abnormal/9+Ode+To+The+Mets.mp3",
        song_length="5:51",
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
        song_length="5:54",
        album_id=3
    )

    spark = Song(
        name="Sparks",
        song_url = "https://ali-practice-aws-bucket.s3.amazonaws.com/Depression+Cherry/02++-+Sparks.mp3",
        song_length="5:21",
        album_id = 3
    )
    Space = Song(
        name="Space Song",
        song_url = "https://ali-practice-aws-bucket.s3.amazonaws.com/Depression+Cherry/03++-+Space+Song.mp3",
        song_length="5:20",
        album_id = 3
    )
    beyond = Song(
        name="Beyond Love",
        song_url = "https://ali-practice-aws-bucket.s3.amazonaws.com/Depression+Cherry/04++-+Beyond+Love.mp3",
        song_length="4:25",
        album_id = 3
    )
    ten = Song(
        name="10-37",
        song_url = "https://ali-practice-aws-bucket.s3.amazonaws.com/Depression+Cherry/05++-+10-37.mp3",
        song_length="3:48",
        album_id = 3
    )
    ppp = Song(
        name="PPP",
        song_url = "https://ali-practice-aws-bucket.s3.amazonaws.com/Depression+Cherry/06++-+PPP.mp3",
        song_length="6:08",
        album_id = 3
    )
    Wildflower = Song(
        name="Sparks",
        song_url = "https://ali-practice-aws-bucket.s3.amazonaws.com/Depression+Cherry/07++-+Wildflower.mp3",
        song_length="3:39",
        album_id = 3
    )
    Bluebird = Song(
        name="Bluebird",
        song_url = "https://ali-practice-aws-bucket.s3.amazonaws.com/Depression+Cherry/08++-+Bluebird.mp3",
        song_length="3:55",
        album_id = 3
    )
    Days = Song(
        name="Days Of Candy",
        song_url = "https://ali-practice-aws-bucket.s3.amazonaws.com/Depression+Cherry/09++-+Days+of+Candy.mp3",
        song_length="6:15",
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
        name="Don't Be so Serious",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/LowRoar/01+Dont_Be_So_Serious.mp3",
        song_length="6:13",
        album_id=4
    )
    Bite = Song(
        name="Bones",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/LowRoar/02+Bones.mp3",
        song_length="2:49",
        album_id=4
    )
    Spirit = Song(
        name="St. Eriksplan",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/LowRoar/03+St.mp3",
        song_length="3:41",
        album_id=4
    )
    Story = Song(
        name="Give Me an Answer",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/LowRoar/04+Give_Me_An_Answer.mp3",
        song_length="3:43",
        album_id=4
    )
    fleshpower = Song(
        name="Waiting (10 Years)",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/LowRoar/05+Waiting_10_Years.mp3",
        song_length="4:04",
        album_id=4
    )
    voices = Song(
        name="Without You",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/LowRoar/06+Without_You.mp3",
        song_length="3:54",
        album_id=4
    )
    forgive = Song(
        name="Gosia",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/LowRoar/07+Gosia.mp3",
        song_length="4:13",
        album_id=4
    )
    clarity = Song(
        name="Once in a Long, Long While",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/LowRoar/08+Once_In_A_Long_Long_While.mp3",
        song_length="5:16",
        album_id=4
    )
    pain = Song(
        name="Crawl Back",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/LowRoar/09+Crawl_Back.mp3",
        song_length="4:08",
        album_id=4
    )
    poz = Song(
        name="Poznan",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/LowRoar/10+Poznan.mp3",
        song_length="2:03",
        album_id=4
    )
    miserable = Song(
        name="Miserably",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/LowRoar/11+Miserably.mp3",
        song_length="3:55",
        album_id=4
    )
    thirteen = Song(
        name="13",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/LowRoar/12+13.mp3",
        song_length="5:24",
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
    db.session.add(poz)
    db.session.add(miserable)
    db.session.add(thirteen)
    db.session.commit()

    emany = Song(
        name="Emany Satea",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Emany/1+Emany.mp3",
        song_length="2:52",
        album_id=5
    )
    mass = Song(
        name="Masseytkon Be El Kheir",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Emany/2+Masseytkon.mp3",
        song_length="2:08",
        album_id=5
    )
    tareek = Song(
        name="Tareek El Nahl",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Emany/3+Tareek.mp3",
        song_length="3:45",
        album_id=5
    )
    weinon = Song(
        name="Weinon",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Emany/4+Weinon.mp3",
        song_length="3:19",
        album_id=5
    )
    Habbaitak = Song(
        name="Habbaitak Be El Saif",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Emany/5+Habbaitak.mp3",
        song_length="3:31",
        album_id=5
    )
    Shady = Song(
        name="Shady",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Emany/6+Shady.mp3",
        song_length="2:38",
        album_id=5
    )
    teegy = Song(
        name="La Teegy El Youm",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Emany/7+La+Teegy.mp3",
        song_length="3:31",
        album_id=5
    )
    nas = Song(
        name="Saalouny El Nas",
        song_url="https://ali-practice-aws-bucket.s3.amazonaws.com/Emany/8+Saalouny.mp3",
        song_length="3:32",
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
        playlist_img="https://ali-practice-aws-bucket.s3.amazonaws.com/playlistDefaultImage.png",
        playlist_song_list= [flesh, thin, pt1, happiest, scav, Space, lev]
    )
    two = Playlist(
        user_id=2,
        name="Nice Playlist",
        description="Chillin out ya know?",
        playlist_img="https://ali-practice-aws-bucket.s3.amazonaws.com/playlistDefaultImage.png",
        playlist_song_list= [lev, Space, spark, ppp, Wildflower]
    )
    three = Playlist(
        user_id=3,
        name="No Time for chilling",
        description="Gotta get this done ASAP",
        playlist_img="https://ali-practice-aws-bucket.s3.amazonaws.com/playlistDefaultImage.png",
        playlist_song_list= [scav, Bite, Spirit, Story, voices, forgive, fleshpower, voices]
    )
    four = Playlist(
        user_id=4,
        name="Pink Floyd GOAT",
        description="I'm a Pink Floyd fan can you tell?",
        playlist_img="https://ali-practice-aws-bucket.s3.amazonaws.com/playlistDefaultImage.png",
        playlist_song_list= [flesh, thin, pt1, happiest, pt2]
    )
    five = Playlist(
        user_id=5,
        name="Ya Habibi Waynak",
        description="Shta'tellak Kteer",
        playlist_img="https://ali-practice-aws-bucket.s3.amazonaws.com/playlistDefaultImage.png",
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
