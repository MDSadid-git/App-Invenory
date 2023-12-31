const Product = require("../models/Product");
const {
  getProductsService,
  getProductCreateService,
  productUpdateServec,
  bulkUpdateProductService,
  productDeleteServecById,
  bulkDeleteProductService,
} = require("../services/product.services");

// Get Product area start
exports.getProducts = async (req, res, next) => {
  try {
    let queryObjectArea = { ...req.query };
    // console.log(queryObjectArea);

    //sort, page, limit => Exclude
    const excludeFields = ["sort", "page", "limit"];

    excludeFields.forEach((field) => delete queryObjectArea[field]);

    // gt, lt, gte, lte
    let fintersString = JSON.stringify(queryObjectArea);
    fintersString = fintersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    queryObjectArea = JSON.parse(fintersString);

    const querySort = {};
    //product sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      querySort.sortBy = sortBy;
      console.log(sortBy);
    }

    //product fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      querySort.fields = fields;
    }

    // page and skip area start
    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      querySort.skip = skip;
      querySort.limit = limit;
    }

    const allProduct = await getProductsService(queryObjectArea, querySort);
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
// Get Product area end

// Get Create Product area start

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
// Get Create Product area end

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

// Bulk area start
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
exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const ids = req.body;
    // console.log(ids);
    const result = await bulkDeleteProductService(ids);
    res.status(200).json({
      status: "Delete Success",
      message: "Delete all data Successfully!!!",
    });
  } catch (error) {
    res.status(400).json({
      status: "Delete Fail",
      message: "Can't not delete all data given",
      error: error.message,
    });
  }
};
// bulk area end

// productDeleteServecById area start

exports.productDeleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productDeleteServecById(id);
    if (!result.deletedCount) {
      return res.status(400).json({
        status: "Fail",
        error: "Couldn't delete the Product",
      });
    }
    res.status(200).json({
      status: "Success",
      message: `Product delete Successfully!!!`,
    });
  } catch (error) {
    res.status(400).json({
      status: "Delete Fail",
      message: "Can't Delete data",
      error: error.message,
    });
  }
};
// productDeleteServecById area end

// photo multer area start
exports.fileUploade = async (req, res) => {
  try {
    res.status(200).json(req.file);
  } catch (error) {
    res.status(400).json({
      status: "Image can't uploade",
      message: "Plases give right image",
      error: error.message,
    });
  }
};
// photo multer area end
