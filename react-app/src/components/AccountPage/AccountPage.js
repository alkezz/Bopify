import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import * as followActions from "../../store/follower"
import "./AccountPage.css"

const AccountPage = () => {
    const sessionUser = useSelector((state) => state.session.user)
    const playlistState = useSelector((state) => state.playlist)
    const dispatch = useDispatch()
    let { userId } = useParams()
    const [user, setUser] = useState([])
    useEffect(() => {
        (async () => {
            const userRes = await fetch(`/api/users/${userId}`)
            const user = await userRes.json()
            setUser(user)
        })();
    }, [setUser])
    let profilePic
    if (!sessionUser.profile_pic) {
        profilePic = <i class="fa-solid fa-user fa-4x"></i>
    } else {
        profilePic = <img src={sessionUser.profile_pic} />
    }
    const playlistArray = Object.values(playlistState)
    const userPlaylistList = playlistArray.filter(playlist => Number(playlist.User.id) === Number(userId))
    let userPlaylistLength
    if (userPlaylistList.length === 1) {
        userPlaylistLength = <span>{userPlaylistList.length} public playlist</span>
    } else {
        userPlaylistLength = <span>{userPlaylistList.length} public playlists</span>
    }
    const followUser = async () => {
        const response = await dispatch(followActions.userFollowList(sessionUser.id))
        const data = await response.json()
        console.log("DATA", data)
    }
    return (
        <div className="profile-container">
            <div className="profile-header-container" style={{ display: "flex", flexDirection: "row" }}>
                <div className="user-profile-pic">
                    {profilePic}
                </div>
                <div className="user-info">
                    Profile
                    <h1 className="user-name" style={{ color: "white" }}>
                        {user.username}
                    </h1>
                    {userPlaylistLength}
                </div>
            </div>
            <div className="follow-user-container">
                <button onClick={followUser}>Follow</button>
            </div>
            <div className="profile-content">
                <h2>Playlists</h2>
                <div className="profile-playlists-container">
                    {userPlaylistList && (
                        userPlaylistList.map((playlist) => {
                            return <div>
                                <div className="playlist-image">
                                    <Link to={`/playlist/${playlist.id}`}>
                                        <img className="playlist-image-profile" src={playlist.playlist_img} />
                                    </Link>
                                </div>
                                <div className="playlist-name">
                                    {playlist.name}
                                </div>
                            </div>
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default AccountPage
