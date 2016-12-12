const express = require('express')
const controller = require('../controllers/controllers.api.comments')

const router = express.Router()

router.post('/:ideaid/votes', controller.upVote)
router.get('/:ideaid/votes', controller.getCountVote)
router.get('/:ideaid/votes/:voteid', controller.downVote)

module.exports = router;
