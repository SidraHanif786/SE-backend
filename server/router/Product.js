const express = require('express');
const productController = require('../controller/Product');

const productRouter = express.Router();

productRouter.get('/getAll', productController.getProducts);
productRouter.post('/create', productController.createProduct);
productRouter.get('/getById/:id', productController.getProductById);
productRouter.delete('/deleteById/:id', productController.deleteProduct);
productRouter.put('/updateById/:id', productController.updateProduct);

module.exports = productRouter;