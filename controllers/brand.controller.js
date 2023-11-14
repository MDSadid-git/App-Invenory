const {
  createBrandService,
  getAllBrand,
  getBrandIdService,
} = require("../services/brand.services");

// create brand start
exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).json({
      status: "success",
      message: "Brand inserted successfully!!!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the brand",
      message: error.message,
    });
  }
};
//create brand end

//Get all brand start
exports.getBrand = async (req, res, next) => {
  try {
    const result = await getAllBrand();
    res.status(200).json({
      status: "All Brands",
      message: "Brand find successfully!!!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't find any data",
      message: error.message,
    });
  }
};
// Get all brand end

// find one data from brand id start
exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await getBrandIdService(id);

    if (!result) {
      return res.status(400).json({
        status: "fail",
        error: "couldn't find a brand with this id",
      });
    }
    res.status(200).json({
      status: "All Brands",
      message: "Brand find successfully!!!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't find any data",
      message: error.message,
    });
  }
};
// find one data from brand id end
