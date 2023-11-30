const Category = require("../schemas/Category");
const status = require("http-status");

const getCategories = async (req, res) => {
  try {
    const resp = await Category.find();
    res.status(status.OK).send(resp);
  } catch (error) {
    res.status(status.BAD_REQUEST).send(error.message);
  }
};

const createCategory = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(status.BAD_REQUEST).send("Title is required");
    }

    const resp = await Category.create({ title });

    res.status(status.CREATED).send(resp);
  } catch (error) {
    res.status(status.BAD_REQUEST).send(error.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await Category.findByIdAndDelete(id);
    if (!resp) {
      res.status(status.NOT_FOUND).send("Already deleted");
      return;
    }
    res.status(status.OK).send("Successfully deleted");
  } catch (error) {
    res.status(status.BAD_REQUEST).send(error.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const resp = await Category.findByIdAndUpdate(id, data);
    if (!resp) {
      res.status(status.NOT_FOUND).send("Category not found against given id.");
      return;
    }
    res.status(status.OK).send({ ...data, id });
  } catch (error) {
    res.status(status.BAD_REQUEST).send(error.message);
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};
