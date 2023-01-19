import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import "./EditPlaylist.css"
import * as playlistActions from "../../store/playlist"
const EditPlaylistForm = ({ playlistId, setShowModal }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const playlistToEdit = useSelector((state) => state.playlist)
    const playlistArray = Object.values(playlistToEdit)
    const userPlaylist = playlistArray.filter(playlist => Number(playlist.id) === Number(playlistId))
    const [image, setImage] = useState("")
    const [errors, setErrors] = useState([])
    const [name, setName] = useState(userPlaylist[0].name)
    const [description, setDescription] = useState(userPlaylist[0].description)
    const formData = new FormData()
    useEffect(async () => {
        await dispatch(playlistActions.getOnePlaylist(playlistId))
        await dispatch(playlistActions.getAllPlaylists())
    }, [dispatch])
    useEffect(() => {
        const errorList = []
        if (name.length <= 0) errorList.push("Playlist name is required")
        setErrors(errorList)
    }, [name.length])
    if (!sessionUser) {
        return null
    }
    if (!playlistId) {
        return null
    }
    let correctFile = true
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (errors.length) return
        setErrors([])
        setImage("")
        const errorList = []
        if (name.length > 15) errorList.push("Name of playlist should be 15 characters or less!")
        // if (description.length > 80 || description.length < 10) errorList.push("Description should be between 10 and 80 characters!")
        let imageInput = document.querySelector("#file-input")
        setErrors(errorList)
        // if(errorList.length){
        //     return
        // }
        for (let i = 0; i < imageInput.files.length; i++) {
            let img = imageInput.files[i]
            if (img.type !== "image/gif" && img.type !== "image/jpeg" && img.type !== "image/png") {
                correctFile = false
            }
            formData.append('file', img)
        }
        if (correctFile === false) errorList.push("You may only upload .GIF, .JPEG/.JPG, and .PNG files!")
        setErrors(errorList)
        if (errorList.length) return
        let img = imageInput.files[0]
        formData.append('file', img)
        if (img === undefined && !description) {
            const editedPlaylist = {
                name,
                description: " ",
                playlist_img: ""
            }
            const newPlaylist = await dispatch(playlistActions.editPlaylist(editedPlaylist, playlistId))
            if (newPlaylist) {
                await dispatch(playlistActions.getOnePlaylist(playlistId))
                await dispatch(playlistActions.getAllPlaylists())
                await setShowModal(false)
            }
        } else if (img === undefined && description) {
            const editedPlaylist = {
                name,
                description,
                playlist_img: ""
            }
            const newPlaylist = await dispatch(playlistActions.editPlaylist(editedPlaylist, playlistId))
            if (newPlaylist) {
                await dispatch(playlistActions.getOnePlaylist(playlistId))
                await dispatch(playlistActions.getAllPlaylists())
                await setShowModal(false)
            }
        } else if (img !== undefined && !description) {
            const picture = await fetch("/api/playlists/images/upload", {
                method: "POST",
                body: formData
            })
            const imageURL = await picture.json()
            const editedPlaylist = {
                name,
                description: " ",
                playlist_img: imageURL.image
            }
            const newPlaylist = await dispatch(playlistActions.editPlaylist(editedPlaylist, playlistId))
            if (newPlaylist) {
                await dispatch(playlistActions.getOnePlaylist(playlistId))
                await dispatch(playlistActions.getAllPlaylists())
                await setShowModal(false)
            }
        } else {
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
                await setShowModal(false)
            }
        }
    }
    return (
        <div className='edit-project-container'>
            <form className='edit-project-form' onSubmit={handleSubmit}>
                <h2>Edit details</h2>
                <div>
                    {errors.map((error) => {
                        return <span>{error}</span>
                    })}
                </div>
                <br />
                <div className='edit-project-componenets'>
                    <div style={{ width: "200px", height: "200px" }} className='edit-image-container'>
                        <label htmlFor='file-input'>
                            <img style={{ width: "200px", height: "210px" }} src={userPlaylist[0].playlist_img} />
                        </label>
                        <input id='file-input' type='file' name='file' encType="multipart/form-data" />
                    </div>
                    <div className='name-description-container'>
                        <label>Name</label>
                        <input id='edit-name-input' name='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                        <br />
                        <label>Description</label>
                        <textarea placeholder='Add a description' id='description-textarea' name='description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <div id='submit-edit-button-div'>
                    <button style={{ cursor: "pointer" }} id='submit-edit-button' type='submit'>Save</button>
                </div>
            </form>
            <div style={{ fontSize: "11.5px", marginTop: "10px", marginLeft: "10px" }}>
                By proceeding, you agree to give Bopify access to the image you choose to upload. Please make sure you have the right to upload the image.
            </div>
        </div>
    )
}

export default EditPlaylistForm
