import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as playlistActions from "../../store/playlist"

const UserPlaylist = () => {
    const sessionUser = useSelector((state) => state.session.user)
    const allPlaylistsObj = useSelector((state) => state.playlist)
    const [userPlaylists, setUserPlaylists] = useState([])
    const dispatch = useDispatch()
    useEffect(async () => {
        const playlists = await fetch(`/api/users/${sessionUser.id}/playlists`)
        const data = await playlists.json()
        setUserPlaylists(data)
    }, [setUserPlaylists])
    const playlistArray = userPlaylists.Playlists
    let playlistComponent
    if (playlistArray && sessionUser) {
        playlistComponent = (
            playlistArray.map((playlist) => {
                return <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
            })
        )
    }
    if (sessionUser) {
        return (
            <div>
                {playlistComponent}
            </div>
        )
    } else {
        return (
            null
        )
    }
}

export default UserPlaylist
