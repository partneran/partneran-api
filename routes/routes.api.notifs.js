const express = require('express')
const controller = require('../controllers/controllers.api.notifs')

const router = express.Router()

router.post('/', controller.createOneNotif)
router.put('/:notifid', controller.editOneNotif)
router.delete('/:notifid', controller.deleteOneNotif)

module.exports = router;
