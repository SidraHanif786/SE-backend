const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paginate = require('mongoose-paginate-v2');

const categorySchema = new Schema({
  title: { type: String, required: true },
});

categorySchema.plugin(paginate);
const Category = mongoose.model('Category', categorySchema);

// Export the Category model
module.exports = Category;