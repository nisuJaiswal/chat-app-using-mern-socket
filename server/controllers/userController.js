const asyncHandler = require("express-async-handler");
const genToken = require("../generateJWTToken");
const User = require("../models/userModel");

// For Register a new user
const register = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    // Validating the user input
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill all the fields');
    }

    // Check existing User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(400)
        throw new Error('User already exists');
    }

    // Create a new user
    const user = await User.create({
        name, email, password, pic
    })

    if (user) {
        res.status(200)
        res.json({ user, jwtToken: genToken(user._id) })
    }
    else {
        res.status(400)
        throw new Error('User not created');
    }

})
module.exports = { register }