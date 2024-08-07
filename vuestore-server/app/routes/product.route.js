const express = require('express')

const router= express.Router()

const products = require('../controllers/product.controller')

router.get('/', products.findAll)
router.get('/:id', products.findOne)

module.exports = router;