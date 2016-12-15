const express = require('express')
const controller = require('../controllers/controllers.api.reports')

const router = express.Router()

router.post('/:ideaid/reports', controller.addOneReport)
router.get('/:ideaid/reports', controller.showAllReports)
router.delete('/:ideaid/reports/:reportid', controller.deleteOneReport)

module.exports = router;
