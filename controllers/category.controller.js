const {
  createCategoryService,
  getAllCategory,
} = require("../services/category.services");

// create brand start
exports.createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);
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
exports.getCategory = async (req, res, next) => {
  try {
    const result = await getAllCategory();
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
