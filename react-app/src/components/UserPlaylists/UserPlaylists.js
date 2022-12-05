import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as playlistActions from "../../store/playlist"

const UserPlaylist = () => {
    const sessionUser = useSelector((state) => state.session.user)
    const playlistState = useSelector((state) => state.playlist)
    const [userPlaylists, setUserPlaylists] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        // const playlists = await fetch(`/api/users/${sessionUser.id}/playlists`)
        // const data = await playlists.json()
        // setUserPlaylists(data)
        dispatch(playlistActions.getAllPlaylists())
    }, [sessionUser?.id, dispatch])
    const playlistArray = Object.values(playlistState)
    // const playlistArray = userPlaylists.Playlists
    const userPlaylistList = playlistArray.filter(playlist => playlist?.User?.id === sessionUser.id)
    let playlistComponent
    if (playlistArray && sessionUser) {
        playlistComponent = (
            userPlaylistList.map((playlist) => {
                return <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
            }).reverse()
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
