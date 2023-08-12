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
exports.bulkUpdateProductService = async (data) => {
  // ak dame sob gula update korte aikhane sodo oi sob product id gula dite hobe

  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });

  // ai khane alada alada kore sob id gula dekha hoi ar price update kora hoi...
  const allProduct = [];
  data.ids.forEach((product) => {
    allProduct.push(Product.updateOne({ _id: product.id }, product.data));
  });
  const result = await Promise.all(allProduct);
  return result;
};
