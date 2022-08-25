const express = require('express');
const { register, login, search } = require('../controllers/userController');
const { authUser } = require('../middlewares/authenticationMiddleware');
const router = express.Router();

// @POST Request
// @Route: /api/user/
// @Description: Register User
// AND
// @GET Request
// @Route: /api/user?search='some text'
// @Description: Search User
router.route('/').post(register).get(authUser, search)

// @POST Request
// @Route: /api/user/login
// @Description: Login User
router.post('/login', login)


module.exports = router;