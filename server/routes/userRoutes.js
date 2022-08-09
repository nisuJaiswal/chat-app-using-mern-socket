const express = require('express');
const { register } = require('../controllers/userController');
const router = express.Router();

// @POST Request
// @Route: /api/user/
// @Description: Register User
router.post('/', register)


module.exports = router;