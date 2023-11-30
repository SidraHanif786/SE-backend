const express = require('express');
const categoryController = require('../controller/Category');

const categoryRouter = express.Router();

categoryRouter.get('/getAll', categoryController.getCategories);
categoryRouter.post('/create', categoryController.createCategory);
categoryRouter.delete('/deleteById/:id', categoryController.deleteCategory);
categoryRouter.put('/updateById/:id', categoryController.updateCategory);
categoryRouter.post('/createDummy', categoryController.createDummy);

module.exports = categoryRouter;
