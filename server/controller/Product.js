const Product = require("../schemas/Product");
const status = require("http-status");

const create = async (req, res) => {
  try {
    const data = req.body;
    const resp = await Product.create(data);
    res.status(status.CREATED).send(resp);
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

module.exports = {
  create,
};
