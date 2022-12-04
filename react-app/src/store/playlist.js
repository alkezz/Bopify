const GET_PLAYLISTS = "/playlists/getPlaylists"
const GET_FOLLOWED_PLAYLISTS = "/playlists/getFollowedPlaylists"
const GET_ONE_PLAYLIST = "/playlists/getOnePlaylist"
const CREATE_PLAYLIST = "/playlists/createPlaylist"
const EDIT_PLAYLIST = "/playlists/editPlaylist"
const DELETE_PLAYLIST = "/playlists/deletePlaylist"


//ACTION CREATORS
const actionGetPlaylists = (playlists) => {
    return {
        type: GET_PLAYLISTS,
        playlists
    }
}

const actionGetFollowedPlaylists = (playlists) => {
    return {
        type: GET_FOLLOWED_PLAYLISTS,
        playlists
    }
}

const actionGetOnePlaylist = (playlist) => {
    return {
        type: GET_ONE_PLAYLIST,
        playlist
    }
}

const actionCreatePlaylist = (playlist) => {
    return {
        type: CREATE_PLAYLIST,
        playlist
    }
}

const actionEditPlaylist = (playlist) => {
    return {
        type: EDIT_PLAYLIST,
        playlist
    }
}

const actionDeletePlaylist = (id) => {
    return {
        type: DELETE_PLAYLIST,
        id
    }
}

//THUNKS
export const getAllPlaylists = () => async (dispatch) => {
    const response = await fetch("/api/playlists/")
    if (response.ok) {
        const data = await response.json()
        console.log("DATA IN THUNK", data.Playlists)
        dispatch(actionGetPlaylists(data.Playlists))
        return data.Playlists
    } else {
        return response
    }
}

export const getFollowedPlaylists = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/followed-playlists`)
    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetFollowedPlaylists(data))
        return data
    }
    return response
}

export const getOnePlaylist = (id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${id}/`)
    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetOnePlaylist(data))
        return data
    } else {
        return response
    }
}

export const createPlaylist = (playlist) => async (dispatch) => {
    const response = await fetch("/api/playlists/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlist)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionCreatePlaylist(data))
        return data
    } else {
        return response
    }
}

export const editPlaylist = (playlist, id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${id}/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlist)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionEditPlaylist(data))
        return data
    } else {
        return response
    }
}

export const deletePlaylist = (id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${id}/`, {
        method: "DELETE"
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionDeletePlaylist(id))
        return data
    } else {
        return response
    }
}

const initialState = {}

export default function playlistReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case GET_PLAYLISTS:
            newState = { ...state }
            action.playlists.forEach((playlist) => {
                newState[playlist.id] = playlist
            })
            return newState
        // case GET_FOLLOWED_PLAYLISTS:
        //     newState = { ...state }
        //     console.log(action, "ACTION")
        //     action.playlists.followedPlaylists.forEach((playlist) => {
        //         newState[playlist.id] = playlist
        //     })
        //     return newState
        case GET_ONE_PLAYLIST:
            newState = { ...state }
            newState[action.playlist.id] = action.playlist
            return newState
        case CREATE_PLAYLIST:
            newState = { ...state }
            newState[action.playlist.id] = action.playlist
            return newState
        case EDIT_PLAYLIST:
            newState = { ...state }
            newState[action.playlist.id] = action.playlist
            return newState
        case DELETE_PLAYLIST:
            newState = { ...state }
            delete newState[action.id]
            return newState
        default:
            return state
    }
}
