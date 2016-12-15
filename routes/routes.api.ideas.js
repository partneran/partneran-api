const express = require('express')
const controller = require('../controllers/controllers.api.ideas')

const router = express.Router()

router.post('/', controller.createNewIdea)
router.get('/', controller.getAllIdeas)
router.get('/:slug', controller.getOneIdea)
router.put('/:ideaid', controller.editOneIdea)
router.delete('/:ideaid', controller.deleteOneIdea)

module.exports = router;
