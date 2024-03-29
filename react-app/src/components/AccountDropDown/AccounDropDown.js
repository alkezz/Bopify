import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';
import "./AccountDropDown.css"

const DropDown = () => {
    const sessionUser = useSelector((state) => state.session.user)
    const [showMenu, setShowMenu] = useState(false)
    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
    }
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    return (
        <div className='profile-dropdown-container'>
            <button id="drop-down-button" onClick={openMenu}>
                <i style={{ marginTop: "5px", marginRight: "18px", fontSize: "20px" }} class="fa-solid fa-circle-user"></i>
                <div style={{ marginTop: "5px", width: "fit-content", marginRight: "20px", marginLeft: "-10px" }}>{sessionUser.username}</div>
            </button>
            {showMenu && (
                <div className='drop-down'>
                    <div>
                        <Link style={{ textDecoration: "none", color: "gray", fontSize: "12px" }} onClick={async (e) => await fetch(`/api/users/${sessionUser.id}`)} to={`/user/${sessionUser.id}`}>Profile</Link>
                    </div>
                    <div className='logout-button-dropdown'><LogoutButton /></div>
                </div>
            )}
        </div>
    )
}

export default DropDown
