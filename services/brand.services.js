const Brand = require("../models/Brand");

//all barand area start
exports.getAllBrand = async () => {
  const result = await Brand.find({}).select("-products -suppliers");
  return result;
};
//all brand area end

//brand create area start
exports.createBrandService = async (data) => {
  console.log(data);
  const result = await Brand.cerate(data);
  return result;
};
//brand create area end

//brand one id start
exports.getBrandIdService = async (data) => {
  console.log(data);
  const result = await Brand.findOne({ _id: data });

  return result;
};
// brand one id end
