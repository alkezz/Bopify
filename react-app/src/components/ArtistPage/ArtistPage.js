import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as playlistActions from "../../store/playlist"
import * as audioActions from "../../store/audioplayer"
import "./ArtistPage.css"


const ArtistPage = () => {
    const { artistId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [artist, setArtist] = useState([])
    const [songs, setSongs] = useState([])
    const [showMenu, setShowMenu] = useState(false)
    const [activeMenu, setActiveMenu] = useState()
    const sessionUser = useSelector((state) => state.session.user)
    const playlistState = useSelector((state) => state.playlist)
    document.body.style = 'background: #1e1e1e';
    let i = 0
    useEffect(() => {
        (async () => {
            const artistResponse = await fetch(`/api/artists/${artistId}`)
            const artistData = await artistResponse.json()
            setArtist(artistData)
        })();
        (async () => {
            const songResponse = await fetch(`/api/artists/${artistId}/songs`)
            const songData = await songResponse.json()
            setSongs(songData.Albums[0].Songs)
        })();
    }, [setArtist, setSongs])
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    let userPlaylistList
    let userPlaylistLength
    if (sessionUser) {
        const playlistArray = Object.values(playlistState)
        userPlaylistList = playlistArray.filter(playlist => playlist?.User?.id === sessionUser.id)
        userPlaylistLength = userPlaylistList.length + 1
    }
    const createPlaylist = async (e) => {
        if (userPlaylistLength > 5) {
            return window.alert("You can only create 5 playlists max!")
        }
        e.preventDefault()
        const newPlaylist = {
            "name": `My Playlist #${userPlaylistLength}`,
            "playlist_img": "https://ali-practice-aws-bucket.s3.amazonaws.com/playlistDefaultImage.png",
            "user_id": sessionUser.id
        }
        await dispatch(playlistActions.createPlaylist(newPlaylist))
    }
    console.log(userPlaylistList)
    const topFive = songs.slice(0, 5)
    console.log(topFive)
    console.log("ARTIST", artist)
    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
    }
    const incrementSongNumber = () => {
        i = i + 1
        return i
    }
    return (
        <div className='artist-container' style={{ overflowX: "hidden", paddingBottom: "80px" }}>
            <div className='header-container' style={{ backgroundImage: `url(${artist.artist_img})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 500px" }}>
                <h1 style={{ fontSize: "70px", marginLeft: "40px", color: "white", marginTop: "150px" }}>{artist.name}</h1>
            </div>
            <div className='artist-info-container' style={{ marginLeft: "40px" }}>
                <h2 style={{ color: "white" }}>Popular</h2>
                <div className='popular-songs-div' style={{ marginRight: "40px" }}>
                    {!!songs && (
                        topFive.map((song) => {
                            return <div className='one-song' style={{ color: 'white', display: "flex", justifyContent: "space-between", marginLeft: "20px" }}>
                                <div>
                                    {incrementSongNumber()}&nbsp;<img style={{ width: "40px" }} src={song.album.albumPic} />&nbsp;<button onClick={async (e) => await dispatch(audioActions.addSong(song.id))} style={{ background: "none", border: "none", color: "white" }}>{song.name}</button>
                                </div>
                                &nbsp;
                                &nbsp;
                                <div style={{ display: "flex" }}>
                                    time
                                    <div>
                                        <button style={{ background: "none" }} id='song-dropdown' onClick={(e) => activeMenu === song.id ? setActiveMenu(null) : setActiveMenu(song.id)}>...</button>
                                        {activeMenu === song.id && (
                                            <div className='active-song-dropdown'>
                                                <div>
                                                    <Link style={{ textDecoration: "none", color: "gray" }} to={`/album/${song.album.id}`}>Album Page</Link>
                                                    {sessionUser && (
                                                        <button onClick={async (e) => await dispatch(audioActions.nextSong(song.id))} style={{ color: "gray", background: 'none', border: "none", cursor: "pointer" }}>Add to queue</button>
                                                    )}
                                                </div>
                                                <div>
                                                    {sessionUser && (
                                                        <button style={{ color: "gray", background: 'none', border: "none", cursor: "pointer" }} onClick={openMenu}>Add song to playlist</button>
                                                    )}
                                                    {showMenu && (
                                                        <div className='add-song-dropdown'>
                                                            <button style={{ color: "gray", background: 'none', border: "none", cursor: "pointer" }} onClick={createPlaylist}>Create Playlist</button>
                                                            <div style={{ borderBottom: "1px solid white" }}></div>
                                                            {userPlaylistList.map((playlist) => {
                                                                return <button style={{ color: "gray", background: 'none', border: "none", cursor: "pointer" }} onClick={async (e) => {
                                                                    await fetch(`/api/playlists/${playlist.id}/add_song/${song.id}`, {
                                                                        method: "POST"
                                                                    })
                                                                }}>{playlist.name}</button>
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        })
                    )}
                </div>
            </div>
            <div className='discography-container' style={{ marginLeft: "40px" }}>
                <h2 style={{ color: "white" }}>Discography</h2>
                <div className='artist-album-list-container'>
                    {artist?.Albums && (
                        artist.Albums.map((album) => {
                            return <div onClick={(e) => history.push(`/album/${album?.id}`)} className='album-card' style={{ cursor: "pointer", padding: "10px", borderRadius: "10px", border: "1px solid black", width: "max-content" }}>
                                <div className='artist-album-cover-container'>
                                    <img style={{ width: "200px", borderRadius: "10px" }} src={songs[0]?.album?.albumPic} />
                                </div>
                                <div style={{ color: "white" }}>
                                    {album.name}
                                </div>
                                <br />
                                <div style={{ color: "gray" }}>
                                    {album.year}<span>.</span>Album
                                </div>
                            </div>
                        })
                    )}
                </div>
            </div>
            <div className='artist-biography-container' style={{ marginLeft: "40px" }}>
                <h2 style={{ color: "white" }}>About</h2>
                <div className='artist-image-bio' style={{ color: "white", height: "750px", backgroundImage: `url(${artist.artist_img})`, backgroundRepeat: "no-repeat", backgroundSize: "1000px 600px" }}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div style={{ marginLeft: "10%", width: "750px", textShadow: "1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000" }}>
                        {artist.bio}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtistPage
