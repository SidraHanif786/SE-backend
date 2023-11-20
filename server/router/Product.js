const express = require('express');
const Product = require('../controller/Product')

const productRouter = express.Router();

productRouter.post('/create', Product.create );

module.exports = productRouter;