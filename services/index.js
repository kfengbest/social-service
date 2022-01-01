const db = require('../models/index.js');

const createUser = async (userInfo) => {
    const user = await db.User.create(userInfo);
    return user;
}

const getUsers = async (userId) => {
    if(!userId) {
        return await db.User.findAll();
    } else {
        return await db.User.findAll({
            where : {
                userId : userId
            }
        })
    }
}

const followUser = async (userId, followerUserId) => {

    if(!userId) {
        return 'Invalid userId';
    }

    if(!followerUserId) {
        return "Invalid followerUserId";
    }

    if(userId === followerUserId) {
        return "Invalid: User cannot follow themselves!";
    }

    const user = await db.User.findOne({
        where : {
            userId
        }
    });

    if (!user) {
        return `User '${userId}' does not exist!`;
    }

    const followerUser = await db.User.findOne({
        where : {
            userId : followerUserId
        }
    });

    if (!followerUser) {
        return `folowerUser '${followerUserId}' does not exist!`;
    }

    const association = await user.addFollower(followerUser);

    if (!association) {
        throw new Error(`Rollback initiated: User '${userId}' has already followed user '${followerUserId}'!`);
    }

    return `User '${followerUser.userName}' has successfully followed user '${user.userName}'!`;

}

const getFollowers = async (userId) => {

    const user = await db.User.findOne({
        where : {
            userId
        }
    });

    const followerUsers = await user.getFollowers();

    return followerUsers;
    
}

const createPost = async (userId, content) => {

    const post = await db.Post.create({
        userId : userId,
        content : content,
        type : 'text'
    });

    return post;
}

const getPosts = async (userId) => {
    const posts = await db.Post.findAll({
        where : {
            userId : userId
        }
    });

    return posts;
}

const likePost = async(userId, postId) => {
    const user = await db.User.findOne({
        userId : userId
    });

    const post = await db.Post.findOne({
        postId : postId
    });

    const userLikedPostAsso = await post.addLikers(user);

    return userLikedPostAsso;
}

const getPostLikers = async (postId) => {

    const post = await db.Post.findOne({
        postId : postId
    });

    const likers = await post.getLikers();

    return likers;
}

module.exports = {
    createUser ,
    getUsers,
    followUser,
    getFollowers,
    createPost,
    getPosts,
    likePost,
    getPostLikers
}