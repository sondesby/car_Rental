const express = require("express");
const resetPassword = require("../middlewares/resetPassword");
const auth = require("../middlewares/auth")
const router = express.Router();


//Send link to reset password
router.post('/forgot-password',resetPassword.forgotPassword)

//Reset password
router.post('/reset-password',auth.verifyResetPassword,resetPassword.resetPass)

module.exports = router;
