const express = require('express');
const router = express.Router();


const {UserController} = require('../controllers/index.js');
const userCtrl = new UserController();

router.post('/users', userCtrl.createUserCtrl);
router.get('/users', userCtrl.getUsersCtrl);
router.get('/users/:userId', userCtrl.getUsersCtrl);
router.post('/users/:followerUserId/follow/:userId', userCtrl.followUserCtrl);
router.get('/users/:userId/followers', userCtrl.getFollowersCtrl);
router.post('/posts', userCtrl.createPost);
router.get('/posts', userCtrl.getPosts);

module.exports = router;