const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
  console.log(data);
  const result = await Brand.cerate(data);
  return result;
};
exports.getAllBrand = async () => {
  const result = await Brand.find({}).select("-products -suppliers");
  return result;
};
