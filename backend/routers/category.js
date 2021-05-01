const category  =require('../controllers/categoryControllers');
const express = require('express')
const router = express.Router()
router.get('/category',category.getCategories);
module.exports=router