const express = require("express");
const allProductController = require("../controllers/product.controllers");
const router = express.Router();

router.route("/bulk-update").patch(allProductController.bulkUpdateProduct);

router
  .route("/")
  .get(allProductController.getProducts)
  .post(allProductController.createProducts);

router
  .route("/:id")
  .patch(allProductController.productUpdate)
  .delete(allProductController.productDeleteById);

module.exports = router;
