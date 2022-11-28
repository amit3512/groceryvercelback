const orderController = require("../controllers/orders.controller");
const express = require("express");
const router = express.Router();

router.post("/order", orderController.create);
router.get("/order", orderController.findAll);
router.get("/order/:id", orderController.findOne);
router.put("/order/:id", orderController.update);
router.delete("/order/:id", orderController.delete);

module.exports = router;
c;
