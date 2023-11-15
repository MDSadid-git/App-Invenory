const User = require("../models/User");

exports.userSingUpService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};
