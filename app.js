const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());

//Schema design
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide a name for this product."],
      trim: true,
      unique: [true, "Name must be unique"],
      minlength: [3, "Name must be at least 3 characters."],
      maxlength: [100, "Name is to large."],
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
      min: [0, "Price can't be negative."],
    },
    unit: {
      type: String,
      require: true,
      enum: {
        values: ["kg", "liter", "pcs"],
        message: [true, "Unit value can't be {Value}, must be kg/liter/pcs."],
      },
    },
    quantity: {
      type: Number,
      require: true,
      min: [0, "Quantity can't be Negative"],
      validate: {
        validator: (value) => {
          const isInterg = Number.isInteger(value);
          if (isInterg) {
            return true;
          } else {
            return false;
          }
        },
      },
    },
    stauts: {
      type: String,
      require: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "Status can't be {value}",
      },
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updateAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       require: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

//SCHEMA => MODEL => QUERY
const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  res.send("Route is working! YOYO");
});

app.get("/api/v1/product", async (req, res, next) => {
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
});

app.post("/api/v1/product", async (req, res, next) => {
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
});

module.exports = app;
