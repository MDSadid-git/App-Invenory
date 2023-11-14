const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = new mongoose.Schema(
  {
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    name: {
      type: String,
      trim: true,
      require: [true, "Please provide a Brand name"],
      maxLenght: 100,
      unique: true,
      lowercase: true,
    },
    description: String,
    email: {
      type: String,
      validate: [validator.isEmail, "Please Provide a valid email"],
      lowercase: true,
    },
    website: {
      type: String,
      validate: [validator.isURL, "Please Provide a valid url"],
    },
    location: String,

    suppliers: [
      {
        name: String,
        contanctNumber: String,
        id: {
          type: ObjectId,
          ref: "Supplier",
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "in-active"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
