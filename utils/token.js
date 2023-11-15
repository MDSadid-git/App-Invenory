const jwt = require("jsonwebtoken");

exports.generateToken = (userInFo) => {
  const payload = {
    email: userInFo.email,
    role: userInFo.role,
  };
  const token = jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: "30days",
  });
  return token;
};
