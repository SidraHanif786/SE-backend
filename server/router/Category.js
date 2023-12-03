const express = require("express");
const categoryController = require("../controller/Category");
const { authorizeUser, onlyAdmin } = require("../middleware/Auth");

const categoryRouter = express.Router();

categoryRouter.get("/getAll", categoryController.getCategories);
categoryRouter.post(
  "/create",
  authorizeUser,
  onlyAdmin,
  categoryController.createCategory
);
categoryRouter.delete(
  "/deleteById/:id",
  authorizeUser,
  onlyAdmin,
  categoryController.deleteCategory
);
categoryRouter.put(
  "/updateById/:id",
  authorizeUser,
  onlyAdmin,
  categoryController.updateCategory
);
categoryRouter.post(
  "/createDummy",
  authorizeUser,
  onlyAdmin,
  categoryController.createDummy
);

module.exports = categoryRouter;
