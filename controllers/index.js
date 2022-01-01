const e = require("express");
const {createUser, getUsers} = require('../services/index.js');

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
}

module.exports = {
    UserController
}