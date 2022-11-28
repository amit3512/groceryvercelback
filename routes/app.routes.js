const categoryController = require("../controllers/categories.controller");
const productController = require("../controllers/products.controller");
const orderController = require("../controllers/orders.controller");
const express = require("express");
const router = express.Router();
// const { OrderSchema } = require("../models/order.model");

//category
router.post("/category", categoryController.create);
router.get("/category", categoryController.findAll);
router.get("/category/:id", categoryController.findOne);
router.put("/category/:id", categoryController.update);
router.delete("/category/:id", categoryController.delete);

//order
router.post("/order", orderController.create);
// router.post("/order", (req, res) => {
//   console.log("req", req.body["orderData"]);
//   const orderData = new OrderSchema(req?.body);
//   orderData.save((err) => {
//     if (err) return res.status(400).json({ success: false, err });
//     return res.status(200).json({ success: true, orderData });
//   });
// });
router.get("/order", orderController.findAll);
// router.get("/order/:id", orderController.findOne);
// router.put("/order/:id", orderController.update);
// router.delete("/order/:id", orderController.delete);

//products
router.post("/product", productController.create);
router.get("/product", productController.findAll);
router.get("/product/:id", productController.findOne);
router.put("/product/:id", productController.update);
router.delete("/product/:id", productController.delete);

module.exports = router;
