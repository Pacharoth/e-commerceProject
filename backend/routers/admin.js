const {Router} = require('express');
const adminController = require('../controllers/adminController')
const router = Router();
router.get('/admin/avgyear',adminController.getYearlyReport);
router.get('/admin/avgmonth',adminController.getMonthlyReport);
router.get('/admin/avgdaily',adminController.getDialyReport);
router.get('/admin/seller/reportyear/:id',adminController.getYearlySeller)
router.get('/admin/seller/reportmonth/:id',adminController.getMonthlySeller)
router.get('/admin/seller/reportdaily/:id',adminController.getDailySeller);
module.exports=router;