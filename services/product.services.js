const Product = require("../models/Product");

exports.getProductsService = async () => {
  const products = await Product.find({});
  return products;
};

exports.getProductCreateService = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.productUpdateServec = async (productID, data) => {
  const updateProduct = await Product.updateOne(
    { _id: productID },
    { $set: data },
    { runValidators: true }
  );
  return updateProduct;
};
