import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import * as songLikeActions from "../../store/songlikes"
import * as audioActions from "../../store/audioplayer"
import * as playlistActions from "../../store/playlist"
import "./LikedSongs.css"

const LikedSongs = () => {
    let i = 0
    const location = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()
    const [likedSongsList, setLikedSongsList] = useState([])
    const [update, setUpdate] = useState(true)
    const [showMenu, setShowMenu] = useState(false)
    const [activeMenu, setActiveMenu] = useState()
    const [isVisible, setIsVisible] = useState(false)
    const [addedToQueue, setAddedToQueue] = useState(false)
    const likedSongs = useSelector((state) => state.likedSongReducer)
    const sessionUser = useSelector((state) => state.session.user)
    const playlistState = useSelector((state) => state.playlist)
    document.body.style = 'background: #1e1e1e';
    let likedSongsState
    useEffect(async () => {
        if (sessionUser) {
            likedSongsState = await dispatch(songLikeActions.getLikesSongs(sessionUser.id))
            setLikedSongsList(likedSongsState)
        }
    }, [sessionUser, dispatch, setLikedSongsList, update, setUpdate, likedSongsState])
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    const playlistArray = Object.values(playlistState)
    let userPlaylistList
    let userPlaylistLength
    if (sessionUser) {
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
    const incrementSongNumber = () => {
        i = i + 1
        return i
    }
    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
    }
    const unlikeSong = async (e, id) => {
        setUpdate(true)
        e.preventDefault()
        await dispatch(songLikeActions.unlikeSong(sessionUser.id, id))
        setLikedSongsList(await dispatch(songLikeActions.getLikesSongs(sessionUser.id)))
    }
    const listenToLikes = async (e) => {
        e.preventDefault()
        await dispatch(audioActions.addLikes(sessionUser.id))
    }
    if (likedSongsList?.likedSongs?.length >= 1) {
        return (
            <div className='liked-songs-page-container' style={{ color: "white", paddingBottom: "80px", width: "100%" }}>
                <div className='liked-songs-header' style={{ display: "flex", paddingLeft: "60px", paddingTop: "50px", paddingBottom: "20px" }}>
                    <div className='image-container' style={{ marginBottom: "10px" }}>
                        <img src='https://ali-practice-aws-bucket.s3.amazonaws.com/likedSongsPicture.png' style={{ height: "100%" }}></img>
                    </div>
                    <div className='liked-songs-info-container' style={{ marginLeft: "20px", display: "flex", flexDirection: "column" }}>
                        <h1 style={{ color: "white", fontSize: "13px", marginBottom: "-50px", marginTop: "70px" }}>PLAYLIST</h1>
                        <h1 style={{ fontSize: "75px", fontWeight: "700" }}>Liked Songs</h1>
                        <span><Link style={{ textDecoration: "none", color: "white" }} to={`/user/${sessionUser.id}`}>{sessionUser.username}</Link>&nbsp;&nbsp;&nbsp;{likedSongsList.likedSongs.length} songs</span>
                    </div>
                </div>
                <div className='play-button-container' style={{ paddingLeft: "60px", height: "100px" }}>
                    <div>
                        <button style={{ border: "none", background: "none" }}>
                            <i style={{ color: "#1ed760", cursor: "pointer" }} onClick={listenToLikes} class="fa-solid fa-circle-play fa-4x"></i>
                        </button>
                    </div>
                </div>
                <div className='song-list-header-container' style={{ paddingLeft: "30px", marginRight: "-95px" }}>
                    <div className='number-icon'>
                        <div>
                            #
                            &nbsp;
                            &nbsp;
                            TITLE
                        </div>
                    </div>
                    <div>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        ALBUM
                    </div>
                    <div style={{ paddingRight: "20px" }}>
                        <i class="fa-regular fa-clock"></i>
                    </div>
                </div>
                <div className='liked-songs-list' style={{ marginLeft: "20px", marginTop: "1.5vh" }}>
                    {likedSongsList.likedSongs && (
                        <div>
                            {likedSongsList.likedSongs.map((song) => {
                                return <div className='playlist-song-container' style={{ paddingBottom: "10px", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ width: "300px", marginLeft: "10px", display: "flex", alignItems: "center" }}>
                                        <div style={{ width: "10px" }}>{incrementSongNumber()}</div>&nbsp;&nbsp;<img style={{ width: "30px" }} src={song.album.albumPic} />&nbsp;&nbsp;<Link onClick={async (e) => await dispatch(audioActions.addSong(song.id))} style={{ textDecoration: "none", color: "white" }}>{song.name}</Link>
                                    </div>
                                    <div style={{ marginLeft: "-70px" }}><Link style={{ textDecoration: "none", color: "white" }} to={`/album/${song.album.id}`}>{song.album.name}</Link></div>
                                    <div style={{ display: "flex", marginRight: "-75px" }}>
                                        <i onClick={(e) => { unlikeSong(e, song.id); setUpdate(!update) }} style={{ paddingRight: "20px", color: "#1ed760", cursor: "pointer" }} class="fa-solid fa-heart"></i>
                                        <span style={{ width: "50px" }}>{song.song_length}</span>
                                        {sessionUser && (
                                            <button style={{ background: "none", marginBottom: "20px" }} id='song-dropdown' onClick={(e) => activeMenu === song.id ? setActiveMenu(null) : setActiveMenu(song.id)}>...</button>
                                        )}
                                        {activeMenu === song.id && (
                                            <div className='active-playlist-song-dropdown'>
                                                <div>
                                                    <Link className="yes" to={`/album/${song.album.id}`}>Album Page</Link>
                                                    <br />
                                                    {sessionUser && (
                                                        <button className="add-to-queue-button" onClick={async (e) => {
                                                            await dispatch(audioActions.nextSong(song.id)); setAddedToQueue(true); setTimeout(() => {
                                                                setAddedToQueue(false)
                                                            }, 1500)
                                                        }} >Add to queue</button>
                                                    )}
                                                </div>
                                                <div>
                                                    {sessionUser && (
                                                        <button className='add-song-to-playlist-button' onClick={openMenu}>Add song to playlist</button>
                                                    )}
                                                    {showMenu && (
                                                        <div className='add-song-dropdown'>
                                                            <button className="create-playlist-button-dropdown" onClick={createPlaylist}>Create Playlist</button>
                                                            <div style={{ borderBottom: "1px solid white" }}></div>
                                                            {userPlaylistList.map((playlist) => {
                                                                return <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                                                    <button className="create-playlist-button-dropdown" onClick={async (e) => {
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
                            })}
                        </div>
                    )}
                </div>
                {isVisible && (
                    <div style={{ marginTop: "300px" }} id='song-added-div' hidden>
                        <div style={{ display: "flex", alignItems: "center", fontWeight: "700" }}>Added to Playlist</div>
                    </div>
                )}
                {addedToQueue && (
                    <div style={{ marginTop: "300px" }} id='song-added-div' hidden>
                        <div style={{ display: "flex", alignItems: "center", fontWeight: "700" }}>Added to Queue</div>
                    </div>
                )}
            </div>
        )
    } else {
        return (
            <div className='liked-songs-page-container' style={{ color: "white", paddingBottom: "80px", width: "100%" }}>
                <div className='liked-songs-header' style={{ display: "flex", paddingLeft: "60px", paddingTop: "50px", paddingBottom: "20px" }}>
                    <div className='image-container' style={{ marginBottom: "10px" }}>
                        <img src='https://ali-practice-aws-bucket.s3.amazonaws.com/likedSongsPicture.png' style={{ height: "100%" }}></img>
                    </div>
                    <div className='liked-songs-info-container' style={{ marginLeft: "20px", display: "flex", flexDirection: "column" }}>
                        <h1 style={{ color: "white", fontSize: "13px", marginBottom: "-50px", marginTop: "70px" }}>PLAYLIST</h1>
                        <h1 style={{ fontSize: "75px", fontWeight: "700" }}>Liked Songs</h1>
                        <Link style={{ textDecoration: "none", color: "white" }} onClick={(e) => history.push(`/user/${sessionUser.id}`)}>{sessionUser.username}</Link>
                    </div>
                </div>
                <div className='play-button-container' style={{ paddingLeft: "60px", height: "100px" }}>
                </div>
                <div className='song-list-header-container' style={{ marginLeft: "55px", marginRight: "55px" }}>
                    <div className='number-icon'>
                        <div>
                            #
                            &nbsp;
                            &nbsp;
                            TITLE
                        </div>
                    </div>
                    <div>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        ALBUM
                    </div>
                    <div style={{ paddingRight: "20px" }}>
                        <i class="fa-regular fa-clock"></i>
                    </div>
                </div>
                <div className='no-liked-songs-body' style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <h1>You don't have any liked songs.</h1>
                    <br />
                    <h2 style={{ marginTop: "-10px" }}>Why don't you try adding some</h2>
                </div>
            </div>
        )
    }
}

export default LikedSongs
