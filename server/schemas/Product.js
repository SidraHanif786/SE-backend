const { Schema, model } = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const productSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true,
  },
  img: {
    type: [Schema.Types.String],
    required: true,
  },
  rating: {
    type: Schema.Types.Number,
    required: true,
  },
  price: {
    type: Schema.Types.String,
    required: true,
  },
  total: {
    type: Schema.Types.Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category", 
    required: true,
  },

  description: {
    type: Schema.Types.String,
    required: true,
  },
});

productSchema.plugin(paginate);

const Product = model("Product", productSchema);

module.exports = Product;
