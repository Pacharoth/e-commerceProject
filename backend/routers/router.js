const order = require('./order');
const customerHome  =require('./customerHome')
const admin = require('./admin')
const router=[order,customerHome,admin];
module.exports = router;