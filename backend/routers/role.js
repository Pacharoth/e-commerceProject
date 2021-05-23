const {Router}=require('express');
const { getRole } = require('../controllers/roleController');
const router = Router();
router.post('/role',getRole);
module.exports = router