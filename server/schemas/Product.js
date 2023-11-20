const { Schema, Types, model } = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const productSchema = new Schema({
  title: Schema.Types.String,
  img: [Schema.Types.String],
  rating: Schema.Types.Number,
  price: Schema.Types.String,
  total: Schema.Types.Number,
  category: [{
    type: Schema.Types.String,
    ref: "Category",
  }],
  description: Schema.Types.String,
});

productSchema.plugin(paginate);

const Product = model("Product", productSchema);

module.exports = Product;
