import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditPlaylistForm from "./EditPlaylist";

const EditPlaylistModal = ({ playlistId, playlist }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)}>
                <img src={playlist.playlist_img} />
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
