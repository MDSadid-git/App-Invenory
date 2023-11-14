const express = require("express");
const allProductController = require("../controllers/product.controllers");
const uploader = require("../middleware/uploader");
const router = express.Router();

router.post(
  "/file-upload",
  uploader.single("image"),
  allProductController.fileUploade
);

// to uploade many image
// router.post(
//   "/file-upload",
//   uploader.array("image"),
//   allProductController.fileUploade
// );

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
