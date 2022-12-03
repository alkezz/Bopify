import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../../context/Modal";

const DeletePlaylistModal = ({ }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div onClick={() => setShowModal(true)}>
                <div>

                </div>
            </div>
        </>
    )
}
