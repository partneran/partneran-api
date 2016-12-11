const express = require('express')
const controller = require('../controllers/controllers.api.comments')

const router = express.Router()

router.post('/:ideaid/comments', controller.createNewComment)
router.get('/:ideaid/comments', controller.getAllComments)
router.get('/:ideaid/comments/:commentid', controller.getOneComment)
router.put('/:ideaid/comments/:commentid', controller.editOneComment)
router.delete('/:ideaid/comments'/:commentid, controller.deleteOneComment)

module.exports = router;
