const { MONGO_DB_CONFIG } = require("../config/app.config");
const { OrderSchema } = require("../models/order.model");

async function createOrder(params, callback) {
  console.log("parameter", params);
  const model = new OrderSchema(params);
  model
    .save()
    .then((response) => {
      callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
  // }
}

async function getOrderDetails(params, callback) {
  //   const orderName = params.name;
  const productId = params.productId;
  var condition = productId
    ? {
        productId: {
          $regs: new RegExp(productId),
          $options: "i",
        },
      }
    : {};
  let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
  let page = (Math.abs(params.page) || 1) - 1;

  OrderSchema.find()
    .limit(perPage)
    .skip(perPage * page)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

// async function getCategoryById(params, callback) {
//   const categoryId = params.categoryId;

//   CategorySchema.findById(categoryId)
//     .then((response) => {
//       if (!response) callback("Not Found Categiry with Id" + "" + categoryId);
//       else callback(null, response);
//     })
//     .catch((error) => {
//       return callback(error);
//     });
// }

// async function updateCategory(params, callback) {
//   const categoryId = params.categoryId;

//   CategorySchema.findByIdAndUpdate(categoryId, params, {
//     useFindAndModify: true,
//   })
//     .then((response) => {
//       if (!response) callback("Not Found Categiry with Id" + "" + categoryId);
//       else callback(null, response);
//     })
//     .catch((error) => {
//       return callback(error);
//     });
// }

// async function deleteCategory(params, callback) {
//   const categoryId = params.categoryId;

//   CategorySchema.findByIdAndDelete(categoryId)
//     .then((response) => {
//       if (!response) callback("Not Found Categiry with Id" + "" + categoryId);
//       else callback(null, response);
//     })
//     .catch((error) => {
//       return callback(error);
//     });
// }

module.exports = {
  createOrder,
  getOrderDetails,
  // getCategoryById,
  // updateCategory,
  // deleteCategory,
};
