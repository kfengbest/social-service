const e = require("express");
const {createUser, getUsers, followUser, getFollowers} = require('../services/index.js');

class UserController {
    constructor() {}

    async createUserCtrl(req, res) {
        try {
            const userInfo = req.body;

            const user = await createUser(userInfo);
            
            return res.json(user);

        } catch (err) {
            return res.status(500).json({error : e.message});
        }
    }

    async getUsersCtrl(req, res) {
        try {
            const userId = req.params.userId;

            let users = await getUsers(userId);
            return res.json(users);

        } catch (err) {
            return res.status(500).json({error : e.message});
        }
    }

    async followUserCtrl(req, res) {
        try {
            const userId = req.params.userId;
            const followerUserId = req.params.followerUserId;

            let result = await followUser(userId, followerUserId);
            return res.json(result);

        } catch (err) {
            return res.status(500).json({error : e.message});
        }
    }

    async getFollowersCtrl(req, res) {
        try {
            const userId = req.params.userId;

            let result = await getFollowers(userId);
            return res.json(result);

        } catch (err) {
            return res.status(500).json({error : e.message});
        }
    }
}

module.exports = {
    UserController
}