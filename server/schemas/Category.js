const { Schema, Types, model } = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const categorySchema = new Schema({
  title: Schema.Types.String,
});

categorySchema.plugin(paginate);

const Category = model('Category', categorySchema);

module.exports = Category;
