const express = require('express');
const customerController = require('../controllers/customerHomeController')
const router = express.Router()
router.get('/listproducts',customerController.listProduct)
module.exports = router 