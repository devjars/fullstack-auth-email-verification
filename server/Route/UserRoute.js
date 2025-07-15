
const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const { ValidateToken } = require('../Middleware/Jwt')


router.get("/get-email" ,ValidateToken, UserController.GetEmail)


module.exports = router;
