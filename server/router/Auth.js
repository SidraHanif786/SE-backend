const express = require('express');
const authController = require('../controller/Auth');

const authRouter = express.Router();

authRouter.post('/signup', authController.signupUser);
authRouter.post('/login', authController.loginUser);
authRouter.get('/getAll', authController.getAllUsers);
authRouter.put('/updateById/:id', authController.updateUser);
authRouter.delete('/deleteById/:id', authController.deleteUser);

module.exports = authRouter;