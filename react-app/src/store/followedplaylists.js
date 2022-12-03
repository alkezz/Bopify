const GET_FOLLOWED_PLAYLISTS = "/playlists/getFollowedPlaylists"
const FOLLOW_PLAYLIST = "/playlists/followPlaylist"
const UNFOLLOW_PLAYLIST = "/playlist/unfollowPlaylist"

const actionGetFollowedPlaylists = (playlists) => {
    return {
        type: GET_FOLLOWED_PLAYLISTS,
        playlists
    }
}

const actionfollowPlaylist = (playlist) => {
    return {
        type: FOLLOW_PLAYLIST,
        playlist
    }
}

const actionUnfollowPlaylist = (playlistId) => {
    return {
        type: UNFOLLOW_PLAYLIST,
        playlistId
    }
}

export const getFollowedPlaylists = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/followed-playlists`)
    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetFollowedPlaylists(data.followedPlaylists))
        return data
    }
    return response
}

export const followPlaylist = (userId, playlistId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/follow-playlist/${playlistId}`, {
        method: "POST"
    })
    if (response.ok) {
        const data = await response.json()
        console.log("DATA IN FOLLOWPLAYLIST THUNK", data)
        dispatch(actionfollowPlaylist(data.followedPlaylists))
        return data
    }
    return response
}

export const unfollowPlaylist = (userId, playlistId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/follow-playlist/${playlistId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionUnfollowPlaylist(playlistId))
        return data
    }
    return response
}

const initialState = {}

// export default function followedPlaylistReducer(state = initialState, action) {
//     let newState = {}
//     switch (action.type) {
//         case GET_FOLLOWED_PLAYLISTS:
//             newState = { ...state }
//             action.playlists.forEach((playlist) => {
//                 newState[playlist.id] = playlist
//             })
//             return newState
//         case FOLLOW_PLAYLIST:
//             return { ...state, ...action.playlist }
//         case UNFOLLOW_PLAYLIST:
//             console.log(action, "ACTION IN FOLLWOEPD:ALTS STORE")
//             let newState = { ...state }
//             delete newState[action.playlist.id]
//             return newState
//         default:
//             return state
//     }
// }

export default function followedPlaylistReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case GET_FOLLOWED_PLAYLISTS: {
            let newState = { ...state }
            action.playlists.forEach((playlist) => {
                newState[playlist.id] = playlist
            })
            return newState
        }
        case FOLLOW_PLAYLIST: {
            let newState = { ...state }
            newState[action.playlists.id] = action.playlist
            return newState
        }
        case UNFOLLOW_PLAYLIST: {
            console.log(action, "ACTION IN FOLLWOEPD:ALTS STORE")
            let newState = { ...state }
            delete newState[action.playlistId]
            return newState
        }
        default:
            return state
    }
}
