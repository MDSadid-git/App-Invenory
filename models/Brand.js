const { default: mongoose } = require("mongoose");
const validator = require("validator");

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: [true, "Please provide a Brand name"],
    maxLenght: 100,
    unique: true,
  },
  description: String,
  email: {
    type: String,
    validate: [validator.isEmail, "Please Provide a valid email"],
  },
  website: {
    type: String,
    validate: [validator.isURL, "Please Provide a valid url"],
  },
});
