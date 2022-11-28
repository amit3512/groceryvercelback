const categoriesService = require("../services/categories.service");
const upload = require("../middleware/category.upload");
const { cloudinary } = require("../utils/cloudinary");

exports.create = async (req, res, next) => {
  upload(req, res, async function (err) {
    if (err) {
      return next(err);
    } else {
      // const path =
      //   req.file != undefined
      //     ? // req.file.path.replace[(/\\/g, "/")]
      //       req.file.originalname
      //     : "";
      const result =
        req.file != undefined
          ? await cloudinary.uploader.upload(req.file.path)
          : "";

      var model = {
        name: req.body.name,
        // picture: path != "" ? "/" + path : "",
        picture: result ? result.secure_url : "",
        oldPrice: req.body.oldPrice,
        price: req.body.price,
      };
      categoriesService.createCategory(model, (error, results) => {
        console.log(error);
        if (error) {
          return res.status(400).send({
            ...error,
          });
          // return "what the fuck";
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

exports.findAll = (req, res, next) => {
  var model = {
    name: req.query.name,
    pageSize: req.query.pageSize,
    page: req.query.page,
  };
  categoriesService.getCategories(model, (error, results) => {
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
  categoriesService.getCategoryById(model, (error, results) => {
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
      categoriesService.updateCategory(model, (error, results) => {
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
  categoriesService.deleteCategory(model, (error, results) => {
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
