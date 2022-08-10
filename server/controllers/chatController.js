const asyncHandler = require('express-async-handler')
const Chat = require('../models/chatModel')
const User = require('../models/userModel')


// @POST Request
// @route  POST api/chat
// @desc   Create a chat

const accessChats = asyncHandler(async (req, res) => {

    // Check for user Id
    const { userId } = req.body;

    if (!userId) {
        res.status(400)
        throw new Error("User Id is not recieved")
    }

    // Check if chat is already exists or not
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: userId } } },
            { users: { $elemMatch: { $eq: req.user._id } } }
        ]
    }).populate('users', '-password').populate('latestMessage')

    // Adding user Details to the chat
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        res.status(200).json({ isChat })
    }
    else {
        // Creating brand new Chat
        try {
            const chat = await Chat.create({
                chatName: 'sender',
                isGroupChat: false,
                users: [userId, req.user._id],
            })
            const fullChat = await Chat.findOne({ _id: chat._id })
                .populate('users', '-password')
            res.status(200).json({ fullChat })

        } catch (error) {
            res.status(400)
            throw new Error("Error in creating chat")
        }


    }

})

// @GET Request
// @route  GET api/chat
// @desc   Get all chats
const getAllChats = asyncHandler(async (req, res) => {
    try {

        const foundChats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } }).populate('users', '-password').populate('latestMessage').populate('groupAdmin', '-password').populate('latestMessage')
        res.status(200).json({ foundChats })
    } catch (error) {
        res.status(400)
        throw new Error("Error in getting all chats")

    }
})

module.exports = { accessChats, getAllChats }