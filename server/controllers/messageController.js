const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

// @POST Request
// @route: /api/message
// @DESC Create a new message
const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body

    if (!content || !chatId) {
        res.status(400)
        throw new Error('Please provide content and chatId')
    }

    try {
        let message = await Message.create({
            sender: req.user,
            content,
            chat: chatId
        })
        message = await message.populate('sender', 'name pic')
        message = await message.populate('chat')
        message = await User.populate(message, { path: 'chat.users', select: 'name pic email' })

        await Chat.findByIdAndUpdate(chatId, { latestMessage: message })
        res.json(message)
    } catch (err) {
        res.status(400)
        throw new Error(err.message)

    }
})

// @GET Request
// @Path: /api/message
// @Description: Get all messages
const getMessages = asyncHandler(async (req, res) => {
    const { chatId } = req.params
    try {
        const message = await Message.find({ chat: chatId })
            .populate('sender', 'name pic email')
            .populate('chat')
        // .populate('latestMessage')
        res.json(message)
    } catch (err) {
        res.status(400)
        console.log(err)
        throw new Error(err.message)

    }

})
module.exports = { sendMessage, getMessages }