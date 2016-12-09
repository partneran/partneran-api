const express = require('express')
const controller = '../controllers/controllers.api.users'

const router = express.Router()

router.get('/:id', controller.getOneUser)
router.put('/:id', controller.editOneUser)
router.delete('/:id', controller.deleteOneUser)
router.post('/forgot', controller.submitEmailForgotPassword)
router.post('/password', controller.submitNewPasswordForgotPassword)

module.exports = router;
