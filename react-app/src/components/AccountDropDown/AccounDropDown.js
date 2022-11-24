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
            <button id="drop-down-button" onClick={openMenu}>{sessionUser.username}</button>
            {showMenu && (
                <div className='drop-down'>
                    <div className='user-info'>
                        <div className='profile-button'>
                            <Link to="/">Profile</Link>
                        </div>
                        <div className='logout-button-dropdown'><LogoutButton /></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DropDown