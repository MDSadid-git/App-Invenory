const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    email: {
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) => {
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 3,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          });
        },
        message: "Password {Value} is not strong enough",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm Password is required"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
      },
      message: "password don't match!",
    },
    role: {
      type: String,
      enum: ["Buyer", "Store-Manager", "Admin"],
      default: "Buyer",
    },
    firstname: {
      type: String,
      required: [true, "Please Provide a first name"],
      trim: true,
      minLength: [3, "Namemust be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    lastname: {
      type: String,
      required: [true, "Please Provide a last name"],
      minLength: [3, "Namemust be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    shippingAddress: String,
    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "blocked", "report"],
    },
    passwordChangedAt: Date,
    passwordResteToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);

  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
