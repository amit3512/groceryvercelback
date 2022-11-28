const usersService = require("../services/users.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/default");

exports.create = async (req, res, next) => {
  console.log("body", req?.body?.["username"]);
  let data = "";
  const conCat = (x) => {
    data = data.concat("-" + x);
  };
  const slug = req?.body?.["username"]
    .toLowerCase()
    .split(" ")
    .map((x) => {
      conCat(x);
    });
  const encryptedPassword = await bcrypt.hash(req?.body?.["password"], 10);
  var model = { ...req?.body, slug: data, password: encryptedPassword };

  usersService.createUser(model, (error, results) => {
    if (error) {
      return res.status(400).send({
        ...error,
      });
    } else {
      return res.status(200).send({
        message: "User created Successfully",
        data: results,
      });
    }
  });
};

exports.login = async (req, res, next) => {
  var model = {
    // email: req.query.email,
    // password: req.query.password,
    email: req.body.email,
    password: req.body.password,
  };
  console.log(model);
  usersService.getLoginDetails(model, async (error, results) => {
    if (error) {
      return next(error);
    } else {
      let isMatch = await bcrypt.compare(
        req.body.password,
        results["password"]
      );
      if (isMatch) {
        // Sign in the token and issue it to the user
        const dataResponse = {
          name: results["username"],
          user_id: results["_id"],
          email: results["email"],
          contact: results["contact"],
          role: results["role"],
          slug: results["slug"],
        };
        let token = jwt.sign(
          {
            ...dataResponse,
          },
          secret,
          { expiresIn: "1 hr" }
        );

        let result = {
          ...dataResponse,
          token: `Bearer ${token}`,
          expiresIn: 168,
        };

        return res.status(200).json({
          result,
          message: "Hurray! You are now logged in.",
          success: true,
        });
      } else {
        return res.status(403).json({
          message: "Incorrect password.",
          success: false,
        });
      }
      //   return res.status(200).send({
      //     message: "Success",
      //     data: results,
      //   });
    }
  });
};

// exports.findOne = (req, res, next) => {
//   var model = {
//     categoryId: req.params.id,
//   };
//   categoriesService.getCategoryById(model, (error, results) => {
//     if (error) {
//       return next(error);
//     } else {
//       return res.status(200).send({
//         message: "Success",
//         data: results,
//       });
//     }
//   });
// };

// exports.update = (req, res, next) => {
//   upload(req, res, function (err) {
//     if (err) {
//       return next(err);
//     } else {
//       const path =
//         req.file != undefined
//           ? // req.file.path.replace[(/\\/g, "/")]
//             req.file.originalname
//           : "";
//       var model = {
//         categoryId: req.params.id,
//         name: req.body.name,
//         picture: path != "" ? "/" + path : "",
//         oldPrice: req.body.oldPrice,
//         price: req.body.price,
//       };
//       categoriesService.updateCategory(model, (error, results) => {
//         if (error) {
//           return error;
//         } else {
//           return res.status(200).send({
//             message: "Success",
//             data: results,
//           });
//         }
//       });
//     }
//   });
// };

// exports.delete = (req, res, next) => {
//   var model = {
//     categoryId: req.params.id,
//   };
//   categoriesService.deleteCategory(model, (error, results) => {
//     if (error) {
//       return next(error);
//     } else {
//       return res.status(200).send({
//         message: "Success",
//         data: results,
//       });
//     }
//   });
// };
