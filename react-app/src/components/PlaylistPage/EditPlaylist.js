import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const EditPlaylistForm = ({ playlistId }) => {
    const history = useHistory()
    const dispacth = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [errors, setErrors] = useState([])
    const formData = new FormData()

    if (!sessionUser) {
        return null
    }
    if (!playlistId) {
        return null
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        setImage("")
        const errorList = []
        if (name.length > 20) errorList.push("Name of playlist should be 20 characters or less!")
        if (description.length > 50) errorList.push("Description should be 50 characters or less!")

    }

    return (
        <div className='edit-project-container'>
            <form className='edit-project-form'>
                <h2>Edit details</h2>
                <div className='edit-project-componenets'>
                    <div className='edit-image-container'>
                        <img src='https://ali-practice-aws-bucket.s3.amazonaws.com/playlistDefaultImage.png' />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditPlaylistForm
