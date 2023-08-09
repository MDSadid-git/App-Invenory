const express = require("express");
const allProductController = require("../controllers/product.controllers");
const router = express.Router();

router
  .route("/")
  .get(allProductController.getProducts)
  .post(allProductController.createProducts);
module.exports = router;
