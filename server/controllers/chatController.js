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


// @POST Request
// @route  POST api/chat/group
// @desc   Create a group chat
const createGroupChat = asyncHandler(async (req, res) => {
    const { groupName, users } = req.body;

    // Check for groupname and users
    if (!groupName || !users) {
        res.status(400)
        throw new Error("Group name or users is not recieved")
    }

    const usersToAdd = JSON.parse(users)

    // Check for minimum 2 users
    if (usersToAdd.length < 2) {
        res.status(400)
        throw new Error("Group must have atleast two users")
    }

    usersToAdd.push(req.user._id)
    try {
        const chat = await Chat.create({
            chatName: groupName,
            isGroupChat: true,
            users: usersToAdd,
            groupAdmin: req.user._id
        })
        const fullChat = await Chat.findOne({ _id: chat._id })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
        res.status(200).json({ fullChat })

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

// @POST Request
// @route  POST api/chat/rename
// @desc   Rename a group chat

const renameGroupChat = asyncHandler(async (req, res) => {
    const { groupId, groupName } = req.body;
    if (!groupName) {
        res.status(400)
        throw new Error("Group name is not recieved")
    }
    try {
        const updatedChat = await Chat.findByIdAndUpdate(groupId, { chatName: groupName }, { new: true }).populate("users", "-password")
            .populate("groupAdmin", "-password");
        if (updatedChat) return res.status(200).json({ updatedChat })

        res.status(400)
        throw new Error("Chat not found")

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }

})
module.exports = { accessChats, getAllChats, createGroupChat, renameGroupChat }