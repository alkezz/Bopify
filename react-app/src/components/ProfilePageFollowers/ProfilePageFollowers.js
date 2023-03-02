import React from "react";
import { useHistory } from "react-router-dom";

const ProfilePageFollowers = ({ userFollowerList, profilePic }) => {
    const history = useHistory()
    return (
        <>
            {userFollowerList?.map((follower) => {
                return <div className="follower-container" onClick={(e) => history.push(`/user/${follower.id}`)}>
                    <div className="follower-profile-pic">
                        {profilePic}
                    </div>
                    <span>{follower.username}</span>
                    <div>
                        <br />
                        Profile
                    </div>
                </div>
            })}
        </>
    )
}

export default ProfilePageFollowers
