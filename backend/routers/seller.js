const experess = require('express');
const router = experess.Router()
const sellerController =require('../controllers/sellerController');
const seller = require('../models/sellerModel');
const pagination = require('../utils/pagination');
router.post('/admin/seller',sellerController.registerSeller);
router.get('/admin/seller',pagination(seller),sellerController.getSellers);
router.get('/getSeller/:id', sellerController.getSellerByID)
router.put('/changePwd/:id',sellerController.changePwd)
router.put('/addProImg/:id',sellerController.addProImg)
router.get('/getSaleInfo/:id',sellerController.getSaleInfo)
router.get('/getMonthlySale/:id',sellerController.getMonthlySale)
router.get('/getYearlySale/:id',sellerController.getYearlySale)
router.post('/company',sellerController.checkCompany);
router.post('/registerseller',sellerController.registerSellerPayment);
router.post('/paymentseller',sellerController.payAsSeller);
router.post('/paymentseller/:id',sellerController.getPaymentSeller);
module.exports = router