const express = require('express')
const controller = require('../controllers/controllers.api.list_approves')

const router = express.Router()

router.post('/', controller.createListApprove)
router.get('/', controller.getAllListPostBy)
router.put('/:list_approve_id', controller.editListApprove)
router.delete('/:list_approve_id', controller.deleteListApprove)

module.exports = router;
