const User = require("../models/User");

// user create area  start
exports.userSingUpService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};
// user create area end

// user Login area start
exports.userFindByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};
// user Login area end
