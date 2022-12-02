
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
import * as audioActions from "../../store/audioplayer"

const NavBar = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const playlistState = useSelector((state) => state.playlist)
  const audioState = useSelector((state) => state.audioPlayer)
  const [isPlaying, setIsPlaying] = useState(false)
  const [userPlaylists, setUserPlaylists] = useState([])
  let allPlaylists
  useEffect(async () => {
    allPlaylists = await dispatch(playlistActions.getAllPlaylists())
  }, [dispatch])
  const playlistArray = Object.values(playlistState)
  console.log("AUDIO STATE", audioState)
  let userPlaylistList
  let userPlaylistLength
  if (sessionUser) {
    userPlaylistList = playlistArray.filter(playlist => playlist.User.id === sessionUser.id)
    userPlaylistLength = userPlaylistList.length + 1
  }
  let sidenav
  let navbar
  let bottomnav
  let playPauseButton
  const createPlaylist = async (e) => {
    e.preventDefault()
    const newPlaylist = {
      "name": `My Playlist #${userPlaylistLength}`,
      "playlist_img": "https://ali-practice-aws-bucket.s3.amazonaws.com/playlistDefaultImage.png",
      "user_id": sessionUser.id
    }
    let new_playlist = await dispatch(playlistActions.createPlaylist(newPlaylist))
    console.log(new_playlist)
    if (new_playlist) {
      history.push(`/playlist/${new_playlist.id}`)
    }
  }



  const playAudio = () => {
    const audioElement = document.getElementById("audio-player")
    audioElement.play()
  }
  const pauseAudio = () => {
    const audioElement = document.getElementById("audio-player")
    audioElement.pause()
  }
  const skipAudio = async () => {
    await dispatch(audioActions.skipSong())
    const audioElement = document.getElementById("audio-player")
    audioElement.play()
  }
  if (sessionUser) {
    if (audioState.current_song_playing.length > 0) {
      let volume = document.getElementById("volume-slider")
      volume.addEventListener("change", (e) => {
        const audioElement = document.getElementById("audio-player")
        audioElement.volume = e.currentTarget.value / 100
      })
    }
  }
  if (isPlaying === true) {
    playPauseButton = (
      <button onClick={(e) => { { pauseAudio(e); setIsPlaying(false) } }}>
        <i class="fa-solid fa-circle-pause fa-3x"></i>
      </button>
    )
  } else {
    // setIsPlaying(true)
    playPauseButton = (
      <button onClick={(e) => { { playAudio(e); setIsPlaying(true) } }}>
        <i class="fa-solid fa-circle-play fa-3x"></i>
      </button>
    )
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
        <button style={{ marginTop: "12px", borderRadius: "20px", height: "50px", width: "150px", fontWeight: "700" }} onClick={(e) => history.push("/sign-up")}>Sign up free</button>
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
        <Link to="/likes">
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
    if (audioState.current_song_playing.length > 0) {
      bottomnav = (
        audioState.current_song_playing.length > 0 && (
          <div className='bottom-div-container'>
            <div className='audio-container' style={{ display: "flex", marginLeft: "20px" }}>
              <div className='bottom-nav-image-container' style={{ display: "flex" }}>
                <img style={{ width: "80px" }} src={audioState.current_song_playing[0].album.albumPic}></img>
                <div className='bottom-div-album-name-artist-container' style={{ display: "flex", flexDirection: "column" }}>
                  <Link id='bottom-nav-album-link' to={`/album/${audioState.current_song_playing[0].album.id}`}>{audioState.current_song_playing[0].name}</Link>
                  <br />
                  <Link id='bottom-nav-artist-link' to={`/artist/${audioState.current_song_playing[0].album.artist.id}`}>{audioState.current_song_playing[0].album.artist.name}</Link>
                </div>
              </div>
              <div className='audio-controls'>
                {playPauseButton}
                <button onClick={skipAudio}>SKIP</button>
                <input style={{ width: "30%" }} type='range' id='volume-slider' />
              </div>
              <audio id='audio-player' src={audioState.current_song_playing[0].song_url}></audio>
            </div>
          </div>
        )
      )
    } else {
      bottomnav = (
        <div className='bottom-div-container'>
          <button onClick={playAudio}>PLAY</button>
          <button onClick={pauseAudio}>PAUSE</button>
          <button onClick={skipAudio}>SKIP</button>
          <input style={{ width: "10%" }} type='range' id='volume-slider' />
          <audio id='audio-player'></audio>
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
