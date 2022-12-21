const GET_LIKES = "/songs/getSongLikes"
const LIKE_SONG = "/songs/likeSong"
const UNLIKE_SONG = "/songs/unlikeSong"
const CLEAR_LIKES = "/songs/clearLikes"

const actionGetUserLikes = (likes) => {
    return {
        type: GET_LIKES,
        likes
    }
}

const actionLikeSong = (song) => {
    return {
        type: LIKE_SONG,
        song
    }
}

const actionUnlikeSong = (songId) => {
    return {
        type: UNLIKE_SONG,
        songId
    }
}

const actionClearLikes = () => {
    return {
        type: CLEAR_LIKES
    }
}

export const getLikesSongs = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/song_likes`)
    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetUserLikes(data.likedSongs))
        return data
    }
    return response
}

export const likeSong = (userId, songId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/like-song/${songId}`, {
        method: "POST"
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionLikeSong(data.likedSongs))
        return data
    }
    return response
}

export const unlikeSong = (userId, songId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/like-song/${songId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionUnlikeSong(data.likedSongs))
        return data
    }
    return response
}

export const clearLikes = () => async (dispatch) => {
    dispatch(actionClearLikes())
    return { "message": "Likes have been successfully cleared" }
}

const initialState = {}

export default function likedSongReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LIKES: {
            let newState = { ...state }
            action.likes.forEach((like) => {
                newState[like.id] = like
            })
            return newState
        }
        case LIKE_SONG: {
            let newState = { ...state }
            newState[action.song[0].id] = action.song
            return newState
        }
        case UNLIKE_SONG: {
            let newState = { ...state }
            delete newState[action.songId]
            return newState
        }
        case CLEAR_LIKES: {
            return { ...initialState }
        }
        default:
            return state
    }
}
