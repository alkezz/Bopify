const GET_PLAYLISTS = "/playlists/getPlaylists"
const GET_ONE_PLAYLIST = "/playlists/getOnePlaylist"
const CREATE_PLAYLIST = "/playlists/createPlaylist"
const EDIT_PLAYLIST = "/playlists/editPlaylist"
const DELETE_PLAYLIST = "/playlists/deletePlaylist"

const actionGetPlaylists = (playlists) => {
    return {
        type: GET_PLAYLISTS,
        playlists
    }
}

//ACTION CREATORS
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

const actionDeletePlaylist = (playlist) => {
    return {
        type: DELETE_PLAYLIST,
        playlist
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

// export const createPlaylist = () => {

// }


const initialState = {}

export default function playlistReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case GET_PLAYLISTS:
            console.log("IN REDUCER", action.playlists)
            action.playlists.forEach((playlist) => {
                newState[playlist.id] = playlist
            })
            return newState
        default:
            return state
    }
}
