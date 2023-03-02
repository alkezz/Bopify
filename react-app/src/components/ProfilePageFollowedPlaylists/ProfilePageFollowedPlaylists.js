import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";

const ProfilePageFollowedPlaylists = ({ followingPlaylists }) => {
    const history = useHistory()
    return (
        <>
            {followingPlaylists && (
                followingPlaylists.map((playlist) => {
                    return <div className='album-image-container' onClick={(e) => history.push(`/playlist/${playlist.id}`)}>
                        <Link to={`/playlist/${playlist.id}`}>
                            <img className='playlist-image' src={playlist.playlist_img} />
                        </Link>
                        <p style={{ marginLeft: "15px", fontWeight: "700" }}>{playlist.name}</p>
                        <span style={{ marginLeft: "15px", paddingBottom: "20px" }}>By {playlist.User.username}</span>
                    </div>
                })
            )}
        </>
    )
}

export default ProfilePageFollowedPlaylists
