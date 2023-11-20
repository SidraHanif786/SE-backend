const Category = require("../schemas/Category");
const status = require("http-status");

const create = async (req, res) => {
  try {
    const data = req.body;
    const category = await Category.create(data);
    res.status(status.CREATED).send(category);
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

module.exports = {
  create,
};
