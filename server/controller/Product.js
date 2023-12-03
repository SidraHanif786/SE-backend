const status = require("http-status");
const Product = require("../schemas/Product");

const SORT = {
  asc: 1,
  desc: -1,
};

const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      cid,
      sortBy = "price",
      sort = "asc",
    } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(pageSize);
    const query = cid ? { category: cid } : {};
    const options = {
      populate: "category",
      offset,
      limit: parseInt(pageSize),
      sort: { [sortBy]: sort === "asc" ? 1 : -1 },
    };

    const resp = await Product.paginate(query, options);
    res.status(status.OK).send({ data: resp });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const data = req.body;
    const resp = await Product.create({ ...data });
    res.status(status.CREATED).send({ data: resp });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await Product.findById(id).populate("category");
    if (!resp) {
      return res
        .status(status.NOT_FOUND)
        .send({ message: "Product with this id is not exist" });
    }
    res.status(status.OK).send({ data: resp });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findById(id);
    if (!data) {
      return res
        .status(status.NOT_FOUND)
        .send({ message: "Product with this id is not exist" });
    }
    //===========
    const resp = await Product.findByIdAndDelete(id);
    if (!resp) {
      res.status(status.NOT_FOUND).send({ message: "Already deleted!" });
      return;
    }
    res.status(status.OK).send({ message: "Successfully Deleted" });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const resp = await Product.findByIdAndUpdate(id, data);
    if (!resp) {
      res
        .status(status.NOT_FOUND)
        .send({ message: "The product against given id not exists!" });
      return;
    }
    res.status(status.OK).send({ data: { ...data, id } });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
};
