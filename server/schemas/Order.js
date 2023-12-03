const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paginate = require('mongoose-paginate-v2');

const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
  address: { type: String, required: true },
  quantity: { type: Number, required: true },
});

orderSchema.plugin(paginate);

const Order = model('order', orderSchema);

module.exports = Order;