
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import DropDown from '../AccountDropDown/AccounDropDown';
import UserPlaylist from '../UserPlaylists/UserPlaylists';
import logo from "../../assets/black_bopify_logo-removebg-preview.png"
import "./NavBar.css"
import { useSelector } from 'react-redux';
import greenLogo from "../../assets/new_bopify_logo-removebg-preview.png"

const NavBar = () => {
  const history = useHistory()
  const location = useLocation()
  const sessionUser = useSelector((state) => state.session.user)
  let sidenav
  let navbar
  let bottomnav
  if (location.pathname !== "/sign-up" && location.pathname !== "/login" && !sessionUser) {
    sidenav = (
      <div className='side-nav' style={{ color: "#adb3b3" }}>
        <div id='logo'>
          IMAGE GOES HERE
        </div>
        <div>
          <Link to="/">Home</Link>
          <a href='#'>Search</a>
          <a href='#'>Your Library</a>
        </div>
        <br />
        <div>
          <Link to="/create-playlist">Create Playlist</Link>
          <a href='#'>Liked Songs</a>
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
        <Link to="/create-playlist">
          <i class="fa-solid fa-square-plus"></i>
          &nbsp;
          Create playlist</Link>
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
        <audio></audio>
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
