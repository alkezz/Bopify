import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../../context/Modal";
import EditPlaylistForm from "./EditPlaylist";

const EditPlaylistModal = ({ playlistId, playlist, onePlaylist }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)}>
                <div className='playlist-header-container' style={{ backgroundImage: playlist ? `url(${playlist.playlist_img})` : null, backgroundSize: playlist ? "0.5px 0.5px" : null, width: "106.65%" }}>
                    <div style={{ width: "250px", height: "250px", paddingLeft: "30px" }} id='picture-container'>
                        <img style={{ width: "250px", height: "250px" }} src={playlist?.playlist_img} />
                        {/* <EditPlaylistModal playlistId={playlistId} playlist={playlist} /> */}
                    </div>
                    <div id='playlist-info-container' style={{ paddingLeft: "30px" }}>
                        <div id='playlist-word-container' style={{ fontSize: "12px" }}>
                            PLAYLIST
                        </div>
                        <div id='playlist-name' style={{ cursor: "pointer", fontSize: "70px", fontWeight: "700", textDecoration: "none" }}>
                            {playlist?.name}
                        </div>
                        <div id='playlist-description'>
                            {playlist?.description}
                        </div>
                        <div>
                            <Link style={{ textDecoration: "none", color: "white" }} to={`/user/${onePlaylist?.User?.id}`}>
                                {onePlaylist?.User?.username}
                            </Link>
                            <span style={{ fontSize: "20px" }}>·</span>
                            {onePlaylist?.Songs && (
                                <span>{onePlaylist?.Songs?.length} songs</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditPlaylistForm playlistId={playlistId} onClick={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default EditPlaylistModal
