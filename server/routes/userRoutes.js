const express = require('express');
const { register, login } = require('../controllers/userController');
const router = express.Router();

// @POST Request
// @Route: /api/user/
// @Description: Register User
router.post('/', register)

// @POST Request
// @Route: /api/user/login
// @Description: Login User
router.post('/login', login)




module.exports = router;