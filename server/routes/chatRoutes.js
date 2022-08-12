const express = require('express')
const { authUser } = require('../middlewares/authenticationMiddleware')
const { accessChats, getAllChats, createGroupChat, renameGroupChat } = require('../controllers/chatController')
const router = express.Router()


// AND


router.route('/')
    // @POST Request
    // @route  POST api/chat
    // @desc   Create a chat
    .post(authUser, accessChats)
    // @GET Request
    // @route  GET api/chat
    // @desc   Get all chats
    .get(authUser, getAllChats)



// @POST Request
// @route  POST api/chat/group
// @desc   Create a group chat
router.post('/group', authUser, createGroupChat)

// @POST Request
// @route  POST api/chat/rename
// @desc   Rename a group chat
router.post('/rename', renameGroupChat)
// Add user to group chat
// Delete user from gtoup chat



module.exports = router
