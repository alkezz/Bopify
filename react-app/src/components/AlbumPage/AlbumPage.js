import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as playlistActions from "../../store/playlist"
import * as audioActions from "../../store/audioplayer"
import "./AlbumPage.css"

const AlbumPage = () => {
    let i = 0
    const [album, setAlbum] = useState([])
    const { albumId } = useParams()
    const [showMenu, setShowMenu] = useState(false)
    const [activeMenu, setActiveMenu] = useState()
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const playlistState = useSelector((state) => state.playlist)
    document.body.style = 'background: #1e1e1e';
    useEffect(() => {
        (async () => {
            const albumResponse = await fetch(`/api/albums/${albumId}`)
            const albumData = await albumResponse.json()
            setAlbum(albumData)
        })();
    }, [setAlbum, albumId])
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

    return (
        <>
            {!!album && (
                <div className='album-page-container' style={{ color: "white", paddingBottom: "80px", marginLeft: "30px", marginRight: "30px" }}>
                    <div className='album-top-header' style={{ backgroundColor: "#393939", display: "flex", flexDirection: "row", width: "100%" }}>
                        <div style={{ width: "250px", height: "250px" }} className='album-image'>
                            <img style={{ width: "250px", height: "250px" }} src={album?.albumPic}></img>
                        </div>
                        <div className='album-info' style={{ marginTop: "130px", marginLeft: "20px", display: "flex", flexDirection: "column" }}>
                            ALBUM
                            <div className='album-name' style={{ fontSize: "60px", fontWeight: "700" }}>
                                {album?.name}
                            </div>
                            <div className='album-artist'>
                                <Link style={{ textDecoration: "none", color: "white" }} to={`/artist/${album?.artist?.id}`}>{album?.artist?.name}</Link><span>.</span> {album?.year} <span>.</span> {album?.Songs?.length} songs
                            </div>
                        </div>
                    </div>
                    <div className='play-like-container'>
                        <div>
                            <button onClick={listenToAlbum} style={{ backgroundColor: "#1e1e1e", border: "none" }}>
                                <i style={{ color: "#1ed760" }} class="fa-solid fa-circle-play fa-4x"></i>
                            </button>
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
                        <div style={{ paddingRight: "20px" }}>
                            <i class="fa-regular fa-clock"></i>
                        </div>
                    </div>
                    <div>
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
                                        <Link onClick={async (e) => await dispatch(audioActions.addSong(song.id))} style={{ textDecoration: "none", color: "white" }}>{song.name}</Link>
                                        &nbsp;
                                        <Link style={{ textDecoration: "none", color: "white" }} to={`/artist/${album.artist.id}`}>{album.artist.name}</Link>
                                    </div>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <i style={{ paddingRight: "20px", color: "#babbbb" }} class="fa-regular fa-heart"></i>
                                    {song.song_length}
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
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export default AlbumPage
