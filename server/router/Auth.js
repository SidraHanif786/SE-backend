const express = require("express");
const authController = require("../controller/Auth");
const { authorizeUser, onlyAdmin } = require("../middleware/Auth");

const authRouter = express.Router();

authRouter.post("/signup", authController.signupUser);
authRouter.post("/login", authController.loginUser);
authRouter.get("/getAll", authorizeUser, onlyAdmin, authController.getAllUsers);
authRouter.put("/update", authorizeUser, authController.updateUser);
authRouter.delete("/delete", authorizeUser, authController.deleteUser);

module.exports = authRouter;
