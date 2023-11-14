const Category = require("../models/Category");

exports.getAllCategory = async () => {
  const result = await Category.find({}).select("-products -suppliers");
  return result;
};

exports.createCategoryService = async (data) => {
  const result = await Category.cerate(data);
  return result;
};
