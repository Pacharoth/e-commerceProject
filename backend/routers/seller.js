const experess = require('express');
const router = experess.Router()
const sellerController =require('../controllers/sellerController');
router.post('/admin/seller',sellerController.registerSeller);
router.get('/admin/seller',sellerController.getSellers);
router.get('/getSeller/:id', sellerController.getSellerByID)
module.exports = router