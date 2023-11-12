const { default: mongoose } = require("mongoose");

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: [true, "Please provide a Brand name"],
    maxLenght: 100,
    unique: true,
  },
});
