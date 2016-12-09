const express = require('express')
const controller = require('../controllers/controllers.api.auth')

const router = express.Router()

router.post('/login', controller.loginUser)
router.post('/signup', controller.signUpUser)
router.get('/verification/:token', controller.verificationNewUser)
router.get('/verification/forgot/:token', controller.verificationForgotPassword)
router.post('/test/signup', controller.testingSignUp)

module.exports = router;
