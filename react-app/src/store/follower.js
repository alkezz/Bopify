const GET_FOLLOWS = "follower/getFollows"
const ADD_FOLLOW = "follower/addFollow"
const REMOVE_FOLLOW = "follower/removeFollow"
const CLEAR_FOLLOWS = "follower/clearFollows"


const getFollowers = (followers) => {
    return {
        type: GET_FOLLOWS,
        followers
    }
}

const addFollow = (user) => {
    return {
        type: ADD_FOLLOW,
        user
    }
}

const removeFollow = (user) => {
    return {
        type: REMOVE_FOLLOW,
        user
    }
}

const actionClearFollows = () => {
    return {
        type: CLEAR_FOLLOWS
    }
}

export const userFollowList = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/follow-list`)
    if (response.ok) {
        const data = await response.json()
        dispatch(getFollowers(data))
        return data
    } else {
        return response
    }
}

export const followUser = (id, id2) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/follow/${id2}`, {
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
    const response = await fetch(`/api/users/${id}/follow/${id2}`, {
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

export const clearFollows = () => async (dispatch) => {
    dispatch(actionClearFollows())
    return { message: "follows cleared" }
}

const initalState = { "current_followed_user_ids": [], "followed_by_user_ids": [] }

const followReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_FOLLOWS:
            return { ...state, ...action.followers }
        case ADD_FOLLOW:
            return { ...state, current_followed_user_ids: [...state.current_followed_user_ids, action.user] }
        case REMOVE_FOLLOW:
            return { ...state, current_followed_user_ids: state.current_followed_user_ids.filter((e) => e !== action.user) }
        case CLEAR_FOLLOWS:
            return { ...initalState }

        default:
            return state
    }
}

export default followReducer
