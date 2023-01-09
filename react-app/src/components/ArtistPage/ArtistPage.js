import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as playlistActions from "../../store/playlist"
import * as audioActions from "../../store/audioplayer"
import * as songLikeActions from '../../store/songlikes';
import FourZeroFourPage from '../404Page/404Page';
import "./ArtistPage.css"


const ArtistPage = () => {
    const topNav = document.getElementById("top-navbar")
    const { artistId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()
    const [artist, setArtist] = useState([])
    const [songs, setSongs] = useState([])
    const [showMenu, setShowMenu] = useState(false)
    const [activeMenu, setActiveMenu] = useState()
    const [isVisible, setIsVisible] = useState(false)
    const [addedToQueue, setAddedToQueue] = useState(false)
    const [likedSongsList, setLikedSongsList] = useState([])
    const [update, setUpdate] = useState(true)
    const sessionUser = useSelector((state) => state.session.user)
    const playlistState = useSelector((state) => state.playlist)
    const likedSongs = useSelector((state) => state.likedSongReducer)
    document.body.style = 'background: #1e1e1e';
    let i = 0
    useEffect(() => {
        (async () => {
            if (artistId <= 7) {
                const artistResponse = await fetch(`/api/artists/${artistId}`)
                const artistData = await artistResponse.json()
                setArtist(artistData)
            }
        })();
        (async () => {
            const songResponse = await fetch(`/api/artists/${artistId}/songs`)
            const songData = await songResponse.json()
            setSongs(songData.Albums[0].Songs)
        })();
        (async () => {
            if (artistId <= 7) {
                if (sessionUser) {
                    setLikedSongsList(await dispatch(songLikeActions.getLikesSongs(sessionUser.id)))
                }
            }
        })();
    }, [setArtist, setSongs, setLikedSongsList, update, dispatch, setUpdate, artistId, sessionUser])
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    if (artistId > 7 || artistId <= 0) {
        return (
            <FourZeroFourPage />
        )
    }
    if (location.pathname.includes("artist") && topNav) {
        topNav.style.backgroundImage = `url(${artist.artist_img})`
        topNav.style.backgroundSize = "0.5px 0.5px"
    }
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
    const topFive = songs.slice(0, 5)
    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
    }
    const incrementSongNumber = () => {
        i = i + 1
        return i
    }
    const likeSong = async (e, id) => {
        e.preventDefault()
        setUpdate(true)
        await dispatch(songLikeActions.likeSong(sessionUser.id, id))
        await dispatch(songLikeActions.getLikesSongs(sessionUser.id))
    }

    const unlikeSong = async (e, id) => {
        e.preventDefault()
        setUpdate(true)
        await dispatch(songLikeActions.unlikeSong(sessionUser.id, id))
        await dispatch(songLikeActions.getLikesSongs(sessionUser.id))
    }
    return (
        <div className='artist-container' style={{ overflowX: "hidden", paddingBottom: "80px", width: "106.65%" }}>
            <div className='header-container' style={{ backgroundImage: `url(${artist.artist_img})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 500px" }}>
                <h1 style={{ fontSize: "70px", marginLeft: "65px", color: "white", marginTop: "150px", textShadow: "3px 3px 2px rgba(0, 0, 0, 1)" }}>{artist.name}</h1>
            </div>
            <div className='artist-info-container' style={{ marginLeft: "40px" }}>
                <h2 style={{ color: "white" }}>Popular</h2>
                <div className='popular-songs-div' style={{ marginRight: "40px" }}>
                    {!!songs && (
                        topFive.map((song) => {
                            return <div className='one-song' style={{ color: 'white', display: "flex", justifyContent: "space-between", marginLeft: "20px" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ width: "10px" }}>{incrementSongNumber()}</div>&nbsp;<img style={{ width: "40px" }} src={song.album.albumPic} />&nbsp;<button onClick={async (e) => await dispatch(audioActions.addSong(song.id))} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>{song.name}</button>
                                </div>
                                &nbsp;
                                &nbsp;
                                <div style={{ display: "flex" }}>
                                    {sessionUser && (
                                        likedSongsList?.likedSongs?.some(e => e.id === song.id) ? <i onClick={(e) => { unlikeSong(e, song.id); setUpdate(!update) }} style={{ paddingRight: "20px", color: "#1ed760", cursor: "pointer" }} class="fa-solid fa-heart"></i> : <i onClick={(e) => { likeSong(e, song.id); setUpdate(!update) }} style={{ paddingRight: "20px", color: "#babbbb", cursor: "pointer" }} class="fa-regular fa-heart"></i>
                                    )}
                                    <span style={{ width: "40px" }}>{song.song_length}</span>
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
                                                                return <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                                                    <button style={{ color: "gray", background: 'none', border: "none", cursor: "pointer" }} onClick={async (e) => {
                                                                        await fetch(`/api/playlists/${playlist.id}/add_song/${song.id}`, {
                                                                            method: "POST"
                                                                        });
                                                                        setIsVisible(true)
                                                                        setTimeout(() => {
                                                                            setIsVisible(false)
                                                                        }, 1500)
                                                                    }}>{playlist.name}</button>
                                                                </div>
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
                    {isVisible && (
                        <div id='song-added-div' hidden>
                            <div style={{ display: "flex", alignItems: "center", fontWeight: "700" }}>Added to Playlist</div>
                        </div>
                    )}
                    {addedToQueue && (
                        <div id='song-added-div' hidden>
                            <div style={{ display: "flex", alignItems: "center", fontWeight: "700" }}>Added to Queue</div>
                        </div>
                    )}
                </div>
            </div>
            <div className='discography-container' style={{ marginLeft: "40px" }}>
                <h2 style={{ color: "white" }}>Discography</h2>
                <div className='artist-album-list-container'>
                    {artist?.Albums && (
                        artist.Albums.map((album) => {
                            return <div onClick={(e) => history.push(`/album/${album?.id}`)} className='album-card' style={{ cursor: "pointer", width: "fit-content" }}>
                                <div className='album-image-container'>
                                    <img className='album-image' src={songs[0]?.album?.albumPic} />
                                    <p style={{ marginLeft: "15px", fontWeight: "700" }}>{album.name}</p>
                                    <span style={{ marginLeft: "15px", paddingBottom: "20px" }}>{album.year} - {album.artist.name}</span>
                                </div>
                            </div>
                        })
                    )}
                </div>
            </div>
            <div className='artist-biography-container' style={{ marginLeft: "40px" }}>
                <h2 style={{ color: "white" }}>About</h2>
                <div className='artist-image-bio' style={{ color: "white", marginRight: "500px", fontSize: "18px" }}>
                    {artist.bio}
                </div>
            </div>
        </div>
    )
}

export default ArtistPage
