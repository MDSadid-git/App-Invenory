const express = require("express");
const allProductController = require("../controllers/product.controllers");
const router = express.Router();

router
  .route("/")
  .get(allProductController.getProducts)
  .post(allProductController.createProducts);

router.route("/:id").patch(allProductController.productUpdate);

router.route("/buld-update").patch(allProductController);

module.exports = router;
