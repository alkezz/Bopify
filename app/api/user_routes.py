from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db, Playlist
from app.models.user import follows

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route("/<int:id>/playlists")
def user_playlist(id):
    """
    Return a user's playlists with images attached
    /api/users/:id/playlists
    """
    user = User.query.get(id)
    return user.to_dict(playlist=True)

@user_routes.route("/<int:id>/followed-playlists")
def user_followed_playlists(id):
    user = User.query.get(id)
    if user:
        return user.to_dict(followed_playlists=True)
    else:
        return {"message": f"User with id of {id} not found"}

@user_routes.route("/<int:id>/follow-playlist/<int:id2>", methods=["POST", "DELETE"])
@login_required
def follow_playlist(id, id2):
    user = User.query.get(id)
    playlist = Playlist.query.get(id2)

    if user:
        if playlist:
            if request.method == "POST":
                user.playlist_following.append(playlist)
                db.session.commit()
                return user.to_dict(followed_playlists=True)
            else:
                user.playlist_following.remove(playlist)
                db.session.commit()
                return user.to_dict(followed_playlists=True)
        else:
            return {"message": f"Playlist with id of {id2} not found"}
    else:
        return {"message": f"User with id of {id} not found"}


@user_routes.route("/<int:id>/follow/<int:id2>", methods=["POST", "DELETE"])
@login_required
def follow(id, id2):
    """
    Route to add or remove a follow for user with id1 to user with id2
    Syntax: user id 1 will follow/unfollow user id 2
    """
    current_user = User.query.get(id)
    other_user = User.query.get(id2)
    if request.method == "POST":
        current_user.followers.append(other_user)
        db.session.commit()
        user_followers = User.query.filter(User.followers.any(id=id2)).all()
        return {"followers": [follower.to_dict() for follower in user_followers]}
    if request.method == "DELETE":
        current_user.followers.remove(other_user)
        db.session.commit()
        user_followers = User.query.filter(User.followers.any(id=id2)).all()
        return {"followers": [follower.to_dict() for follower in user_followers]}

@user_routes.route("/<int:id>/follow-list")
def userFollows(id):
    # user_following_list = db.session.query(follows).filter_by(follower_id = id).all()
    # user_followed_list = db.session.query(follows).filter_by(followed_id = id).all()
    # follow_info = {"userFollowing": [], "userFollowers": []}
    # for following_ids, follower_ids in user_following_list:
    #     if following_ids == id:
    #         follow_info["userFollowers"].append(follower_ids)
    # for following_ids, follower_ids in user_followed_list:
    #     if follower_ids == id:
    #         follow_info["userFollowing"].append(following_ids)
    # return follow_info
    user_followinfo = db.session.query(follows).filter_by(follower_id = id).all()
    user_followedinfo = db.session.query(follows).filter_by(followed_id = id).all()
    newObj = { "current_followed_user_ids": [], "followed_by_user_ids": []}
    for x,z in user_followinfo:
        if x == id:
            newObj["current_followed_user_ids"].append(z)

    for x,z in user_followedinfo:
        if z == id:
            newObj["followed_by_user_ids"].append(x)
    return newObj

@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
