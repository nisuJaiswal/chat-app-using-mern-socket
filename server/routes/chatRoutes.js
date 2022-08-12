const express = require('express')
const { authUser } = require('../middlewares/authenticationMiddleware')
const { accessChats, getAllChats, createGroupChat, renameGroupChat, addUserToGroup, removeUserFromGroup } = require('../controllers/chatController')
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

// @POST Request
// @route  POST api/chat/addtogroup
// @desc   Add user to group chat
router.post('/addtogroup', authUser, addUserToGroup)

// @POST Request
// @route  POST api/chat/removefromgroup
// @desc   Remove user from group chat
router.post('/removefromgroup', authUser, removeUserFromGroup)


module.exports = router
