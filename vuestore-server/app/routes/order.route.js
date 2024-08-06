const express = require('express')

const router= express.Router()

const orders = require('../controllers/order.controller')

router.get('/user/:id', orders.findOrder)

module.exports = router;