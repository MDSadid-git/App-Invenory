const Product = require("../models/Product");
const {
  getProductsService,
  getProductCreateService,
  productUpdateServec,
  bulkUpdateProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    const allProduct = await getProductsService();
    res.status(200).json({
      status: "Success",
      data: allProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: `Can't find data ${error}`,
      error: error.message,
    });
  }
};

exports.createProducts = async (req, res, next) => {
  try {
    //Save or create part 1
    // const product = new Product(req.body);
    // const result = await product.save();

    // part 2
    const result = await getProductCreateService(req.body);
    if (result.quantity == 0) {
      result.status = "out-of-stock";
    }
    res.status(200).json({
      status: "success",
      message: "Data inserted successfully!!!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Bad req Plesea give me Right data!!",
      error: error.message,
    });
  }
};

exports.productUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updateProduct = await productUpdateServec(id, data);
    res.status(200).json({
      status: "Success",
      message: "Product Update successfully!!!",
      data: updateProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: `Can't update data ${error}`,
      error: error.message,
    });
  }
};
exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const updateProduct = await bulkUpdateProductService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Product Update successfully!!!",
      data: updateProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: `Can't update data ${error}`,
      error: error.message,
    });
  }
};
