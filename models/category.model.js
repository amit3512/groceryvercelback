const mongoose = require("mongoose");
const CategorySchema = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  })
);

module.exports = {
  CategorySchema,
};
