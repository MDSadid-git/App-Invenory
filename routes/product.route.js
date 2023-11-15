const express = require("express");
const allProductController = require("../controllers/product.controllers");
const uploader = require("../middleware/uploader");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");
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

router
  .route("/bulk-update")
  .patch(verifyToken, allProductController.bulkUpdateProduct);
router
  .route("/bulk-delete")
  .delete(verifyToken, allProductController.bulkDeleteProduct);

router
  .route("/")
  .get(allProductController.getProducts)
  .post(
    verifyToken,
    authorization("admin", "store-manager"),
    allProductController.createProducts
  );

router
  .route("/:id")
  .patch(verifyToken, allProductController.productUpdate)
  .delete(verifyToken, allProductController.productDeleteById);

module.exports = router;
