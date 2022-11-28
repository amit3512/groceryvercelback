const productsService = require("../services/products.service");
const upload = require("../middleware/product.upload");
const { cloudinary } = require("../utils/cloudinary");

// exports.create = async (req, res, next) => {
//   upload(req, res, async function (err) {
//     if (err) {
//       return next(err);
//     } else {
//       // const result =
//       //   req.file != undefined
//       //     ? await cloudinary.uploader.upload(req.file.path)
//       //     : "";

//       var model = {
//         category: req.body.category,
//         picture: req.body.picture,
//         product: [
//           {
//             name: req.body.name,
//             product_picture: req.body.product_picture,
//             model: req.body.model,
//             sn: req.body.sn,
//             size: req.body.size,
//             oldPrice: req.body.oldPrice,
//             price: req.body.price,
//           },
//         ],
//       };
//       console.log("model", model);
//       productsService.createProduct(model, (error, results) => {
//         console.log(error);
//         if (error) {
//           // return res.status(400).send({
//           //   ...error,

//           // });
//           return "what the fuck";
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
exports.create = async (req, res, next) => {
  var model = req.body;
  console.log("model", model);
  productsService.createProduct(model, (error, results) => {
    // console.log(error);
    if (error) {
      return res.status(400).send({
        ...error,
      });
    } else {
      return res.status(200).send({
        message: "Product created Successfully",
        data: results,
      });
    }
  });
};

exports.findAll = (req, res, next) => {
  var model = {
    name: req.query.name,
    // pageSize: req.query.pageSize,
    // page: req.query.page,
  };
  productsService.getProducts(model, (error, results) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    }
  });
};

exports.findOne = (req, res, next) => {
  var model = {
    categoryId: req.params.id,
  };
  productsService.getProductById(model, (error, results) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    }
  });
};

exports.update = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      return next(err);
    } else {
      const path =
        req.file != undefined
          ? // req.file.path.replace[(/\\/g, "/")]
            req.file.originalname
          : "";
      var model = {
        categoryId: req.params.id,
        name: req.body.name,
        picture: path != "" ? "/" + path : "",
        oldPrice: req.body.oldPrice,
        price: req.body.price,
      };
      productsService.updateProduct(model, (error, results) => {
        if (error) {
          return error;
        } else {
          return res.status(200).send({
            message: "Success",
            data: results,
          });
        }
      });
    }
  });
};

exports.delete = (req, res, next) => {
  var model = {
    categoryId: req.params.id,
  };
  productsService.deleteProduct(model, (error, results) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    }
  });
};
