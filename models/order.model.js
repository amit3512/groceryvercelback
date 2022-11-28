const mongoose = require("mongoose");
const { UserSchema } = require("./user.model");
const OrderSchema = mongoose.model(
  "Order",
  new mongoose.Schema(
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserSchema,
      },
      user_name: {
        type: mongoose.Schema.Types.String,
        ref: UserSchema,
      },
      user_email: {
        type: mongoose.Schema.Types.String,
        ref: UserSchema,
      },
      user_contact: {
        type: mongoose.Schema.Types.Number,
        ref: UserSchema,
      },
      orderData: [
        {
          productId: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          picture: {
            type: String,
          },
          quantity: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          totalPrice: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    { timestamps: { type: new Date(), required: true } }
  )
);

module.exports = {
  OrderSchema,
};

// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema(
//   {
//     orderData: [
//       {
//         productId: {
//           type: String,
//           required: true,
//           sparse: true,
//         },
//         name: {
//           type: String,
//           required: true,
//         },
//         picture: {
//           type: String,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//         },
//         price: {
//           type: Number,
//           required: true,
//         },
//         totalPrice: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//   },

//   { timestamps: { type: new Date(), required: true } }
// );

// module.exports = {
//   OrderSchema: mongoose.model("orders", OrderSchema),
// };
