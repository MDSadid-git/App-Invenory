exports.getProducts = async (req, res, next) => {
  try {
    const allProduct = await Product.find({});
    res.status(200).json({
      status: "Success",
      data: allProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: `Can't find data ${error}`,
      error: error.message,
    });
  }
};

exports.createProducts = async (req, res, next) => {
  try {
    //Save or create part 1
    // const product = new Product(req.body);
    // const result = await product.save();

    // part 2
    const result = await Product.create(req.body);
    if (result.quantity == 0) {
      result.status = "out-of-stock";
    }
    res.status(200).json({
      status: "success",
      message: "Data inserted successfully!!!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Bad req Plesea give me Right data!!",
      error: error.message,
    });
  }
};
