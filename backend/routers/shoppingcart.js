const experess = require('express');
const router = experess.Router()
const shoppingController =require('../controllers/shoppingController');

router.get("/shoppingcart/:id",shoppingController.getShoppingCart);
router.post("/shoppingcart",shoppingController.postShoppingCart);
router.put("/shoppingcart/:id",shoppingController.updateShopping);
module.exports = router