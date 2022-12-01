const GET_PLAYLIST_FOLLOWS = "playlistFollow/getPlaylistFollows"
const ADD_PLAYLIST_FOLLOW = "playlistFollow/addPlaylistFollow"
const REMOVE_PLAYLIST_FOLLOW = "playlistFollow/removePlaylistFollow"

const getFollowers = (followers) => {
    return {
        type: GET_PLAYLIST_FOLLOWS,
        followers
    }
}

const addFollow = (user) => {
    return {
        type: ADD_PLAYLIST_FOLLOW,
        user
    }
}

const removeFollow = (user) => {
    return {
        type: REMOVE_PLAYLIST_FOLLOW,
        user
    }
}

export const playlistFollowList = (id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${id}/playlist-follows`)
    if (response.ok) {
        const data = await response.json()
        dispatch(getFollowers(data))
        return data
    } else {
        return response
    }
}

export const followUser = (id, id2) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/follow-playlist/${id2}`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        }
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(addFollow(id2))
        return data
    } else {
        return response
    }
}

export const unfollowUser = (id, id2) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/follow-playlist/${id2}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(removeFollow(id2))
        return data
    } else {
        return await response.json()
    }
}

const initalState = { "current_followed_user_ids": [], "followed_by_user_ids": [] }

const playlistFollowReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_PLAYLIST_FOLLOWS:
            return { ...state, ...action.followers }
        case ADD_PLAYLIST_FOLLOW:
            return { ...state, current_followed_user_ids: [...state.current_followed_user_ids, action.user] }
        case REMOVE_PLAYLIST_FOLLOW:
            return { ...state, current_followed_user_ids: state.current_followed_user_ids.filter((e) => e !== action.user) }
        default:
            return state
    }
}

export default playlistFollowReducer
