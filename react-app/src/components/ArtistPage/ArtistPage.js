import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as playlistActions from "../../store/playlist"
import "./ArtistPage.css"

const ArtistPage = () => {
    const { artistId } = useParams()
    const [artist, setArtist] = useState([])
    const [songs, setSongs] = useState([])
    const [showMenu, setShowMenu] = useState(false)
    const [activeMenu, setActiveMenu] = useState()
    const sessionUser = useSelector((state) => state.session.user)
    const playlistState = useSelector((state) => state.playlist)
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
    if (sessionUser) {
        const playlistArray = Object.values(playlistState)
        userPlaylistList = playlistArray.filter(playlist => playlist.User.id === sessionUser.id)
    }
    console.log(userPlaylistList)
    const topFive = songs.slice(0, 5)
    console.log(topFive)
    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
    }
    const incrementSongNumber = () => {
        i = i + 1
        return i
    }
    return (
        <div className='artist-container' style={{ overflowX: "hidden" }}>
            <div className='header-container' style={{ backgroundImage: `url(${artist.artist_img})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 500px" }}>
                <h1>{artist.name}</h1>
            </div>
            <div className='artist-info-container'>
                <h2 style={{ color: "white" }}>Popular</h2>
                <div className='popular-songs-div' style={{ marginRight: "40px" }}>
                    {!!songs && (
                        topFive.map((song) => {
                            return <div className='one-song' style={{ color: 'white', display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    {incrementSongNumber()}&nbsp;{ }&nbsp;<Link to={{ pathname: song.song_url }} style={{ textDecoration: "none" }}>{song.name}</Link>
                                </div>
                                &nbsp;
                                &nbsp;
                                <div style={{ display: "flex" }}>
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
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default ArtistPage
