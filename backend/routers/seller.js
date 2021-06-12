const experess = require('express');
const router = experess.Router()
const sellerController =require('../controllers/sellerController');
const seller = require('../models/sellerModel');
const pagination = require('../utils/pagination');
router.post('/admin/seller',sellerController.registerSeller);
router.get('/admin/seller',pagination(seller),sellerController.getSellers);
router.get('/getSeller/:id', sellerController.getSellerByID)
router.put('/changePwd/:id',sellerController.changePwd)
module.exports = router