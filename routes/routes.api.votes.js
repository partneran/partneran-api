const express = require('express')
const controller = require('../controllers/controllers.api.votes')

const router = express.Router()

router.post('/:ideaid/votes', controller.upVote)
router.get('/:ideaid/votes/:voteid', controller.getCountVote)
router.get('/:ideaid/votes/:voteid', controller.downVote)

module.exports = router;
