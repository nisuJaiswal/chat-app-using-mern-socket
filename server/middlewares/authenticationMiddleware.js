const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authUser = asyncHandler(async (req, res, next) => {
    let token;


    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1];
            const res = await jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(res.id).select('-password');
            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not Authorized User")
        }

    }

    if (!token) {
        res.status(401)
        throw new Error("Not Authorized User")
    }
})

module.exports = { authUser }