const { default: mongoose } = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: [true, "Please provide a Store name"],
    maxLenght: 100,
    unique: true,
    lowercase: true,
    enum: {
      values: [
        "Dhaka",
        "Chattogram",
        "Rajshahi",
        "Sylhet",
        "Khulna",
        "Barishal",
      ],
    },
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  manager: {
    name: String,
    contactNumber: String,
    id: {
      type: ObjectId,
      ref: "User",
    },
  },
  //   email: {
  //     type: String,
  //     validate: [validator.isEmail, "Please Provide a valid email"],
  //     lowercase: true,
  //   },
  //   website: {
  //     type: String,
  //     validate: [validator.isURL, "Please Provide a valid url"],
  //   },
  location: String,
  products: [
    {
      type: ObjectId,
      ref: "Product",
    },
  ],
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

  timestamps: true,
});

const Store = mongoose.model("Store", StoreSchema);
exports = Store;
