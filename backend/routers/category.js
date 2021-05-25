const category  =require('../controllers/categoryControllers');
const express = require('express')
const router = express.Router()
router.get('/category',category.getCategories);
router.post('/category',category.postCategory);
router.put('/category/:id',category.editCategory);
router.delete('/category/:id',category.deleteCategory);
router.get('/category/search',category.searchCategory);
module.exports=router