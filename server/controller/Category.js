const Category = require("../schemas/Category");
const status = require("http-status");

const getCategories = async (req, res) => {
  try {
    const resp = await Category.find();
    res.status(status.OK).send({ data: resp });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res
        .status(status.BAD_REQUEST)
        .send({ message: "Title is required" });
    }
    //========= handle dublicate
    const data = await Category.findOne({ ...req.body });
    if (data) {
      return res
        .status(status.BAD_REQUEST)
        .send({ message: "Category with this name already exist" });
    }
    const resp = await Category.create({ title });

    res.status(status.CREATED).send({ data: resp });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    //======== find category
    const data = await Category.findById(id);
    if (!data) {
      return res
        .status(status.NOT_FOUND)
        .send({ message: "Category with this id is not exist" });
    }
    //==== delete
    const resp = await Category.findByIdAndDelete(id);
    if (!resp) {
      res.status(status.NOT_FOUND).send({ message: "Already deleted" });
      return;
    }
    res.status(status.OK).send({ message: "Successfully deleted" });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const resp = await Category.findByIdAndUpdate(id, data);
    if (!resp) {
      res
        .status(status.NOT_FOUND)
        .send({ message: "Category not found against given id." });
      return;
    }
    res.status(status.OK).send({ data: { ...data, id } });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const createDummy = async (req, res) => {
  try {
    const categories = [
      "Living Room Furniture",
      "Bedroom Furniture",
      "Dining Room Furniture",
      "Home Office Furniture",
      "Outdoor Furniture",
    ];

    const createdCategories = await Category.insertMany(
      categories.map((title) => ({ title }))
    );

    res.status(status.CREATED).send({ data: createdCategories });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  createDummy,
};
