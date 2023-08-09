const Product = require("../models/Product");

exports.getProductsService = async () => {
  const products = await Product.find({});
  return products;
};

exports.getProductCreateService = async (data) => {
  const product = await Product.create(data);
  return product;
};
