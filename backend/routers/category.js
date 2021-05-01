const category  =require('../controllers/categoryControllers');
const express = require('express')
const router = express.Router()
router.get('/category',category.getCategories);
router.post('/category',category.postCategory);
router.put('/category/:id',category.editCategory);
module.exports=router