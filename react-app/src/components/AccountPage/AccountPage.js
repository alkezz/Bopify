import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import * as followActions from "../../store/follower"
import "./AccountPage.css"

const AccountPage = () => {
    const sessionUser = useSelector((state) => state.session.user)
    const playlistState = useSelector((state) => state.playlist)
    const followState = useSelector((state) => state.follows.current_followed_user_ids)
    const dispatch = useDispatch()
    let { userId } = useParams()
    const history = useHistory()
    const [user, setUser] = useState([])
    const [currentUserFollowers, setCurrentUserFollowers] = useState([])
    const [profileFollowers, setProfileFollowers] = useState([])
    const [followingPlaylists, setFollowingPlaylists] = useState([])
    const [following, setFollowing] = useState([])
    const [isFollowing, setIsFollowing] = useState()
    const [update, setUpdate] = useState(true)
    document.body.style = 'background: #1e1e1e';
    console.log("FOLLOWSTATE", followState)
    const userFollowing = []
    useEffect(() => {
        (async () => {
            const userRes = await fetch(`/api/users/${userId}`)
            const user = await userRes.json()
            setUser(user)
        })();
        (async () => {
            if (sessionUser) {
                const followData = await dispatch(followActions.userFollowList(sessionUser.id))
                setCurrentUserFollowers(followData)
            }
        })();
        (async () => {
            const followData = await dispatch(followActions.userFollowList(userId))
            setProfileFollowers(followData)
        })();
        (async () => {
            const playlistFollowRes = await fetch(`/api/users/${userId}/followed-playlists`)
            const playlistFollowsData = await playlistFollowRes.json()
            setFollowingPlaylists(playlistFollowsData.followedPlaylists)
        })();
        followState.forEach(async (id) => {
            const response = await fetch(`/api/users/${id}`)
            const data = await response.json()
            userFollowing.push(data.username)
        })
    }, [setUser, dispatch, setCurrentUserFollowers, setProfileFollowers, update, setFollowingPlaylists])
    console.log("FOLLOWED PLAYLISTS: ", followingPlaylists)
    // setFollowing(userFollowing)
    console.log("USERFOLLOWING", userFollowing)
    let profilePic
    if (!currentUserFollowers) {
        return null
    }
    console.log(currentUserFollowers, "CURRENT USER FOLLOWERS")
    console.log(profileFollowers, "PROFILE FOLLOWERS")
    console.log("USER", user)
    if (!user.profile_pic) {
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
    let followButton
    if (sessionUser !== null) {
        if (followState.includes(user?.id)) {
            followButton = (
                <button className="follow-button" hidden={sessionUser?.id === Number(userId)} onClick={(e) => { unFollow(e); setUpdate(!update) }}>UNFOLLOW</button>
            )
        } else {
            followButton = (
                <button className="follow-button" hidden={sessionUser?.id === Number(userId)} onClick={(e) => { follow(e); setUpdate(!update) }}>FOLLOW</button>
            )
        }
    } else {
        followButton = (
            <button className="follow-button" onClick={() => history.push("/login")}>FOLLOW</button>
        )
    }
    const follow = (e) => {
        setUpdate(true)
        e.preventDefault()
        console.log('follow')
        dispatch(followActions.followUser(sessionUser.id, user.id))
    }
    const unFollow = (e) => {
        setUpdate(true)
        e.preventDefault()
        dispatch(followActions.unfollowUser(sessionUser.id, user.id))
        console.log("unfollow")
    }
    if (sessionUser) {
        if (sessionUser.id === Number(userId)) {
            return (
                <div className="profile-container">
                    <div className="profile-header-container" style={{ display: "flex", flexDirection: "row" }}>
                        <div className="user-profile-pic">
                            {profilePic}
                        </div>
                        <div className="user-info">
                            Profile
                            <h1 className="user-name" style={{ color: "white" }}>
                                {sessionUser.username}
                            </h1>
                            {userPlaylistLength}
                            &nbsp;
                            <span style={{ fontSize: "20px" }}>·</span>
                            &nbsp;
                            {currentUserFollowers?.followed_by_user_ids?.length} Followers
                            &nbsp;
                            <span style={{ fontSize: "20px" }}>·</span>
                            &nbsp;
                            {currentUserFollowers?.current_followed_user_ids?.length} Following
                        </div>
                    </div>
                    <div className="follow-user-container">
                        {followButton}
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
                        <h2>Followed Playlists</h2>
                        <div className="profile-followed-playlists-container">
                            {followingPlaylists && (
                                followingPlaylists.map((playlist) => {
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
                    <div className="followed-users-container">
                        <h2 style={{ color: "white" }}>Followed Users</h2>
                        {/* {profileFollowers?.current_followed_user_ids?.map(async (follower) => {
                            const user = await fetch(`/api/users/${follower}`)
                            const userData = await user.json()
                            console.log("USERDATA", userData)
                            return <div>
                                {userData.username}
                            </div>
                        })} */}
                    </div>
                </div>)
        } else {
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
                            &nbsp;
                            <span style={{ fontSize: "20px" }}>·</span>
                            &nbsp;
                            {profileFollowers?.followed_by_user_ids?.length} Followers
                            &nbsp;
                            <span style={{ fontSize: "20px" }}>·</span>
                            &nbsp;
                            {profileFollowers?.current_followed_user_ids?.length} Following
                        </div>
                    </div>
                    <div className="follow-user-container">
                        {followButton}
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
    } else {
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
                        &nbsp;
                        <span style={{ fontSize: "20px" }}>·</span>
                        &nbsp;
                        {profileFollowers?.followed_by_user_ids?.length} Followers
                        &nbsp;
                        <span style={{ fontSize: "20px" }}>·</span>
                        &nbsp;
                        {profileFollowers?.current_followed_user_ids?.length} Following
                    </div>
                </div>
                <div className="follow-user-container">
                    {followButton}
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
}

export default AccountPage
