const express = require('express');
const productController = require('../controller/Product');
const { authorizeUser, onlyAdmin } = require('../middleware/Auth');

const productRouter = express.Router();

productRouter.get('/getAll', productController.getProducts);
productRouter.post('/create', authorizeUser, onlyAdmin, productController.createProduct);
productRouter.get('/getById/:id', productController.getProductById);
productRouter.delete('/deleteById/:id',authorizeUser, onlyAdmin, productController.deleteProduct);
productRouter.put('/updateById/:id',authorizeUser, onlyAdmin, productController.updateProduct);

module.exports = productRouter;