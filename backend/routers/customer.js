const express = require('express');
const router = express.Router();
const customer= require('../models/customerModel');
const customerController = require('../controllers/customerController');
const pagination = require('../utils/pagination');

router.get('/admin/customer',pagination(customer),customerController.getCustomers);
router.put('/admin/customer/:id',customerController.editCustomer);
router.post('/admin/customer/:id',customerController.getCustomer);
router.delete('/admin/customer/:id',customerController.deleteCustomer);
router.get("/profile/:id",customerController.listProfileCustomer);
router.put('/profile/:id',customerController.postProfile);
router.post("/setnewpassword/:id",customerController.setNewPassword);
module.exports = router;