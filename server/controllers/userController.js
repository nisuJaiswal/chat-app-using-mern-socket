const asyncHandler = require("express-async-handler");
const genToken = require("../generateJWTToken");
const User = require("../models/userModel");

// @POST Request
// @Route: /api/user/
// @Description: Register User
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
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic, jwtToken: genToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('User not created');
    }

})

// @POST Request
// @Route: /api/user/login
// @Description: Login User
const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error('Please fill all the fields');
    }

    // Checkin existing user
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400)
        throw new Error('User not found');
    }

    if (user && (await user.comparePasswords(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic, jwtToken: genToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error('User not found or Password seems to be incorrect');
    }
})

// @GET Request
// @Route: /api/user?search='some text'
// @Description: Search User
const search = asyncHandler(async (req, res) => {
    const { search } = req.query
    const searchTerm = search ? search : '';

    const users = await User.find({ $or: [{ name: { $regex: searchTerm, $options: 'i' } }, { email: { $regex: searchTerm, $options: 'i' } }] }).find({ _id: { $ne: req.user._id } });
    res.send(users)
})

module.exports = { register, login, search }