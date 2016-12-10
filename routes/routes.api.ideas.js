const express = require('express')
const controller = require('../controllers/controllers.api.ideas')

const router = express.Router()

router.post('/', controller.createNewIdea)
router.get('/', controller.getAllIdeas)
router.get('/:slug', controller.getOneIdea)
router.put('/:id', controller.editOneIdea)
router.delete('/:id', controller.deleteOneIdea)

module.exports = router;
