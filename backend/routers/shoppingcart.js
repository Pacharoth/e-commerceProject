const experess = require('express');
const router = experess.Router()
const shoppingController =require('../controllers/shoppingController');

router.get("/shoppingCart/:id",shoppingController.getShoppingCart);
router.post("/shoppingCart",shoppingController.postShoppingCart);

module.exports = router