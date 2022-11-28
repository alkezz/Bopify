import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import "./EditPlaylist.css"
import * as playlistActions from "../../store/playlist"
const EditPlaylistForm = ({ playlistId }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const playlistToEdit = useSelector((state) => state.playlist)
    const [image, setImage] = useState("")
    const [errors, setErrors] = useState([])
    const formData = new FormData()
    useEffect(async () => {
        await dispatch(playlistActions.getOnePlaylist(playlistId))
        await dispatch(playlistActions.getAllPlaylists())
    }, [dispatch])
    const playlistArray = Object.values(playlistToEdit)
    const userPlaylist = playlistArray.filter(playlist => Number(playlist.id) === Number(playlistId))
    const [name, setName] = useState(userPlaylist[0].name)
    const [description, setDescription] = useState(userPlaylist[0].description)
    console.log(userPlaylist)
    if (!sessionUser) {
        return null
    }
    if (!playlistId) {
        return null
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        setImage("")
        const errorList = []
        if (name.length > 20) errorList.push("Name of playlist should be 20 characters or less!")
        let imageInput = document.querySelector("#file-input")
        setErrors(errorList)
        // if(errorList.length){
        //     return
        // }
        let img = imageInput.files[0]
        formData.append('file', img)
        const picture = await fetch("/api/playlists/images/upload", {
            method: "POST",
            body: formData
        })
        const imageURL = await picture.json()
        const editedPlaylist = {
            name,
            description,
            playlist_img: imageURL.image
        }
        const newPlaylist = await dispatch(playlistActions.editPlaylist(editedPlaylist, playlistId))
        if (newPlaylist) {
            await dispatch(playlistActions.getOnePlaylist(playlistId))
            await dispatch(playlistActions.getAllPlaylists())
        }
    }

    return (
        <div className='edit-project-container'>
            <form className='edit-project-form' onSubmit={handleSubmit}>
                <h2>Edit details</h2>
                <div className='edit-project-componenets'>
                    <div className='edit-image-container'>
                        <label htmlFor='file-input'>
                            <img src={userPlaylist[0].playlist_img} />
                        </label>
                        <input id='file-input' type='file' name='file' encType="multipart/form-data" />
                    </div>
                    <div className='name-description-container'>
                        <label>Name</label>
                        <input id='edit-name-input' name='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                        <br />
                        <label>Description</label>
                        <textarea placeholder='Add an optional description' id='description-textarea' name='description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <div id='submit-edit-button-div'>
                    <button id='submit-edit-button' type='submit'>Save</button>
                </div>
            </form>
            <div style={{ fontSize: "11.5px", marginTop: "10px", marginLeft: "10px" }}>
                By proceeding, you agree to give Bopify access to the image you choose to upload. Please make sure you have the right to upload the image.
            </div>
        </div>
    )
}

export default EditPlaylistForm
