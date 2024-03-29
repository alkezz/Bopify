
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import DropDown from '../AccountDropDown/AccounDropDown';
import UserPlaylist from '../UserPlaylists/UserPlaylists';
import logo from "../../assets/black_bopify_logo-removebg-preview.png"
import whiteLogo from "../../assets/bopify-white-logo.png"
import "./NavBar.css"
import { useDispatch, useSelector } from 'react-redux';
import greenLogo from "../../assets/new_bopify_logo-removebg-preview.png"
import * as playlistActions from "../../store/playlist"
import * as audioActions from "../../store/audioplayer"
import * as followedPlaylistActions from "../../store/followedplaylists"
import ReactAudioPlayer from 'react-audio-player';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

const NavBar = () => {
  let topNav = document.getElementById("top-navbar")
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const playlistState = useSelector((state) => state.playlist)
  const audioState = useSelector((state) => state.audioPlayer)
  const followedPlaylistState = useSelector((state) => state.followedPlaylists)
  const [isDisabled, setIsDisabled] = useState(false)
  const [userPlaylists, setUserPlaylists] = useState([])
  const [followingPlaylists, setFollowingPlaylists] = useState([])
  let allPlaylists
  let followedPlaylists
  useEffect(async () => {
    allPlaylists = await dispatch(playlistActions.getAllPlaylists())
    await dispatch(followedPlaylistActions.getFollowedPlaylists(sessionUser?.id))
  }, [dispatch, sessionUser?.id])
  if (location.pathname === "/" && topNav) {
    topNav.style.background = "#111111"
    topNav.style.backgroundImage = "none"
  }
  if (location.pathname === "/login" && topNav) {
    topNav.style.background = "white"
  }
  const playlistArray = Object.values(playlistState)
  const followedPlaylistArray = Object.values(followedPlaylistState)
  let userPlaylistList
  let userPlaylistLength
  if (sessionUser) {
    userPlaylistList = playlistArray.filter(playlist => playlist?.User?.id === sessionUser?.id)
    userPlaylistLength = userPlaylistList.length + 1
  }
  let sidenav
  let navbar
  let bottomnav
  let playPauseButton
  const onHover = () => {
    document.getElementById("test").style.color = "yellow"
  }
  const onMouseLeave = () => {
    document.getElementById("test").style.color = "white"
  }

  const createPlaylist = async (e) => {
    // if (userPlaylistLength > 5) {
    //   return window.alert("You can only create 5 playlists max!")
    // }
    e.preventDefault()
    const newPlaylist = {
      "name": `My Playlist #${userPlaylistLength}`,
      "playlist_img": "https://ali-practice-aws-bucket.s3.amazonaws.com/playlistDefaultImage.png",
      "user_id": sessionUser.id
    }
    let new_playlist = await dispatch(playlistActions.createPlaylist(newPlaylist))
    if (new_playlist) {
      history.push(`/playlist/${new_playlist.id}`)
      setIsDisabled(true)
      setTimeout(() => setIsDisabled(false), 500)
    }
  }
  if (location.pathname === "/likes") {
    sidenav = (
      <div className='side-nav' style={{ color: "#adb3b3" }}>
        <div style={{ marginBottom: "20px" }} id='logo'>
          <img onClick={(e) => history.push("/")} style={{ width: "155px", height: "45px", cursor: "pointer" }} src={whiteLogo} />
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
        <button className='create-playlist-button' onClick={createPlaylist} disabled={isDisabled}>
          <i class="fa-solid fa-square-plus"></i>
          &nbsp;
          Create playlist
        </button>
        <Link to="/likes">
          <i class="fa-solid fa-heart"></i>
          &nbsp;
          Liked Songs</Link>
        <div style={{ borderBottom: "1px solid gray" }}><br /></div>
        <br />
        <div style={{ overflowY: "scroll" }}>
          <div className='user-playlist-div'>
            <UserPlaylist />
            {followedPlaylistArray && (
              followedPlaylistArray.map((playlist) => {
                return <div>
                  <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
                </div>
              })
            )}
          </div>
        </div>
      </div>
    )
    navbar = (
      <nav id="top-navbar" style={{ backgroundColor: "#513a9e", backgroundImage: "none" }}>
        <div style={{ marginRight: "30px" }}>
          <Link to={{ pathname: "https://github.com/alkezz/aA2022-Spotify-Clone" }} target="_blank">
            <i style={{ color: "white", marginTop: "20%" }} className="fa-brands fa-github fa-lg"></i>
          </Link>
          &nbsp;
          &nbsp;
          &nbsp;
          <Link to={{ pathname: "https://www.linkedin.com/in/ali-k-ezzeddine" }} target="_blank">
            <i style={{ color: "white", marginTop: "20%" }} class="fa-brands fa-linkedin fa-lg"></i>
          </Link>
          <Link to={{ pathname: "https://www.ali-ezzeddine.com" }} target="_blank">
            <i style={{ color: "white", marginTop: "20%" }} class="fa-solid fa-star fa-lg"></i>
          </Link>
        </div>
        <div className='login-signup' style={{ marginRight: "80px" }}>
          <DropDown />
        </div>
      </nav>
    )
    if (audioState.current_song_playing.length > 0) {
      bottomnav = (
        audioState.current_song_playing.length > 0 && (
          <div className='bottom-div-container'>
            <div className='audio-container' style={{ display: "flex", marginLeft: "20px" }}>
              <div className='bottom-nav-image-container' style={{ display: "flex" }}>
                <img style={{ width: "80px" }} src={audioState.current_song_playing[0].album.albumPic}></img>
                <div className='bottom-div-album-name-artist-container' style={{ display: "flex", flexDirection: "column", marginLeft: "20px", marginTop: "15px", width: "300px" }}>
                  <Link id='bottom-nav-album-link' to={`/album/${audioState.current_song_playing[0].album.id}`}>{audioState.current_song_playing[0].name}</Link>
                  <br />
                  <Link id='bottom-nav-artist-link' to={`/artist/${audioState.current_song_playing[0].album.artist.id}`}>{audioState.current_song_playing[0].album.artist.name}</Link>
                </div>
              </div>
              <div style={{ marginLeft: "50px" }}>
                <AudioPlayer />
              </div>
            </div>
          </div>
        )
      )
    } else {
      bottomnav = (
        <div className='bottom-div-container'>
          <div style={{ marginLeft: "470px" }}>
            <AudioPlayer />
          </div>
        </div>
      )
    }
  }
  if (location.pathname !== "/sign-up" && location.pathname !== "/login" && !sessionUser) {
    sidenav = (
      <div className='side-nav' style={{ color: "#adb3b3" }}>
        <div style={{ marginBottom: "20px" }} id='logo'>
          <img onClick={(e) => history.push("/")} style={{ width: "155px", height: "45px", cursor: "pointer" }} src={whiteLogo} />
        </div>
        <div>
          <Link to="/">
            <i class="fa-solid fa-house" style={{ color: "#b3b3b3" }}></i>
            &nbsp;
            Home</Link>
          <Link to="/search">
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
        <div style={{ marginRight: "30px" }}>
          <Link to={{ pathname: "https://github.com/alkezz/aA2022-Spotify-Clone" }} target="_blank">
            <i style={{ color: "white", marginTop: "20%" }} class="fa-brands fa-github fa-lg"></i>
          </Link>
          &nbsp;
          &nbsp;
          &nbsp;
          <Link to={{ pathname: "https://www.linkedin.com/in/ali-k-ezzeddine" }} target="_blank">
            <i style={{ color: "white", marginTop: "20%" }} class="fa-brands fa-linkedin fa-lg"></i>
          </Link>
          <Link to={{ pathname: "https://www.ali-ezzeddine.com" }} target="_blank">
            <i style={{ color: "white", marginTop: "20%" }} class="fa-solid fa-star fa-lg"></i>
          </Link>
        </div>
        <div className='login-signup' style={{ display: "flex", marginRight: "60px" }}>
          <div style={{ paddingTop: "10px", marginRight: "10px" }}>
            <button style={{ fontSize: "18px", fontWeight: "700", background: "none" }} id='signup-nav-button' onClick={(e) => history.push("/sign-up")}>
              Sign Up
            </button>
          </div>
          <button id='login-nav-button' onClick={(e) => history.push("/login")}>
            Log In
          </button>
        </div>
      </nav>
    )
    bottomnav = (
      <div className='logged-out-bottom-div-container'>
        <div className='logged-out-text'>
          &nbsp;
          <div style={{ fontSize: "13px", marginLeft: "12px", marginBottom: "5px" }}>
            PREVIEW OF BOPIFY
          </div>
          <div style={{ marginLeft: "12px", fontWeight: "550" }}>
            Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.
          </div>
        </div>
        <button style={{ marginTop: "12px", borderRadius: "30px", height: "50px", width: "150px", fontWeight: "700", border: "none", cursor: "pointer", marginRight: "10px" }} onClick={(e) => history.push("/sign-up")}>Sign up free</button>
      </div>
    )
  } else if (sessionUser && location.pathname !== "/sign-up" && location.pathname !== "/login" && location.pathname !== "/likes") {
    sidenav = (
      <div className='side-nav' style={{ color: "#adb3b3" }}>
        <div style={{ marginBottom: "20px" }} id='logo'>
          <img onClick={(e) => history.push("/")} style={{ width: "155px", height: "45px", cursor: "pointer" }} src={whiteLogo} />
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
        <button className='create-playlist-button' onClick={createPlaylist} disabled={isDisabled}>
          <i class="fa-solid fa-square-plus"></i>
          &nbsp;
          Create playlist
        </button>
        <Link to="/likes">
          <i class="fa-solid fa-heart"></i>
          &nbsp;
          Liked Songs</Link>
        <div style={{ borderBottom: "1px solid gray" }}><br /></div>
        <br />
        <div style={{ overflowY: "scroll" }}>
          <div className='user-playlist-div'>
            <UserPlaylist />
            {followedPlaylistArray && (
              followedPlaylistArray.map((playlist) => {
                return <div>
                  <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
                </div>
              })
            )}
          </div>
        </div>
      </div>
    )
    navbar = (
      <nav id="top-navbar">
        <div style={{ marginRight: "30px" }}>
          <Link to={{ pathname: "https://github.com/alkezz/aA2022-Spotify-Clone" }} target="_blank">
            <i style={{ color: "white", marginTop: "20%" }} class="fa-brands fa-github fa-lg"></i>
          </Link>
          &nbsp;
          &nbsp;
          &nbsp;
          <Link to={{ pathname: "https://www.linkedin.com/in/ali-k-ezzeddine" }} target="_blank">
            <i style={{ color: "white", marginTop: "20%" }} class="fa-brands fa-linkedin fa-lg"></i>
          </Link>
          <Link to={{ pathname: "https://www.ali-ezzeddine.com" }} target="_blank">
            <i style={{ color: "white", marginTop: "20%" }} class="fa-solid fa-star fa-lg"></i>
          </Link>
        </div>
        <div className='login-signup' style={{ marginRight: "60px" }}>
          <DropDown />
        </div>
      </nav>
    )
    if (audioState.current_song_playing.length > 0) {
      bottomnav = (
        audioState.current_song_playing.length > 0 && (
          <div className='bottom-div-container'>
            <div className='audio-container' style={{ display: "flex", marginLeft: "20px" }}>
              <div className='bottom-nav-image-container' style={{ display: "flex" }}>
                <img style={{ width: "80px" }} src={audioState.current_song_playing[0].album.albumPic}></img>
                <div className='bottom-div-album-name-artist-container' style={{ display: "flex", flexDirection: "column", marginLeft: "20px", marginTop: "15px", width: "300px" }}>
                  <Link id='bottom-nav-album-link' to={`/album/${audioState.current_song_playing[0].album.id}`}>{audioState.current_song_playing[0].name}</Link>
                  <br />
                  <Link id='bottom-nav-artist-link' to={`/artist/${audioState.current_song_playing[0].album.artist.id}`}>{audioState.current_song_playing[0].album.artist.name}</Link>
                </div>
              </div>
              <div style={{ marginLeft: "50px" }}>
                <AudioPlayer />
              </div>
            </div>
          </div>
        )
      )
    } else {
      bottomnav = (
        <div className='bottom-div-container'>
          <div style={{ marginLeft: "470px" }}>
            <AudioPlayer />
          </div>
        </div>
      )
    }
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
