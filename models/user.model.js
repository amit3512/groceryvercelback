const mongoose = require("mongoose");
const slugify = require("slugify");
const UserSchema = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      contact: {
        type: Number,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["customer", "super-admin"],
        default: "customer",
        required: false,
      },
      slug: { type: String, required: true, unique: true },
    },

    { timestamps: { type: new Date(), required: true } }
  )
);

module.exports = {
  UserSchema,
};
