// import Order from "../schemas/Order";
const status = require("http-status");
const Order = require("../schemas/Order");
const Product = require("../schemas/Product");

const createOrder = async (req, res) => {
  const { body, user } = req;
  try {
    const order = await Order.create({
      customer: user._id,
      products: body.products,
      totalBalance: body.totalBalance,
      address: body.address,
    });
    // Update the stock for each product in the order
    for (const productItem of body.products) {
      const { productId, quantity } = productItem;
      const product = await Product.findById(productId);
      if (!product || product.total < quantity) {
        await Order.findByIdAndDelete(order._id);
        return res.status(status.BAD_REQUEST).send({
          message: `Insufficient stock for the selected product ${product.title}.`,
        });
      }
      //======== update the stock
      product.total -= quantity;
      await product.save();
    }
    res
      .status(status.CREATED)
      .send({ message: "Order has been successfully placed" });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const resp = await Order.paginate(
      {},
      { populate: "products.productId", page: page, limit: size }
    );
    res.status(status.OK).send(resp);
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const totalNumerOfProductSold = async (req, res) => {
  const totalOrder = await Order.find().populate("products.productId");
  let totalProductSold = 0;
  let income = 0;
  let soldProducts = [];

  //======== iterate the order
  totalOrder.forEach((item) => {
    income += item.totalBalance;
    //=========
    item.products.forEach((product) => {
      totalProductSold += product.quantity;
      //=============
      const productName = product.productId.title;
      const existingProductIndex = soldProducts.findIndex(
        (p) => Object.keys(p)[0] === productName
      );

      if (existingProductIndex !== -1) {
        // If the product already exists in the array, update the quantity
        const existingQuantity = Object.values(
          soldProducts[existingProductIndex]
        )[0];
        soldProducts[existingProductIndex] = {
          [productName]: existingQuantity + product.quantity,
        };
      } else {
        // If the product is not present, push a new object into the array
        soldProducts.push({ [productName]: product.quantity });
      }
    });
  });
  res
    .status(status.OK)
    .send({ data: { totalProductSold, income, soldProducts } });
};

module.exports = {
  createOrder,
  getAllOrders,
  totalNumerOfProductSold,
};
