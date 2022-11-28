const mongoose = require("mongoose");
const ProductSchema = mongoose.model(
  "Product",
  new mongoose.Schema({
    category: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
    },
    product: [
      {
        name: {
          type: String,
          required: true,
          unique: true,
        },
        product_picture: {
          type: String,
        },
        model: {
          type: String,
          required: true,
          unique: true,
        },
        sn: {
          type: String,
          required: true,
          unique: true,
        },
        size: {
          type: String,
          enum: ["XXL", "XL", "L", "M", "S", "XS"],
        },
        oldPrice: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  })
);

module.exports = {
  ProductSchema,
};
