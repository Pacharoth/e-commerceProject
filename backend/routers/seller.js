const experess = require('express');
const router = experess.Router()
const sellerController =require('../controllers/sellerController');
router.post('/admin/seller',sellerController.registerSeller);
module.exports = router