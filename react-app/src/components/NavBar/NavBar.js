
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import DropDown from '../AccountDropDown/AccounDropDown';
import UserPlaylist from '../UserPlaylists/UserPlaylists';
import logo from "../../assets/black_bopify_logo-removebg-preview.png"
import "./NavBar.css"
import { useDispatch, useSelector } from 'react-redux';
import greenLogo from "../../assets/new_bopify_logo-removebg-preview.png"
import * as playlistActions from "../../store/playlist"

const NavBar = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const playlistState = useSelector((state) => state.playlist)
  const [userPlaylists, setUserPlaylists] = useState([])
  useEffect(async () => {
    await dispatch(playlistActions.getAllPlaylists())
  }, [dispatch])
  const playlistArray = Object.values(playlistState)
  let userPlaylistList
  let userPlaylistLength
  if (sessionUser) {
    userPlaylistList = playlistArray.filter(playlist => playlist.User.id === sessionUser.id)
    userPlaylistLength = userPlaylistList.length + 1
  }
  let sidenav
  let navbar
  let bottomnav
  const createPlaylist = async (e) => {
    e.preventDefault()
    const newPlaylist = {
      "name": `My Playlist #${userPlaylistLength}`,
      "playlist_img": "https://ali-practice-aws-bucket.s3.amazonaws.com/playlistDefaultImage.png",
      "user_id": sessionUser.id
    }
    let new_playlist = await dispatch(playlistActions.createPlaylist(newPlaylist))
    if (new_playlist) {
      const allPlaylists = await dispatch(playlistActions.getAllPlaylists())
      history.push(`/playlist/${allPlaylists[allPlaylists.length - 1].id}`)
    }
  }

  if (location.pathname !== "/sign-up" && location.pathname !== "/login" && !sessionUser) {
    sidenav = (
      <div className='side-nav' style={{ color: "#adb3b3" }}>
        <div id='logo'>
          IMAGE GOES HERE
        </div>
        <div>
          <Link to="/">
            <i class="fa-solid fa-house" style={{ color: "#b3b3b3" }}></i>
            &nbsp;
            Home</Link>
          <Link to="/login">
            <i class="fa-solid fa-magnifying-glass" style={{ color: "#b3b3b3" }}></i>
            &nbsp;
            Search</Link>
          <Link to="/login">
            <i class="fa-solid fa-lines-leaning" style={{ color: "#b3b3b3" }}></i>
            &nbsp;
            Your Library</Link>
        </div>
        <br />
        <div>
          <Link to="/login">
            <i class="fa-solid fa-square-plus"></i>
            &nbsp;
            Create Playlist</Link>
          <Link to="/login">
            <i class="fa-solid fa-heart"></i>
            &nbsp;
            Liked Songs</Link>
        </div>
      </div>
    )
    navbar = (
      <nav id="top-navbar">
        <div className='login-signup'>
          <button id='signup-nav-button' onClick={(e) => history.push("/sign-up")}>
            Sign Up
          </button>
          <button id='login-nav-button' onClick={(e) => history.push("/login")}>
            Log In
          </button>
        </div>
      </nav>
    )
    bottomnav = (
      <div className='logged-out-bottom-div-container'>
        <div className='logged-out-text'>
          <div>
            Preview of Spotify
          </div>
          <div>
            Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.
          </div>
        </div>
        <button onClick={(e) => history.push("/sign-up")}>Sign up free</button>
      </div>
    )
  } else if (sessionUser && location.pathname !== "/sign-up" && location.pathname !== "/login") {
    sidenav = (
      <div className='side-nav' style={{ color: "#adb3b3" }}>
        <div id='logo'>
          IMAGE GOES HERE
        </div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <i class="fa-solid fa-house" style={{ color: "#b3b3b3" }}></i>
          &nbsp;
          Home</Link>
        <Link to="/search">
          <i class="fa-solid fa-magnifying-glass" style={{ color: "#b3b3b3" }}></i>
          &nbsp;
          Search</Link>
        <Link to="/library">
          <i class="fa-solid fa-lines-leaning" style={{ color: "#b3b3b3" }}></i>
          &nbsp;
          Your Library</Link>
        <br />
        <button onClick={createPlaylist} className='create-playlist-button'>
          <i class="fa-solid fa-square-plus"></i>
          &nbsp;
          Create playlist</button>
        <Link to="/liked">
          <i class="fa-solid fa-heart"></i>
          &nbsp;
          Liked Songs</Link>
        <div style={{ borderBottom: "1px solid white" }}><br /></div>
        <br />
        <div className='user-playlist-div'>
          <UserPlaylist />
        </div>
      </div>
    )
    navbar = (
      <nav id="top-navbar">
        <div className='login-signup'>
          <DropDown />
        </div>
      </nav>
    )
    bottomnav = (
      <div className='bottom-div-container'>
      </div>
    )
  } else if (location.pathname === "/login") {
    navbar = (
      <nav id='logging-in-signing-up-nav'>
        <div id="login-signup-page">
          <Link to="/">
            <img className='logo-img' src={logo}></img>
          </Link>
        </div>
      </nav>
    )
  }
  return (
    <>
      {navbar}
      {sidenav}
      {bottomnav}
    </>
  );
}

export default NavBar;
