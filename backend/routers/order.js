const router = require('express').Router()
const orderController = require('../controllers/orderController');

router.post('/receipt',orderController.getReceiptCustomer);
router.get('/receipt/:id',orderController.getReceipt);
router.get('/pastorder/:id',orderController.getPastOrder);
module.exports = router;