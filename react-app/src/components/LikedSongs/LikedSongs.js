import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import "./LikedSongs.css"

const LikedSongs = () => {
    const location = useLocation()
    const sessionUser = useSelector((state) => state.session.user)
    document.body.style = 'background: #1e1e1e';
    return (
        <div className='liked-songs-page-container' style={{ color: "white", paddingBottom: "80px", width: "100%" }}>
            <div className='liked-songs-header' style={{ display: "flex", paddingLeft: "60px", paddingTop: "50px" }}>
                <div className='image-container' style={{ marginBottom: "10px" }}>
                    <img src='https://ali-practice-aws-bucket.s3.amazonaws.com/likedSongsPicture.png' style={{ height: "100%" }}></img>
                </div>
                <div className='liked-songs-info-container' style={{ marginLeft: "20px", display: "flex", flexDirection: "column" }}>
                    <h1 style={{ color: "white", fontSize: "13px", marginBottom: "-50px", marginTop: "70px" }}>PLAYLIST</h1>
                    <h1 style={{ fontSize: "75px", fontWeight: "700" }}>Liked Songs</h1>
                    <span>{sessionUser.username}</span>
                </div>
            </div>
            <div className='play-button-container' style={{ paddingLeft: "60px", height: "100px", marginTop: "-20px" }}>
                <h1>U</h1>
            </div>
            <div className='song-list-header-container' style={{ marginLeft: "55px", marginRight: "55px" }}>
                <div className='number-icon'>
                    <div>
                        #
                        &nbsp;
                        &nbsp;
                        TITLE
                    </div>
                </div>
                <div>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    ALBUM
                </div>
                <div style={{ paddingRight: "20px" }}>
                    <i class="fa-regular fa-clock"></i>
                </div>
            </div>
        </div>
    )
}

export default LikedSongs
