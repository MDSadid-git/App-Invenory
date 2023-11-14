const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

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
      lowercase: true,
    },
    description: {
      type: String,
      require: true,
    },
    // price: {
    //   type: Number,
    //   require: true,
    //   min: [0, "Price can't be negative."],
    // },
    unit: {
      type: String,
      require: true,
      enum: {
        values: ["kg", "liter", "pcs", "bag"],
        message: [
          true,
          "Unit value can't be {Value}, must be kg/liter/pcs/bag.",
        ],
      },
    },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
        },
      },
    ],
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
    // quantity: {
    //   type: Number,
    //   require: true,
    //   min: [0, "Quantity can't be Negative"],
    //   validate: {
    //     validator: (value) => {
    //       const isInterg = Number.isInteger(value);
    //       if (isInterg) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     },
    //   },
    // },
    // stauts: {
    //   type: String,
    //   require: true,
    //   enum: {
    //     values: ["in-stock", "out-of-stock", "discontinued"],
    //     message: "Status can't be {value}",
    //   },
    // },
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

module.exports = Product;
