import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as playlistActions from "../../store/playlist"


const AlbumPage = () => {
    let i = 0
    const [album, setAlbum] = useState([])
    const { albumId } = useParams()
    const [showMenu, setShowMenu] = useState(false)
    const [activeMenu, setActiveMenu] = useState()
    const sessionUser = useSelector((state) => state.session.user)
    const playlistState = useSelector((state) => state.playlist)
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
    console.log("ALBUM", album)
    let userPlaylistList
    if (sessionUser) {
        const playlistArray = Object.values(playlistState)
        userPlaylistList = playlistArray.filter(playlist => playlist.User.id === sessionUser.id)
    }
    const incrementSongNumber = () => {
        i = i + 1
        console.log('yo')
        return i
    }
    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
    }
    return (
        <>
            {!!album && (
                <div className='album-page-container' style={{ color: "white", paddingBottom: "80px", marginLeft: "30px", marginRight: "30px" }}>
                    <div className='album-top-header' style={{ backgroundColor: "#393939", display: "flex", flexDirection: "row" }}>
                        <div className='album-image'>
                            <img src={album?.albumPic}></img>
                        </div>
                        <div className='album-info'>
                            ALBUM
                            <div className='album-name' style={{ fontSize: "60px", fontWeight: "700" }}>
                                {album?.name}
                            </div>
                            <div className='album-artist'>
                                <Link to={`/artist/${album?.artist?.id}`}>{album?.artist?.name}</Link><span>.</span> {album?.year} <span>.</span> {album?.Songs?.length} songs
                            </div>
                        </div>
                    </div>
                    <div className='play-like-container'>
                        <div>
                            <button style={{ backgroundColor: "#1e1e1e", border: "none" }}>
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
                            return <div style={{ paddingBottom: "10px", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                                <div style={{ width: "300px", display: "flex", flexDirection: "row" }}>
                                    {incrementSongNumber()}
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <Link style={{ textDecoration: "none", color: "white" }} to={{ pathname: song.song_url }}>{song.name}</Link>
                                        &nbsp;
                                        <Link style={{ textDecoration: "none", color: "white" }} to={`/artist/${album.artist.id}`}>{album.artist.name}</Link>
                                        &nbsp;
                                    </div>
                                </div>
                                <div>
                                    <i style={{ paddingRight: "20px", color: "#babbbb" }} class="fa-regular fa-heart"></i>
                                    time
                                    <div>
                                        <button id='song-dropdown' onClick={(e) => activeMenu === song.id ? setActiveMenu(null) : setActiveMenu(song.id)}>...</button>
                                        {activeMenu === song.id && (
                                            <div className='active-song-dropdown'>
                                                <div>
                                                    <Link to={`/album/${song.album.id}`}>Album Page</Link>
                                                </div>
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
                            </div>
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export default AlbumPage
