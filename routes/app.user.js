const userController = require("../controllers/users.controller");
const express = require("express");
const router = express.Router();

router.post("/signUp", userController.create);
router.post("/login", userController.login);
// router.get("/:id", userController.findOne);
// router.put("/:id", userController.update);
// router.delete("/:id", userController.delete);

module.exports = router;
