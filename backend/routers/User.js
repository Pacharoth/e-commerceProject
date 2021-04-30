const express = require('express');
const routers = express.Router();
const userController = require('../controllers/userController');
routers.post('/register',userController.registerCustomer);
routers.post('/login',userController.login);
routers.post('/getSession',userController.getSession);
module.exports=routers;