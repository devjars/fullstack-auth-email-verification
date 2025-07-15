const express = require('express');
const router = express.Router();
const UserauthController = require('../Controllers/UserauthController');
const ValidateRequest = require("../Middleware/ValidateRequest");
const AuthSchema = require("../validation/AuthSchema");
const {  ValidateToken } = require("../Middleware/Jwt");



router.post('/register', ValidateRequest(AuthSchema.SignUpSchema), UserauthController.AddnewUser);

router.post('/verify', ValidateToken, ValidateRequest(AuthSchema.VerifySchema), UserauthController.VerifyCode);

router.post('/login', ValidateRequest(AuthSchema.LoginSchema), UserauthController.Login);

router.get('/session', ValidateToken, UserauthController.CheckSession);

router.get('/verification-status', ValidateToken, UserauthController.CheckPendingVerification);

router.get('/resend-code', ValidateRequest(AuthSchema.ResendCodeSchema, 'query'), UserauthController.GetnewCode);

module.exports = router;
