import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./PlaylistPage.css"

const PlaylistPage = () => {
    const dispatch = useDispatch()
    let { playlistId } = useParams()
    const [playlist, setPlaylist] = useState([])
    let i = 0
    useEffect(() => {
        if (!playlistId) {
            return
        }
        if (!playlist) {
            return
        }
        (async () => {
            if (playlistId) {
                const onePlaylist = await fetch(`/api/playlists/${playlistId}/`)
                const data = await onePlaylist.json()
                setPlaylist(data)
            }
        })();
    }, [setPlaylist])
    console.log(playlist)
    if (!playlistId) return null
    const incrementSongNumber = () => {
        i = i + 1
        console.log('yo')
        return i
    }
    return (
        <>
            {!!playlist.User && (
                <div className='playlist-container' style={{ color: "white" }}>
                    <div className='playlist-header-container'>
                        <div id='picture-container'>
                            PLAYLIST IMAGE
                        </div>
                        <div id='playlist-info-container'>
                            <div id='playlist-word-container' style={{ fontSize: "12px" }}>
                                PLAYLIST
                            </div>
                            <div id='playlist-name' style={{ fontSize: "55px", fontWeight: "700" }}>
                                {playlist.name}
                            </div>
                            <div id='playlist-description'>
                                {playlist.description}
                            </div>
                            <div>
                                {playlist.User.username}
                            </div>
                        </div>
                    </div>
                    <div className='play-like-container'>
                        <div>
                            PLAY BUTTON GOES HERE
                        </div>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <div>
                            LIKE BUTTON GOES HERE
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className='song-list-header-container'>
                        <div className='number-icon'>
                            #
                            &nbsp;
                            &nbsp;
                            <div>
                                TITLE
                            </div>
                        </div>
                        <div>
                            ALBUM
                        </div>
                        <div>
                            CLOCK SYMBOL
                        </div>
                    </div>
                    <div>
                        {playlist.Songs.map((song) => {
                            return <div style={{ listStyle: "none" }}>{incrementSongNumber()} <Link to={{ pathname: song.song_url }}>{song.name}</Link> {song.album.name}</div>
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export default PlaylistPage
