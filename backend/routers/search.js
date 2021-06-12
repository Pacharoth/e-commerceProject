const searchController = require('../controllers/searchControllers');
const {Router}= require('express');
const router = Router();
router.get('/search/product',searchController.searchCategory);
module.exports = router;