import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as playlistActions from "../../store/playlist"
import * as followedPlaylistActions from "../../store/followedplaylists"
import * as audioActions from "../../store/audioplayer"
import EditPlaylistModal from "./EditPlaylistModal"
import "./PlaylistPage.css"

const PlaylistPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    let { playlistId } = useParams()
    const [onePlaylist, setOnePlaylist] = useState([])
    const [showMenu, setShowMenu] = useState(false)
    const [activeMenu, setActiveMenu] = useState()
    const [update, setUpdate] = useState(true)
    const [followingPlaylists, setFollowingPlaylists] = useState([])
    const playlistState = useSelector((state) => state.playlist)
    const sessionUser = useSelector((state) => state.session.user)
    const songState = useSelector((state) => state)
    const followedPlaylistState = useSelector((state) => state.followedPlaylists)
    document.body.style = 'background: #1e1e1e';
    let i = 0
    useEffect(async () => {
        if (!playlistId) {
            return null
        }
        if (!playlistState) {
            return null
        }
        // (async () => {
        //     if (playlistId) {
        //         const onePlaylist = await fetch(`/api/playlists/${playlistId}/`)
        //         const data = await onePlaylist.json()
        //         setPlaylist(data)
        //     }
        // })();
        (async () => {
            if (sessionUser) {
                // const playlistFollowRes = await fetch(`/api/users/${sessionUser.id}/followed-playlists`)
                // const playlistFollowsData = await playlistFollowRes.json()
                const playlistFollowsData = await dispatch(followedPlaylistActions.getFollowedPlaylists(sessionUser.id))
                await setFollowingPlaylists(playlistFollowsData.followedPlaylists)
            }
        })();
        setOnePlaylist(await dispatch(playlistActions.getOnePlaylist(playlistId)))
        await dispatch(playlistActions.getAllPlaylists())
    }, [dispatch, playlistId, setFollowingPlaylists, setUpdate, update, setOnePlaylist, sessionUser?.id])
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    const playlistArray = Object.values(playlistState)
    const playlist = playlistArray.filter(playlist => Number(playlist.id) === Number(playlistId))[0]
    let userPlaylistList
    let userPlaylistLength
    let userPlaylistListNoDuplicate
    if (sessionUser) {
        userPlaylistList = playlistArray.filter(playlist => playlist?.User?.id === sessionUser.id)
        userPlaylistLength = userPlaylistList.length + 1
        userPlaylistListNoDuplicate = userPlaylistList.filter(playlist => playlist.id !== Number(playlistId))
    }
    let heartButton
    const deletePlaylist = async (e) => {
        setUpdate(true)
        e.preventDefault()
        const deleted = await dispatch(playlistActions.deletePlaylist(playlistId))
        if (deleted) {
            history.push("/")
            await dispatch(playlistActions.getAllPlaylists())
        }
    }
    if (!playlistId) return null
    const incrementSongNumber = () => {
        i = i + 1
        return i
    }
    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
    }
    // if (!!onePlaylist.User && sessionUser) {
    //     heartButton = (
    //         <button hidden={sessionUser.id === onePlaylist.User.id} onClick={(e) => { followPlaylist(e); setUpdate(!update) }} style={{ backgroundColor: "#1e1e1e", border: "none", cursor: "pointer" }}>
    //             <i style={{ color: "#babbbb" }} class="fa-regular fa-heart fa-2x"></i>
    //         </button>
    //     )
    // }
    let followedPlaylistArray = Object.values(followedPlaylistState)
    if (sessionUser) {
        if (followedPlaylistArray.length >= 1) {
            if (!!onePlaylist.User) {
                if (followedPlaylistArray.some((e) => e.id === Number(playlistId))) {
                    heartButton = (
                        <button hidden={sessionUser?.id === onePlaylist?.User?.id} onClick={(e) => { unfollowPlaylist(e); setUpdate(!update); }} style={{ backgroundColor: "#1e1e1e", border: "none", cursor: "pointer" }}>
                            <i style={{ color: "#1ed760" }} class="fa-solid fa-heart fa-2x"></i>
                        </button>
                    )
                } else {
                    heartButton = (
                        <button hidden={sessionUser.id === onePlaylist.User.id} onClick={(e) => { followPlaylist(e); setUpdate(!update); }} style={{ backgroundColor: "#1e1e1e", border: "none", cursor: "pointer" }}>
                            <i style={{ color: "#babbbb" }} class="fa-regular fa-heart fa-2x"></i>
                        </button>
                    )
                }
            }
        } else {
            heartButton = (
                <button hidden={sessionUser?.id === onePlaylist?.User?.id} onClick={(e) => { followPlaylist(e); setUpdate(!update); }} style={{ backgroundColor: "#1e1e1e", border: "none", cursor: "pointer" }}>
                    <i style={{ color: "#babbbb" }} class="fa-regular fa-heart fa-2x"></i>
                </button>
            )
        }
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

    const followPlaylist = async (e) => {
        e.preventDefault()
        setUpdate(true)
        // await fetch(`/api/users/${sessionUser.id}/follow-playlist/${playlistId}`, {
        //     method: "POST"
        // })
        await dispatch(followedPlaylistActions.followPlaylist(sessionUser.id, playlistId))
        await dispatch(followedPlaylistActions.getFollowedPlaylists(sessionUser.id))
    }
    const unfollowPlaylist = async (e) => {
        e.preventDefault()
        setUpdate(true)
        // await fetch(`/api/users/${sessionUser.id}/follow-playlist/${playlistId}`, {
        //     method: "DELETE"
        // })
        await dispatch(followedPlaylistActions.unfollowPlaylist(sessionUser.id, Number(playlistId)))
        await dispatch(followedPlaylistActions.getFollowedPlaylists(sessionUser.id))
    }

    const deleteSong = async (e, id) => {
        setUpdate(true)
        e.preventDefault()
        await fetch(`/api/playlists/${playlist.id}/delete_song/${id}`, {
            method: "DELETE"
        });
    }

    const listenToPlaylist = async (e) => {
        e.preventDefault()
        await dispatch(audioActions.addPlaylist(playlistId))
    }

    return (
        <>
            {!!onePlaylist.User && (
                <div className='playlist-container' style={{ color: "white" }}>
                    {sessionUser?.id === onePlaylist?.User?.id && (
                        <EditPlaylistModal playlistId={playlistId} playlist={playlist} onePlaylist={onePlaylist} />
                    )}
                    {sessionUser?.id !== onePlaylist?.User?.id && (
                        <div className='playlist-header-container'>
                            <div id='picture-container'>
                                <img style={{ width: "200px", height: "210px" }} src={playlist.playlist_img} />
                                {/* <EditPlaylistModal playlistId={playlistId} playlist={playlist} /> */}
                            </div>
                            <div id='playlist-info-container'>
                                <div id='playlist-word-container' style={{ fontSize: "12px" }}>
                                    PLAYLIST
                                </div>
                                <div id='playlist-name' style={{ fontSize: "70px", fontWeight: "700", textDecoration: "none" }}>
                                    {playlist.name}
                                </div>
                                <div id='playlist-description'>
                                    {playlist.description}
                                </div>
                                <div>
                                    <Link style={{ textDecoration: "none", color: "white" }} to={`/user/${onePlaylist?.User?.id}`}>
                                        {onePlaylist?.User?.username}
                                    </Link>
                                    <span style={{ fontSize: "20px" }}>·</span>
                                    {onePlaylist?.Songs && (
                                        <span>{onePlaylist?.Songs?.length} songs</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='play-like-container'>
                        <div>
                            <button hidden={!sessionUser} onClick={listenToPlaylist} style={{ backgroundColor: "#1e1e1e", border: "none" }}>
                                <i style={{ color: "#1ed760" }} class="fa-solid fa-circle-play fa-4x"></i>
                            </button>
                        </div>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <div style={{ marginTop: "12px" }}>
                            {heartButton}
                        </div>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <div>
                            {sessionUser && (
                                <button className='delete-playlist-button' hidden={sessionUser.id !== onePlaylist?.User?.id} onClick={(e) => { deletePlaylist(e); setUpdate(!update); }}>DELETE</button>
                            )}
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className='song-list-header-container'>
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
                    {onePlaylist.Songs && (
                        <div>
                            {onePlaylist.Songs.map((song) => {
                                return <div className='playlist-song-container' style={{ paddingBottom: "10px", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ width: "300px" }}>
                                        {incrementSongNumber()}&nbsp;<Link onClick={async (e) => await dispatch(audioActions.addSong(song.id))} style={{ textDecoration: "none", color: "white" }}>{song.name}</Link>
                                    </div>
                                    <div style={{ marginLeft: "-60px" }}><Link style={{ textDecoration: "none", color: "white" }} to={`/album/${song.album.id}`}>{song.album.name}</Link></div>
                                    <div style={{ display: "flex" }}>
                                        <i style={{ paddingRight: "20px", color: "#babbbb" }} class="fa-regular fa-heart"></i>
                                        <span>{song.song_length}</span>
                                        {sessionUser && (
                                            <button style={{ background: "none" }} id='song-dropdown' onClick={(e) => activeMenu === song.id ? setActiveMenu(null) : setActiveMenu(song.id)}>...</button>
                                        )}
                                        {activeMenu === song.id && (
                                            <div className='active-playlist-song-dropdown'>
                                                <div>
                                                    <Link style={{ textDecoration: "none", color: "gray" }} to={`/album/${song.album.id}`}>Album Page</Link>
                                                </div>
                                                <button hidden={sessionUser.id !== onePlaylist.User.id} style={{ background: 'none', color: "gray", cursor: "pointer" }} onClick={async (e) => {
                                                    {
                                                        deleteSong(e, song.id);
                                                        setUpdate(!update);
                                                    }
                                                }}>Remove song</button>
                                                <div>
                                                    {sessionUser && (
                                                        <button style={{ color: "gray", background: 'none', border: "none", cursor: "pointer" }} onClick={openMenu}>Add song to playlist</button>
                                                    )}
                                                    {showMenu && (
                                                        <div className='add-song-dropdown'>
                                                            <button style={{ color: "gray", background: 'none', border: "none", cursor: "pointer" }} onClick={createPlaylist}>Create Playlist</button>
                                                            <div style={{ borderBottom: "1px solid white" }}></div>
                                                            {userPlaylistListNoDuplicate.map((playlist) => {
                                                                return <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                                                    <button style={{ color: "gray", background: 'none', border: "none", cursor: "pointer" }} onClick={async (e) => {
                                                                        await fetch(`/api/playlists/${playlist.id}/add_song/${song.id}`, {
                                                                            method: "POST"
                                                                        })
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
            )}
        </>
    )
}

export default PlaylistPage
