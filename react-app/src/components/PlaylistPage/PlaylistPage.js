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
    }, [playlistId])
    const deletePlaylist = async (e) => {
        e.preventDefault()
        const deleted = await dispatch(playlistActions.deletePlaylist(playlistId))
        if (deleted) {
            await dispatch(playlistActions.getAllPlaylists())
            history.push("/")
        }
    }
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
                            <EditPlaylistModal playlistId={playlistId} playlist={playlist} />
                        </div>
                        <div id='playlist-info-container'>
                            <div id='playlist-word-container' style={{ fontSize: "12px" }}>
                                PLAYLIST
                            </div>
                            <Link id='playlist-name' to="/" style={{ fontSize: "55px", fontWeight: "700", textDecoration: "none" }}>
                                {playlist.name}
                            </Link>
                            <div id='playlist-description'>
                                <Link to="/">
                                    {playlist.description}
                                </Link>
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
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <div>
                            <button onClick={deletePlaylist}>DELETE</button>
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
