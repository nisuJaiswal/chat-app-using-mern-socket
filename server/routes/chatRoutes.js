const express = require('express')
const { authUser } = require('../middlewares/authenticationMiddleware')
const { accessChats, getAllChats } = require('../controllers/chatController')
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

module.exports = router
