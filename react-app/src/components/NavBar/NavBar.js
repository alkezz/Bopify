
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
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link>
        <a href='#'>Search</a>
        <a href='#'>Your Library</a>
        <br />
        <Link to="/create-playlist">Create playlist</Link>
        <a href='#'>Liked Songs</a>
        <div style={{ borderBottom: "1px solid white" }}>PLAYLISTS GO AFTER THIS</div>
        <br />
        <div>
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
    </>
  );
}

export default NavBar;
