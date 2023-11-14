const express = require("express");
const allProductController = require("../controllers/product.controllers");
const router = express.Router();
const multer = require("multer");
const uploader = multer({ dest: "image/" });

router.route("/bulk-update").patch(allProductController.bulkUpdateProduct);
router.route("/bulk-delete").delete(allProductController.bulkDeleteProduct);

router
  .route("/")
  .get(allProductController.getProducts)
  .post(allProductController.createProducts);

router
  .route("/:id")
  .patch(allProductController.productUpdate)
  .delete(allProductController.productDeleteById);

module.exports = router;
