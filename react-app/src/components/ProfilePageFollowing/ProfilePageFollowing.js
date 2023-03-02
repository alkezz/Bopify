import React from "react";
import { useHistory } from "react-router-dom";

const ProfilePageFollowing = ({ userFollowingList, profilePic }) => {
    const history = useHistory()
    return (
        <>
            {userFollowingList?.map((follower) => {
                return <div className="follower-container" onClick={(e) => history.push(`/user/${follower.id}`)}>
                    <div className="follower-profile-pic">
                        {profilePic}
                    </div>
                    {follower.username}
                    <div>
                        <br />
                        Profile
                    </div>
                </div>
            })}
        </>
    )
}

export default ProfilePageFollowing
