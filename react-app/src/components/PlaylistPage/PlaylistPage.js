import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as playlistActions from "../../store/playlist"
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
    console.log("STATE", playlistState)
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
            const playlistFollowRes = await fetch(`/api/users/${sessionUser.id}/followed-playlists`)
            const playlistFollowsData = await playlistFollowRes.json()
            setFollowingPlaylists(playlistFollowsData.followedPlaylists)
        })();
        setOnePlaylist(await dispatch(playlistActions.getOnePlaylist(playlistId)))
        await dispatch(playlistActions.getAllPlaylists())
    }, [dispatch, playlistId, setFollowingPlaylists, update, setOnePlaylist])
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    console.log("ONEPLATLIST", onePlaylist)
    console.log("FOLLOWED PLATLIST CURRENT USER:", followingPlaylists)
    const playlistArray = Object.values(playlistState)
    const playlist = playlistArray.filter(playlist => Number(playlist.id) === Number(playlistId))[0]
    let userPlaylistList
    if (sessionUser) {
        userPlaylistList = playlistArray.filter(playlist => playlist.User.id === sessionUser.id)
    }
    let heartButton
    console.log(playlist)
    const deletePlaylist = async (e) => {
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
        console.log('yo')
        return i
    }
    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
    }
    if (!!onePlaylist.User) {
        heartButton = (
            <button hidden={sessionUser.id === onePlaylist.User.id} onClick={(e) => { followPlaylist(e); setUpdate(!update) }} style={{ backgroundColor: "#1e1e1e", border: "none", cursor: "pointer" }}>
                <i style={{ color: "#babbbb" }} class="fa-regular fa-heart fa-2x"></i>
            </button>
        )
    }
    if (followingPlaylists.length >= 1) {
        if (!!onePlaylist.User) {
            for (let i = 0; i < followingPlaylists.length; i++) {
                if (followingPlaylists[i].id === Number(playlistId)) {
                    heartButton = (
                        <button hidden={sessionUser.id === onePlaylist.User.id} onClick={(e) => { unfollowPlaylist(e); setUpdate(!update) }} style={{ backgroundColor: "#1e1e1e", border: "none", cursor: "pointer" }}>
                            <i style={{ color: "#1ed760" }} class="fa-solid fa-heart fa-2x"></i>
                        </button>
                    )
                    break
                }
            }
        }
    }
    const followPlaylist = async (e) => {
        e.preventDefault()
        setUpdate(true)
        await fetch(`/api/users/${sessionUser.id}/follow-playlist/${playlistId}`, {
            method: "POST"
        })
    }
    const unfollowPlaylist = async (e) => {
        e.preventDefault()
        setUpdate(true)
        await fetch(`/api/users/${sessionUser.id}/follow-playlist/${playlistId}`, {
            method: "DELETE"
        })
    }

    const deleteSong = async (e, id) => {
        setUpdate(true)
        e.preventDefault()
        await fetch(`/api/playlists/${playlist.id}/delete_song/${id}`, {
            method: "DELETE"
        });
    }
    return (
        <>
            {!!onePlaylist.User && (
                <div className='playlist-container' style={{ color: "white" }}>
                    <EditPlaylistModal playlistId={playlistId} playlist={playlist} onePlaylist={onePlaylist} />
                    <div className='play-like-container'>
                        <div>
                            <button style={{ backgroundColor: "#1e1e1e", border: "none" }}>
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
                            <button hidden={sessionUser.id !== onePlaylist?.User?.id} onClick={deletePlaylist}>DELETE</button>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className='song-list-header-container' style={{ marginBottom: "10px" }}>
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
                                return <div style={{ paddingBottom: "10px", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ width: "300px" }}>
                                        {incrementSongNumber()} <Link to={{ pathname: song.song_url }}>{song.name}</Link>
                                    </div>
                                    <div style={{ marginLeft: "-60px" }}>{song.album.name}</div>
                                    <div>
                                        <i style={{ paddingRight: "20px", color: "#babbbb" }} class="fa-regular fa-heart"></i>
                                        time
                                        {sessionUser && (
                                            <button id='song-dropdown' onClick={(e) => activeMenu === song.id ? setActiveMenu(null) : setActiveMenu(song.id)}>...</button>
                                        )}
                                        {activeMenu === song.id && (
                                            <div className='active-song-dropdown'>
                                                <div>
                                                    <Link to={`/album/${song.album.id}`}>Album Page</Link>
                                                </div>
                                                <button onClick={async (e) => {
                                                    {
                                                        deleteSong(e, song.id);
                                                        setUpdate(!update);
                                                    }
                                                }}>Remove song</button>
                                                <div>
                                                    {sessionUser && (
                                                        <button style={{ border: "none" }} onClick={openMenu}>Add song to playlist</button>
                                                    )}
                                                    {showMenu && (
                                                        <div className='add-song-dropdown'>
                                                            <div>Create Playlist</div>
                                                            <div style={{ borderBottom: "1px solid white" }}></div>
                                                            {userPlaylistList.map((playlist) => {
                                                                return <button onClick={async (e) => {
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
                            })}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default PlaylistPage
