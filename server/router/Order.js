const express = require('express');
const orderController = require('../controller/Order');
const { authorizeUser, onlyAdmin } = require('../middleware/Auth');

const orderRouter = express.Router();

orderRouter.post('/create', authorizeUser, orderController.createOrder);
orderRouter.get('/stats', orderController.totalNumerOfProductSold);
orderRouter.get('/getAll', orderController.getAllOrders);

module.exports = orderRouter;