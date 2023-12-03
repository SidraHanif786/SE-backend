const express = require('express');
const orderController = require('../controller/Order');
const { authorizeUser, onlyAdmin } = require('../middleware/Auth');

const orderRouter = express.Router();

orderRouter.post('/create', authorizeUser, orderController.createOrder);
orderRouter.get('/stats',authorizeUser, onlyAdmin, orderController.totalNumerOfProductSold);
orderRouter.get('/getAll',authorizeUser,onlyAdmin, orderController.getAllOrders);

module.exports = orderRouter;