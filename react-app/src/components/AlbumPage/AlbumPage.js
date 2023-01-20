import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as playlistActions from "../../store/playlist"
import * as audioActions from "../../store/audioplayer"
import "./AlbumPage.css"
import * as songLikeActions from '../../store/songlikes';
import FourZeroFourPage from '../404Page/404Page';


const AlbumPage = () => {
    let i = 0
    const topNav = document.getElementById("top-navbar")
    const [album, setAlbum] = useState([])
    const { albumId } = useParams()
    const location = useLocation()
    const [showMenu, setShowMenu] = useState(false)
    const [activeMenu, setActiveMenu] = useState()
    const [isVisible, setIsVisible] = useState(false)
    const [addedToQueue, setAddedToQueue] = useState(false)
    const [update, setUpdate] = useState(true)
    const [likedSongsList, setLikedSongsList] = useState([])
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const playlistState = useSelector((state) => state.playlist)
    const likedSongs = useSelector((state) => state.likedSongReducer)
    document.body.style = 'background: #1e1e1e';
    useEffect(() => {
        (async () => {
            if (albumId <= 7) {
                const albumResponse = await fetch(`/api/albums/${albumId}`)
                const albumData = await albumResponse.json()
                setAlbum(albumData)
                if (sessionUser) {
                    setLikedSongsList(await dispatch(songLikeActions.getLikesSongs(sessionUser.id)))
                }
            }
        })();
    }, [setAlbum, albumId, update, setUpdate, sessionUser, dispatch, setLikedSongsList])
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    if (albumId > 7) {
        return (
            <FourZeroFourPage />
        )
    }
    if (location.pathname.includes("album") && topNav) {
        topNav.style.backgroundImage = `url(${album.albumPic})`
        topNav.style.backgroundSize = "0.5px 0.5px"
    }
    let userPlaylistList
    let heartButton
    let userPlaylistLength
    let likedSongsArray = Object.values(likedSongs)
    if (sessionUser) {
        const playlistArray = Object.values(playlistState)
        userPlaylistList = playlistArray.filter(playlist => playlist?.User?.id === sessionUser.id)
        userPlaylistLength = userPlaylistList.length + 1
    }
    const incrementSongNumber = () => {
        i = i + 1
        return i
    }
    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
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

    const listenToAlbum = async (e) => {
        e.preventDefault()
        await dispatch(audioActions.addAlbum(albumId))
    }

    // if (sessionUser) {
    //     if (likedSongReducer)
    // }

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
        <>
            {!!album && (
                <div className='album-page-container' style={{ color: "white", paddingBottom: "80px", marginRight: "30px", width: "103.5%" }}>
                    <div className='album-top-header' style={{ backgroundImage: `url(${album.albumPic})`, backgroundSize: "0.5px 0.5px", display: "flex", flexDirection: "row", width: "108.95%", paddingBottom: "20px" }}>
                        <div style={{ width: "250px", height: "250px", paddingLeft: "30px", marginTop: "30px" }}>
                            <img id='album-page-image' style={{ width: "250px", height: "250px" }} src={album?.albumPic}></img>
                        </div>
                        <div className='album-info' style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)", marginTop: "130px", marginLeft: "20px", display: "flex", flexDirection: "column" }}>
                            ALBUM
                            <div className='album-name' style={{ fontSize: "60px", fontWeight: "700" }}>
                                {album?.name}
                            </div>
                            <div className='album-artist'>
                                <Link style={{ textDecoration: "none", color: "white" }} to={`/artist/${album?.artist?.id}`}>{album?.artist?.name}</Link><span style={{ marginLeft: "4px" }}>·</span> {album?.year} <span>·</span> {album?.Songs?.length} songs
                            </div>
                        </div>
                    </div>
                    <div style={{ paddingLeft: "30px" }} className='play-like-container'>
                        <div>
                            <button hidden={!sessionUser} onClick={listenToAlbum} style={{ backgroundColor: "#1e1e1e", border: "none", cursor: "pointer" }}>
                                <i style={{ color: "#1ed760" }} class="fa-solid fa-circle-play fa-4x"></i>
                            </button>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className='song-list-header-container' style={{ paddingLeft: "30px", marginRight: "-95px", paddingRight: "90px" }}>
                        <div className='number-icon'>
                            <div>
                                #
                                &nbsp;
                                &nbsp;
                                TITLE
                            </div>
                        </div>
                        <div style={{ paddingRight: "20px" }}>
                            <i class="fa-regular fa-clock"></i>
                        </div>
                    </div>
                    <div style={{ paddingLeft: "30px", paddingTop: "1.5vh" }}>
                        {/* {onePlaylist.Songs.map((song) => {
                                return <div style={{ paddingBottom: "10px", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ width: "300px" }}>
                                        {incrementSongNumber()} <Link to={{ pathname: song.song_url }}>{song.name}</Link>
                                    </div>
                                    </div>
                            } */}
                        {album?.Songs?.map((song) => {
                            return <div className='song-album-container' style={{ paddingBottom: "10px", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                                <div style={{ width: "300px", display: "flex", flexDirection: "row" }}>
                                    {incrementSongNumber()}
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        {sessionUser && (
                                            <Link onClick={async (e) => await dispatch(audioActions.addSong(song.id))} style={{ textDecoration: "none", color: "white" }}>{song.name}</Link>
                                        )}
                                        {!sessionUser && (
                                            <Link to="/login" style={{ textDecoration: "none", color: "white" }}>{song.name}</Link>
                                        )}
                                        <Link style={{ textDecoration: "none", color: "white", marginTop: "8px" }} to={`/artist/${album.artist.id}`}>{album.artist.name}</Link>
                                    </div>
                                </div>
                                <div style={{ display: "flex", marginRight: "-40px" }}>
                                    {sessionUser && (
                                        likedSongsList?.likedSongs?.some(e => e.id === song.id) ? <i onClick={(e) => { unlikeSong(e, song.id); setUpdate(!update) }} style={{ paddingRight: "20px", color: "#1ed760", cursor: "pointer" }} class="fa-solid fa-heart"></i> : <i onClick={(e) => { likeSong(e, song.id); setUpdate(!update) }} style={{ paddingRight: "20px", color: "#babbbb", cursor: "pointer" }} class="fa-regular fa-heart"></i>
                                    )}
                                    {/* {likedSongsList?.likedSongs?.some(likedSong => likedSong.id === song.id) && (
                                        <i onClick={(e) => { unlikeSong(e, song.id); setUpdate(!update) }} style={{ paddingRight: "20px", color: "#babbbb" }} class="fa-solid fa-heart"></i>
                                    )}
                                    {likedSongsList?.likedSongs?.some(likedSong => likedSong.id !== song.id) && (
                                        <i onClick={(e) => { likeSong(e, song.id); setUpdate(!update) }} style={{ paddingRight: "20px", color: "#babbbb" }} class="fa-regular fa-heart"></i>
                                    )} */}
                                    <span style={{ width: "50px" }}>{song.song_length}</span>
                                    <div>
                                        <button style={{ background: "none" }} id='song-dropdown' onClick={(e) => activeMenu === song.id ? setActiveMenu(null) : setActiveMenu(song.id)}>...</button>
                                        {activeMenu === song.id && (
                                            <div className='active-song-dropdown'>
                                                <div>
                                                    <Link style={{ textDecoration: "none", color: "gray" }} to={`/album/${song.album.id}`}>Album Page</Link>
                                                    {sessionUser && (
                                                        <button onClick={async (e) => {
                                                            await dispatch(audioActions.nextSong(song.id));
                                                            setAddedToQueue(true)
                                                            setTimeout(() => {
                                                                setAddedToQueue(false)
                                                            }, 1500)

                                                        }} style={{ color: "gray", background: 'none', border: "none", cursor: "pointer" }}>Add to queue</button>
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
                                                                        setIsVisible(true);
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
                        })}
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
            )}
        </>
    )
}

export default AlbumPage
