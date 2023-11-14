const Category = require("../models/Category");

exports.createCategoryService = async (data) => {
  console.log(data);
  const result = await Category.cerate(data);
  return result;
};
exports.getAllCategory = async () => {
  const result = await Category.find({}).select("-products -suppliers");
  return result;
};
