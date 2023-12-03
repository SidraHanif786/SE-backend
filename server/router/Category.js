const express = require('express');
const categoryController = require('../controller/Category');
const { authorizeUser } = require('../middleware/Auth');

const categoryRouter = express.Router();

categoryRouter.get('/getAll', categoryController.getCategories);
categoryRouter.post('/create',authorizeUser, categoryController.createCategory);
categoryRouter.delete('/deleteById/:id',authorizeUser, categoryController.deleteCategory);
categoryRouter.put('/updateById/:id',authorizeUser, categoryController.updateCategory);
categoryRouter.post('/createDummy',authorizeUser, categoryController.createDummy);

module.exports = categoryRouter;
