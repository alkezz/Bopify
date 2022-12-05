import React, { useState, useEffect } from "react";
import { useDeferredValue } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { followPlaylist } from "../../store/followedplaylists";
import * as followActions from "../../store/follower"
import "./AccountPage.css"

const AccountPage = () => {
    const sessionUser = useSelector((state) => state.session.user)
    const playlistState = useSelector((state) => state.playlist)
    const followState = useSelector((state) => state.follows.current_followed_user_ids)
    const Dstate = useSelector((state) => state)
    const dispatch = useDispatch()
    let { userId } = useParams()
    const history = useHistory()
    const [user, setUser] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [currentUserFollowers, setCurrentUserFollowers] = useState([])
    const [profileFollowers, setProfileFollowers] = useState([])
    const [sessionUserFollowing, setSessionUserFollowing] = useState([])
    const [followingPlaylists, setFollowingPlaylists] = useState([])
    const [following, setFollowing] = useState([])
    const [isFollowing, setIsFollowing] = useState()
    const [update, setUpdate] = useState(true)
    document.body.style = 'background: #1e1e1e';
    console.log("FOLLOWSTATE", Dstate)
    const userFollowing = []
    useEffect(() => {
        (async () => {
            const userRes = await fetch(`/api/users/${userId}`)
            const user = await userRes.json()
            setUser(user)
        })();
        (async () => {
            const allUsersRes = await fetch("/api/users/")
            const allUsers = await allUsersRes.json()
            setAllUsers(allUsers)
        })();
        (async () => {
            if (sessionUser) {
                const userFollowersArray = []
                await dispatch(followActions.userFollowList(sessionUser.id))
                // followData.current_followed_user_ids.forEach(async (id) => {
                //     const user = await fetch(`/api/users/${id}`)
                //     const data = await user.json()
                //     await userFollowersArray.push(data.username)
                //     setFollowing(userFollowersArray)
                // })
            }
        })();
        (async () => {
            const followData = await dispatch(followActions.userFollowList(userId))
            setProfileFollowers(followData)
        })();
        // (async () => {
        //     const playlistFollowRes = await fetch(`/api/users/${userId}/followed-playlists`)
        //     const playlistFollowsData = await playlistFollowRes.json()
        //     setFollowingPlaylists(playlistFollowsData.followedPlaylists)
        // })();
        // followState.forEach(async (id) => {
        //     const response = await fetch(`/api/users/${id}`)
        //     const data = await response.json()
        //     userFollowing.push(data.username)
        // })
        (async () => {
            const data = await dispatch(followActions.userFollowList(sessionUser.id))
            setSessionUserFollowing(data)
        })();
    }, [sessionUser.id, setSessionUserFollowing, userId, setUser, dispatch, setCurrentUserFollowers, setProfileFollowers, update, setFollowingPlaylists])
    // setFollowing(userFollowing)
    profileFollowers?.current_followed_user_ids?.map(async (id) => {
        const res = await fetch(`/api/users/${id}`)
        const data = await res.json()
        userFollowing.push(data)
    })
    console.log("SESSIONUSER FOLLOWING", sessionUserFollowing)
    // allUsers.users.filter((id) => )
    let userFollowingList = []
    let userFollowerList = []
    for (let i = 0; i < allUsers?.users?.length; i++) {
        let userId = allUsers.users[i].id
        for (let j = 0; j < profileFollowers?.current_followed_user_ids?.length; j++) {
            let otherUserId = profileFollowers.current_followed_user_ids[j]
            if (userId === otherUserId) {
                userFollowingList.push(allUsers.users[i])
            }
        }
    }
    for (let i = 0; i < allUsers?.users?.length; i++) {
        let userId = allUsers.users[i].id
        for (let j = 0; j < profileFollowers?.followed_by_user_ids?.length; j++) {
            let otherUserId = profileFollowers.followed_by_user_ids[j]
            if (userId === otherUserId) {
                userFollowerList.push(allUsers.users[i])
            }
        }
    }
    console.log("ARR", userFollowingList)
    console.log("ARRRRRRRRRR", userFollowerList)
    let profilePic
    if (!currentUserFollowers) {
        return null
    }
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
        console.log(followState.includes(user.id))
        console.log(followState)
        if (followState.includes(user.id)) {
            followButton = (
                <button className="follow-button" hidden={sessionUser.id === user.id} onClick={(e) => { unFollow(e); setUpdate(!update) }}>UNFOLLOW</button>
            )
        } else {
            followButton = (
                <button className="follow-button" hidden={sessionUser.id === user.id} onClick={(e) => { follow(e); setUpdate(!update) }}>FOLLOW</button>
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
        dispatch(followActions.followUser(sessionUser.id, userId))
    }
    const unFollow = (e) => {
        setUpdate(true)
        e.preventDefault()
        dispatch(followActions.unfollowUser(sessionUser.id, userId))
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
                            {sessionUserFollowing?.followed_by_user_ids?.length} Followers
                            &nbsp;
                            <span style={{ fontSize: "20px" }}>·</span>
                            &nbsp;
                            {sessionUserFollowing?.current_followed_user_ids?.length} Following
                        </div>
                    </div>
                    <div className="follow-user-container">
                        {followButton}
                    </div>
                    <div className="profile-content">
                        <h2 style={{ color: "white" }}>Playlists</h2>
                        <div className="profile-playlists-container">
                            {userPlaylistList && (
                                userPlaylistList.map((playlist) => {
                                    return <div style={{ color: "white" }}>
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
                        <h2 style={{ color: "white" }}>Followed Playlists</h2>
                        <div className="profile-followed-playlists-container">
                            {followingPlaylists && (
                                followingPlaylists.map((playlist) => {
                                    return <div style={{ color: "white" }}>
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
                    <h2 style={{ color: "white" }}>Following</h2>
                    <div className="followed-users-container" style={{ display: "flex", flexDirection: "row" }}>
                        {userFollowingList?.map((follower) => {
                            console.log("MAP", follower)
                            return <div className="follower-container" onClick={(e) => history.push(`/user/${follower.id}`)}>
                                <div className="follower-profile-pic">
                                    {profilePic}
                                </div>
                                {follower.username}
                                <div>
                                    <br />
                                    Profile
                                </div>
                            </div>
                        })}
                    </div>
                    <h2 style={{ color: "white" }}>Followers</h2>
                    <div className="followed-users-container" style={{ display: "flex", flexDirection: "row" }}>
                        {userFollowerList?.map((follower) => {
                            console.log("MAP", follower)
                            return <div className="follower-container" onClick={(e) => history.push(`/user/${follower.id}`)}>
                                <div className="follower-profile-pic">
                                    {profilePic}
                                </div>
                                {follower.username}
                                <div>
                                    <br />
                                    Profile
                                </div>
                            </div>
                        })}
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
                        <h2 style={{ color: "white" }}>Playlists</h2>
                        <div className="profile-playlists-container">
                            {userPlaylistList && (
                                userPlaylistList.map((playlist) => {
                                    return <div style={{ color: "white" }}>
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
                        <h2 style={{ color: "white" }}>Followed Playlists</h2>
                        <div className="profile-followed-playlists-container">
                            {followingPlaylists && (
                                followingPlaylists.map((playlist) => {
                                    return <div style={{ color: "white" }}>
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
                        <h2 style={{ color: "white" }}>Following</h2>
                        <div className="followed-users-container">
                            {userFollowingList?.map((follower) => {
                                console.log("MAP", follower)
                                return <div className="follower-container" onClick={(e) => history.push(`/user/${follower.id}`)}>
                                    <div className="follower-profile-pic">
                                        {profilePic}
                                    </div>
                                    {follower.username}
                                    <div>
                                        <br />
                                        Profile
                                    </div>
                                </div>
                            })}
                        </div>
                        <h2 style={{ color: "white" }}>Followers</h2>
                        <div className="followed-users-container">
                            {userFollowerList?.map((follower) => {
                                console.log("MAP", follower)
                                return <div className="follower-container" onClick={(e) => history.push(`/user/${follower.id}`)}>
                                    <div className="follower-profile-pic">
                                        {profilePic}
                                    </div>
                                    <span>{follower.username}</span>
                                    <div>
                                        <br />
                                        Profile
                                    </div>
                                </div>
                            })}
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
