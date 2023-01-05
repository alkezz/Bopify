import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    if (location.pathname.includes("likes")) {
      history.push("/")
    }
    await dispatch(logout());
  };

  return <button style={{ background: "none", border: "none", color: "gray", cursor: "pointer" }} onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
