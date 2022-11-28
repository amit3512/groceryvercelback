const { MONGO_DB_CONFIG } = require("../config/app.config");
const { CategorySchema } = require("../models/category.model");

async function createCategory(params, callback) {
  const name = params.name;
  const category = await CategorySchema.findOne({ name });
  if (!name) {
    return callback({
      message: "Category Name Required",
    });
  } else if (category) {
    return callback({
      message: "Category Name Must Be Unique",
    });
  } else {
    const model = new CategorySchema(params);
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

async function getCategories(params, callback) {
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

  CategorySchema
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

async function getCategoryById(params, callback) {
  const categoryId = params.categoryId;

  CategorySchema.findById(categoryId)
    .then((response) => {
      if (!response) callback("Not Found Categiry with Id" + "" + categoryId);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function updateCategory(params, callback) {
  const categoryId = params.categoryId;

  CategorySchema.findByIdAndUpdate(categoryId, params, {
    useFindAndModify: true,
  })
    .then((response) => {
      if (!response) callback("Not Found Categiry with Id" + "" + categoryId);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function deleteCategory(params, callback) {
  const categoryId = params.categoryId;

  CategorySchema.findByIdAndDelete(categoryId)
    .then((response) => {
      if (!response) callback("Not Found Categiry with Id" + "" + categoryId);
      else callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
