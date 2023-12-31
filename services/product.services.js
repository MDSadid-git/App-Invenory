const Product = require("../models/Product");
const Brand = require("../models/Brand");

exports.getProductsService = async (queryObjectArea, querySort) => {
  console.log(queryObjectArea);
  const products = await Product.find(queryObjectArea)
    .skip(querySort.skip)
    .limit(querySort.limit)
    .select(querySort.fields)
    .sort(querySort.sortBy);
  const allProductList = await Product.countDocuments(queryObjectArea);
  const pageCount = Math.ceil(allProductList / querySort.limit);
  return { allProductList, pageCount, products };
};

exports.getProductCreateService = async (data) => {
  const product = await Product.create(data);
  //setp 1 _id, Brand
  const { _id: ProductID, brand } = product;

  //Update Brand
  const res = await Brand.updateOne(
    { _id: brand.id },

    { $push: { products: ProductID } }
  );
  console.log(res);
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

// bulk area start
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

exports.bulkDeleteProductService = async (data) => {
  const result = await Product.deleteMany({ _id: data.ids });
  return result;
};

// bulk area end

exports.productDeleteServecById = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};
