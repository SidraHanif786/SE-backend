const express = require('express');
const Category = require('../controller/Category');

const categoryRouter = express.Router();

categoryRouter.post('/create',Category.create );

module.exports = categoryRouter;