const { MONGO_DB_CONFIG } = require("../config/app.config");
const { ProductSchema } = require("../models/product.model");

async function createProduct(params, callback) {
  // console.log("params", params);
  const categoryName = params.category;
  const model = params.product.map(
    (x, index) => params.product[0].model == params.product[0 + 1].model
  );

  const product = await ProductSchema.findOne({
    category: categoryName,
  });
  console.log(
    "model",
    model.every((x) => x == true)
  );

  if (!categoryName) {
    return callback({
      message: "Category Name Required",
    });
  } else if (product) {
    return callback({
      message: "Category Name Must Be Unique",
    });
  } else if (product == null) {
    const model = new ProductSchema(params);
    model
      .save()
      .then((response) => {
        callback(null, response);
      })
      .catch((error) => {
        return callback(error);
      });
  }
}

async function getProducts(params, callback) {
  const categoryName = params.name;
  var condition = categoryName
    ? {
        name: {
          $regs: new RegExp(categoryName),
          $options: "i",
        },
      }
    : {};
  let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
  let page = (Math.abs(params.page) || 1) - 1;

  ProductSchema
    .find
    // condition,
    // "categoryName categoryDescription categoryImage"
    ()
    .limit(perPage)
    .skip(perPage * page)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getProductById(params, callback) {
  const productId = params.category_id;

  ProductSchema.findById(productId)
    .then((response) => {
      if (!response) callback("Not Found Categiry with Id" + "" + productId);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function updateProduct(params, callback) {
  const productId = params.productId;

  ProductSchema.findByIdAndUpdate(productId, params, {
    useFindAndModify: true,
  })
    .then((response) => {
      if (!response) callback("Not Found Categiry with Id" + "" + productId);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function deleteProduct(params, callback) {
  const productId = params.productId;

  ProductSchema.findByIdAndDelete(productId)
    .then((response) => {
      if (!response) callback("Not Found Product with Id" + "" + productId);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
