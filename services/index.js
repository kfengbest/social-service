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

module.exports = {
    createUser ,
    getUsers
}