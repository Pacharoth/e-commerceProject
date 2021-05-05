const express = require('express');
const router = express.Router();
const customer= require('../models/customerModel');
const customerController = require('../controllers/customerController');
const pagination = require('../utils/pagination');

router.get('/admin/customer/',pagination(customer),customerController.getCustomers);
module.exports = router;