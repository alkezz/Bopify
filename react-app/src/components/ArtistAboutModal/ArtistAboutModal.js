import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Grow from '@mui/material/Grow';
import Backdrop from '@mui/material/Backdrop';
import "./ArtistAboutModal.css"

const ArtistAboutModal = ({ artistBio, artistImg }) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    return (
        <div className='artist-biography-container' style={{ marginLeft: "40px" }}>
            <h2 style={{ color: "white" }}>About</h2>
            <div onClick={handleOpen} className="growImage" style={{ borderRadius: "10px", backgroundSize: "1000px 550px", display: "flex", alignItems: "flex-end", color: "white", marginRight: "500px", fontSize: "18px", cursor: "pointer", backgroundImage: `url(${artistImg})`, height: "550px", backgroundRepeat: "no-repeat" }}>
                <div style={{ width: "75%", marginBottom: "50px", marginLeft: "60px", textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}>{artistBio?.slice(0, 208)}...</div>
            </div>
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
            >
                <Grow timeout={500} in={open} style={{ transformOrigin: "bottom center" }}>
                    <div style={{ width: "50%", marginLeft: "30%", marginTop: "10%" }}>
                        <div style={{ backgroundColor: "#121212", padding: "15px", borderRadius: "10px" }}>
                            <img src={artistImg} style={{ width: "100%", height: "400px" }} />
                            <span style={{ color: "white" }}>{artistBio}</span>
                        </div>
                    </div>
                </Grow>
            </Modal>
        </div>
    )
}

export default ArtistAboutModal
