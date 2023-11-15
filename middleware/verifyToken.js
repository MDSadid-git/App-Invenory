const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      return res.status(401).json({
        status: "fail",
        error: "You are not logged in please Login first",
      });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_KEY);
    const user = User.findOne({ email: decoded.email });
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Invalid the User Token",
      message: error.message,
    });
  }
};
