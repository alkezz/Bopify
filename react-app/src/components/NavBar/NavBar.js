
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import logo from "../../assets/black_bopify_logo-removebg-preview.png"
import "./NavBar.css"

const NavBar = () => {
  const [page, setPage] = useState("")
  const history = useHistory()
  const location = useLocation()
  console.log("HISTORY", location.pathname)
  let navbar
  if (location.pathname !== "/sign-up" && location.pathname !== "/login") {
    navbar = (
      <nav id="top-navbar">
        <div className='login-signup'>
          <button onClick={(e) => history.push("/sign-up")}>
            Sign Up
          </button>
          <button onClick={(e) => history.push("/login")}>
            Log In
          </button>
        </div>
      </nav>
    )
  } else {
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
    </>
  );
}

export default NavBar;
