const { MONGO_DB_CONFIG } = require("../config/app.config");
const { UserSchema } = require("../models/user.model");
const bcrypt = require("bcrypt");

async function createUser(params, callback) {
  console.log("parameter", params);
  const model = new UserSchema(params);
  model
    .save()
    .then((response) => {
      callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getLoginDetails(userCreds, callback) {
  let { email } = userCreds;
  // First Check if the username is in the database
  await UserSchema.findOne({ email })
    .then((response) => {
      return callback(null, response);
    })
    .catch((err) => {
      return callback(err);
    });
  //   if (!user) {
  //     return res.status(404).json({
  //       message: "Username is not found. Invalid login credentials.",
  //       success: false,
  //     });
  //   }
  //   let isMatch = await bcrypt.compare(password, user.password);
}

module.exports = {
  createUser,
  getLoginDetails,
  // getCategoryById,
  // updateCategory,
  // deleteCategory,
};
