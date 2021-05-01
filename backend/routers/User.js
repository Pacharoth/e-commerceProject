const express = require('express');
const routers = express.Router();
const userController = require('../controllers/userController');
routers.post('/register',userController.registerCustomer);
routers.post('/login',userController.login);
routers.post('/getSession',userController.getSession);
routers.post('/logout',userController.logout)
routers.post('/registerany',userController.registerAnyRole);
module.exports=routers;