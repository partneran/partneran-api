const express = require('express')
const controller = require('../controllers/controllers.api.categories')

const router = express.Router()

router.get('/', controller.getAllCategories)

module.exports = router;
