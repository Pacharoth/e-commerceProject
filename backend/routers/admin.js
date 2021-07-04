const {Router} = require('express');
const adminController = require('../controllers/adminController')
const router = Router();
router.get('/admin/avgyear',adminController.getYearlyReport);
router.get('/admin/avgmonth',adminController.getMonthlyReport);
router.get('/admin/avgdaily',adminController.getDialyReport);
module.exports=router;