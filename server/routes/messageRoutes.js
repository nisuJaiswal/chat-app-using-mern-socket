const { sendMessage, getMessages } = require('../controllers/messageController')
const { authUser } = require('../middlewares/authenticationMiddleware')

const express = require('express')
const router = express.Router()

// @POST Request
// @route: /api/message
// @DESC Create a new message
router.post('/', authUser, sendMessage)

// @GET Request
// @route: /api/message
// @Description: Get all messages
router.get('/:chatId', authUser, getMessages)
module.exports = router 