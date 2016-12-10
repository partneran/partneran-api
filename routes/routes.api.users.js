const express = require('express')
const controller = require('../controllers/controllers.api.users')

const router = express.Router()

router.get('/:id', controller.getOneUser)
router.put('/:id', controller.editOneUser)
router.delete('/:id', controller.deleteOneUser)
router.post('/forgot', controller.submitEmailForgotPassword)
router.post('/password', controller.submitNewPasswordForgotPassword)
router.post('/test/forgot', controller.testSubmitNewPasswordForgotPassword)
router.delete('/:id', controller.deleteOneUser)
router.put('/testedit/:id', controller.testingEditOneUser)

module.exports = router;
